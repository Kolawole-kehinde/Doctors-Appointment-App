import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, { message: "Name must be at least 5 characters" }),
    email: z
      .string()
      .trim()
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(8, { message: "Confirm password must match the password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });


  export const loginSchema = z.object({
    email: z
      .string()
      .trim()
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters" }),
  });



// export const profileSchema = z.object({
//   email: z
//     .string()
//     .email({ message: "Kindly provide a valid email" })
//     .trim(),
  
//   name: z
//     .string()
//     .min(3, { message: "Full Name must be at least 3 characters" })
//     .trim(),
  
//   phone: z
//     .string()
//     .regex(
//       /^(\+?[1-9]{1,4}[-\s]?)?(\(?\d{1,3}\)?[-\s]?)?(\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4})$/,
//       { message: "Please provide a valid phone number" }
//     )
//     .trim(),
  
//   address: z
//     .string()
//     .min(5, { message: "Address must be at least 5 characters long" })
//     .trim(),
// });
