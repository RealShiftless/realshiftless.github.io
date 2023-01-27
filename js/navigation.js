// Chapter object
class Chapter {
    constructor(id, name, color)
    {
        this.elementId = id;
        this.name = name;
        this.color = color;

        this.chapterId = 0;
        this.element = document.getElementById(this.elementId);
        this.navElement = null;

        this.heightOffset = 0;
        this.height = this.element.clientHeight;
    }

    resized() {
        this.element = document.getElementById(this.elementId);
    }
}

class Color {
    constructor(r, g, b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}

// Chapters
const CHAPTERS = [
    new Chapter('header', 'Home', new Color(233, 114, 76)),
    new Chapter('about_me', 'About Me', new Color(129, 134, 217)),
    new Chapter('music', 'My Music', new Color(161, 123, 183)),
    new Chapter('studio', 'Studio', new Color(230, 230, 121)),
    new Chapter('contact', 'Contact', new Color(163, 240, 153))
];

// Create nav bar
const NAV_BAR = document.createElement('div');
NAV_BAR.setAttribute('class', 'navigation');
document.body.appendChild(NAV_BAR);

// Create branding
const BRANDING = document.createElement('a');
BRANDING.setAttribute('class', 'branding');
BRANDING.appendChild(document.createTextNode('Site by: Aaron Moulding'));
document.body.appendChild(BRANDING);

// Func
function indexChapters() {
    var i = 0;
    var offset = 0;

    CHAPTERS.forEach(chapter => {
        chapter.heightOffset = offset;
        chapter.chapterId = i;
        chapter.navElement = createChapterNavButton(chapter);

        offset += chapter.height;
        i++;
    });

    globalHeight = offset;
}

function createChapterNavButton(chapter) {
    var button = document.createElement('a');
    button.setAttribute('href', '#' + chapter.elementId);
    button.appendChild(document.createTextNode(chapter.name));

    NAV_BAR.appendChild(button);

    return button;
}

function InitializeNavigation() {
    indexChapters();

    currentChapter = CHAPTERS[0];
    currentChapter.navElement.setAttribute("id", "selected");
}

// Vars
let globalHeight;

// Initialize
InitializeNavigation();

// Scroll event
addEventListener("scroll", (event) => {
    // Get the scroll with an offset
    var scroll = window.pageYOffset + vh(75);

    // Back check
    if(scroll < currentChapter.heightOffset)
    {
        currentChapter.navElement.setAttribute("id", "");
        currentChapter = CHAPTERS[clamp(currentChapter.chapterId - 1, 0, CHAPTERS.length)];
        currentChapter.navElement.setAttribute("id", "selected");
    }

    // Next check
    if(scroll >= currentChapter.heightOffset + currentChapter.height)
    {
        currentChapter.navElement.setAttribute("id", "");
        currentChapter = CHAPTERS[clamp(currentChapter.chapterId + 1, 0, CHAPTERS.length)];
        currentChapter.navElement.setAttribute("id", "selected");
    }
});

// Resize event
addEventListener("resize", (event) => {
    // Reindex Chapters
    var offset = 0;

    CHAPTERS.forEach(chapter => {
        chapter.resized();
        chapter.heightOffset = offset;

        offset += chapter.height;
    });

    globalHeight = offset;
})

