const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
    'name': String,
    'dob': String,
    'scrace': String,
    'elo': Number,
    'vZ': Number,
    'vT': Number,
    'vP': Number
    }
);

let PlayerModel = mongoose.model('player', PlayerSchema);
module.exports = PlayerModel;