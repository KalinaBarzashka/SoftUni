import { monkeys } from './monkeys.js'; //monkeys as m -> преименуваме променливата

(async() => {
    Handlebars.registerPartial(
        'monkey',
         await fetch('./monkeyTemplate.hbs').then((r) => r.text())
    );
    
    let templateSrc = await fetch('./monkeysTemplate.hbs').then((r) => r.text());
    let template = Handlebars.compile(templateSrc);

    let resultHtml = template( { monkeys });

    document.querySelector('section').innerHTML += resultHtml;

    document.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', function() {
            let parentEl = btn.parentNode;
            let p = parentEl.querySelector('p');
            const { display } = p.style;
            if(display === 'none') {
                p.style.display = 'block';
            } else {
                p.style.display = 'none';
            }
        })
    });
})();