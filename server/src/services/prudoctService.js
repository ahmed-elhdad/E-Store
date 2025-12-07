import Prudoct from "../models/Prudoct.model.js";
import { idValidation } from "../middleware/idValidation.js";
import { CheckExit } from "../middleware/checkExit.js";
import { getProductImageUrl } from "../config/multer.config.js";

export class PrudoctService {
  static async getPrudoct(data, res) {
    try {
      const { id } = data;
      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }
      const isValidId = idValidation(id);
      if (!isValidId) {
        return res.status(400).json({ error: "Valid ID required" });
      }
      const exit = await CheckExit.checkPrudoctById(id);
      if (!exit) {
        return res.status(404).json({ error: "Product not found" });
      }
      // Convert image paths to URLs
      if (exit.images) {
        exit.images = exit.images.map((img) => getProductImageUrl(img));
      }
      console.log("prudocts get successfully");

      return res.status(200).json({ data: exit });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async getPrudocts(data, res) {
    try {
      const { category } = data;
      let prudocts;
      if (!category) {
        // If no category provided, return all products
        prudocts = await Prudoct.find({});
      } else {
        prudocts = await CheckExit.checkPrudoctByCategory(category);
      }
      // Convert image paths to URLs
      prudocts = prudocts.map((product) => {
        if (product.images) {
          product.images = product.images.map((img) => getProductImageUrl(img));
        }
        return product;
      });
      console.log("prudocts get successfully");

      return res.status(200).json({ data: prudocts });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async createPrudoct(req, res) {
    try {
      const {
        title,
        description,
        category,
        price,
        saler,
        quantity,
        prudoctNo,
      } = await req.body;

      // Handle uploaded files (Multer)
      if (!req.files) {
        return res.status(400).json({
          error: "At least one image must be uploaded",
          files: req.files,
        });
      }

      const imagePaths = req.files.map((file) => file.filename);
      const allowedCategories = "kitchen" || "tech" || "homes" || "sport";
      // Validate required fields
      if (
        !title ||
        !description ||
        !category ||
        !allowedCategories.match(allowedCategories) ||
        price === undefined ||
        !saler ||
        quantity === undefined
      ) {
        return res.status(400).json({
          error: "All required fields must be provided",
        });
      }

      // Check if product already exists
      const prudoctExit = await Prudoct.findOne({ title });
      if (prudoctExit) {
        return res
          .status(409)
          .json({ error: "Product with this title already exists" });
      }

      // Check if seller exists
      const salerExit = await CheckExit.checkUserByEmail(saler);
      if (!salerExit) {
        return res.status(404).json({ error: "Seller not found" });
      }

      // Validate price and quantity
      if (price <= 0) {
        return res.status(400).json({ error: "Price must be greater than 0" });
      }

      if (quantity <= 0) {
        return res
          .status(400)
          .json({ error: "Quantity must be greater than 0" });
      }

      // Create and save product
      const prudoct = new Prudoct({
        title,
        description,
        category,
        images: imagePaths,
        price: parseFloat(price),
        saler,
        quantity: parseInt(quantity),
        prudoctNo: prudoctNo || undefined,
      });

      await prudoct.save();

      // Convert image paths to URLs in response
      prudoct.images = prudoct.images.map((img) => getProductImageUrl(img));

      return res
        .status(201)
        .json({ message: "Product created successfully", data: prudoct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
  static async editPrudoct(req, res) {
    try {
      const id = req.params.id || req.body.id;
      const {
        title,
        description,
        category,
        price,
        saler,
        quantity,
        prudoctNo,
      } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }
      if (!idValidation(id)) {
        return res.status(400).json({ error: "Valid ID required" });
      }

      const prudoct = await CheckExit.checkPrudoctById(id);
      if (!prudoct) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (price !== undefined && price <= 0) {
        return res.status(400).json({ error: "Price must be greater than 0" });
      }
      if (quantity !== undefined && quantity < 0) {
        return res.status(400).json({ error: "Quantity must be 0 or greater" });
      }

      // Handle uploaded files
      if (req.files && req.files.length > 0) {
        const imagePaths = req.files.map((file) => file.filename);
        prudoct.images = [...prudoct.images, ...imagePaths];
      } else if (req.body.images !== undefined) {
        // If images provided as URLs/strings (replace all)
        prudoct.images = Array.isArray(req.body.images)
          ? req.body.images
          : [req.body.images];
      }

      if (saler) {
        const salerUser = await CheckExit.checkUserByEmail(saler);
        if (!salerUser) {
          return res.status(404).json({ error: "Seller not found" });
        }
        prudoct.saler = salerUser.email;
      }

      if (title !== undefined) prudoct.title = title;
      if (description !== undefined) prudoct.description = description;
      if (category !== undefined) prudoct.category = category;
      if (price !== undefined) prudoct.price = parseFloat(price);
      if (quantity !== undefined) prudoct.quantity = parseInt(quantity);
      if (prudoctNo !== undefined) prudoct.prudoctNo = prudoctNo;

      await prudoct.save();

      // Convert image paths to URLs in response
      if (prudoct.images) {
        prudoct.images = prudoct.images.map((img) => getProductImageUrl(img));
      }

      return res
        .status(200)
        .json({ message: "Product updated successfully", data: prudoct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
  static async removePrudoct(data, res) {
    try {
      const { id } = data;
      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }
      const isValidId = idValidation(id);
      if (!isValidId) {
        return res.status(400).json({ error: "Valid ID required" });
      }
      const delPrudoct = await Prudoct.findByIdAndDelete(id);
      if (!delPrudoct) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
