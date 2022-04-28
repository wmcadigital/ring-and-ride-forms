const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (day, month, year) => {
  return `${parseInt(day)} ${monthNames[parseInt(month - 1)]} ${parseInt(
    year
  )}`;
};

export default formatDate;
