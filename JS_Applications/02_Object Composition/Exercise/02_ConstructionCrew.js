function solve(workerObject) {
  if(workerObject.dizziness == false) {
    return workerObject;
  }

  let waterAmount = workerObject.weight * workerObject.experience * 0.1;
  workerObject.levelOfHydrated += waterAmount;
  workerObject.dizziness = false;

  return workerObject;
}

console.log(solve({ weight: 120,
  experience: 20,
  levelOfHydrated: 200,
  dizziness: true }
));