import React, { useState } from "react";
import ReactLoading from "react-loading";
import { checkEmail } from "../api/UrlApi";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Fade from "react-reveal/Fade";
export default function CheckEmail({
  status,
  setStatus,
  setUserToken,
  dataError,
  setTime,
  setEmail,
}) {
  const [postLoader, setPostLoader] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      setPostLoader(true);
      setEmail(values.email);
      checkEmail(values.email).then((response) => {
        setStatus(response.data.status);
        setUserToken("");
        setTime(true);
        {
          response.data.data
            ? setUserToken(response.data.data.token)
            : dataError(response.data.detail);
        }
        setPostLoader(false);
      });
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .max(125, "Must be less then 125 charcters")
        .required("Enter email"),
    }),
  });

  return (
    <Fade>
      <form
        onSubmit={formik.handleSubmit}
        className={!status ? "sign" : "close_sign_page"}
      >
        <div className="auth_btn">
          <Link to="/user /sign_up">
            <div className="active_btn">Sign Up</div>
          </Link>
          <Link to="/user/sign_in">
            <div>Sign In</div>
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
        {postLoader ? (
          <div className="next_loader_btn">
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
            type="submit"
            disabled={!formik.isValid}
            className={
              formik.isValid && formik.values.email
                ? "next_btn"
                : "next_btn disabled_btn"
            }
          >
            Next
          </button>
        )}
      </form>
    </Fade>
  );
}
