var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


axisScale = 0.9;    // to set scale of the canvas
arc_count=4;        // to set a number of arcs
degrees={0:'0',1:'-30',2:'-60',3:'-90',4:'-120',5:'-150',6:'-180',7:'150',8:'120',9:'90',10:'60',11:'30'};

o1 = {
    x: canvas.width*0.75,
    y: canvas.height*0.25,
}
o2 = {
    x: canvas.width*0.25,
    y: canvas.height*0.25,
}
o3 = {
    x: canvas.width*0.25,
    y: canvas.height*0.75,
}
o4 = {
    x: canvas.width*0.75,
    y: canvas.height*0.75,
}

leftBottomAxes = new Axes(o3.x,o3.y);
leftTopAxes = new Axes(o2.x,o2.y);
rightTopAxes = new Axes(o1.x,o1.y);
rightBottomAxes = new Axes(o4.x,o4.y);

// to calculate coordinates of the turned point
// https://foxford.ru/wiki/informatika/povorot-tochki
function calcCoordinatesOfTurnedPoint(oX, oY, curPointX, curPointY, degree){
    turnedPointX = oX + (curPointX-oX)*Math.cos(Math.PI/180*degree) - (curPointY-oY)*Math.sin(Math.PI/180*degree);
    turnedPointY = oY + (curPointX-oX)*Math.sin(Math.PI/180*degree) + (curPointY-oY)*Math.cos(Math.PI/180*degree);
    return {'x': turnedPointX, 'y': turnedPointY};
}

canvas.onmousedown = function(event){
    var x = event.offsetX;
    var y = event.offsetY;

    if (vectorOrange.clickDistance(x,y)<25){
        vectorOrange.isCaptured = true;
    }
    else if (vectorOrange3.clickDistance(x,y)<25){
        vectorOrange3.isCaptured = true;
    }
}

canvas.onmousemove = function(event){
    var x = event.offsetX;
    var y = event.offsetY;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        leftBottomAxes.draw();
        leftTopAxes.draw();
        rightTopAxes.draw();
        rightBottomAxes.draw();

        // drawing directSequence if any vector is captured onmousedown and moved
        if (vectorOrange.isCaptured){
            posSeq.draw(x,y,5);
        } else {
            // drawing directSequence if any vector is captured onmousemove
            if (vectorOrange.clickDistance(x,y)<25){
                vectorOrange.isLighted = true;
                posSeq.draw(vectorOrange.xPrev,vectorOrange.yPrev,5);
            }
            else{
                posSeq.draw(vectorOrange.xPrev,vectorOrange.yPrev);
                vectorOrange.isLighted = false;
            }
        }

        // drawing directSequence if any vector is captured onmousedown and moved
        if (vectorOrange3.isCaptured){
            negSeq.draw(x,y,5);
        } else {
            // drawing directSequence if any vector is captured onmousemove
            if (vectorOrange3.clickDistance(x,y)<25){
                vectorOrange3.isLighted = true;
                negSeq.draw(vectorOrange3.xPrev,vectorOrange3.yPrev,5);
            }
            else{
                negSeq.draw(vectorOrange3.xPrev,vectorOrange3.yPrev);
                vectorOrange3.isLighted = false;
            }
        }
    
    document.getElementById("Va").value = vectorOrange.radius();
    document.getElementById("Vb").value = vectorGreen.radius();
    document.getElementById("Vc").value = vectorRed.radius();
    document.getElementById("FIa").value = vectorOrange.xPrev;
    document.getElementById("FIb").value = vectorOrange.xPrev;
    document.getElementById("FIc").value = vectorOrange.xPrev;
}

canvas.onmouseup = function(event){
    vectorRed.isCaptured = vectorGreen.isCaptured = vectorOrange.isCaptured = false;
    vectorRed3.isCaptured = vectorGreen3.isCaptured = vectorOrange3.isCaptured = false;
}

canvas.onmouseout = function(event){
    vectorRed.isCaptured = vectorGreen.isCaptured = vectorOrange.isCaptured = false;
    vectorRed3.isCaptured = vectorGreen3.isCaptured = vectorOrange3.isCaptured = false;
}


leftBottomAxes.draw()
leftTopAxes.draw()
rightTopAxes.draw()
rightBottomAxes.draw()

let initXOrange = o1.x;
let initYOrange = o1.y-canvas.width/4*axisScale;
let vectorOrange = new Vector(o1.x, o1.y,initXOrange,initYOrange);
let initXGreen=calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange, initYOrange, 120)['x'];
let initYGreen=calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange, initYOrange, 120)['y'];
let vectorGreen = new Vector(o1.x, o1.y,initXGreen,initYGreen);
let initXRed = calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange, initYOrange, -120)['x'];
let initYRed = calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange, initYOrange, -120)['y'];
let vectorRed = new Vector(o1.x, o1.y,initXRed,initYRed);

let posSeq = new Sequence(vectorOrange,vectorGreen,vectorRed,o1.x, o1.y);
posSeq.draw(initXOrange,initYOrange);


let initXOrange3 = o3.x;
let initYOrange3 = o3.y-canvas.width/4*axisScale;
let vectorOrange3 = new Vector(o3.x, o3.y,initXOrange3,initYOrange3);
let initXGreen3=calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, -120)['x'];
let initYGreen3=calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, -120)['y'];
let vectorGreen3 = new Vector(o3.x, o3.y,initXGreen3,initYGreen3);
let initXRed3 = calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, 120)['x'];
let initYRed3 = calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, 120)['y'];
let vectorRed3 = new Vector(o3.x, o3.y,initXRed3,initYRed3);

let negSeq = new Sequence(vectorOrange3,vectorRed3,vectorGreen3,o3.x, o3.y);
negSeq.draw(initXOrange3,initYOrange3);

// init html input fields
document.getElementById("Va").value = vectorOrange.radius();
document.getElementById("Vb").value = vectorGreen.radius();
document.getElementById("Vc").value = vectorRed.radius();
document.getElementById("FIa").value = vectorOrange.xPrev;
document.getElementById("FIb").value = vectorOrange.xPrev;
document.getElementById("FIc").value = vectorOrange.xPrev;

