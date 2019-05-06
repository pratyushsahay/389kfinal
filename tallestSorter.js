var _ = require("underscore");

function tallestSorter(_DATA, tallestFeet, tallestInches){

	var tallest = []

	_.each(_DATA, function(value){
		var arr = value.height.split("\'");
    if(parseInt(arr[0]) > parseInt(tallestFeet)) {
        tallest.push({"name":value.name,"height":value.height,"img":value.img});
    } else if(parseInt(arr[0]) === parseInt(tallestFeet)) {
        if(parseInt(arr[1]) > parseInt(tallestInches)) {
          tallest.push({"name":value.name,"height":value.height,"img":value.img});
        }
    }

	})

	return tallest
	
}

module.exports = tallestSorter;
