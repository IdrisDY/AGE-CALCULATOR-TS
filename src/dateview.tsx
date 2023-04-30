import { useState, useEffect } from "react";
import arrow from "./assets/images/icon-arrow.svg";
import './date.css'
const MainView = () => {
  const [ageLoad, setAgeLoad] = useState({
    day: null,
    month: null,
    year: null,
  });
  const [errorMessage, setErrorMessage] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [error, setError] = useState("");

  function handleInputChange(value: number, load: string) {
    setAgeLoad({ ...ageLoad, [load]: value });

    if (load === "month" && value >= 1 && value <= 12) {
      setErrorMessage({ ...errorMessage, month: "" });
    }
    if (load === "month" && (value > 12 || value < 1)) {
      console.log("invalid month");
      setErrorMessage({ ...errorMessage, month: "Must be a valid Month" });
    }

    if (load === "day" && (value >= 1 || value <= 31)) {
      setErrorMessage({ ...errorMessage, day: "" });
    }

    if (load === "day" && (value > 31 || value < 1)) {
      console.log("invalid day");
      setErrorMessage({ ...errorMessage, day: "Must be a valid Day" });
    }
    const currentYear = new Date().getFullYear();

    if (load === "year" && value.toString().length !== 4) {
      setErrorMessage({ ...errorMessage, year: "Must be a valid Year" });
      console.log("invalid year");
    }
    if (load === "year" && value > currentYear) {
      setErrorMessage({ ...errorMessage, year: "Must be in the Past" });
    }
    if (
      load === "year" &&
      value.toString().length === 4 &&
      value <= currentYear
    ) {
      setErrorMessage({ ...errorMessage, year: "" });
    }
    // if (value !== null   ) {
    //    setErrorMessage({...errorMessage , [load]: ''});
    // }
  }

  function handleGetAge() {
    if (ageLoad.day === "") {
      setErrorMessage({ ...errorMessage, day: "This field is required" });
      console.log(errorMessage);
    }
    // else {
    //   setErrorMessage({ ...errorMessage, day:'' });
    // }

    if (ageLoad.month === "") {
      setErrorMessage({ ...errorMessage, month: "This field is required" });
      console.log(errorMessage);
    }
    //  else {
    //   setErrorMessage({ ...errorMessage, month: '' });
    // }

    if (ageLoad.year === "") {
      setErrorMessage({ ...errorMessage, year: "This field is required" });
      console.log(errorMessage);
    }
    // else {
    //   setErrorMessage({ ...errorMessage, year: '' });
    // }

    if (!ageLoad.day && !ageLoad.month && !ageLoad.year) {
      console.log("need to be complete");
      setErrorMessage({
        day: "This field is required",
        month: "This field is required",
        year: "This field is required",
      });
      setError("all");
    } else {
      console.log("I can see you my friend");
    }
  }

  const inputStyle = {
    width: "150px",
    height: "80px",
    borderRadius: "10px",
    border: ".4px solid grey",
    fontSize: "2.5rem",
    color: "hsl(0, 1%, 44%)",
    paddingInline: ".5em",
  };

  return (
    <div className="container">
      <div className="content">
        <div className="text-container">
          <div className="inputcon">
            <input
              type="number"
              placeholder="DD"
              style={inputStyle}
              className={errorMessage.day !== '' ? 'outlineRed':'' }
              onChange={(e) =>
                handleInputChange(parseInt(e.target.value), "day")
              }
            />

            <span className="datespan">{errorMessage?.day}</span>
          </div>

          <div className="inputcon">
            <input
              type="number"
              placeholder="MM"
              style={inputStyle}
              className={errorMessage.month !== '' ? 'outlineRed':'' }
              onChange={(e) =>
                handleInputChange(parseInt(e.target.value), "month")
              }
            />

            {errorMessage.month !== "" && (
              <span className="datespan">{errorMessage.month}</span>
            )}
          </div>

          <div className="inputcon">
            <input
              type="number"
              placeholder="YYYY"
              style={inputStyle}
              className={errorMessage.year !== '' ? 'outlineRed':'' }
              onChange={(e) =>
                handleInputChange(parseInt(e.target.value), "year")
              }
            />
            <span className="datespan">{errorMessage.year}</span>
          </div>
        </div>

        <hr className="line" />

        <div>
          <button className="btn" onClick={handleGetAge}>
            <img src={arrow} alt="get age button" />
          </button>
        </div>

<div>

<div className="text-contain" > <span className="dash" > </span> <span className="dash"> </span> <span className="time-text"> years</span> </div>
<div className="text-contain" > <span className="dash" > </span> <span className="dash"> </span> <span className="time-text"> months</span> </div>
<div className="text-contain" > <span className="dash" > </span> <span className="dash"> </span> <span className="time-text"> days</span> </div>

</div>

      </div>
    </div>
  );
};

export default MainView;
