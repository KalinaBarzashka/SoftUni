function main(input){

  String.prototype.htmlEscape = function(){
    return this.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
  };

  let parsedInput = JSON.parse(input);
  let html = '<table>\n  <tr><th>name</th><th>score</th></tr>\n';

  for (const data of parsedInput) {
    html += `  <tr><td>${data.name.htmlEscape()}</td><td>${data.score}</td></tr>\n`;
  }

  html += '</table>';
  return html;
}

main([{"name":"Pesho","score":479},{"name":"Gosho","score":205}]);
main([{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]);
main([{"name":"Stamat Stamatov","score":387},{"name":"Penka","score":500}]);
main([{"name":"Pencho Penchev","score":0},{"name":"<script>alert(\"Wrong!\")</script>","score":1}]);
main([{"name":"<div>a && 'b'</div>","score":111},{"name":"Jichka Jochkova","score":-50}]);