var express = require('express');
var router = express.Router();
var path = require('path');

var mongoose = require('mongoose');
var mongopassword = process.env.MONGOPASS;
var mongouser = process.env.MONGOUSER
let database = process.env.USEDB;
let masterApiKey = process.env.APIKEY
var mongodb = 'mongodb+srv://'+ mongouser + ':'+ mongopassword +'@sandbox.o8c7z.mongodb.net/'+ database +'?retryWrites=true&w=majority';
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('err', console.error.bind(console, 'mongodb connection error'));

const PlayerModel = require('../models/PlayerModel');
const GameModel = require('../models/GameModel');
const TournamentModel = require('../models/TournamentModel');
const res = require('express/lib/response');
const MapModel = require('../models/MapModel');
const { send, sendStatus } = require('express/lib/response');




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

router.get('/api/allmaps', function(req, res){
  console.log('received allmap request');
  MapModel.find({}, function(err, docs){
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


router.get('/api/getmap/:map', function(req, res){
  console.log('received allmap request');
  let map = req.params.map;

  MapModel.findOne({name: map}, function(err, docs){
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

router.get('/api/gameswithmap/:map', function(req, res) {
  let map = req.params.map;
  console.log("received gameswithmap request");
  GameModel.find({map: map}, function (err, docs) {
    if(err){
      console.log(err);

    }
    res.json(docs);
  });
});



router.get('/api/getallgamesintournament/:tournament', function(req, res){
  console.log('received allgamesintournament request');
  let tournament = req.params.tournament
  GameModel.find({tournament: tournament}, function(err, docs){
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


router.get('/api/getonetournament/:name', function(req, res){
  console.log('received get tournament request');
  let tournament = req.params.name;
  TournamentModel.findOne({name: tournament}, function(err, docs){
    res.json(docs);
  })
});


router.get('/api/updateElo/:apikey', function(req, res){

  console.log("received update Elo request");
  
  let apikey = req.params.apikey;
  if (apikey == masterApiKey){


  //the second time the calculation is done backwards to make sure there was already a set elo for every player
  updateEloInOrder();

  res.sendStatus(200);
  }
  else{
    res.sendStatus(403);
  }

  
  
});

router.get('/api/updatemaps/:apikey', function(req, res){

  console.log("received update map request");
  
  let apikey = req.params.apikey;
  if (apikey == masterApiKey){

  //the second time the calculation is done backwards to make sure there was already a set elo for every player
  updateMapData();

  res.sendStatus(200);
  }
  else{
    res.sendStatus(403);
  }

  
  
});

router.get('/api/resetElo/:apikey', function(req, res){

  console.log("received reset Elo request");
  
  let apikey = req.params.apikey;
  if (apikey == masterApiKey){

  resetElo();
  res.sendStatus(200);

  }

  else{
    res.sendStatus(403);
  }
  
  
});

async function getAllPlayers(){
  let query = await PlayerModel.find({});
 
  return query;

}

async function getAllGames(){
  let query = await GameModel.find({});
 
  return query;

}

async function getAllMaps(){
  
    let query = await MapModel.find({});
   
    return query;
  
  
}

async function resetElo(){

  console.log('reseting player elo to 1500')
  let playerList = await getAllPlayers();

  for (let i = 0; i < playerList.length; i++){
    
  PlayerModel.findOne({name: playerList[i].name}, function (err, docs) {
    if(err){
      console.log(err);
      sendStatus(403)

    }
    else{
    docs.elo = 1500;
    docs.save();
    }
  });
  }

}



async function updateElo(reverse){

  let playerList = await getAllPlayers();
  console.log(playerList);
  let gameList = await getAllGames();

  
  gameList.sort(function(a, b) {
    let dateA = a.date; // ignore upper and lowercase
    let dateB = b.date; // ignore upper and lowercase

    console.log("dates" + dateA + ' ' + dateB);

    

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });

  

  if (reverse == true){
    playerList.reverse();
    
  }
  
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



        //I want to add slightly more points for winning a game due to low total game counts for some players
        let bonus = 0;
        if (result == 1){
          bonus = 3;

        }

        console.log('Opponent is' + opponent);

       let opponentData = playerList.find(({name}) => name ===opponent );

       let opponentElo = opponentData.elo;
       console.log(opponentElo);

       let eloWinChance = 1 / (1 + Math.pow(10, (opponentElo - playerElo)/400));
       console.log(eloWinChance);
       let eloresultandchance = result - eloWinChance
       eloresultandchance = eloresultandchance * 40;
       console.log(eloresultandchance);
       playerElo = playerElo + eloresultandchance + bonus;
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


async function updateEloInOrder(){

  let playerList = await getAllPlayers();
  console.log(playerList);
  let gameList = await getAllGames();

  
  gameList.sort(function(a, b) {
    let dateA = a.date; // ignore upper and lowercase
    let dateB = b.date; // ignore upper and lowercase

    

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });

  

  for (let i = 0; i < gameList.length; i++){

    let winnerProfile = playerList.find(({ name }) => name == gameList[i].winner[0] );

    let loser;

    if (gameList[i].players[0] == winnerProfile.name){
      loser = gameList[i].players[1]
    }
    else{
      loser = gameList[i].players[0]
    }


    console.log('gamenum ' + gameList[i].gamenum);
    console.log(`winner ${gameList[i].winner[0]}  loser ${loser}`);

    loserProfile = playerList.find(({ name }) => name == loser);
    // calculate elo
    let newWinnerElo = eloCalculate(winnerProfile.elo, loserProfile.elo, 1);
    let newLoserElo = eloCalculate(loserProfile.elo, winnerProfile.elo, 0);

    winnerProfile.elo = newWinnerElo;
    loserProfile.elo = newLoserElo;
    

  }

  for (let i = 0; i < playerList.length; i++){

    PlayerModel.findOne({name: playerList[i].name}, function (err, docs) {
      if(err){
        console.log(err);
  
      }
      docs.elo = playerList[i].elo;
      docs.save();
    });


  }
}

function eloCalculate(playerElo, opponentElo, result){

 
  //result should be 1 for a win, 0 for a loss;

  console.log(`starting elo winner ${playerElo} loser ${opponentElo}`)

  let eloWinChance = 1 / (1 + Math.pow(10, (opponentElo - playerElo)/400));
       console.log(eloWinChance);
       let eloresultandchance = result - eloWinChance
       eloresultandchance = eloresultandchance * 40;
       console.log(eloresultandchance);
       playerElo = playerElo + eloresultandchance;
       playerElo = Math.round(playerElo);
       return playerElo;

}

async function updateMapData(){
  
  let mapList = await getAllMaps();
  let gameData = await getAllGames();


  //first reset maps played to zero
  for (let i = 0; i < mapList.length; i++){
    mapList[i].gamesPlayed = 0;
  }

  for (let i = 0; i < gameData.length; i++){
    let mapName = gameData[i].map;
    console.log(mapName);

    let mapdata = mapList.find(({ name }) => name == mapName);
    mapdata.gamesPlayed = mapdata.gamesPlayed + 1;
  }

  for (let i = 0; i < mapList.length; i++){

    MapModel.findOne({name: mapList[i].name}, function (err, docs) {
      if(err){
        console.log(err);
  
      }
      else{
      docs.gamesPlayed = mapList[i].gamesPlayed;
      docs.save();
      }
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
