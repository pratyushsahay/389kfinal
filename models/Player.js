var mongoose = require('mongoose');

var statSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true
    },
    ppg: {
        type: Number,
        required: true
    },
    rpg: {
        type: Number,
        required: true
    },
    apg: {
        type: Number,
        required: true
    }

});

var teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    color: {
        type: Object,
        required: true
    }
});

var playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0,
        required: true
    },
    teams: [String],
    currTeam: teamSchema,
    championships: {
        type: Number,
        min: 0,
        required: true
    },
    retired: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        min: 0,
        required: true
    },
    stats: statSchema,
    img: {
        type: String,
        required: true
    }
});

var Player = mongoose.model('Player',playerSchema);

module.exports = Player;