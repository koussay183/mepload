import React, { useState, useEffect } from "react";

import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useCookies } from "react-cookie";
import { AppStore } from "../store/AppStore";

import Loading from "../components/Loading";

import File from "../components/File";

import commentSvg from "../images/comment.svg";

function Home() {
  const [isBusy, setIsBusy] = useState(true);
  const [cookies, setCookie] = useCookies(["room"]);
  const room = AppStore.useState((s) => s.room);
  const [files, setfiles] = useState([]);

  useEffect(() => {
    const fileCollectionRef = collection(db, "files");
    const getIt = async (ref) => {
      const q = query(ref, where("roomRef", "==", room.id));
      const data = await getDocs(q);
      setfiles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsBusy(false);
    };
    getIt(fileCollectionRef);
    return () => {
      setIsBusy(false);
    };
  }, []);
  return isBusy ? (
    <Loading />
  ) : (
    <div className="Home">
      <nav>
        <span>{room.roomName}</span>
        <button
          onClick={() => {
            setCookie("room", "");
            AppStore.update((s) => {
              s.room = {};
              s.isLoggedIn = false;
            });
          }}
        >
          logout
        </button>
      </nav>
      <main>
        <div className="commentHolder">
          <h1 className="roomComment">teacher comment : {room.comment}</h1>
          <img src={commentSvg} alt="comment" />
        </div>
        <div className="filesHolder">
          {files.map((file, key) => (
            <File file={file} key={key} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
