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


// to init and draw Phase Vectors
let vectorOrange2 = new Vector(o2.x, o2.y, 'orange');
let vectorGreen2 = new Vector(o2.x, o2.y, 'green');
let vectorRed2 = new Vector(o2.x, o2.y,'red');
vectorOrange2.drawZFi(vA,fiA,3);
vectorGreen2.drawZFi(vB,fiB,3);
vectorRed2.drawZFi(vC,fiC);

// to init and draw positive sequence vectors based on Phase Vectors
let vectorOrange1 = new Vector(o1.x, o1.y, 'orange');
let vectorGreen1 = new Vector(o1.x, o1.y, 'green');
let vectorRed1 = new Vector(o1.x, o1.y,'red');
let A1RealPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1RealPart;
let A1ImaginaryPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1ImaginaryPart;
let B1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['x'];
let B1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['y'];
let C1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['x'];
let C1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['y'];
vectorOrange1.drawXY(A1RealPart,A1ImaginaryPart);
vectorGreen1.drawXY(B1RealPart,B1ImaginaryPart);
vectorRed1.drawXY(C1RealPart,C1ImaginaryPart);
document.getElementById("V1").value = vectorOrange1.radius();
document.getElementById("FI1").value = vectorOrange1.angle();
document.getElementById("V2").value = '---';
document.getElementById("FI2").value = '---';
document.getElementById("V3").value = '---';
document.getElementById("FI3").value = '---';


function eventForm(value) {
	vA = document.getElementById("Va").value;
	fiA = document.getElementById("FIa").value;
	vB = document.getElementById("Vb").value;
	fiB = document.getElementById("FIb").value;
	vC = document.getElementById("Vc").value;
	fiC = document.getElementById("FIc").value;
	
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	leftBottomAxes.draw();
	leftTopAxes.draw();
	rightTopAxes.draw();
	rightBottomAxes.draw();
	
	vectorOrange2.drawZFi(vA,fiA,3);
	vectorGreen2.drawZFi(vB,fiB,3);
	vectorRed2.drawZFi(vC,fiC,3);

    // to draw positive sequence vectors based on Phase Vectors
    A1RealPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1RealPart;
    A1ImaginaryPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1ImaginaryPart;
    B1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['x'];
    B1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['y'];
    C1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['x'];
    C1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['y'];
    vectorOrange1.drawXY(A1RealPart,A1ImaginaryPart);
    vectorGreen1.drawXY(B1RealPart,B1ImaginaryPart);
    vectorRed1.drawXY(C1RealPart,C1ImaginaryPart);
    
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
    // тут надо будет поправить
    document.getElementById("Va").value = vectorOrange2.radius();
    document.getElementById("FIa").value = vectorOrange2.angle();
    document.getElementById("Vb").value = vectorGreen2.radius();
    document.getElementById("FIb").value = vectorGreen2.angle();
    document.getElementById("Vc").value = vectorRed2.radius();
    document.getElementById("FIc").value = vectorRed2.angle();


    // to draw positive sequence vectors based on Phase Vectors
    A1RealPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1RealPart;
    A1ImaginaryPart = getComplex_eA1_eA2_eA0(vA,vB,vC,fiA,fiB,fiC).eA1ImaginaryPart;
    B1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['x'];
    B1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, -120)['y'];
    C1RealPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['x'];
    C1ImaginaryPart=calcCoordinatesOfTurnedPoint(0, 0, A1RealPart, A1ImaginaryPart, 120)['y'];
    vectorOrange1.drawXY(A1RealPart,A1ImaginaryPart);
    vectorGreen1.drawXY(B1RealPart,B1ImaginaryPart);
    vectorRed1.drawXY(C1RealPart,C1ImaginaryPart);
    document.getElementById("V1").value = vectorOrange1.radius();
    document.getElementById("FI1").value = vectorOrange1.angle();
    document.getElementById("V2").value = '---';
    document.getElementById("FI2").value = '---';
    document.getElementById("V3").value = '---';
    document.getElementById("FI3").value = '---';


}

canvas.onmouseup = function(event){
    vectorRed2.isCaptured = vectorGreen2.isCaptured = vectorOrange2.isCaptured = false;
}

canvas.onmouseout = function(event){
    vectorRed2.isCaptured = vectorGreen2.isCaptured = vectorOrange2.isCaptured = false;
}
