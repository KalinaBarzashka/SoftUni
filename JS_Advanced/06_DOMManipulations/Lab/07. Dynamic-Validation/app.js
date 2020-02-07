function validate() {
    const regex = /[a-z]+@[a-z]+.[a-z]+/gm;

    let emailInput = document.querySelector("#email");
    emailInput.addEventListener('change', (e) => {
        let valid = regex.test(e.currentTarget.value);
        if(valid == false) {
            emailInput.setAttribute('class', 'error');
        }
        else {
            emailInput.removeAttribute('class');
        }
    });
}