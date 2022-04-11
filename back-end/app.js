const { Socket } = require("socket.io");

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//var roomId;

var io_name = "62539df77fa391a794d0727f";
//open socket connection
io.on("connection", (socket) => {
  
  socket.on("join-room", (roomId, cb) => {
     socket.join(roomId);
    socket.emit("new user joined to the room")
  });
  socket.on("new-message",  (data,roomId)=> {
    //socket.emit("message",data)
    socket.to(roomId).emit("new-message", data);
  });
  socket.on("disconnect", (username) => {
    io.emit(username, " has left the chat");
  });
});
server.listen(8000);
