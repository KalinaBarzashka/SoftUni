class Rectangle {
  constructor(width, height, color) {
    this.height = height;
    this.width = width;
    this.color = color;
    this.name = arguments[3];
  }

  calcArea () {
    return this.height * this.width;
  }

  get diagonal() { //ползваме го като пропърти на обекта - не го достъпваме като функция
    return Math.sqrt(this.height**2 + this.width**2);
  }

  set secondColor(color) { //отново не е функция
    this.color = color;
  }

  get secondColor() {
    return this.color;
  }

  static whatAmI() { //само и единствено в класа, не може да се извика от инстанция
    return 'Rectangle';
  }
}

//Rectangle.prototype.getDiagonal = function() {
  //return Math.sqrt(this.height**2 + this.width**2);
//};



const rec = new Rectangle(5, 4, 'pink', 'kris');
rec.secondColor = 'blue';
console.log(rec.calcArea());
//console.log(rec.getDiagonal());
console.log(rec.diagonal);
//console.log(rect.whatAmI()); //Type Error
console.log(rect.whatAmI); //undefined - добавя пропъри whatAmI към обекта
console.log(Rectangle.whatAmI());