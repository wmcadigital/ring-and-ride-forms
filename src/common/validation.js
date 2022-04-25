const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const required = (value) => (value ? undefined : "Required");

export const numbersOnly = (value) => {
  if (value) {
    return /^\d+$/.test(value) ? undefined : "Invalid";
  }
};

export const numbersAndSpacesOnly = (value) => {
  if (value) {
    return /^[\d\s]+$/.test(value) ? undefined : "Invalid";
  }
};

export const email = (value) => {
  if (value) {
    return emailRegex.test(value) ? undefined : "Invalid";
  }
};
