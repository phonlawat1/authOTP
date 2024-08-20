import { useNavigate } from "react-router-dom";

function Navbar({ email, changePassword, disbtnChange }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-red-500 p-4 flex justify-between items-center">
      <a href="/home" className="text-white text-2xl font-bold">
        MyApp
      </a>
      <div className="flex items-center justify-end space-x-4">
        <h1 className="text-white text-2xl font-bold">{email}</h1>
        {disbtnChange && (
          <button
            onClick={changePassword}
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            ChangePassword
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
