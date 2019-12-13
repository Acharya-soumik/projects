// Search button-onclick
$("#btn-search").click(function() {
  // Removing previuos search
  $("#movies > div").remove();
  // taking input
  var userSearch = $("#search").val();
  searchMovie(userSearch);
});

function searchMovie(userSearch) {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.themoviedb.org/3/search/movie?api_key=2bd7a379f3b9051975fb5321f24bf04a" +
      "&query=" +
      userSearch
  );
  xhr.send();
  xhr.onload = function() {
    if (xhr.status == 200) {
      var response = JSON.parse(xhr.response);
      console.log(response);
      if (response.results.length == 0) {
        $(alert("No movies Found"));
      } else {
        response.results.forEach(function(ele) {
          $("#movies").append(
            createCard(
              ele.poster_path,
              ele.title,
              ele.overview,
              ele.release_date
            )
          );
        });
      }
    } else {
      $(alert("Please fill the input!"));
      console.log(xhr.response);
    }
  };
}

function createCard(poster, title, overview, release_date) {
  var card = "";
  card = `<div class="m-2 card col-12 col-sm-6 col-md-5 col-lg-3" >
  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${poster}" alt='No Image'>
    <div class ="overlay">
    <div class="card-body h-100">
    <h2 >${title}</h2>
    <h3 class="">${release_date}</h3>
    <p class="display-1" id="description">${overview}</p>
    </div>
    </div>
  </div>`;
  return card;
}

// reviews
$(document).ready(function() {
  var xhrNowPlaying = new XMLHttpRequest();
  xhrNowPlaying.open(
    "GET",
    "https://api.themoviedb.org/3/movie/now_playing?api_key=2bd7a379f3b9051975fb5321f24bf04a&language=en-US&page=1"
  );
  xhrNowPlaying.send();
  xhrNowPlaying.onload = function() {
    if (xhrNowPlaying.status == 200) {
      var storeObj = JSON.parse(xhrNowPlaying.response);
      var storeObj = storeObj.results;
      storeObj.forEach(function(ele) {
        $("#playlist").append(
          newPlaylist(
            ele.original_title,
            ele.poster_path,
            ele.overview,
            ele.popularity
          )
        );
      });
    } else {
      console.log(xhrNowPlaying.status);
    }
  };
});

function newPlaylist(title, poster, description, popularity) {
  var card = "";
  card = `<div class="m-2 card col-12 col-sm-6 col-md-4 col-lg-3">
            <img class="card-img-top w-100 h-100" src="https://image.tmdb.org/t/p/w500/${poster}" alt="No image">
            <div class="overlay">
            <div class="card-body h-100">
            <p class="card-text lead text-ligth">${title}</p>
            <p class="card-text">Popularity:${popularity}</p>
            <p class="card-text" id="description">${description}</p>
            </div>
            </div>
          </div>
          `;
  return card;
}
