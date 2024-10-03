import { Navigate } from "react-router-dom";
import { isUserAuthenticated } from "../utils/helpers";

const AuthGuard = ({ children, screen }) => {
  const isLoggedIn = isUserAuthenticated();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  //   const hasMenuAccess = some(
  //     menuAccess,
  //     ({ menu_name }) => menu_name?.toUpperCase?.() === screen?.toUpperCase?.()
  //   );
  //   if (hasMenuAccess) {
  //     return children;
  //   } else {
  //     return <Unauthorized />;
  //   }
  return children;
};

export default AuthGuard;
