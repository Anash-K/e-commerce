import * as yup from "yup";

const nameRegex = /^[A-Za-z]+$/;

export const cartValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(nameRegex, "First name can only contain letters")
    .max(50, "First name cannot exceed 50 characters")
    .trim(),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(nameRegex, "Last name can only contain letters")
    .max(50, "Last name cannot exceed 50 characters")
    .trim(),
  address: yup
    .string()
    .required("Address is required")
    .max(200, "Address cannot exceed 200 characters")
    .trim(),
});
