class TemplateEngine {
  constructor(start, end) {
    this.startDelimiter = start;
    this.endDelimiter = end;
    this.searchedStr = `${this.startDelimiter}?([A-Za-z]+)${this.endDelimiter}`;
  }

  compile(template) { //handlebars compiles templates before we can use them, so we do the same
    var searchExp = new RegExp(this.searchedStr);

    return function(obj) { //obj a.k.a. data
      var match;
      var result = template;

      while(match = searchExp.exec(result)) {
        result = result.replace(match[0], obj[match[1]]);
      }

      return result;
    };
  }
}

//without class

let myTemplateEngine = (function() {
  var startDelimiter = '{{';
  var endDelimiter = '}}';
  var searchedStr = `${startDelimiter}?([A-Za-z]+)${endDelimiter}`;//capture group

  var setDelimiters = function(start, end) {
    startDelimiter = start || startDelimiter;
    endDelimiter = end || endDelimiter;
    searchedStr = `${startDelimiter}?([A-Za-z]+)${endDelimiter}`;
  }

  var compile = function(template) { //handlebars compiles templates before we can use them, so we do the same
    var searchExp = new RegExp(searchedStr);

    return function(obj) { //obj a.k.a. data
      var match;
      var result = template;

      while(match = searchExp.exec(result)) {
        result = result.replace(match[0], obj[match[1]]);
      }

      return result;
    };
  };

  return {
    compile: compile,
    setDelimiters: setDelimiters
  };
}());

var template = myTemplateEngine.compile('Hello, my name is {{name}} {{familyName}}!');
myTemplateEngine.setDelimiters('@@', '@@');
console.log(template({
  name: 'Pesho',
  familyName: 'Petrov'
})); //printed correctly

var newTemplate = myTemplateEngine.compile('Hello from new @@name@@!');
console.log(newTemplate({name: 'blabla'}));