function solve() {
  class Figure{
    constructor(unit = "cm"){
      this.units = unit;
    }

    changeUnits(unit) {
      this.units = unit;
    }
  }
  
  class Circle extends Figure {
    constructor(radius) {
      super();
      this.radius = radius;
    }

    toString() {
      let newRadius = 0;

      if (this.units == "m") {
        newRadius = this.radius / 10;
      } else if (this.units == "mm") {
        newRadius = this.radius * 10;
      } else {
        newRadius = this.radius;
      }
    
      return `Figures units: ${this.units} Area: ${this.area} - radius: ${newRadius}`;
    }

    get area(){
      let result = Math.PI * Math.pow(this.radius, 2);
      if (this.units == "m") {
        return result / 100; 
      } else if (this.units == "mm") {
        return result * 100;
      } else {
        return result;
      }
    }
  }

  class Rectangle extends Figure {
    constructor(width, height, unit) {
      super(unit);
      this.width = width;
      this.height = height;
    }

    toString() {
      let newWidht = 0;
      let newHeight = 0;

      if (this.units == "m") {
        newWidht = this.width / 10;
        newHeight = this.height / 10;
      } else if (this.units == "mm") {
        newWidht = this.width * 10;
        newHeight = this.height * 10;
      } else {
        newWidht = this.width;
        newHeight = this.height;
      }

      return `Figures units: ${this.units} Area: ${this.area} - width: ${newWidht}, height: ${newHeight}`;
    }

    get area(){
      let result = this.width * this.height;
      if (this.units == "m") {
        return result / 100; 
      } else if (this.units == "mm") {
        return result * 100;
      } else {
        return result;
      }
    }
  }

  return {
    Figure,
    Circle,
    Rectangle
  }
}