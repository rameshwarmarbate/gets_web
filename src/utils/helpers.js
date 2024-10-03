const setToken = (token, remember) => {
  if (remember) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
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

export { isUserAuthenticated, setToken, removeToken };
