const TaskModel = require("../models/task.model");

const {
  notFoundError,
  objectIdCastError,
} = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");

const { default: mongoose } = require("mongoose");

class TaskController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getAll() {
    try {
      const tasks = await TaskModel.find({});

      this.res.status(200).send(tasks);
    } catch (error) {
      this.res.status(500).send(message.error);
    }
  }

  async getById() {
    try {
      const taskId = this.req.params.id;

      const task = await TaskModel.findById(taskId);

      if (!task) {
        console.log(task);
        return notFoundError(this.res);
      }

      return this.res.status(200).send(task);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(this.res);
      }
    }
  }

  async create() {
    try {
      const newTask = new TaskModel(this.req.body);

      await newTask.save();

      this.res.status(201).send(newTask);
    } catch (error) {
      this.res.status(500).send(message.error);
    }
  }

  async update() {
    try {
      const taskId = this.req.params.id;
      const taskData = this.req.body;

      const taskToUpdate = await TaskModel.findById(taskId);

      if (!taskToUpdate) {
        return notFoundError(this.res);
      }

      const allowedUpdates = ["isCompleted"];
      const requestedUpdates = Object.keys(taskData);

      for (const update of requestedUpdates) {
        if (allowedUpdates.includes(update)) {
          taskToUpdate[update] = taskData[update];
        } else {
          return notAllowedFieldsToUpdateError(this.res);
        }
      }

      await taskToUpdate.save();
      return this.res.status(200).send(taskToUpdate);
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return objectIdCastError(this.res);
      }
    }
  }

  async delete() {
    try {
      const taskId = this.req.params.id;

      const taskToDelete = await TaskModel.findById(taskId);

      if (!taskToDelete) {
        return notFoundError(this.res);
      }

      const deletedTask = await TaskModel.findByIdAndDelete(taskId);

      this.res.status(200).send(deletedTask);
    } catch (error) {
      this.res.status(500).send(message.error);
    }
  }
}

module.exports = TaskController;
