import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import { loginValidationSchema } from "../../schemas/userSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/action/authSlice";
import { useLoginMutation } from "../../redux/action/apiSlice";
import { toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="text-red-500">{meta.error}</div>
        ) : null}
      </>
    );
  };
  return (
    <>
      {/* this is to cover the whole page */}
      <div className="bg-gray-200 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center max-w-80 mx-auto h-screen">
          <div className=" p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900">
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={loginValidationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const res = await login({ ...values }).unwrap();
                  console.log({ res });
                  dispatch(setCredentials(res));
                  // not navigating there cause backend needs to sent proper token and session
                  navigate("/chat");
                } catch (err) {
                  toast.error(err?.data?.message || err.error);
                  resetForm();
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col form-item">
                  <h1 className="text-3xl font-semibold text-center pb-2 dark:text-white text-slate-600">
                    Log in to{" "}
                    <span className="text-blue-500 dark:text-blue-400">
                      Chat
                    </span>
                  </h1>
                  {/* custom labels and inputs */}
                  <MyTextInput
                    placeholder="Username"
                    name="username"
                    type="text"
                    className="input mb-5 bg-neutral-300 text-black dark:bg-slate-50 dark:text-black"
                  />
                  <MyTextInput
                    placeholder="Password"
                    name="password"
                    type="password"
                    className="input mb-5 bg-neutral-300 text-black dark:bg-slate-50 dark:text-black"
                  />
                  {isLoading ? (
                    <div className="loading loading-spinner mx-auto"></div>
                  ) : (
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn bg-blue-700 text-white dark:bg-blue-500 dark:text-black btn-block"
                    >
                      Login
                    </button>
                  )}

                  <div className="dark:text-gray-50 mt-2 hover:underline inline-block hover:text-blue-700 dark:hover:text-blue-300">
                    <p className="text-zinc-700 dark:text-white">
                      <Link to="/register">
                        {" "}
                        Don't have an account? Register
                      </Link>
                    </p>
                  </div>
                  <span className="text-red-700 text-center">
                    If you are using Safari, please Go to Safari {">"}{" "}
                    Preferences {">"} Privacy and uncheck Prevent cross-site
                    tracking.
                  </span>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
