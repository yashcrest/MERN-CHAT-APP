import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, useField } from "formik";
import { registerValidationSchema } from "../../schemas/userSchema";
import { useRegisterMutation } from "../../redux/action/authApiSlice";
import { setCredentials } from "../../redux/action/authSlice";

const Register = () => {
  const dispatch = useDispatch();

  //getting register mutation from authApiSlice
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  // formik reusable labels and inputs
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {/* this is displaying the error after schema does form validation */}
        {meta.touched && meta.error ? (
          <div className="reg-error-msg">{meta.error}</div>
        ) : null}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* formik form */}
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerValidationSchema}
          // handle form submission
          onSubmit={async (values, { setSubmitting }) => {
            try {
              // need to figure out how to handle user registration data and if dispatch action is required
              const res = await register({ ...values }).unwrap();
              dispatch(setCredentials({ ...res }));
              navigate("/chat");
            } catch (error) {
              console.error("Registration failed:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col form-item">
              <h1 className="text-5xl">Create a new account</h1>
              <MyTextInput
                label="username:"
                name="username"
                type="text"
                placeholder="avatar"
                className="input"
              />
              <MyTextInput
                label="email:"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="input"
              />
              <MyTextInput
                label="password:"
                name="password"
                type="password"
                className="input"
                placeholder="******"
              />
              <MyTextInput
                label="Confirm password"
                name="confirmPassword"
                type="password"
                className="input"
                placeholder="******"
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className="input-btn"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Register;
