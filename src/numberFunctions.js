const formatTime = (timeString) => {
  const [minutesPart, secondsPart] = timeString.split(".");

  const minutes = parseInt(minutesPart, 10);
  const seconds = parseInt(secondsPart, 10);

  if (!isNaN(minutes) && !isNaN(seconds)) {
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    return formattedTime;
  } else {
    return "Invalid Time";
  }
};

export { formatTime };

const formatTimeNumber = (timeNumber) => {
  if (typeof timeNumber === "number" && !isNaN(timeNumber)) {
    const timeString = timeNumber.toFixed(2);
    const [minutes, seconds] = timeString.split(".");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padEnd(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return "Invalid Time";
  }
};

export { formatTimeNumber };
