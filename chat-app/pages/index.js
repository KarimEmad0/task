//Get information from user and go to next page.
import Router, { useRouter, withRouter } from "next/router";
import { useState } from "react";

function ClientPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  var clientId;
  const submitClient = async () => {
    //To POST Client and contain his id.
    const response = await fetch("/api/client/", {
      method: "POST",
      body: JSON.stringify({ name: name, mobile: mobile, email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    clientId = data["data"]._id;
    var val = clientId.toString();

    console.log(data);

    //TO CREATE ROOM and get it's ID.
    const res = await fetch("/api/rooms/", {
      method: "POST",
      body: JSON.stringify({
        client_id: 0,
        agent_id: 0,
        chat: [{ name: "", message: "" }],
        open: 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const room = await res.json();
    Router.push({
      pathname: "/chat/chat-room",
      query: {
        id: room["data"]._id,
        uname: name,
      },
    });
  };
  return (
    <>
      <div>
        <p>Please enter your information:</p>
      </div>
      <div>
        <label htmlFor="mobile">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile number:</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="mobile">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <p>Note: You can start Chat after you Fill your information</p>
        <button onClick={submitClient}>Start chat</button>
      </div>
    </>
  );
}
export default ClientPage;
