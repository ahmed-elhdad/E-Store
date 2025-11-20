import Prudoct from "../models/Prudoct.model.js";
import User from "../models/User.model.js";
import { idValidation } from "../middleware/idValidation.js";
import { CheckExit } from "../middleware/checkExit.js";
export class PrudoctService {
  static async getPrudoct(data, res) {
    const { id } = await data;
    const isValidId = idValidation(id);
    if (!isValidId) {
      res.status(301).json({ error: "Valid Id" });
      return;
    }
    const exit = CheckExit.checkPrudoctById(id);
    if (!exit) {
      res.status(404).json({ error: "not found prudoct" });
      return;
    }
    res.status(201).json({ data: exit });
  }
  static async getPrudocts(data, res) {
    const { category } = await data;
    if (!category) {
      res.json({ message: "valid category" });
      return;
    }
    const prudocts = CheckExit.checkPrudoctByCategory(category);
    res.status(201).json({ data: prudocts });
  }
  static async createPrudoct(data, res) {
    try {
      const {
        title,
        description,
        category,
        images,
        price,
        saler,
        prudoctsNum,
        prudoctNo,
      } = await data;
      if (
        !title ||
        !description ||
        !category ||
        !images ||
        !price ||
        !saler ||
        !prudoctsNum ||
        !prudoctNo
      ) {
        res.status(301).json({ error: "data required" });
        return;
      }
      const prudoctExit = Prudoct.find({ title: title });
      const salerExit = CheckExit.checkUserByEmail(saler);
      if (prudoctExit) {
        res.status(301).json({ error: "the prudoct exits" });
        return;
      }
      if (!salerExit) {
        res.status(301).json({ error: "User not found" });
        return;
      }
      if (price <= 0) {
        res.status(301).json({ error: "Valid Price" });
        return;
      }
      if (prudoctsNum <= 0) {
        res.status(301).json({ error: "Valid prudoctsNum" });
        return;
      }
      const numOfPrudocts = (await Prudoct.find({})).length + 1;
      const salerName = salerExit.name;
      const prudoct = new Prudoct({
        title,
        description,
        category,
        images,
        price,
        salerName,
        prudoctsNum,
        numOfPrudocts,
      });
      await prudoct.save();
      res.status(201).json({ message: "Created successfully" });
    } catch (error) {
      res.json({ error: err });
      console.log(err);
    }
  }
  static async editPrudoct(data, res) {
    try {
      const {
        id,
        title,
        description,
        category,
        images,
        price,
        saler,
        prudoctsNum,
        prudoctNo,
      } = data;

      if (!id) {
        return res.status(400).json({ error: "id required" });
      }
      if (!idValidation(id)) {
        return res.status(400).json({ error: "valid id" });
      }

      const prudoct = CheckExit.checkPrudoctById(id);
      if (!prudoct) {
        return res.status(404).json({ error: "Prudoct not found" });
      }

      if (price !== undefined && price <= 0) {
        return res.status(400).json({ error: "Valid Price" });
      }
      if (prudoctsNum !== undefined && prudoctsNum <= 0) {
        return res.status(400).json({ error: "Valid prudoctsNum" });
      }

      if (saler) {
        const salerUser = CheckExit.checkUserByEmail(saler);
        if (!salerUser) {
          return res.status(404).json({ error: "User not found" });
        }
        prudoct.salerName = salerUser.name;
      }

      if (title !== undefined) prudoct.title = title;
      if (description !== undefined) prudoct.description = description;
      if (category !== undefined) prudoct.category = category;
      if (images !== undefined) prudoct.images = images;
      if (price !== undefined) prudoct.price = price;
      if (prudoctsNum !== undefined) prudoct.prudoctsNum = prudoctsNum;
      if (prudoctNo !== undefined) prudoct.prudoctNo = prudoctNo;

      await prudoct.save();
      return res
        .status(200)
        .json({ message: "Updated successfully", data: prudoct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
  static async removePrudoct(data, res) {
    const { id } = await data;
    const isValidId = idValidation(id);
    if (!isValidId) {
      res.status(301).json({ error: "valid id" });
      return;
    }
    const delPrudoct = Prudoct.findOneAndDelete({ _id: id });
    if (!delPrudoct) {
      res.status(301).json({ error: "Field to remove" });
      return;
    }
    res.status(201).json({ message: "deleted successfully" });
  }
}
