// import mongoose
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
// schema (attributes + types)
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    pwd: String,
    tel: Number,
    adresse: String,
    role: {type: String, default:"user"},
    avatar: String,
    });
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);
// model name Schema
const user = mongoose.model("User", userSchema);
// make user importable in other places
module.exports = user;