import { WishListService } from "../services/wishListService.js";
export const getWishList = (req, res) => {
  WishListService.getWishList(req.body, res);
};

export const addPrudoctToWishList = (req, res) => {
  WishListService.addPrudoctToWishList(req.body, res);
};
export const removePrudoctFromWishList = (req, res) => {
  WishListService.removePrudoctFromWishList(req.body, res);
};
