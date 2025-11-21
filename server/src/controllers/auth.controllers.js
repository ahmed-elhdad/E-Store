import dotenv from "dotenv";
import { AuthService } from "../services/authService.js";
dotenv.config();

export const me = async (req, res) => {
  await AuthService.me(req, res);
};

export const register = async (req, res) => {
  await AuthService.register(req, res);
};

export const updatePhoto = async (req, res) => {
  await AuthService.updatePhoto(req, res);
};

export const login = async (req, res) => {
  await AuthService.login(req.body, res);
};

export const resetPassword = async (req, res) => {
  await AuthService.resetPassword(req.body, res);
};

export const delUser = async (req, res) => {
  await AuthService.delUser(req, res);
};

// OAuth endpoints - these will be called from OAuth callback handlers
export const googleAuth = async (req, res) => {
  await AuthService.googleAuth(req.user, res);
};

export const facebookAuth = async (req, res) => {
  await AuthService.facebookAuth(req.user, res);
};
