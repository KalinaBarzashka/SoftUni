function solve() {
    //background-color: rgb(114, 112, 112);
    //border-color:black;
    //color: white;

    let styleButton = document.querySelector("#dropdown");
    styleButton.addEventListener('click', function(e) {
        let box = document.querySelector("#box");
        let menu = document.querySelector("#dropdown-ul");
        
        if(menu.getAttribute('style') == 'display: none' || menu.getAttribute('style') == null) {
            menu.setAttribute('style', 'display: block');
        } else {
            menu.setAttribute('style', 'display: none');
            box.setAttribute('style', 'background-color: rgb(114, 112, 112)');
            box.setAttribute('color', 'white');
            box.setAttribute('border-color', 'black');
        }

        let lis = Array.from(menu.getElementsByTagName('li')).map(x => x.addEventListener('click', function(e) {
            let currentBox = e.currentTarget;
            let attr = `background-color: ${currentBox.textContent}`;
            box.setAttribute('style', attr);
            box.setAttribute('color', 'black');
        }));
    });
}