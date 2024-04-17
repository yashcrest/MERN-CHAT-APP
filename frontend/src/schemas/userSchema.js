import * as yup from "yup";

const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const registerValidationSchema = yup.object().shape({
  username: yup.string().min(5, "Minimum of 5 character").required(),
  email: yup.string().email("Please enter a valid email.").required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Create stronger password" })
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match")
    .required(),
});

export const loginValidationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
