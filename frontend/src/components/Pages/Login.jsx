import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import { loginValidationSchema } from "../../schemas/userSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/action/authSlice";
import { useLoginMutation } from "../../redux/action/userApiSlice";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // using userLoginMutation to pass value to redux
  const [login] = useLoginMutation();
  //formik labels and inputs
  const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {/* this is to check if the input field has been touched or any invalid input has been entered */}
        {meta.touched && meta.error ? (
          <div className="reg-error-msg">{meta.error}</div>
        ) : null}
      </>
    );
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto h-screen dark:bg-gray-800">
        <div className=" p-6 rounded-lg shadow-md bg-gray-100 dark:bg-gray-900">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            // values is the values passed by formik form. i.e. values:values
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                const res = await login({ ...values }).unwrap();
                console.log({ res });
                dispatch(setCredentials({ ...res }));
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
              // form submission in not passed onto the Form tag but is to "Formik" component which gets access to the values of the form directly.
              <Form className="flex flex-col form-item">
                <h1 className="text-3xl font-semibold text-center pb-2 dark:text-white">
                  Log in to{" "}
                  <span className="text-blue-500 dark:text-blue-400">Chat</span>
                </h1>
                {/* custom labels and inputs */}
                <MyTextInput
                  placeholder="Username"
                  name="username"
                  type="text"
                  className="input mb-5 bg-neutral-300 dark:bg-slate-50 dark:text-black"
                />
                <MyTextInput
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="input mb-5 bg-neutral-300 dark:bg-slate-50 dark:text-black"
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  Login
                </button>
                <div className="dark:text-gray-50 mt-2 hover:underline inline-block hover:text-blue-700 dark:hover:text-blue-300">
                  <p>
                    <Link to="/register"> Don't have an account? Register</Link>
                  </p>
                </div>
                <div className="divider dark:text-white">
                  <span>OR</span>
                </div>
                <button className="btn btn-primary my-1 flex">
                  Sign with Google
                  <FaGoogle className="text-xl" />
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
