const actorID = 'nm0000158';
const movieID = 'tt4154796';

const actorUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorID}/awards/`;
const actorOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
};

const movieUrl = `https://movie-database-alternative.p.rapidapi.com/?r=json&i=${movieID}`;
const movieOptions = {
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

    
};

const openModal = function(){
    modal.style.display = 'block';
};

window.addEventListener('click', function(event){
    if(event.target == modal) {
        openModal();
    }
})
// Function to close the modal
const closeModal = function() {
    modal.style.display = 'none';
};


// Event listener for clicking outside the modal to close it
// window.addEventListener('click', function(event) {
//     if (event.target == modal) {
//         closeModal();
//     }
// });


const getActorApi = function (movieData) {
    fetch(actorUrl, actorOptions)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (actorData) {
            console.log(actorData);
            displayMovieInModal(movieData, actorData);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
}; 

const getMovieApi = function () {
    fetch(movieUrl, movieOptions)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (data) {
            // Display movie data in modal
            // displayMovieInModal(data);
            getActorApi(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
};



const modalClicked = function () {
    // Fetching data separately for movie and actor
    getMovieApi();
};

getMovieApi();
