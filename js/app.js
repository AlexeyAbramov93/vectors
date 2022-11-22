var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

axisScale = 0.8;    // to set scale of the canvas
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

canvas.onmousedown = function(event){
    var x = event.offsetX;
    var y = event.offsetY;

    if (vectorOrange2.clickDistance(x,y)<25){
        vectorOrange2.isCaptured = true;
    }
    else if (vectorOrange3.clickDistance(x,y)<25){
        vectorOrange3.isCaptured = true;
    }
    else if (vectorOrange4.clickDistance(x,y)<25){
        vectorOrange4.isCaptured = true;
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
        if (vectorOrange2.isCaptured){
            posSeq.draw(x,y,5);
        } else {
            // drawing directSequence if any vector is captured onmousemove
            if (vectorOrange2.clickDistance(x,y)<25){
                vectorOrange2.isLighted = true;
                posSeq.draw(vectorOrange2.xPrev,vectorOrange2.yPrev,5);
            }
            else{
                posSeq.draw(vectorOrange2.xPrev,vectorOrange2.yPrev);
                vectorOrange2.isLighted = false;
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
		
        // drawing directSequence if any vector is captured onmousedown and moved
        if (vectorOrange4.isCaptured){
            zeroSeq.drawZeroSequence(x,y,5);
        } else {
            // drawing directSequence if any vector is captured onmousemove
            if (vectorOrange4.clickDistance(x,y)<25){
                vectorOrange4.isLighted = true;
                zeroSeq.drawZeroSequence(vectorOrange4.xPrev,vectorOrange4.yPrev,5);
            }
            else{
                zeroSeq.drawZeroSequence(vectorOrange4.xPrev,vectorOrange4.yPrev);
                vectorOrange4.isLighted = false;
            }
        }
		
    document.getElementById("Va").value = vectorOrange2.radius();
    document.getElementById("Vb").value = vectorGreen2.radius();
    document.getElementById("Vc").value = vectorRed2.radius();
    document.getElementById("FIa").value = vectorOrange2.xPrev;
    document.getElementById("FIb").value = vectorOrange2.xPrev;
    document.getElementById("FIc").value = vectorOrange2.xPrev;
}

canvas.onmouseup = function(event){
    vectorRed2.isCaptured = vectorGreen2.isCaptured = vectorOrange2.isCaptured = false;
    vectorRed3.isCaptured = vectorGreen3.isCaptured = vectorOrange3.isCaptured = false;
    vectorRed4.isCaptured = vectorGreen4.isCaptured = vectorOrange4.isCaptured = false;

}

canvas.onmouseout = function(event){
    vectorRed2.isCaptured = vectorGreen2.isCaptured = vectorOrange2.isCaptured = false;
    vectorRed3.isCaptured = vectorGreen3.isCaptured = vectorOrange3.isCaptured = false;
    vectorRed4.isCaptured = vectorGreen4.isCaptured = vectorOrange4.isCaptured = false;

}

leftBottomAxes.draw()
leftTopAxes.draw()
rightTopAxes.draw()
rightBottomAxes.draw()

// to calculate coordinates of the turned point
// https://foxford.ru/wiki/informatika/povorot-tochki
function calcCoordinatesOfTurnedPoint(oX, oY, curPointX, curPointY, degree){
    turnedPointX = oX + (curPointX-oX)*Math.cos(Math.PI/180*degree) - (curPointY-oY)*Math.sin(Math.PI/180*degree);
    turnedPointY = oY + (curPointX-oX)*Math.sin(Math.PI/180*degree) + (curPointY-oY)*Math.cos(Math.PI/180*degree);
    return {'x': turnedPointX, 'y': turnedPointY};
}

let initXOrange2 = o1.x;
let initYOrange2 = o1.y-canvas.width/4*axisScale+50;
let vectorOrange2 = new Vector(o1.x, o1.y,initXOrange2,initYOrange2, 'orange');
let initXGreen2=calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange2, initYOrange2, 120)['x'];
let initYGreen2=calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange2, initYOrange2, 120)['y'];
let vectorGreen2 = new Vector(o1.x, o1.y,initXGreen2,initYGreen2, 'green');
let initXRed2 = calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange2, initYOrange2, -120)['x'];
let initYRed2 = calcCoordinatesOfTurnedPoint(o1.x, o1.y, initXOrange2, initYOrange2, -120)['y'];
let vectorRed2 = new Vector(o1.x, o1.y,initXRed2,initYRed2, 'red');

let posSeq = new Sequence(vectorOrange2,vectorGreen2,vectorRed2,o1.x, o1.y);
posSeq.draw(initXOrange2,initYOrange2);


let initXOrange3 = o3.x;
let initYOrange3 = o3.y-canvas.width/4*axisScale+50;
let vectorOrange3 = new Vector(o3.x, o3.y,initXOrange3,initYOrange3, 'orange');
let initXGreen3=calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, -120)['x'];
let initYGreen3=calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, -120)['y'];
let vectorGreen3 = new Vector(o3.x, o3.y,initXGreen3,initYGreen3, 'green');
let initXRed3 = calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, 120)['x'];
let initYRed3 = calcCoordinatesOfTurnedPoint(o3.x, o3.y, initXOrange3, initYOrange3, 120)['y'];
let vectorRed3 = new Vector(o3.x, o3.y,initXRed3,initYRed3, 'red');

let negSeq = new Sequence(vectorOrange3,vectorRed3,vectorGreen3,o3.x, o3.y);
negSeq.draw(initXOrange3,initYOrange3);


let initXOrange4 = o4.x;
let initYOrange4 = o4.y-canvas.width/4*axisScale+50;
let vectorOrange4 = new Vector(o4.x, o4.y,initXOrange4,initYOrange4, 'orange');
let vectorGreen4 = new Vector(o4.x, o4.y,initXOrange4,initYOrange4, 'green');
let vectorRed4 = new Vector(o4.x, o4.y,initXOrange4,initYOrange4, 'red');

let zeroSeq = new Sequence(vectorOrange4,vectorGreen4,vectorRed4,o4.x, o4.y);
zeroSeq.drawZeroSequence(initXOrange4,initYOrange4);


// init html input fields
document.getElementById("Va").value = vectorOrange2.radius();
document.getElementById("Vb").value = vectorGreen2.radius();
document.getElementById("Vc").value = vectorRed2.radius();
document.getElementById("FIa").value = vectorOrange2.xPrev;
document.getElementById("FIb").value = vectorOrange2.xPrev;
document.getElementById("FIc").value = vectorOrange2.xPrev;