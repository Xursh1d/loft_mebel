import React, { useState } from "react";
import { checkUserName } from "../api/UrlApi";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { Zoom } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import Fade from "react-reveal/Fade";
import * as Yup from "yup";

export default function LogIn() {
  const [checkPassword, setCheckPassword] = useState(false);
  const [postLoader, setPostLoader] = useState(false);
  const history = useHistory();

  const loginErrors = (err) => {
    if (err === "WRONG_PASSWORD") {
      toast.error("Incorrect password !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_error",
      });
    } else if (err === "TRY_IN_FIVE_MINUTES") {
      toast.warn("Too many attemps, please try again later !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_warn",
      });
    } else if (err === "USER_NOT_EXISTS") {
      toast.warn("User does not exist !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_warn",
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      setPostLoader(true);
      checkUserName(values.userName, values.password).then((response) => {
        if (response.data.status === true) {
          localStorage.setItem(
            "access",
            JSON.stringify(response.data.data.access)
          );
          localStorage.setItem(
            "refresh",
            JSON.stringify(response.data.data.refresh)
          );
          history.goBack();
        }
        loginErrors(response.data.detail);
        setPostLoader(false);
      });
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Enter user name or phone number")
        .max(255, "Must be less then 255 characters"),
      password: Yup.string()
        .max(125, "Must be less then 125 characters")
        .min(8, "More then 8 characters")
        .required("Enter password"),
    }),
  });
  return (
    <>
      <ToastContainer transition={Zoom} bodyClassName="toastBody" />
      <Fade>
        <div className="profile_page">
          <form className="sign" onSubmit={formik.handleSubmit}>
            <div className="auth_btn">
              <Link to="/user/sign_up">
                <div>Sign Up</div>
              </Link>
              <Link to="/user/sign_in">
                <div className="active_btn">Sign In</div>
              </Link>
            </div>
            <div className="input_container">
              <input
                className={
                  formik.errors.userName && formik.touched.userName
                    ? "error_value"
                    : null
                }
                name="userName"
                type="text"
                onBlur={formik.handleBlur}
                placeholder="Username or phone number"
                onChange={formik.handleChange}
                value={formik.values.userName}
              />
              {formik.errors.userName && formik.touched.userName ? (
                <p className="required">{formik.errors.userName}</p>
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
                  className={checkPassword ? "show_background" : ""}
                  id="show_password"
                  onChange={() => setCheckPassword(!checkPassword)}
                />
                <label htmlFor="show_password">Show password</label>
                <FaCheck
                  className={checkPassword ? "checked_show" : "checked_none"}
                />
              </div>
              <Link to="/" className="forget_link">
                Forget your password ?
              </Link>
            </div>
            {postLoader ? (
              <div className="log_in_loader">
                <ReactLoading
                  className="loader_spin_auth"
                  type={"spin"}
                  color={"#ffffff"}
                  height={"20px"}
                  width={"30px"}
                />
              </div>
            ) : (
              <button
                disabled={!formik.isValid}
                type="submit"
                className={
                  formik.isValid && formik.values.password
                    ? "log_in_btn"
                    : "log_in_btn disabled_btn"
                }
              >
                Log In
              </button>
            )}
          </form>
        </div>
      </Fade>
    </>
  );
}
