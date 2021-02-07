// const url = 'https://restcountries.eu/rest/v2/all';

// fetch(url)
//   .then((r) => r.json())
//   .then((d) => console.log(d))
//   .catch((e) => console.dir(e));

const elements = {
  loadBtn: document.querySelector('#btnLoadTowns'),
  countriesWrapper: document.querySelector('#root')
}

elements.loadBtn.addEventListener('click', function() {

  Promise.all([ //array of promises
    fetch('https://restcountries.eu/rest/v2/all').then((r) => r.json()),
    fetch('./template.hbs').then((r) => r.text())
    
  ])
  .then(([countriesData, templateHbs]) => {
    const template = Handlebars.compile(templateHbs);
    const resultHtml = template({countries: countriesData}); //EcmaS6 => ако в then ни е подадено countries може да запишем template({ countries }); - short синтаксис
    elements.countriesWrapper.innerHTML = resultHtml;
  }); 
});