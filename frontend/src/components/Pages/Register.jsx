import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form, useField } from "formik";
import { registerValidationSchema } from "../../schemas/userSchema";
import { useRegisterMutation } from "../../redux/action/apiSlice";
import { setCredentials } from "../../redux/action/authSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();

  //getting register mutation from authApiSlice
  const [register, { isLoading }] = useRegisterMutation();
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
      <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
        <div className=" p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900">
          {/* formik form */}
          <Formik
            initialValues={{
              fullName: "",
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={registerValidationSchema}
            // handle form submission
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                // need to figure out how to handle user registration data and if dispatch action is required
                const res = await register({ ...values }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate("/chat");
              } catch (error) {
                toast.error(error?.data?.message || error.error);
                resetForm();
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col">
                <h1 className="text-3xl font-semibold dark:text-white pb-5">
                  Create a{" "}
                  <span className="text-blue-500 dark:text-blue-400">
                    new account
                  </span>
                </h1>
                <MyTextInput
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  className="input mb-5 bg-neutral-300 dark:bg-slate-50"
                />
                <MyTextInput
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="input mb-5 bg-neutral-300 dark:bg-slate-50"
                />
                <MyTextInput
                  name="email"
                  type="email"
                  placeholder="name@example.com "
                  className="input mb-5 bg-neutral-300 dark:bg-slate-50"
                />
                <MyTextInput
                  name="password"
                  type="password"
                  className="input mb-5 bg-neutral-300 dark:bg-slate-50"
                  placeholder="Password"
                />
                <MyTextInput
                  name="confirmPassword"
                  type="password"
                  className="input mb-5 bg-neutral-300 dark:bg-slate-50"
                  placeholder="Confirm Password"
                />
                {isLoading ? (
                  <div className="loading loading-spinner mx-auto"></div>
                ) : (
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                )}
                <div className="dark:text-gray-50 mt-2  text-center hover:underline inline-block hover:text-blue-700 dark:hover:text-blue-300">
                  <p>
                    <Link to="/login">Already have account? Login</Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
