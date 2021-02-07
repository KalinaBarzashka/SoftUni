function solve() {
  class Melon {
    constructor(weight, melonSort) {
      if(this.target == Melon) {
        throw new Error("Abstract class cannot be instantiated directly");
      }

      this.weight = weight;
      this.melonSort = melonSort;
    }
  }

  class Watermelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this._elementIndex = weight * melonSort.length;
    }

    get elementIndex() {
      return this._elementIndex;
    }

    toString() {
      let result = `Element: Water\n`;
      result += `Sort: ${this.melonSort}\n`;
      result += `Element Index: ${this._elementIndex}`;
      return result;
    }
  }

  class Firemelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this._elementIndex = weight * melonSort.length;
    }

    get elementIndex() {
      return this._elementIndex;
    }

    toString() {
      let result = `Element: Fire\n`;
      result += `Sort: ${this.melonSort}\n`;
      result += `Element Index: ${this._elementIndex}`;
      return result;
    }
  }

  class Earthmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this._elementIndex = weight * melonSort.length;
    }

    get elementIndex() {
      return this._elementIndex;
    }

    toString() {
      let result = `Element: Earth\n`;
      result += `Sort: ${this.melonSort}\n`;
      result += `Element Index: ${this._elementIndex}`;
      return result;
    }
  }

  class Airmelon extends Melon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this._elementIndex = weight * melonSort.length;
    }

    get elementIndex() {
      return this._elementIndex;
    }

    toString() {
      let result = `Element: Air\n`;
      result += `Sort: ${this.melonSort}\n`;
      result += `Element Index: ${this._elementIndex}`;
      return result;
    }
  }

  class Melolemonmelon extends Watermelon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this._elementIndex = this.weight * this.melonSort.length;
      this.element = "Water";
    }

    get elementIndex() {
      return this._elementIndex;
    }

    toString() {
      let result = `Element: ${this.element}\n`;
      result += `Sort: ${this.melonSort}\n`;
      result += `Element Index: ${this._elementIndex}`;
      return result;
    }

    morph() {
      if (this.element == "Water") {
        this.element = "Fire";
      } else if (this.element == "Fire") {
        this.element = "Earth";
      } else if (this.element == "Earth") {
        this.element = "Air";
      } else if (this.element == "Air") {
        this.element = "Water";
      }
    }
  }

  return {
    Melon,
    Watermelon,
    Firemelon,
    Earthmelon,
    Airmelon,
    Melolemonmelon
  };
}