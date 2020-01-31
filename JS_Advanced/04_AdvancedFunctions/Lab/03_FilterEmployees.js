function main(input, criteria) {
  let data = JSON.parse(input);
  let property = criteria.split("-")[0];
  let name = criteria.split("-")[1];
  let counter = 0;
  filter(data, property, name);
  //const result = data.filter(element => element[property] == name);

  function filter(data, property, name) {
    for (let i = 0; i < data.length; i++) {
      if(data[i][property] == name) {
        console.log(`${counter++}. ${data[i].first_name} ${data[i].last_name} - ${data[i].email}`);
      }
    }
  }
}

main(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`, 
'gender-Female'
);