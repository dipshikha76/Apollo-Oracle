import React from "react";
import styles from "./Sign.module.css";
import { useState } from "react";
import axios from "axios";
const Sign = () => { 
  const [Name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [Email, setEmail] = useState("");
  const [Contact, setContact] = useState("");
  const [Password, setPassword] = useState("");

  const axiosPostData = async () => {
    const postData = {
      Name: Name,
      DOB: DOB,
      Email: Email,
      Contact: Contact,
      Password: Password
    }
    await axios.post('http://localhost:4000/sign', postData).then(alert('posted')).catch(err => console.log(err));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPostData();
  };
  return (
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
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.button}
            >
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
  );
};

export default Sign;
