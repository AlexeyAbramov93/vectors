var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


axisScale = 0.9;    // to set scale of the canvas

// shifted origin of the canvas geometic center 
o = {
    x: canvas.width*0.75,
    y: canvas.height*0.25,
}

// to draw axes from the canvas geometic center 
function drawAxes(width=0.3){
    ctx.save();
    ctx.lineWidth = width;
    ctx.strokeStyle = 'black';
    arc_count=4;        // to set a number of arcs
    for (let i=0;i<arc_count;i++){
        ctx.beginPath();
        ctx.arc(o.x,o.y,(0.25*canvas.width/arc_count*(i+1))*axisScale,0,Math.PI*2);
        ctx.stroke();
    }

    degrees={0:'0',1:'-30',2:'-60',3:'-90',4:'-120',5:'-150',6:'-180',7:'150',8:'120',9:'90',10:'60',11:'30'};
    for (let i=0;i<12;i++){
        ctx.beginPath();
        ctx.moveTo(o.x,o.y);
        ctx.lineTo(o.x,o.y*(1-axisScale));
        ctx.font = "16px serif";
        ctx.textAlign = "center";
        ctx.fillText(degrees[i], o.x, o.y*(0.98-axisScale));
        ctx.stroke();
        ctx.translate(o.x, o.y);            // translate to rectangle center
        ctx.rotate((Math.PI / 180) * 30);   // rotate
        ctx.translate(-o.x, -o.y);          // translate back
    }
    ctx.restore();
}

class Vector {

    xPrev;
    yPrev;
    
    isLighted = false; // true if vector is captured onmousemove, otherwise false
    isCaptured = false; // true if the vector is captured onmousedown, otherwise false

    constructor(xPrev, yPrev) {
      this.xPrev = xPrev;
      this.yPrev = yPrev;
    }

    radius() {  // to calculate distance from center to vector point
        return (((this.xPrev-o.x)**2 + (this.yPrev-o.y)**2)**0.5/200/axisScale).toFixed(2);
    }

    clickDistance(x,y) { // to calculate distance from click point to vector point
        return ((this.xPrev-x)**2+(this.yPrev-y)**2)**0.5;
    }

    draw (x1,y1,color,width=3){ // to draw vector from center to point(x1,y1)
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        // draw line
        ctx.beginPath();
        ctx.moveTo(o.x,o.y);
        ctx.lineTo(x1,y1);
        ctx.stroke();

        var arrow_div = 1.15;
        var arrow_angle = 3;
        // draw the first arrow half
        ctx.beginPath();
        ctx.translate(o.x, o.y);    // translate to rectangle center
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.lineTo(x1-o.x,y1-o.y);
        ctx.stroke();

        // draw the second arrow half
        ctx.beginPath();
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.lineTo(x1-o.x,y1-o.y);
        ctx.stroke();

        ctx.restore();
    }
}

// to calculate coordinates of the turned point
// https://foxford.ru/wiki/informatika/povorot-tochki
function calcCoordinatesOfTurnedPoint(curPointX, curPointY, oX, oY, degree){
    turnedPointX = oX + (curPointX-oX)*Math.cos(Math.PI/180*degree) - (curPointY-oY)*Math.sin(Math.PI/180*degree);
    turnedPointY = oY + (curPointX-oX)*Math.sin(Math.PI/180*degree) + (curPointY-oY)*Math.cos(Math.PI/180*degree);
    return {'x': turnedPointX, 'y': turnedPointY};
}

let initXOrange = o.x;
let initYOrange = (o.y*0.25)/axisScale;
console.log(`o.x:${o.x} o.y: ${o.y}`);
console.log(`initXOrange:${initXOrange} initYOrange: ${initYOrange}`);
let vectorOrange = new Vector(initXOrange,initYOrange);
let initXGreen=calcCoordinatesOfTurnedPoint(initXOrange, initYOrange, o.x, o.y, 120)['x'];
let initYGreen=calcCoordinatesOfTurnedPoint(initXOrange, initYOrange, o.x, o.y, 120)['y'];
let vectorGreen = new Vector(initXGreen,initYGreen);
let initXRed = calcCoordinatesOfTurnedPoint(initXOrange, initYOrange, o.x, o.y, -120)['x'];
let initYRed = calcCoordinatesOfTurnedPoint(initXOrange, initYOrange, o.x, o.y, -120)['y'];
let vectorRed = new Vector(initXRed,initYRed);


// draw three 120-degrees shifted myLines 
directSequence = {
    draw: function(x1,y1,width){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxes();
        if (vectorGreen.isCaptured || vectorGreen.isLighted){
            vectorGreen.draw(x1,y1,'green',width=width)
            x2 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['x'];
            y2 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['y'];
            vectorRed.draw(x2,y2,'red',width=width)
            x3 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['x'];
            y3 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['y'];
            vectorOrange.draw(x3,y3,'orange',width=width);
            vectorGreen.xPrev = x1;
            vectorGreen.yPrev = y1;
            vectorRed.xPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['x'];
            vectorRed.yPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['y'];
            vectorOrange.xPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['x'];
            vectorOrange.yPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['y'];
        } else if (vectorRed.isCaptured || vectorRed.isLighted){
            vectorRed.draw(x1,y1,'red',width=width)
            x2 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['x'];
            y2 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['y'];
            vectorOrange.draw(x2,y2,'orange',width=width)
            x3 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['x'];
            y3 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['y'];
            vectorGreen.draw(x3,y3,'green',width=width);
            vectorRed.xPrev = x1;
            vectorRed.yPrev = y1;
            vectorOrange.xPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['x'];
            vectorOrange.yPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['y'];
            vectorGreen.xPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['x'];
            vectorGreen.yPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['y'];
        } else if (vectorOrange.isCaptured || vectorOrange.isLighted){
            vectorOrange.draw(x1,y1,'orange',width=width)
            x2 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['x'];
            y2 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['y'];
            vectorGreen.draw(x2,y2,'green',width=width)
            x3 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['x'];
            y3 = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['y'];
            vectorRed.draw(x3,y3,'red',width=width)
            vectorOrange.xPrev = x1;
            vectorOrange.yPrev = y1;
            vectorGreen.xPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['x'];
            vectorGreen.yPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, 120)['y'];
            vectorRed.xPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['x'];
            vectorRed.yPrev = calcCoordinatesOfTurnedPoint(x1, y1, o.x, o.y, -120)['y'];
        }
    }
}

canvas.onmousedown = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
   
    if (vectorOrange.clickDistance(x,y)<25){
        vectorOrange.isCaptured = true;
    } else if (vectorGreen.clickDistance(x,y)<25){
        vectorGreen.isCaptured = true;
    } else if (vectorRed.clickDistance(x,y)<25){
        vectorRed.isCaptured = true;
    }
}

canvas.onmousemove = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    
    // drawing directSequence if any vector is captured onmousedown and moved
    if (vectorOrange.isCaptured){
        directSequence.draw(x,y,4);
        console.log(`orange capture`);
    } else if (vectorGreen.isCaptured) {
        directSequence.draw(x,y,4);
        console.log(`green capture`);
    } else if (vectorRed.isCaptured){
        directSequence.draw(x,y,4);
        console.log(`red capture`);
    } else {
        // drawing directSequence if any vector is captured onmousemove
        if (vectorOrange.clickDistance(x,y)<25){
            vectorOrange.isLighted = true;
            directSequence.draw(vectorOrange.xPrev,vectorOrange.yPrev,4);
        }
        else{
            if(vectorOrange.isLighted){
                directSequence.draw(vectorOrange.xPrev,vectorOrange.yPrev);
            }
            vectorOrange.isLighted = false;
        }
        if (vectorGreen.clickDistance(x,y)<25){
            vectorGreen.isLighted = true;
            directSequence.draw(vectorGreen.xPrev,vectorGreen.yPrev,4);
        }  
        else{
            if (vectorGreen.isLighted){
                directSequence.draw(vectorGreen.xPrev,vectorGreen.yPrev);
            }
            vectorGreen.isLighted = false;
        } 

        if (vectorRed.clickDistance(x,y)<25){
            vectorRed.isLighted = true;
            directSequence.draw(vectorRed.xPrev,vectorRed.yPrev,4);
        }
        else {
            if (vectorRed.isLighted){
                directSequence.draw(vectorRed.xPrev,vectorRed.yPrev);
            }
            vectorRed.isLighted = false;
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
}

canvas.onmouseout = function(event){
    vectorRed.isCaptured = vectorGreen.isCaptured = vectorOrange.isCaptured = false;
}

vectorOrange.isCaptured = true;
directSequence.draw(initXOrange,initYOrange);
vectorOrange.isCaptured = false;

// init fields
document.getElementById("Va").value = vectorOrange.radius();
document.getElementById("Vb").value = vectorGreen.radius();
document.getElementById("Vc").value = vectorRed.radius();
document.getElementById("FIa").value = vectorOrange.xPrev;
document.getElementById("FIb").value = vectorOrange.xPrev;
document.getElementById("FIc").value = vectorOrange.xPrev;
