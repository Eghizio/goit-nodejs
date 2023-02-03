import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

app.use(express.static("public"));

const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});


/*
 ChatGOIT aka ChatNotGPT
 - User connects (register him to DB)
 - Notify other users about new user

 - User disconnects (unregister from DB)
 - Notify other users about leaving user

 - User sends message - the message is broadcasted to everybody

 - User can change their name
*/

const clients = new Map(); // DB

const createMessage = (username, message) => ({ username, message, timestamp: Date.now() });

io.on("connection", (socket) => {
  // sends event data to all clients
  const broadcast = (data, event = "message") => {
    console.log(socket.id, data);
    socket.emit(event, data); // sends to the current client
    socket.broadcast.emit(event, data); // sends to all other clients
  };

  const id = socket.id;
  clients.set(id, id);

  socket.emit("name", { name: id });
  socket.on("name", ({ name }) => {
    clients.set(id, name);
  });


  broadcast(`${id} connected!`, "info");
  console.log(`(${clients.size}) clients connected!`);

  socket.on("disconnect", () => {
    clients.delete(id);
    broadcast(`${id} disconnected!`, "info");
  });

  socket.on("message", ({ username, message }) => {
    const msg = createMessage(username, message);
    broadcast(msg);
  });

});
