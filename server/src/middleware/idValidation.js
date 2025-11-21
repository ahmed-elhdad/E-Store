import mongoose from "mongoose";
export const idValidation = (id) => {
  if (!id) return false;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  return isValid;
};
