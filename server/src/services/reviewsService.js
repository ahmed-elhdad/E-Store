import { CheckExit } from "../middleware/checkExit";
import { idValidation } from "../middleware/idValidation";

export class ReviewsService {
  static async getReview(data, res) {
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
  }
  static async addReview(data, res) {
    
  }
  static async editReview(data, res) {}
  static async removeReview(data, res) {}
}
