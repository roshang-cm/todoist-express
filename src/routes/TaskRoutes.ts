import { Router } from "express";
import { TaskDao } from "@daos/Tasks/TaskDao";
import { Task } from "@entities/Task";
import { BAD_REQUEST } from "http-status-codes";

const taskRouter = Router();
const taskDao = new TaskDao();

// GET TASKS
taskRouter.get("/", async (req, res) => {
  res.send(await taskDao.find(req.body));
});

// ADD TASK
taskRouter.post("/", async (req, res) => {
  const task = Task.fromJson(req.body);
  const result = await taskDao.add(task);
  res.send(result);
});

// UPDATE TASK
taskRouter.put("/", async (req, res) => {
  const task = Task.fromJson(req.body);
  const result = await taskDao.update(task);
  res.send(result);
});

// DELETE TASK
taskRouter.delete("/", async (req, res) => {
  const task = Task.fromJson(req.body);
  const result = await taskDao.delete(task);
  res.send(result);
});

export default taskRouter;
