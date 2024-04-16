const movieList = document.getElementById('movie-list')
const actorString = 'harrison ford'
let movieID = 'tt4154796'
let actorData = {
    actorId:{},
    actorAwards:{},
    actorMovies:{}
};
let movieData = {}



const actorOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
        'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
    }
};

const fetchActorId = function () {
    const actorIDUrl = `https://moviesminidatabase.p.rapidapi.com/actor/imdb_id_byName/${actorString}/`;
    fetch(actorIDUrl, actorOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        actorData.actorId = data.results[0].imdb_id
                        fetchActorAwards(data.results[0].imdb_id)
                    });
            }
        })
}

const fetchActorAwards = function (actorId) {
    const actorAwardsUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorId}/awards/`;
    fetch(actorAwardsUrl, actorOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        actorData.actorAwards = data
                        fetchActorMovies(actorId)
                    })
            }
        })
}

const fetchActorMovies = function(){
    const actorMoviesUrl = 'https://moviesminidatabase.p.rapidapi.com/movie/byActor/nm0000148/';
    fetch(actorMoviesUrl, actorOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        actorData.actorMovies = data
                        console.log(actorData)
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
                        
                    })
            }
        })
}

const printMovie = function (data) {

}

fetchActorId()



