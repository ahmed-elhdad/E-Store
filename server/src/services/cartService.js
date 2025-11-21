import User from "../models/User.model.js";
import Prudoct from "../models/Prudoct.model.js";
import { idValidation } from "../middleware/idValidation.js";
import { CheckExit } from "../middleware/checkExit.js";

export class CartService {
  // Get user's cart
  static async getCart(req, res) {
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

      // Populate product details
      const cartItems = await Promise.all(
        user.cart.map(async (item) => {
          const product = await Prudoct.findById(item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            product: product || null,
          };
        })
      );

      // Calculate total price
      const totalPrice = user.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return res.status(200).json({
        data: cartItems,
        totalPrice: totalPrice,
        itemCount: user.cart.length,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Add product to cart
  static async addPrudoct(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { productId, quantity } = req.body;

      if (!productId || !quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Product ID and valid quantity required" });
      }

      const isValidUserId = idValidation(userId);
      const isValidProductId = idValidation(productId);

      if (!isValidUserId || !isValidProductId) {
        return res.status(400).json({ error: "Invalid user or product ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const product = await CheckExit.checkPrudoctById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if product has enough quantity
      if (product.quantity < quantity) {
        return res.status(400).json({
          error: `Insufficient stock. Available: ${product.quantity}, Requested: ${quantity}`,
        });
      }

      // Check if product already in cart
      const existingItemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex !== -1) {
        // Update quantity if already in cart
        const newQuantity = user.cart[existingItemIndex].quantity + quantity;
        if (product.quantity < newQuantity) {
          return res.status(400).json({
            error: `Insufficient stock. Available: ${product.quantity}, Requested: ${newQuantity}`,
          });
        }
        user.cart[existingItemIndex].quantity = newQuantity;
      } else {
        // Add new item to cart
        user.cart.push({
          productId: productId,
          quantity: quantity,
          price: product.price,
        });
      }

      await user.save();
      return res
        .status(200)
        .json({ message: "Product added to cart successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Update product quantity in cart
  static async editPrudoct(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { productId, quantity } = req.body;

      if (!productId || quantity === undefined || quantity < 0) {
        return res
          .status(400)
          .json({ error: "Product ID and valid quantity required" });
      }

      if (quantity === 0) {
        // Remove product if quantity is 0
        return CartService.removePrudoct(req, res);
      }

      const isValidUserId = idValidation(userId);
      const isValidProductId = idValidation(productId);

      if (!isValidUserId || !isValidProductId) {
        return res.status(400).json({ error: "Invalid user or product ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const product = await CheckExit.checkPrudoctById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({
          error: `Insufficient stock. Available: ${product.quantity}, Requested: ${quantity}`,
        });
      }

      const itemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ error: "Product not found in cart" });
      }

      user.cart[itemIndex].quantity = quantity;
      await user.save();

      return res.status(200).json({ message: "Cart updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Remove product from cart
  static async removePrudoct(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const isValidUserId = idValidation(userId);
      const isValidProductId = idValidation(productId);

      if (!isValidUserId || !isValidProductId) {
        return res.status(400).json({ error: "Invalid user or product ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const itemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex === -1) {
        return res.status(404).json({ error: "Product not found in cart" });
      }

      user.cart.splice(itemIndex, 1);
      await user.save();

      return res
        .status(200)
        .json({ message: "Product removed from cart successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Clear entire cart (when window closes or user wants to clear)
  static async removeCart(req, res) {
    try {
      const userId = req.user.id; // From JWT middleware
      const isValidUserId = idValidation(userId);

      if (!isValidUserId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await CheckExit.checkUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.cart = [];
      await user.save();

      return res.status(200).json({ message: "Cart cleared successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
