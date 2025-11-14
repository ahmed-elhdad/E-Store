import mongoose from "mongoose";
import Prudoct from "../models/Prudoct.js";
import User from "../models/User.js";
export const getPrudocts = async (req, res) => {
  const { category } = await req.body;
  if (!category) {
    res.json({ message: "valid category" });
    return;
  }
  const prudocts = Prudoct.find({ category: category });
  res.status(201).json({ data: prudocts });
};

export const createPrudoct = async (req, res) => {
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
    } = await req.body;
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
    const salerExit = User.find({ email: saler });
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
};

export const editPrudoct = async (req, res) => {
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
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "valid id" });
    }

    const prudoct = await Prudoct.findById(id);
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
      const salerUser = await User.findOne({ email: saler });
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
};

export const removePrudoct = async (req, res) => {
  const { id } = await req.body;
  const isValidId = mongoose.Types.ObjectId.isValid(id);
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
};
