//Main functions directly called by HTML index
const onLoading = () => {
  setInterval(() => {
    const time = getTime();
    const { timeHTML, hoursHTML, minutesHTML, secondsHTML } = getVisualElements();
    updateAnalogTime(time, { hoursHTML, minutesHTML, secondsHTML });
    updateDigitalTime(time, timeHTML, format);
  }, 1000);
};

let format;
const toogle = () => {
  const h24Button = document.getElementById("h24Button");
  const ampmButton = document.getElementById("ampmButton");
  ampmButton.classList.contains("activeButton")
    ? (ampmButton.classList.remove("activeButton"),
      h24Button.classList.add("activeButton"),
      (format = "24H"))
    : (ampmButton.classList.add("activeButton"),
      h24Button.classList.remove("activeButton"),
      (format = "AM/PM"));
};

//Support functions used by mains
const getTime = () => {
  const d = new Date();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  return { hours, minutes, seconds };
};

const getVisualElements = () => {
  const timeHTML = document.getElementById("time");
  const hoursHTML = document.getElementById("hour");
  const minutesHTML = document.getElementById("minute");
  const secondsHTML = document.getElementById("second");
  return { timeHTML, hoursHTML, minutesHTML, secondsHTML };
};

const updateAnalogTime = (
  { hours, minutes, seconds },
  { hoursHTML, minutesHTML, secondsHTML }
) => {
  const secondsAngle = seconds * 6;
  const minutesAngle = minutes * 6;
  const hoursAngle = hours * 30 + minutes * 0.5;

  secondsHTML.style.transform = `rotate(${secondsAngle}deg)`;
  minutesHTML.style.transform = `rotate(${minutesAngle}deg)`;
  hoursHTML.style.transform = `rotate(${hoursAngle}deg)`;
};

const updateDigitalTime = ({ hours, minutes, seconds }, timeHTML, format) => {
  let ampm;
  if (format == "AM/PM") {
    hours > 12 ? ((hours = hours - 12), (ampm = "PM")) : (ampm = "AM");
  }
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  timeHTML.innerHTML = `${hours}:${minutes}:${seconds} ${format == "AM/PM" ? ampm : ""}`;
};
