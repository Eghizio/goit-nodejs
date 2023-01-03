const btnJson = document.querySelector("button#btn-json");

btnJson.addEventListener("click", () => {
  const json = { hello: "there", date: new Date().toISOString() };

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json),
  });
});