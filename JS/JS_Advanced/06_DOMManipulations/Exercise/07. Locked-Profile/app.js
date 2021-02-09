function lockedProfile() {
    let buttons = document.querySelectorAll('button');
    Array.from(buttons).map(x => x.addEventListener('click', (e) => {
        let parent = e.currentTarget.parentNode;
        let information = parent.getElementsByTagName('div')[0];
        let locked = parent.querySelectorAll('[type="radio"]')[0];

        if(locked.checked == false && e.currentTarget.textContent == 'Show more') {
            e.currentTarget.textContent = 'Hide it'
            information.style.display = 'block';
        } else if(locked.checked == false && e.currentTarget.textContent == 'Hide it') {
            e.currentTarget.textContent = 'Show more'
            information.style.display = 'none';
        }
    }));
}