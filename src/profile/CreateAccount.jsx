import { useState } from "react";
import "react-phone-number-input/style.css";
import { ToastContainer, toast } from "react-toastify";
import CheckEmail from "./CheckEmail";
import CheckOtp from "./CheckOtp";
import PostUserName from "./PostUserName";
import { Zoom } from "react-toastify";

export default function CreateAccount() {
  const [userToken, setUserToken] = useState();
  const [status, setStatus] = useState(false);
  const [otpStatus, setOtpStatus] = useState(false);
  const [email, setEmail] = useState();
  const [time, setTime] = useState(false);

  const dataError = (err) => {
    if (err === "USER_EXISTS") {
      toast.warn("User allready exists !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_warn",
      });
    } else if (err === "NOT_VALID_EMAIL") {
      toast.error("Email is not valid !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_error",
      });
    }
  };
  const otpError = (err) => {
    if (err === "EXPIRED") {
      toast.warn("Expired code !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_warn",
      });
    } else if (err === "WRONG_CODE") {
      toast.error("Incorrect code !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_error",
      });
    } else if (err === "BAD_REQUEST") {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_error",
      });
    }
  };
  const signUpError = (err) => {
    console.log(err);
    if (err === "DATABASE_ERROR") {
      toast.warn("Something went without server please try again !", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_warn",
      });
    } else if (err === "BAD_REQUEST") {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_error",
      });
    } else if (err === "TIMEOUT") {
      toast.error("Expired please try again!", {
        position: "bottom-right",
        autoClose: 7000,
        draggable: true,
        className: "toast_error",
      });
    }
  };

  return (
    <>
      <ToastContainer 
      transition={Zoom}
      bodyClassName="toastBody" />
      <div className="profile_page sign_up_page">
        <CheckEmail
          setEmail={setEmail}
          userToken={userToken}
          setUserToken={setUserToken}
          status={status}
          setStatus={setStatus}
          setTime={setTime}
          dataError={dataError}
        />
        <CheckOtp
          email={email}
          status={status}
          setStatus={setStatus}
          otpStatus={otpStatus}
          userToken={userToken}
          setUserToken={setUserToken}
          otpError={otpError}
          setOtpStatus={setOtpStatus}
          setTime={setTime}
          time={time}
        />
        <PostUserName
          otpStatus={otpStatus}
          userToken={userToken}
          signUpError={signUpError}
        />
      </div>
    </>
  );
}
