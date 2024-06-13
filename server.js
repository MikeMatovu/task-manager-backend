require("dotenv").config();
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");
const express = require("express");
const cors = require("cors");

const { connectDB } = require("./config/db");
const app = express();

connectDB();
app.use(express.json());
app.use(cors());


app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
