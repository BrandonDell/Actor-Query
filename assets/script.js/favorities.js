// function to save API search in localStorage
// const formSubmitHandler = function (event) {
//   //prevent the page from refreshing after form submission
//   event.preventDefault();

//   //capitalize the actor collected form the form input
//   const actorString = userInput.value.trim()

//   //Actor Name value isn't empty, aka if  variable has a value
//   if (actorString) {
//       //call weather search function and pass it the city name
//       getActorIdName(actorString);

//       // clears search bar
//       actorInput.value = '';
//   //if city vairable is empty send an alert to the user to complete the form
//   } else {
//       alert('Please enter actors name');
//   }
// }
// for loop api search history  and append

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


  // let newChild =
  //   "<p>Test</p>";
    // '<div><h3>' +
    // actorName +
    // '</h3><p>Awards ' +
    // movieAward +
    // '</p><p>Movies ' +
    // movieCount +
    // '</p></div>';
  //  Insert the new content
  // actorInfoSection.insertAdjacentHTML('beforeend', newChild);
}
showHistory();
// //function to handle the past searched buttons 
// const searchHistoryHandler = function(event){
//   //retrieve data-content attribute after the click event, attribute value should be the city name
//   const city = event.target.getAttribute('data-content')
//   //if the city variable holds a value (if the data-content was recieved), run the weather search function with the city name
//   if (city){
//       weatherSearch(city)
//   }
// }