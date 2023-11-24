import React, { useEffect, useState } from "react";
import styles from "./Quiz.module.css";
import data from "../../database/data";
import { useFetchQuestion } from "../../hooks/FetchQuestions";
import { useDispatch, useSelector } from "react-redux";
import { updateResultAction } from "../../redux/resultReducer";
import { updateResult } from "../../hooks/setResult";


const Questions = ({onCheck}) => {
  const [checked, setChecked] = useState(undefined);
  const {trace} = useSelector(state => state.questions);
  const result = useSelector((state) => state.result.result);
  // useSelector(state => console.log(state));
  const [{isLoading, apiData , serverError}] = useFetchQuestion();
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const dispatch = useDispatch();
  // const state = useSelector((state) => state);
  useEffect(() => {
    dispatch(updateResult({ trace, checked }));
  }, [checked])
  if(isLoading) return <h3 className="textLight">isLoading</h3>
  if (serverError) return <h3 className="textLight">{serverError} || "Unknown Error"</h3>
  const onSelect = (i) => {
    onCheck(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  };
  return (
    <div className={styles.questions}>
      <h2 className={styles.textLight}> {questions?.question}</h2>
      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label className={styles.textPrimary} htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`${styles.check} ${result[trace] == i ? styles.Checked : ''}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
