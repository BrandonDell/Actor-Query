let actorModalID = '';
// let movieModalID = '';


const actorModalOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
};


const movieModalOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
};

// Get modal elements
const modal = document.getElementById('default-modal');
const modalTitle = document.getElementById('movieTitle');
const modalYear = document.getElementById('year');
const modalRated = document.getElementById('rated');
const modalBoxOffice = document.getElementById('boxOffice');
const modalPoster = document.getElementById('moviePoster');
const modalPlot = document.getElementById('plot');
const modalRatingName = document.getElementById('ratingName');
const modalRatedScore = document.getElementById('score');

const modalActor = document.getElementById('actor');
const modalAwards = document.getElementById('awards');

// Function to display movie data in modal
const displayMovieInModal = function(movieData, actorData) {
    modalTitle.textContent = movieData.Title;
    modalYear.textContent = movieData.Year;
    modalRated.textContent = movieData.Rated;
    modalBoxOffice.textContent = movieData.BoxOffice;
    modalPoster.src = movieData.Poster;
    modalPlot.textContent = movieData.Plot;
    modalRatingName.textContent = movieData.Ratings[1].Source;
    modalRatedScore.textContent = movieData.Ratings[1].Value;

    modalActor.textContent = actorData.results[0].actor[0].name;
    modalAwards.textContent = actorData.results[0].award;

    // modal.style.display = 'none';
};

const modalListener = function(event){
    console.log("clicking card");
    //if(event.target.matches('#movieCard')){
    const movieData = event.target.dataset.movieid;
    const actorIdData = event.target.dataset.actorId;
    const awardActorData = event.target.dataset.awardId;
    console.log("clicking card",  movieData);
        if (movieData) {
            movieModalID = movieData
            actorModalID = actorIdData
            awardModalID = awardActorData
           
            modalClicked(movieModalID,awardModalID,actorModalID);
    
            
        } ;
//};
}

// Function to close the modal
const closeModal = function() {
    modal.style.display = 'none';
};

// Event listener for clicking outside the modal to close it
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        console.log('close modal')
        closeModal();
    }
});

// Fetch actor data and display in modal
const getActorApi = function (movieData) {
    const actorModalUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorModalID}/awards/`;
    console.log(movieData)
        fetch(actorUrl, actorModalOptions)
        .then(function (response) {
            console
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function (actorData) {
            displayMovieInModal(movieData, actorData);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}; 

// Fetch movie data and then fetch actor data
const getMovieApi = function (movieModalID) {
    const movieModalUrl = `https://movie-database-alternative.p.rapidapi.com/?r=json&i=${movieModalID}`;
    console.log(movieModalUrl);
    fetch(movieModalUrl, movieModalOptions)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function (data) {
            getActorApi(data);
            modal.style.display = 'block';
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
};

// Function to be called when the modal is clicked
const modalClicked = function (movieModalID) {
    console.log("modalClicked");
    getMovieApi(movieModalID);
};

const modalPopup = document.getElementById('movie-list'); 
console.log("modal button", modalPopup);
    modalPopup.addEventListener('click', modalListener);
 



