import User from "../models/User.model.js";
import Prudoct from "../models/Prudoct.model.js";
export class CheckExit {
  static async checkUserById(id) {
    const exit = await User.findById(id);
    return exit;
  }
  static async checkUserByEmail(email) {
    const exit = await User.findOne({ email: email });
    return exit;
  }
  static async checkPrudoctById(id) {
    const exit = await Prudoct.findById(id);
    return exit;
  }
  static async checkPrudoctByCategory(category) {
    const exit = await Prudoct.find({ category: category });
    return exit;
  }
}
