var spaceShip,spaceshipImage;
var missile1,missile1Image,missile2,missile2Image;
var gameOver,gameOverImage,restart,restartImage;
var missile1Group,missile2Group;
var score,sprite;
var gameOverSound,restartSound;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  spaceshipImage=loadImage("SpaceShip.png");
  missile1Image=loadImage("realmissile-1.webp");
  missile2Image=loadImage("missile-2.png");
  
  gameOverImage=loadImage("gameover.png");
  restartImage=loadImage("restarticon.png");
  
  sound=loadSound("640393main_STS-41D_Liftoff.mp3");
  restartSound=loadSound("640149main_Computers are in Control.mp3");
}

function setup() {
  createCanvas(600,400);
  spaceShip=createSprite(100,200,50,50);
  spaceShip.addImage(spaceshipImage);
  spaceShip.scale=0.1;
  spaceShip.debug=false;
  
  gameOver=createSprite(300,150,50,50);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  
  restart=createSprite(300,250,50,50);
  restart.addImage(restartImage);
  restart.scale=0.5;
  restart.visible=false;
  
  missile1Group=createGroup();
  missile2Group=createGroup();
  
  score=0;
}

function draw() {
  background("black");
  if(gameState===PLAY){
    missiles1();
    missiles2();
    
    fill("white")
    textSize(24)
    text("Score = "+ score,450,30);
    score=score+(frameCount%5===0);
    
    spaceShip.y = World.mouseY;
    
    spaceShip.visible=true;
    
  if(spaceShip.isTouching(missile1Group)||spaceShip.isTouching(missile2Group)){
      sound.play();
      gameState=END;
    }
  }
  
  if(gameState===END){
    
    missile1Group.destroyEach();
    missile2Group.destroyEach();
    
    spaceShip.visible=false;
    gameOver.visible=true;
    restart.visible=true;
    
    if(mousePressedOver(restart)){
      gameState=PLAY;
      gameOver.visible=false;
      restart.visible=false;
      restartSound.play();
    }
    score=0;
  }
  drawSprites();
}

function missiles1(){
  if(frameCount%50 === 0){
    missile1=createSprite(600,200,50,50);
    
    missile1.addImage(missile1Image);
    missile1.scale = 0.5;
    missile1.velocityX = -25;
    
    missile1.y=Math.round(random(50,350));
    missile1.lifetime=100;
    
    missile1.debug=false;
    missile1.setCollider("rectangle",0,-40,150,70);
    
    missile1Group.add(missile1);
  }
}

function missiles2(){
  if(frameCount%70 === 0){
    missile2=createSprite(600,200,50,50);
    missile2.addImage(missile2Image);
    missile2.scale = 0.2;
    missile2.velocityX = -20;
    
    missile2.y=Math.round(random(50,350));
    
    missile2.lifetime=100;
    missile2.debug=false;
    
    missile2Group.add(missile2);
  }
}