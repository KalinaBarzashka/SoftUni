function loadRepos() {
	let username = document.getElementById("username");
	let value = username.value;

	let idResult = document.querySelector('#repos');
	
	let url = `https://api.github.com/users/${value}/repos`;
	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			idResult.innerHTML = "";
			let array = JSON.parse(xhr.responseText);

			for (let i = 0; i < array.length; i++) {
				let li = document.createElement('li');
				let a = document.createElement('a');
				a.href = array[i].html_url;
				a.textContent = array[i].full_name;
				li.appendChild(a);
				idResult.appendChild(li);
			}
		}
	};
	xhr.open("GET", url);
	xhr.send();
}