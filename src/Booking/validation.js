import { validateDate } from "../common/validation";

export const validateBookingDate = (values = {}) => {
  const errors = {};
  const { bookingDateDay, bookingDateMonth, bookingDateYear } = values;

  if (!bookingDateDay && !bookingDateMonth && !bookingDateYear) {
    errors.bookingDate = "Required";
    return errors;
  }

  if (!bookingDateDay || !bookingDateMonth || !bookingDateYear) {
    errors.bookingDate = "Invalid";
    return errors;
  }

  const invalid = validateDate(
    bookingDateDay,
    bookingDateMonth,
    bookingDateYear
  );

  if (invalid) {
    errors.bookingDate = invalid;
    return errors;
  }

  const dateToValidate = new Date(
    bookingDateYear,
    bookingDateMonth - 1,
    bookingDateDay
  );

  const now = new Date();

  let currentDay = now.getDate();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours > 14) {
    currentDay = currentDay + 1;
  }

  if (hours === 14 && minutes > 30) {
    currentDay = currentDay + 1;
  }

  const cutOffDate = new Date(currentYear, currentMonth, currentDay);

  if (dateToValidate.getTime() <= cutOffDate.getTime()) {
    errors.bookingDate = "Date is not available";
    return errors;
  }

  return errors;
};
