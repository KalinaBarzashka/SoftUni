function main(day)
{
  let result;
  if(day == "Monday")
  {
    result = 1;
  }
  else if(day == "Tuesday")
  {
    result = 2;
  }
  else if(day == "Wednesday")
  {
    result = 3;
  }
  else if(day == "Thursday")
  {
    result = 4;
  }
  else if(day == "Friday")
  {
    result = 5;
  }
  else if(day == "Saturday")
  {
    result = 6;
  }
  else if(day == "Sunday")
  {
    result = 7;
  }
  else{
    result = "error";
  }

  console.log(result);
}