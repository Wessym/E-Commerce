// import mongoose
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
// schema (attributes + types)
const commandeSchema = mongoose.Schema({
    idUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    idAnnonce: { type: mongoose.Schema.Types.ObjectId, ref: "Annonce" },
    status: { type: String, default: "Not Confirmed" },
});
// Apply the uniqueValidator plugin to commandeSchema.
commandeSchema.plugin(uniqueValidator);
// model name Schema
const commande = mongoose.model("Commande", commandeSchema);
// make commande importable in other places
module.exports = commande;