import * as yup from "yup";

const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const registerValidationSchema = yup.object().shape({
  Username: yup.string().min(5, "Minimum of 5 character").required(),
  Email: yup.string().email("Please enter a valid email.").required(),
  Password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Create stronger password" })
    .required(),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Password does not match")
    .required(),
});
