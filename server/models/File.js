const { Schema, model, SchemaTypes } = require('mongoose');

const fileSchema = new Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
            required: true,
        },
        encoding: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        transactionId: {
            type: String,
            trim: true
        }
    }
);

const File = model('File', fileSchema)

module.exports = File