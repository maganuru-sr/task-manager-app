const express = require("express");

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE TASK
router.post("/", authMiddleware, async (req, res) => {

  try {

    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      userId: req.user.id
    });

    await newTask.save();

    res.status(201).json(newTask);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find({
      userId: req.user.id
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// UPDATE TASK
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedTask);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});


// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

module.exports = router;