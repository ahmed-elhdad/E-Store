import { CheckExit } from "../middleware/checkExit.js";
import { idValidation } from "../middleware/idValidation.js";
import User from "../models/User.model.js";
import Prudoct from "../models/Prudoct.model.js";

export class OrderService {
  // Create order from cart (checkout)
  static async createOrder(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const isValidId = idValidation(userId);

      if (!isValidId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if cart is empty
      if (!user.cart || user.cart.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Validate cart items and check stock
      const orderItems = [];
      let totalPrice = 0;

      for (const cartItem of user.cart) {
        const product = await Prudoct.findById(cartItem.productId);
        if (!product) {
          return res
            .status(404)
            .json({ error: `Product ${cartItem.productId} not found` });
        }

        if (product.quantity < cartItem.quantity) {
          return res.status(400).json({
            error: `Insufficient stock for ${product.title}. Available: ${product.quantity}, Requested: ${cartItem.quantity}`,
          });
        }

        // Update product quantity (reduce stock)
        product.quantity -= cartItem.quantity;
        await product.save();

        const itemTotal = cartItem.price * cartItem.quantity;
        totalPrice += itemTotal;

        orderItems.push({
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          price: cartItem.price,
        });
      }

      // Create order object
      const order = {
        items: orderItems,
        total_price: totalPrice,
        orderDate: new Date(),
        status: "pending", // Will be updated to "completed" after payment
      };

      // Add order to user's orders array
      user.orders.push(order);

      // Clear the cart after creating order
      user.cart = [];

      await user.save();

      return res.status(201).json({
        message: "Order created successfully",
        order: order,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all orders for a user
  static async getOrders(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const isValidId = idValidation(userId);

      if (!isValidId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Populate product details in orders
      const ordersWithProducts = await Promise.all(
        user.orders.map(async (order) => {
          const itemsWithProducts = await Promise.all(
            order.items.map(async (item) => {
              const product = await Prudoct.findById(item.productId);
              return {
                ...item.toObject(),
                product: product || null,
              };
            })
          );
          return {
            ...order.toObject(),
            items: itemsWithProducts,
          };
        })
      );

      return res.status(200).json({
        data: ordersWithProducts,
        count: ordersWithProducts.length,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get single order by ID
  static async getOrder(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { orderId } = req.params;

      if (!orderId) {
        return res.status(400).json({ error: "Order ID is required" });
      }

      const isValidUserId = idValidation(userId);
      const isValidOrderId = idValidation(orderId);

      if (!isValidUserId || !isValidOrderId) {
        return res.status(400).json({ error: "Invalid user or order ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Find order in user's orders array
      const order = user.orders.id(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Populate product details
      const itemsWithProducts = await Promise.all(
        order.items.map(async (item) => {
          const product = await Prudoct.findById(item.productId);
          return {
            ...item.toObject(),
            product: product || null,
          };
        })
      );

      return res.status(200).json({
        data: {
          ...order.toObject(),
          items: itemsWithProducts,
        },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Remove/Delete order (optional - might want to cancel instead)
  static async removeOrder(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { orderId } = req.params;

      const isValidUserId = idValidation(userId);
      const isValidOrderId = idValidation(orderId);

      if (!isValidUserId || !isValidOrderId) {
        return res.status(400).json({ error: "Invalid user or order ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const orderIndex = user.orders.findIndex(
        (order) => order._id.toString() === orderId
      );

      if (orderIndex === -1) {
        return res.status(404).json({ error: "Order not found" });
      }

      // Optionally restore product quantities if order is being cancelled
      // For now, just remove the order
      user.orders.splice(orderIndex, 1);
      await user.save();

      return res.status(200).json({ message: "Order removed successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Update order status (e.g., after Stripe payment)
  static async updateOrderStatus(req, res) {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;
      const { status } = req.body;

      if (!orderId || !status) {
        return res
          .status(400)
          .json({ error: "Order ID and status are required" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const order = user.orders.id(orderId);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.status = status;
      await user.save();

      return res
        .status(200)
        .json({ message: "Order status updated successfully", order });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
