import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const port = 8080;
const server = new WebSocketServer({ port });

// server.on("connection", (socket) => {
//   console.log("Someone connected!");
//   socket.send("Hello there!");

//   socket.on("message", (message) => {
//     const msg = message.toString();
//     console.log(msg);
//   });
// });

const clients = new Map();

server.on("connection", (socket) => {
  const id = nanoid();
  clients.set(id, socket);

  console.log(`New connection with id: ${id}`);

  socket.send(`Hello there! Your id is: ${id}`);

  socket.on("message", (data) => {
    const msg = `[${id}]: ${data}`;
    console.log(msg);

    clients.forEach(c => c.send(msg));
  });
});
