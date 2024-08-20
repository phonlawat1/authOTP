import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ForgotChangePassword() {
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangePass = () => {
    const validationErrors = validateChangePass();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.email === state);

    if (userIndex === -1) {
      alert("User not found!");
    } else {
      // อัปเดตรหัสผ่านของผู้ใช้ที่พบ
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password updated successfully!");
      navigate("/");
    }
  };

  const validateChangePass = () => {
    const errors = {};

    if (!newPassword) {
      errors.newPassword = "Password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Forget Password</h1>
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 mb-2 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm">{errors.newPassword}</p>
        )}

        <input
          type="password"
          placeholder="Confirm New password"
          className="w-full p-2 mb-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
        <button
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          onClick={handleChangePass}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ForgotChangePassword;
