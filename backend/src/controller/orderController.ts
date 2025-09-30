import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../component/sendResponse";
import { orderSchema } from "../validations/orderValidation";

export const placeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details
        .map((d) => d.message.replace(/\"/g, ""))
        .join(", ");
      console.log("Validation error:", message);
      return sendResponse(res, 400, false, message);
    }

    console.log("Order received:", req.body);
    return sendResponse(res, 201, true, "Order placed successfully!",req.body);
  } catch (err: any) {
    next(err);
  }
};
