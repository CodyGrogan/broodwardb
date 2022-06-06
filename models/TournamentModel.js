const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TournamentSchema = new Schema({
    'name': String,
    'players': {type: Array},
    'startDate': String,
    'endDate': String,
    'top4': {type: Array},
    'winnerrace': String
    }
);

let TournamentModel = mongoose.model('tournament', TournamentSchema);
module.exports = TournamentModel;