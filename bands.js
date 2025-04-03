// - Bands

//     find out the `rockbands.json` file to make a page with 2 dropdown lists,
//     the 1 st one is filled with the band and the 2nd one is filled with the
//     artist after selecting a band from its dropdown list. Once the user
//     selects an artist of the band; open his link.

var btn = document.getElementsByTagName("button")[0];
var loading = document.getElementsByClassName("loading")[0];
var empty = document.getElementsByClassName("empty")[0];
var error = document.getElementsByClassName("error")[0];
var bands = document.getElementById("bands");
var artists = document.getElementById("artists");
// console.log(loading);

var xhr = new XMLHttpRequest();
xhr.open("get", "bands.json");
//send responses when click on the button.
btn.addEventListener("click", function () {
  xhr.send();
});
//when readystate changes (2,3,4);
xhr.addEventListener("readystatechange", function () {
  //loading state.
  if (xhr.readyState == 3) {
    loading.style.display = "block";
    error.style.display = "none";
  }
  //if the response is ok:
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      setTimeout(function () {
        loading.style.display = "none";
        console.log(JSON.parse(xhr.response));
        var responseObj = JSON.parse(xhr.response);
        if (responseObj.length == 0) {
          empty.style.display == "block";
        }
        displayBand(responseObj);
        displayArtists(responseObj);
      }, 2000);
    } else {
      error.style.display = "block";
    }
  }
});
//show response of bands in the drop down lists
function displayBand(resObj) {
  bands.innerHTML = "";
  var defaultOption = document.createElement("option");
  defaultOption.innerText = "choose a band";
  defaultOption.disabled = true; //
  defaultOption.selected = true; //
  bands.append(defaultOption);

  for (var key in resObj) {
    (function () {
      var option = document.createElement("option");
      console.log(key);
      bands.append(option);
      option.innerText = key;
    })();
  }
}
//show response of bands in the drop down lists
function displayArtists(resObj) {
  bands.addEventListener("change", function () {
    artists.innerHTML = "";
    var selectedBand = bands.value;
    console.log(selectedBand);
    var bandArtistsArr = resObj[selectedBand];
    var defaultOption = document.createElement("option");
    defaultOption.innerText = "choose an artist";
    defaultOption.disabled = true; //make the first option disabled to be able to choose 1st band/ 1st artist
    defaultOption.selected = true; //default at first
    artists.append(defaultOption);
    // console.log(bandArtistsArr[0].name);
    //iterate on bands names and values
    for (var i = 0; i < bandArtistsArr.length; i++) {
      var option = document.createElement("option");
      artists.append(option);
      option.innerText = bandArtistsArr[i].name;
      option.value = bandArtistsArr[i].value;
    }
    //on clicking the artist open the window
    artists.addEventListener("change", function () {
      var selectedArtistLink = artists.value;
      console.log(selectedArtistLink);
      window.open(selectedArtistLink, "_blank");
    });
  });
}
