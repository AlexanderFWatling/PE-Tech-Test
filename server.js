const express = require("express");
const fs = require("fs");

//create app
const app = express();

// set port either based on env if there is one, if not use 3001
app.set("port", process.env.PORT || 3001);

// Get endpoint to be called for the planet info
app.get("/api/planets", (req, res) => {
  //return planet data
  res.send("Hello World")
});

// app to listen on set port , log where to find server.

app.listen(app.get("port"), () => {
  console.log(`Server running at: http://localhost:${app.get("port")}/`)
})
