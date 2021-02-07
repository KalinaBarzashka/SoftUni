let handlebars = require('handlebars');

//demo one
handlebars.registerPartial('contact', '<li>{{name}}: {{email}}</li>');

var template = handlebars.compile('Hello, my name is {{name}} {{familyName}}!');

console.log(template({
  name: 'Kalina',
  familyName: 'Barzashka'
}));

var templateTwo = handlebars.compile('<ul id="contacts">\
  {{#each contacts}}\
    {{> contact}}\
    {{else}} <i>(empty)<i>\
    {{/each}}\
  </ul>');

let context = {contacts: [
  {name: 'Pesho', email: 'pesho@abv.bg'},
  {name: 'Kalina', email: 'kalina.barzashka@gmail.com'}
]};

console.log(templateTwo(context));

//demo two
let moment = require('moment'); //not installed - npm install moment
handlebars.registerHelper('date', function(now) {
  return moment(now).format('DD.MM.YYYY г. HH:mm');
});

let templateThree = handlebars.compile('Hello, my name is {{name}} and today is {{date today}}.');

let data = {
  name: 'Gosho',
  today: new Date()
};

console.log(templateThree(data));