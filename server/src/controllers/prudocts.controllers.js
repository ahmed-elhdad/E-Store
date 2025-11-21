import { PrudoctService } from "../services/prudoctService.js";

export const getPrudoct = async (req, res) => {
  await PrudoctService.getPrudoct({ id: req.params.id }, res);
};

export const getPrudocts = async (req, res) => {
  await PrudoctService.getPrudocts({ category: req.query.category }, res);
};

export const createPrudoct = async (req, res) => {
  await PrudoctService.createPrudoct(req, res);
};

export const editPrudoct = async (req, res) => {
  await PrudoctService.editPrudoct(req, res);
};

export const removePrudoct = async (req, res) => {
  await PrudoctService.removePrudoct({ id: req.body.id || req.params.id }, res);
};
