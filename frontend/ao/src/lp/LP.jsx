import React from "react";
import styles from './LP.module.css'

const LP = () => {
    return (
      <body className={styles.lp_body}>
        <div className={styles.container}>
          <div className={styles.welcome}>
            <h1>
              Welcome to <span>A</span>pollo's <span>O</span>racle
            </h1>
          </div>
          <div className={styles.subtitle}>
            An amazing quiz arena where you can get many different types of
            timed and untimed quizzes.
          </div>
          <div className={styles.btn}>
            <a href="/logsig">
              <button>Break into the Apollo's universe.</button>
            </a>
          </div>
        </div>
      </body>
    );
}

export default LP