function main(args)
{
  let speed = Number(args[0]);
  let area = args[1];
  let limit = 0;

  if(area == "motorway")
  {
    limit = 130;
  }
  else if(area == "interstate")
  {
    limit = 90;
  }
  else if(area == "city")
  {
    limit = 50;
  }
  else if(area == "residential")
  {
    limit = 20;
  }

  if(speed > limit)
  {
    let diff = speed - limit;
    if(diff <= 20)
    {
      console.log("speeding");
    }
    else if(diff <= 40)
    {
      console.log("excessive speeding");
    }
    else
    {
      console.log("reckless driving");
    }
  }
}

main([120, "interstate"]);