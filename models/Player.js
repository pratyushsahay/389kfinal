var mongoose = require('mongoose');

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
    img: {
        type: String,
        required: true
    }
});

var Player = mongoose.model('Player',playerSchema);

module.exports = Player;