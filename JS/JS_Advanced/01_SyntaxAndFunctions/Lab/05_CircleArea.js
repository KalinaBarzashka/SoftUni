function main(arg)
{
  let type = typeof(arg);
  let result;

  if(type == 'number')
  {
    result = Math.PI * arg * arg;
    console.log(result.toFixed(2));
  }
  else
  {
    console.log(`We can not calculate the circle area, because we receive a ${type}.`);
  }
}