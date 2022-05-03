const epr = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readAndAppend,
  readFromFile,
  readAndDelete,
  searchNote,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the note
epr.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

epr.get("/:id", (req, res) =>
  searchNote("./db/db.json").then((data) => res.json(data))
);

epr.delete("/:id", (req, res) =>
{
  readAndDelete(req.params.id, "./db/db.json");
  const response = {
    status: "success",
    body: "Successfully Delete!",
  };

  res.json(response);
}
 
);

// POST Route for submitting note
epr.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newnote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newnote, "./db/db.json");

    const response = {
      status: "success",
      body: newnote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

module.exports = epr;
