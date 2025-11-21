import { OrderService } from "../services/ordersService.js";

export const createOrder = async (req, res) => {
  await OrderService.createOrder(req, res);
};

export const getOrder = async (req, res) => {
  await OrderService.getOrder(req, res);
};

export const getOrders = async (req, res) => {
  await OrderService.getOrders(req, res);
};

export const removeOrder = async (req, res) => {
  await OrderService.removeOrder(req, res);
};

export const updateOrderStatus = async (req, res) => {
  await OrderService.updateOrderStatus(req, res);
};
