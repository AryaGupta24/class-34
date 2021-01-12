var ball1, database;
var ballpos
function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball1 = createSprite(250,250,10,10);
    ball1.shapeColor = "red";
    var ballpos = database.ref('ball/position');
    ballpos.on("value", readposition, showerror);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
       writePosition(-1, 0); 
    }
    else if(keyDown(RIGHT_ARROW)){
       writePosition(1, 0);
    }
    else if(keyDown(UP_ARROW)){
       writePosition(0, -1);
    }
    else if(keyDown(DOWN_ARROW)){
       writePosition(0, 1);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set( {
      x: ball1.x + x, 
      y: ball1.y + y
    });
}

function readposition(data){
    position = data.val();
    ball1.x = position.x
    ball1.y = position.y
}

function showerror(){
   console.log("error");
}