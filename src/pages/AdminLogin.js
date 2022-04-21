import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function AdminLogin() {
  const [isBusy, setIsBusy] = useState(true);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["admin"]);

  useEffect(() => {
    setIsBusy(true);
    if (cookies.admin === process.env.REACT_APP_ADMIN_PASSWORD) {
      navigate("/admin");
    }
    setIsBusy(false);
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      toast.info("Successfully Logged In !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/admin");
      setCookie("admin", password, {
        path: "/",
        maxAge: 9999 * 999999,
      });
    } else {
      toast.error("Wrong Room ID !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="UserLogin">
      {isBusy ? (
        <Loading />
      ) : (
        <form onSubmit={(e) => handleAdminLogin(e)}>
          <h1>Admin Login</h1>
          <input
            type="password"
            placeholder="Type Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="login" />
        </form>
      )}
    </div>
  );
}

export default AdminLogin;
