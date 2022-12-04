var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// to calculate coordinates of the turned point
// https://foxford.ru/wiki/informatika/povorot-tochki
function calcCoordinatesOfTurnedPoint(oX, oY, curPointX, curPointY, degree){
    turnedPointX = oX + (curPointX-oX)*Math.cos(Math.PI/180*degree) - (curPointY-oY)*Math.sin(Math.PI/180*degree);
    turnedPointY = oY + (curPointX-oX)*Math.sin(Math.PI/180*degree) + (curPointY-oY)*Math.cos(Math.PI/180*degree);
    return {'x': turnedPointX, 'y': turnedPointY};
}

// to get complex EA1,EA2,EA0 from radius and angle(degrees)
function getComplex_eA1_eA2_eA0(eA,eB,eC,a,b,c){

    let fiA=a*Math.PI/180;
    let fiB=b*Math.PI/180;
    let fiC=c*Math.PI/180;
    let fi120=120*Math.PI/180; 
    let fi240=240*Math.PI/180; 

    let eA1RealPart = (eA*Math.cos(fiA)+eB*Math.cos(fiB+fi120)+eC*Math.cos(fiC+fi240))/3;
    let eA1ImaginaryPart = (eA*Math.sin(fiA)+eB*Math.sin(fiB+fi120)+eC*Math.sin(fiC+fi240))/3;

    let eA2RealPart = (eA*Math.cos(fiA)+eB*Math.cos(fiB+fi240)+eC*Math.cos(fiC+fi120))/3;
    let eA2ImaginaryPart = (eA*Math.sin(fiA)+eB*Math.sin(fiB+fi240)+eC*Math.sin(fiC+fi120))/3;

    let eA0RealPart = (eA*Math.cos(fiA)+eB*Math.cos(fiB)+eC*Math.cos(fiC))/3;
    let eA0ImaginaryPart = (eA*Math.sin(fiA)+eB*Math.sin(fiB)+eC*Math.sin(fiC))/3;

    return {'eA1RealPart': eA1RealPart, 'eA1ImaginaryPart': eA1ImaginaryPart,
            'eA2RealPart': eA2RealPart, 'eA2ImaginaryPart': eA2ImaginaryPart,
            'eA0RealPart': eA0RealPart, 'eA0ImaginaryPart': eA0ImaginaryPart};
}

// to calculate and draw Phase Vectors (vA,vB.vC) based on complex vA1,vA2,vB1,vB2,vC1,vC2,vA0
function getComplex_eA_eB_eC_old(vA1,vA2,vB1,vB2,vC1,vC2,vA0){

    let vV0x = vA0.xPrev;
    let vV0y = vA0.yPrev;

    let vA1x = vA1.xPrev;
    let vA1y = vA1.yPrev;
    let vA2x = vA2.xPrev;
    let vA2y = vA2.yPrev;

    let vB1x = vB1.xPrev;
    let vB1y = vB1.yPrev;
    let vB2x = vB2.xPrev;
    let vB2y = vB2.yPrev;

    let vC1x = vC1.xPrev;
    let vC1y = vC1.yPrev;
    let vC2x = vC2.xPrev;
    let vC2y = vC2.yPrev;

    let vAx = vA1x+vA2x+vV0x;
    let vAy = vA1y+vA2y+vV0y;
    let vBx = vB1x+vB2x+vV0x;
    let vBy = vB1y+vB2y+vV0y;
    let vCx = vC1x+vC2x+vV0x;
    let vCy = vC1y+vC2y+vV0y;

    vectorOrange2.drawXY(vAx,vAy);
    vectorGreen2.drawXY(vBx,vBy);
    vectorRed2.drawXY(vCx,vCy);
}

// to calculate and draw Phase Vectors (vA,vB.vC) based on complex vA1,vA2,vA0
function getComplex_eA_eB_eC(vA1,vA2,vA0){

    let vV0x = vA0.xPrev;
    let vV0y = vA0.yPrev;

    let vA1x = vA1.xPrev;
    let vA1y = vA1.yPrev;
    let vB1x = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, -120)['x'];
    let vB1y = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, -120)['y'];
    let vC1x = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, 120)['x'];
    let vC1y = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, 120)['y'];

    let vA2x = vA2.xPrev;
    let vA2y = vA2.yPrev;
    let vB2x = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, 120)['x'];
    let vB2y = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, 120)['y'];
    let vC2x = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, -120)['x'];
    let vC2y = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, -120)['y'];

    let vAx = vA1x+vA2x+vV0x;
    let vAy = vA1y+vA2y+vV0y;
    let vBx = vB1x+vB2x+vV0x;
    let vBy = vB1y+vB2y+vV0y;
    let vCx = vC1x+vC2x+vV0x;
    let vCy = vC1y+vC2y+vV0y;

    vectorOrange2.drawXY(vAx,vAy);
    vectorGreen2.drawXY(vBx,vBy);
    vectorRed2.drawXY(vCx,vCy);
}

// to calculate and draw Phase Vectors (vA,vB.vC) based on complex vA1,vA2,vA0
function getComplex_eA_eB_eC_test(vA1x,vA1y,vA2x,vA2y,vV0x,vV0y){

    let vB1x = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, -120)['x'];
    let vB1y = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, -120)['y'];
    let vC1x = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, 120)['x'];
    let vC1y = calcCoordinatesOfTurnedPoint(0, 0, vA1x, vA1y, 120)['y'];

    let vB2x = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, 120)['x'];
    let vB2y = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, 120)['y'];
    let vC2x = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, -120)['x'];
    let vC2y = calcCoordinatesOfTurnedPoint(0, 0, vA2x, vA2y, -120)['y'];

    let vAx = vA1x+vA2x+vV0x;
    let vAy = vA1y+vA2y+vV0y;
    let vBx = vB1x+vB2x+vV0x;
    let vBy = vB1y+vB2y+vV0y;
    let vCx = vC1x+vC2x+vV0x;
    let vCy = vC1y+vC2y+vV0y;

    vectorOrange2.drawXY(vAx,vAy);
    vectorGreen2.drawXY(vBx,vBy);
    vectorRed2.drawXY(vCx,vCy);
}

// to calculate and draw Positive Sequence (A1,B1.C1) based on complex A1
function drawPositiveSeq(vA,vB,vC,fiA,fiB,fiC){
    let A1RealPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1RealPart;
    let A1ImaginaryPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1ImaginaryPart;
    let B1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['x'];
    let B1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['y'];
    let C1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['x'];
    let C1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['y'];
    vectorOrange1.drawXY(A1RealPart,A1ImaginaryPart);
    vectorGreen1.drawXY(B1RealPart,B1ImaginaryPart);
    vectorRed1.drawXY(C1RealPart,C1ImaginaryPart);
}

// to calculate and draw Negative Sequence (A2,B2.C2) based on complex A2
function drawNegativeSeq(vA,vB,vC,fiA,fiB,fiC){
    let A2RealPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA2RealPart;
    let A2ImaginaryPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA2ImaginaryPart;
    let B2RealPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, 120)['x'];
    let B2ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, 120)['y'];
    let C2RealPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, -120)['x'];
    let C2ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, -120)['y'];
    vectorOrange3.drawXY(A2RealPart,A2ImaginaryPart);
    vectorGreen3.drawXY(B2RealPart,B2ImaginaryPart);
    vectorRed3.drawXY(C2RealPart,C2ImaginaryPart);
}

// to calculate and draw Zero Sequence (A2,B2.C2) based on complex A2
function drawZeroSeq(vA,vB,vC,fiA,fiB,fiC){
    let A0RealPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA0RealPart;
    let A0ImaginaryPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA0ImaginaryPart;
    //console.log(A0RealPart,A0ImaginaryPart);
    vectorOrange4.drawXY(A0RealPart,A0ImaginaryPart);
    vectorGreen4.drawXY(A0RealPart,A0ImaginaryPart);
    vectorRed4.drawXY(A0RealPart,A0ImaginaryPart);
}

// to calculate and draw Positive Sequence (A1,B1.C1) based on A1 Canvas (x,y)
function drawPositiveSeqXYCanvas(x,y){
    let x2 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, 120)['x'];
    let y2 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, 120)['y'];
    let x3 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, -120)['x'];
    let y3 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, -120)['y'];
    vectorOrange1.drawXYCanvas(x,y);
    vectorGreen1.drawXYCanvas(x2,y2);
    vectorRed1.drawXYCanvas(x3,y3);
}

// to calculate and draw Negative Sequence (A2,B2.C2) based on A2 Canvas (x,y)
function drawNegativeSeqXYCanvas(x,y){
    let x2 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, -120)['x'];
    let y2 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, -120)['y'];
    let x3 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, 120)['x'];
    let y3 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, 120)['y'];
    vectorOrange3.drawXYCanvas(x,y);
    vectorGreen3.drawXYCanvas(x2,y2);
    vectorRed3.drawXYCanvas(x3,y3);
}

// to calculate and draw Zero Sequence (A2,B2.C2) based on complex A2
function drawZeroSeqXYCanvas(x,y){
    vectorOrange4.drawXYCanvas(x,y);
    vectorGreen4.drawXYCanvas(x,y);
    vectorRed4.drawXYCanvas(x,y);
}

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



leftBottomAxes = new Axes(o3.x,o3.y,'Обратная последовательность');
leftTopAxes = new Axes(o2.x,o2.y,'Фазные вектора');
rightTopAxes = new Axes(o1.x,o1.y,'Прямая последовательность');
rightBottomAxes = new Axes(o4.x,o4.y,'Нулевая последовательность');

leftBottomAxes.draw()
leftTopAxes.draw()
rightTopAxes.draw()
rightBottomAxes.draw()

let vA = 240;
let fiA = 0;
let vB = 140;
let fiB = -90;
let vC = 100;
let fiC = 90;

document.getElementById("Va").value = vA;
document.getElementById("FIa").value = fiA;
document.getElementById("Vb").value = vB;
document.getElementById("FIb").value = fiB;
document.getElementById("Vc").value = vC;
document.getElementById("FIc").value = fiC;


// to init Phase Vectors
let vectorOrange2 = new Vector(o2.x, o2.y, 'orange');
let vectorGreen2 = new Vector(o2.x, o2.y, 'green');
let vectorRed2 = new Vector(o2.x, o2.y,'red');

vectorOrange2.drawZFi(vA,fiA,3); // to draw Phase Vector A
vectorGreen2.drawZFi(vB,fiB,3); // to draw Phase Vector B
vectorRed2.drawZFi(vC,fiC); // to draw Phase Vector C

// to init Positive Sequence vectors based on Phase Vectors
let vectorOrange1 = new Vector(o1.x, o1.y, 'orange');
let vectorGreen1 = new Vector(o1.x, o1.y, 'green');
let vectorRed1 = new Vector(o1.x, o1.y,'red');
drawPositiveSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Positive Sequence vectors based on Phase Vectors

// to init Negative Sequence vectors based on Phase Vectors
let vectorOrange3 = new Vector(o3.x, o3.y, 'orange');
let vectorGreen3 = new Vector(o3.x, o3.y, 'green');
let vectorRed3 = new Vector(o3.x, o3.y,'red');
drawNegativeSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Negative Sequence vectors based on Phase Vectors

// to init Zero Sequence vectors based on Phase Vectors
let vectorOrange4 = new Vector(o4.x, o4.y, 'orange');
let vectorGreen4 = new Vector(o4.x, o4.y, 'green');
let vectorRed4 = new Vector(o4.x, o4.y,'red');
drawZeroSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Zero Sequence vectors based on Phase Vectors

document.getElementById("V1").value = vectorOrange1.radius();
document.getElementById("FI1").value = vectorOrange1.angle();
document.getElementById("V2").value = vectorOrange3.radius();
document.getElementById("FI2").value = vectorOrange3.angle();
document.getElementById("V0").value = vectorOrange4.radius();
document.getElementById("FI0").value = vectorOrange4.angle();


// to init Phase Vectors
let vectorOrange5 = new Vector(o2.x+20, o2.y+20, 'blue');
let vectorGreen5 = new Vector(o2.x+20, o2.y+20, 'blue');
let vectorRed5 = new Vector(o2.x+20, o2.y+20,'blue');


function eventForm(value) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	leftBottomAxes.draw();
	leftTopAxes.draw();
	rightTopAxes.draw();
	rightBottomAxes.draw();

	vA = document.getElementById("Va").value;
	fiA = document.getElementById("FIa").value;
	vB = document.getElementById("Vb").value;
	fiB = document.getElementById("FIb").value;
	vC = document.getElementById("Vc").value;
	fiC = document.getElementById("FIc").value;
	
	vectorOrange2.drawZFi(vA,fiA,3);
	vectorGreen2.drawZFi(vB,fiB,3);
	vectorRed2.drawZFi(vC,fiC,3);

    drawPositiveSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Positive Sequence vectors based on Phase Vectors
    drawNegativeSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Negative Sequence vectors based on Phase Vectors
    drawZeroSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Negative Sequence vectors based on Phase Vectors

	// v1 = document.getElementById("V1").value;
	// fi1 = document.getElementById("FI1").value;
	// v2 = document.getElementById("V2").value;
	// fi2 = document.getElementById("FI2").value;
	// v0 = document.getElementById("V0").value;
	// fi0 = document.getElementById("FI0").value;
    
    // let v1X = v1*Math.cos(fi1*Math.PI/180);
    // let v1Y = v1*Math.sin(fi1*Math.PI/180);
    // let v2X = v2*Math.cos(fi2*Math.PI/180);
    // let v2Y = v2*Math.sin(fi2*Math.PI/180);
    // let v0X = v0*Math.cos(fi0*Math.PI/180);
    // let v0Y = v0*Math.sin(fi0*Math.PI/180);

    // getComplex_eA_eB_eC_test(v1X,v1Y,v2X,v2Y,v0X,v0Y);

}


canvas.onmousedown = function(event){
    var x = event.offsetX;
    var y = event.offsetY;

    if (vectorOrange2.clickDistance(x,y)<25){
        vectorOrange2.isCaptured = true;
        console.log(`vectorOrange2:${vectorOrange2.isCaptured}`)
    }
    else if (vectorGreen2.clickDistance(x,y)<25){
        vectorGreen2.isCaptured = true;
        console.log(`vectorGreen2:${vectorGreen2.isCaptured}`)
    }
    else if (vectorRed2.clickDistance(x,y)<25){
        vectorRed2.isCaptured = true;
        console.log(`vectorRed2:${vectorRed2.isCaptured}`)
    }
    else if (vectorOrange1.clickDistance(x,y)<25){
        vectorOrange1.isCaptured = true;
        console.log(`vectorOrange1:${vectorOrange1.isCaptured}`)
    }
    else if (vectorOrange3.clickDistance(x,y)<25){
        vectorOrange3.isCaptured = true;
        console.log(`vectorOrange3:${vectorOrange3.isCaptured}`)
    }
    else if (vectorOrange4.clickDistance(x,y)<25){
        vectorOrange4.isCaptured = true;
        console.log(`vectorOrange4:${vectorOrange4.isCaptured}`)
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
		
	// drawing Phase Vectors
	if (vectorOrange2.isCaptured){
		vectorOrange2.drawXYCanvas(x,y,5);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev, 5);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev,5);
	} else if (vectorGreen2.isCaptured){
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev,5);
		vectorGreen2.drawXYCanvas(x,y,5);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev,5);
	} else if (vectorRed2.isCaptured){
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev,5);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev,5);
		vectorRed2.drawXYCanvas(x,y,5);
	} else if (vectorOrange2.clickDistance(x,y)<25||vectorGreen2.clickDistance(x,y)<25||vectorRed2.clickDistance(x,y)<25){
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev,5);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev,5);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev,5);

	} else if (vectorOrange1.isCaptured){
        drawPositiveSeqXYCanvas(x,y);
        //getComplex_eA_eB_eC_old(vectorOrange1,vectorOrange3,vectorGreen1,vectorGreen3,vectorRed1,vectorRed3,vectorOrange4);
        getComplex_eA_eB_eC(vectorOrange1,vectorOrange3,vectorOrange4);

    } else if (vectorOrange3.isCaptured){
        drawNegativeSeqXYCanvas(x,y);
        //getComplex_eA_eB_eC_old(vectorOrange1,vectorOrange3,vectorGreen1,vectorGreen3,vectorRed1,vectorRed3,vectorOrange4);
        getComplex_eA_eB_eC(vectorOrange1,vectorOrange3,vectorOrange4);

    } else if (vectorOrange4.isCaptured){
        drawZeroSeqXYCanvas(x,y);
        //getComplex_eA_eB_eC_old(vectorOrange1,vectorOrange3,vectorGreen1,vectorGreen3,vectorRed1,vectorRed3,vectorOrange4);
        getComplex_eA_eB_eC(vectorOrange1,vectorOrange3,vectorOrange4);    
    } else {
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev);
    }

    let vA = vectorOrange2.radius();
    let fiA = vectorOrange2.angle();
    let vB = vectorGreen2.radius();
    let fiB = vectorGreen2.angle();
    let vC = vectorRed2.radius();
    let fiC = vectorRed2.angle();

    drawPositiveSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Positive Sequence vectors based on Phase Vectors
    drawNegativeSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Negative Sequence vectors based on Phase Vectors
    drawZeroSeq(vA,vB,vC,fiA,fiB,fiC); // to draw Negative Sequence vectors based on Phase Vectors


    // тут надо будет поправить
    document.getElementById("Va").value = vectorOrange2.radius();
    document.getElementById("FIa").value = vectorOrange2.angle();
    document.getElementById("Vb").value = vectorGreen2.radius();
    document.getElementById("FIb").value = vectorGreen2.angle();
    document.getElementById("Vc").value = vectorRed2.radius();
    document.getElementById("FIc").value = vectorRed2.angle();

    document.getElementById("V1").value = vectorOrange1.radius();
    document.getElementById("FI1").value = vectorOrange1.angle();
    document.getElementById("V2").value = vectorOrange3.radius();
    document.getElementById("FI2").value = vectorOrange3.angle();
    document.getElementById("V0").value = vectorOrange4.radius();
    document.getElementById("FI0").value = vectorOrange4.angle();



}

canvas.onmouseup = function(event){
    vectorRed1.isCaptured = vectorGreen1.isCaptured = vectorOrange1.isCaptured = false;
    vectorRed2.isCaptured = vectorGreen2.isCaptured = vectorOrange2.isCaptured = false;
    vectorRed3.isCaptured = vectorGreen3.isCaptured = vectorOrange3.isCaptured = false;
    vectorRed4.isCaptured = vectorGreen4.isCaptured = vectorOrange4.isCaptured = false;

}

canvas.onmouseout = function(event){
    vectorRed1.isCaptured = vectorGreen1.isCaptured = vectorOrange1.isCaptured = false;
    vectorRed2.isCaptured = vectorGreen2.isCaptured = vectorOrange2.isCaptured = false;
    vectorRed3.isCaptured = vectorGreen3.isCaptured = vectorOrange3.isCaptured = false;
    vectorRed4.isCaptured = vectorGreen4.isCaptured = vectorOrange4.isCaptured = false;
}
