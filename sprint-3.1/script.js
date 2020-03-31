// Most Anticipated Games By date
var myData = [];
var page_no = 1;
$(document).ready(function() {
  var page =
    "https://api.rawg.io/api/games?dates=2019-09-01,2020-02-20&page_size=12";
  let xhr = new XMLHttpRequest();
  xhr.open("GET", page);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status == 200) {
      var gameData = xhr.response;
      gameData = JSON.parse(gameData);
      Page = gameData.page;
      result = gameData.results;
      result.forEach(function(ele) {
        $("#showGames").append(
          topGames(
            ele.name,
            ele.background_image,
            ele.rating,
            ele.id,
            ele.clip.clip
          )
        );
      });
    } else {
      console.log(xhr.response);
    }
  };
});
function topGames(name, image, rating, id, link) {
  console.log(link);
  var card = "";
  card = `<div class="card bg-dark " id="topGamesCard" style="width: 18rem; m-2">
              <img class="card-img-top img-fluid" id="card-img" src="${image}" alt="Card image cap">
              <h5 class="card-title text-center text-light pt-4">${name}</h5>
              <div class="overlay w-80 text-center">
              <p class="card-text text-center pt-4" id="rating">Rating:${rating}</p>
              <button class="btn btn-outline-light" onclick=linkWeb(${id})>Buy Now</button>
              <button class="btn btn-outline-light" data-toggle="modal" data-target=".bd-example-modal-lg" onclick=showDetails("${link}") >watch trailer</button>
              </div>  "some link"  "some link"
          </div>`;
  return card;
}
function linkWeb(id) {
  let baseUrl = "https://api.rawg.io/api/games/";
  let url = baseUrl + id + "/stores";
  var xml = new XMLHttpRequest();
  xml.open("GET", url);
  xml.send();
  xml.onload = function() {
    if (xml.status == 200) {
      var urlData = JSON.parse(xml.response);
      var link = urlData.results[1];
      link = link.url;
      window.location = link;
    } else {
      alert("Something went wrong");
    }
  };
}

function changePage() {
  this.page_no += 1;
  $(".card").remove();
  var page = `https://api.rawg.io/api/games?dates=2019-09-01,2019-09-30&page=${page_no}&page_size=12`;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", page);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status == 200) {
      var gameData = xhr.response;
      gameData = JSON.parse(gameData);
      Page = gameData.page;
      result = gameData.results;
      result.forEach(function(ele) {
        $("#showGames").append(
          topGames(ele.name, ele.background_image, ele.rating, ele.id)
        );
      });
    } else {
      console.log(xhr.response);
    }
  };
}

function showDetails(url) {
  window.open(url);
}
