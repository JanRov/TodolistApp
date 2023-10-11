import express from "express";
// import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let tasksD = [];
let tasksW = [];
let tasksA = [];

function handler(status) {
  status.classList.add("complete");
}

app.get("/", tasksA, (req, res) => {
  const data = {
    year: new Date().getFullYear(),
    taskArrayAll: tasksA,
    handler,
  };
  res.render("createtask.ejs", data);
});

function CreateTask(name, desc, duration, status, number) {
  this.name = name;
  this.desc = desc;
  this.duration = duration;
  this.status = status;
  this.number = number;
}
let a = 0;
app.post("/submit", tasksD, tasksW, tasksA, (req, res) => {
  let task = new CreateTask(
    req.body.name,
    req.body.desc,
    req.body.duration,
    "notComplete",
    a
  );
  a++;
  if (req.body.duration === "Weekly") {
    tasksW.push(task);
  } else if (req.body.duration === "Daily") {
    tasksD.push(task);
  }

  tasksA.push(task);
  let data = {
    taskArrayAll: tasksA,
    year: new Date().getFullYear(),
    handler,
    i: 0,
  };
  res.render("createtask.ejs", data);
});

app.get("/weekly", tasksW, (req, res) => {
  const data = {
    year: new Date().getFullYear(),
    taskArrayWeekly: tasksW,
    handler,
  };
  res.render("weekly.ejs", data);
});

app.get("/daily", tasksD, (req, res) => {
  const data = {
    year: new Date().getFullYear(),
    taskArrayDaily: tasksD,
    handler,
  };
  res.render("daily.ejs", data);
});

app.get("/reset", tasksA, tasksD, tasksW, (req, res) => {
  tasksA = [];
  tasksD = [];
  tasksW = [];
  const data = {
    year: new Date().getFullYear(),
    taskArrayAll: tasksA,
    handler,
  };

  res.render("createtask.ejs", data);
});

app.listen(port, () => {
  console.log("Listening on port 3000.");
});
