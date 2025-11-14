import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";
import { AuthService } from "../services/authService.js";
dotenv.config();

export const register = async (req, res) => {
  AuthService.register(req.body);
};

export const login = async (req, res) => {
  AuthService.login(req.body);
};
export const resetPassword = async (req, res) => {
  AuthService.resetPassword(req.body, res);
};
export const delUser = async (req, res) => {
  AuthService.delUser(req.body, res);
};
