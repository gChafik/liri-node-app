require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
let axios = require("axios");
let fs = require("fs");
let moment = require("moment");
let input = process.argv[2];
let input2 = process.argv[3];
let logObj = {};

if(input === "concert-this"){
    concertThis(input2);
}
else if(input === "spotify-this-song"){
    spotifyThis(input2);
}
else if(input === "movie-this"){
    movieThis(input2);
}
else if(input === "do-what-it-says"){
    doIt(input2);
}

function concertThis(input2){
  axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp")
  .then(function(response){
    console.log("Venue: ", response.data[1].venue.name);
    console.log("Location: ", response.data[1].venue.city + ", " + response.data[1].venue.region + ", " +response.data[1].venue.country);
    console.log("Date: ", moment(response.data[1].datetime).format("MM/DD/YYYY"));
    logObj.Venue = response.data[1].venue.name;
    logObj.Location = response.data[1].venue.city;
    logObj.Date = moment(response.data[1].datetime).format("MM/DD/YYYY");
    console.log(logObj);
    appendToFile(JSON.stringify(logObj));
      
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  })
};

function spotifyThis(input2){
  if(typeof(input2) === "undefined"){
    input2 = "Ace of Base The Sign";
  }
  
  spotify.search({ type: 'track', query: input2, limit: 10 }, function(err, data) {
    //console.log(JSON.parse(data));
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else{
  for (let index = 0; index < 5; index++) {
    console.log("Artist Name: ", JSON.stringify(data.tracks.items[index].album.artists[index].name, null, 2));
    console.log("Song Name: ", JSON.stringify(data.tracks.items[index].name, null, 2)); 
    console.log("Song Preview: ", JSON.stringify(data.tracks.items[index].preview_url, null, 2));
    console.log("Album Name: ", JSON.stringify(data.tracks.items[index].album.name, null, 2));   
  }
  }
  });
}

function movieThis(input2){
  axios.get("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomato Rating: " + response.data.Metascore);
    console.log("Country the Movie was produced: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot of the Movie: " +response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
);

}

function doIt(){
  fs.readFile("random.txt", "utf8", function(err, data){
    console.log(data);
    data = data.split(",");
    
    console.log(data[1]);
    spotifyThis(data[1]);
  })
}

function appendToFile(text){
  fs.appendFile("log.txt", text + "\n", function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("Content Added!");
    }
  });
}