function focus() {
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', (e) => {
            e.currentTarget.parentNode.setAttribute('class', 'focused');
        });
    }

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', (e) => {
            e.currentTarget.parentNode.removeAttribute('class');
        });
    }
}