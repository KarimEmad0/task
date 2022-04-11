const { Socket } = require("socket.io");

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
let users = [];
var count = 0;
var io_name = "62539df77fa391a794d0727f";
//open socket connection
io.on("connection", (socket) => {
  //Socket means that new person come to join
  //get his user name
  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    io.emit("new user", users);
  });
  //pass roomName from client side and return cb
  socket.on("join-room", (roomId, cb) => {
    // socket.join(roomId);
    // cb(messages[roomName]);
    //console.log("User Joined room ",roomId)
    //socket.emit("new user joined to the room")
  });
  socket.on("new-message", function (data) {
    //socket.emit("message",data)
    socket.to(roomId).emit("new-message", data);
  });
  socket.on("disconnect", () => {
    io.emit(username, " has left the chat");
  });
});
server.listen(8000);
