const path = require("path");
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    fs.readFile(
      path.join(__dirname, "../db/db.json"),
      "utf-8",
      (err, jsonData) => {
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
      }
    );
  });

  app.post("/api/notes", (req, res) => {
    fs.readFile(
      path.join(__dirname, "../db/db.json"),
      "utf-8",
      (err, jsonData) => {
        if (err) {
          return res.status(500).json({
            error: true,
            data: null,
            message: "unable to retrieve notes.",
          });
        }
        const updateData = JSON.parse(jsonData);
        updateData.push(req.body);
        fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          JSON.stringify(updateData),
          (err) => {
            if (err) {
              return res.status(400).json({
                error: true,
                data: null,
                message: "unable to write to file",
              });
            }
            res.json({
              error: false,
              data: updateData,
              message: "information returned",
            });
          }
        );
      }
    );
  });
};
