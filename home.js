var AndroidLocking = {

canvas: null,
canvas2: null,
ctx: null,
ctx2: null,
pointsX: [],
pointsY: [],
swipeStarted: 0,
swipeEnded: 0,
startSwipe: -1,
startSwipeX: -1,
startSwipeY: -1,
endSwipeX: -1,
endSwipeY: -1,
passWordX:[],
passWordY:[],
countPoints:0,
lastPoint: -1,
status: 0,
passButton: null,
passWordFirstX: null,
passWordFirstY: null,
passWordSecondX: null,
passWordSecondY: null,

init: function init(){
    this.canvas=document.getElementById("canvas");
    this.canvas2=document.getElementById("canvas2");
    this.ctx=canvas.getContext("2d");
    this.ctx2=canvas2.getContext("2d");
    this.DrawDottedLine(this.ctx,0,0,300,300,20,3,"black");
    canvas2.addEventListener("mousedown",this.doMouseDown, false);
    canvas2.addEventListener("mousemove",this.doMouseMove, false);
    canvas2.addEventListener("mouseup",this.doMouseUp, false);
    this.passButton = document.getElementById("pass_controller");
    this.passButton.addEventListener("click",this.newPassword,false);
},

newPassword: function newPassword(event){
    AndroidLocking.ctx2.clearRect(0,0,300,300);
},

doMouseUp: function doMouseUp(event){
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    if(event.offsetX) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    }
    else if(event.layerX) {
        mouseX = event.layerX;
        mouseY = event.layerY;
    }
    //console.log("Mouse Up "+ mouseX + "," + mouseY);
    AndroidLocking.swipeStarted = 0;
    if(AndroidLocking.lastPoint > -1){
        AndroidLocking.passWordX.push(AndroidLocking.pointsX[AndroidLocking.lastPoint]);
        AndroidLocking.passWordY.push(AndroidLocking.pointsY[AndroidLocking.lastPoint]);
    }
    AndroidLocking.countPoints = AndroidLocking.countPoints + 1;
    console.log(AndroidLocking.lastPoint);
    console.log(AndroidLocking.countPoints);
    console.log(AndroidLocking.passWordX);
    console.log(AndroidLocking.passWordY);
    if(AndroidLocking.countPoints > 1){
        if(AndroidLocking.status == 0){
            AndroidLocking.status = 1;
            alert("Please Re enter the password.");
            AndroidLocking.ctx2.clearRect(0,0,300,300);
            AndroidLocking.passWordFirstX = AndroidLocking.passWordX;
            AndroidLocking.passWordFirstY = AndroidLocking.passWordY;
        }else{
            //Compare the passwords and reset if the password is wrong
        }
    }
},

doMouseMove: function doMouseMove(event){
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    if(event.offsetX) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    }
    else if(event.layerX) {
        mouseX = event.layerX;
        mouseY = event.layerY;
    }

    if(AndroidLocking.swipeStarted == 1 && AndroidLocking.startSwipe > -1){
        var temp = AndroidLocking.ctx2;
        var startPoint = AndroidLocking.startSwipe;
        temp.beginPath();
        //console.log("First Point" + AndroidLocking.pointsX[startPoint] +"," +  AndroidLocking.pointsY[startPoint]);
        temp.moveTo(AndroidLocking.pointsX[startPoint] ,  AndroidLocking.pointsY[startPoint]);
        var onPoint = AndroidLocking.isDownOnDot(mouseX,mouseY);
        //console.log(onPoint);
        if(onPoint > -1){
            AndroidLocking.passWordX.push(AndroidLocking.pointsX[startPoint]);
            AndroidLocking.passWordY.push(AndroidLocking.pointsY[startPoint]);
            AndroidLocking.countPoints = AndroidLocking.countPoints + 1;
            //console.log("Second point: " + AndroidLocking.pointsX[onPoint] + "," +  AndroidLocking.pointsY[onPoint]);
            temp.lineTo(AndroidLocking.pointsX[onPoint], AndroidLocking.pointsY[onPoint]);
            temp.stroke();
            temp.lineWidth = 12;
            AndroidLocking.startSwipe = onPoint;
            AndroidLocking.lastPoint = onPoint;
        }else{

        }
    }
},

doMouseDown: function doMouseDown(event){
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    if(event.offsetX) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    }
    else if(event.layerX) {
        mouseX = event.layerX;
        mouseY = event.layerY;
    }

    AndroidLocking.ctx2.clearRect(0,0,300,300);
    console.log("Mouse Down "+ mouseX + "," + mouseY);
    AndroidLocking.swipeStarted = 1;
    AndroidLocking.startSwipe = AndroidLocking.isDownOnDot(mouseX,mouseY);
    AndroidLocking.countPoints = 0;
},

isDownOnDot: function isDownOnDot(mouseX,mouseY){
    var isOnDot = -1;
    for(point in this.pointsX){
        //alert(this.pointsX[point]+ "," + this.pointsY[point]);
        var distance = Math.sqrt((mouseX-this.pointsX[point])*(mouseX-this.pointsX[point]) + (mouseY-this.pointsY[point])*(mouseY-this.pointsY[point]));
        if(distance < 20){
            isOnDot = point;
        }
    }
    return isOnDot;
},

DrawDottedLine: function DrawDottedLine(ctx,x1,y1,x2,y2,dotRadius,rows,dotColor){
  var dx=x2-x1;
  var dy=y2-y1;
  console.log(dx + "," + dy);
  var spaceX=dx/(rows + 1);
  var spaceY=dy/(rows + 1);
  console.log(spaceX + "," + spaceY);
  var newY = y1;
  var newX = x1;
  for (var i=0;i<rows;i++){
    newY+=spaceY;
    for(var j=0;j<rows;j++){
        newX+=spaceX;
        //console.log(newX + "," + newY);
        this.drawDot(ctx,newX,newY,dotRadius,dotColor);
        this.pointsX.push(newX);
        this.pointsY.push(newY);
    }
    newX = x1;
   }
},

drawDot: function drawDot(ctx,x,y,dotRadius,dotColor){
  ctx.beginPath();
  ctx.arc(x,y, dotRadius, 0, 2 * Math.PI, false);
  ctx.fillStyle = dotColor;
  ctx.fill();
}
};

Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
