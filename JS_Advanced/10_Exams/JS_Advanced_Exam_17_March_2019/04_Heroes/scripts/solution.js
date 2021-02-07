function solve(){
   let validKingdoms = ['CASTLE', 'DUNGEON', 'FORTRESS', 'INFERNO', 'NECROPOLIS', 'RAMPART', 'STRONGHOLD', 'TOWER', 'CONFLUX'];

   let rebuildAkingdom = document.querySelector("#kingdom > div > button").addEventListener('click', function(e) {
      let kingdomName = document.querySelector("#kingdom > div > input[type=text]:nth-child(1)");
      let kingName = document.querySelector("#kingdom > div > input[type=text]:nth-child(2)");

      if(kingName.value.length >= 2 && validKingdoms.includes(kingdomName.value.toLocaleUpperCase())) {
         
         let idMap = document.getElementById('map');
         let idCastle = kingdomName.value.toLocaleLowerCase();
         //parent
         let castle = document.querySelector(`#${idCastle}`);
         //let castle = idMap.getElementById(idCastle); 
         //h1 child
         let h1 = document.createElement('h1');
         h1.textContent = kingdomName.value.toLocaleUpperCase();
         //div child
         let div = document.createElement('div');
         div.setAttribute('class', 'castle');
         //h2 element
         let h2 = document.createElement('h2');
         h2.textContent = kingName.value.toLocaleUpperCase();
         //fieldset element
         let fieldset = document.createElement('fieldset');
         //add childs to fieldset
         let legend = document.createElement('legend');
         legend.textContent = 'Army';
         let p1 = document.createElement('p');
         p1.textContent = 'TANKS - 0';
         let p2 = document.createElement('p');
         p2.textContent = 'FIGHTERS - 0';
         let p3 = document.createElement('p');
         p3.textContent = 'MAGES - 0';
         let divOutput = document.createElement('div');
         divOutput.setAttribute('class', 'armyOutput');

         fieldset.appendChild(legend);
         fieldset.appendChild(p1);
         fieldset.appendChild(p2);
         fieldset.appendChild(p3);
         fieldset.appendChild(divOutput);


         castle.appendChild(h1);
         castle.appendChild(div);
         castle.appendChild(h2);
         castle.appendChild(fieldset);
         castle.style = 'display: inline-block';
      } else {
         kingdomName.value = '';
         kingName.value = '';
      }
   });

   let joinKingdom = document.querySelector("#characters > div:nth-child(4) > button").addEventListener('click', function(e) {
      let radioButtonFighter = document.querySelectorAll('[type="radio"]')[0];
      let radioButtonMage = document.querySelectorAll('[type="radio"]')[1];
      let radioButtonTank = document.querySelectorAll('[type="radio"]')[2];
      //true/fasle checked
      let bFighter = radioButtonFighter.checked;
      let bMage = radioButtonMage.checked;
      let bTank = radioButtonTank.checked;

      if(!bFighter && !bMage && !bTank) {
         return;
      }

      let character = document.querySelector("#characters > div:nth-child(4) > input[type=text]:nth-child(1)");
      let kingdom = document.querySelector("#characters > div:nth-child(4) > input[type=text]:nth-child(2)");

      if(character.value.length < 2 || !validKingdoms.includes(kingdom.value.toLocaleUpperCase())) {
         character.value = '';
         kingdom.value = '';
         return;
      }

      let currentCastle = document.querySelector(`#${kingdom.value}`);
      if(currentCastle.style == 'display: none') {
         character.value = '';
         kingdom.value = '';
         return;
      }

      let searchedValue = '';
      if(bFighter) {
         searchedValue = 'FIGHTERS';
      } else if(bMage) {
         searchedValue = 'MAGES';
      } else if(bTank) {
         searchedValue = 'TANKS';
      }
      
      let currentFieldset = currentCastle.getElementsByTagName('fieldset')[0];
      let parags = currentFieldset.getElementsByTagName('p');

      let searchedP = undefined;
      let renewedValue = '';
      for (let i = 0; i < parags.length; i++) {
         let splitedInput = parags[i].textContent.split(' - ');
         if(splitedInput[0] == searchedValue) {
            renewedValue = `${splitedInput[0]} - ${Number(splitedInput[1]) + 1}`;
            searchedP = parags[i];
            searchedP.textContent = renewedValue;
         }
      }

      let searchedDiv = currentCastle.getElementsByClassName('armyOutput')[0];
      searchedDiv.textContent += `${character.value} `;
   });

   let war = document.querySelector("#actions > button").addEventListener('click', function(e) {
      let attacker = document.querySelector("#actions > input[type=text]:nth-child(2)");
      let defender = document.querySelector("#actions > input[type=text]:nth-child(3)");

      if(!validKingdoms.includes(attacker.value.toLocaleUpperCase()) || !validKingdoms.includes(defender.value.toLocaleUpperCase())) {
         attacker.value = '';
         defender.value = '';
         return;
      }

      let currentAttackerCastle = document.querySelector(`#${attacker.value}`);
      let currentDefenderCastle = document.querySelector(`#${defender.value}`);
      if(currentAttackerCastle.style == 'display: none' || currentDefenderCastle.style == 'display: none') {
         attacker.value = '';
         defender.value = '';
         return;
      }

      let mageStat = {attack: 70, defend: 30};
      let fighterStat = {attack: 50, defend: 50};
      let tankStat = {attack: 20, defend: 80};

      let attackingTotalPoints = 0;
      let defendingTotalPoints = 0;

      //calculate attacker points
      let currentFieldsetAttacker = currentAttackerCastle.getElementsByTagName('fieldset')[0];
      let paragsA = currentFieldsetAttacker.getElementsByTagName('p');
      
      attackingTotalPoints += Number(mageStat['attack']) * Number(paragsA[2].textContent.split(' - ')[1]);

      attackingTotalPoints += Number(fighterStat['attack']) * Number(paragsA[1].textContent.split(' - ')[1]);

      attackingTotalPoints += Number(tankStat['attack']) * Number(paragsA[0].textContent.split(' - ')[1]);

      //calculate defender points
      let currentFieldsetDefender = currentDefenderCastle.getElementsByTagName('fieldset')[0];

      let paragsD = currentFieldsetDefender.getElementsByTagName('p');
      defendingTotalPoints += Number(mageStat['defend']) * Number(paragsD[2].textContent.split(' - ')[1]);

      defendingTotalPoints += Number(fighterStat['defend']) * Number(paragsD[1].textContent.split(' - ')[1]);

      defendingTotalPoints += Number(tankStat['defend']) * Number(paragsD[0].textContent.split(' - ')[1]);

      if(defendingTotalPoints >= attackingTotalPoints) {
         return;
      }

      let h2Def = currentDefenderCastle.getElementsByTagName('h2')[0];
      let h2Att = currentAttackerCastle.getElementsByTagName('h2')[0];
      h2Def.textContent = h2Att.textContent;
   });
}

solve();