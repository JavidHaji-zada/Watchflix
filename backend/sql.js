export const SQL_STATEMENTS = [
	"CREATE TABLE User (username VARCHAR(16) UNIQUE NOT NULL, email	VARCHAR(60) NOT NULL, password VARCHAR(12) NOT NULL, fullname VARCHAR(40) NOT NULL, b-date DATE NOT NULL, PRIMARY KEY(username))",
	"CREATE TABLE CompanyUser(c-username VARCHAR(16) UNIQUE NOT NULL, email VARCHAR(60) NOT NULL, password VARCHAR(12) NOT NULL, PRIMARY KEY(c-username))",
	"CREATE TABLE Channel(username VARCHAR(16) NOT NULL, channel-id	CHAR(12) UNIQUE NOT NULL, c-name VARCHAR(24) NOT NULL, PRIMARY KEY(channel-id) FOREIGN KEY (username) references User (username)) ENGINE = InnoDB;",
	"CREATE TABLE ChatMessage(group-id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, message-id	CHAR(12) UNIQUE NOT NULL, m-content	VARCHAR(300) NOT NULL, PRIMARY KEY(message-id) FOREIGN KEY (group-id) REFERENCES GroupChat (group-id)) ENGINE = InnoDB;",
	"CREATE TABLE ChatGroup(group-id CHAR(12) UNIQUE NOT NULL, creatorName VARCHAR(16) NOT NULL, PRIMARY KEY(group-id) FOREIGN KEY (createrName) REFERENCES User (username))",
	"CREATE TABLE Comment( m-id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, comment-id CHAR(12) UNIQUE NOT NULL, replied-comment-id CHAR(12), comment-date DATE NOT NULL, c-content VARCHAR(500) NOT NULL, PRIMARY KEY(comment-id), FOREIGN KEY (username) references User (username), FOREIGN KEY (m-id) references MediaProduct(m-id)) ENGINE = InnoDB;",
	"CREATE TABLE MediaProduct(m-id CHAR(12) UNIQUE NOT NULL, publisher VARCHAR(16), release_date DATE NOT NULL, mp-name VARCHAR(168) PRIMARY KEY(m-id) FOREIGN KEY(publisher) REFERENCES CompanyUser(c-username)) ENGINE = InnoDB;",
	"CREATE TABLE Series(m-id CHAR(12) UNIQUE NOT NULL, episode_count INT NOT NULL, PRIMARY KEY(m-id) FOREIGN KEY (m-id) references MediaProducts (m-id)) ENGINE = InnoDB;",
	"CREATE TABLE Episode(m-id CHAR(12) NOT NULL, season_number NUMERIC(4,0) NOT NULL, episode_number INT NOT NULL, episode_name VARCHAR(40) NOT NULL, video_url VARCHAR(256) NOT NULL, PRIMARY KEY(m-id, season_number, episode_number) FOREIGN KEY (m-id) references MediaProducts (m-id)) ENGINE = InnoDB;",
	"CREATE TABLE Movie(m-id CHAR(12) UNIQUE NOT NULL, video-url VARCHAR(256) NOT NULL, PRIMARY KEY(m-id) FOREIGN KEY (m-id) references MediaProducts (m-id)) ENGINE = InnoDB;",
	"CREATE TABLE Genre(g-name VARCHAR(20) UNIQUE NOT NULL, PRIMARY KEY(g-name))",
	"CREATE TABLE chat(m-id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, w-date DATE NOT NULL, progress TIME NOT NULL watch-count INT NOT NULL finished BOOLEAN NOT NULL PRIMARY KEY( m-id, username), FOREIGN KEY(m-id) REFERENCES MediaProduct(m-id), FOREIGN KEY(username) REFERENCES User(username)) ENGINE = InnoDB;",
	"CREATE TABLE prefers(g-name VARCHAR(20) NOT NULL, username VARCHAR(16) NOT NULL, PRIMARY KEY( g-name, username), FOREIGN KEY(g-name) REFERENCES Genre(g-name), FOREIGN KEY(username) REFERENCES User(username)) ENGINE = InnoDB;",
	"CREATE TABLE like-dislike(m-id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, date DATE, response BIT, PRIMARY KEY( m-id, username), FOREIGN KEY(m-id) REFERENCES MediaProduct(m-id), FOREIGN KEY(username) REFERENCES User(username)) ENGINE = InnoDB;",
	"CREATE TABLE friends(username1 VARCHAR(16) NOT NULL, username2 VARCHAR(16) NOT NULL, PRIMARY KEY( username1, username2), FOREIGN KEY(username1) REFERENCES User(username) FOREIGN KEY(username2) REFERENCES User(username)) ENGINE = InnoDB;",
	"CREATE TABLE memberOf(group-id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, PRIMARY KEY( group-id, username), FOREIGN KEY(group-id) REFERENCES Group(group-id), FOREIGN KEY(username) REFERENCES User(username)) ENGINE = InnoDB;",
	"CREATE TABLE belongTo(g-name VARCHAR(20) NOT NULL, m-id CHAR(12) NOT NULL, PRIMARY KEY( g-name, m-id), FOREIGN KEY(g-name) REFERENCES Genre(g-name), FOREIGN KEY(m-id) REFERENCES MediaProduct(m-id)) ENGINE = InnoDB;",
	"CREATE TABLE contain(channel-id CHAR(12) NOT NULL, m-id CHAR(12) NOT NULL, PRIMARY KEY( channel-id, m-id), FOREIGN KEY(channel-id) REFERENCES Genre(channel-id), FOREIGN KEY(m-id) REFERENCES MediaProduct(m-id)) ENGINE = InnoDB;",
	"CREATE TABLE rate(username VARCHAR(16) NOT NULL, m-id CHAR(12) NOT NULL, rated-score	Numeric(3,1) NOT NULL PRIMARY KEY(m-id,username), FOREIGN KEY(username) REFERENCES User(username), FOREIGN KEY(m-id) REFERENCES MediaProduct(m-id)) ENGINE = InnoDB;"
];

