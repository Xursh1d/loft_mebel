import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import ReactLoading from "react-loading";
import { createAccount } from "../api/UrlApi";
import { FaCheck } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import Fade from "react-reveal/Fade";
import Select from "react-select";

export default function PostUserName({ otpStatus, signUpError, userToken }) {
  const [signUpLoader, setSignUpLoader] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [checkPassword, setCheckPassword] = useState(false);
  const [dataStatus, setDataStatus] = useState(false);
  const [photo,setPhoto] = useState();
  const history = useHistory();
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  if (dataStatus) {
    history.push("/user/sign_in");
  }
  const handleChangeImage = (e) => {
    setPhoto(e.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      phone: "",
    },
    onSubmit: (values) => {
      // const data = new FormData();
      // data.append(photo.name, photo,photo.name);
      // console.log(data);
      setSignUpLoader(true);
      createAccount(
        userToken,
        values.fullName,
        values.phone,
        values.password,
        selectedOption.value
        // data
      ).then((response) => {
        console.log(response.data);
        setDataStatus(response.data.status);
        signUpError(response.data.detail);
        setSignUpLoader(false);
      });
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .required("Enter Full Name")
        .max(255, "Must be less then 255 characters "),
      password: Yup.string()
        .required("Enter password")
        .min(8, "More then 8 characters"),
      phone: Yup.string()
        .required("Enter phone number")
        .max(20, "Must be less then 20 characters"),
    }),
  });

  return (
    <Fade>
      <form
        onSubmit={formik.handleSubmit}
        className={otpStatus ? "sign" : "close_sign_page"}
      >
        <h1 className="title_enter_code">Last Step</h1>
        <div className="input_row">
          <div className="input_container up_input fullname">
            <input
              className={
                formik.errors.fullName && formik.touched.fullName
                  ? "error_value"
                  : null
              }
              name="fullName"
              type="text"
              onBlur={formik.handleBlur}
              placeholder="Full Name"
              onChange={formik.handleChange}
              value={formik.values.fullName}
            />
            {formik.errors.fullName && formik.touched.fullName ? (
              <p className="required">{formik.errors.fullName}</p>
            ) : null}
          </div>
          <div className="upload_image">
            <FiUpload className="upload_icon" />
            <input
              type="file"
              className="image_input"
              onChange={handleChangeImage}
            />
          </div>
        </div>
        <div className="input_container">
          <input
            type="phone"
            className={
              formik.errors.phone && formik.touched.phone ? "error_value" : null
            }
            name="phone"
            placeholder="Enter phone number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="required">{formik.errors.phone}</p>
          ) : null}
        </div>
        <div className="input_row">
          <div className="input_container up_input">
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
          <Select
            className="gender"
            placeholder={"Gender"}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="create_check sign_up_password">
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
        {signUpLoader ? (
          <div className="next_loader_btn otp_loader">
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
              formik.values.fullName.length &&
              formik.values.password.length >= 8 &&
              formik.values.phone
                ? "code_next_btn"
                : "code_next_btn disabled_btn"
            }
          >
            Sign Up
          </button>
        )}
      </form>
    </Fade>
  );
}
