let mysql2 = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();
let connectionRequest = require("./mySqlConnection");
const url = "http://localhost:3001/phone";
app.use(express.json());
app.use(cors());

var listPhones = [];

app.post("/phone", (req, res, next) => {
  res.json(req.body);
  let data = req.body.phone;
  controllerMethod(data);
});

app.listen(3001, () => {
  console.log(`Example app listening at 3001`);
});

const controllerMethod = (req, res, next) => {
  var results = [];
  var trueSearched = [];
  //Establish the connection on this request
  connection = connectionRequest();
  //Run the query
  connection.query("SELECT phoneNo FROM phoneBook", (err, values) => {
    if (err) {
      // If an error occurred, send a generic server failure
      console.log(`not successful! ${err}`);
      connection.destroy();
    } else {
      //If successful, inform as such
      console.log(`Query was successful`);

      //send json file to end user if using an API
      listPhones.push(values);

      let filtered = listPhones.map((element) =>
        element.map((ele) => ele.phoneNo)
      );

      for (var i = 0; i < filtered.length; i++) {
        for (var value = 0; value < filtered[i].length; value++) {
          results.push(filtered[i][value].toString());
        }
      }
      let mappedResults = results.map((element) => {
        let searched = element.includes(req);
        if (searched === true) {
          trueSearched.push(element);
        }
      });

      app.get("/listPhoneNo", (req, res) => {
        res.json({
          phone : trueSearched,
        });
      });

      //destroy the connection thread
      connection.destroy();
    }
  });
};

module.exports = app;
