var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var mongopassword = process.env.MONGOPASS;
let database = process.env.USEDB;
var mongodb = 'mongodb+srv://bwdb:'+ mongopassword +'@sandbox.o8c7z.mongodb.net/'+ database +'?retryWrites=true&w=majority';
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('err', console.error.bind(console, 'mongodb connection error'));

const PlayerModel = require('../models/PlayerModel');
const GameModel = require('../models/GameModel');
const TournamentModel = require('../models/TournamentModel');




router.get('/api/allplayers', function(req, res) {

  console.log("received allplayers request");
  PlayerModel.find({}, function (err, docs) {
    res.json(docs);
  });
});


//find single player
router.get('/api/player/:playername', function(req, res) {
  let playername = req.params.playername;
  console.log("received allplayers request");
  PlayerModel.findOne({name: playername}, function (err, docs) {
    console.log(err);
    res.json(docs);
  });
});


//find all games containing a player

//find single player
router.get('/api/gamewithplayer/:playername', function(req, res) {
  let playername = req.params.playername;
  console.log("received gamewithplayer request");
  GameModel.find({players: playername}, function (err, docs) {
    console.log(err);
    res.json(docs);
  });
});





router.get('/api/allgames', function(req, res){
  console.log('received allgame request');
  GameModel.find({}, function(err, docs){
    if(err){
      let thiserror = {
        error: true

      }
      res.json(thiserror)
    }
    else{

      res.json(docs);

    }
  })
});

router.get('/api/alltournaments', function(req, res){
  console.log('received alltournaments request');
  TournamentModel.find({}, function(err, docs){
    res.json(docs);
  })
});



/* GET home page. */
router.get('*', function(req, res) {

  console.log("received *");
  
  let pathstring = (path.join(__dirname, '../client/build/index.html' ));
  console.log(pathstring);
  res.sendFile(pathstring);
});

module.exports = router;
