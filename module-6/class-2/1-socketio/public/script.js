const socketIO = io();

socketIO.on("name", changeUsername);

socketIO.on("connect", () => {
  console.log("Connected to the Socket.IO server");

  // setTimeout(() => {
  //   document.querySelector("h1").textContent = "Or fuck the console. Let's build a Chat!";
  // }, 5000);
});

socketIO.on("message", renderMessage);
socketIO.on("info", renderInfo);

const input = document.querySelector("form#msg-form>input");
document.querySelector("form#msg-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const message = input.value;

  socketIO.send({ username, message });

  input.value = "";
  input.focus();
});

document.querySelector("form#name").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("form#name>input").value;
  socketIO.emit("name", { name });
  changeUsername({ name });
});