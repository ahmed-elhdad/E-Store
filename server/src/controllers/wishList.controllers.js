import { WishListService } from "../services/wishListService.js";

export const getWishList = async (req, res) => {
  await WishListService.getWishList(req, res);
};

export const addPrudoctToWishList = async (req, res) => {
  await WishListService.addPrudoctToWishList(req, res);
};

export const removePrudoctFromWishList = async (req, res) => {
  await WishListService.removePrudoctFromWishList(req, res);
};
