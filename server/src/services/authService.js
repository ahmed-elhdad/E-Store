import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../models/User.model.js";
import { getUserPhotoUrl } from "../config/multer.config.js";
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
import dotenv from "dotenv";
import { idValidation } from "../middleware/idValidation.js";
import { CheckExit } from "../middleware/checkExit.js";
dotenv.config();
export class AuthService {
  static async me(req, res) {
    try {
      // User is already verified by verifyToken middleware
      const userId = req.user.id;
      const isValidUserId = idValidation(userId);
      if (!isValidUserId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      const existingUser = await CheckExit.checkUserById(userId);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      // Remove password from response
      const userData = existingUser.toObject();
      delete userData.password;

      // Convert photo path to URL if needed
      if (userData.photo) {
        userData.photo = getUserPhotoUrl(userData.photo);
      }
      // Don't Return password to Front-End
      delete userData.password;
      return res.status(200).json({ data: userData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async register(req, res) {
    try {
      const { name, email, password, role ,phone_number,credit_card} = req.body;

      // Handle uploaded photo if exists
      let photo = "";
      if (req.file) {
        photo = getUserPhotoUrl(req.file.filename);
      } else if (req.body.photo) {
        photo = req.body.photo;
      }

      if (!name || !email || !password || !phone_number || !credit_card) {
        return res
          .status(400)
          .json({ message: "Provide name, email, password, phone_number and credit_card" });
      }
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      const existing = await CheckExit.checkUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        email,
        password: hashed,
        role: role || "user",
        photo: photo,
      });
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Remove password from response
      const userData = user.toObject();
      delete userData.password;

      // Convert photo path to URL if needed
      if (userData.photo) {
        userData.photo = getUserPhotoUrl(userData.photo);
      }
      // Don't return password for front-end
      delete userData.password;
      return res.status(201).json({
        message: "User registered successfully",
        token,
        user: userData,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async login(data, res) {
    try {
      const { email, password } = data;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      const user = await CheckExit.checkUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // Remove password from response
      const userData = user.toObject();
      // Don't Return password to Front-End
      delete userData.password;

      return res
        .status(200)
        .json({ message: "Login successful", token, user: userData });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async resetPassword(data, res) {
    try {
      const { email } = data;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email" });
      }

      const user = await CheckExit.checkUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const code = Math.floor(1000 + Math.random() * 9000);

      // Store reset code in user model temporarily (you might want to add a resetCode field)
      // For now, we'll just send the email

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Code - E-commerce website",
        html: `<p>This code don't share with anybody</p><h3>${code}</h3><span>If you didn't request this, ignore this email</span>`,
      };

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error: ", error);
          return res.status(500).json({ error: "Failed to send email" });
        } else {
          console.log("Sent successfully:", info.response);
          return res
            .status(200)
            .json({ message: "Reset code sent to email", code: code }); // For testing only, remove in production
        }
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async delUser(req, res) {
    try {
      // User can only delete their own account, or admin can delete any
      const userId = req.user.id;
      const targetId = req.body.id || userId;

      // Check if user is admin or deleting their own account
      const currentUser = await CheckExit.checkUserById(userId);
      if (currentUser.role !== "admin" && targetId !== userId) {
        return res
          .status(403)
          .json({ error: "Unauthorized to delete this user" });
      }

      const exit = await CheckExit.checkUserById(targetId);
      if (!exit) {
        return res.status(404).json({ error: "User not found" });
      }

      await User.findByIdAndDelete(targetId);
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // OAuth login/signup with Google
  static async googleAuth(profile, res) {
    try {
      const { id, displayName, emails, photos } = profile;
      const email = emails[0].value;
      const photo = photos[0].value;

      // Check if user exists
      let user = await CheckExit.checkUserByEmail(email);

      if (!user) {
        // Create new user
        user = new User({
          name: displayName,
          email: email,
          photo: photo,
          password: "", // No password for OAuth users
          isVerified: true,
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const userData = user.toObject();
      // Don't Return password to Front-End
      delete userData.password;

      return res.status(200).json({
        message: "Google authentication successful",
        token,
        user: userData,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // OAuth login/signup with Facebook
  static async facebookAuth(profile, res) {
    try {
      const { id, name, email, picture } = profile;

      // Check if user exists
      let user = await CheckExit.checkUserByEmail(email);

      if (!user) {
        // Create new user
        user = new User({
          name: name,
          email: email,
          photo: picture?.data?.url || "",
          password: "", // No password for OAuth users
          isVerified: true,
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      const userData = user.toObject();
      // Don't Return password to Front-End
      delete userData.password;

      return res.status(200).json({
        message: "Facebook authentication successful",
        token,
        user: userData,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  // Update user photo
  static async updatePhoto(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware

      if (!req.file) {
        return res.status(400).json({ error: "Photo file is required" });
      }

      const isValidUserId = idValidation(userId);
      if (!isValidUserId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Update photo
      user.photo = req.file.filename;
      await user.save();

      // Convert photo path to URL
      const photoUrl = getUserPhotoUrl(user.photo);

      return res.status(200).json({
        message: "Photo updated successfully",
        photo: photoUrl,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
