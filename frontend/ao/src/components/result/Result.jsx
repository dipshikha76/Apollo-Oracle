import React, { useEffect } from 'react'
import styles from './Result.module.css';
import { Link } from 'react-router-dom';
import ResultTable from '../resultTable/ResultTable';
import { useDispatch , useSelector } from 'react-redux';
import { resetAllAction } from '../../redux/question_reducer';
import { resetResultAction } from '../../redux/resultReducer';
import { attempts_Number , pointsScored } from '../Attempts/attempts';
const Result = () => {

  const dispatch = useDispatch();

  // const {queue} = useSelector(state => state.questions);
  // const {result} = useSelector(state => state.result);
  // const {answers} = useSelector(state => state.questions);
  // const {userId} = useSelector((state) => state.result);


  const { questions: { queue, answers }, result: { result, userId } } = useSelector(state => state)
  

  useEffect(() => {
    console.log(score);
  })

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const score = pointsScored(result, answers);

  const onRestart = () => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} ${1 > 0 ? styles.textLight : ""} `}>
        <span>A</span>pollo's <span> O</span>racle
      </h1>
      <div className={`${styles.result} ${1 > 0 ? styles.flexCenter : ""} `}>
        <div className={styles.flex}>
          <span>Username</span>
          <span className={styles.bold}>Ujjwal</span>
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
        <Link className={styles.btn} to={"/quiz"} onClick={onRestart}>Restart</Link>
      </div>
      <div className='container'>
        <ResultTable/>
      </div>
    </div>
  );
}

export default Result