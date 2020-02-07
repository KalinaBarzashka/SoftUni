function growingWord() {
  let exercise = document.getElementById('exercise');
  let p = exercise.getElementsByTagName('p')[0];
  //size
  let currentFontSize = p.style.fontSize;
  if(currentFontSize == "") {
    p.style.fontSize = '2px';
  } else {
    let size = Number(currentFontSize.substring(0, currentFontSize.length - 2));
    console.log(size);
    p.style.fontSize = (size * 2) + 'px';
  }

  //color
  let currentColor = p.style.color;
  if(currentColor == "") {
    p.style.color = "blue";
  }
  else if(currentColor == "blue") {
    p.style.color = "green";
  }
  else if(currentColor == "green") {
    p.style.color = "red";
  }
  else if(currentColor == "red") {
    p.style.color = "blue";
  }
}