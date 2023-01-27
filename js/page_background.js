const PARTICLE_SPEED = 1;
const NOISE_SCALE = 400;
const NOISE_RANGE = 150;
const SIZE_DECREASE_SPEED = .2;
const SPAWN_CHANCE = 20;
const LIFE_TIME_MIN = 1600;
const LIFE_TIME_MAX = 5200;
const PRE_GEN_FRAMES = 6000;

class Particle {
    constructor(xPosition, s) {
        this.startX = xPosition;
        this.t = 0;
        this.maxT = random(LIFE_TIME_MIN, LIFE_TIME_MAX);
        this.startT = globalT;

        this.startSize = s;
    }

    update() {
        this.x = this.startX + (noise(this.startT + this.t / NOISE_SCALE) * 2 - 1) * NOISE_RANGE;
        this.y = height + this.startSize - this.t * PARTICLE_SPEED;
        this.size = this.startSize * (1 / this.maxT * (this.maxT - this.t));

        this.t++;

        if(this.t >= this.maxT)
            return true;
        else
            return false;
    }
    
    draw() {
        var r = this.update();

        rt.ellipse(this.x, this.y, this.size);

        return r;
    }
}

const BACKGROUND_ELEMENT = document.createElement('div');
BACKGROUND_ELEMENT.setAttribute('class', 'background_container');
document.body.prepend(BACKGROUND_ELEMENT);

let particles = [];
let globalT = 0;

let bg;
let rt;

function setup() {
	var clientWidth = windowWidth;
    var clientHeight = globalHeight;

	var cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent(BACKGROUND_ELEMENT);

    smooth(5);
    noStroke();
    fill(236, 132, 98);

    bg = createGraphics(clientWidth, clientHeight);
    bg.noStroke();

    CHAPTERS.forEach(chapter => {
        bg.fill(chapter.color.r, chapter.color.g, chapter.color.b);
        bg.rect(0, chapter.heightOffset, clientWidth, chapter.height);
    });
    image(bg,0,0);
    
    rt = createGraphics(clientWidth, clientHeight);
    rt.noStroke();

    for(var frame = 0; frame < PRE_GEN_FRAMES; frame++)
    {
        if(Math.floor(random(SPAWN_CHANCE)) == 0) {
            particles.push(new Particle(random(vw(100)), random(32, 128)));
        }

        for(var i = 0; i < particles.length; i++) {
            if(particles[i].update())
            {
                particles.splice(i, 1);
                i--;
            }
        }
    }
}

function draw() {
    tint(255);
    image(bg,0,0);
    rt.clear();

    for(let i = 0; i < particles.length; i++) {
        if(particles[i].draw())
        {
            particles.splice(i, 1);
            i--;
        }
    }

    if(Math.floor(random(SPAWN_CHANCE)) == 0) {
        particles.push(new Particle(random(vw(100)), random(32, 128)));
    }

    globalT++;

    tint(255,32);
    image(rt, 0, 0);
}

function windowResized() {
    var clientHeight = document.getElementById('header').clientHeight;
	var clientWidth = document.getElementById('header').clientWidth;

    rt.width = clientWidth;
    rt.height = clientHeight;

	var cnv = resizeCanvas(clientWidth, clientHeight);
}

function initParticle(x, y, s)
{
    let p = new Particle(x, s);
    p.y = y;
    return p;
}