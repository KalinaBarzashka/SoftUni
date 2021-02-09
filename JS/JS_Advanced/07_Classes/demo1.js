//Class Declaration
class Rectangle {
  constructor(height, width) { //func -> not void
    this.height = height;
    this.width = width;
    
    //this -> инстанцията, която създаваме; използвайки го, пропъртито става публично (не е нужно да го декларираме извън конструктора - то само се декларира)
    //return instance -> скрито от нас
  }
}

//Class Expression - named or unnamed
//named:
let rectangle1 = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

//unnamed:
let rectangle2 = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}