function solve() {
  let rightAnswerCounter = 0;
  let correctAnswers = ["onclick", "JSON.stringify()", "A programming API for HTML and XML documents"];
  let indexSection = 0;
  
  Array.from(document.querySelectorAll(".answer-text")).map((x) => x.addEventListener('click', (e) => {
    if(correctAnswers.includes(e.target.innerHTML)) {
      rightAnswerCounter++;
    }

    let currentSection = document.querySelectorAll('section')[indexSection];
    currentSection.style.display = 'none';

    if(document.querySelectorAll('section')[indexSection + 1] !== undefined) {
      indexSection++;
      let nextSection = document.querySelectorAll('section')[indexSection];
      nextSection.style.display = "block";
    }
    else {
      document.querySelector("#results").style.display = "block";
      if(rightAnswerCounter == 3) {
        document.querySelector('#results h1').innerHTML = 'You are recognized as top JavaScript fan!';
      }
      else {
        document.querySelector('#results h1').innerHTML = `You have ${rightAnswerCounter} right answers`;  
      }
    }
  }));
}
