function main(face, suit) {
  let validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let validSuits = {
    'S': '\u2660',
    'H': '\u2665',
    'D': '\u2666',
    'C': '\u2663'
  }

  if(!validFaces.includes(face)) {
    throw new Error;
  }

  if(!validSuits.hasOwnProperty(suit)) {
    throw new Error;
  }

  let card = {
    face: face,
    suit: validSuits[suit],
    toString: function() {
      return this.face + this.suit;
    }
  };
  
  return card;
}