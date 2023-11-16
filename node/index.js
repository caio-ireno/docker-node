// index.js
const express = require("express");
const app = express();

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);
var table =
  "CREATE TABLE people (id int not null auto_increment, name VARCHAR(255), primary key(id))";
const sql = `INSERT INTO people(name) values('Caio')`;
connection.query(table);

app.get("/", (req, res) => {
  const sql = "SELECT name FROM people";
  connection.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erro ao consultar o banco de dados" });
    }

    // Salva os resultados em uma variável externa
    const names = results.map((row) => row.name).join(", ");

    res.send(`Nomes no banco de dados: ${names}`);
  });
});

app.listen(5000, () => console.log("Server is up and running"));
