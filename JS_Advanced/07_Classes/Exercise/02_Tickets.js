function main(arr, criteria) {
  class Ticket {
    constructor(destination, price, status) {
      this.destination = destination;
      this.price = Number(price);
      this.status = status;
    }
  }

  let data = [];

  for (let i = 0; i < arr.length; i++) {
    let currentArr = arr[i].split('|');
    let ticket = new Ticket(currentArr[0], currentArr[1], currentArr[2]);
    data.push(ticket);
  }

  data.sort(function (a, b) {
    if(a[criteria] > b[criteria]) {
      return 1;
    } else if(a[criteria] < b[criteria]) {
      return -1;
    }
  });

  return data;
}

//main(['Philadelphia|94.20|available', 'New York City|95.99|available', 'New York City|95.99|sold', 'Boston|126.20|departed'], 'destination');

main(['Philadelphia|94.20|available', 'New York City|95.99|available', 'New York City|95.99|sold', 'Boston|126.20|departed'], 'status' );