import { CartService } from "../services/cartService.js";

export const getCart = async (req, res) => {
  await CartService.getCart(req, res);
};

export const removeCart = async (req, res) => {
  await CartService.removeCart(req, res);
};

export const addPrudoct = async (req, res) => {
  await CartService.addPrudoct(req, res);
};

export const editPrudoct = async (req, res) => {
  await CartService.editPrudoct(req, res);
};

export const removePrudoct = async (req, res) => {
  await CartService.removePrudoct(req, res);
};
