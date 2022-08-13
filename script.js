const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10;
//let gameFrame = 0;

const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();
backgroundLayer1.src = './backgroundLayers/layer-1.png';
backgroundLayer2.src = './backgroundLayers/layer-2.png';
backgroundLayer3.src = './backgroundLayers/layer-3.png';
backgroundLayer4.src = './backgroundLayers/layer-4.png';
backgroundLayer5.src = './backgroundLayers/layer-5.png';

window.addEventListener('load', function(param) {
    // resources loaded successfuly
    console.table({ GameLoaded: true, ResourcesAvailable: 'YES', Errors: 'None' });

    const slider = document.getElementById('slider');
    const speedText = document.querySelector('#container p');
    slider.value = gameSpeed;
    const showGameSpeed = document.getElementById('showGameSpeed');
    showGameSpeed.innerHTML = gameSpeed;

    // hook slider to game speed
    slider.addEventListener('change', function(e) {
            gameSpeed = e.target.value;
            showGameSpeed.innerHTML = gameSpeed;

            if (gameSpeed == 0) {
                speedText.innerHTML = 'Game possed: ' + e.target.value;
                speedText.classList.add('game_possed');
                return;
            }
            speedText.innerHTML = 'Game Speed: ' + e.target.value;
            speedText.classList.remove('game_possed');

        })
        // Layers class 
    class Layer {
        constructor(image, speeModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speeModifier = speeModifier;
            this.speed = gameSpeed * this.speeModifier;
        }
        update() {
            this.speed = gameSpeed * this.speeModifier;
            // fluid game frame jump
            if (this.x <= -this.width) this.x = 0;
            this.x = Math.floor(this.x - this.speed);
            // inconsistent game frame jump. Needs work
            //this.x = gameFrame * this.speed % this.width;
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    // layer instances
    const layer1 = new Layer(backgroundLayer1, 0.2);
    const layer2 = new Layer(backgroundLayer2, 0.4);
    const layer3 = new Layer(backgroundLayer3, 0.6);
    const layer4 = new Layer(backgroundLayer4, 0.8);
    const layer5 = new Layer(backgroundLayer5, 1);
    // game object array
    const gameObjects = [layer1, layer2, layer3, layer4, layer5];

    // animation loop handler
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        gameObjects.forEach((object) => {
                object.update();
                object.draw();
            })
            //gameFrame--;
        requestAnimationFrame(animate);
    }
    animate();
});