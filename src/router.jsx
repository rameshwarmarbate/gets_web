import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import OrderList from "./pages/order/OrderList";
import ResetPassword from "./pages/login/ResetPassword";
import { isUserAuthenticated } from "./utils/helpers";
import AuthGuard from "./context/AuthGuard";
import ComingSoon from "./components/ComingSoon";

const Navigation = () => {
  const isLoggedIn = isUserAuthenticated();
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? <Login /> : <Navigate replace to={"/orders"} />
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/orders"
          element={
            <AuthGuard>
              <OrderList />
            </AuthGuard>
          }
        />
        <Route
          path="/"
          element={
            <AuthGuard>
              <ComingSoon />
            </AuthGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <ComingSoon />
            </AuthGuard>
          }
        />
        <Route
          path="/customers"
          element={
            <AuthGuard>
              <ComingSoon />
            </AuthGuard>
          }
        />
        <Route
          path="/salespersons"
          element={
            <AuthGuard>
              <ComingSoon />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default Navigation;
