function main() {
  class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
      this.clientId = clientId;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    set clientId(clientId) {
      if(clientId.length == 6) {
        this.innerClientId = clientId;
        return;
      }
      else {
        throw new TypeError ('Client ID must be a 6-digit number');
      }
    }

    set email(email) {
      const regex = /[A-Za-z]+@[A-Za-z.]+/gm;
      
      if(regex.exec(email) !== null) {
        this.innerEmail = email;
      }
      else {
        throw new TypeError ('Invalid e-mail');
      }
    }

    set firstName(firstName) {
      if(firstName.length < 3 || firstName.length > 20) {
        throw new TypeError ('First name must be between 3 and 20 characters long');
      }
      else if(this.checkLatinLetters(firstName) == true) {
        throw new TypeError ('First name must contain only Latin characters');
      }

      this.innerFirstName = firstName;
    }

    set lastName(lastName) {
      if(lastName.length < 3 || lastName.length > 20) {
        throw new TypeError ('Last name must be between 3 and 20 characters long');
      }
      else if(this.checkLatinLetters(lastName) == true) {
        throw new TypeError ('Last name must contain only Latin characters');
      }

      this.innerLastName = lastName;
    }

    checkLatinLetters(word) {
      for (let i = 0; i < word.length; i++) {
        if('A' > word[i].toUpperCase() || word[i].toUpperCase() > 'Z') {
          return true;
        }
      }
      return false;
    }
  }

  //let acc = new CheckingAccount('1314', 'ivan@some.com', 'Ivan', 'Petrov');
  //TypeError: Client ID must be a 6-digit number
  //let acc = new CheckingAccount('131455', 'ivan@', 'Ivan', 'Petrov');
  //TypeError: Invalid e-mail
  //let acc = new CheckingAccount('131455', 'ivan@some.com', 'I', 'Petrov')
  //TypeError: First name must be between 3 and 20 characters long
  //let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov')
  //TypeError: "First name must contain only Latin characters
}

main();