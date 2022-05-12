const padString = (input) => (input.length === 1 ? `0${input}` : input);

const formatTime = (hour, minute) => {
  const postString = hour >= 12 ? "pm" : "am";
  const newHour =
    hour > 12 ? padString((parseInt(hour) - 12).toString()) : hour;
  return `${newHour}:${minute}${postString}`;
};

export default formatTime;
