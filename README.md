# liri-node-app
This app takes in four commands:
* `concert-this`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says`

`node liri.js concert-this <artist/band name here>` uses the band in town API and returns venue, location, and date of a concert.

`node liri.js spotify-this-song '<song name here>'` uses the spotify API and returns information about the artist and song.

`node liri.js movie-this '<movie name here>'` uses the imdb API and return information about the movie.

`node liri.js do-what-it-says` uses the "fs" package to read the commands from the random.txt file, it then runs the commands found in the file, concert-this, spotify-this-song, or movie-this.

Included is a Liri Demo.mov which shows the app run through the command line.
