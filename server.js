const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
//create app
const app = express();

// set port either based on env if there is one, if not use 3001
app.set("port", process.env.PORT || 3001);

// set static serving of img data in /data, /data will be used as the root for static img serving
app.use(express.static("data"));

// Get endpoint to be called for the planet info
app.get("/api/planets", (req, res) => {

  const planet = req.query.planet;

  if (!planet) {
    res.statusCode = 400;
    res.json({
      error: "Missing required parameter \"planet\""
    });
  } else {

  fs.createReadStream(path.resolve(__dirname, 'data', 'celestial-bodies.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => {
      res.statusCode = 500;
      res.send(`Error parsing data on the server due to ${error}`);
      console.log(`Cannot read CSV due to an error: ${error}`);
    })
    .on('data', row => {
      if(row.Name.toLowerCase() === planet.toLowerCase() ) {
        res.send(row);
      }
      console.log(row.Name);
    });
  }
});

// app to listen on set port , log where to find server.

app.listen(app.get("port"), () => {
  console.log(`Server running at: http://localhost:${app.get("port")}/`)
})
