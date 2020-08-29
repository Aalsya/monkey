var ground , jungle;
var stoneimage , obstaclesgroup;
var monkey , player;
var bananaimage , foodgroup;
var iground;

var score = 0;
var lifetime = 0;

function preload() {
  jungle = loadImage("jungle.png");
  
  player = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png","Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  
  bananaimage = loadImage("banana.png");
  stoneimage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 250);
  
  ground = createSprite(200,140,10,10);
  ground.addImage(jungle);
  
  iground = createSprite(200,240,400,10);
  iground.visible = false;
  
  foodgroup = new Group();
  obstaclesgroup = new Group();
  
  monkey = createSprite(50,225,10,10);
  monkey.addAnimation("run",player);
  monkey.scale = 0.075;
}

function draw() {
  background("white");
  edges = createEdgeSprites();
  Banana();
  Stones();
  
  ground.velocityX = -5;
  if (ground.x < 0) {
    ground.x = ground.width / 2;  
  }
  
  if (mouseDown("leftButton") && monkey.y >= 200) {
    monkey.velocityY = -14;
  }monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(iground);
  
  switch(score) {
    case 10 : monkey.scale = 0.08;
    break;
    case 20 : monkey.scale = 0.085;
    break;
    case 30 : monkey.scale = 0.09;
    break;
    case 40 : monkey.scale = 0.095;
    break;
    case 50 : monkey.scale = 0.1;
    break;
    default : break;
  }
  
  drawSprites();
  
  stroke("black");
  fill("white");
  textSize(20);
  text("SCORE : " + score ,150,40);
  
  stroke("black");
  fill("red");
  textSize(25);
  text("SURVIVAL TIME - " + lifetime ,100,20);
  lifetime = (Math.round(frameCount / 6));
}

function Banana() {
  if (frameCount % 100 === 0) {
    var food = createSprite(450,160,50,50);
    food.y = Math.round(random(100,120));
    food.addImage(bananaimage);
    foodgroup.add(food);
    foodgroup.setVelocityEach(-6,0);
    foodgroup.setScaleEach(0.1);
  }
  if (monkey.isTouching(foodgroup)) {
    foodgroup.destroyEach();
    score = score + 2;
  }
}

function Stones() {
  if (frameCount % 80 === 0) {
    var stone = createSprite(450,220,10,10);
    stone.addImage(stoneimage);
    stone.collide(iground);
    obstaclesgroup.add(stone);
    obstaclesgroup.setVelocityEach(-8,0);
    obstaclesgroup.setScaleEach(0.1);
    obstaclesgroup.setLifetimeEach(90);
  }
  if (obstaclesgroup.isTouching(monkey)) {
    score = 0;
    monkey.scale = 0.075;
  }
}