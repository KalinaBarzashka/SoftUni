function printDeckOfCards(cards) {
  function makeCard(face, suit) {
    let validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let validSuits = {
      'S': '\u2660',
      'H': '\u2665',
      'D': '\u2666',
      'C': '\u2663'
    }
  
    if(!validFaces.includes(face)) {
      throw new Error(`Invalid card: ${face + suit}`);
    }
  
    if(!validSuits.hasOwnProperty(suit)) {
      throw new Error(`Invalid card: ${face + suit}`);
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
  
  let str = '';
  let obj = '';
  for (let i = 0; i < cards.length; i++) {
    let face = cards[i].slice(0, cards[i].length - 1);
    let suit = cards[i].substr(cards[i].length - 1);
    try {
      obj = makeCard(face, suit);
    }
    catch(ex) {
      console.log(ex.message);
      return;
    }
    str += obj.face;
    str += obj.suit;
    str += ' ';
  }

  console.log(str);
}

//printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C']);