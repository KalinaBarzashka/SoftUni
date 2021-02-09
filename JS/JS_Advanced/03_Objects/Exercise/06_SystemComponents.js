function main(args) {
  let systemComponentsDict = [];

  for (let i = 0; i < args.length; i++) {
    let [system, comp, subcomp] = args[i].split(" | ");

    if(!systemComponentsDict.some(x => x.key == system)){
      systemComponentsDict.push({
        key: system,
        value: []
      });
    }
    
    let indexSystem = systemComponentsDict.findIndex(x => x.key == system);
    if(!systemComponentsDict[indexSystem].value.some(x => x.key == comp)){
      systemComponentsDict[indexSystem].value.push({
        key: comp,
        value: []
      });
    }

    let indexComp = systemComponentsDict[indexSystem].value.findIndex(x => x.key == comp);
    systemComponentsDict[indexSystem].value[indexComp].value.push(subcomp);
  }

  systemComponentsDict.sort(function (a, b){
    if(a.value.length < b.value.length) {
      return 1;
    }
    else if(a.value.length > b.value.length) {
      return -1;
    }
    else {
      return a.key.localeCompare(b.key);
    }
  });

  for (let i = 0; i < systemComponentsDict.length; i++) {
    systemComponentsDict[i].value.sort(function (a, b){
      if(a.value.length < b.value.length) {
        return 1;
      }
      else if(a.value.length > b.value.length) {
        return -1;
      }
    });
  }

  for (let i = 0; i < systemComponentsDict.length; i++) {
    console.log(systemComponentsDict[i].key);
    for (let j = 0; j < systemComponentsDict[i].value.length; j++) {
      console.log(`|||${systemComponentsDict[i].value[j].key}`);
      for (let k = 0; k < systemComponentsDict[i].value[j].value.length; k++) {
        console.log(`||||||${systemComponentsDict[i].value[j].value[k]}`);
      }
    }
  }
}

main(['SULS | Main Site | Home Page',
'SULS | Main Site | Login Page',
'SULS | Main Site | Register Page',
'SULS | Judge Site | Login Page',
'SULS | Judge Site | Submittion Page',
'Lambda | CoreA | A23',
'SULS | Digital Site | Login Page',
'Lambda | CoreB | B24',
'Lambda | CoreA | A24',
'Lambda | CoreA | A25',
'Lambda | CoreC | C4',
'Indice | Session | Default Storage',
'Indice | Session | Default Security']
);