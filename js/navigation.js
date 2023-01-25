const nav = document.getElementById("nav")

var curSelected = nav.children[0];
curSelected.setAttribute("id", "selected");

addEventListener("scroll", (event) => {
    curSelected.setAttribute("id", "");
    curSelected = nav.children[clamp(Math.floor((window.pageYOffset + vh(100)/2.5) / vh(100)), 0, 5)];
    curSelected.setAttribute("id", "selected");
});
