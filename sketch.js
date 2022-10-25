
var bg,backgroundimg
var sprite;

var jerryImgRight,jerryImgLeft,jerryImgUp,jerry

var tom, tomImgLeft,tomImgRight;

var cheese,cheeseImg,cheeseGrp,cheesecount=0

var heart,lifes=3

function preload() {
    backgroundimg = loadImage('assets/kitchenbg.jpg')

    jerryImgRight = loadAnimation("assets/jerry1.png","assets/jerry2.png","assets/jerry3.png","assets/jerry4.png")
    jerryImgLeft = loadAnimation("assets/jerryl1.png","assets/jerryl2.png","assets/jerryl3.png","assets/jerryl4.png")

    cheeseImg = loadImage("assets/cheese.png")

   // tomImgLeft=loadAnimation("assets/tom1.png",'assets/tom2.png','assets/tom3.png','assets/tom4.png');
      tomImgLeft=loadAnimation("tom1.png",'tom2.png','tom3.png','tom4.png');

   // tomImgRight=loadAnimation("assets/tom1r.png",'assets/tom2r.png','assets/tom3r.png','assets/tom4r.png');
      tomImgRight=loadAnimation("tom1r.png",'tom2r.png','tom3r.png','tom4r.png');

    //heart = loadImage("assets/heart.png")
    
}

function setup() {
    createCanvas(windowWidth,windowHeight)

    jerry = createSprite(200,height-50)
    jerry.addAnimation("runningRight",jerryImgRight)
    jerry.addAnimation("runningLeft",jerryImgLeft)

    tom=createSprite(width-100,height-100);
    tom.addAnimation('tomLeft',tomImgLeft);
    tom.addAnimation('tomRight',tomImgRight);
    tom.scale=1.5

    cheeseGrp = createGroup()
    
    
}

function draw() {
    background(backgroundimg)

    image(cheeseImg,width - 180,70,120,70)
    textSize(30)
    fill ("black")
    text(cheesecount,width - 130,125)

    //for(i = 0; i < lifes; i++){
     //   image(heart,30+(i*70),50,40,40)
    //}

    if(keyDown(RIGHT_ARROW)){
        jerry.changeAnimation("runningRight")
        jerry.rotation = 0
        jerry.x+=5
    }

    if(keyDown(LEFT_ARROW)){
        jerry.rotation=0
        jerry.changeAnimation("runningLeft")
       
        jerry.x-=5
       
    } 

    if(keyDown(UP_ARROW)){
        jerry.changeAnimation("runningRight")
      
        jerry.rotation=300
        jerry.y-=5
       
    }

    if(keyDown(DOWN_ARROW)){
        jerry.changeAnimation("runningRight")
        jerry.rotation=100
        jerry.y+=5
       
    }






    if(keyDown('d')){
        tom.changeAnimation("tomRight")
        tom.rotation = 0
    
        tom.x+=5
    }

    if(keyDown('a')){
        tom.rotation=0
        tom.changeAnimation("tomLeft")
       
        tom.x-=5
    } 

    if(keyDown('w')){
        tom.changeAnimation("tomLeft")
      
        tom.rotation=100
        tom.y-=5
    }

    if(keyDown('s')){
        tom.changeAnimation("tomLeft")
        tom.rotation=290
        tom.y+=5
    }

    jerry.collide(cheeseGrp,(j,chs)=>{
        chs.remove()
        cheesecount += 1
    })

    if(tom.isTouching(jerry)){
        lifes -= 1
        jerry.x = 200
        jerry.y = height-50
    }

    if(lifes == 0){
        tom.remove()
        jerry.remove()
        cheeseGrp.destroyEach()
        gameOver()
    }

    spawnCheese()

    drawSprites()
}

function spawnCheese(){
  if(frameCount % 200 === 0){
    cheese = createSprite(random(0,width),random(0,height))
    cheese.addImage(cheeseImg)
    cheese.scale = 0.09
    cheeseGrp.add(cheese)
  }
}

function gameOver() {
    swal(
      {
        title: `Tomm is the winner!!!`,
        text: "Thanks for playing!!",
        imageUrl:
          "assets/tom laughing.jpg",
        imageSize: "100x100",
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
  