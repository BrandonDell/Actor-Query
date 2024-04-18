// let actorID = 'nm0000148';
let actorID;

const actorOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
    'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
  },
};
// function to save API search in localStorage
const saveApiSearch = async function (actorID, actorName) {
  console.log('In this function:', actorName);
  let apiSearchHistory = JSON.parse(localStorage.getItem('apiSearchHistory')) || [];
  apiSearchHistory.push({ id: actorID, name: actorName });
    localStorage.setItem('apiSearchHistory', JSON.stringify(apiSearchHistory));
};

const showHistoty() {
    let apiSearchHistory = JSON.parse(localStorage.getItem('apiSearchHistory')) || [];
    console.log('In the function show history == ', apiSearchHistory);
    console.log(apiSearchHistory[0]);
    const historySection = document.getElementById('history');
    // creat element
    let cityEl = document.createElement('button');
    // git content to element
    cityEl.textContent = apiSearchHistory[0];
    // add to the history section
    historySection.appendChild(cityEl),
}

buttonEl.addEventListener('click', function (event) {
    event.preventDefault();
    //input tags and textarea tags
    let userCity = document.getElementById('search-input');
    //console.log('This is the user input value of city  = ', userCity.value);
    //getGeo(userCity.value);
    saveHistory(userCity.value);
  });


// saveApiSearch(33445566, 'Brad');
// let actorId = 'nm0000148';
// let actorName = 'Harrison Ford';

// saveAPISearch(actorId, actorName);

// const getFavorites = async function (actorID) {
//     const awardsUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorID}/awards/`;
//     const response = await fetch(awardsUrl, actorOptions);
//     if (response.ok) {
//       const data = await response.json();
//     //   todo: get title of move instead of count from awards
//         return data.movie.title;
//     }
// };

const printActorInfo = async (actorID) => {
    const movieAward = await getFavorites(actorID);
    console.log('print', movieAward);
    // get the section element
    const favoritesSection = document.getElementById('favorites');
    // empty the contents of favorites
    favoritesSection.innerHTML = '';

    let newChild =
    '<div><h3>' +
    actorName +
    '</h3><p>Awards ' +
    movieAward +
    '</p><p>Movies ' +
    movieCount +
    '</p></div>';
  //  Insert the new content
  favoritesSection.insertAdjacentHTML('beforeend', newChild);
};
// getFavorites()
