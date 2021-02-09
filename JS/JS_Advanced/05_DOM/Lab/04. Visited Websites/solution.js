function solve() {
  let siteElements = document.getElementsByClassName('link-1');
  
  for (let i = 0; i < siteElements.length; i++) {
    const element = siteElements[i];
    element.addEventListener('click', (e) => {
      let currentTarget = e.currentTarget;
      let p = currentTarget.getElementsByTagName('p')[0];
      
      let times = p.textContent.split(" ")[1];
      times++;
      p.textContent = `visited ${times} times`;
    });
  }
}