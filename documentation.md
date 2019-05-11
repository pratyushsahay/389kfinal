
# NBA Players

---

Name: Pratyush Sahay, Dovid Baum, Kevin Rosales

Date: 4/12/2019

Project Topic: NBA Players

URL: https://nba-players-final.herokuapp.com

---


### 1. Data Format and Storage

Data point fields (Player Schema):
- `Field 1`: Name                `Type: String`
- `Field 2`: Age                 `Type: Number`
- `Field 3`: Teams               `Type: [String]`
- `Field 4`: Championships       `Type: Number`
- `Field 5`: Retired             `Type: String`
- `Field 6`: Height              `Type: String`
- `Field 7`: Position            `Type: String`
- `Field 8`: Weight              `Type: Number`
- `Field 9`: Image               `Type: String`
- `Field 10`: Team Schema        `Type: teamSchema`
- `Field 9`: Stats Schema        `Type: statSchema`

Data point fields (Team Schema):
- `Field 1`: Name                `Type: String`
- `Field 2`: City                `Type: String`
- `Field 3`: Color               `Type: Object`

Data point fields (Stats Schema):
- `Field 1`: Name                `Type: String`
- `Field 2`: Points Per Game     `Type: Number`
- `Field 3`: Rebounds Per Game   `Type: Number`
- `Field 3`: Assists Per Game    `Type: Number`

Schema (Player Schema): 
```javascript
{
   name: String,
   age: Number,
   teams: [String],
   currTeam: teamSchema,
   championships: Number,
   retired: String,
   height: String,
   position: String,
   weight: Number,
   stats: statSchema,
   img: String
}
```

Schema (Team Schema): 
```javascript
{
   name: String,
   city: String,
   color: Object
}
```

Schema (Stats Schema): 
```javascript
{
   name: String,
   ppg: Number,
   rpg: Number,
   apg: Number
}
```

### 2. Live Updates
Trash Talk Board

### 3. View Data
GET endpoint route: `/api/getPlayers`
GET endpoint route: `/getPlayer/:playerName`

Navigation Filters
1. Team Filter -> `/teams`
2. Alphabetical Players -> `/alphabetical`
3. Tallest Filter -> `/tallest`
4. Oldest Filter -> `/oldest`
5. Heaviest Filter -> `/heaviest`
6. About Page -> `/about`

### 4. Modules
1. Alphabetical Sorter
2. Tallest Sorter

### 5. NPM Packages
1. nba-color
2. nba-scoreboard

### 6. Search Data
Search Field: `name`


