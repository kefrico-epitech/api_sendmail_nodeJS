var noteModel = require("../model/noteModel.js");

/***
 * 
 * 
 * noteController.js
 * 
 * @description :: Server-side logic for managing 
 * 
 * 
 */

module.exports = {
  // GET
  list: (req, res) => {
    noteModel
      .find()
      .then(notes => res.status(200).json(notes))
      .catch(error => res.status(500).json({ error: error.message }));
  },

  // POST
  Add: (req, res) => {
    if (req.body.title) {
      const note = new noteModel({
        title: req.body.title
      });

      note.save();
      return res.status(201).json({
        title: req.body.title
      });
    } else {
      return res.status(404).send("title est vide!");
    }
  },

  // PUT
  Update: (req, res) => {
    const id = req.params.id;
    const title = req.body.title;

    if (id && title) {
      noteModel
        .findByIdAndUpdate(id, { title }, { new: true })
        .then(note => res.status(200).json(note))
        .catch(error =>
          res
            .status(500)
            .json({ message: "Paramètre incoreect", error: error.message })
        );
    } else {
      return res.status(404).send("title ou id est vide!");
    }
  },

  // DELETE
  Delete: (req, res) => {
     const id = req.params.id;
    
     if (id) {
       noteModel
         .findByIdAndDelete(id)
         .then(note => res.status(200).send('votre note a été supprimé'))
         .catch(error =>
           res
             .status(500)
             .json({
               message: "Paramètre incoreect",
               error: error.message
             })
         );
     } else {
       return res.status(404).send("id est vide!");
     }
  }
};
