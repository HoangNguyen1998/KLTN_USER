const CheckError = err => {
  let error = null;
  if (err.includes("email_1 dup key")) {
    error = "DuplicateEmail";
  }
  if (err.includes("username_1 dup key")) {
    error = "DuplicateName";
  }
  return error;
};

export default CheckError;
