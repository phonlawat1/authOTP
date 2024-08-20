import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./page/regis/Register";
import Login from "./page/login/Login";
import ChangePassword from "./page/change/ChangePass";
import OTPLogin from "./page/login/OTPLogin";
import Welcome from "./page/user/Welcome";
import ForgetPass from "./page/forgot/ForgotPass";
import OTPChangePass from "./page/forgot/OTPChangePass";
import ForgotChangePassword from "./page/forgot/ForgotChangePassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPLogin />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/forgetpassword" element={<ForgetPass />} />
        <Route path="/otpchangepass" element={<OTPChangePass />} />
        <Route
          path="/forgotchangepassword"
          element={<ForgotChangePassword />}
        />

        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
}

export default App;
