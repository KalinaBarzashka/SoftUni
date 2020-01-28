function main(args){
  html = "<table>\n";
  String.prototype.htmlEscape = function(){
    return this.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
  };

  for (let i = 0; i < args.length; i++) {
    let data = JSON.parse(args[i]);
    let name = data.name;
    let position = data.position;
    let salary = Number(data.salary);

    html += `\t<tr>\n\t\t<td>${name.htmlEscape()}</td>\n\t\t<td>${position.htmlEscape()}</td>\n\t\t<td>${salary}</td>\n\t</tr>\n`;
  }

  html += "</table>";
  console.log(html);
}

main(['{"name":"Pesho","position":"Promenliva","salary":100000}',
'{"name":"Teo","position":"Lecturer","salary":1000}',
'{"name":"Georgi","position":"Lecturer","salary":1000}']
);