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

// Get endpoint to be called for the body info
app.get("/api/bodies", (req, res) => {

  const body = req.query.body;

  //check there is a query, if not send back error with code 400
  if (!body) {
    res.statusCode = 400;
    res.json({
      error: "Missing required parameter \"body\""
    });
  } else {

    //read & then parse csv file of body information
  fs.createReadStream(path.resolve(__dirname, 'data', 'celestial-bodies.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => {
      //handle internal error and respond appropriately
      res.statusCode = 500;
      res.send(`Error parsing data on the server due to ${error}`);
      console.log(`Cannot read CSV due to an error: ${error}`);
    })
    .on('data', row => {
      /*The parsed csv is streamed row by row, check to see if the row matches the query
      When a match is found return the parsed row and end the request
      */
      if(row.Name.toLowerCase() === body.toLowerCase() ) {
        res.send(row);
        res.end();
      }
    });
  }
});

// Get endpoint to return list of bodies, allowing dynamic generation of components on the front-end
app.get("/api/bodies/list", (req, res) => {
  let listOfPlanets = []

  fs.createReadStream(path.resolve(__dirname, 'data', 'celestial-bodies.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => {
    //handle internal error and respond appropriately
    res.statusCode = 500;
    res.send(`Error parsing data on the server due to ${error}`);
    console.log(`Cannot read CSV due to an error: ${error}`);
    })
    .on('data', row => {
    listOfPlanets.push(row.Name);
    })
    .on('end', () => {
      res.send(listOfPlanets);
      res.end();
    })
})

// app to listen on set port , log where to find server.

app.listen(app.get("port"), () => {
  console.log(`Server running at: http://localhost:${app.get("port")}/`)
})
