import Joi from "joi";

export const orderSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "First name is required",
      "string.pattern.base": "First name can only contain letters and spaces",
    }),

  lastName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.base": "Last name can only contain letters and spaces",
    }),

  address: Joi.string().trim().required().messages({
    "string.empty": "Address is required",
  }),

  cartItems: Joi.array()
    .items(
      Joi.object({
        id: Joi.alternatives().try(Joi.string(), Joi.number()).required().messages({
          "number.required": "Cart item must have an id",
        }),
        name: Joi.string().required().messages({
          "string.empty": "Cart item must have a name",
        }),
        price: Joi.number().required().messages({
          "number.base": "Cart item must have a price",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Cart item must have a quantity",
          "number.min": "Cart item quantity must be at least 1",
        }),
      }).unknown(true)
    )
    .min(1)
    .required()
    .messages({
      "array.min": "Cart cannot be empty",
    }),
}).unknown(true);
