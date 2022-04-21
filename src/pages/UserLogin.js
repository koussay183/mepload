import React, { useEffect, useState } from "react";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { AppStore } from "../store/AppStore";
import { toast } from "react-toastify";

import { useCookies } from "react-cookie";
import Loading from "../components/Loading";

function UserLogin() {
  const [roomId, setRoomId] = useState("");
  const [cookies, setCookie] = useCookies(["room"]);
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    const setRoom = async (id) => {
      const roomRef = doc(db, "rooms", id);
      const room = await getDoc(roomRef);
      AppStore.update((s) => {
        s.isLoggedIn = true;
        s.room = { ...room.data(), id: room.id };
      });
    };
    if (cookies.room) {
      setRoom(cookies.room);
    } else {
      setIsBusy(false);
    }
    return () => {
      setIsBusy(false);
    };
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsBusy(true);
    const roomRef = doc(db, "rooms", roomId);
    const room = await getDoc(roomRef);
    setIsBusy(false);
    if (room.exists()) {
      toast.info("Successfully Logged In !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      AppStore.update((s) => {
        s.isLoggedIn = true;
        s.room = { ...room.data(), id: room.id };
      });

      setCookie("room", room.id, {
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
        <form onSubmit={(e) => loginHandler(e)}>
          <h1>Paste Room ID To Login</h1>
          <input
            type="text"
            placeholder="Paste room ID"
            required
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input type="submit" value="join" />
        </form>
      )}
    </div>
  );
}

export default UserLogin;
