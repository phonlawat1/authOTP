import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../component/Navbar";

function Welcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const state = location.state || JSON.parse(localStorage.getItem("userState")); // ดึงจาก location state หรือ localStorage

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === state?.email);
    if (user) {
      setUserName(user.name);
    }
  }, [state]);

  const changePassword = () => {
    navigate("/changepassword", { state: state });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar
        email={state?.email}
        changePassword={changePassword}
        disbtnChange={true}
      />
      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-center font-bold text-[100px]">
          Welcome, {userName}!
        </h1>
      </div>
    </div>
  );
}

export default Welcome;
