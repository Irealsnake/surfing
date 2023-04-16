
const sqlite3 = require("sqlite3").verbose();
// 데이터베이스 연결 및 초기화
let db = new sqlite3.Database("surfingCommunity.db", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the database.");
      db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, email TEXT UNIQUE, nickname TEXT UNIQUE)",
        (err) => {
          if (err) console.error(err.message);
        }
      );
    }
  });
  //스팟 추가 db 설정
  db.run(
    "CREATE TABLE IF NOT EXISTS spots (id INTEGER PRIMARY KEY, name TEXT, description TEXT)",
    (err) => {
      if (err) console.error(err.message);
    }
  );

  //게시물 추가 db 설정
  db.run(
    `CREATE TABLE IF NOT EXISTS posts 
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    spot_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (spot_id) REFERENCES spots (id))`,
    (err) => {
      if (err) console.error(err.message);
    }
  );
  
//스팟 조회수 db 설정
  db.run(
    `CREATE TABLE IF NOT EXISTS spot_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      spot_id INTEGER NOT NULL,
      views INTEGER DEFAULT 0,
      FOREIGN KEY (spot_id) REFERENCES spots (id)
    )`,
    (err) => {
      if (err) console.error(err.message);
    }
  );
  
  //스팟 조회수 증가시키는 함수
  function incrementSpotView(spot_id, callback) {
  db.get("SELECT * FROM spot_views WHERE spot_id = ?", [spot_id], (err, row) => {
    if (err) {
      callback(err);
    } else {
      if (row) {
        db.run("UPDATE spot_views SET views = views + 1 WHERE spot_id = ?", [spot_id], callback);
      } else {
        db.run("INSERT INTO spot_views (spot_id, views) VALUES (?, 1)", [spot_id], callback);
      }
    }
  });
}

  //인기 서핑 스팟 가져오는 함수
  function getPopularSpots(limit, callback) {
    db.all(
      `SELECT spots.*, spot_views.views
      FROM spots
      JOIN spot_views ON spots.id = spot_views.spot_id
      ORDER BY spot_views.views DESC
      LIMIT ?`,
      [limit],
      callback
    );
  }

  module.exports = {
    getPopularSpots,
    incrementSpotView,
    run: db.run.bind(db),
    get: db.get.bind(db),
    all: db.all.bind(db)
  };
  
