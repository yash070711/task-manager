import * as z from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const loginSchema = z.object({
   email: z
    .string()
    .min(1, { message: "Please enter your email." })
    .max(255, { message: "Email is too long." })
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .min(1, { message: "Please enter password." })
    .max(255, { message: "Password is too long." })
    .regex(passwordValidation, {
      message:
        "Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
});

export const signupSchema = z
  .object({
    firstname: z
      .string()
      .min(1, { message: "Please enter your first name." })
      .max(50, { message: "First name is too long." }),

    lastname: z
      .string()
      .min(1, { message: "Please enter your last name." })
      .max(50, { message: "Last name is too long." }),

    email: z
    .string()
    .min(1, { message: "Please enter your email." })
    .max(255, { message: "Email is too long." })
    .email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(1, { message: "Please enter a password." })
      .max(255, { message: "Password is too long." })
      .regex(passwordValidation, {
        message:
          "Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Points error to confirmPassword field
    message: "Passwords do not match.",
  });
