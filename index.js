const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const time = new Date().toISOString();

  console.log(`${req.method} ${req.url} - ${time}`);

  next();
});

let tasks = [
  {
    id: 1,
    title: "Login API gelistirme",
    description: "Kullanici giris sistemi",
    assignee: "Ilayda",
    status: "pending",
    priority: "high"
  }
];

app.get("/", (req, res) => {
  res.send("TASKFLOW API calisiyor!");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Gorev bulunamadi"
    });
  }

  res.json(task);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length > 0
      ? Math.max(...tasks.map(t => t.id)) + 1
      : 1,
    title: req.body.title,
    description: req.body.description,
    assignee: req.body.assignee,
    status: req.body.status,
    priority: req.body.priority
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Gorev bulunamadi"
    });
  }

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.assignee = req.body.assignee ?? task.assignee;
  task.status = req.body.status ?? task.status;
  task.priority = req.body.priority ?? task.priority;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Gorev bulunamadi"
    });
  }

  tasks = tasks.filter((t) => t.id !== id);

  res.json({
    message: "Gorev basariyla silindi"
  });
});

app.listen(3000, () => {
  console.log("Sunucu 3000 portunda calisiyor.");
});