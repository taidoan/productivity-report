export const convertToMinutesSeconds = (decimalTime: any) => {
  const minutes = Math.floor(decimalTime);
  const secondsDecimal = decimalTime - minutes;
  const seconds = Math.round(secondsDecimal * 60);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
};

export const convertToHHMM = (decimalHours: any) => {
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};
