const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}
const reqNumber = {
    type: String,
    required: true
}

const profileSchema = mongoose.Schema({
    guildID: reqString,
    userID: reqString,
    wallet: reqNumber,
    bank: reqNumber,
});

module.exports = mongoose.model('Economy', profileSchema);