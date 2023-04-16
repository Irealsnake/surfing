const express = require("express");
const router = express.Router();
const db = require("../db/index"); // 데이터베이스 연결 가져오기

router.get("/", (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      res.status(400).json({ message: "Error fetching posts" });
    } else {
      res.json(rows);
    }
  });
});

router.post("/", (req, res) => {
    const { title, content, category, spot_id } = req.body;
    const author = req.session.user.nickname; // 세션에서 사용자 닉네임 가져오기
    const sql = `INSERT INTO posts (author, title, content, category, spot_id) VALUES (?, ?, ?, ?, ?)`;
  
    db.run(sql, [author, title, content, category, spot_id || null], function (err) {
      if (err) {  
        console.error("Database error:", err.message);
        res.status(400).json({ message: "Error creating post" });
      } else {
        const newPost = {
          id: this.lastID,
          author,
          title,
          content,
          category,
          spot_id: spot_id || null,
        };
        res.status(201).json(newPost);
      }
    });
  });

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(400).json({ message: "Error fetching post" });
    } else {
      if (row) {
        res.json(row);
      } else {
        res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
      }
    }
  });
});


module.exports = router;
