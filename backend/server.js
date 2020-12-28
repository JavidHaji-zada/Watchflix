let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
let mysql = require("mysql");
let { SQL_STATEMENTS } = require("./sql");
app.use(cors());
app.use(bodyParser.json());

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: "Something failed!" });
	} else {
		next(err);
	}
}

app.use(clientErrorHandler);

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
	}
});

// SQL_STATEMENTS.forEach((statement) => {
// 	con.query(statement, (err, res) => {
// 		if (err) {
// 			// console.log("err ", err);
// 			// console.log("err sql is ", statement);
// 		} else {
// 			// console.log("table created");
// 		}
// 	});
// });

// con.query(
// 	"CREATE TABLE IF NOT EXISTS dummy (name VARCHAR(16), address VARCHAR(16))"
// );

app.get("/get", function (req, res) {
	res.send("Hello World!");
});

app.post("/register", (req, res) => {
	const {
		type,
		username,
		email,
		password,
		fullname,
		birthday,
		preffered_genres,
	} = req.body;
	if (type == "company") {
		let company_user = {
			c_username: username,
			email,
			password,
		};
		con.query("INSERT INTO CompanyUser", company_user, (error) => {
			if (error) {
				console.log("err ", error);
				res.send({
					code: 400,
					failed: "error occured",
				});
			} else {
				res.send({
					code: 200,
					success: "User Registered Successfully",
				});
			}
		});
	} else if (type == "individual") {
		let values = [[username, email, password, fullname, birthday]];
		let sql =
			"INSERT INTO User (username, email, password, fullname, b_date) VALUES?";
		con.query(sql, [values], (error) => {
			if (error) {
				console.log("err ", error);
				if (error.errno == 1062) {
					res.send({
						code: 409,
						failed: "Username already exists",
					});
				}
				res.send({
					code: 400,
					failed: "Error occured while user creation",
				});
				throw err;
			} else {
				for (
					let genre_index = 0;
					genre_index < preffered_genres.length;
					genre_index++
				) {
					let genre = [[preffered_genres[genre_index].name, username]];
					con.query(
						"INSERT INTO prefers (g_name, username) VALUES?",
						[genre],
						(err) => {
							if (err) {
								console.log("err ", err);
								res.send({
									code: 400,
									failed: "Error occured while genre preference",
								});
							}
						}
					);
				}
				res.send({
					code: 200,
					success: "User Registered Successfully",
				});
			}
		});
	}
});

// app.post("/login", (req, res) => {
// 	const { type, username, password } = req.body;
// 	if (type == "company") {
// 		let company_user = {
// 			c_username: username,
// 			password,
// 		};
// 		con.query("INSERT INTO CompanyUser", company_user, (error) => {
// 			if (error) {
// 				res.send({
// 					code: 400,
// 					failed: "error occured",
// 				});
// 			} else {
// 				res.send({
// 					code: 200,
// 					success: "User Registered Successfully",
// 				});
// 			}
// 		});
// 	} else if (type == "individual") {
// 		let user = {
// 			username,
// 			email,
// 			password,
// 			fullname,
// 			b_date: birthday,
// 		};
// 		con.query("INSERT INTO User", user, (error) => {
// 			if (error) {
// 				res.send({
// 					code: 400,
// 					failed: "error occured",
// 				});
// 			} else {
// 				res.send({
// 					code: 200,
// 					success: "User Registered Successfully",
// 				});
// 			}
// 		});
// 	}
// });

let server = app.listen(5000, function () {
	console.log("Server is running..");
});
