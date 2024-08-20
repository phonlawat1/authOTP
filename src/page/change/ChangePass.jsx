import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";

function ChangePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userState, setUserState] = useState({ email: "" }); // สร้าง state สำหรับเก็บข้อมูล user

  useEffect(() => {
    const savedUserState = JSON.parse(localStorage.getItem("userState"));
    if (savedUserState) {
      setUserState(savedUserState); // ตั้งค่า state จากข้อมูลใน localStorage
    }
  }, []);

  const handleChangePass = () => {
    const validationErrors = validateChangePass();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((user) => user.email === userState.email); // ใช้ userState.email ในการค้นหา

    if (userIndex === -1) {
      alert("User not found!");
    } else if (users[userIndex].password !== oldPassword) {
      alert("Old password is incorrect!");
    } else {
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Password updated successfully!");
      navigate("/home");
    }
  };

  const validateChangePass = () => {
    const errors = {};
    if (!oldPassword) {
      errors.oldPassword = "Old password is required";
    } else if (oldPassword.length < 6) {
      errors.oldPassword = "Old password must be at least 6 characters";
    }

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  return (
    <>
      <Navbar email={userState.email} disbtnChange={false} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4">
            Change Password
          </h1>
          <input
            type="password"
            placeholder="Old password"
            className="w-full p-2 mb-2 border rounded"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword}</p>
          )}
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
    </>
  );
}

export default ChangePassword;
