var dice = document.getElementById("dice");
var clear = document.getElementById("clear");
var next = 0;
var pos = [];
init = 0;
function diceOut() {
  var h2 = document.createElement("h2");
  var output = Math.floor(Math.random() * 5) + 1;
  h2.textContent = output;
  alert("Your got" + "   " + output);
  var sum = 0;
  sum += output;

  allBox.forEach(function(ele, index) {
    if (output == index) {
      index = index + next;
      allBox[allBox.length - index].innerText = "🐞";
      next = 0;
      next += index;
      pos.push(next);
      console.log(pos);
    }
  });
  snakes.forEach(function(ele) {
    if (pos.includes(ele)) {
      alert("You Lose.Please restart the game");
      next = 0;
    }
  });
  if (pos.includes(36)) {
    alert("Congratulations! You Win");
  }
}
function diceClear() {
  allDiv = document.querySelectorAll(".grid div");
  allDiv.forEach(function(ele, index) {
    if (pos.includes(index)) {
      allDiv[allDiv.length - index].innerText = "";
    }
  });
}

dice.addEventListener("click", diceOut);
clear.addEventListener("click", diceClear);
allBox = document.querySelectorAll(".grid div");
console.log(allBox);
// Snakes In the grid
var snakes = [3, 5, 6, 14, 18, 22, 26, 31];
console.log(snakes);
