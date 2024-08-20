import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpCreatedAt, setOtpCreatedAt] = useState(null);
  const [errors, setErrors] = useState({});

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpCreatedAt = new Date();
    const otpExpiryTime = 1 * 60 * 1000; // เวลาหมดอายุ 5 นาที (300,000 milliseconds)

    // คำนวณเวลาหมดอายุของ OTP
    const otpExpiryDate = new Date(otpCreatedAt.getTime() + otpExpiryTime);
    const expiryTimeFormatted = otpExpiryDate.toLocaleTimeString(); // รูปแบบเวลาหมดอายุ

    setGeneratedOtp(otp);
    setOtpCreatedAt(otpCreatedAt);
    localStorage.setItem("otp", otp);
    localStorage.setItem("otpCreatedAt", otpCreatedAt.toString());

    alert(
      `Login successful! Your OTP is ${otp}. It will expire at ${expiryTimeFormatted}.`
    );

    // ตั้งเวลาให้ OTP หมดอายุ
    setTimeout(() => {
      localStorage.removeItem("otp");
      localStorage.removeItem("otpCreatedAt");
      /* alert("Your OTP has expired."); */
    }, otpExpiryTime);
  };

  const handleLogin = () => {
    const validationErrors = validateLogin();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("userName", user.name); // Store user's name
      generateOtp();
      handleNavigate();
    } else {
      alert("Login failed!");
    }
  };

  const handleNavigate = () => {
    const stateToSend = { email: email }; // สมมติว่าคุณมี email ที่ต้องการส่งไป
    localStorage.setItem("userState", JSON.stringify(stateToSend)); // เก็บลงใน localStorage
    navigate("/otp", { state: stateToSend });
  };

  const validateLogin = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <div className="flex justify-between mt-4">
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
          <a href="/forgetpassword" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
