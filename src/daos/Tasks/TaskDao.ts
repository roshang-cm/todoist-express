import mongoose, { Schema, Mongoose, Connection } from "mongoose";
import { Task, TaskModel } from "@entities/Task";
import logger from "@shared/Logger";

export interface AbstractTaskDao {
  add: (task: Task) => Promise<string>;
  delete: (task: Task) => Promise<string>;
  update: (task: Task) => Promise<string>;
}
export class TaskDao implements AbstractTaskDao {
  db: Connection;
  constructor() {
    this.db = mongoose.connection;
  }
  async add(task: Task) {
    logger.info("Received", task);
    const taskModel = new TaskModel(task);
    const result = await taskModel.save();
    return result.id;
  }
  async delete(task: Task) {
    const query = await TaskModel.findOneAndDelete({ id: task.id }).exec();
    if (!query) {
      throw new Error("Task matching id does not exist");
    }
    return task.id;
  }
  async update(task: Task) {
    const query = await TaskModel.findOneAndUpdate(
      { id: task.id },
      task
    ).exec();
    if (!query) {
      throw new Error("Task matching id does not exist");
    }
    return query.id;
  }
  async find(filters = {}) {
    console.log("Received filters", filters);
    const query = await TaskModel.find(filters).exec();
    return query.map((doc) => Task.fromJson(doc));
  }
}
