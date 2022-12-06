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
function getComplex_eA1_eA2_eA0(vA,fiA,vB,fiB,vC,fiC){

    let fiArad=fiA*Math.PI/180;
    let fiBrad=fiB*Math.PI/180;
    let fiCrad=fiC*Math.PI/180;
    let fi120rad=120*Math.PI/180; 
    let fi240rad=240*Math.PI/180; 
    
    let A1x = (vA*Math.cos(fiArad)+vB*Math.cos(fiBrad+fi120rad)+vC*Math.cos(fiCrad+fi240rad))/3;
    let A1y = (vA*Math.sin(fiArad)+vB*Math.sin(fiBrad+fi120rad)+vC*Math.sin(fiCrad+fi240rad))/3;

    let A2x = (vA*Math.cos(fiArad)+vB*Math.cos(fiBrad+fi240rad)+vC*Math.cos(fiCrad+fi120rad))/3;
    let A2y = (vA*Math.sin(fiArad)+vB*Math.sin(fiBrad+fi240rad)+vC*Math.sin(fiCrad+fi120rad))/3;

    let A0x = (vA*Math.cos(fiArad)+vB*Math.cos(fiBrad)+vC*Math.cos(fiCrad))/3;
    let A0y = (vA*Math.sin(fiArad)+vB*Math.sin(fiBrad)+vC*Math.sin(fiCrad))/3;

    return {'A1x': A1x, 'A1y': A1y,
            'A2x': A2x, 'A2y': A2y,
            'A0x': A0x, 'A0y': A0y};
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

    vA = vectorOrange2.radius();
    fiA = vectorOrange2.angle();
    vB = vectorGreen2.radius();
    fiB = vectorGreen2.angle();
    vC = vectorRed2.radius();
    fiC = vectorRed2.angle();
}
/////////////////////////////////////////////////////////////////////////

// to draw Phase Vectors based on vA,fiA,vB,fiB,vC,fiC
function drawPhaseVectorsByABC(vA,fiA,vB,fiB,vC,fiC){
    let Ax = vA*Math.cos(fiA*Math.PI/180);
    let Ay = vA*Math.sin(fiA*Math.PI/180);
    let Bx = vB*Math.cos(fiB*Math.PI/180);
    let By = vB*Math.sin(fiB*Math.PI/180);
    let Cx = vC*Math.cos(fiC*Math.PI/180);
    let Cy = vC*Math.sin(fiC*Math.PI/180);

    vectorOrange2.drawXY(Ax,Ay);
    vectorGreen2.drawXY(Bx,By);
    vectorRed2.drawXY(Cx,Cy);

    vA = vectorOrange2.radius();
    fiA = vectorOrange2.angle();
    vB = vectorGreen2.radius();
    fiB = vectorGreen2.angle();
    vC = vectorRed2.radius();
    fiC = vectorRed2.angle();
}

// to draw Phase Vectors based on Positive, Negative and Zero swquencies
function drawPhaseVectorsByA1A2A0(v1,fi1,v2,fi2,v0,fi0){
    let A1x = v1*Math.cos(fi1*Math.PI/180);
    let A1y = v1*Math.sin(fi1*Math.PI/180);
    let A2x = v2*Math.cos(fi2*Math.PI/180);
    let A2y = v2*Math.sin(fi2*Math.PI/180);
    let V0x = v0*Math.cos(fi0*Math.PI/180);
    let V0y = v0*Math.sin(fi0*Math.PI/180);
    let B1x = calcCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['x'];
    let B1y = calcCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['y'];
    let C1x = calcCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['x'];
    let C1y = calcCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['y'];

    let B2x = calcCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['x'];
    let B2y = calcCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['y'];
    let C2x = calcCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['x'];
    let C2y = calcCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['y'];

    Ax = A1x+A2x+V0x;
    Ay = A1y+A2y+V0y;
    Bx = B1x+B2x+V0x;
    By = B1y+B2y+V0y;
    Cx = C1x+C2x+V0x;
    Cy = C1y+C2y+V0y;

    vectorOrange2.drawXY(Ax,Ay);
    vectorGreen2.drawXY(Bx,By);
    vectorRed2.drawXY(Cx,Cy);

    vA = vectorOrange2.radius();
    fiA = vectorOrange2.angle();
    vB = vectorGreen2.radius();
    fiB = vectorGreen2.angle();
    vC = vectorRed2.radius();
    fiC = vectorRed2.angle();
}


///////////////////////////////////////////////////////////////////////////////////////

// to calculate and draw Positive Sequence (A1,B1,C1) based on complex A1
function drawPositiveSeq(vA,fiA,vB,fiB,vC,fiC){
    let A1RealPart = getComplex_eA1_eA2_eA0(vA,fiA,vB,fiB,vC,fiC).A1x;
    let A1ImaginaryPart = getComplex_eA1_eA2_eA0(vA,fiA,vB,fiB,vC,fiC).A1y;
    let B1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['x'];
    let B1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['y'];
    let C1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['x'];
    let C1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['y'];
    vectorOrange1.drawXY(A1RealPart,A1ImaginaryPart);
    vectorGreen1.drawXY(B1RealPart,B1ImaginaryPart);
    vectorRed1.drawXY(C1RealPart,C1ImaginaryPart);
}

// to calculate and draw Negative Sequence (A2,B2,C2) based on complex A2
function drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC){
    let A2RealPart = getComplex_eA1_eA2_eA0(vA,fiA,vB,fiB,vC,fiC).A2x;
    let A2ImaginaryPart = getComplex_eA1_eA2_eA0(vA,fiA,vB,fiB,vC,fiC).A2y;
    let B2RealPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, 120)['x'];
    let B2ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, 120)['y'];
    let C2RealPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, -120)['x'];
    let C2ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A2RealPart, A2ImaginaryPart, -120)['y'];
    vectorOrange3.drawXY(A2RealPart,A2ImaginaryPart);
    vectorGreen3.drawXY(B2RealPart,B2ImaginaryPart);
    vectorRed3.drawXY(C2RealPart,C2ImaginaryPart);
}

// to calculate and draw Zero Sequence (A0,B0,C0) based on complex A2
function drawZeroSeq(vA,fiA,vB,fiB,vC,fiC){
    let A0RealPart = getComplex_eA1_eA2_eA0(vA,fiA,vB,fiB,vC,fiC).A0x;
    let A0ImaginaryPart = getComplex_eA1_eA2_eA0(vA,fiA,vB,fiB,vC,fiC).A0y;
    vectorOrange4.drawXY(A0RealPart,A0ImaginaryPart);
    vectorGreen4.drawXY(A0RealPart,A0ImaginaryPart);
    vectorRed4.drawXY(A0RealPart,A0ImaginaryPart);
}

// to calculate and draw Positive Sequence (A1,B1,C1) based on A1 Canvas (x,y)
function drawPositiveSeqXYCanvas(x,y){
    let x2 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, 120)['x'];
    let y2 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, 120)['y'];
    let x3 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, -120)['x'];
    let y3 = calcCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, -120)['y'];
    vectorOrange1.drawXYCanvas(x,y);
    vectorGreen1.drawXYCanvas(x2,y2);
    vectorRed1.drawXYCanvas(x3,y3);
}

// to calculate and draw Negative Sequence (A2,B2,C2) based on A2 Canvas (x,y)
function drawNegativeSeqXYCanvas(x,y){
    let x2 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, -120)['x'];
    let y2 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, -120)['y'];
    let x3 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, 120)['x'];
    let y3 = calcCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, 120)['y'];
    vectorOrange3.drawXYCanvas(x,y);
    vectorGreen3.drawXYCanvas(x2,y2);
    vectorRed3.drawXYCanvas(x3,y3);
}

// to calculate and draw Zero Sequence (A0,B0,C0) based on complex A2
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
drawPositiveSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Positive Sequence vectors based on Phase Vectors

// to init Negative Sequence vectors based on Phase Vectors
let vectorOrange3 = new Vector(o3.x, o3.y, 'orange');
let vectorGreen3 = new Vector(o3.x, o3.y, 'green');
let vectorRed3 = new Vector(o3.x, o3.y,'red');
drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors

// to init Zero Sequence vectors based on Phase Vectors
let vectorOrange4 = new Vector(o4.x, o4.y, 'orange');
let vectorGreen4 = new Vector(o4.x, o4.y, 'green');
let vectorRed4 = new Vector(o4.x, o4.y,'red');
drawZeroSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Zero Sequence vectors based on Phase Vectors

document.getElementById("V1").value = vectorOrange1.radius();
document.getElementById("FI1").value = vectorOrange1.angle();
document.getElementById("V2").value = vectorOrange3.radius();
document.getElementById("FI2").value = vectorOrange3.angle();
document.getElementById("V0").value = vectorOrange4.radius();
document.getElementById("FI0").value = vectorOrange4.angle();

function eventFormABC(value) {

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

    drawPhaseVectorsByABC(vA,fiA,vB,fiB,vC,fiC);
    drawPositiveSeq(vA,fiA,vB,fiB,vC,fiC);
    drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC);
    drawZeroSeq(vA,fiA,vB,fiB,vC,fiC);

    document.getElementById("V1").value = vectorOrange1.radius();
    document.getElementById("FI1").value = vectorOrange1.angle();
    document.getElementById("V2").value = vectorOrange3.radius();
    document.getElementById("FI2").value = vectorOrange3.angle();
    document.getElementById("V0").value = vectorOrange4.radius();
    document.getElementById("FI0").value = vectorOrange4.angle();

}

function eventFormA1A2A0(value) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	leftBottomAxes.draw();
	leftTopAxes.draw();
	rightTopAxes.draw();
	rightBottomAxes.draw();

	let v1 = document.getElementById("V1").value;
	let fi1 = document.getElementById("FI1").value;
	let v2 = document.getElementById("V2").value;
	let fi2 = document.getElementById("FI2").value;
	let v0 = document.getElementById("V0").value;
	let fi0 = document.getElementById("FI0").value;

    drawPhaseVectorsByA1A2A0(v1,fi1,v2,fi2,v0,fi0);
    drawPositiveSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Positive Sequence vectors based on Phase Vectors
    drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors
    drawZeroSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors

    document.getElementById("Va").value = vectorOrange2.radius();
    document.getElementById("FIa").value = vectorOrange2.angle();
    document.getElementById("Vb").value = vectorGreen2.radius();
    document.getElementById("FIb").value = vectorGreen2.angle();
    document.getElementById("Vc").value = vectorRed2.radius();
    document.getElementById("FIc").value = vectorRed2.angle();
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

    drawPositiveSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Positive Sequence vectors based on Phase Vectors
    drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors
    drawZeroSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors

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
