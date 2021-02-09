function result(name, age, weight, height) {
  let obj = {};

  let personalInfoObj = {
    age: age,
    weight: weight,
    height: height
  };
  let bmi = Math.round(weight / (height / 100 * height / 100));
  let status = "";

  if(bmi < 18.5) {
    status = "underweight";
  }
  else if(bmi < 25) {
    status = "normal";
  }
  else if(bmi < 30) {
    status = "overweight";
  }
  else {
    status = "obese";
  }

  obj['name'] = name;
  obj['personalInfo'] = personalInfoObj;
  obj['BMI'] = bmi;
  obj['status'] = status;

  if(status == "obese") {
    obj['recommendation'] = 'admission required';
  }

  return obj;
}


var chart = result('Peter', 29, 75, 182);