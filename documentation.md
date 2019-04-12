
# NBA Players

---

Name: Pratyush Sahay

Date: 4/12/2019

Project Topic: NBA Players

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Name                `Type: String`
- `Field 2`: Age                 `Type: Number`
- `Field 3`: Teams               `Type: [String]`
- `Field 4`: Championships       `Type: Number`
- `Field 5`: Retired             `Type: String`
- `Field 6`: Height              `Type: String`
- `Field 7`: Position            `Type: String`
- `Field 8`: Weight              `Type: Number`
- `Field 5`: Image               `Type: String`


Schema: 
```javascript
{
   name: String,
   age: Number,
   teams: [String],
   championships: Number,
   retired: String,
   height: String,
   position: String,
   weight: Number,
   img: String
}
```

### 2. Add New Data

HTML form route: `/addPlayer`

POST endpoint route: `/api/addPlayer`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/addPlayer',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       name: 'Brandon Ingram',
       age: 21,
       teams: ["LAL"],
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
```

### 3. View Data

GET endpoint route: `/api/getPlayers`

### 4. Search Data

Search Field: `name`

### 5. Navigation Pages

Navigation Filters
1. Team Filter -> `/teams`
2. Alphabetical Players -> `/alphabetical`
3. Tallest Filter -> `/tallest`
4. Oldest Filter -> `/oldest`
5. Heaviest Filter -> `/heaviest`

