function getArticleGenerator(articles) {
  let arrArticles = [...articles];
  let currentArticle = 0;
  let idContent = document.getElementById('content');

  return function() {
    if (currentArticle >= arrArticles.length) { return; }
    let article = arrArticles[currentArticle];
    currentArticle++;

    let resultElement = document.createElement('article');
    resultElement.innerHTML = article;
    idContent.appendChild(resultElement);
  }
}