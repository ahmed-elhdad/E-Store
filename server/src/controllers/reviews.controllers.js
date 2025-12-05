import { ReviewsService } from "../services/reviewsService.js";

export const get = async (req, res) => {
  await ReviewsService.getReview(req.body, res);
};
export const add = async (req, res) => {
  await ReviewsService.addReview(req.body, res);
};
export const edit = async (req, res) => {
  await ReviewsService.editReview(req.body, res);
};
export const remove = async (req, res) => {
  await ReviewsService.removeReview(req.body, res);
};
