const movieList = document.getElementById('movie-list')
const userInput = document.getElementById('search-input')
const formButton = document.getElementById('submt')
let actorData = {
    actorId: {},
    actorAwards: {},
    actorMovies: {}
};
let movieData = {}
// let movieYear;


const formSubmitHandler = function (event) {
    //prevent the page from refreshing after form submission
    event.preventDefault();
    movieList.innerHTML = ''

    //capitalize the city collected form the form input
    const actorString = userInput.value.trim()

    //city value isn't empty, aka if city variable has a value
    if (actorString) {
        //call weather search function and pass it the city name
        fetchActorId(actorString);

        // clears search bar
        userInput.value = '';
    //if city vairable is empty send an alert to the user to complete the form   
    } else {
        alert('Please enter an actor.');
    }
};


const actorFetchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
};

const fetchActorId = function (actorString) {
    const actorIDUrl = `https://moviesminidatabase.p.rapidapi.com/actor/imdb_id_byName/${actorString}/`;
    fetch(actorIDUrl, actorFetchOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        actorData.actorId = data.results[0].imdb_id
                        fetchActorAwards(actorData.actorId)
                    });
            }
        })
}

const fetchActorAwards = function (actorId) {
    const actorAwardsUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorId}/awards/`;
    fetch(actorAwardsUrl, actorFetchOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        actorData.actorAwards = data.results
                        fetchActorMovies(actorId)
                    })
            }
        })
}

const fetchActorMovies = function (actorId) {
    const actorMoviesUrl = `https://moviesminidatabase.p.rapidapi.com/movie/byActor/${actorId}/`;
    fetch(actorMoviesUrl, actorFetchOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        actorData.actorMovies = data.results
                        assignAwardsToMovies()
                    })
            }
        })
}

const assignAwardsToMovies = function (){
    actorData.actorMovies.forEach(function (movieItem){
        actorData.actorAwards.forEach(function(awardItem){
            if(movieItem[0].imdb_id == awardItem.movie.imdb_id){
                movieItem[0].award = awardItem.award
                movieItem[0].type = awardItem.type
            }
        })

    })
    getMovieYear()
}


const movieFetchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
}

const getMovieYear = async function () {
    for (i = 0; i < actorData.actorMovies.length; i++) {
        const movieUrl = `https://movie-database-alternative.p.rapidapi.com/?r=json&i=${actorData.actorMovies[i][0].imdb_id}`
        const response = await fetch(movieUrl, movieFetchOptions)
        if (response.ok) {
            const data = await response.json()
            actorData.actorMovies[i][0].Year = data.Year
            actorData.actorMovies[i][0].Poster = data.Poster
        }
    }
    console.log(actorData)
    printMovie()
}



const printMovie = function () {
    for (i = 0; i < actorData.actorMovies.length; i++) {
        const movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'flex flex-wrap items-center flex-col justify-start w-20%')
        movieCard.setAttribute('id', 'movieCard')
        const movieImageEl = document.createElement('img');
        movieImageEl.setAttribute('data-movieId', actorData.actorMovies[i][0].imdb_id)
        const movieTitleEl = document.createElement('h4');
        movieTitleEl.setAttribute('class', 'text-wrap text-center')
        movieImageEl.setAttribute('data-actorId', actorData.actorId)
        // const movieYearEl = document.createElement('h4');
        const movieAwardsEl = document.createElement('h5');
        movieAwardsEl.setAttribute('class', 'text-wrap text-center')
        movieImageEl.setAttribute('data-awardId', actorData.actorMovies[i][0].award)

        movieImageEl.setAttribute('src', actorData.actorMovies[i][0].Poster)
        movieImageEl.setAttribute('id', 'movieListPoster')
        // movieImageEl.setAttribute('class', 'w-2/5')
        // movieImageEl.setAttribute('class', actorData.actorMovies[i][0].Posteroster)
        movieTitleEl.textContent = `${actorData.actorMovies[i][0].title}, ${actorData.actorMovies[i][0].Year}`
        if(actorData.actorMovies[i][0].type == 'Winner'){
            movieAwardsEl.textContent = `Winner of "${actorData.actorMovies[i][0].award}"`
        } else if (actorData.actorMovies[i].type == 'Nominee'){
            movieAwardsEl.textContent = `Noninated for "${actorData.actorMovies[i][0].award}"`
        } else{
            movieAwardsEl.textContent = ''
        }

        movieCard.appendChild(movieImageEl)
        movieCard.appendChild(movieTitleEl)
        movieCard.appendChild(movieAwardsEl)
        movieList.appendChild(movieCard)
    }
}

formButton.addEventListener('click', formSubmitHandler)


