const getUsers = async (role) => {
  const response = await fetch("/api/users", {
    headers: {
      "Content-Type": "application/json",
      "role": role
    }
  });
  const users = await response.json();
  console.log(users);
};

document.querySelector("button#btn-users")
  .addEventListener("click", () => getUsers("user"));

document.querySelector("button#btn-users-admin")
  .addEventListener("click", () => getUsers("admin"));
