import { useState } from "react";
import Link from "next/link";
function AgentPage() {
  const [rooms, setRooms] = useState([]);
  const [agent, setAgents] = useState([]);


  var agentn;
  const fetchRooms = async () => {
    //To get avaliable Rooms.
    const response = await fetch("/api/rooms/");
    const data = await response.json();
    setRooms(data);
    //from prev pages we should have agent id, This code just to get id for test.
    const res = await fetch("/api/agent");
    const agent = await res.json();
    setAgents(agent);
    agentn = agent["data"].name;
  };
  return (
    <>
      <div>
        <p>
          click on show rooms to get Queue for clients that wants to chat, click
          on room to open:
        </p>
      </div>
      <button onClick={fetchRooms}>Show Rooms</button>
      {rooms["data"]?.map((room) => {
        //console.log(room)
        return (
          <li key={room._id}>
            <Link
              href={{
                pathname: "../chat/chat-room",
                query: { id: room._id, uname: agentn },
              }}
            >
              <a>{room._id}</a>
            </Link>
          </li>
        );
      })}
    </>
  );
}
export default AgentPage;
