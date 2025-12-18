const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// лічильник оброблених запитів
let requestCount = 0;

// для роботи з JSON
app.use(express.json());

// робимо папку public доступною для клієнта
app.use(express.static(path.join(__dirname, "public")));

// логування кожного запиту
app.use((req, res, next) => {
  requestCount++;
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// POST /data
app.post("/data", (req, res) => {
  const body = req.body;

  res.json({
    message: "Отримано JSON та оброблено!",
    input: body,
  });
});

// GET /status
app.get("/status", (req, res) => {
  res.json({
    status: "OK",
    serverTime: new Date().toISOString(),
    requestsHandled: requestCount,
  });
});

// 404 помилка
app.use((req, res) => {
  res.status(404).json({ error: "Маршрут не знайдено" });
});

// запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
