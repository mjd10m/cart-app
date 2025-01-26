const { Schema, model, SchemaTypes } = require('mongoose');

const noteSchema = new Schema (
  {
    transactionId: {
      type: String,
      required: true,
    },
    noteText: {
      type: String,
      required: true,
    }
  }
)

const Note = model('Note', noteSchema)

module.exports = Note