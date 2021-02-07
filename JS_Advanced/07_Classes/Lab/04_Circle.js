class Circle  {
  constructor(radius) {
    this.radius = radius;
  }

  set diameter(diameter) {
    this.radius = diameter / 2;
  }

  get diameter() {
    return this.radius * 2;
  }

  get area() {
    return Math.PI * this.radius * this.radius;
  }
}

let c = new Circle(2);
console.log(`Radius: ${c.radius}`); //2
console.log(`Diameter: ${c.diameter}`);  //4
console.log(`Area: ${c.area}`); //12.566370614359172
c.diameter = 1.6;
console.log(`Radius: ${c.radius}`); //0.8
console.log(`Diameter: ${c.diameter}`); //1.6
console.log(`Area: ${c.area}`); //2.0106192982974678
