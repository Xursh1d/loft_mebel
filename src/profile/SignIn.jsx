import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik} from "formik";
import * as Yup from "yup";
import "./Profile.css";
export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter email"),
      password: Yup.string()
        .min(8, "More then 8 characters")
        .required("Enter password"),
    }),
  });
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <div className="profile_page">
      <form className="sign" onSubmit={formik.handleSubmit}>
        <div className="auth_btn">
          <Link to="/profile/sign_up">
            <div>Sign Up</div>
          </Link>
          <Link to="/profile/sign_in">
            <div className="active_btn">Sign In</div>
          </Link>
        </div>
        <div className="input_container">
          <input
            className={
              formik.errors.email && formik.touched.email ? "error_value" : null
            }
            name="email"
            type="email"
            onBlur={formik.handleBlur}
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="required">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="input_container">
          <input
            className={
              formik.errors.password && formik.touched.password
                ? "error_value"
                : null
            }
            name="password"
            type={checkPassword ? "text" : "password"}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="required">{formik.errors.password}</p>
          ) : null}
        </div>
        <div className="password_item">
          <div className="create_check">
            <input
              type="checkbox"
              className={checkPassword ? "show_background" :""}
              id="show_password"
              onChange={() => setCheckPassword(!checkPassword)}
            />
            <label htmlFor="show_password">Show password</label>
            <FaCheck
              className={checkPassword ? "checked_show" : "checked_none"}
            />
          </div>
          <Link to="/" className="forget_link">
            Forget password ?
          </Link>
        </div>
        <button type="submit" className="log_in_btn">
          Log In
        </button>
      </form>
    </div>
  );
}
