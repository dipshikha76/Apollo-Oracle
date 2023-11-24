import React, { useEffect, useState } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import ResultTable from "../resultTable/ResultTable";
import { useDispatch, useSelector } from "react-redux";
import { resetAllAction } from "../../redux/question_reducer";
import { resetResultAction } from "../../redux/resultReducer";
import { attempts_Number, pointsScored } from "../Attempts/attempts";
import axios from "axios";
const Result = (user) => {
  const dispatch = useDispatch();
  const [allResults, setAllResults] = useState([]);
  const [visibility, setVisibility] = useState(false);
  // const {queue} = useSelector(state => state.questions);
  // const {result} = useSelector(state => state.result);
  // const {answers} = useSelector(state => state.questions);
  // const {userId} = useSelector((state) => state.result);

  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  // useEffect(() => {
  //   console.log(score);
  // });
  const userName = user.Name;
  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const score = pointsScored(result, answers);
  // console.log(userName);
  const email = user.Email;

  const postResultData = async () => {
    const data = {
      email: email,
      name: userName,
      attempts: attempts,
      score: score,
    };
    await axios.post("http://localhost:4000/postResult", data);
  };

  postResultData();

  const getAllResults = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getResults");
      setAllResults(res.data);
      setVisibility(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onRestart = () => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  };
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${1 > 0 ? styles.textLight : ""} `}>
        <span>A</span>pollo's <span> O</span>racle
      </h1>
      <div className={`${styles.result} ${1 > 0 ? styles.flexCenter : ""} `}>
        <div className={styles.flex}>
          <span>User's Name</span>
          <span className={styles.bold}>{user.Name}</span>
        </div>
        <div className={styles.flex}>
          <span>Maximum Points</span>
          <span className={styles.bold}>100</span>
        </div>
        <div className={styles.flex}>
          <span>Attempted</span>
          <span className={styles.bold}>{attempts}</span>
        </div>
        <div className={styles.flex}>
          <span>Your Score</span>
          <span className={styles.bold}>{score}</span>
        </div>
      </div>
      <div className={styles.start}>
        <Link className={styles.btn} to={"/quiz"} onClick={onRestart}>
          Restart
        </Link>
      </div>
      <div className="container">
        {!visibility && (
          <button className={styles.btn} onClick={getAllResults}>
            See LeaderBoard
          </button>
        )}
        {visibility && <ResultTable allResults={allResults} />}
      </div>
    </div>
  );
};
export default Result;
