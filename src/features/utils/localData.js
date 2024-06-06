import { setCookie } from "../user/userSlice";

const addUserToLocalStorage = (user, remember) => {
  if (remember) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    setCookie("user", JSON.stringify(user));
  }
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("utd_udk");
  document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax";
  sessionStorage.clear();
};

const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user") || getCookie("user");
  const user = result ? JSON.parse(result) : "";
  return user;
};

const checkIsUserIsAuthenticate = () => {
  let result = localStorage.getItem("utd_udk");

  let utd_udk;
  if (result) {
    utd_udk = JSON.parse(result);
  } else {
    let get_session = sessionStorage.getItem("utd_udk") || "";
    if (get_session) {
      utd_udk = JSON.parse(sessionStorage.getItem("utd_udk"));
    } else {
      utd_udk = "";
    }
  }

  if (utd_udk?.utd && utd_udk?.udk) {
    return true;
  } else {
    return false;
  }
};

const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

// user token data
const getUtd = () => {
  const result = localStorage.getItem("utd_udk") || sessionStorage.getItem("utd_udk");
  const utd_udk = result ? JSON.parse(result) : null;
  
  return utd_udk?.utd;
};

// user data key
const getUdk = () => {
  const result = localStorage.getItem("utd_udk") || sessionStorage.getItem("utd_udk");
  const utd_udk = result ? JSON.parse(result) : null;
  
  return utd_udk?.udk;
};

export {
  addUserToLocalStorage,
  removeUserFromLocalStorage,
  getUserFromLocalStorage,
  checkIsUserIsAuthenticate,
  getUtd,
  getUdk,
};
