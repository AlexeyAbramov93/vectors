var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let isOrangeCaptured = false; // true if the orange line is captured onmousedown, otherwise false
let isGreenCaptured = false; // true if the orange line is captured onmousedown, otherwise false
let isRedCaptured = false; // true if the orange line is captured onmousedown, otherwise false

let isOrangeLighted = false; // true if the orange line is captured onmousemove, otherwise false
let isGreenLighted = false; // true if the orange line is captured onmousemove, otherwise false
let isRedLighted = false; // true if the orange line is captured onmousemove, otherwise false

class Vector {
    xPrev;
    yPrev;

    constructor(xPrev, yPrev) {
      this.xPrev = xPrev;
      this.yPrev = yPrev;
    }

    draw (x1,y1,color,width=3){
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


// shifted origin of the canvas geometic center 
o = {
    x: canvas.width/2,
    y: canvas.height/2,
}

// to draw axes from the canvas geometic center 
function drawAxes(width=0.3){
    ctx.save();
    ctx.lineWidth = width;
    ctx.strokeStyle = 'black';
    arc_scale = 0.9;    // to set scale the biggest arc from 0 to 1
    arc_count=4;        // to set a number of arcs
    for (let i=0;i<arc_count;i++){
        ctx.beginPath();
        ctx.arc(o.x,o.y,(o.x/arc_count*(i+1))*arc_scale,0,Math.PI*2);
        ctx.stroke();
    }

    degrees={0:'0',1:'-30',2:'-60',3:'-90',4:'-120',5:'-150',6:'-180',7:'150',8:'120',9:'90',10:'60',11:'30'};
    for (let i=0;i<12;i++){
        ctx.beginPath();
        ctx.moveTo(o.x,o.y);
        ctx.lineTo(o.x,o.y*0.1);
        ctx.textAlign = "center";
        ctx.fillText(degrees[i], o.x, o.y*0.09);
        ctx.stroke();
        ctx.translate(o.x, o.y);            // translate to rectangle center
        ctx.rotate((Math.PI / 180) * 30);   // rotate
        ctx.translate(-o.x, -o.y);          // translate back
    }
    ctx.restore();
}

// 
myLine = {
    x1Prev: canvas.width/2,
    y1Prev: canvas.height/5,

    draw: function(x1,y1,color='black',width=3){
        ctx.save();

        ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        // draw line
        ctx.beginPath();
        ctx.moveTo(o.x,o.y);
        ctx.lineTo(x1,y1);
        ctx.stroke();
        
        arrow_div = 1.15;
        arrow_angle = 3;
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

let initXOrange = canvas.width/2;
let initYOrange = canvas.height/5;
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
        if (isGreenCaptured || isGreenLighted){
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
        } else if (isRedCaptured || isRedLighted){
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
        } else if (isOrangeCaptured || isOrangeLighted){
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

    var orangeClickDistance = ((vectorOrange.xPrev-x)**2+(vectorOrange.yPrev-y)**2)**0.5;
    var greenClickDistance = ((vectorGreen.xPrev-x)**2+(vectorGreen.yPrev-y)**2)**0.5;
    var redClickDistance = ((vectorRed.xPrev-x)**2+(vectorRed.yPrev-y)**2)**0.5;
    
    if (orangeClickDistance<25){
        isOrangeCaptured = true;
    } else if (greenClickDistance<25){
        isGreenCaptured = true;
    } else if (redClickDistance<25){
        isRedCaptured = true;
    }

}

canvas.onmousemove = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    var orangeClickDistance = ((vectorOrange.xPrev-x)**2+(vectorOrange.yPrev-y)**2)**0.5;
    var greenClickDistance = ((vectorGreen.xPrev-x)**2+(vectorGreen.yPrev-y)**2)**0.5;
    var redClickDistance = ((vectorRed.xPrev-x)**2+(vectorRed.yPrev-y)**2)**0.5;

    // drawing directSequence if any vector is captured onmousedown and moved
    if (isOrangeCaptured){
        directSequence.draw(x,y,4);
        console.log(`orange capture`);
    } else if (isGreenCaptured) {
        directSequence.draw(x,y,4);
        console.log(`green capture`);
    } else if (isRedCaptured){
        directSequence.draw(x,y,4);
        console.log(`red capture`);
    } else {
        // drawing directSequence if any vector is captured onmousemove
        if (orangeClickDistance<25){
            isOrangeLighted = true;
            directSequence.draw(vectorOrange.xPrev,vectorOrange.yPrev,4);
        }
        else{
            if(isOrangeLighted){
                directSequence.draw(vectorOrange.xPrev,vectorOrange.yPrev);
            }
            isOrangeLighted = false;
        }
        if (greenClickDistance<25){
            isGreenLighted = true;
            directSequence.draw(vectorGreen.xPrev,vectorGreen.yPrev,4);
        }  
        else{
            if (isGreenLighted){
                directSequence.draw(vectorGreen.xPrev,vectorGreen.yPrev);
            }
            isGreenLighted = false;
        } 

        if (redClickDistance<25){
            isRedLighted = true;
            directSequence.draw(vectorRed.xPrev,vectorRed.yPrev,4);
        }
        else {
            if (isRedLighted){
                directSequence.draw(vectorRed.xPrev,vectorRed.yPrev);
            }
            isRedLighted = false;
        }
    }
}

canvas.onmouseup = function(event){
    isRedCaptured = false;
    isGreenCaptured = false;
    isOrangeCaptured = false;
}

canvas.onmouseout = function(event){
    isRedCaptured = false;
    isGreenCaptured = false;
    isOrangeCaptured = false;
}

isOrangeCaptured = true;
directSequence.draw(initXOrange,initYOrange);
isOrangeCaptured = false;


