const movieList = document.getElementById('movie-list')
const actorString = 'harrison ford'
let movieID = 'tt4154796'
let actorID = ''



const actorOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
};

const actorIDUrl = `https://moviesminidatabase.p.rapidapi.com/actor/imdb_id_byName/${actorString}/`;
const fetchActorID = function () {
    fetch(actorIDUrl, actorOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                        getActorAPI(data.results[0].imdb_id)
                        
                    })
            }
        })
}

const getActorAPI = function (actorID) {
    const actorAwardsUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorID}/awards/`;
    fetch(actorAwardsUrl, actorOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                    })
            }
        })
}






const movieUrl = `https://movie-database-alternative.p.rapidapi.com/?r=json&i=${movieID}`;
const movieOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
};

const getMovieAPI = function () {
    fetch(movieUrl, movieOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        // console.log(data);
                        // printMovie(data)
                    })
            }
        })
}

const printMovie = function (data) {

}

fetchActorID()
// getActorAPI()
// getMovieAPI()