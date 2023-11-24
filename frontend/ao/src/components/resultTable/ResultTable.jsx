import React from 'react'
import  styles  from './ResultTable.module.css';
const ResultTable = () => {
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
          <tr className={styles.tableBody}>
            <td>Ujjwal</td>
            <td>3</td>
            <td>20</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable