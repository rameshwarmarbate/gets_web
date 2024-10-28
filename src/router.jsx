import React, { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { isUserAuthenticated } from "./utils/helpers";
import AuthGuard from "./context/AuthGuard";
import { Loader } from "./components";

// Lazy load components
const Login = lazy(() => import("./pages/login/Login"));
const OrderList = lazy(() => import("./pages/order/OrderList"));
const ResetPassword = lazy(() => import("./pages/login/ResetPassword"));
const ComingSoon = lazy(() => import("./components/ComingSoon"));

const preloadComponent = (importFunc) => {
  importFunc();
};

const Navigation = () => {
  const isLoggedIn = isUserAuthenticated();

  useEffect(() => {
    preloadComponent(() => import("./pages/order/OrderList"));
    preloadComponent(() => import("./pages/login/Login"));
  }, []);
  return (
    <Router>
      <Suspense fallback={<Loader loading />}>
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
      </Suspense>
    </Router>
  );
};

export default Navigation;
