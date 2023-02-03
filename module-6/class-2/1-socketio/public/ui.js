let username = "User";

const changeUsername = ({ name }) => {
  username = name;
  document.querySelector("#username").textContent = name;
};

const pad = (num) => num.toString().padStart(2, "0");

const parseTime = (timestamp) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${pad(hour)}:${pad(minute)}`;
};

const renderMessage = ({ username, message, timestamp }) => {
  const date = parseTime(timestamp);

  const msgElement = document.createElement("div");
  msgElement.classList.add("msg");

  // This is dangerous and enables users to inject HTML!
  msgElement.innerHTML = `
    <div class="msg-header">
      ${username}
      <span>${date}</span>
    </div>
    <div class="msg-text">${message}</div>
  `;

  document.querySelector("#messages").appendChild(msgElement);
};

const renderInfo = (info) => {
  const msgElement = document.createElement("div");
  msgElement.classList.add("msg", "info");
  msgElement.textContent = info;

  document.querySelector("#messages").appendChild(msgElement);
};