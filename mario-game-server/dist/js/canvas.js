import plataform from './img/plataform.png';
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
const gravity = 1.5;

class Player{
    
constructor(){
this.position = {
    x:100,
    y:100
}
this.velocity = {
    x:0,
    y:0
}
this.width = 30;
this.height = 30;
}


draw()
{
c.fillStyle  = 'red';
c.fillRect(this.position.x,this.position.y,this.width, this.height);
 }


update(){
this.draw();
this.position.x += this.velocity.x;
this.position.y += this.velocity.y;
if(this.position.y + this.height + this.velocity.y <= canvas.height){
this.velocity.y += gravity;
}

else{
this.velocity.y = 0;
}
        
 }
}

class Plataform{

constructor({x,y}){
this.position = {
x,
y
}

this.width = 200;
this.height = 20
}

draw(){
c.fillStyle = 'blue';
c.fillRect(this.position.x,this.position.y,this.width,this.height);
 }
}


const player = new Player ();

const plataforms = [new Plataform({x:200, y:100}), new Plataform({x: 500, y:200})];

const keys = {
right:{
pressed:false },
left:{
pressed:false }

}

let scrollOffset = 0;

function animate(){
requestAnimationFrame(animate);
c.clearRect(0, 0, canvas.width, canvas.height);
player.update();
plataforms.forEach(plataform =>{
    plataform.draw();
})


if(keys.right.pressed === true && player.position.x < 400){
player.velocity.x = 5;
   }
  
else if(keys.left.pressed === true && player.position.x > 100){
player.velocity.x = -5 ;
}

else{
player.velocity.x = 0 ;
if(keys.right.pressed === true){
    scrollOffset += 5;
    plataforms.forEach(plataform =>{
        plataform.draw();
        plataform.position.x -= 5;
    })
   
}
else if(keys.left.pressed === true){
    scrollOffset -=5;
    plataforms.forEach(plataform =>{
        plataform.draw();
        plataform.position.x += 5;
    })
  
}
if(scrollOffset > 2000){
  
}
}

plataforms.forEach(plataform =>{
if(player.position.y + player.height <= plataform.position.y && player.position.y + player.height + player.velocity.y >= plataform.position.y
&& player.position.x + player.width >= plataform.position.x 
&& player.position.x <= plataform.position.x + plataform.width){
player.velocity.y = 0;
   }
})
}

animate();

addEventListener('keydown',({keyCode})=>{
    
switch(keyCode){
case 65:
keys.left.pressed = true;
break;

case 37:
keys.left.pressed = true;
break;

case 83:
            
break;
        
case 40:
break;
        
case 39:
keys.right.pressed = true;
break;

case 68:
keys.right.pressed = true;
break;

case 38:
player.velocity.y -= 20;
break;

case 87:
player.velocity.y -= 20;
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
break;

case 68:
keys.right.pressed = false;
break;

case 38:
player.velocity.y -= 20;
break;

case 87:
player.velocity.y -= 20;
break;

 }
})