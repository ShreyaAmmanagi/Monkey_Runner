
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var score;
var stop;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  stop = loadAnimation("sprite_1.png")
  
}



function setup() {
  createCanvas(400, 400)
  ground = createSprite(200, 350, 900, 5);
  monkey = createSprite(20, 340, 30, 30);
  monkey.addAnimation("adding", monkey_running);
  monkey.scale = 0.1;
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.debug = true;
  monkey.setCollider("rectangle", -50, 0, 350, 350)
  score = 0;
}


function draw() {
  background("skyblue")
  stroke("green")
  fill("blue")
  text("SCORE ~ "+score, 150, 50);
  
  ground.velocityX = -5;
  if(ground.x<0){
    ground.x = 200;
  }
  if(keyDown("space")&&monkey.y>=250){
    monkey.velocityY = -10;
  }  
  monkey.velocityY = monkey.velocityY + 1;
                                         
  if(monkey.isTouching(FoodGroup)){
  score = score+1;
  FoodGroup.destroyEach();
  }
  
  if(monkey.isTouching(obstaclesGroup)){
  monkey.velocityY = 0;
  ground.velocityX = 0;
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  textSize(20)
  stroke("turquoise")
  fill("black")
  text("Game Over", 150, 200);
  monkey.changeAnimation("adding", stop);
  monkey.y = 316;
  }
    
  obstacles();
  bananas();
     
  if(score == 10){
    textSize(30)
    stroke("red");
    fill("purple")
    text("Awesome!!", 150, 100);
  }
  if(score == 20){
    textSize(30);
    fill("purple");
    stroke("red");
    text("Great!!", 150, 100)
  }
      

  monkey.collide(ground);


  drawSprites();

}
function obstacles(){
  if(frameCount%100 == 0){
    obstacle = createSprite(600, 330, 30, 30);
    obstacle.addImage("adding", obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -(5 + 5*score/5);
    obstacle.lifetime = 120;
    obstaclesGroup.add(obstacle);
    
  }
}
function bananas(){
  if(frameCount%50 == 0){
    banana = createSprite(600, 200, 30, 30);
    banana.addImage("adding", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(5 + 5*score/5);
    banana.lifetime = 120;
    FoodGroup.add(banana);
  }
}
function restart(){
  ground.velocityX = -5;
  if(ground.x<0){
    ground.x = 200;
  }
  if(keyDown("space")&&monkey.y>=250){
    monkey.velocityY = -10;
  }  
  monkey.velocityY = monkey.velocityY + 1;
                                         
  if(monkey.isTouching(FoodGroup)){
  score = score+1;
  FoodGroup.destroyEach();
  }
   
  obstacles();
  bananas();
}



