var track;
var main;
var mainImg;
var start;
var startImg;
var g1 = "main";
var ground;
var hurdle;
var runner;
var runner_running;
var score = 0;
var coinImg;
var coinGroup;
var obstaclesGroup;
var collided;
var note, noteImg;
var gameOver, gameOverImg;
var title;
function preload()
{
  mainImg = loadImage("main.jpg");
  startImg = loadImage("start.png");
  track = loadImage("track.jpg");
  hurdle = loadImage("hurdle.png");
  runner_running = loadAnimation("1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png", "11.png", "12.png");
  coinImg = loadImage("coin.png");
  collided = loadAnimation("collided.png");
  noteImg = loadImage("note.jpg");
  gameOverImg = loadImage("gameOver.jpg");

}

function setup() {
  createCanvas(900, 600);


  main = createSprite(450,300,900,600);
  main.addImage(mainImg);
  main.visible = true;

  gameOver = createSprite(450,300,900,600);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  start = createSprite(440,510,70,100);
  start.addImage(startImg);
  start.visible = true;

  note = createSprite(440,580,70,100);
  note.addImage(noteImg);
  note.visible = true;
  note.scale = 0.7;

  runner = createSprite(100,480,10,40);
  runner.addAnimation("Running",runner_running);
  runner.velocityX = 10;
  runner.scale = 0.8;
  runner.visible = false;
  
  ground = createSprite(450,550,100000000000000,10);
  ground.x=ground.width/2;
  ground.visible=false;

  coinGroup = new Group();
  obstaclesGroup = new Group();

  title = createElement('h1');
  title.html("Game Over!!!!");
  title.position(550, 300);
  title.hide();

}
  
  


function draw() {  

  background(track);

  if(mousePressedOver(start)){
    main.visible = false;
    start.visible = false; 
    note.visible = false;
    g1="play";
  }

  drawSprites();
 
  if(g1 === "play"){

    runner.collide(ground);

    runner.visible = true;

    camera.position.x =runner.x;

    if(keyDown("space") && runner.y >=450){
      runner.velocityY = -17;
    } 
    
    runner.velocityY = runner.velocityY+0.8;

    if(coinGroup.isTouching(runner)){
      coinGroup.destroyEach();
      score = score + 20;
    }
    if(obstaclesGroup.isTouching(runner)){
      g1 = "end";
    }

    spawnObstacles();
    coins();

    drawSprites();
    
    fill(255);
    textSize(25)
    text("Score:  "+ score, runner.x-30, runner.y-100);
  }

  if(g1 === "end"){
    runner.velocityX=0;
    runner.velocityY=0;
    runner.visible = false;
    title.show();

  }

}

function spawnObstacles() {
  if(frameCount % 350 === 0) {
    var obstacle = createSprite(800,510,10,40);
    obstacle.x = runner.x + 1000;
    obstacle.addImage(hurdle);
    obstacle.scale = 0.3;
    runner.depth = obstacle.depth + 1;
    obstacle.lifetime = 350;
    obstaclesGroup.add(obstacle);
  }
}
function coins() {
  if(frameCount % 150 === 0) {
    var coin = createSprite(800,470,10,40);
    coin.x = runner.x + 1000;
    coin.addImage(coinImg);
    coin.scale = 0.2;
    runner.depth = coin.depth + 1;
    coin.lifetime = 350;
    coinGroup.add(coin);
  }
}
