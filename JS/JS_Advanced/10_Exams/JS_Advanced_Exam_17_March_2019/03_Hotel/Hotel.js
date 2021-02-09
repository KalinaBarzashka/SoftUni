class Hotel {
  constructor(name, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.bookings = [];
    this.currentBookingNumber = 1;
    this.singleRooms = parseInt(this.capacity * 0.50);
    this.doubleRooms = parseInt(this.capacity * 0.30);
    this.maisonetteRooms = parseInt(this.capacity * 0.20);
  }

  get roomsPricing()  {
    return {single: 50,
            double: 90,
            maisonette: 135
           };
  }

  get servicesPricing () {
    return {food: 10,
            drink: 15,
            housekeeping: 25
           };
  }

  //functions
  rentARoom(clientName, roomType, nights) {
    let availableRooms = 0;
    let bSingle = false;
    let bDouble = false;
    let bMaisonette = false;

    if(roomType == 'single') {
      availableRooms = this.singleRooms;
      bSingle = true;
    } else if(roomType == 'double') {
      availableRooms = this.doubleRooms;
      bDouble = true;
    } else if(roomType == 'maisonette') {
      availableRooms = this.maisonetteRooms;
      bMaisonette = true;
    }

    if (availableRooms <= 0) {
      let str = `No ${roomType} rooms available!`;
      if(!bSingle) {
        str += ` Available single rooms: ${this.singleRooms}.`;
      }
      if(!bDouble) {
        str += ` Available double rooms: ${this.doubleRooms}.`;
      }
      if(!bMaisonette) {
        str += ` Available maisonette rooms: ${this.maisonetteRooms}.`;
      }
      return str;
    }

    let obj = {
      'clientName': clientName,
      'roomType': roomType,
      'nights': Number(nights),
      'bookingNumber': Number(this.currentBookingNumber)
    };

    this.bookings.push(obj);
    //decrease capacity

    this[roomType + 'Rooms'] -= 1;

    return `Enjoy your time here Mr./Mrs. ${clientName}. Your booking is ${this.currentBookingNumber++}.`;
  }

  roomService(currentBookingNumber, serviceType) {
    let currentBooking = this.bookings.findIndex(x => x['bookingNumber'] === Number(currentBookingNumber)); //indices starts from 0
    if(currentBooking < 0) {
      return `The booking ${currentBookingNumber} is invalid.`;
    }

    if(this.servicesPricing[serviceType] == undefined) {
      return `We do not offer ${serviceType} service.`;
    }

    if(!this.bookings[currentBooking].hasOwnProperty('services')) {
      this.bookings[currentBooking].services = [];
    }
    
    this.bookings[currentBooking].services.push(serviceType);

    return `Mr./Mrs. ${this.bookings[currentBooking].clientName}, Your order for ${serviceType} service has been successful.`;
  }

  checkOut(currentBookingNumber) {
    let totalMoney = 0;
    let totalServiceMoney = 0;
    let currentBooking = this.bookings.findIndex(x => x['bookingNumber'] === Number(currentBookingNumber));

    if(currentBooking < 0) {
      return `The booking ${currentBookingNumber} is invalid.`;
    }

    let objCheckOut = this.bookings[currentBooking];
    let pricePerNight = this.roomsPricing[objCheckOut['roomType']];
    let priceForStay = Number(pricePerNight) * Number(objCheckOut['nights']);
    totalMoney += priceForStay;
    //room capacity:
    let roomType = objCheckOut['roomType'];
    this[roomType + 'Rooms'] += 1;
    //return string
    let str = '';

    if(objCheckOut.hasOwnProperty('services')) {
      for (let i = 0; i < objCheckOut['services'].length; i++) {
        totalServiceMoney += this.servicesPricing[objCheckOut['services'][i]];
      }
      str += `We hope you enjoyed your time here, Mr./Mrs. ${objCheckOut['clientName']}. The total amount of money you have to pay is ${totalMoney + totalServiceMoney} BGN. You have used additional room services, costing ${totalServiceMoney} BGN.`;
    } else {
      str += `We hope you enjoyed your time here, Mr./Mrs. ${objCheckOut['clientName']}. The total amount of money you have to pay is ${totalMoney} BGN.`;
    }
    return str;
  }

  report() {
    if(this.bookings.length == 0) {
      return `${this.name.toUpperCase()} DATABASE:\n--------------------\nThere are currently no bookings.`;
    }

    let str = `${this.name.toUpperCase()} DATABASE:\n--------------------`;
    for (let i = 0; i < this.bookings.length; i++) {
      const element = this.bookings[i];
      str += `\nbookingNumber - ${element.bookingNumber}`;
      str += `\nclientName - ${element.clientName}`;
      str += `\nroomType - ${element.roomType}`;
      str += `\nnights - ${element.nights}`;
      if(element.hasOwnProperty('services')) {
        str += '\nservices: ';
        str += element.services.join(', ');
      }

      if(i < this.bookings.length - 1) {
        str += '\n----------';
      }
    }
    return str;
  }
}

function main() {
  let hotel = new Hotel('HotUni', 10);

  hotel.rentARoom('Peter', 'single', 4);
  hotel.rentARoom('Robert', 'double', 4);
  hotel.rentARoom('Geroge', 'maisonette', 6);

  hotel.roomService(3, 'housekeeping');
  hotel.roomService(3, 'drink');
  hotel.roomService(2, 'room');
  hotel.roomService(2, 'food');
  hotel.roomService(2, 'drink');
  hotel.roomService(2, 'housekeeping');

  console.log(hotel.report());

}

main();