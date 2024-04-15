let actorID = 'nm0000148'
let movieID = 'tt4154796'

const actorUrl = `https://moviesminidatabase.p.rapidapi.com/actor/id/${actorID}/awards/`;
const actorOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c58060c3f1mshc051cb3c128920bp1e185ejsn099f1601ded4',
		'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com'
	}
};


const actorTest = function () {
    fetch(actorUrl, actorOptions)
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

const movieTest = function () {
    fetch(movieUrl, movieOptions)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                        console.log(data);
                    })
            }
        })
}


actorTest()
movieTest()