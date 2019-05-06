function alphabeticalSorter(arr){

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

  return arr
	
}

module.exports = alphabeticalSorter;
