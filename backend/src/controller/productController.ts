import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../component/sendResponse";
import { products } from "../data/products";

export const getProducts = async (req: Request, res: Response,next: NextFunction) => {
  try {
    if (!products.length) {
      return sendResponse(res, 404, false, "No products found", []);
    }

    return sendResponse(
      res,
      200,
      true,
      "Products fetched successfully",
      products
    );
  } catch (error: any) {
    next(error);
  }
};
