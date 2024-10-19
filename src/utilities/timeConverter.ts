export const convertToMinutesSeconds = (decimalTime: any) => {
  const minutes = Math.floor(decimalTime);
  const secondsDecimal = decimalTime - minutes;
  const seconds = Math.round(secondsDecimal * 60);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
};
