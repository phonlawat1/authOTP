import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OTPChangePass() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [m, setM] = useState(state);

  const [otp, setOtp] = useState("");

  const isOtpExpired = () => {
    const otpCreatedAt = localStorage.getItem("otpCreatedAt");
    if (!otpCreatedAt) return true;

    const now = new Date();
    const createdAt = new Date(otpCreatedAt);
    const expirationTime = new Date(createdAt.getTime() + 1 * 60 * 1000); // Add 3 minutes

    return now > expirationTime;
  };

  const handleVerifyOtp = () => {
    const generatedOtp = localStorage.getItem("otp");

    if (isOtpExpired()) {
      alert("OTP has expired!");
      localStorage.removeItem("otp");
      localStorage.removeItem("otpCreatedAt");
    } else if (otp === generatedOtp) {
      alert("OTP Verified!");
      localStorage.removeItem("otp");
      localStorage.removeItem("otpCreatedAt");
      navigate("/forgotchangepassword", { state: m });
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mt-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="OTP"
          className="w-full p-2 mb-4 border rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button
          onClick={handleVerifyOtp}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OTPChangePass;
