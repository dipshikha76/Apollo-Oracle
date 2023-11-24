import React, { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import Questions from "./Questions";
import {PushAnswer} from "../../hooks/setResult"
import { useSelector, useDispatch } from 'react-redux';
import { MoveNextQuestion , MovePrevQuestion } from "../../hooks/FetchQuestions";
import { Navigate } from 'react-router-dom';

const Quiz = (userData) => {
  const [check, setCheck] = useState(undefined);
  const {queue , trace} = useSelector(state => state.questions)
  const dispatch = useDispatch()
  const result = useSelector(state => state.result.result);

  // useEffect(() => {
  //   // console.log(result);
  // })

  const onNext = () => {
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }
    setCheck(undefined);
  };
  const onPrev = () => {
    if(trace > 0)dispatch(MovePrevQuestion());
  };

  const onCheck = (checked) => {
     setCheck(checked);
  }

  if (result.length && result.length >= queue.length) {
    return <Navigate to = {'/result'} replace = {true}></Navigate>
  }
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${1 > 0 ? styles.textLight : ""} `}>
        <span>A</span>pollo's <span> O</span>racle
      </h1>
      <h3 className={styles.subtitle}>There will be 10 questions.</h3>
          
          <Questions onCheck = {onCheck} />
      <div className={styles.grid}>
        <button
          className={`${styles.btn} ${1 > 0 ? styles.prev : ""} `}
          onClick={onPrev}
        >
          Prev
        </button>
        <button
          className={`${styles.btn} ${1 > 0 ? styles.next : ""} `}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
