import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        await fetch(`${API_BASE_URL}/api/users/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        localStorage.removeItem("token"); // Remove token
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Logout failed", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return null;
};

export default Logout;
