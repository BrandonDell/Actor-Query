const saveHistory = async function (actor) {
  console.log('In this function:', actor);
  let apiSearchHistory = JSON.parse(localStorage.getItem('apiSearchHistory')) || [];
  apiSearchHistory.push(actor);
    localStorage.setItem('apiSearchHistory', JSON.stringify(apiSearchHistory));
    showHistory();
}
// function to show history
const showHistory = async function () {
    let apiSearchHistory = JSON.parse(localStorage.getItem('apiSearchHistory')) || [];
    console.log('In the function show history == ', apiSearchHistory);
    const actorInfoSection = document.getElementById('favorites');
  //   Empty the contents of actor-info
  actorInfoSection.innerHTML = '';
  
  
  for(let i = 0; i < apiSearchHistory.length; i++) {
    let obj = apiSearchHistory[i];
    let title = document.createElement("button");
    title.classList.add("btn")
    title.classList.add("btn-blue")
    title.textContent = obj.name
    console.log(obj);
    console.log(title);
    actorInfoSection.appendChild(title)
  }
}
showHistory();
