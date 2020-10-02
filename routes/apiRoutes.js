const path = require("path");
const fs = require("fs");

module.exports = function (app) {
  // retrieves data from json file
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

  // posts new data to json
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

        // adds incremental id to request object
        if (updateData.length > 0) {
          req.body.id = updateData[updateData.length - 1].id + 1;
        } else {
          req.body.id = 1;
        }

        updateData.push(req.body);
        fs.writeFile(
          path.join(__dirname, "../db/db.json"),
          JSON.stringify(updateData, null, 2),
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

  // deletes item of specific id
  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf-8", (err, data) => {
      if (err) {
        return res.status(500).json({
          error: true,
          data: null,
          message: "unable to retrieve notes.",
        });
      }
      // removes selected if from db and reorders index
      let id = parseInt(req.params.id);
      const noteData = JSON.parse(data);
      const afterDelete = [];
      let newId = 0;
      for (note of noteData) {
        if (id !== note.id) {
          newId++;
          note.id = newId;
          afterDelete.push(note);
        }
      }
      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(afterDelete, null, 2),
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
            data: afterDelete,
            message: "information returned",
          });
        }
      );
    });
  });
};
