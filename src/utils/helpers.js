const setToken = (token, remember) => {
  if (remember) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};

const setUser = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
};
const getUser = () => {
  const user = localStorage.getItem("userInfo");

  if (user) {
    return JSON.parse(user);
  }
  return "";
};

const isUserAuthenticated = () => {
  let token = sessionStorage.getItem("token");
  if (!token) {
    token = localStorage.getItem("token", token);
  }
  return !!token;
};

const removeToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};

export function openSidebar() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden";
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1");
  }
}

export function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn");
    document.body.style.removeProperty("overflow");
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn");
    if (slideIn) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

const isValidMobileNumber = (number = "") => {
  const mobilePattern = /^(?:(?:\+91|91|0)?[789]\d{9})$/;
  return mobilePattern.test(number);
};
const isValidEmail = (email = "") => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};
const isValidPinCode = (pinCode) => {
  const pinCodePattern = /^\d{6}$/;
  return pinCodePattern.test(pinCode);
};

const isValidGSTNo = (gstNo) => {
  const gstNoPattern =
    /^[0-9]{2}[A-Z]{4}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9A-Z]{1}$/;
  return gstNoPattern.test(gstNo);
};
const isValidName = (name) => {
  const namePattern = /^[A-Za-z\s]+$/;
  return namePattern.test(name);
};
export {
  isUserAuthenticated,
  setToken,
  removeToken,
  setUser,
  getUser,
  isValidMobileNumber,
  isValidEmail,
  isValidPinCode,
  isValidGSTNo,
  isValidName,
};
