var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addPlayer',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name: 'James Harden',
       age: 21,
       teams: ["LAL","MIA","CLE"],
       championships: 0,
       retired: "no",
       height: "6'9",
       position: "Forward",
       weight: 190,
       img: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627742.png"
    } 
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
});