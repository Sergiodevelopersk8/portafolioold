


import platform from '../img/platform.png';
import hills from '../img/hills.png';
import background from '../img/background.png';
import platformSmallTall from '../img/platformSmallTall.png';
import spriteRunLeft from '../img/spriteRunLeft.png';
import spriteRunRight from '../img/spriteRunRight.png';
import spriteStandLeft from '../img/spriteStandLeft.png';
import spriteStandRight from '../img/spriteStandRight.png'; 

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;
const gravity = 1.5;

class Player{
    
constructor(){
    this.speed =10;
this.position = {
    x:100,
    y:100
}
this.velocity = {
    x:0,
    y:0
}
this.width = 66;
this.height = 150;
this.image = createImage(spriteStandRight);
this.frames = 0;
this.sprites = {
    stand:{
        right:createImage(spriteStandRight),
        left:createImage(spriteStandLeft),
        cropWidt: 177,
        width:66
    },
    run: {
        right: createImage(spriteRunRight),
        left: createImage(spriteRunLeft),
        cropWidt: 341,
        width:127.875

    }
}
this.currentSprite = this.sprites.stand.right;
this.currentCropWidth = 177;
}


draw()
{

 c.drawImage(this.currentSprite, this.currentCropWidth * this.frames,0,this.currentCropWidth ,400,this.position.x,this.position.y,this.width, this.height);
 
}


update(){
    this.frames++;
    if(this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)){
        this.frames = 0;
    }
    else if (this.frames > 29  && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)){
        this.frames = 0;
    }
this.draw();
this.position.x += this.velocity.x;
this.position.y += this.velocity.y;
if(this.position.y + this.height + this.velocity.y <= canvas.height){
this.velocity.y += gravity;
}
 }
}

class Plataform{

constructor({x,y, image}){
this.position = {
x,
y
}
this.image = image;
this.width = image.width;
this.height = image.height;

}

draw(){
c.drawImage(this.image,this.position.x, this.position.y)
}
}
class GenericObject{

constructor({x,y, image}){
this.position = {
x,
y
}
this.image = image;
this.width = image.width;
this.height = image.height;

}

draw(){
c.drawImage(this.image,this.position.x, this.position.y)
}
}

function createImage(imageSrc){
  const image = new Image();
  image.src = imageSrc;
  return image;
}

let platformImage = createImage(platform);
let platformSmallTallImage = createImage(platformSmallTall);
let player = new Player ();
let plataforms = [];
let genericObjects = [ ];
let currentKey
const keys = {
right:{
pressed:false },
left:{
pressed:false }

}

let scrollOffset = 0;

function init(){
platformImage = createImage(platform);
player = new Player ();
plataforms = [
    
    new Plataform ({x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,  y: 270, image: createImage(platformSmallTall) }),
    new Plataform({x: -1,  y: 470, image: platformImage}), 
    new Plataform({x: platformImage.width - 3,  y: 470, image: platformImage }),
    new Plataform({x: platformImage.width * 2 + 100,  y: 470, image: platformImage }),
    new Plataform ({x: platformImage.width * 3 + 300,  y: 470, image: platformImage }),
    new Plataform ({x: platformImage.width * 4 + 300 - 2,  y: 470, image: platformImage }),
    new Plataform ({x: platformImage.width * 5 + 700 - 2,  y: 470, image: platformImage })
];

 genericObjects = [ 
new GenericObject({
  x:-1,
  y:-1,
  image: createImage(background)
}),
new GenericObject({
  x:-1,
  y:-1,
  image: createImage(hills)
}),
];



 scrollOffset = 0;

}

function animate(){
requestAnimationFrame(animate);
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

genericObjects.forEach(genericObject =>{
    genericObject.draw();
})

plataforms.forEach(plataform =>{
    plataform.draw();
})
player.update();

if(keys.right.pressed === true && player.position.x < 400){
player.velocity.x = player.speed;
   }
  
else if((keys.left.pressed  && player.position.x > 100) || keys.left.pressed && scrollOffset === 0 && player.position.x > 0 ){
player.velocity.x = - player.speed ;

}

else{
player.velocity.x = 0 ;
if(keys.right.pressed === true){
    scrollOffset += player.speed;
    plataforms.forEach(plataform =>{
        plataform.draw();
        plataform.position.x -= player.speed;
    })
   
genericObjects.forEach(genericObject =>{
    genericObject.position.x -= player.speed * .66;
})

}
else if(keys.left.pressed === true && scrollOffset > 0){
    scrollOffset -=player.speed;
    plataforms.forEach(plataform =>{
        plataform.draw();
        plataform.position.x += player.speed;
    })
    genericObjects.forEach(genericObject =>{
        genericObject.position.x += player.speed * .66;
    })
}

}

plataforms.forEach(plataform =>{
if(player.position.y + player.height <= plataform.position.y && player.position.y + player.height + player.velocity.y >= plataform.position.y
&& player.position.x + player.width >= plataform.position.x 
&& player.position.x <= plataform.position.x + plataform.width){
player.velocity.y = 0;
   }
})
if ( keys.right.pressed && currentKey === 'right' && player.currentSprite !== player.sprites.run.right){
    player.frames = 1;
    player.currentSprite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidt;
    player.width = player.sprites.run.width;
}
else if( keys.left.pressed && currentKey === 'left' && player.currentSprite !== player.sprites.run.left){
   
    player.currentSprite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidt;
    player.width = player.sprites.run.width;
}
else if( !keys.left.pressed && currentKey === 'left' && player.currentSprite !== player.sprites.stand.left){
   
    player.currentSprite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidt;
    player.width = player.sprites.stand.width;
}
else if( !keys.right.pressed && currentKey === 'right' && player.currentSprite !== player.sprites.stand.right){
   
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidt;
    player.width = player.sprites.stand.width;
}

if(scrollOffset > platformImage.width * 5 + 300 -2){
    // console.log("ganaste");
}
if(player.position.y > canvas.height){
init()
}
}
init();
animate();

addEventListener('keydown',({keyCode})=>{
    
switch(keyCode){
case 65:
keys.left.pressed = true;
currentKey = 'left';
break;

case 37:
keys.left.pressed = true;
currentKey = 'left';

break;

case 83:
            
break;
        
case 40:
break;
        
case 39:
keys.right.pressed = true;
currentKey = 'right';
break;

case 68:
keys.right.pressed = true;
currentKey = 'right';
break;

case 38:
player.velocity.y -= 10;
break;

case 87:
player.velocity.y -= 10;
break;
    }
})


addEventListener('keyup',({keyCode})=>{

switch(keyCode){

case 65:
keys.left.pressed = false;
break;

case 37:
keys.left.pressed = false;
break;

case 83:
break;

case 40:
break;

case 39:
keys.right.pressed = false;
player.currentSprite = player.sprites.stand.right;
player.currentCropWidth = player.sprites.stand.cropWidt;
player.width = player.sprites.stand.width;
break;

case 68:
    keys.right.pressed = false;
    player.currentSprite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidt;
    player.width = player.sprites.stand.width;
break;

case 38:
player.velocity.y -= 20;
break;

case 87:
player.velocity.y -= 20;
break;

 }
})