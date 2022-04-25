import React, { useState } from "react";
import "./clock.css";

//true for 24 hours, false for AM/PM
let format = true;
let btnCom = "btn col-6 animation";
//className for after animation
let btnOn = " btn-primary col-md-7";
let btnOff = " btn-secondary col-md-5";
//className for animation
let aniOn = " animationOn";
let aniOff = " animationOff";
//className
let btn12 = btnCom + btnOff;
let btn24 = btnCom + btnOn;
const Clock = () => {
  //primary function: displaying time, initial first display and now variable
  let now = new Date().toLocaleTimeString();
  //set up the main object and its function
  const [time, setTime] = useState(now);
  //create a updating function that convert time object into string for display
  const UpdateTime = () => {
    now = new Date().toLocaleTimeString();
    setTime(now);
  };
  //repeating above function to renew the time displayed
  setInterval(() => {
    UpdateTime();
  }, 500);
  //format the time variable for separate display
  let timeArray = time.split(":");
  let hour = parseInt(timeArray[0]);
  //exclude special case: 24th hour
  if (hour === 24) {
    hour = 0;
  }
  let apm = format ? " d-none" : "";
  let apmText = hour > 11 ? "PM" : "AM";
  //if is in 12 hour format display AND hour is more than 12, make hours in 12 hour display
  if (!format && hour > 12) {
    hour = hour - 12;
  }
  //change format to 12 hours display
  let Change12 = () => {
    format = false;
    //change the button size and color
    btn12 = btnCom + aniOn;
    btn24 = btnCom + aniOff;
    //make time for the animation to play before changing class
    setTimeout(() => {
      btn12 += btnOn;
      btn24 += btnOff;
    }, 200);
  };
  //change format to 24 hours display
  let Change24 = () => {
    format = true;
    //change the button size and color
    btn12 = btnCom + aniOff;
    btn24 = btnCom + aniOn;
    //make time for the animation to play before changing class
    setTimeout(() => {
      btn12 += btnOff;
      btn24 += btnOn;
    }, 200);
  };

  //add one 0 to front to placehold for single digit hours
  hour = hour < 10 ? "0" + hour : hour;

  return (
    <>
      <div className="row justify-content-around displayblock">
        <div className="col-2 text-center">
          <span className="displayfont">{String(hour)}</span>
        </div>
        <div className="col-1 text-center">
          <span className="displayfont">:</span>
        </div>
        <div className="col-2 text-center">
          <span className="displayfont">{timeArray[1]}</span>
        </div>
        <div className="col-1 text-center">
          <span className="displayfont">:</span>
        </div>
        <div className="col-2 text-center">
          <span className="displayfont">{timeArray[2]}</span>
        </div>
        <div className={"col-2 text-center displayfont" + apm}>{apmText}</div>
      </div>
      <div className="row justify-content-around">
        <button onClick={() => Change12()} className={btn12}>
          12 Hours Display
        </button>
        <button onClick={() => Change24()} className={btn24}>
          24 Hours Display
        </button>
      </div>
    </>
  );
};

export default Clock;