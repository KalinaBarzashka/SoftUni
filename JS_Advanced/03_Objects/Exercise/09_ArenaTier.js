function main(args) {
  let gladiators = [];
  for (let i = 0; i < args.length; i++) {
    let line = args[i];
    if(line == "Ave Cesar") { break; }

    if(line.includes(" -> ")) { //"{gladiator} -> {technique} -> {skill}"
      let data = line.split(" -> ");
      let gladiator = data[0];
      let technique = data[1];
      let skill = Number(data[2]);
      if(!gladiators.some(x => x.key == gladiator)) {
        gladiators.push({
          key: gladiator,
          value: []
        });
      }

      let indexGladiator = gladiators.findIndex(x => x.key == gladiator);
      if(!gladiators[indexGladiator].value.some(x => x.key == technique)) {
        gladiators[indexGladiator].value.push({
          key: technique,
          value: skill
        }); 
      }

      let indexTechnique = gladiators[indexGladiator].value.findIndex(x => x.key == technique);
      if(gladiators[indexGladiator].value[indexTechnique].value < skill) {
        gladiators[indexGladiator].value[indexTechnique].value = skill;
      }
    }
    else { //"{gladiator} vs {gladiator}"
      let data = line.split(" vs ");
      let firstGladiator = gladiators.findIndex(x => x.key == data[0]);
      let secondGladiator = gladiators.findIndex(x => x.key == data[1]);

      if(firstGladiator == -1 || secondGladiator == -1) {
        continue;
      }

      let hasBeenRemoved = false;
      for (let j = 0; j < gladiators[firstGladiator].value.length; j++) {
        for (let k = 0; k < gladiators[secondGladiator].value.length; k++) {
          if(gladiators[firstGladiator].value[j].key === gladiators[secondGladiator].value[k].key) {
            let totalSkillPointsGladFirst = gladiators[firstGladiator].value.reduce((a, b) => a + b, 0);
            let totalSkillPointsGladSecond = gladiators[secondGladiator].value.reduce((a, b) => a + b, 0);
            if(gladiators[firstGladiator].value[j].value > gladiators[secondGladiator].value[k].value) { //totalSkillPointsGladFirst > totalSkillPointsGladSecond
              //first wins
              gladiators.splice(secondGladiator, 1);
            }
            else if(gladiators[firstGladiator].value[j].value < gladiators[secondGladiator].value[k].value) { //totalSkillPointsGladFirst < totalSkillPointsGladSecond
              gladiators.splice(firstGladiator, 1);
            }
            hasBeenRemoved = true;
            break;
          }
        }

        if(hasBeenRemoved == true) {
          break;
        }
      }
    }
  }

  gladiators.sort(function(a, b) {
    let aTotalSkillPoints = 0;
    let bTotalSkillPoints = 0;
    for (let i = 0; i < a.value.length; i++) {
      aTotalSkillPoints += a.value[i].value;
    }
    for (let i = 0; i < b.value.length; i++) {
      bTotalSkillPoints += b.value[i].value;
    }

    if (aTotalSkillPoints < bTotalSkillPoints) {
      return 1;
    } else if (aTotalSkillPoints > bTotalSkillPoints) {
      return -1;
    } else {
      return a.key.localeCompare(b.key);
    }
  });

  // sort 2
  for (let i = 0; i < gladiators.length; i++) {
    gladiators[i].value.sort(function(a, b){
      if (a.value < b.value) {
        return 1;
      } else if (a.value > b.value) {
        return -1;
      } else {
        return a.key.localeCompare(b.key);
      }
    });
  }

  // print

  for (let i = 0; i < gladiators.length; i++) {
    let totalSkillPoints = 0;
    for (let j = 0; j < gladiators[i].value.length; j++) {
      totalSkillPoints += gladiators[i].value[j].value;
    }

    console.log(`${gladiators[i].key}: ${totalSkillPoints} skill`)
    for (let j = 0; j < gladiators[i].value.length; j++) {
      console.log(`- ${gladiators[i].value[j].key} <!> ${gladiators[i].value[j].value}`);
    }

  }
}

// main([
//   'Pesho -> BattleCry -> 400',
//   'Gosho -> PowerPunch -> 300',
//   'Stamat -> Duck -> 200',
//   'Stamat -> Tiger -> 250',
//   'Ave Cesar'
// ]);

main([
  'Pesho -> Duck -> 400',
  'Julius -> Shield -> 150',
  'Gladius -> Heal -> 200',
  'Gladius -> Support -> 250',
  'Gladius -> Shield -> 250',
  'Pesho vs Gladius',
  'Gladius vs Julius',
  'Gladius vs Gosho',
  'Ave Cesar'
]);