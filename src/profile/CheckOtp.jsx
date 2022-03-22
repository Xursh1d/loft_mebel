import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { checkOtpCode, checkEmail } from "../api/UrlApi";
import Fade from "react-reveal/Fade";
import OtpField from "react-otp-field";
export default function CheckOtp({
  status,
  setStatus,
  otpStatus,
  otpError,
  setOtpStatus,
  userToken,
  email,
  setUserToken,
  time,
  setTime,
}) {
  const [otpLoader, setOtpLoader] = useState();
  const [otpValue, setOtpValue] = useState("");
  const [timeOut, setTimeOut] = useState(300);
  const [minut, setMinut] = useState(0);
  const [second, setSecond] = useState(0);
  let timer = null;
  useEffect(() => {
    if (time) {
      timeOut === 0
        ? setTime(!time)
        : (timer =
            timeOut > 0 &&
            setInterval(() => {
              setTimeOut(timeOut - 1);
              setMinut(Math.floor((timeOut % (60 * 60)) / 60));
              setSecond(Math.floor(timeOut % 60));
            }, 1000));
    } else {
      setTimeOut(300);
    }
    return () => clearInterval(timer);
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setOtpLoader(true);
    checkOtpCode(email, userToken, otpValue).then((postOtpCode) => {
      setOtpStatus(postOtpCode.data.status);
      otpError(postOtpCode.data.detail);
      setOtpLoader(false);
    });
  };
  const goBack = () => {
    setTime(false);
    setStatus(false);
    setOtpValue("");
  };
  const postEmailBtn = () => {
    setOtpValue("");
    checkEmail(email).then((response) => {
      setStatus(response.data.status);
      setUserToken(response.data.data.token);
      setTime(!time);
    });
  };
  return (
    <Fade>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={status && !otpStatus ? "sign mobile_otp" : "close_sign_page"}
      >
        <h1 className="title_enter_code">Enter Confirmation Code</h1>
        <p className="sent_code_gmail">
          Enter the confirmation code we sent to {email}
        </p>

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
        <span
          onClick={() => postEmailBtn()}
          className={!time ? "resend_code" : "resend_code_none"}
        >
          Resend Code
        </span>
        <span className={time ? "resend_code" : "resend_code_none"}>
          {minut < 10 ? `0${minut}` : `${minut}`}:
          {second < 10 ? `0${second}` : `${second}`}
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
            disabled={otpValue.length === 6 ? false : true}
            type="submit"
            className={
              otpValue.length === 6
                ? "code_next_btn"
                : "code_next_btn disabled_btn"
            }
          >
            Next
          </button>
        )}

        <div onClick={() => goBack()} className="go_back_btn">
          Go Back
        </div>
      </form>
    </Fade>
  );
}
