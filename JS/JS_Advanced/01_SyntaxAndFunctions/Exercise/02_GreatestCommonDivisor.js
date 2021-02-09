function main(a, b)
{
  if(a == 0)
  {
    console.log(b);
  }
  else if(b == 0)
  {
    console.log(a);
  }
  else
  {
    while(b)
    {
      let t = b;
      b = a % b;
      a = t;
    }

    console.log(a);
  }
}