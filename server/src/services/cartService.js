import User from "../models/User.model.js";
import Cart from "../models/Cart.model.js";
import { idValidation } from "../middleware/idValidation.js";
import Prudoct from "../models/Prudoct.model.js";
import { CheckExit } from "../middleware/checkExit.js";
export class CartService {
  static async getCart(data, res) {
    try {
      const { userId } = data;
      const isValidId = idValidation(userId);
      if (!isValidId) {
        res.status(301).json({ error: "valid Id" });
      }
      const existing = CheckExit.checkUserByEmail(email);
      if (!existing) {
        res.status(404).json({ error: "not found user" });
        return;
      }
      if (!existing.cart) {
        res.status(404).json({ error: "The user don't has any cart" });
        return;
      }
      res.status(201).json({ data: existing.cart });
    } catch (err) {
      res.status(301).json({ error: `Error: ${err}` });
    }
  }
  static async createCart(data, res) {
    try {
      const { userId, token } = data;
      // Compelet with JWT verify
      const isValidId = idValidation(userId);
      const existing = CheckExit.checkUserById(userId);
      if (!isValidId) {
        res.status(301).json({ error: "valid userId" });
        return;
      }
      if (!existing) {
        res.status(404).json({ error: "user not found" });
        return;
      }
      const cart = new Cart();
      res.status(201).json({ cart, message: "cart created successfully" });
    } catch (err) {
      res.status(301).json({ error: `Error: ${err}` });
    }
  }
  static async removeCart(data, res) {
    try {
      const { userId, cartId } = data;
      const isValidUserId = idValidation(userId);
      const isValidCartId = idValidation(cartId);
      if (!isValidCartId || !isValidUserId) {
        res.status(301).json({ error: "Valid id" });
        return;
      }
      const existingUser = CheckExit.checkUserById(userId);
      const existingCart = Cart.findOne({ _id: cartId });
      if (!existingUser || !existingCart) {
        res.status(404).json({ error: "Not found user or cart" });
        return;
      }
      const delCart = Cart.findOneAndDelete({ _id: cartId });
      if (!delCart) {
        res.status(301).json({ error: "feild to remove cart" });
        return;
      }
      res.status(201).json({ message: "removed successfully" });
    } catch (err) {
      res.status(301).json({ error: `Error: ${err}` });
    }
  }
  static async addPrudoct(data, res) {
    try {
      const { userId, cartId, prudoctId, prudoctQuantity } = data;
      // Check ID
      const isValidUserId = idValidation(userId);
      const isValidCartId = idValidation(cartId);
      const isValidPrudoctId = idValidation(prudoctId);
      if (
        (!isValidUserId || !isValidCartId || !isValidPrudoctId,
        !prudoctQuantity)
      ) {
        res.status(201).json({ error: "valid id" });
        return;
      }
      // Check if data exit
      const existingUser = CheckExit.checkUserById(userId);
      const existingCart = existingUser.cart.findOne({ _id: cartId });
      const existingPrudoct = CheckExit.checkPrudoctById(prudoctId);
      if (!existingUser || !existingCart || !existingPrudoct) {
        res.status(404).json({ error: "not found prudoct or cart or user" });
        return;
      }
      if (existingPrudoct.quantity < prudoctQuantity) {
        res.status(301).json({
          message: `you order ${prudoctQuantity} but there ${existingPrudoct.quantity}`,
        });
        return;
      }
      (await existingPrudoct.quantity) - prudoctQuantity;
      await existingCart.cart.push({ prudoctId, prudoctQuantity });

      if (!existingCart.cart.push({ prudoctId, prudoctQuantity })) {
        res.status(301).json({ error: "Feild to add prudoct" });
        return;
      }
      await existingCart.save();
      await existingPrudoct.save();
      await existingUser.save();
      res.status(201).json({ message: "Prudoct added successfully" });
    } catch (err) {
      res.status(301).json({ error: `Error: ${err}` });
    }
  }
  static async editPrudoct(data, res) {
    try {
      const { userId, prudoctId, prudoctQuantity } = data;
      const isValidPrudoctId = idValidation(prudoctId);
      const isValidUserId = idValidation(userId);
      if (!prudoctQuantity || !isValidPrudoctId || isValidUserId) {
        res
          .status(301)
          .json({ error: "Prudoct Quantity required or valid prudoct id" });
        return;
      }
      const existing = CheckExit.checkUserById(userId);
      if (!existing) {
        res.status(404).json({ error: "Not found user" });
        return;
      }
      const findPrudoct = function () {
        for (let i = 0; i < existing.cart.length; i++) {
          if (existing.cart[i]._id === prudoctId) {
            return i;
          }
        }
      };
      const index = findPrudoct;
      const currentQuantity = await existing.cart[index].quantity;
      if (!currentQuantity) {
        res.status(301).json({ error: "Feild to edit quantity" });
        return;
      }
      currentQuantity = prudoctQuantity;
      res.status(201).json({ message: "Prudoct edited successfully" });
    } catch (err) {
      res.status(301).json({ error: `Error: ${err}` });
    }
  }
  static async removePrudoct(data, res) {
    try {
      const { userId, cartId, prudoctId } = data;
      const isValidPrudoctId = idValidation(prudoctId);
      const isValidUserId = idValidation(userId);
      const isValidCartId = idValidation(cartId);
      if (!isValidCartId || !isValidPrudoctId || isValidUserId) {
        res.status(301).json({ error: "Prudoct Id or prudoct id are valid" });
        return;
      }
      const existingUser = CheckExit.checkUserById(userId);
      const existingPrudoct = CheckExit.checkPrudoctById(prudoctId);

      if (!existingUser || !existingPrudoct) {
        res.status(404).json({ error: "Not found user or prudoct" });
        return;
      }
      const delPrudoct = await Prudoct.findByIdAndDelete(prudoctId);
      if (!delPrudoct) {
        res.status(301).json({ error: "Feild to Remove" });
        return;
      }
      existingUser.cart.save();
      res.status(201).json({ message: "Removed successfully" });
    } catch (err) {
      res.status(301).json({ error: `Error: ${err}` });
    }
  }
}
