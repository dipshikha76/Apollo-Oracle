import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { symbol } from "prop-types";
import { useInView } from "react-intersection-observer";
import "font-awesome/css/font-awesome.min.css";
import { Link , useNavigate } from "react-router-dom";
import {loggedIn, userData , setLoggedIn} from "../logsig/userData.js";

const Home = () => {
  const { ref: myRef1, inView: p1LUIsVisible } = useInView();
  const { ref: myRef2, inView: p1LLIsVisible } = useInView();
  const { ref: myRef3, inView: p1RUIsVisible } = useInView();
  const { ref: myRef4, inView: p1RLIsVisible } = useInView();
  const { ref: myRef5, inView: p2LUIsVisible } = useInView();
  const { ref: myRef6, inView: p2LLIsVisible } = useInView();
  const { ref: myRef7, inView: p2RUIsVisible } = useInView();
  const { ref: myRef8, inView: p2RLIsVisible } = useInView();
  const navigate = useNavigate();
 
  const handleLogOut = () => {
    setLoggedIn();
    navigate("/");
  }

  return (
    loggedIn && (
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <h2>
              <span>A</span>POLLO'S<nbsp> </nbsp>
              <span>O</span>RACLE
            </h2>
          </div>
          <div className={styles.welcome}>
            <h2>
              Welcome <span>{userData.name.split(" ")[0]}</span>
            </h2>
          </div>
          <div className={styles.dashboardandlogoutbtn}>
            <div className={styles.dashboard}>
              <i className="fa fa-user"></i>
              <div className={styles.profile}>Your Profile</div>
            </div>
            <div className={styles.logoutdiv}>
              <button className={styles.logoutbtn}onClick={handleLogOut}>Log out</button>
            </div>
          </div>
        </div>

        <div className={styles.page1}>
          <div className={styles.leftOfPage1}>
            <Link
              to={"/quiz"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                ref={myRef1}
                className={`${styles.page1LU} ${
                  p1LUIsVisible ? styles.show : ""
                }`}
              >
                Hindu Mythological
              </div>
            </Link>
            <div
              ref={myRef2}
              className={`${styles.page1LL} ${
                p1LLIsVisible ? styles.show : ""
              }`}
            >
              Indian Current Affais
            </div>
          </div>
          <div className={styles.rightOfPage1}>
            <div
              ref={myRef3}
              className={`${styles.page1RU} ${
                p1RUIsVisible ? styles.show : ""
              }`}
            >
              Indian and World History
            </div>
            <div
              ref={myRef4}
              className={`${styles.page1RL} ${
                p1RLIsVisible ? styles.show : ""
              }`}
            >
              World Current Affairs
            </div>
          </div>
        </div>
        <div className={styles.page2}>
          <div className={styles.leftOfPage2}>
            <div
              ref={myRef5}
              className={`${styles.page2LU} ${
                p2LUIsVisible ? styles.show : ""
              }`}
            >
              Sports
            </div>
            <Link
              to={"http://localhost:3000/quiz-app"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                ref={myRef6}
                className={`${styles.page2LL} ${
                  p2LLIsVisible ? styles.show : ""
                }`}
              >
                Create Your Own Quiz
              </div>
            </Link>
          </div>
          <div className={styles.rightOfPage2}>
            <div
              ref={myRef7}
              className={`${styles.page2RU} ${
                p2RUIsVisible ? styles.show : ""
              }`}
            >
              Entertainment
            </div>
            <div
              ref={myRef8}
              className={`${styles.page2RL} ${
                p2RLIsVisible ? styles.show : ""
              }`}
            >
              Fun Zone
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <h2>
            <b>
              This website is being created under final year BCA project(session
              2021-24) by :{" "}
            </b>
          </h2>
          <h3>Dipshikha Gupta</h3>
          <h3>Divya Anand</h3>
        </div>
      </div>
    )
  );
};

export default Home;
