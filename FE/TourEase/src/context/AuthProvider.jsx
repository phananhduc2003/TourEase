import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ApiLogin } from "../api/user/ApiLogin";

function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // Kiểm tra thời gian hết hạn (exp) nếu có
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
          sessionStorage.removeItem("token");
          setAuthenticated(false);
          setUserRole(null);
          setIdUser(null);
        } else {
          const role = payload.role === "ADMIN" ? 1 : 0;
          setAuthenticated(true);
          setUserRole(role);
          setIdUser(payload.userId);
        }
      } catch (e) {
        console.error("Invalid token:", e);
        sessionStorage.removeItem("token");
        setAuthenticated(false);
        setUserRole(null);
        setIdUser(null);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await ApiLogin(username, password);
      const token = response.data.token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role === "ADMIN" ? 1 : 0;

      sessionStorage.setItem("token", token);
      setAuthenticated(true);
      setUserRole(role);
      setIdUser(payload.userId);
      setLoading(false);
      return role;
    } catch (error) {
      let errorMsg = "Login failed. Please check your username and password.";
      if (error.response) {
        // Xử lý lỗi từ server (ví dụ: 401)
        if (error.response.status === 401) {
          errorMsg = error.response.data || "Invalid credentials.";
        } else if (error.response.status === 400) {
          errorMsg = error.response.data || "Bad request.";
        }
      } else if (error.request) {
        // Lỗi không nhận được phản hồi từ server
        errorMsg = "Unable to connect to the server. Please try again later.";
      } else {
        // Lỗi trong quá trình thiết lập yêu cầu
        errorMsg = "An unexpected error occurred.";
      }
      console.error("Login error:", error.message);
      setErrorMessage(errorMsg); // Lưu thông báo lỗi để hiển thị
      setAuthenticated(false);
      setUserRole(null);
      setIdUser(null);
      setLoading(false);
      return null;
    }
  };

  const Logout = () => {
    setAuthenticated(false);
    setUserRole(null);
    setIdUser(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        handleLogin,
        Logout,
        userRole,
        idUser,
        loading,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
