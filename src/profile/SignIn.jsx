import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Profile.css";
import Menu from "../homePage/Menu";
import MenuBar from "../homePage/menuComponents/MenuBar";
import LogoSearch from "../homePage/LogoSearch";
import {
  CategoriesContext,
  ChangeSearchContext,
  MenuContext,
} from "../context/Context";
import Footer from "../homePage/Footer";
import Categories from "../homePage/Categories";
import Input from "../homePage/Input";
import { useContext } from "react";

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Enter user name or phone number"),
      password: Yup.string()
        .min(8, "More then 8 characters")
        .required("Enter password"),
    }),
  });
  const [checkPassword, setCheckPassword] = useState(false);
  const { categories } = useContext(CategoriesContext);
  const [menuBar, setMenuBar] = useContext(MenuContext);
  const { setSearch, setChangeSearch, search } =
    useContext(ChangeSearchContext);
  useEffect(() => {
    setSearch([]);
  }, []);
  const history=useHistory();
  const handelHistory=()=>{
    history.goBack()
  }
  return (
    <div onClick={() => setMenuBar(false)}>
      <MenuBar
        categories={categories}
        menuBar={menuBar}
        setMenuBar={setMenuBar}
      />
      <Menu />
      <LogoSearch
        active_contact_page="active_page"
        search={search}
        setMenuBar={setMenuBar}
        setChangeSearch={setChangeSearch}
      />
      <Input
        setChangeSearch={setChangeSearch}
        search={search}
        style={"mobile-input"}
        type={"text"}
        palceholder={"Search"}
      />
      <Categories categories={categories} />
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
              Forget password ?
            </Link>
          </div>
          <button
          onClick={()=>handelHistory()}
          type="submit" className="log_in_btn">
            Log In
          </button>
        </form>
      </div>
      <Footer categories={categories} />
    </div>
  );
}
