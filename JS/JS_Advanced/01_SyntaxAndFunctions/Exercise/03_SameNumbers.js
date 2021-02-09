function main(n)
{
  let sum = 0;
  let firstDigit = 0;
  let same = true;

  for(let i = 0; i < n.toString().length; i++)
  {
    sum += Number(n.toString()[i]);
    if(i == 0)
    {
      firstDigit = n.toString()[i];
      continue;
    }

    if(firstDigit.toString() != n.toString()[i])
    {
      same = false;
    }
  }

  console.log(same);
  console.log(sum);
}