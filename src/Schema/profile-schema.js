const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}
const reqNumber = {
    type: Number,
    required: true
}

const profileSchema = mongoose.Schema({
    userID: reqString,
    username: reqString,
    wallet: reqNumber,
    bank: reqNumber,
}, { versionKey: false});

module.exports = mongoose.model('Economy', profileSchema);