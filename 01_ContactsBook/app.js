(function() {

  const getTemplateString = (name) => {
    return document.getElementById(name).innerHTML;
  }

  const getTemplateFunc = (name) => {
    const templateString = getTemplateString(name);
    return Handlebars.compile(templateString);
  }

  const cardTemplate = getTemplateString("card-template");
  Handlebars.registerPartial("card", cardTemplate);

  const cardsListFunc = getTemplateFunc("cards-list-template");

  document.getElementById("contacts").innerHTML = cardsListFunc({ contacts })
 
}());