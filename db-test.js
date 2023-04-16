const db = require("./db/index");

function fetchSpotViews() {
  db.all("SELECT * FROM spot_views", [], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("spot_views table content:");
      console.table(rows);
    }
  });
}

fetchSpotViews();
