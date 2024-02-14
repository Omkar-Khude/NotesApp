const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

// get api to fetch all notes of the user         login required
router.get("/fetchAllNotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// post api to add new note              login required
router.post(
  "/addNotes",
  fetchuser,
  [
    body("title", "title should be atleast 3 characters!").isLength({ min: 3 }),
    body("description", "description should be atleast 5 characters!").isLength(
      { min: 5 }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // logic to add new note
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// put api to update the notes                        login required
router.put("/updateNotes/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // logic to create new notes object
    const newNotes = {};
    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }

    // Find the note to be updated by noteId
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not Found");
    }

    // logic to check the valid user is updating the note
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // logic to update the note
    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );
    res.json({ notes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// delete api to delete the notes                        login required
router.delete("/deleteNotes/:id", fetchuser, async (req, res) => {
  try {

    // Find the note to be updated by noteId
    let notes = await Notes.findById(req.params.id);
    if (!notes) {
      return res.status(404).send("Not Found");
    }

    // logic to check the valid user is updating the note
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // logic to delete the note
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success": "Successfuly deleted the note",note: notes});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
