const SINGLE = 0;
const EP = 1;
const ALBUM = 2;

class MusicSlide {
    constructor(coverPath, collectionType, collectionName, trackName, genre, releaseDate, spotifyUrl, appleUrl, youtubeUrl) {
        this.coverPath = coverPath;

        this.collectionType = collectionType;
        this.collectionName = collectionName;

        this.trackName = trackName;

        this.genre = genre;
        this.releaseDate = releaseDate;

        this.spotifyUrl = spotifyUrl;
        this.appleUrl = appleUrl;
        this.youtubeUrl = youtubeUrl;
    }

    draw(s, p) {
        /*
        if(this.cover == null)
            this.cover = p.loadImage(this.coverPath);*/

        p.font(s.robotoMedium);
        p.fill(255);
        p.noStroke();
        p.text("Track Name: " + this.trackName, s.width/2, 50)
    }
}

new Slideshow('my_music', [new MusicSlide("./img/covers/lean_machine.png", SINGLE, "", "LEAN MACHINE", "Minimal House", "29/12/2022", "https://open.spotify.com/track/7q8ABLN1Va935HMbh2KnaO?si=ad7b1a8c90184516")]);