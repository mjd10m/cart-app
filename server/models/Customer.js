const { Schema, model, SchemaTypes } = require('mongoose');

const customerSchema = new Schema(
    {
        transactionId: {
            type: String,
            required: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        dob: {
            type: Date,
            required: true,
            trim: true
        },
        addr1: {
            type: String,
            required: true,
            trim: true
        },
        addr2: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        zip: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        cartSize: {
            type: String,
            required: true,
            trim: true
        },
        cartColor: {
            type: String,
            required: true,
            trim: true
        },
        plate: {
            type: String,
            required: true,
            trim: true
        },
        plateNum: {
            type: String,
            trim: true
        },
        plateType: {
            type: String,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
        }
    }
);

customerSchema.virtual('files', {
    ref: 'File',              
    localField: 'transactionId', 
    foreignField: 'transactionId' 
});

customerSchema.set("toObject", { virtuals: true });
customerSchema.set("toJSON", { virtuals: true });

const Customer = model('Customer', customerSchema)

module.exports = Customer