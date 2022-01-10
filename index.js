let express = require("express");
let socket = require("socket.io");

/** app setup */
let app = express();

/** server setup */
let server = app.listen(4000, () => {
  console.log("Web Socket Project is running on localhost:4000");
});

/** route setup */
app.get("/", (res, req) => {
  req.sendFile(__dirname + "/public/index.html");
});

/** socket setup */
let io = socket(server);
io.on("connection", (socket) => {
  // console.log("scocket connection connected:" + socket.id);
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (name) => {
    // console.log(name);
    socket.broadcast.emit("typing", name);
  });
});
