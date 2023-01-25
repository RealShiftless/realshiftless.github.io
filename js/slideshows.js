// MUSIC SLIDE SHOW
var musicSlideIndex = 0;
setMusicSlide(musicSlideIndex);

function nextMusicSlide() {
    setMusicSlide(musicSlideIndex += 1);
}

function lastMusicSlide() {
    setMusicSlide(musicSlideIndex -= 1);
}

function setMusicSlide(s) {
    let slides = document.getElementsByName('music_slide');
    var dots = document.getElementsByName('music_dot');

    if(s < 0)
        s = slides.length - 1;
    else if(s >= slides.length)
        s = 0;

    for (i = 0; i < slides.length; i++) {
        dots[i].id = "";
        slides[i].style.display = "none";
    }

    slides[s].style.display = "block";
    dots[s].id = "slideshow_nav_dot_active";

    musicSlideIndex = s;
}