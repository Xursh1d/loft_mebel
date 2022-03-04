import React from 'react'
import "./Profile.css";
import { Link } from 'react-router-dom';
import { useFormik} from "formik";
import * as Yup from "yup";

export default function SignUp() {
    const formik=useFormik({
        initialValues:{
        email:""
        },
        validationSchema:Yup.object({
            email:Yup.string().email("Invalid email")
        })
    })
  return (
    <div className="profile_page">
         <form className="sign">
         <div className="auth_btn">
          <Link to="/profile/sign_up">
            <div className="active_btn">Sign Up</div>
          </Link>
          <Link to="/profile/sign_in">
            <div >Sign In</div>
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
            placeholder="Create email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="required">{formik.errors.email}</p>
          ) : null}
        </div>
        <button type="submit" className="next_btn">
          Next
        </button>
         </form>
    </div>
  )
}
