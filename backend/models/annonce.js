// import mongoose
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
// schema (attributes + types)
const annonceSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    qty: Number,
    category: String,
    status: { type: String, default: "Not Confirmed" },
    avatar: String,
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
// Apply the uniqueValidator plugin to annonceSchema.
annonceSchema.plugin(uniqueValidator);
// model name Schema
const annonce = mongoose.model("Annonce", annonceSchema);
// make annonce importable in other places
module.exports = annonce;