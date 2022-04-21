import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isBusy, setIsBusy] = useState(true);
  const [cookies, setCookie] = useCookies(["admin"]);
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  //   now get all rooms and add the create room button
  useEffect(() => {
    if (cookies.admin !== process.env.REACT_APP_ADMIN_PASSWORD) {
      navigate("/admin/login");
    }
    setIsBusy(false);
  }, []);
  return (
    <div className="Dashboard">{isBusy ? <Loading /> : <h1>Dashboard</h1>}</div>
  );
}

export default Dashboard;
