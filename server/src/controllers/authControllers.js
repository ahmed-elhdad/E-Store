import jwt from "jsonwebtoken";
import User from "../models/User";
export const register = async (req, res) => {
  const { name, email, password } = await req.body;
  if (!name || !email || !password) {
    res.json({ message: "Valid data entry" });
    return;
  }
  const exit = User.findOne({});
  if (exit) {
    res.json({ message: "error" });
    return;
  }
  User(name, email, password);
  User.save();
  const token = jwt.sign({ email: email, name: name }, process.env.JWT_SECRET);
  res.json({ user: User, token: token });
};
