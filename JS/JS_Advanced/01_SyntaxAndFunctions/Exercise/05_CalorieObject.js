function main(args)
{
  let s = "{ ";
  for(let i = 0; i < args.length; i += 2)
  {
    if(i == args.length - 2)
    {
      s += `${args[i]}: `;
      s += args[i + 1];
      break;
    }

    s += `${args[i]}: `;
    s += args[i + 1] + ", ";
  }

  s += " }"

  console.log(s);
}