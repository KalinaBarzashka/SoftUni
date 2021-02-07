class Rectangle {
  constructor(width, height, color) {
    this.height = height;
    this.width = width;
    this.color = color;
  }

  calcArea () {
    return this.height * this.width;
  }
}