let form = document.querySelector("form");
let moviename = document.querySelector("input");

form.onsubmit = (e) => {
    e.preventDefault()
    fetch("https://api.themoviedb.org/3/search/movie?api_key=9600d9a3bcd52f86c4f65924813b03bb&language=en-US&query=" + moviename.value + "&page=1&include_adult=false")

    .then((Response) => { return Response.json() })
    .then((showmovie) => {
        console.log(showmovie);
        displaymovie(showmovie.results)
    })
}

function displaymovie(moviedata) {
    let resultsdiv = document.querySelector("#results");
    resultsdiv.innerHTML=""
    if (moviedata.length === 0) {
        // const notfounddiv = document.createElement("div");
        // notfounddiv.classList.add("dataNotfound");
        // const notfound = document.createElement("img");
        // notfound.src = "https://www.rajasthanndaacademy.com/assets/images/no-record-found.png";
        // notfounddiv.append(notfound);
        // document.querySelector("#results").append(notfounddiv);

        let noMovieDiv = document.createElement("h2");
        noMovieDiv.innerHTML = "Nothing found by this name. Search something else...";
        resultsdiv.append(noMovieDiv);
    }

    else {
        resultsdiv.innerHTML = "";

        moviedata.forEach((movie) => {
            const moviediv = document.createElement("div");
            moviediv.classList.add("movie");
            const poster = document.createElement("img");
            const title = document.createElement("h3");

            poster.src = (movie.poster_path) ? "https://image.tmdb.org/t/p/original" + movie.poster_path : "no-poster-available.jpg";
            title.innerHTML = titlename(movie.original_title);

            fetch("https://api.themoviedb.org/3/movie/" + movie.id + "/videos?api_key=9600d9a3bcd52f86c4f65924813b03bb&language=en-US")
                .then((Response) => { return Response.json() })
                .then((result) => {
                    console.log(result.results);
                    if (result.results.length > 0 && findtrailer(result.results)) {
                        const trailerkey = findtrailer(result.results);
                        const anchor = document.createElement("a");
                        anchor.href = "https://youtube.com/embed/" + trailerkey;
                        anchor.target = "_blank";
                        anchor.innerHTML = "Play Trailer";
                        moviediv.append(anchor)
                    }
                })



            moviediv.append(poster);
            moviediv.append(title);
            resultsdiv.append(moviediv)

        })
    }
}

function titlename(name) {
    if (name.length > 20) {
        return name.slice(0, 20) + "..."
    }
    else {
        return name
    }
}

function findtrailer(data) {
    const videoobject = data.find((obj) => obj.site === "YouTube" && obj.type === "Trailer");
    if (videoobject === "undefined") return false;
    else return videoobject.key;
}












