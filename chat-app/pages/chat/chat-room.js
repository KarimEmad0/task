//route for main directory
import React, { useState } from "react";
import { useRouter } from "next/router";
import io from "Socket.IO-client";
const socket = io("http://localhost:8000");

export default function App() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);

  const router = useRouter();
  var roomId = router.query.id;
  var userName = router.query.name;
  var f = true;
  if (socket.connected) {
    //console.log({roomId,userName})
    socket.emit("join-room", roomId);
  }

  const handleMessage = (e) => {
    socket.emit("new-message", { post: message, name: userName });
  };
  const closeRoom = (e) => {
    socket.disconnect(userName);
  };
  socket.on("message", (data) => {
    setList([...list, data]);
  });

  return (
    <div>
      Start Chat
      <br />
      <input type="text" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleMessage}>Send Message </button>
      <button onClick={closeRoom}>Exit</button>
      {JSON.stringify(list)}
    </div>
  );
}
