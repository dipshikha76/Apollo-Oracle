import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ResultTable.module.css";

const ResultTable = (allResults) => {

  return (
    <div>
      <table>
        <thead className={styles.tableHeader}>
          <tr>
            <td>Name</td>
            <td>Attempts</td>
            <td>Points Scored</td>
          </tr>
        </thead>
        <tbody>
          {allResults &&
            allResults.allResults.map((result) => (
              <tr className={styles.tableBody} key={result.email}>
                <td>{result.name}</td>
                <td>{result.attempts}</td>
                <td>{result.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
