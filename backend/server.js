let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
let app = express();
let mysql = require("mysql");
let { generateRandomID } = require("./utils");
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

// con.query(
// 	"CREATE TRIGGER accept_friend AFTER INSERT ON friend" +
// 		" FOR EACH ROW" +
// 		" BEGIN" +
// 		" DELETE FROM request WHERE username1=NEW.username1 AND username2=NEW.username2;" +
// 		" END",
// 	[],
// 	(err) => {
// 		console.log("err ", err);
// 	}
// );
app.get("/get", function (req, res) {
	res.send({ a: "Hello World!" });
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
		let values = [[fullname, username, email, password]];
		let sql =
			"INSERT INTO CompanyUser (name, c_username, email, password) VALUES?";
		con.query(sql, [values], (error) => {
			if (error) {
				console.log("err ", error);
				res.send({
					code: 400,
					failed: "error occured",
				});
			} else {
				res.send({
					code: 200,
					success: "Company User Registered Successfully",
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

app.post("/new_channel", (req, res) => {
	const { name, username } = req.body;
	let channel_id = generateRandomID(12);
	let c_name = name;
	let values = [[username, channel_id, c_name]];
	con.query(
		"INSERT INTO Channel (username, channel_id, c_name) VALUES ?",
		[values],
		(error) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Error occured while channel creation",
				});
			} else {
				res.send({
					code: 200,
					success: "Channel creation successfull",
					data: { channel_id, c_name, medias: [] },
				});
			}
		}
	);
});

app.get("/series", (req, res) => {
	con.query(
		"SELECT * FROM Series JOIN MediaProduct on Series.m_id = MediaProduct.m_id",
		(error, series) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Could not get series",
				});
			} else {
				res.send({
					code: 200,
					success: "Fetched series",
					data: series,
				});
			}
		}
	);
});

app.get("/movies", (req, res) => {
	con.query(
		"SELECT * FROM Movie JOIN MediaProduct on Movie.m_id = MediaProduct.m_id",
		(error, movies) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Could not get movies",
				});
			} else {
				res.send({
					code: 200,
					success: "Fetched movies",
					data: movies,
				});
			}
		}
	);
});

app.get(`/medias/:channel_id`, (req, res) => {
	const { channel_id } = req.params;
	con.query(
		"SELECT * FROM contain JOIN MediaProduct ON contain.channel_id = ? AND contain.m_id = MediaProduct.m_id",
		[channel_id],
		(error, result) => {
			if (error) {
				console.log("error ", error);
				res.send({
					code: 400,
					failed: "Could not get channel",
				});
			} else {
				console.log("medias for channel ", result);
				res.send({
					code: 200,
					success: "fetched channel",
					data: result,
				});
			}
		}
	);
});

app.get(`/channel/:channel_id`, (req, res) => {
	const { channel_id } = req.params;
	con.query(
		"SELECT * FROM Channel WHERE channel_id = ?",
		[channel_id],
		(error, result) => {
			if (error) {
				console.log("error ", error);
				res.send({
					code: 400,
					failed: "Could not get channel",
				});
			} else {
				console.log("fetched channel ", result);
				if (result.length > 0) {
					let { c_name, channel_id, username } = result[0];
					res.send({
						code: 200,
						success: "fetched channel",
						data: result[0],
					});
				}
			}
		}
	);
});

app.get("/channels/:username", (req, res) => {
	const { username } = req.params;
	console.log("get channels for ", username);
	con.query(
		"SELECT * FROM Channel WHERE username = ?",
		[username],
		(error, channels) => {
			if (error) {
				console.log("error ", error);
				res.send({
					code: 400,
					failed: "Cannot get channels",
				});
			} else {
				console.log("channels ", channels);
				if (channels.length > 0) {
					res.send({
						code: 200,
						success: "Fetched all channels for user",
						data: channels,
					});
				}
			}
		}
	);
});

app.get("/profile", function (req, res) {
	const { type, new_username, name, surname, password } = req.body;
	console.log("go to profile");

	if (type == "company") {
		let sql =
			"UPDATE User SET username = ? , fullname = ?, password = ? WHERE username = ?;";
		let values = [[new_username, name + surname, password]];
		con.query(sql, [values], (error) => {
			if (error) {
				console.log("err ", error);
				res.send({
					code: 400,
					failed: "error occured",
				});
			} else {
				res.send({
					code: 200,
					success: "Profile change succesfully",
				});
			}
		});
	} else {
		let sql =
			"UPDATE CompanyUser SET username = ? , fullname = ?, password = ? WHERE username = ?;";
		let values = [[new_username, name + surname, password]];
		con.query(sql, [values], (error) => {
			if (error) {
				console.log("err ", error);
				res.send({
					code: 400,
					failed: "error occured",
				});
			} else {
				res.send({
					code: 200,
					success: "Profile change succesfully",
				});
			}
		});
	}
});

app.post("/login", (req, res) => {
	const { type, username, password } = req.body;
	// res.set("Content-Type", "application/json");
	console.log("inside login");
	if (type == "company") {
		con.query(
			"SELECT * FROM CompanyUser WHERE username = ?",
			[username],
			(error, result) => {
				if (error) {
					console.log("error");
					res.send({
						code: 400,
						failed: "error occured",
					});
				} else {
					console.log("no error");
					if (result.length > 0) {
						if (password == result[0].password) {
							return res.json({
								code: 200,
								success: "success",
								data: result[0],
							});
						} else {
							return res.json({
								code: 403,
								failed: "Invalid password",
							});
						}
					} else {
						return res.json({
							code: 401,
							failed: "Username does not exist",
						});
					}
				}
			}
		);
	} else {
		con.query(
			"SELECT * FROM User where username = ?",
			[username],
			(error, result) => {
				if (error) {
					console.log("error");
					res.send({
						code: 400,
						failed: "error occured",
					});
				} else {
					console.log("no error");
					if (result.length > 0) {
						console.log("email correct");
						if (password == result[0].password) {
							console.log("info correct");
							return res.json({
								code: 200,
								success: "succesfully found",
								data: result[0],
							});
						} else {
							return res.json({
								code: 403,
								failed: "Password does not match",
							});
						}
					} else {
						return res.json({
							code: 401,
							failed: "Username does not exist",
						});
					}
				}
			}
		);
	}
});

app.post("/send_request", (req, res) => {
	const { from, to } = req.body;
	if (from == to) {
		res.send({
			code: 400,
			failed: "Cannot add self",
		});
	}
	let userCheck = "SELECT * FROM User WHERE username = ?";
	con.query(userCheck, to, (error, result) => {
		if (error) {
			console.log("error friend request\n", error);
			res.send({
				code: 400,
				failed: "Error while sending friend request",
			});
		} else if (result.length > 0) {
			let sql = "INSERT INTO request (username1, username2) VALUES?";
			con.query(sql, [[[from, to]]], (err, req_res) => {
				if (err) {
					console.log("err while adding ", err);
					res.send({
						code: 400,
						failed: "Could not add friend",
					});
				} else {
					res.send({
						code: 200,
						success: "Sent friend request",
					});
				}
			});
		} else {
			res.send({
				code: 403,
				failed: "Incorrect username",
			});
		}
	});
});

app.get("/sent_requests/:username", (req, res) => {
	const { username } = req.params;
	con.query(
		"SELECT * FROM request WHERE username1 = ?",
		username,
		(error, requests) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Could not get requests",
				});
			} else {
				res.send({
					code: 200,
					success: requests,
				});
			}
		}
	);
});

app.get("/received_requests/:username", (req, res) => {
	const { username } = req.params;
	console.log("username ", username);
	con.query(
		"SELECT * FROM request WHERE username2 = ?",
		username,
		(error, requests) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Could not get requests",
				});
			} else {
				console.log("received requests ", requests);
				res.send({
					code: 200,
					success: "Fetched friend requests",
					data: requests,
				});
			}
		}
	);
});

app.get("/friends/:username", (req, res) => {
	const { username } = req.params;
	con.query(
		"SELECT * FROM friend WHERE username1=? OR username2=?",
		[username, username],
		(error, friends) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Could not get friends",
				});
			} else {
				let allFriends = friends.map((friend) => {
					if (friend.username1 == username)
						return { username: friend.username2 };
					return { username: friend.username1 };
				});
				res.send({
					code: 200,
					success: "Fetched friends",
					data: allFriends,
				});
			}
		}
	);
});

app.get("/user/:username", (req, res) => {
	const { username } = req.params;
	con.query(
		"SELECT * FROM User WHERE username = ?",
		username,
		(error, users) => {
			if (!error) {
				res.send({
					code: 200,
					success: "User fetched",
					data: users[0],
				});
			}
		}
	);
});

app.get("/media/:id", (req, res) => {
	const { id } = req.params;
	con.query(
		"SELECT * FROM MediaProduct WHERE m_id = ?",
		[id],
		(error, products) => {
			if (error) {
				console.log("error ", error);
				res.send({
					code: 400,
					failed: "Cannot get channels",
				});
			} else {
				console.log("channels ", products);
				if (products.length > 0) {
					res.send({
						code: 200,
						success: "Fetched browsed media",
						data: products[0],
					});
				} else {
					res.send({
						code: 403,
						failed: "no such product found",
					});
				}
			}
		}
	);
});

app.post("/accept_request", (req, res) => {
	const { username1, username2 } = req.body;
	let values = [[[username1, username2]]];
	con.query(
		"DELETE FROM request WHERE username1 = ? AND username2 = ?",
		[username1, username2],
		(error, result) => {
			if (error) {
				console.log("error deletion ", error);
				res.send({
					code: 400,
					failed: "Could not delete request",
				});
			} else {
				con.query(
					"INSERT INTO friend (username1, username2) VALUES?",
					values,
					(addErr, addRes) => {
						if (addErr) {
							console.log("add ", addErr);
							res.send({
								code: 400,
								failed: "Could not add friend",
							});
						} else {
							res.send({
								code: 200,
								success: "Friend request accepted!",
							});
						}
					}
				);
			}
		}
	);
});

app.post("/remove_request", (req, res) => {
	const { username1, username2 } = req.body;
	let values = [[[username1, username2]]];
	con.query(
		"DELETE FROM request WHERE username1 = ? AND username2 = ?",
		[username1, username2],
		(error, result) => {
			if (error) {
				console.log("error deletion ", error);
				res.send({
					code: 400,
					failed: "Could not delete request",
				});
			} else {
				res.send({
					code: 200,
					success: "Success",
				});
			}
		}
	);
});

app.post("/new_watch", (req, res) => {
	const { username, m_id, watch_date } = req.body;
	let values = [[username, m_id, watch_date, 1]];
	con.query(
		"INSERT INTO watch (username, m_id, watch_date, watch_count) VALUES ?",
		[values],
		(error) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Error occured while channel creation",
				});
			} else {
				res.send({
					code: 200,
					success: "watch succesfully added",
				});
			}
		}
	);
});

app.post("/update_watch", function (req, res) {
	const { username, m_id, watch_date, watch_count } = req.body;
	let sql =
		"UPDATE watch SET watch_count = ?, watch_date = ? WHERE username = ? AND m_id = ?;";
	let values = [watch_count, watch_date, username, m_id];
	con.query(sql, [watch_count, watch_date, username, m_id], (error) => {
		if (error) {
			console.log("err ", error);
			res.send({
				code: 400,
				failed: "error occured",
			});
		} else {
			res.send({
				code: 200,
				success: "watch_count and watch_date updated",
			});
		}
	});
});

app.get("/watch/:username/:m_id", (req, res) => {
	const { username, m_id } = req.params;
	con.query(
		"SELECT * FROM watch WHERE username = ? AND m_id = ?",
		[username, m_id],
		(error, watches) => {
			if (error) {
				console.log("error ", error);
				res.send({
					code: 400,
					failed: "Cannot get channels",
				});
			} else {
				console.log("channels ", watches);
				res.send({
					code: 200,
					success: "Fetched browsed media",
					data: watches[0],
				});
			}
		}
	);
});

app.get("/last_watch/:username", (req, res) => {
	const { username } = req.params;
	// "SELECT * FROM ( SELECT m_id, MAX(watch_date) AS max_date FROM watch GROUP BY username) r JOIN watch s ON s.m_id = r.m_id AND s.watch_date = r.max_date ORDER BY s.username HAVING username=?",
	// "SELECT MAX(watch_date) FROM watch w INNER JOIN (SELECT username, m_id, MAX(watch_date) AS watched FROM watch WHERE username=? GROUP BY username, m_id) a ON a.username=w.username AND a.m_id=w.m_id",
	con.query(
		"SELECT * FROM (SELECT MAX(watch_date) AS max_date FROM watch WHERE username=?) w JOIN watch ON w.max_date=watch.watch_date",
		[username],
		(err, movie) => {
			if (err) {
				console.log("error on latest watch ", err);
				res.send({
					code: 400,
					failed: "Could not get latest watch movie",
				});
			} else {
				res.send({
					code: 200,
					success: "Fetched latest",
					data: movie[0],
				});
			}
		}
	);
});

app.get("/comments/:m_id", (req, res) => {
	const { m_id } = req.params;
	console.log("get channels for mid ", m_id);
	con.query(
		"SELECT * FROM Comment WHERE m_id = ?",
		[m_id],
		(error, comments) => {
			if (error) {
				console.log("error ", error);
				res.send({
					code: 400,
					failed: "Cannot get channels",
				});
			} else {
				console.log("channels ", comments);
				res.send({
					code: 200,
					success: "Fetched all channels for user",
					data: comments,
				});
			}
		}
	);
});

app.post("/comment", (req, res) => {
	const { username, replied_to, comment_date, c_content, m_id } = req.body;
	let comment_id = generateRandomID(12);
	let values = [
		[m_id, username, comment_id, replied_to, comment_date, c_content],
	];
	con.query(
		"INSERT INTO Comment (m_id, username, comment_id, reply_to, comment_date, c_content) VALUES?",
		[values],
		(error) => {
			if (error) {
				res.send({
					code: 400,
					failed: "Failed to post comment",
				});
			} else {
				res.send({
					code: 200,
					success: "Comment Posted",
					data: comment_id,
				});
			}
		}
	);
});

app.post("/update_profile", (req, res) => {
	const { new_username, name, surname, password, username, type } = req.body;

	console.log("go to profile");

	if (type == "company") {
		let sql =
			"UPDATE User SET username = ? , fullname = ?, password = ? WHERE username = ?;";
		let values = [[new_username, name + surname, password, username]];
		con.query(sql, [values], (error) => {
			if (error) {
				console.log("err ", error);
				res.send({
					code: 400,
					failed: "error occured",
				});
			} else {
				res.send({
					code: 200,
					success: "Profile change succesfully",
				});
			}
		});
	} else {
		let sql =
			"UPDATE CompanyUser SET username = ? , fullname = ?, password = ? WHERE username = ?;";
		let values = [[new_username, name + surname, password, username]];
		con.query(sql, [values], (error) => {
			if (error) {
				console.log("err ", error);
				res.send({
					code: 400,
					failed: "error occured",
				});
			} else {
				res.send({
					code: 200,
					success: "Profile change succesfully",
				});
			}
		});
	}
});

app.post("/upload", (req, res) => {
	const { release_date, name, publisher } = req.body;
	console.log("req body ", req.body);
	let _id = generateRandomID(12);
	let values = [[_id, name, publisher, release_date]];
	con.query(
		"INSERT INTO MediaProduct (m_id, mp_name,publisher,release_date) VALUES?",
		[values],
		(err, result) => {
			if (err) {
				res.send({
					code: 400,
					failed: "Failed to upload",
				});
			} else {
				con.query("INSERT INTO Movie (m_id, video_url) VALUES?", [
					[[_id, "not available"]],
				]);
				res.send({
					code: 200,
					success: "Upload Successfull",
				});
			}
		}
	);
});

app.post("/medias", (req, res) => {
	const { username } = req.body;
	con.query(
		"SELECT * FROM MediaProduct WHERE publisher=?",
		[username],
		(error, result) => {
			if (error) {
				console.log("error ", error);
				res.send({
					code: 400,
					failed: "Could not get published medias",
				});
			} else {
				console.log("published medias  ", result);
				res.send({
					code: 200,
					success: "fetched published medias",
					data: result,
				});
			}
		}
	);
});

let server = app.listen(5000, function () {
	console.log("Server is running..");
});
