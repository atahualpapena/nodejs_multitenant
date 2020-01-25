const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userService = require("./services/users");
const { connectAllDb } = require("./connectionManager");
const connectionResolver = require("./middlewares/connectionResolver");
const PORT = process.env.PORT || 3000;
require("./env");

app.use(bodyParser.json());
connectAllDb();
app.use(connectionResolver.resolve);

app.get("/", (req, res) => {
  res.send("Hello from the root");
});
app.get("/users", userService.getAll);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
