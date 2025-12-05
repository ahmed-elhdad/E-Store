import mongoose from "mongoose";
import { CheckExit } from "../middleware/checkExit.js";
import { idValidation } from "../middleware/idValidation.js";

export class ReviewsService {
  static async getReview(data, res) {
    try {
      const { prudoctId, reviewId } = data;
      const isValidId = idValidation(prudoctId);
      if (!isValidId) {
        return res.status(301).json({ error: "Valid ID required" });
      }
      const checkExitPrudoct = CheckExit.checkPrudoctById(prudoctId);

      if (!checkExitPrudoct) {
        return res.status(404).json({ error: "prudcot not found" });
      }
      const checkExitReview = checkExitPrudoct.reviews.find({ id: reviewId });
      if (!checkExitReview) {
        return res.status(404).json({ error: "review not found" });
      }
      res.status(201).json({ data: checkExitReview });
    } catch (error) {
      res.status(501).json({ error: err });
    }
  }
  static async addReview(data, res) {
    try {
      const { prudoctId, userId, text } = data;
      const isValidUserId = idValidation(userId),
        isValidPrudoctId = idValidation(prudoctId),
        existingUser = CheckExit.checkUserById(userId),
        existingPrudoct = CheckExit.checkPrudoctById(prudoctId);
      if (!isValidUserId || !isValidPrudoctId || !text || text == "")
        return res
          .status(301)
          .json({ error: "user Id , prudoct Id text are required" });
      if (!existingUser || !existingPrudoct)
        return res.status(404).json({ error: "user or prudcot not found" });
      const review = {
        id: mongoose.Types.ObjectId.createFromTime(Date.now()),
        userId: userId,
        text: text,
      };
      await existingPrudoct.reviews.push(review);
      await existingPrudoct.save();
      res.status(201).json({ messsage: "Add successfully" });
    } catch (error) {
      res.status(501).json({ error: err });
    }
  }
  static async editReview(data, res) {
    const { userId, prudoctId, reviewId, text } = data;
    const isValidUserId = idValidation(userId),
      isValidReviewId = idValidation(reviewId),
      isValidPrudoctId = idValidation(reviewId),
      existingUser = CheckExit.checkUserById(userId),
      existingPrudoct = CheckExit.checkPrudoctById(prudoctId),
      existingReview = existingPrudoct.reviews.find({ id: reviewId });
    if (
      !isValidUserId ||
      !isValidReviewId ||
      !existingUser ||
      !isValidPrudoctId ||
      !existingReview ||
      text == ""
    )
      return res.status(301).json({
        error: "user id , review id required or user or reveiw not exit",
      });
    if (userId != existingReview.userId)
      return res.status(301).json({ error: "you cann't edit this review" });
    existingReview.text = text;
    await existingReview.save();
    res.status(201).json({ message: "review edited successfully" });
  }
  static async removeReview(data, res) {
    try {
      const { userId, prudoctId, reviewId } = data;
      const isValidUserId = idValidation(userId),
        isValidReviewId = idValidation(reviewId),
        isValidPrudoctId = idValidation(reviewId),
        existingUser = CheckExit.checkUserById(userId),
        existingPrudoct = CheckExit.checkPrudoctById(prudoctId),
        existingReview = existingPrudoct.reviews.find({ id: reviewId });
      if (
        !isValidUserId ||
        !isValidReviewId ||
        !isValidPrudoctId ||
        !existingPrudoct ||
        !existingUser ||
        !existingReview
      )
        return res.status(301).json({
          error: "user id , review id required or user or reveiw not exit",
        });
      if (userId != existingReview) {
        return res.status(301).json({ error: "you cann't edit this review" });
      }
      await existingPrudoct.reviews.findOneAndDelete({ id: reviewId });
      await existingPrudoct.save();
      res.status(201).json({ message: "removed successfully" });
    } catch (err) {
      res.status(501).json({ error: err });
    }
  }
}
