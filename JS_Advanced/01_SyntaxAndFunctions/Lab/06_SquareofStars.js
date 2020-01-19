function main(size)
{
  let output = "";
  if(size == undefined)
  {
    size = 5;
  }

  for(let i = 0; i < size; i++)
  {
    for(let j = 0; j < size; j++)
    {
      output += "* ";
    }
    output += "\n";
  }

  console.log(output);
}

main(3);