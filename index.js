var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// My Variables
var fs = require('fs');
var dataUtil = require("./data-util");
var _DATA = dataUtil.loadData().players;
var handlebars = exphbs.handlebars;
var _ = require("underscore");
const { parse } = require('querystring');

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 //******************* */
 // RENDERS HOME PAGE
 //******************* */
app.get('/',function(req,res){
  res.render('home',{
    data: _DATA
  });
})

//**************** */
// API GET REQUEST
//**************** */
app.get('/api/getPlayers',function(req,res){
  var players = [];
  _.each(_DATA, function(value) {
        players.push(value);
})
  res.json(players);
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
app.post('/addPlayer', function(req, res) {
  if(!req.body) { return res.send("No data recieved"); }
  var body = req.body;

  // Transform teams
  body.teams = body.teams.split(" ");

  // Save new player
  _DATA.push(req.body);
  dataUtil.saveData(_DATA);

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
  var _name = req.params.player_name;
  var result = _.findWhere(_DATA, { name: _name })

  res.render('player',{
    data: result
  });
});


app.get("/teams", function(req, res) {
  res.render('teams',{
    data: _DATA
  });
});

app.post("/teams", function(req, res) {
  var input = req.body.teamName;
  var players = [];
  
  _.each(_DATA, function(value) {
    if(value.teams.includes(input)) {
        players.push(value);
    }
  })
  
  res.render('teamSearch',{
    input: input,
    data: players
  });
});

app.get("/oldest", function(req, res) {
  res.render('oldest');
});

app.post("/oldest", function(req, res) {
  var oldest = [];
  var oldestAge = parseInt(req.body.oldest);
  
  _.each(_DATA, function(value) {
    if(value.age > oldestAge) {
      oldest.push({"name":value.name,"age":value.age,"img":value.img});
    }
  })

  res.render('filterAge',{
    data: oldest,
    input: oldestAge
  });
});

app.get("/tallest", function(req, res) {
  res.render('tallest');
});

app.post("/tallest", function(req, res) {
  var tallest = [];
  var tallestFeet = req.body.feet;
  var tallestInches = req.body.inches;
  
  _.each(_DATA, function(value) {
    var arr = value.height.split("\'");
    if(parseInt(arr[0]) > parseInt(tallestFeet)) {
        tallest.push({"name":value.name,"height":value.height,"img":value.img});
    } else if(parseInt(arr[0]) === parseInt(tallestFeet)) {
        if(parseInt(arr[1]) > parseInt(tallestInches)) {
          tallest.push({"name":value.name,"height":value.height,"img":value.img});
        }
    }
  })

  var send = tallestFeet + "'" + tallestInches + "\"";
  res.render('filterTallest',{
    data: tallest,
    input: send
  });
});

app.get("/alphabetical", function(req, res) {
  var arr = [];

  _.each(_DATA, function(value) {
    arr.push({"name":value.name,"img":value.img});
  })

  var len = arr.length;
  for (let x = len-1; x >= 0; x--) {
    for (let y = 1; y <= x; y++) {
      if (arr[y-1].name > arr[y].name){
        var temp = arr[y-1];
        arr[y-1] = arr[y];
        arr[y] = temp;
      }
    }
  }

  res.render('alphabetical',{
    data:arr
  });
});

app.get("/heaviest", function(req, res) {
  res.render('heaviest');
});

app.post("/heaviest", function(req, res) {
  var heaviest = [];
  var weightLimit = parseInt(req.body.heaviest);
  
  _.each(_DATA, function(value) {
    if(value.weight > weightLimit) {
      heaviest.push({"name":value.name,"weight":value.weight,"img":value.img});
    }
  })

  res.render('filterWeight',{
    data: heaviest,
    input: weightLimit
  });
});


app.listen(process.env.PORT || 3000, function() {
  console.log('Listening!');
});
