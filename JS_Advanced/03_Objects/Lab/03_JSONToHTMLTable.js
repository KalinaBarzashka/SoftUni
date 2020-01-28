function main(input){
  String.prototype.htmlEscape = function(){
    return this.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
  };

  let parsedInput = JSON.parse(input);
  let html = "<table>\n   <tr>";

  for (const key in parsedInput[0]) {
    html += `<th>${key}</th>`;
  }
  html += "</tr>\n";

  for (let i = 0; i < parsedInput.length; i++) {
    let obj = parsedInput[i];
    html += "   <tr>";
    for (const key in obj) {
      html += `<td>${obj[key].toString().htmlEscape()}</td>`;
    }
    html += `</tr>\n`;
  }

  html += "</table>";
  console.log(html);
}