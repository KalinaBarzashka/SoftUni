function main(args) {
  let mySet = new Set();
  for (let i = 0; i < args.length; i++) {
    let username = args[i];
    mySet.add(username);
  }

  let result = Array.from(mySet).sort(function (a, b){
    if(a.length > b.length) {
      return 1;
    }
    else if(a.length < b.length) {
      return -1;
    }
    else {
      return a.localeCompare(b);
    }
  });
  
  console.log(result.join('\n'));
}

main(['Ashton',
'Kutcher',
'Ariel',
'Lilly',
'Keyden',
'Aizen',
'Billy',
'Braston']
);