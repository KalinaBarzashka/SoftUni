let result = (function () {
  const Faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  const Suits = {
    SPADES: '♠',
    HEARTS: '♥',
    DIAMONDS: '♦',
    CLUBS: '♣'
  };

  class Card {
    constructor(face, suit) {
      this.face = face;
      this.suit = suit;
    }

    get face() {
      return this.innerFace;
    }

    get suit() {
      return this.innerSuit;
    }

    set face(face) {
      if(Faces.includes(face.toString())) {
        this.innerFace = face;
      }
      else {
        throw new Error('Invalid Card Face!');
      }
    }

    set suit(suit) {
      if(Object.values(Suits).includes(suit)) {
        this.innerSuit = suit;
      }
      else {
        throw new Error('Invalid Card Suit!');
      }
    }

  }

  return {
    Suits:Suits,
    Card:Card
  }

}());

let Card = result.Card;
let Suits = result.Suits;

let card = new Card('Q', Suits.CLUBS);

console.log(card.face);
console.log(card.suit);

console.log('-------------------------------');

card.face = 'A';
card.suit = Suits.DIAMONDS;

console.log(card.face);
console.log(card.suit);