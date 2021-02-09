function solve(){
   let articleSection = document.getElementsByTagName("section")[1];
   let archiveSection = document.getElementsByClassName("archive-section")[0];
   
   let archiveSectionArr = [];

   let createBtn = document.getElementsByClassName("btn create")[0];
   createBtn.addEventListener("click", function(e){
      e.preventDefault();
      
      let creatorEl = document.getElementById("creator");
      let titleEl = document.getElementById("title");
      let categoryEl = document.getElementById("category");
      let contentEl = document.getElementById("content");
      let creatorVal = creatorEl.value;
      let titleVal = titleEl.value;
      let categoryVal = categoryEl.value;
      let contentVal = contentEl.value;

      creatorEl.value = "";
      titleEl.value = ""
      categoryEl.value = "";
      contentEl.value = "";

      let article = document.createElement('article');
      let h1 = document.createElement('h1'); 
      h1.textContent = titleVal;

      let pCategory = document.createElement('p');
      let strong1 = document.createElement('strong');
      strong1.textContent = categoryVal;
      pCategory.innerHTML = `Category:`;
      pCategory.appendChild(strong1);

      let pCreator = document.createElement('p');
      let strong2 = document.createElement('strong');
      strong2.textContent = creatorVal;
      pCreator.innerHTML = `Creator:`;
      pCreator.appendChild(strong2);

      let pContent = document.createElement('p');
      pContent.innerHTML = contentVal.trim();

      let buttons = document.createElement('div');
      buttons.setAttribute('class', 'buttons');

      let deleteBtn = document.createElement('button');
      deleteBtn.setAttribute('class', 'btn delete');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', function(e) {
         e.preventDefault();

         let deleteBtnParent = e.currentTarget.parentElement.parentElement.parentElement;
         let deleteBtnChild = e.currentTarget.parentElement.parentElement;
         deleteBtnParent.removeChild(deleteBtnChild);
      });

      let archiveBtn = document.createElement("button");
      archiveBtn.setAttribute("class", "btn archive");
      archiveBtn.textContent = "Archive";
      archiveBtn.addEventListener("click", function(e) {
         e.preventDefault();

         let archiveBtnChild = e.currentTarget.parentElement.parentElement;
         let archiveBtnTitle = archiveBtnChild.getElementsByTagName("h1")[0];
         archiveSectionArr.push(archiveBtnTitle.textContent);

         archiveSectionArr.sort(function(a, b) {
            return a.localeCompare(b);
         })

         archiveSectionH2 = document.createElement("h2");
         archiveSectionH2.textContent = "Archive";
        
         let archiveSectionUl = document.createElement("ul");
         for (let i = 0; i < archiveSectionArr.length; i++) {
            archiveSectionLi = document.createElement("li");
            archiveSectionLi.textContent = archiveSectionArr[i];
            archiveSectionUl.appendChild(archiveSectionLi);
         }

         archiveSection.innerHTML = archiveSectionH2.outerHTML + archiveSectionUl.outerHTML;

         // delete article functionality
         let deleteBtnParent = e.currentTarget.parentElement.parentElement.parentElement;
         let deleteBtnChild = e.currentTarget.parentElement.parentElement;
         deleteBtnParent.removeChild(deleteBtnChild);

      });

      article.appendChild(h1);
      article.appendChild(pCategory);
      article.appendChild(pCreator);
      article.appendChild(pContent);

      buttons.appendChild(deleteBtn);
      buttons.appendChild(archiveBtn);
      article.appendChild(buttons);

      articleSection.appendChild(article);
      // console.log(pCategory);
      // console.log(pCreator);
      // console.log(pContent);
     
   });

}