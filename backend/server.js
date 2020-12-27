let express = require("express");
let app = express();
let mysql = require("mysql");

// config for your database
let config = {
	user: "1OfpcLU2bB",
	password: "rbcjLAGs34",
	host: "remotemysql.com",
	database: "1OfpcLU2bB",
};

let con = mysql.createConnection(config);

con.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("no errors");
	}
});

let statement =
	"CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";

con.query(statement, (err, res) => {
	if (err) {
		console.log("err ", err);
	} else {
		console.log("table created");
	}
});

app.get("/get", function (req, res) {
	res.send("Hello World!");
});

let server = app.listen(5000, function () {
	console.log("Server is running..");
	// let con = sql.createConnection(config);
	// let statement =
	// 	"CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
	// con.query(statement, (err, res) => {
	// 	if (err) {
	// 		console.log("err ", err);
	// 	} else {
	// 		console.log("table created");
	// 	}
	// });
});
