const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GameSchema = new Schema({
    'players': {type: Array},
    'winner': {type: Array},
    'tournament': String,
    'matchup': String,
    'youtubelink': String,
    'date': String,
    'gamenum': Number,
    'map': String,
    'scraces': {type: Array}

    
    }
);

let GameModel = mongoose.model('game', GameSchema);
module.exports = GameModel;