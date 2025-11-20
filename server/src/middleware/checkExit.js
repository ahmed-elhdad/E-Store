import User from "../models/User.model.js";
export class CheckExit {
  static async checkUserById(id) {
    const exit = await User.findOne({ _id: id });
    return exit;
  }
  static async checkUserByEmail(email) {
    const exit = await User.findOne({ email: email });
    return exit;
  }
  static async checkPrudoctById(id) {
    const exit = await User.findOne({ _id: id });
    return exit;
  }
  static async checkPrudoctByCategory(category) {
    const exit = await User.findOne({ category: category });
    return exit;
  }
}
