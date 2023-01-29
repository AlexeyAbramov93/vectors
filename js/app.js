// В апп работать только с модулем и углом, а координатна сетка должнабыть только внутри

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

const phaseVectorsSettings = {
    bgcolor: '#ff0000',
    width: 500,
    mashtab: 1000,

    vectors: [
        {
            name: "Ia",
            type: "I",
            color: "red"
        },
        {
            name: "Ib",
            type: "I",
            color: "blue"
        },
        {
            name: "Ic",
            type: "I",
            color: "green"
        },
        {
            name: "Ua",
            type: "U",
            color: "black"
        },
        {
            name: "Ua",
            type: "U",
            color: "gray"
        },
        {
            name: "Ua",
            type: "U",
            color: "black"
        },
        {
            name: "Ua",
            type: "U",
            color: "gray"
        }
    ]
}

const phaseVectorsValues = [
    {value: 500, angle: 10},
    {value: 300, angle: -110},
    {value: 250, angle: 110},
    {value: 100, angle: 60},
    {value: 100, angle: 30},
    {value: 250, angle: 65},
    {value: 250, angle: 35}
]

const phaseVectorsDiagram = new VectorDiagram(ctx, 50, 50, 'Фазные вектора', phaseVectorsSettings);
const positiveVectorsDiagram = new VectorDiagram(ctx, 700, 50, 'Прямая последовательность', phaseVectorsSettings);
const negativeVectorsDiagram = new VectorDiagram(ctx, 50, 700, 'Обратная последовательность', phaseVectorsSettings);
const zeroVectorsDiagram = new VectorDiagram(ctx, 700, 700, 'Нулевая последовательность', phaseVectorsSettings);

phaseVectorsDiagram.drawVectorsByValues(phaseVectorsValues);
positiveVectorsDiagram.drawVectorsByValues(phaseVectorsValues);
negativeVectorsDiagram.drawVectorsByValues(phaseVectorsValues);
zeroVectorsDiagram.drawVectorsByValues(phaseVectorsValues);

document.getElementById("mashtab").value = VectorDiagram.mashtab;
document.getElementById("Va").value = phaseVectorsDiagram.vectorsArray[0].radiusPrev;
document.getElementById("FIa").value = phaseVectorsDiagram.vectorsArray[0].anglePrev;
document.getElementById("Vb").value = phaseVectorsDiagram.vectorsArray[1].radiusPrev;
document.getElementById("FIb").value = phaseVectorsDiagram.vectorsArray[1].anglePrev;
document.getElementById("Vc").value = phaseVectorsDiagram.vectorsArray[2].radiusPrev;
document.getElementById("FIc").value = phaseVectorsDiagram.vectorsArray[2].anglePrev;

function eventFormMashtab(value) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    VectorDiagram.mashtab = document.getElementById("mashtab").value;
    phaseVectorsDiagram.drawVectorsByValues(phaseVectorsDiagram.getSavedPhaseVectorsValuesPrev());
    positiveVectorsDiagram.drawVectorsByValues(positiveVectorsDiagram.getSavedPhaseVectorsValuesPrev());
    negativeVectorsDiagram.drawVectorsByValues(negativeVectorsDiagram.getSavedPhaseVectorsValuesPrev());
    zeroVectorsDiagram.drawVectorsByValues(zeroVectorsDiagram.getSavedPhaseVectorsValuesPrev());
}

function eventFormVectorsABC(value) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
    const phaseVectorsValues = [
        {value: document.getElementById("Va").value, angle: document.getElementById("FIa").value},
        {value: document.getElementById("Vb").value, angle: document.getElementById("FIb").value},
        {value: document.getElementById("Vc").value, angle: document.getElementById("FIc").value},
        {value: 100, angle: 60},
        {value: 100, angle: 30},
        {value: 250, angle: 65},
        {value: 250, angle: 35}
    ]

    phaseVectorsDiagram.drawVectorsByValues(phaseVectorsValues);
    positiveVectorsDiagram.drawVectorsByValues(phaseVectorsValues);
    negativeVectorsDiagram.drawVectorsByValues(phaseVectorsValues);
    zeroVectorsDiagram.drawVectorsByValues(phaseVectorsValues);

    document.getElementById("Va").value = phaseVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FIa").value = phaseVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("Vb").value = phaseVectorsDiagram.vectorsArray[1].radiusPrev;
    document.getElementById("FIb").value = phaseVectorsDiagram.vectorsArray[1].anglePrev;
    document.getElementById("Vc").value = phaseVectorsDiagram.vectorsArray[2].radiusPrev;
    document.getElementById("FIc").value = phaseVectorsDiagram.vectorsArray[2].anglePrev;
}

canvas.onmousedown = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    phaseVectorsDiagram.checkCapture(x,y);
    positiveVectorsDiagram.checkCapture(x,y);
    negativeVectorsDiagram.checkCapture(x,y);
    zeroVectorsDiagram.checkCapture(x,y);

}

canvas.onmousemove = function(event){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	var x = event.offsetX;
    var y = event.offsetY;
    
    phaseVectorsDiagram.drawVectorsByCoordinates(phaseVectorsDiagram.getCoordinatesFromClick(x,y))
    // positiveVectorsDiagram.drawVectorsByCoordinates(positiveVectorsDiagram.getCoordinatesFromClick(x,y))
    // negativeVectorsDiagram.drawVectorsByCoordinates(negativeVectorsDiagram.getCoordinatesFromClick(x,y))
    // zeroVectorsDiagram.drawVectorsByCoordinates(zeroVectorsDiagram.getCoordinatesFromClick(x,y))

    document.getElementById("Va").value = phaseVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FIa").value = phaseVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("Vb").value = phaseVectorsDiagram.vectorsArray[1].radiusPrev;
    document.getElementById("FIb").value = phaseVectorsDiagram.vectorsArray[1].anglePrev;
    document.getElementById("Vc").value = phaseVectorsDiagram.vectorsArray[2].radiusPrev;
    document.getElementById("FIc").value = phaseVectorsDiagram.vectorsArray[2].anglePrev;

}

canvas.onmouseup = function(event){
    phaseVectorsDiagram.resetCapture();
    positiveVectorsDiagram.resetCapture();
    negativeVectorsDiagram.resetCapture();
    zeroVectorsDiagram.resetCapture();
}

canvas.onmouseout = function(event){
    phaseVectorsDiagram.resetCapture();
    positiveVectorsDiagram.resetCapture();
    negativeVectorsDiagram.resetCapture();
    zeroVectorsDiagram.resetCapture();
}




// let A1x = positiveVectors.x0 + getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A1x ;
// let A1y = positiveVectors.y0 - getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A1y;
// let B1x = getCoordinatesOfTurnedPoint(positiveVectors.x0, positiveVectors.y0, A1x, A1y, 120)['x'];
// let B1y = getCoordinatesOfTurnedPoint(positiveVectors.x0, positiveVectors.y0, A1x, A1y, 120)['y'];
// let C1x = getCoordinatesOfTurnedPoint(positiveVectors.x0, positiveVectors.y0, A1x, A1y, -120)['x'];
// let C1y = getCoordinatesOfTurnedPoint(positiveVectors.x0, positiveVectors.y0, A1x, A1y, -120)['y'];
// let positiveVectorsCoordinates = [A1x,A1y,B1x,B1y,C1x,C1y];
// positiveVectors.drawVectorsByCoordinates(positiveVectorsCoordinates);

// let A2x = negativeVectors.x0 + getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A2x;
// let A2y = negativeVectors.y0 - getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A2y;
// let B2x=getCoordinatesOfTurnedPoint(negativeVectors.x0, negativeVectors.y0, A2x, A2y, -120)['x'];
// let B2y=getCoordinatesOfTurnedPoint(negativeVectors.x0, negativeVectors.y0, A2x, A2y, -120)['y'];
// let C2x=getCoordinatesOfTurnedPoint(negativeVectors.x0, negativeVectors.y0, A2x, A2y, 120)['x'];
// let C2y=getCoordinatesOfTurnedPoint(negativeVectors.x0, negativeVectors.y0, A2x, A2y, 120)['y'];
// let negativeVectorsCoordinates = [A2x,A2y,B2x,B2y,C2x,C2y];
// negativeVectors.drawVectorsByCoordinates(negativeVectorsCoordinates);

// let A0x = zeroVectors.x0 + getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A0x;
// let A0y = zeroVectors.y0 - getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A0y;
// let zeroVectorsCoordinates = [A0x,A0y,A0x,A0y,A0x,A0y];
// zeroVectors.drawVectorsByCoordinates(zeroVectorsCoordinates);

// document.getElementById("Va").value = phaseVectors.vect1.radius;
// document.getElementById("FIa").value = phaseVectors.vect1.angle;
// document.getElementById("Vb").value = phaseVectors.vect2.radius;
// document.getElementById("FIb").value = phaseVectors.vect2.angle;
// document.getElementById("Vc").value = phaseVectors.vect3.radius;
// document.getElementById("FIc").value = phaseVectors.vect3.angle;
























/*

// to calculate coordinates of the turned point
// https://foxford.ru/wiki/informatika/povorot-tochki
function getCoordinatesOfTurnedPoint(oX, oY, curPointX, curPointY, degree){
    turnedPointX = oX + (curPointX-oX)*Math.cos(Math.PI/180*degree) - (curPointY-oY)*Math.sin(Math.PI/180*degree);
    turnedPointY = oY + (curPointX-oX)*Math.sin(Math.PI/180*degree) + (curPointY-oY)*Math.cos(Math.PI/180*degree);
    return {'x': turnedPointX, 'y': turnedPointY};
}

// to get coordinates A1,A2,A0 from radius and angle(degrees) of A B C 
function getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC){

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

/////////////////////////////////////////////////////////////////////////

// to calculate and draw Phase Vectors based on vA,fiA,vB,fiB,vC,fiC
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

// to calculate and draw Phase Vectors based on Positive, Negative and Zero sequencies
function drawPhaseVectorsByA1A2A0(v1,fi1,v2,fi2,v0,fi0){
    let A1x = v1*Math.cos(fi1*Math.PI/180);
    let A1y = v1*Math.sin(fi1*Math.PI/180);
    let A2x = v2*Math.cos(fi2*Math.PI/180);
    let A2y = v2*Math.sin(fi2*Math.PI/180);
    let V0x = v0*Math.cos(fi0*Math.PI/180);
    let V0y = v0*Math.sin(fi0*Math.PI/180);
    let B1x = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['x'];
    let B1y = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['y'];
    let C1x = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['x'];
    let C1y = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['y'];

    let B2x = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['x'];
    let B2y = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['y'];
    let C2x = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['x'];
    let C2y = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['y'];

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

// to calculate and draw Phase Vectors based on A1,A2,A0 coordinates
function drawPhaseVectorsByA1A2A0coordinates(A1,A2,A0){

    let A0x = A0.xPrev;
    let A0y = A0.yPrev;

    let A1x = A1.xPrev;
    let A1y = A1.yPrev;
    let B1x = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['x'];
    let B1y = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['y'];
    let C1x = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['x'];
    let C1y = getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['y'];

    let A2x = A2.xPrev;
    let A2y = A2.yPrev;
    let B2x = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['x'];
    let B2y = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['y'];
    let C2x = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['x'];
    let C2y = getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['y'];

    let Ax = A1x+A2x+A0x;
    let Ay = A1y+A2y+A0y;
    let Bx = B1x+B2x+A0x;
    let By = B1y+B2y+A0y;
    let Cx = C1x+C2x+A0x;
    let Cy = C1y+C2y+A0y;

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
    let A1x = getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A1x;
    let A1y = getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A1y;
    let B1x=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['x'];
    let B1y=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['y'];
    let C1x=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['x'];
    let C1y=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['y'];
    vectorOrange1.drawXY(A1x,A1y);
    vectorGreen1.drawXY(B1x,B1y);
    vectorRed1.drawXY(C1x,C1y);
}

// to calculate and draw Negative Sequence (A2,B2,C2) based on complex A2
function drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC){
    let A2x = getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A2x;
    let A2y = getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A2y;
    let B2x=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['x'];
    let B2y=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['y'];
    let C2x=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['x'];
    let C2y=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['y'];
    vectorOrange3.drawXY(A2x,A2y);
    vectorGreen3.drawXY(B2x,B2y);
    vectorRed3.drawXY(C2x,C2y);
}

// to calculate and draw Zero Sequence (A0,B0,C0) based on complex A2
function drawZeroSeq(vA,fiA,vB,fiB,vC,fiC){
    let A0x = getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A0x;
    let A0y = getA1A2A0coordinates(vA,fiA,vB,fiB,vC,fiC).A0y;
    vectorOrange4.drawXY(A0x,A0y);
    vectorGreen4.drawXY(A0x,A0y);
    vectorRed4.drawXY(A0x,A0y);
}

// to calculate and draw Positive Sequence (A1,B1,C1) based on A1 Canvas (x,y)
function drawPositiveSeqXYCanvas(x,y,width=3){
    let x2 = getCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, 120)['x'];
    let y2 = getCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, 120)['y'];
    let x3 = getCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, -120)['x'];
    let y3 = getCoordinatesOfTurnedPoint(vectorOrange1.x0, vectorOrange1.y0, x, y, -120)['y'];
    vectorOrange1.drawXYCanvas(x,y,width);
    vectorGreen1.drawXYCanvas(x2,y2,width);
    vectorRed1.drawXYCanvas(x3,y3,width);
}

// to calculate and draw Negative Sequence (A2,B2,C2) based on A2 Canvas (x,y)
function drawNegativeSeqXYCanvas(x,y,width=3){
    let x2 = getCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, -120)['x'];
    let y2 = getCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, -120)['y'];
    let x3 = getCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, 120)['x'];
    let y3 = getCoordinatesOfTurnedPoint(vectorOrange3.x0, vectorOrange3.y0, x, y, 120)['y'];
    vectorOrange3.drawXYCanvas(x,y,width);
    vectorGreen3.drawXYCanvas(x2,y2,width);
    vectorRed3.drawXYCanvas(x3,y3,width);
}

// to draw Zero Sequence (A0,B0,C0) based on complex A2
function drawZeroSeqXYCanvas(x,y,width=3){
    vectorOrange4.drawXYCanvas(x,y,width);
    vectorGreen4.drawXYCanvas(x,y,width);
    vectorRed4.drawXYCanvas(x,y,width);    
}

///////////////////////////////////////////////////////////////////////////////////////
/*
axisScale = 0.1;    // to set scale of the canvas
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

// to init Phase Vectors
let vectorOrange2 = new Vector(o2.x,o2.y,'Va','orange');
let vectorGreen2 = new Vector(o2.x,o2.y,'Vb','green');
let vectorRed2 = new Vector(o2.x,o2.y,'Vc','red');
// to init Positive Sequence vectors based on Phase Vectors
let vectorOrange1 = new Vector(o1.x,o1.y,'A1','orange');
let vectorGreen1 = new Vector(o1.x,o1.y,'B1','green');
let vectorRed1 = new Vector(o1.x,o1.y,'C1','red');
// to init Negative Sequence vectors based on Phase Vectors
let vectorOrange3 = new Vector(o3.x,o3.y,'A2','orange');
let vectorGreen3 = new Vector(o3.x,o3.y,'B2','green');
let vectorRed3 = new Vector(o3.x,o3.y,'C2','red');
// to init Zero Sequence vectors based on Phase Vectors
let vectorOrange4 = new Vector(o4.x,o4.y,'V0','gray');
let vectorGreen4 = new Vector(o4.x,o4.y,'V0','gray');
let vectorRed4 = new Vector(o4.x,o4.y,'V0','gray');

let vA = 180;
let fiA = 0;
let vB = 140;
let fiB = -90;
let vC = 100;
let fiC = 90;

vectorOrange2.drawZFi(vA,fiA,3); // to draw Phase Vector A
vectorGreen2.drawZFi(vB,fiB,3); // to draw Phase Vector B
vectorRed2.drawZFi(vC,fiC); // to draw Phase Vector C
drawPositiveSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Positive Sequence vectors based on Phase Vectors
drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors
drawZeroSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Zero Sequence vectors based on Phase Vectors

document.getElementById("Va").value = vA;
document.getElementById("FIa").value = fiA;
document.getElementById("Vb").value = vB;
document.getElementById("FIb").value = fiB;
document.getElementById("Vc").value = vC;
document.getElementById("FIc").value = fiC;

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
    }
    else if (vectorGreen2.clickDistance(x,y)<25){
        vectorGreen2.isCaptured = true;
    }
    else if (vectorRed2.clickDistance(x,y)<25){
        vectorRed2.isCaptured = true;
    }
    else if (vectorOrange1.clickDistance(x,y)<25){
        vectorOrange1.isCaptured = true;
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
		
    // if isCaptured is true
	if (vectorOrange2.isCaptured){
		vectorOrange2.drawXYCanvas(x,y,5);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev,5);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev,5);
	} else if (vectorGreen2.isCaptured){
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev,5);
		vectorGreen2.drawXYCanvas(x,y,5);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev,5);
	} else if (vectorRed2.isCaptured){
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev,5);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev,5);
		vectorRed2.drawXYCanvas(x,y,5);
	} else if (vectorOrange1.isCaptured){	// drawing Positive Sequence and Phase Vectors
        drawPositiveSeqXYCanvas(x,y,5);
        drawPhaseVectorsByA1A2A0coordinates(vectorOrange1,vectorOrange3,vectorOrange4);
    } else if (vectorOrange3.isCaptured){ // drawing Negative Sequence and Phase Vectors
        drawNegativeSeqXYCanvas(x,y,5);
        drawPhaseVectorsByA1A2A0coordinates(vectorOrange1,vectorOrange3,vectorOrange4);
    } else if (vectorOrange4.isCaptured){ // drawing Zero Sequence and Phase Vectors
        drawZeroSeqXYCanvas(x,y,5);
        drawPhaseVectorsByA1A2A0coordinates(vectorOrange1,vectorOrange3,vectorOrange4);  
    // if clickDistance is true
    } else if (vectorOrange2.clickDistance(x,y)<25||vectorGreen2.clickDistance(x,y)<25||vectorRed2.clickDistance(x,y)<25){
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev,5);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev,5);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev,5);
    } else if (vectorOrange1.clickDistance(x,y)<25){
        drawPositiveSeqXYCanvas(vectorOrange1.xPrevCanvasTurned,vectorOrange1.yPrevCanvasTurned,5);
        drawPhaseVectorsByA1A2A0coordinates(vectorOrange1,vectorOrange3,vectorOrange4);
	} else if (vectorOrange3.clickDistance(x,y)<25){
        drawNegativeSeqXYCanvas(vectorOrange3.xPrevCanvasTurned,vectorOrange3.yPrevCanvasTurned,5);
        drawPhaseVectorsByA1A2A0coordinates(vectorOrange1,vectorOrange3,vectorOrange4);
	} else if (vectorOrange4.clickDistance(x,y)<25){
        drawZeroSeqXYCanvas(vectorOrange4.xPrevCanvasTurned,vectorOrange4.yPrevCanvasTurned,5);
        drawPhaseVectorsByA1A2A0coordinates(vectorOrange1,vectorOrange3,vectorOrange4);
    } else {
        vectorOrange2.drawXY(vectorOrange2.xPrev,vectorOrange2.yPrev);
        vectorGreen2.drawXY(vectorGreen2.xPrev,vectorGreen2.yPrev);
        vectorRed2.drawXY(vectorRed2.xPrev,vectorRed2.yPrev);
    }

    vA = vectorOrange2.radius();
    fiA = vectorOrange2.angle();
    vB = vectorGreen2.radius();
    fiB = vectorGreen2.angle();
    vC = vectorRed2.radius();
    fiC = vectorRed2.angle();

    drawPositiveSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Positive Sequence vectors based on Phase Vectors
    drawNegativeSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors
    drawZeroSeq(vA,fiA,vB,fiB,vC,fiC); // to draw Negative Sequence vectors based on Phase Vectors

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
*/