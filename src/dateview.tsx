import { useState } from "react";
import arrow from "./assets/images/icon-arrow.svg";
import "./date.css";
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
  const [result, setResult] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [showResult, setShowResult] = useState(false);

  function handleInputChange(value: number, load: string) {
    setAgeLoad({ ...ageLoad, [load]: value });
    setShowResult(false);
    if (load === "month" && value >= 1 && value <= 12) {
      setErrorMessage({ ...errorMessage, month: "" });
    }
    if (load === "month" && (value > 12 || value < 1)) {
      setErrorMessage({ ...errorMessage, month: "Must be a valid month" });
    }

    if (load === "day" && (value >= 1 || value <= 31)) {
      setErrorMessage({ ...errorMessage, day: "" });
    }

    if (load === "day" && (value > 31 || value < 1)) {
      setErrorMessage({ ...errorMessage, day: "Must be a valid day" });
    }
    const currentYear = new Date().getFullYear();

    if (load === "year" && value.toString().length !== 4) {
      setErrorMessage({ ...errorMessage, year: "Must be a valid year" });
    }
    if (load === "year" && value > currentYear) {
      setErrorMessage({ ...errorMessage, year: "Must be in the past" });
    }
    if (
      load === "year" &&
      value.toString().length === 4 &&
      value <= currentYear
    ) {
      setErrorMessage({ ...errorMessage, year: "" });
    }
  }

  function handleGetAge() {
    if (ageLoad.day === "") {
      setErrorMessage({ ...errorMessage, day: "This field is required" });
    }

    if (ageLoad.month === "") {
      setErrorMessage({ ...errorMessage, month: "This field is required" });
    }

    if (ageLoad.year === "") {
      setErrorMessage({ ...errorMessage, year: "This field is required" });
    }

    if (!ageLoad.day && !ageLoad.month && !ageLoad.year) {
      setErrorMessage({
        day: "This field is required",
        month: "This field is required",
        year: "This field is required",
      });
    } 

    if (
      errorMessage.day === "" &&
      errorMessage.month === "" &&
      errorMessage.year === "" &&
      ageLoad.day &&
      ageLoad.month &&
      ageLoad.year
    ) {
      setShowResult(true);
      const currentDate = new Date();
      const myDate = `${ageLoad.month}/${ageLoad.day}/${ageLoad.year}`;
      const formatDate = new Date(myDate);
      const ageInMilliseconds = currentDate.getTime() - formatDate.getTime();

      // calculate number of years
      const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
      const years = Math.floor(ageInYears);

      // calculate number of months
      const months = Math.floor((ageInYears - years) * 12);

      // calculate number of days
      const days = Math.floor((ageInYears - years - months / 12) * 365.25);

      setResult({
        day: days.toString(),
        month: months.toString(),
        year: years.toString(),
      });
    }
  }

  return (
    <div className="container">
      <div className="content">
        <div className="text-container">
          <div className="inputcon">
            <label
              htmlFor="day"
              className={` ${
                errorMessage.day !== "" ? "col-red" : ""
              }`}
            >
              {" "}
              DAY{" "}
            </label>
            <input
              id="day"
              type="number"
              placeholder="DD"
              className={` inputStyle ${
                errorMessage.day !== "" ? "outlineRed" : ""
              }`}
              onChange={(e) =>
                handleInputChange(parseInt(e.target.value), "day")
              }
            />

            <span className="datespan">{errorMessage?.day}</span>
          </div>

          <div className="inputcon">
            <label
              htmlFor="month"
              className={`  ${
                errorMessage.month !== "" ? "col-red" : ""
              }`}
            >
              {" "}
              MONTH{" "}
            </label>

            <input
              id="month"
              type="number"
              placeholder="MM"
              className={` inputStyle ${
                errorMessage.month !== "" ? "outlineRed" : ""
              }`}
              onChange={(e) =>
                handleInputChange(parseInt(e.target.value), "month")
              }
            />

            {errorMessage.month !== "" && (
              <span className="datespan">{errorMessage.month}</span>
            )}
          </div>

          <div className="inputcon">
            <label
              htmlFor="year"
              className={`  ${
                errorMessage.year !== "" ? "col-red" : ""
              }`}
            >
              YEAR
            </label>
            <input
              id="year"
              type="number"
              placeholder="YYYY"
              className={` inputStyle ${
                errorMessage.year !== "" ? "outlineRed" : ""
              }`}
              onChange={(e) =>
                handleInputChange(parseInt(e.target.value), "year")
              }
            />
            <span className="datespan">{errorMessage.year}</span>
          </div>
        </div>

        <div className="btn-div">
          <hr />
          <button className="btn" onClick={handleGetAge}>
            <img src={arrow} alt="get age button" />
          </button>
        </div>

        <div className="age-container">
          <div className="text-contain">
            {" "}
            {showResult ? (
              <span className="age-no1"> {result.year} </span>
            ) : (
              <>
                <span className="dash"> </span>
                <span className="dash"> </span>{" "}
              </>
            )}
            <span className="time-text">
              {result.year === "1" ? "year" : "years"}
            </span>{" "}
          </div>
          <div className="text-contain">
            {" "}
            {showResult ? (
              <span className="age-no2"> {result.month} </span>
            ) : (
              <>
                <span className="dash"> </span>
                <span className="dash"> </span>{" "}
              </>
            )}
            <span className="time-text">
              {" "}
              {result.month === "1" ? "month" : "months"}{" "}
            </span>{" "}
          </div>
          <div className="text-contain">
            {" "}
            {showResult ? (
              <span className="age-no3"> {result.day} </span>
            ) : (
              <>
                <span className="dash"> </span>
                <span className="dash"> </span>{" "}
              </>
            )}
            <span className="time-text">
              {" "}
              {result.day === "1" ? "day" : "days"}
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainView;
