const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MapSchema = new Schema({
    'name': String,
    'maxPlayers': Number,
    'gamesPlayed': Number
    }
);

let MapModel = mongoose.model('map', MapSchema);
module.exports = MapModel;