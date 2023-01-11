import { useEffect } from "react";
import { useState } from "react";
import styles from "./component.module.css"

function DisplayDate() {
  const [currentTime, setCurrentTime] = useState(new Date());

  /* UpdateTrigger */
  useEffect(() => {
    setInterval(() => setCurrentTime(new Date()), 1000);
  }, []);

  /* checks if leap year*/
  const monthParse = [
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
    currentTime.getFullYear % 4 === 0 ? 29 : 28,
    31,
  ];

  /* Current time passed this year in seconds */
  const currentTimePassed = [
    Math.floor(
      (monthParse.slice(0, currentTime.getMonth()).join("+").toString() + 0) *
        86400
    ),
    currentTime.getDate() * 86400,
    currentTime.getHours() * 3600,
    currentTime.getMinutes() * 60,
    currentTime.getSeconds(),
  ].reduce((a, b) => a + b, 0);

  /* Calculates how many seconds from 1st january to christmas */
  const fromStartToChristmas = Math.floor(
    (monthParse.slice(0, 11).reduce((a, b) => a + b, 0) + 24) * 86400
  );

  /* Calculates how many second in whole year if passed christmas*/
  const wholeYear = Math.floor(
    (364 + ((2 + new Date().getFullYear()) % 4 === 0 ? 0 : 1)) * 86400
  );

  /* Returns readable date formate of how long until christmas*/
  function countdownToChristmas(callback) {
    fromStartToChristmas > currentTimePassed
      ? (callback = Math.floor(fromStartToChristmas - currentTimePassed))
      : (callback = Math.floor(
          wholeYear - (currentTimePassed - fromStartToChristmas)
        ));
    return callback;
  }

  /* Formates second to readable date */
  function formatDuration(seconds) {
    let outPut = [];

    function stateCheck(timeOut, timeType) {
      return timeOut === 0 ? "" : timeOut < 2 ? timeType : timeType + "s";
    }

    function cleaner(time, formate, nextTime) {
      let formateOut = parseInt(Math.floor(seconds / time));
      if (seconds > nextTime) {
        let multipler = parseInt(Math.floor(seconds / nextTime));
        let timeRemove = Math.floor(nextTime * multipler);
        let remainingTime = Math.floor(seconds - timeRemove);
        formateOut = parseInt(Math.floor(remainingTime / time));
        if (formateOut !== 0) {
          outPut.push(`${formateOut} ${stateCheck(formateOut, formate)}`);
        }
      }
      if (seconds < nextTime) {
        if (formateOut !== 0) {
          outPut.push(`${formateOut} ${stateCheck(formateOut, formate)}`);
        }
      }
      if (time === 31536000) {
        if (formateOut !== 0) {
          outPut.push(`${formateOut} ${stateCheck(formateOut, formate)}`);
        }
      }
    }

    if (seconds >= 31536000) {
      cleaner(31536000, "year");
    }
    if (seconds >= 86400) {
      cleaner(86400, "day", 31536000);
    }
    if (seconds >= 3600) {
      cleaner(3600, "hour", 86400);
    }
    if (seconds >= 60) {
      cleaner(60, "minute", 3600);
    }
    if (seconds >= 1) {
      cleaner(1, "second", 60);
    }

    if (outPut.length === 1) {
      return outPut.join();
    } else if (outPut.length > 1) {
      return outPut.join(", ").replace(/, ([^,]*)$/, " and $1");
    } else {
      return "now";
    }
  }

  /* Returns display information to DOM */
  return (
    <div className={styles.counter}>
      <h2 className={styles.counttext}>Time until next christmas: </h2>
      <h3 className={styles.counttext}>{formatDuration(countdownToChristmas())}</h3>
      <h3 className={styles.counttext}>or</h3>
      <h3 className={styles.counttext}>{countdownToChristmas()} seconds.</h3>
    </div>
  );
}
export default DisplayDate;