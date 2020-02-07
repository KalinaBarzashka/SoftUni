function attachEventsListeners() {
    let inputOutputFields = document.querySelectorAll('[type="text"]');
    let days = inputOutputFields[0];
    let hours = inputOutputFields[1];
    let minutes = inputOutputFields[2];
    let seconds = inputOutputFields[3];

    let buttons = document.querySelectorAll('[type="button"]');
    
    Array.from(buttons).map(x => x.addEventListener('click', (e) => {
        let currentButton = e.currentTarget;
        
        let currentParent = currentButton.parentNode;
        let currentInputField = currentParent.children[1];
        let value = currentInputField.value;
        let id = currentInputField.id;
        
        if(id == 'days') {
            hours.value = value * 24;
            minutes.value = value * 1440;
            seconds.value = value * 86400;
        } else if(id == 'hours') {
            days.value = value / 24;
            minutes.value = value * 60;
            seconds.value = value * 3600;
        } else if(id == 'minutes') {
            days.value = value / 1440;
            hours.value = value / 60;
            seconds.value = value * 60;
        } else if(id == 'seconds') {
            days.value = value / 86400;
            hours.value = value / 3600;
            minutes.value = value / 60;
        }
    }));
}