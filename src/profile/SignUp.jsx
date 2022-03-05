import { useState } from "react";
import "./Profile.css";
import OtpField from "react-otp-field";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "typeface-poppins"

export default function SignUp() {
  const [otpValue, setOtpValue] = useState("");
  const [openCode,setOpenCode]=useState(false)
  console.log(otpValue)
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email"),
    }),
  });
  return (
    <div className="profile_page">
      <form className={!openCode?"sign":"close_sign_page"}>
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
        <div onClick={()=>setOpenCode(!openCode)} type="submit" className="next_btn">
          Next
        </div>
      </form>
      <form className={openCode?"sign":"close_sign_page"}>
        <h1 className="title_enter_code">Enter Confirmation Code</h1>
        <p className="sent_code_gmail">Enter the confirmation code we sent to {formik.values.email} </p>
        <div className="opt_inputs">
          <OtpField
            value={otpValue}
            onChange={setOtpValue}
            numInputs={6}
            autoFocus
            separator={<span>-</span>}
            isTypeNumber
          />
        </div>
        <span className="resend_code">Resend Code</span>
        <button  className="code_next_btn">Next</button>
        <button onClick={()=>setOpenCode(!openCode)} className="go_back_btn">Go Back</button>
      </form>
    </div>
  );
}
