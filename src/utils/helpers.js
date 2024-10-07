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

export { isUserAuthenticated, setToken, removeToken, setUser, getUser };
