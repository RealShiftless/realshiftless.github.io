const PARTICLE_SPEED = 1;
const NOISE_SCALE = 100;
const SIZE_DECREASE_SPEED = .2;
const SPAWN_CHANCE = 20;

class BackgroundParticle {
    constructor(xPosition, s) {
        this.x = xPosition;
        this.y = height + s / 2;

        this.size = s;
    }
    

    draw() {
        ellipse(this.x, this.y, this.size);

        this.x += noise(this.y / NOISE_SCALE) * 2 - 1;
        this.y -= PARTICLE_SPEED;
        this.size -= SIZE_DECREASE_SPEED;

        if(this.size <= 0)
            return true;
        else
            return false;
    }
}

let PARTICLES = [];

function setup() {
    var clientHeight = document.getElementById('header').clientHeight;
	var clientWidth = document.getElementById('header').clientWidth;

	var cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent("header");

    smooth(5);
    noStroke();
    fill(236, 132, 98);

    PARTICLES = [
        initParticle(1665, 500, 20),
        initParticle(1437, 503, 6),
        initParticle(482, 512, 3),
        initParticle(631, 567, 26),
        initParticle(1426, 602, 32),
        initParticle(1031, 680, 15),
        initParticle(1633, 710, 30),
        initParticle(181, 723, 14),
        initParticle(1482, 727, 22),
        initParticle(331, 764, 15),
        initParticle(1782, 819, 82),
        initParticle(1563, 821, 34),
        initParticle(200, 900, 56),
        initParticle(188, 897, 46),
        initParticle(651, 933, 55),
        initParticle(489, 971, 84),
        initParticle(1109, 970, 82),
        initParticle(1615, 979, 78),
        initParticle(1727, 977, 64)
    ];
}

function draw() {
	//background(233,114,76);
    clear();

    for(let i = 0; i < PARTICLES.length; i++) {
        if(PARTICLES[i].draw())
        {
            PARTICLES.splice(i, 1);
            i--;
        }
    }

    let v = random(SPAWN_CHANCE);

    if(Math.floor(v) == 0) {
        PARTICLES.push(new BackgroundParticle(random(vw(100)), random(32, 128)));
    }
}

function windowResized() {
    var clientHeight = document.getElementById('header').clientHeight;
	var clientWidth = document.getElementById('header').clientWidth;

	var cnv = resizeCanvas(clientWidth, clientHeight);
}

function initParticle(x, y, s)
{
    let p = new BackgroundParticle(x, s);
    p.y = y;
    return p;
}