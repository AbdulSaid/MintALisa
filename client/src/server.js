"use strict";

// Basic express setup:
const PORT          = 8081;
const ENV = require("./environment");
const app = require("./application")(ENV);
const db = require("./db");

const charactersRoutes = require("./routes/characters")(db);
app.use("/", charactersRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
