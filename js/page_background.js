const PARTICLE_SPEED = 1.5;
const NOISE_SCALE = 500;
const NOISE_RANGE = 150;
const SPAWN_CHANCE = 20;
const LIFE_TIME_MIN = .3;
const LIFE_TIME_MAX = 1;
const PRE_GEN_FRAMES = 6000;

const MIN_PARTICLE_SIZE = 32;
const MAX_PARTICLE_SIZE = 128;

class Particle {
    constructor(xPosition, s) {
        this.startX = xPosition;
        this.t = 0;

        var rnd = -Math.pow((random(0, 1) - 1), 2)+1;

        this.maxT = lifeDistMin + (lifeDistMax - lifeDistMin) * rnd;
        this.startT = globalT;

        this.durationPercentage = 1 / (lifeDistMax - lifeDistMin) * (this.maxT - lifeDistMin);

        this.startSize = s;
    }

    update() {
        this.x = this.startX + (noise(this.startT + this.t / NOISE_SCALE) * 2 - 1) * NOISE_RANGE;
        this.y = height + this.startSize - this.t;
        //this.size = this.startSize * (1 / this.maxT * (this.maxT - this.t));

        this.size = MAX_PARTICLE_SIZE * this.durationPercentage * (1 / this.maxT * (this.maxT - this.t))

        this.t += PARTICLE_SPEED;

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

let lifeDistMin, lifeDistMax;

function setup() {
	var clientWidth = windowWidth;
    var clientHeight = globalHeight;

	var cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent(BACKGROUND_ELEMENT);

    lifeDistMin = clientHeight * LIFE_TIME_MIN;
    lifeDistMax = clientHeight * LIFE_TIME_MAX;

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
            particles.push(new Particle(random(vw(100)), random(MIN_PARTICLE_SIZE, MAX_PARTICLE_SIZE)));
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
    clear();
    //image(bg,0,0);
    rt.clear();

    for(let i = 0; i < particles.length; i++) {
        if(particles[i].draw())
        {
            particles.splice(i, 1);
            i--;
        }
    }

    if(Math.floor(random(SPAWN_CHANCE / PARTICLE_SPEED)) == 0) {
        particles.push(new Particle(random(vw(100)), random(MIN_PARTICLE_SIZE, MAX_PARTICLE_SIZE)));
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

    bg = createGraphics(clientWidth, clientHeight);
    bg.noStroke();

    CHAPTERS.forEach(chapter => {
        bg.fill(chapter.color.r, chapter.color.g, chapter.color.b);
        bg.rect(0, chapter.heightOffset, clientWidth, chapter.height);
    });
    image(bg,0,0);

	var cnv = resizeCanvas(clientWidth, clientHeight);
}

function initParticle(x, y, s)
{
    let p = new Particle(x, s);
    p.y = y;
    return p;
}