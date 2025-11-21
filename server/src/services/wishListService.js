import { idValidation } from "../middleware/idValidation.js";
import { CheckExit } from "../middleware/checkExit.js";
import Prudoct from "../models/Prudoct.model.js";

export class WishListService {
  static async getWishList(req, res) {
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
      const wishListItems = await Promise.all(
        user.wishList.map(async (productId) => {
          const product = await Prudoct.findById(productId);
          return product;
        })
      );

      // Filter out null products (in case product was deleted)
      const validProducts = wishListItems.filter((product) => product !== null);

      return res
        .status(200)
        .json({ data: validProducts, count: validProducts.length });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async addPrudoctToWishList(req, res) {
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

      const product = await CheckExit.checkPrudoctById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if product is already in wishlist
      const isInWishList = user.wishList.some(
        (id) => id.toString() === productId
      );

      if (isInWishList) {
        return res.status(409).json({ error: "Product already in wishlist" });
      }

      // Add product to wishlist
      user.wishList.push(productId);
      await user.save();

      return res
        .status(200)
        .json({ message: "Product added to wishlist successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  static async removePrudoctFromWishList(req, res) {
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

      // Find and remove product from wishlist
      const productIndex = user.wishList.findIndex(
        (id) => id.toString() === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found in wishlist" });
      }

      user.wishList.splice(productIndex, 1);
      await user.save();

      return res
        .status(200)
        .json({ message: "Product removed from wishlist successfully" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
