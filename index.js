var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var NBAcolor = require('nba-color')
var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
var Player = require('./models/Player');

// Connect to MongoDB
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

 //******************* */
 //   2 MODULES
 //******************* */
var alphabeticalSorter = require("./alphabeticalSorter")
var tallestSorter = require("./tallestSorter")

var app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));
const multer = require('multer'); // use for saving images
var upload = multer({ dest: 'public' }) // this is where each image will be stored


// My Variables
var fs = require('fs');
var dataUtil = require("./data-util");
var _DATA = dataUtil.loadData().players;
var handlebars = exphbs.handlebars;
var _ = require("underscore");
const { parse } = require('querystring');
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 //******************* */
 // RENDERS HOME PAGE
 //******************* */
app.get('/',function(req,res){
  Player.find({}, function(err,players) {
    if (err) throw err;
    res.render('home', {
      data: players
    })
  })
})

app.get('/about',function(req,res){
    res.render('about')
})

//**************** */
// API GET REQUEST
//**************** */
app.get('/api/getPlayers',function(req,res){
  Player.find({},function(err, players){
    if(err) throw err
    res.send(players)
  })
})

/***************************** */
// RENDER ADD PLAYER HTML FORM
//**************************** */
app.get("/addPlayer", function(req, res) {
  res.render('add');
});

//************************* */
// ADD PLAYER VIA HTML FORM
//************************* */
app.post('/addPlayer',upload.single('image'), function(req, res) {
  if(!req.body) { return res.send("No data recieved"); }
  var body = req.body;
    // console.log(body)
   // console.log(req.file.filename)

    if(req.file) body.image = req.file.filename; // add hex representing image name
    // console.log(body.team);
    body.team = NBAcolor.getMainColor(body.team + ""); //get teams color
    // console.log(body.team);

    // Transform teams
  body.teams = body.teams.split(" ");

  // Save new player
  // _DATA.push(req.body);
  // dataUtil.saveData(_DATA);
  console.log(req.body);
  var teamInfo = {
    name: req.body.teamname,
    city: req.body.teamcity,
    color: req.body.team
  }

  var statInfo = {
    playerName: req.body.name,
    ppg: req.body.ppg,
    rpg: req.body.rpg,
    apg: req.body.apg
  }

  var player = new Player({
    name: req.body.name,
    age: parseInt(req.body.age),
    currTeam: teamInfo,
    stats: statInfo,
    teams: req.body.teams,
    championships: parseInt(req.body.chmps),
    retired: req.body.retired,
    height: req.body.height,
    position: req.body.position,
    weight: req.body.weight,
    img: req.body.img

  });

  player.save(function(err) {
    if(err) throw err
});

  res.redirect("/");
});

//******************************* */
// ADD PLAYER VIA REQUEST MODULE
//******************************** */
app.post('/api/addPlayer', function(req, res) {
  if(!req.body) { 
    return res.send("No data recieved"); 
  }
  var body = req.body;
    var index = 0;
    var arrPos = "teams[" + index + "]";
    var teams = [];
  // Transform teams
  while(body[arrPos]) {
    teams.push(body[arrPos]);
    index++;
    arrPos = "teams[" + index + "]";
  }

  var jsonObj = {
    "name": body.name,
    "age": body.age,
    "teams": teams,
    "championships": body.championships,
    "retired": body.retired,
    "height": body.championships,
    "position": body.position,
    "weight": body.weight,
    "img": body.img
  };

  // // Save new player
   _DATA.push(jsonObj);
  dataUtil.saveData(_DATA);

  res.redirect("/");
});

//************************************* */
// GET A PLAYER WITH NAME AS PARAMETER
// ************************************ */
app.get("/api/getPlayer/:player_name", function(req, res) {
  
 Player.findOne({name: req.params.player_name}, function(err,player){
    if (err) throw err;
  
    res.render('player',{
      data: player
    });
  });
});


app.get("/teams", function(req, res) {
  // res.render('teams',{
  //   data: _DATA
  // });

  Player.find({},function(err, players){
    if(err) throw err
    res.render('teams',{
      data: players
    });
  })
});

app.post("/teams", function(req, res) {
  var input = req.body.teamName;
  var players = [];
  
  // _.each(_DATA, function(value) {
  //   if(value.teams.includes(input)) {
  //       players.push(value);
  //   }
  // })

  Player.find({teams:input},function(err, players){
    if(err) throw err
    res.render('teamSearch',{
      data: players,
      input: input
    });
  })

});

app.get("/oldest", function(req, res) {
  res.render('oldest');
});

app.post("/oldest", function(req, res) {
  var oldest = [];
  var oldestAge = parseInt(req.body.oldest);
  
  // _.each(_DATA, function(value) {
  //   if(value.age > oldestAge) {
  //     oldest.push({"name":value.name,"age":value.age,"img":value.img});
  //   }
  // })

  Player.find({age: {$gt: oldestAge}},function(err, players){
    if(err) throw err
    res.render('filterAge',{
      data: players,
      input: oldestAge
    });
  })

  // res.render('filterAge',{
  //   data: oldest,
  //   input: oldestAge
  // });
});

app.get("/tallest", function(req, res) {
  res.render('tallest');
});

app.post("/tallest", function(req, res) {
  var tallest = [];
  var tallestFeet = req.body.feet;
  var tallestInches = req.body.inches;

  // tallest = tallestSorter(_DATA, tallestFeet, tallestInches)

  Player.find({},function(err, players){
    if(err) throw err
    tallest = tallestSorter(players, tallestFeet, tallestInches);
    var send = tallestFeet + "'" + tallestInches + "\"";
    res.render('filterTallest',{
      data: tallest,
      input: send
    });
  })
  
});

app.get("/alphabetical", function(req, res) {
  var arr = [];

  // _.each(_DATA, function(value) {
  //   arr.push({"name":value.name,"img":value.img});
  // })

  Player.find({},function(err, players){
    if(err) throw err
    _.each(players, function(value) {
      arr.push({"name":value.name,"img":value.img});
    })
    arr = alphabeticalSorter(arr)
    res.render('alphabetical',{
      data:arr
    });
  })
});

app.get("/heaviest", function(req, res) {
  res.render('heaviest');
});

app.post("/heaviest", function(req, res) {
  var heaviest = [];
  var weightLimit = parseInt(req.body.heaviest);
  
  // _.each(_DATA, function(value) {
  //   if(value.weight > weightLimit) {
  //     heaviest.push({"name":value.name,"weight":value.weight,"img":value.img});
  //   }
  // })

  Player.find({weight: {$gt: weightLimit}},function(err, players){
    if(err) throw err
    res.render('filterWeight',{
      data: players,
      input: weightLimit
    });
  })

  // res.render('filterWeight',{
  //   data: heaviest,
  //   input: weightLimit
  // });
});

// open socket connection
io.on('connection', function(socket) {
    console.log('NEW connection.');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log('Oops. A user disconnected.');
    });
});

http.listen(process.env.PORT || 3000, function() {
  console.log('Listening!');
});
