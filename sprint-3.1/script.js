// Most Anticipated Games By date
var myData = [];
$(document).ready(function() {
  var page = "https://api.rawg.io/api/games";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", page);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status == 200) {
      var gameData = xhr.response;
      gameData = JSON.parse(gameData);
      Page = gameData.page;
      result = gameData.results;
      myData = result;
      loaddata(result);
      // console.log(myData);
      // let = 0;
      // var newResult = result.slice(i, 6);
      // i += 12;
      //
      //
      // console.log(newResult);
      // result = result.slice(0, 12);
      // console.log(result);
      // var i = 0;
      result.forEach(function(ele) {
        // var j = 0;
        $("#showGames").append(
          topGames(ele.name, ele.background_image, ele.rating, ele.id)
        );
      });
    } else {
      // console.log(xhr.response);
    }
  };
});
function loaddata(data) {
  myData = data;
  console.log(myData);
}
function topGames(name, image, rating, id) {
  var card = "";
  card = `<div class="card bg-dark " id="topGamesCard" style="width: 18rem; m-2">
              <img class="card-img-top img-fluid" id="card-img" src="${image}" alt="Card image cap">
              <h5 class="card-title text-center text-light pt-4">${name}</h5>
              <div class="overlay w-80 text-center">
              <p class="card-text text-center pt-4" id="rating">Rating:${rating}</p>
              <button class="btn btn-outline-light" onclick=linkWeb(${id})>Buy Now</button>
              <button class="btn btn-outline-light" data-toggle="modal" data-target=".bd-example-modal-lg" onclick=showDetails(${id})>view more</button>
              </div>
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

function showDetails() {}

function changePage() {
  var i = 10;
  $(".card").remove();
  let result = myData;
  result = result.slice(i, i + 10);
  // var i = 0;
  result.forEach(function(ele) {
    // var j = 0;
    $("#showGames").append(
      topGames(ele.name, ele.background_image, ele.rating, ele.id)
    );
  });
  i += 10;
}
