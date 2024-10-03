import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import OrderList from "./pages/order/OrderList";
import ResetPassword from "./pages/login/ResetPassword";
import { isUserAuthenticated } from "./utils/helpers";

const Navigation = () => {
  const isLoggedIn = isUserAuthenticated();
  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Login /> : <OrderList />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
