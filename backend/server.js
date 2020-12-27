let express = require("express");
let app = express();
let mysql = require("mysql");
let { SQL_STATEMENTS } = require("./sql");

// config for your database
let config = {
	user: "M2cO6AAij1",
	password: "vi4MH2X4cz",
	host: "remotemysql.com",
	database: "M2cO6AAij1",
};

let con = mysql.createConnection(config);

con.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("no errors");
	}
});

SQL_STATEMENTS.forEach((statement) => {
	con.query(statement, (err, res) => {
		if (err) {
			// console.log("err ", err);
			// console.log("err sql is ", statement);
		} else {
			// console.log("table created");
		}
	});
});

app.get("/get", function (req, res) {
	res.send("Hello World!");
});

let server = app.listen(5000, function () {
	console.log("Server is running..");
});
