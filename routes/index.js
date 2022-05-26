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




router.get('/api/allplayers', function(req, res) {

  console.log("received allplayers request");
  PlayerModel.find({}, function (err, docs) {
    console.log(docs);
  });
  res.sendStatus(200);
});

/* GET home page. */
router.get('*', function(req, res) {

  console.log("received *");
  
  let pathstring = (path.join(__dirname, '../client/build/index.html' ));
  console.log(pathstring);
  res.sendFile(pathstring);
});

module.exports = router;
