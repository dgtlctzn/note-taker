const path = require("path");
const fs = require("fs");

module.exports = function (app) {

  app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, jsonData) => {
      if (err) {
        return res.status(500).json({
          error: true,
          data: null,
          message: "unable to find info",
        });
      }
      res.json({
        error: false,
        data: JSON.parse(jsonData),
        message: "information returned",
      });
    });
  });
};
