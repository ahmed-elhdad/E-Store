import { PrudoctService } from "../services/prudoctService.js";
export const getPrudoct = async (req, res) => {
  PrudoctService.getPrudoct(req.body, res);
};
export const getPrudocts = async (req, res) => {
  PrudoctService.getPrudocts(req.body, res);
};

export const createPrudoct = async (req, res) => {
  PrudoctService.createPrudoct(req.body, res);
};

export const editPrudoct = async (req, res) => {
  PrudoctService.editPrudoct(req.body, res);
};

export const removePrudoct = async (req, res) => {
  PrudoctService.removePrudoct(req.body, res);
};
