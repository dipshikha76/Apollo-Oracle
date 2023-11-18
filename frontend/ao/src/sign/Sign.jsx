import React from "react";
import styles from "./Sign.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Sign = () => {
  const navigateTo = useNavigate();

  const [Name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Password, setPassword] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");

  const axiosPostData = async () => {
    const postData = {
      Name: Name,
      DOB: DOB,
      Email: Email,
      Contact: Contact,
      Password: Password,
    };
    await axios
      .post("http://localhost:4000/sign", postData)
      .then((res) => {
        if (res.data == "User created successfully") {
          navigateTo("/home");
        }
      })
      .catch((err) => console.log(err));
  };
  const verifyAndSave = async(e) => {
    e.preventDefault();
    const data = {
      code: code,
    };
    await axios
      .post("http://localhost:4000/verifyCode", data)
      .then((response) => {
        if (response.data === "Matched") {
          axiosPostData();
        }
        else if(response.data === "did not match") {
          alert("wrong code entered");
          setCodeSent(false);
        }
      });
  };
  const sendCode = async (e) => {
    e.preventDefault();
    const postData = {
      Name: Name,
      Email: Email,
    };
    await axios
      .post("http://localhost:4000/sendVerificationCode", postData)
      .then((response) => {
        if (response.data == "sent") {
          alert("OTP sent successfully to your email id.");
          setCodeSent(true);
        } else {
          alert("Something went wrong");
        }
      });
  };
  return !codeSent ? (
    <body className={styles.ls_body}>
      <div className={styles.name}>
        <h1>
          <span>A</span>POLLO'S<nbsp> </nbsp>
          <span>O</span>RACLE
        </h1>
      </div>
      <div className={styles.main}>
        <div className={styles.sign}>
          <form action="/sign">
            <label HTMLfor="chk" className={styles.label}>
              Sign Up
            </label>
            <input
              type="text"
              name="Name"
              placeholder="Name"
              required
              className={styles.input}
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="date"
              name="DOB"
              placeholder="Date of Birth"
              required
              className={styles.input}
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
            />
            <input
              type="email"
              name="Email"
              placeholder="Email"
              required
              className={styles.input}
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="contact"
              name="Contact"
              placeholder="contact"
              required
              className={styles.input}
              value={Contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              required
              className={styles.input}
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={sendCode} className={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className={styles.register}>
        <p>Already have an account?</p>
        <a href="/logsig">
          <button className={styles.btn}>Login</button>
        </a>
      </div>
    </body>
  ) : (
    <body className={styles.ls_body}>
      <div className={styles.name}>
        <h1>
          <span>A</span>POLLO'S<nbsp> </nbsp>
          <span>O</span>RACLE
        </h1>
      </div>
      <div className={styles.main}>
        <div className={styles.otpSent}>
          <input
              type="text"
              name="code"
            placeholder="OTP HERE"
            className={styles.inputOTP}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className={styles.otpSubmit}
            onClick={verifyAndSave}
          >
            Verify and Enter
          </button>
        </div>
      </div>
      <div className={styles.register}>
        <p>Already have an account?</p>
        <a href="/logsig">
          <button className={styles.btn}>Login</button>
        </a>
      </div>
    </body>
  );
};

export default Sign;
