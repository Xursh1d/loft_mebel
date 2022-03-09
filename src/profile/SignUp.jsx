import { useState } from "react";
import ReactLoading from "react-loading";
import "./Profile.css";
import OtpField from "react-otp-field";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import "typeface-poppins";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { checkEmail, checkOtpCode } from "../api/UrlApi";
import GenderSelect from "./GenderSelect";

export default function SignUp() {
  const [otpValue, setOtpValue] = useState("");
  const [userToken, setUserToken] = useState();
  const [status, setStatus] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const [detail, setDetail] = useState();
  const [otpDetail, setOtpDetail] = useState();
  const [postLoader, setPostLoader] = useState();
  const [otpLoader, setOtpLoader] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [checkPassword, setCheckPassword] = useState(false);


  const postEmailBtn = () => {
    setPostLoader(true);
    checkEmail(formik.values.email).then((postEmail) => {
      setStatus(postEmail.data.status);
      setUserToken("");
      setDetail("");
      setOtpDetail("");
      {
        postEmail.data.data
          ? setUserToken(postEmail.data.data.token)
          : setDetail(postEmail.data.detail);
      }
      setPostLoader(false);
    });
  };
  const postOtpBtn = () => {
    setOtpLoader(true);
    checkOtpCode(formik.values.email, userToken, otpValue).then(
      (postOtpCode) => {
        console.log(postOtpCode.data);
        setOtpStatus(postOtpCode.data.status);
        setOtpDetail(postOtpCode.data.detail);
        setOtpLoader(false);
      }
    );
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      password:""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email"),
      fullName: Yup.string().required("Enter Full Name"),
      password: Yup.string()
        .min(8, "More then 8 characters")
        .required("Enter password"),
    }),
  });
  return (
    <div className="profile_page">
      <div className={status ? "sign" : "close_sign_page"}>
        <div className="auth_btn">
          <Link to="/user /sign_up">
            <div className="active_btn">Sign Up</div>
          </Link>
          <Link to="/user/sign_in">
            <div>Sign In</div>
          </Link>
        </div>
        <p className="eror_post_request">{detail ? `${detail}` : ""}</p>
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
          <div
            onClick={() => postEmailBtn()}
            className={
              formik.values.email ? "next_btn" : "next_btn disabled_btn"
            }
          >
            Next
          </div>
        )}
      </div>
      <div className={!status && otpStatus ? "sign" : "close_sign_page"}>
        <h1 className="title_enter_code">Enter Confirmation Code</h1>
        {!otpStatus && otpDetail ? (
          <p className="eror_post_request otp_detail">{`${otpDetail}`}</p>
        ) : (
          <p className="sent_code_gmail">
            Enter the confirmation code we sent to {formik.values.email}
          </p>
        )}

        <div className="opt_inputs">
          <OtpField
            value={otpValue}
            onChange={setOtpValue}
            numInputs={6}
            autoFocus={true}
            separator={<span>-</span>}
            isTypeNumber
          />
        </div>
        <span onClick={() => postEmailBtn()} className="resend_code">
          Resend Code
        </span>

        {otpLoader ? (
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
            onClick={() => postOtpBtn()}
            className={
              otpValue.length === 6
                ? "code_next_btn"
                : "code_next_btn disabled_btn"
            }
          >
            Next
          </button>
        )}

        <button onClick={() => setStatus(false)} className="go_back_btn">
          Go Back
        </button>
      </div>
      <div className={!otpStatus ? "sign" : "close_sign_page"}>
      <h1 className="title_enter_code">Create New Account</h1>
        <div className="input_container">
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
        <div className="input_container">
          <PhoneInput
            international={false}
            placeholder="Enter phone number"
            defaultCountry="UZ"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e)}
    
          />
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
            <GenderSelect/>
          </div>
          <div className="create_check sign_up_password">
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
      </div>
    </div>
  );
}
