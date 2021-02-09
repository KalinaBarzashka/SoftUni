function main(args)
{
  let sum = 0;
  let inverseSum = 0;
  let concat = "";
  for(let i = 0; i < args.length; i++)
  {
    sum += args[i];
  }

  for(let i = 0; i < args.length; i++)
  {
    inverseSum += 1 / args[i];
  }

  for(let i = 0; i < args.length; i++)
  {
    concat += args[i];
  }

  console.log(sum);
  console.log(inverseSum);
  console.log(concat);
  
}