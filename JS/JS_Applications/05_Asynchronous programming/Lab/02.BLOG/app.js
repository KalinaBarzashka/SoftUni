function attachEvents() {
    let loadBtn = document.getElementById('btnLoadPosts');
    let viewBtn = document.getElementById('btnViewPost');
    let url = 'https://blog-apps-c12bf.firebaseio.com/posts.json';
    let posts = document.getElementById('posts');

    loadBtn.addEventListener('click', displayBlogPosts);
    viewBtn.addEventListener('click', viewBlogPost);

    function displayBlogPosts() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.status == 200 && xhr.readyState == 4) {
                let data = JSON.parse(xhr.responseText);
                posts.innerText = "";
                
                for (const key in data['-M2Tz_NtAu9db4j_ZFqT']) {
                    let option = document.createElement('option');
                    option.value = key;
                    option.innerText = data['-M2Tz_NtAu9db4j_ZFqT'][key].title;

                    posts.appendChild(option);
                }
            }
        };
        xhr.open("GET", url);
        xhr.send();
    }

    function viewBlogPost() {

    }
    
}

attachEvents();