(async () => {
    Handlebars.registerPartial(
        'cat', 
        await fetch('./singleCatTemplate.hbs').then((r) => r.text())
    );

    const templateSrc = await fetch('./allCatsTemplate.hbs').then((r) => r.text());
    const template = Handlebars.compile(templateSrc);

    const resultHtml = template({ cats: cats });

    document.querySelector('section#allCats').innerHTML = resultHtml;

    document.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', () => {
            const parent = btn.parentNode;
            const statusDiv = parent.querySelector('div.status');
            const  { display } = statusDiv.style;

            if(display === "none") {
                btn.textContent = "Hide status code";
                statusDiv.style.display = "block";
            } else {
                btn.textContent = "Show status code";
                statusDiv.style.display = "none";
            }
        });
    });
})();
