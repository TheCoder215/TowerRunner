var tower, towerImg;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var iBlock, iBlockGroup;
var gameState = "play"
var gameOver, gameOverImg
var sound


function preload(){

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png")
  gameOverImg = loadImage("gameOver2.png")
  sound = loadSound("spooky.wav");
  
}


function setup(){

  createCanvas(850,800);

  tower = createSprite(425,400,50,50);
  tower.addImage(towerImg);
  tower.scale = 1.5
  tower.velocityY = 1
  
  ghost = createSprite (425,400,50,50)
  ghost.addImage(ghostImg);
  ghost.scale = 0.33;
  
  doorGroup = new Group();
  climberGroup = new Group();
  iBlockGroup = new Group();
}


function draw(){
   background("white");
    ghost.setCollider("rectangle",0,0,30,30)
  
  
  
  if(gameState === "play"){
    sound.play();
    
  if (tower.y > 700){
    tower.y = 300
  }
  spawnDoors();
  
  if(keyDown("space") && ghost.y>100){
    ghost.velocityY = -6
  }
  
   if(keyDown("left")&&ghost.x>150){
    ghost.x = ghost.x-15
  }
  
  if(keyDown("right")&&ghost.x<700){
    ghost.x = ghost.x+15
  }
  
  if(ghost.isTouching(climberGroup)){
    ghost.velocityY = 0
  }
  
  ghost.velocityY =  ghost.velocityY+0.8

  if(ghost.isTouching(iBlockGroup) || ghost.y>=800){
    ghost.destroy();
    gameState = "end"
  }
  }
  
  if(gameState === "end"){ 
    tower.destroy();
    climberGroup.destroyEach();
    doorGroup.destroyEach();
    gameOver = createSprite(425,400, 50, 50);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.75
  }

  drawSprites();
  
}



function spawnDoors(){
  
  if(World.frameCount % 400 === 0){
  door = createSprite(400,-50,50,50);
   
  
  door.addImage(doorImg);
  door.velocityY = 1
    door.lifetime = 900
   door.x = Math.round(random(200,600))
    doorGroup.add(door);
    climber = createSprite(door.x, door.y+60, 50);  
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.lifetime = 900
    climberGroup.add(climber);
  
    
      door.depth = ghost.depth = climber.depth
  ghost.depth = ghost.depth +1 
    
  iBlock = createSprite(door.x,climber.y+10, climber.width, 2);
    iBlock.velocityY = 1
    iBlock.lifetime = 900
    iBlockGroup.add(iBlock);
    iBlock.visible = false
 
  }

}

