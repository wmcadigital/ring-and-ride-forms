import { validateDate } from "../common/validation";

export const validateBookingDate = (values = {}) => {
  const errors = {};
  const {
    bookingDateDayAuto,
    bookingDateDay,
    bookingDateMonth,
    bookingDateYear,
  } = values;

  if (bookingDateDayAuto == "other") {
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

    // validation next day if after 14:30
    const dateToValidate = new Date(
      bookingDateYear,
      bookingDateMonth - 1,
      bookingDateDay
    );

    const now = new Date();
    const current = new Date();

    let currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    //const dateToday = currentDay;
    current.setDate(current.getDate() + 1);
    const dateTomorrow = current.toDateString();

    if (hours > 14) {
      currentDay = currentDay + 1;
    }

    if (hours === 14 && minutes > 30) {
      currentDay = currentDay + 1;
    }

    // check if tomorrow is sunday and show error
    if (dateTomorrow.includes("Sun") && dateToValidate.toDateString().includes("Sun")) {
      errors.bookingDate = "You can't book a Sunday today. You need to book on a Friday before 14:30";
      return errors;
    }

    // check if tomorrow is monday and show error
    if (dateTomorrow.includes("Mon") && dateToValidate.toDateString().includes("Mon")) {
      errors.bookingDate = "You can't book a Monday today. You need to book on a Saturday before 14:30";
      return errors;
    }

    const cutOffDate = new Date(currentYear, currentMonth, currentDay);

    if (dateToValidate.getTime() <= cutOffDate.getTime()) {
      errors.bookingDate = "You can't book this day as it's either today or after 14:30";
      return errors;
    }

    return errors;
  }
};
