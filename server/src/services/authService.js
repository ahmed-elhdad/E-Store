import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;

export const AuthService = async () => {
  async function register(data) {
    try {
      const { name, email, password } = await data;
      if (!name || !email || !password) {
        res.status(400).json({ message: "Provide name, email and password" });
        return;
      }
      if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
      }
      const existing = await User.findOne({ email });
      if (existing) {
        res.status(409).json({ message: "User already exists" });
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashed });
      await user.save();
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async function login(data) {
    try {
      const { email, password } = await data;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password required" });
        return;
      }
      const user = await User.findOne({ email });
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
  async function resetPassword(data, res) {
    const { email } = await data;
    const isValidEmail = email.match(RegExp);
    if (!isValidEmail) {
      res.status(301).json({ error: "valid email" });
      return;
    }
    const code = Math.floor(1000 + Math.random() * 9000);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "E-commerce website",
      html: `<p className={"font-bold text-gray-300"}>this code don't share with anybody</p><h3 className={"text-2xl text-gray-800"}>${code}</h3><span>if you not order it email ignore this email`,
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
      } else {
        console.log("sended Successfully:", info.response);
      }
    });
  }
  async function delUser(data, res) {
    const { id } = await data;
    const exit = User.findOne({ _id: id });
    if (!exit) {
      res.status(404).json({ error: "not found user" });
      return;
    }
    User.findOneAndDelete({ _id: id });
    await User.save();
    res.status(201).json({ message: "User deleted successfully" });
  }
};
