const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
  // database: "test1"
});

// Connect
db.connect(err => {
  if (err) throw err;
  console.log("MySql Connected...");
});

// Selecting data example
app.get("/api/users", (req, res) => {
  let sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

// Posting data example
app.post("/post", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const sql = "INSERT INTO users(name, email) VALUES (?, ?)";

  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
  });

  res.end();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
