const express = require("express");
const db = require("../db/index");

const usersRouter = express.Router();

usersRouter.post("/signup", (req, res) => {
  const { username, password, email, nickname } = req.body;
  db.run(
    "INSERT INTO users (username, password, email, nickname) VALUES (?, ?, ?, ?)",
    [username, password, email, nickname],
    (err) => {
      if (err) {
        console.error('Error creating user:', err.message);
        res.status(400).send("Error creating user");
      } else {
        res.redirect("/");
      }
    }
  );
});

usersRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(400).send("Error logging in");
      } else {
      if (row) {
        req.session.user = {
          id: row.id,
          username: row.username,
          email: row.email,
          nickname: row.nickname
        };
        res.status(200).send("OK");
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
    }
  );
});

usersRouter.get("/logout", (req, res) => {
  req.session.destroy(); // 세션에서 사용자 정보를 제거
  res.redirect("/");
});

usersRouter.get("/current-user", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("Not logged in");
  }
});

module.exports = usersRouter;
