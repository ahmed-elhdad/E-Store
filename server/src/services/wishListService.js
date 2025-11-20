import { idValidation } from "../middleware/idValidation.js";
import { CheckExit } from "../middleware/CheckExit.js";

export class WishListService {
  static async getWishList(data, res) {
    const { userId } = data;
    const isValidId = idValidation(userId);
    if (!isValidId) {
      res.status(301).json({ error: "Valid user id" });
      return;
    }
    const exiting = CheckExit.checkUserById(userId);
    if (!exiting) {
      res.status(404).json({ error: "User Not found" });
      return;
    }
    const wishList = await exiting.wishList;
    if (!wishList) {
      res
        .status(404)
        .json({ error: "not found a wish list try to create one" });
      return;
    }
    res.status(201).json({ data: wishList });
  }

  static async addPrudoctToWishList(data, res) {
    const { userId, prudoctId } = data;
    const isValidUserId = idValidation(userId);
    const isValidPrudoctId = idValidation(prudoctId);
    if (!isValidUserId || !isValidPrudoctId) {
      res.status(301).json({ error: "valid prudoct or user id" });
      return;
    }
    const exitingUser = CheckExit.checkPrudoctById(userId);
    const exitingPrudoct = exitingUser.wishList.filter(prudoctId);
    if (!exitingUser || exitingPrudoct) {
      res.status(404).json({ error: "not found user or found prudoct" });
      return;
    }
    const wishList = exitingUser.wishList;
    if (!wishList) {
      res.status(404).json({ error: "Not found wish list" });
      return;
    }
    await wishList.push(prudoctId);
    await exitingUser.save();
  }
  static async removePrudoctFromWishList(data, res) {
    const { userId, prudoctId } = data;
    const isValidUserId = idValidation(userId);
    const isValidPrudoctId = idValidation(prudoctId);
    if (!isValidUserId || !isValidPrudoctId) {
      res.status(301).json({ error: "valid user or prudoct id" });
      return;
    }
    const exitingUser = CheckExit.checkUserById(userId);
    const exitingPrudoct = exitingUser.wishList.filter(prudoctId);
    if (!exitingUser || !exitingPrudoct) {
      res.status(301).json({ error: "not found user or prudoct" });
      return;
    }
    const findPrudoct = function () {
      for (let i = 0; i < exitingUser.wishList.length; i++) {
        if (i == prudoctId) {
          return i;
        }
      }
    };
    await exitingUser.wishList[findPrudoct].remove();
    res.status(201).json({ error: "Prudoct removes successfully." });
  }
}
