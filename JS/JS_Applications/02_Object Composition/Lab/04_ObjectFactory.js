function solve(str) {
  let data = JSON.parse(str);
  // const concatenate = (a, o) => ({...a, ...o});
  // const newObject = data.reduce(concatenate, {});

  let newObject = {};
  for (let i = 0; i < data.length; i++) {
    newObject = Object.assign(newObject, data[i]);
  }

  return newObject;
}

//solve(`[{"canMove": true},{"canMove":true, "doors": 4},{"capacity": 5}]`);
solve(`[{"prop1": 1},{"prop2":2},{"prop3":3}]`);