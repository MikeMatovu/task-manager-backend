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
} = require("../controllers/tasks.controller");

const { verifyUser } = require("../middleware/Middleware");

router.route("/").get([verifyUser], getTasks).post([verifyUser], addTask);
router.route("/:id").delete([verifyUser], deleteTask).patch([verifyUser], updateTask);
router.route("/filter").get([verifyUser], getFilteredTasks);
router.route("/sort").get([verifyUser], sortTasks);
router.route("/search").get([verifyUser], searchTasks);

module.exports = router;