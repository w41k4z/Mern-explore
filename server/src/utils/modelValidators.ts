export const passwordValidator = function (value: string) {
  // Check for lowercase letters
  if (!/[a-z]/.test(value)) {
    return false;
  }
  // Check for uppercase letters
  if (!/[A-Z]/.test(value)) {
    return false;
  }
  // Check for numbers
  if (!/[0-9]/.test(value)) {
    return false;
  }
  // Check for special characters or spaces
  if (/[^\w]/.test(value)) {
    return false;
  }
  return true;
};
