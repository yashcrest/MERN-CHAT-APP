import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import { loginValidationSchema } from "../../schemas/userSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/action/authSlice";
import { useLoginMutation } from "../../redux/action/userApiSlice";
import { toast } from "react-toastify";
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
      <div className="flex flex-col items-center justify-center h-screen">
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
              <h1 className="text-5xl pb-2">Log in to your account</h1>
              {/* custom labels and inputs */}
              <MyTextInput
                label="Username"
                placeholder="Enter your username"
                name="username"
                type="text"
                className="input"
              />
              <MyTextInput
                label="Password"
                placeholder="Enter Password"
                name="password"
                type="password"
                className="input"
              />
              <button
                disabled={isSubmitting}
                type="submit"
                className="input-btn"
              >
                Login
              </button>
              <div>
                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
