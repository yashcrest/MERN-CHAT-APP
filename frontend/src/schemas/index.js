import * as yup from "yup";

const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const registerValidationSchema = yup.object().shape({
  username: yup.string("Username has already been taken").required(),
  email: yup.string().email("Please enter a valid email.").required(),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Create stronger password" })
    .required(),
  password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match")
    .required(),
});
