function solve() {
  let resultArray = [];

  for (let i = 0; i < arguments[0].length; i++) {
    let [width, height] = arguments[0][i];
    let currObj = {
      width: width,
      height: height,
      area: function() {
        return this.width * this.height;
      },
      compareTo: function(other) {
        //other.area() - this.area() || other.width - this.width;
        if(this.area() < other.area()) {
          return 1;
        } else if(this.area() > other.area()) {
          return -1;
        } else {
          if(this.width < other.width) {
            return 1;
          } else if(this.width > other.width) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    };

    resultArray.push(currObj);
  }

  resultArray.sort(function(a, b) {
    if(a.area() > b.area()) {
      return -1;
    } else if(a.area() < b.area()) {
      return 1;
    } else {
      if(a.width > b.width) {
        return -1;
      } else if(a.width < b.width) {
        return 1;
      }
    }
  });
  return resultArray;
}

//solve([[10,5],[5,12]]);
//solve([[10,5], [3,20], [5,12]]);
solve([[1,20],[20,1],[5,3],[5,3]]);