const actorInfoOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
    'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
  },
};
// get movie count
const getActorMovieCount = async function (actorInfoID) {
  const movieUrl = `https://moviesminidatabase.p.rapidapi.com/movie/byActor/${actorInfoID}/`;
  const response = await fetch(movieUrl, actorOptions);
  if (response.ok) {
    const data = await response.json();
    return data.count;
  }
};

// get awards count
const getActorAwardCount = async function (actorInfoID) {
  const awardsUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorInfoID}/awards/`;
  const response = await fetch(awardsUrl, actorInfoOptions);
  if (response.ok) {
    const data = await response.json();
    return data.count;
  }
};

// get actor bio
// the URL is constructed using template literal string and makes a asynchronous HTTP request using the fetch function
const getActorBio = async function (actorInfoID) {
  //   Contructs the URL using the API endpoints
  const actorUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorInfoID}/bio/`;
  
    // response handling if the API is successful it reads a response body as JSON using response.json (asynchronos operation), so it awaits the JSON parsing
  const response = await fetch(actorUrl, actorInfoOptions);
  if (response.ok) {
    const data = await response.json();
    
      // data Extraction. it extracts the actor's name from the JSON data in which the actor object retrieves the name property
    return data.results.actor.name;
  }
};
// asynchronous function that retrieves and prints info by using actorInfoID as the unique identifier
// 
const printActorInfo = async (actorInfoID) => {
  const actorName = await getActorBio(actorInfoID);
  console.log('print', actorName);

  const movieAward = await getActorAwardCount(actorInfoID);
  console.log('print', movieAward);

  const movieCount = await getActorMovieCount(actorInfoID);
  console.log('print', movieCount);

  // Get the section element
  const actorInfoSection = document.getElementById('actor-info');
  //   Empty the contents of actor-info
  actorInfoSection.innerHTML = '';

  let newChild =
    '<div><h3>' +
    actorName +
    '</h3><p>Awards ' +
    movieAward +
    '</p><p>Movies ' +
    movieCount +
    '</p></div>';
  //  Insert the new content
  actorInfoSection.insertAdjacentHTML('beforeend', newChild);
};

getActorMovieCount();
getActorAwardCount();
getActorBio();
printActorInfo()
