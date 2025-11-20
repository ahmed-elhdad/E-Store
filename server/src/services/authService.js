import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import verifyToken from "../middleware/verifyToken.js";
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
import dotenv from "dotenv";
import { idValidation } from "../middleware/idValidation.js";
import { CheckExit } from "../middleware/checkExit.js";
dotenv.config();
export class AuthService {
  static async me(data, res) {
    const { userId, token } = data;
    const isValidUserId = idValidation(userId);
    const isValidToken = verifyToken(data);
    if (!isValidUserId || !isValidToken) {
      res.status(301).json({ error: "Valid user id or token" });
      return;
    }
    const existingUser = CheckExit.checkUserById(userId);
    if (!existingUser) {
      res.status(404).json({ error: "not found user" });
      return;
    }
    res.status(201).json({ data: existingUser });
  }
  static async register(data, res) {
    try {
      const { name, email, password, role } = data;
      if (!name || !email || !password) {
        res.status(400).json({ message: "Provide name, email and password" });
        return;
      }
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
      }
      const existing = CheckExit.checkUserByEmail(email);
      if (existing) {
        res.status(409).json({ message: "User already exists" });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashed, role }); // Changed 'pass' to 'password'
      await user.save();
      res.status(201).json({ user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async login(data, res) {
    try {
      const { email, password } = data;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password required" });
        return;
      }
      const user = CheckExit.checkUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async resetPassword(data, res) {
    try {
      const { email } = data; // Removed 'await'
      if (!emailRegex.test(email)) {
        // Fixed regex validation
        res.status(400).json({ error: "Invalid email" });
        return;
      }
      const code = Math.floor(1000 + Math.random() * 9000);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "E-commerce website",
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
          res.status(500).json({ error: "Failed to send email" });
        } else {
          console.log("Sent successfully:", info.response);
          res.status(200).json({ message: "Reset code sent to email" });
        }
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async delUser(data, res) {
    try {
      const { id } = data;
      const exit = CheckExit.checkUserById(id);
      if (!exit) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      await User.findOneAndDelete({ _id: id });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
