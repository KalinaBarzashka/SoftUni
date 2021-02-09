//with Fetch API
function loadCommits() {
    //get data
    let username = document.getElementById('username');
    let repo = document.getElementById('repo');

    let usernameValue = username.value;
    let repoValue = repo.value;

    const container = document.getElementById('commits');

    container.innerText = '';

    //load commits
    //fetch returns promise
    fetch(`https://api.github.com/repos/${usernameValue}/${repoValue}/commits`)
    .then((response) => {
        if(response.status < 400) {
            return response.json();
        }

        throw({
            status: response.statusText,
            statusText: response.statusText
        });
    })
    .then((data) => {
        data.forEach(element => {
            let li = document.createElement('li');
            li.innerText = `${element.commit.author.name}: ${element.commit.message}`;
            container.appendChild(li);
        });
    })
    .catch((err) => {
        let li = document.createElement('li');
        li.innerText = `Error: ${err.status} (${err.statusText})`;
        container.appendChild(li);
    });
}

//async / await
async function aa() {
    let username = document.getElementById('username');
    let repo = document.getElementById('repo');

    let usernameValue = username.value;
    let repoValue = repo.value;

    const container = document.getElementById('commits');

    container.innerText = '';

    try {
        let response = await fetch(`https://api.github.com/repos/${usernameValue}/${repoValue}/commits`);

        if(response.status < 400) {
            let data = await response.json();
            data.forEach(element => {
                let li = document.createElement('li');
                li.innerText = `${element.commit.author.name}: ${element.commit.message}`;
                container.appendChild(li);
            });
        } else {
            throw({
                status: response.statusText,
                statusText: response.statusText
            });
        }
    } catch(err) {
        let li = document.createElement('li');
        li.innerText = `Error: ${err.status} (${err.statusText})`;
        container.appendChild(li);
    }
}