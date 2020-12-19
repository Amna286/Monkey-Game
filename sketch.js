var gameState;
var monkey, monkeyRunning, monkeyDie;
var ground;
var bananaImage, bananaGroup;
var obstacleImage, obstacleGroup;
var score = 0, survivalTime = 0;

function preload(){
  // load monkey images
  monkeyRunning =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  //monkeyDie = loadAnimation();

  // load banana and obstacle images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}


function setup() {
  gameState = 1;
  
  // creates monkey
  monkey = createSprite(50, 260);
  monkey.addAnimation("moving", monkeyRunning);
  monkey.scale = 0.1;

  // creates ground
  ground = createSprite(200, 300, 900, 10);
  
  // creates groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  // background colour
  background("lightcyan");
  
  // text style
  stroke("navy");
  fill("navy");
  textSize(15);

  // display score
  text("Score: " + score, 10, 20);
  
  // gravity
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);

  // code for ground
  ground.velocityX = -3;
  ground.x = ground.width / 2;
  
  // display survival time
  text("Survival time: " + survivalTime, 10, 40);
  
  // changes game state to end if monkey hits obstacle
  if (obstacleGroup.isTouching(monkey)) {
    gameState = 0;
  }
  
  if (gameState === 1) {
    // count survival time
    survivalTime = Math.ceil(frameCount / frameRate());
  
    // code for monkey
    if (keyDown("space") && monkey.y >= 260) {
      monkey.velocityY = -13;
    }
  
    // functions
    food();
    obstacles();
    }
  else if (gameState === 0) {
    // stop objects moving
    monkeyvelocityX = 0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    // make objects on screen not be destroyed
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    // change animation of monkey sprite
    //monkey.changeAnimation();
  }

  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    // create banana
    var banana = createSprite(400, 260);
    banana.addImage("food", bananaImage);
    banana.scale = 0.1;
    
    // banana position
    banana.y = Math.round(random(125, 200));
    banana.velocityX = -3;
    banana.lifetime = 500;
    
    // banana group
    bananaGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0) {
    // create obstacle
    var obstacle = createSprite(400, 273);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.1;
    
    // obstacle position
    obstacle.velocityX = -4 //-(6 + score / 100);
    obstacle.lifetime = 500;
    
    // obstacle group
    obstacleGroup.add(obstacle);
  }
}