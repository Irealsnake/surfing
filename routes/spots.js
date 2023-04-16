const express = require("express");
const router = express.Router();
const db = require("../db/index");

//스팟 추가 입력받고 처리
router.post("/", (req, res) => {
  const { name, description } = req.body;
  db.run(
    "INSERT INTO spots (name, description) VALUES (?, ?)",
    [name, description],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(400).send("Error creating spot");
      } else {
        res.status(201).send("Spot created");
      }
    }
  );
});

// 스팟 목록 얻기
router.get("/", (req, res) => {
  db.all("SELECT * FROM spots", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).send("Error fetching spots");
    } else {
      res.json(rows);
    }
  });
});

//스팟 이름 얻기
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.incrementSpotView(id, (err) => {
    if (err) console.error(err.message);
  });
  db.get(
    "SELECT * FROM spots WHERE id = ?",
    [id],
    (err, row) => {
      if (err) {
        console.error(err.message);
        res.status(400).send("Error fetching spot");
      } else {
        if (row) {
          console.log("Fetched spot:", row);
          res.json(row);
        } else {
          res.status(404).send("Spot not found");
        }
      }
    }
  );
});

//인기 서핑스팟 조회
router.get("/popular/:limit", (req, res) => {
  const { limit } = req.params;
  db.getPopularSpots(limit, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(400).send("Error fetching popular spots");
    } else {
      res.json(rows);
    }
  });
});


module.exports = router;
