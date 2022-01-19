"use strict";

// Basic express setup:
const PORT          = 8080;
const ENV = require("./environment");
const app = require("./application")(ENV);
const db = require("./db");



app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
