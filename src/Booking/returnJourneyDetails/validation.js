export const validateReturnPickupTime = (values = {}) => {
  const errors = {};
  if (values.outwardPickup.hour > values.returnPickup.hour) {
    errors["returnPickup.timeInput"] = "Invalid";
  }

  if (values.outwardPickup.hour === values.returnPickup.hour) {
    if (values.outwardPickup.minute >= values.returnPickup.minute) {
      errors["returnPickup.timeInput"] = "Invalid";
    }
  }

  return errors;
};
