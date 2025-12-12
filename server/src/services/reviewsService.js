import mongoose from "mongoose";
import { CheckExit } from "../middleware/checkExit.js";
import { idValidation } from "../middleware/idValidation.js";

export class ReviewsService {
  static async getReviews(data, res) {
    try {
      const { prudoctId } = data;
      if (!prudoctId) {
        return res.status(404).json({ error: "required prudoctId" });
      }
      const isValidId = idValidation(prudoctId);
      if (!isValidId) {
        return res.status(301).json({ error: "Valid ID required" });
      }
      const existingPrudoct = CheckExit.checkPrudoctById(prudoctId);

      if (!existingPrudoct) {
        return res.status(404).json({ error: "prudcot not found" });
      }

      res.status(201).json({ data: existingPrudoct.reviews });
    } catch (err) {
      res.status(501).json({ error: err });
    }
  }
  static async addReview(data, res) {
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
        id: new mongoose.Types.ObjectId(),
        userId: userId,
        text: text,
      };
    const currentReviews = Array.isArray(existingPrudoct.reviews) ? existingPrudoct.reviews : [];
    currentReviews.push(review);
    existingPrudoct.reviews = currentReviews;
    await existingPrudoct.save();
    res.status(201).json({ messsage: "Add successfully" });
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
