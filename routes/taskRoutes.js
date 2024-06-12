const express = require("express");
const router = express.Router();

const {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getFilteredTasks,
  sortTasks,
  searchTasks,
} = require("../controllers/TasksController");

router.route("/").get(getTasks).post(addTask);
router.route("/:id").delete(deleteTask).patch(updateTask);
router.route("/filter").get(getFilteredTasks);
router.route("/sort").get(sortTasks);
router.route("/search").get(searchTasks);

module.exports = router;