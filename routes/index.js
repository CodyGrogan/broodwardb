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
const res = require('express/lib/response');




router.get('/api/allplayers', function(req, res) {

  console.log("received allplayers request");
  PlayerModel.find({}, function (err, docs) {
    res.json(docs);
  });
});


//find single player
router.get('/api/player/:playername', function(req, res) {
  let playername = req.params.playername;
  console.log("received single player request");
  PlayerModel.findOne({name: playername}, function (err, docs) {
    if(err){
      console.log(err);

    }
    res.json(docs);
  });
});


//find all games containing a player

//find single player
router.get('/api/gamewithplayer/:playername', function(req, res) {
  let playername = req.params.playername;
  console.log("received gamewithplayer request");
  GameModel.find({players: playername}, function (err, docs) {
    if(err){
      console.log(err);

    }
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

router.get('/api/getgame/:tournament/:gamenum', function(req, res){
  console.log('received getgame request');
  let tournament = req.params.tournament;
  let gamenum = req.params.gamenum;
  //thisrequires both the tournamentname and the game number as parameters
  GameModel.find({tournament: tournament, gamenum: gamenum}, function(err, docs){
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


router.get('/api/updateElo', function(req, ){

  console.log("received update Elo request");
  
  updateElo();
  
  
});

async function getAllPlayers(){
  let query = await PlayerModel.find({});
 
  return query;

}

async function getAllGames(){
  let query = await GameModel.find({});
 
  return query;

}

async function updateElo(){

  let playerList = await getAllPlayers();
  console.log(playerList);
  let gameList = await getAllGames();
  
  for (let i = 0; i < playerList.length; i++){
    let playerName = playerList[i].name;
    let playerElo = playerList[i].elo;
    for (let j = 0; j < gameList.length; j++){

      if (gameList[j].players[0] == playerName || gameList[j].players[1] == playerName){
        
        
        let opponent;
        let result = 0;
        if (gameList[j].players[0] == playerName){
          opponent = gameList[j].players[1]
        }
        else{
          opponent = gameList[j].players[0]
        }

        if (gameList[j].winner[0] == playerName){
          result = 1;
        }

       let opponentData = playerList.find(({name}) => name ===opponent );

       let opponentElo = opponentData.elo;
       console.log(opponentElo);

       let eloWinChance = 1 / (1 + Math.pow(10, (opponentElo - playerElo)/400));
       console.log(eloWinChance);
       let eloresultandchance = result - eloWinChance
       eloresultandchance = eloresultandchance * 16;
       console.log(eloresultandchance);
       playerElo = playerElo + eloresultandchance
       playerElo = Math.round(playerElo);
       console.log(playerName + ' ' + playerElo);
       playerList[i].elo = playerElo;


       




      }

      

    }
      
       PlayerModel.findOne({name: playerName}, function (err, docs) {
        if(err){
          console.log(err);
    
        }
        docs.elo = playerElo;
        docs.save();
      });
      

   
  }



}


/* GET home page. */
router.get('*', function(req, res) {

  console.log("received *");
  
  let pathstring = (path.join(__dirname, '../client/build/index.html' ));
  console.log(pathstring);
  res.sendFile(pathstring);
});

module.exports = router;
