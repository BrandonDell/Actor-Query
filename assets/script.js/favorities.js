// function to save API search in localStorage
const saveHistory = async function (actorID, actorName) {
  console.log('In this function:', actorName);
  let apiSearchHistory = JSON.parse(localStorage.getItem('apiSearchHistory')) || [];
  apiSearchHistory.push({ id: actorID, name: actorName });
    localStorage.setItem('apiSearchHistory', JSON.stringify(apiSearchHistory));
    await showHistory();
}
// function to show history
const showHistory = async function () {
    let apiSearchHistory = JSON.parse(localStorage.getItem('apiSearchHistory')) || [];
    console.log('In the function show history == ', apiSearchHistory);
    console.log(apiSearchHistory[0]);
    const historySection = document.getElementById('history');
    // creat element
    let cityEl = document.createElement('button');
    // git content to element
    cityEl.textContent = apiSearchHistory[0];
    // add to the history section
    historySection.appendChild(cityEl);
}

