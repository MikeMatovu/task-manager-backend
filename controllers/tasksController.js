const { Task } = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user._id,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user._id, //
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    console.log(task.user)
    if (task.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFilteredTasks = async (req, res) => {
  try {
    const { completed, category, priority } = req.query;
    const filter = {};

    filter.user = req.user._id;

    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    if (category) {
      filter.category = category;
    }

    if (priority) {
      filter.priority = priority;
    }

    const tasks = await Task.find(filter);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sortTasks = async (req, res) => {
  try {
    const { sortBy = "reminderDate", order = "asc" } = req.query;
    const sortOrder = order === "desc" ? -1 : 1;

    const sortOptions = {};

    if (sortBy === "priority") {
      // Create a sort object based on priority
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      const tasks = await Task.find({ user: req.user._id });
      tasks.sort(
        (a, b) =>
          (priorityOrder[a.priority] - priorityOrder[b.priority]) * sortOrder
      );
      res.status(200).json({ tasks });
    } else {
      sortOptions[sortBy] = sortOrder;
      const tasks = await Task.find({ user: req.user._id }).sort(sortOptions);
      res.status(200).json({ tasks });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchTasks = async (req, res) => {
  try {
    const { query } = req.query;
    const tasks = await Task.find({
      user: req.user._id,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getFilteredTasks,
  sortTasks,
  searchTasks,
};
