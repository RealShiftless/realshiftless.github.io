class Slideshow {
    constructor(parentDiv, initialSlides) {
        let sketch = function(p) {
            p.setup = function() {
                this.slides = [...initialSlides];
                this.currentSlide = 0;

                this.robotoMedium = p.loadFont('./fonts/Roboto-Medium.ttf');

                p.createCanvas(vh(60), vh(30));
            }

            p.draw = function() {
                p.clear();

                p.fill(0, 64);
                p.stroke(0, 64);
                p.strokeWeight(8);
                p.rect(5, 5, this.width - 10, this.height - 10, 20);

                this.slides[0].draw(this, p);
            }

            p.windowResized = function() {
                this.width = vh(60);
                this.height = vh(30);

                p.resizeCanvas(vh(60), vh(30));
            }
        };
        
        new p5(sketch, parentDiv);
    }
}