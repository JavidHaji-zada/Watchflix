module.exports.SQL_STATEMENTS = [
	"CREATE TABLE IF NOT EXISTS User (username VARCHAR(16) UNIQUE NOT NULL, email	VARCHAR(60) NOT NULL, password VARCHAR(12) NOT NULL, fullname VARCHAR(40) NOT NULL, b_date DATE NOT NULL, PRIMARY KEY(username))",
	"CREATE TABLE IF NOT EXISTS CompanyUser(c_username VARCHAR(16) UNIQUE NOT NULL, email VARCHAR(60) NOT NULL, name VARCHAR(20), password VARCHAR(12) NOT NULL, PRIMARY KEY(c_username))",
	"CREATE TABLE IF NOT EXISTS Channel(username VARCHAR(16) NOT NULL, channel_id CHAR(12) UNIQUE NOT NULL, c_name VARCHAR(24) NOT NULL, PRIMARY KEY(channel_id), FOREIGN KEY (username) REFERENCES User (username)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS ChatGroup(group_id CHAR(12) UNIQUE NOT NULL, creatorName VARCHAR(16) NOT NULL, PRIMARY KEY(group_id), FOREIGN KEY (creatorName) REFERENCES User (username))",
	"CREATE TABLE IF NOT EXISTS ChatMessage(group_id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, message_id CHAR(12) UNIQUE NOT NULL, m_content VARCHAR(300) NOT NULL, PRIMARY KEY(message_id), FOREIGN KEY (group_id) REFERENCES ChatGroup (group_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS MediaProduct(m_id CHAR(12) UNIQUE NOT NULL, publisher VARCHAR(16) NOT NULL, release_date DATE NOT NULL, mp_name VARCHAR(168), PRIMARY KEY(m_id), FOREIGN KEY (publisher) REFERENCES CompanyUser (c_username)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS Comment( m_id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, comment_id CHAR(12) UNIQUE NOT NULL, replied_comment_id CHAR(12), comment_date DATE NOT NULL, c_content VARCHAR(500) NOT NULL, PRIMARY KEY(comment_id), FOREIGN KEY (username) REFERENCES User (username), FOREIGN KEY (m_id) REFERENCES MediaProduct(m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS Series(m_id CHAR(12) UNIQUE NOT NULL, episode_count INT NOT NULL, PRIMARY KEY(m_id), FOREIGN KEY (m_id) REFERENCES MediaProduct (m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS Episode(m_id CHAR(12) NOT NULL, season_number NUMERIC(4,0) NOT NULL, episode_number INT NOT NULL, episode_name VARCHAR(40) NOT NULL, video_url VARCHAR(256) NOT NULL, PRIMARY KEY(m_id, season_number, episode_number), FOREIGN KEY (m_id) REFERENCES MediaProduct (m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS Movie(m_id CHAR(12) UNIQUE NOT NULL, video_url VARCHAR(256) NOT NULL, PRIMARY KEY(m_id), FOREIGN KEY (m_id) REFERENCES MediaProduct (m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS Genre(g_name VARCHAR(20) UNIQUE NOT NULL, PRIMARY KEY(g_name))",
	"CREATE TABLE IF NOT EXISTS chat(m_id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, w_date DATE NOT NULL, progress TIME NOT NULL, watch_count INT NOT NULL, finished BOOLEAN NOT NULL, PRIMARY KEY( m_id, username), FOREIGN KEY (m_id) REFERENCES MediaProduct(m_id), FOREIGN KEY(username) REFERENCES User(username)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS prefers(g_name VARCHAR(20) NOT NULL, username VARCHAR(16) NOT NULL, PRIMARY KEY( g_name, username), FOREIGN KEY(g_name) REFERENCES Genre(g_name), FOREIGN KEY (username) REFERENCES User (username)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS like_dislike(m_id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, date DATE, response BIT, PRIMARY KEY( m_id, username), FOREIGN KEY(m_id) REFERENCES MediaProduct(m_id), FOREIGN KEY (username) REFERENCES User (username)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS friends(username1 VARCHAR(16) NOT NULL, username2 VARCHAR(16) NOT NULL, PRIMARY KEY ( username1, username2), FOREIGN KEY(username1) REFERENCES User(username), FOREIGN KEY (username2) REFERENCES User (username)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS memberOf(group_id CHAR(12) NOT NULL, username VARCHAR(16) NOT NULL, PRIMARY KEY( group_id, username), FOREIGN KEY(group_id) REFERENCES ChatGroup(group_id), FOREIGN KEY (username) REFERENCES User (username)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS belongTo(g_name VARCHAR(20) NOT NULL, m_id CHAR(12) NOT NULL, PRIMARY KEY( g_name, m_id), FOREIGN KEY(g_name) REFERENCES Genre(g_name), FOREIGN KEY(m_id) REFERENCES MediaProduct(m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS contain(channel_id CHAR(12) NOT NULL, m_id CHAR(12) NOT NULL, PRIMARY KEY( channel_id, m_id), FOREIGN KEY(channel_id) REFERENCES Channel(channel_id), FOREIGN KEY(m_id) REFERENCES MediaProduct(m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS rate(username VARCHAR(16) NOT NULL, m_id CHAR(12) NOT NULL, rated_score	Numeric(3,1) NOT NULL, PRIMARY KEY(m_id,username), FOREIGN KEY(username) REFERENCES User(username), FOREIGN KEY(m_id) REFERENCES MediaProduct(m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS watch(username VARCHAR(16) NOT NULL, m_id CHAR(12) NOT NULL, watch_date DATE NOT NULL, watch_count INT, PRIMARY KEY(m_id,username), FOREIGN KEY(username) REFERENCES User(username), FOREIGN KEY(m_id) REFERENCES MediaProduct(m_id)) ENGINE = InnoDB;",
	"CREATE TABLE IF NOT EXISTS friend(username1 VARCHAR(16) NOT NULL, username2 VARCHAR(16) NOT NULL, PRIMARY KEY (username1, username2), FOREIGN KEY(username1) REFERENCES User(username), FOREIGN KEY(username2) REFERENCES User(username)) ENGINE = Innodb;",
];
