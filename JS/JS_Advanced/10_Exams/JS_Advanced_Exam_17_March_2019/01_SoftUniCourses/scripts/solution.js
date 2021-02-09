function solve() {
   let signMeUpButton = document.querySelector('[value="signMeUp"]').addEventListener('click', function(e) {
      let checkedCourses = document.querySelectorAll('input[type=checkbox]:checked');
      let onSite = false;
      let onSiteButton = document.querySelector("#educationForm > input[type=radio]:nth-child(2)");
      //see if onSite is checked
      if(onSiteButton.checked == true) {
         onSite = true;
      }

      let bJsFund = false;
      let bJsAdv = false;
      let bJsAppl = false;
      let bJsWeb = false;
      let totalMoney = 0;

      for (let i = 0; i < checkedCourses.length; i++) {
         const element = checkedCourses[i];
         let parentLi = element.parentElement;
         let courseName = parentLi.children[1].textContent.split(' - ')[0];
         
         if(courseName == 'JS Fundamentals') {
            bJsFund = true;
            totalMoney += 170;
         } else if(courseName == 'JS Advanced') {
            bJsAdv = true;
            totalMoney += 180;
         } else if(courseName == 'JS Applications') {
            bJsAppl = true;
            totalMoney += 190;
         } else if(courseName == 'JS Web') {
            bJsWeb = true;
            totalMoney += 490;
         }
      }

      if(bJsAdv && bJsFund) {
         totalMoney -= 18;
      }

      if(bJsAdv && bJsFund && bJsAppl) {
         totalMoney -= (522 * 0.06);
      }

      if(!onSite) {
         totalMoney -= (totalMoney * 0.06);
      }

      //visualize result
      let resultCourses = document.querySelector("#myCourses > div.courseBody");
      let ul = resultCourses.getElementsByTagName('ul')[0];

      for (let i = 0; i < checkedCourses.length; i++) {
         let li = document.createElement('li');
         const element = checkedCourses[i];
         let parentLi = element.parentElement;
         let courseName = parentLi.children[1].textContent.split(' - ')[0];
         courseName = courseName.replace(' ', '-');
         li.textContent = courseName;

         ul.appendChild(li);
      }

      if(bJsAdv && bJsFund && bJsAppl && bJsWeb) {
         let bonusLi = document.createElement('li');
         bonusLi.textContent = 'HTML and CSS';
         ul.appendChild(bonusLi);
      }

      //visualize price
      let priceBox = document.querySelector("#myCourses > div.courseFoot > p");
      priceBox.textContent = `Cost: ${Math.floor(totalMoney).toFixed(2)} BGN`;
   });
}

solve();