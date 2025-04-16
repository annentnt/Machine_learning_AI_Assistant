import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo part.svg";
import { useAuth } from "../../context/AuthContext";  // Import the auth context

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      logout(); // Call the logout function from context
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex items-center justify-between p-2 bg-hero-gradient font-barlow-condensed text-xl">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} className="h-10 mr-5" alt="Echo Mind" />
        </Link>
      </div>

      <nav className="flex items-center justify-evenly">
        <Link to="/about" className="text-white hover:bg-[#00DFA8] px-12 py-4 transition duration-300 border-[#00DFA8] hover:border-transparent hover:text-black">
          About
        </Link>
        <Link to="/features" className="text-white hover:bg-[#00DFA8] px-12 py-4 transition duration-300 border-[#00DFA8] hover:border-transparent hover:text-black">
          Features
        </Link>
      </nav>

      <div className="flex items-center space-x-2 justify-center">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-transparent border-2 border-red-500 text-red-500 font-medium px-6 py-2 rounded-full w-36 text-white transition duration-300 text-center"
          >
            Đăng xuất
          </button>
        ) : (
          <>
            <Link
              to="/signup"
              className="bg-transparent border-2 border-white text-white font-medium px-6 py-2 rounded-full w-36 hover:bg-white hover:text-black transition duration-300 text-center"
            >
              Đăng kí
            </Link>
            <Link
              to="/signin"
              className="bg-transparent border-2 border-[#00DFA8] text-[#00DFA8] font-medium px-6 py-2 rounded-full w-36 hover:bg-[#00DFA8] hover:text-white transition duration-300 text-center"
            >
              Đăng nhập
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;