// Search button
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
      response.results.forEach(function(ele) {
        $("#movies").append(
          createCard(ele.poster_path, ele.title, ele.overview, ele.release_date)
        );
      });
    } else {
      $("#movies").append("<div><p>No Movies found</p></div>");
      console.log(xhr.response);
    }
  };
}
function createCard(poster, title, overview, release_date) {
  var card = "";
  card = `<div class="m-2 card" style="width: 18rem;">
  <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${poster}" alt="Card image cap">
  <div class="card-body h-30">
  <p class="card-text">${title}</p>
  <p class="card-text">${release_date}</p>
  <p class="card-text">${overview.substr(0, 150)}</p>
  </div>
  </div>`;
  return card;
}
// reviews
$("#btn-nowPlaying").click(function() {
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
  card = `<div class="m-2 card" style="width: 18rem;">
          <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${poster}" alt="Card image cap">
          <div class="card-body h-30">
          <p class="card-text">${title}</p>
          <p class="card-text">Popularity:${popularity}</p>
          <p class="card-text">${description.substr(0, 100)}</p>
          </div>
          </div>`;
  return card;
}
