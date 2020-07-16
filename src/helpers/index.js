const jwt = require("jsonwebtoken");
const config = require("constants/Config");

export const CheckError = err => {
    let error = null;
    if (err.includes("email_1 dup key")) {
      error = "DuplicateEmail";
    }
    if (err.includes("username_1 dup key")) {
      error = "DuplicateName";
    }
    return error;
  };

export const deleteCookie = name => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };


export const getCookie = () => {
  if (document.cookie !== null) {
    const name = "token=";
    const ca = document.cookie.split("; ");
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i];
      if (c.indexOf(name) === 0) {
        const decode = jwt.decode(c.substring(6), config.TOKEN_SECRET);
        if (decode.type === "access") return c.substring(6);
        else return null;
      } else continue;
    }
    return null;
  }
};