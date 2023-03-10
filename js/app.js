// В апп работать только с модулем и углом, а координатна сетка должнабыть только внутри

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


const phaseVectorsSettings = {
    ctx: ctx,
    title: 'Фазные вектора',
    bgcolor: 'black',
    topLeft: {x: 50, y: 100},
    width: 500,
    mashtab: 1000,
    vectorWidth: 5.5,
    vectors: [
        {
            title: "Ia",
            titleColor: 'black',
            type: "I",
            color: "orange",
            dataColor: 'orange',
        },
        {
            title: "Ib",
            titleColor: 'black',
            type: "I",
            color: "green",
            dataColor: 'green',
        },
        {
            title: "Ic",
            titleColor: 'black',
            type: "I",
            color: "red",
            dataColor: 'red',
        },
    ]
}

const positiveVectorsSettings = {
    ctx: ctx,
    title: 'Прямая последовательность',
    bgcolor: 'black',
    topLeft: {x: 700, y: 100},
    width: 500,
    mashtab: 1000,
    vectorWidth: 3,
    vectors: [
        {
            title: "A1",
            titleColor: 'black',
            type: "I",
            color: "orange",
            dataColor: 'orange',
        },
        {
            title: "B1",
            titleColor: 'black',
            type: "I",
            color: "green",
            dataColor: 'green',
        },
        {
            title: "C1",
            titleColor: 'black',
            type: "I",
            color: "red",
            dataColor: 'red',
        },
    ]
}

const positiveVectors1Settings = {
    ctx: ctx,
    title: 'Прямая последовательность',
    bgcolor: 'transparent',
    topLeft: {x: 50, y: 100},
    width: 500,
    mashtab: 1000,
    vectorWidth: 2,
    vectors: [
        {
            title: "A1",
            titleColor: 'transparent',
            type: "I",
            color: "orange",
            dataColor: 'transparent',
        },
        {
            title: "B1",
            titleColor: 'transparent',
            type: "I",
            color: "green",
            dataColor: 'transparent',
        },
        {
            title: "C1",
            titleColor: 'transparent',
            type: "I",
            color: "red",
            dataColor: 'transparent',
        },
    ]
}

const negativeVectorsSettings = {
    ctx: ctx,
    title: 'Обратная последовательность',
    bgcolor: 'black',
    topLeft: {x: 50, y: 750},
    width: 500,
    mashtab: 1000,
    vectorWidth: 3,
    vectors: [
        {
            title: "A2",
            titleColor: 'black',
            type: "I",
            color: "orange",
            dataColor: 'orange',
        },
        {
            title: "B2",
            titleColor: 'black',
            type: "I",
            color: "green",
            dataColor: 'green',
        },
        {
            title: "C2",
            titleColor: 'black',
            type: "I",
            color: "red",
            dataColor: 'red',
        },
    ]
}

const negativeVectors1Settings = {
    ctx: ctx,
    title: 'Обратная последовательность',
    bgcolor: 'transparent',
    topLeft: {x: 50, y: 100},
    width: 500,
    mashtab: 1000,
    vectorWidth: 2,
    vectors: [
        {
            title: "A2",
            titleColor: 'transparent',
            type: "I",
            color: "orange",
            dataColor: 'transparent',
        },
        {
            title: "B2",
            titleColor: 'transparent',
            type: "I",
            color: "green",
            dataColor: 'transparent',
        },
        {
            title: "C2",
            titleColor: 'transparent',
            type: "I",
            color: "red",
            dataColor: 'transparent',
        },
    ]
}

const zeroVectorsSettings = {
    ctx: ctx,
    title: 'Нулевая последовательность',
    bgcolor: 'black',
    topLeft: {x: 700, y: 750},
    width: 500,
    mashtab: 1000,
    vectorWidth: 3,
    vectors: [
        {
            title: "V0",
            titleColor: 'black',
            type: "I",
            color: "orange",
            dataColor: 'orange',
        },
        {
            title: "V0",
            titleColor: 'black',
            type: "I",
            color: "green",
            dataColor: 'green',
        },
        {
            title: "V0",
            titleColor: 'black',
            type: "I",
            color: "red",
            dataColor: 'red',
        },
    ]
}

const zeroVectors1Settings = {
    ctx: ctx,
    title: 'Нулевая последовательность',
    bgcolor: 'transparent',
    topLeft: {x: 50, y: 100},
    width: 500,
    mashtab: 1000,
    vectorWidth: 2,
    vectors: [
        {
            title: "A0",
            titleColor: 'transparent',
            type: "I",
            color: "orange",
            dataColor: 'transparent',
        },
        {
            title: "B0",
            titleColor: 'transparent',
            type: "I",
            color: "green",
            dataColor: 'transparent',
        },
        {
            title: "C0",
            titleColor: 'transparent',
            type: "I",
            color: "red",
            dataColor: 'transparent',
        },
    ]
}

const phaseVectorsValuesXY = [
    {start: {x: 0, y: 0}, voltage: {x: 300, y: 0}},
    {start: {x: 0, y: 0}, voltage: {x: 0, y: -200}},
    {start: {x: 0, y: 0}, voltage: {x: 0, y: 100}},
 ]

const phaseVectorsDiagram = new VectorDiagram(phaseVectorsSettings);
phaseVectorsDiagram.draw(phaseVectorsValuesXY);

const positiveVectors2Diagram = new VectorDiagram(positiveVectors1Settings);
const negativeVectors2Diagram = new VectorDiagram(negativeVectors1Settings);
const zeroVectors2Diagram = new VectorDiagram(zeroVectors1Settings);

const positiveVectorsDiagram = new VectorDiagram(positiveVectorsSettings);
const negativeVectorsDiagram = new VectorDiagram(negativeVectorsSettings);
const zeroVectorsDiagram = new VectorDiagram(zeroVectorsSettings);

let positiveVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXY).SymmetricalDiagrams.positiveVectorsValuesXY;
let negativeVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXY).SymmetricalDiagrams.negativeVectorsValuesXY;
let zeroVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXY).SymmetricalDiagrams.zeroVectorsValuesXY;
let positiveVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXY).generalDiagram.positiveVectorsValuesXY;
let negativeVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXY).generalDiagram.negativeVectorsValuesXY;
let zeroVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXY).generalDiagram.zeroVectorsValuesXY;

positiveVectorsDiagram.draw(positiveVectorsValuesXY);
negativeVectorsDiagram.draw(negativeVectorsValuesXY);
zeroVectorsDiagram.draw(zeroVectorsValuesXY);
positiveVectors2Diagram.draw(positiveVectors2ValuesXY);
negativeVectors2Diagram.draw(negativeVectors2ValuesXY);
zeroVectors2Diagram.draw(zeroVectors2ValuesXY);

document.getElementById("mashtab").value = phaseVectorsSettings.mashtab;

document.getElementById("Va").value = phaseVectorsDiagram.vectorsArray[0].radiusPrev;
document.getElementById("FIa").value = phaseVectorsDiagram.vectorsArray[0].anglePrev;
document.getElementById("Vb").value = phaseVectorsDiagram.vectorsArray[1].radiusPrev;
document.getElementById("FIb").value = phaseVectorsDiagram.vectorsArray[1].anglePrev;
document.getElementById("Vc").value = phaseVectorsDiagram.vectorsArray[2].radiusPrev;
document.getElementById("FIc").value = phaseVectorsDiagram.vectorsArray[2].anglePrev;

document.getElementById("V1").value = positiveVectorsDiagram.vectorsArray[0].radiusPrev;
document.getElementById("FI1").value = positiveVectorsDiagram.vectorsArray[0].anglePrev;
document.getElementById("V2").value = negativeVectorsDiagram.vectorsArray[0].radiusPrev;
document.getElementById("FI2").value = negativeVectorsDiagram.vectorsArray[0].anglePrev;
document.getElementById("V0").value = zeroVectorsDiagram.vectorsArray[0].radiusPrev;
document.getElementById("FI0").value = zeroVectorsDiagram.vectorsArray[0].anglePrev;

function eventFormMashtab(value) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

    phaseVectorsDiagram.mashtab = document.getElementById("mashtab").value;
    positiveVectorsDiagram.mashtab = document.getElementById("mashtab").value;
    negativeVectorsDiagram.mashtab = document.getElementById("mashtab").value;
    zeroVectorsDiagram.mashtab = document.getElementById("mashtab").value;
    positiveVectors2Diagram.mashtab = document.getElementById("mashtab").value;
    negativeVectors2Diagram.mashtab = document.getElementById("mashtab").value;
    zeroVectors2Diagram.mashtab = document.getElementById("mashtab").value;

    phaseVectorsDiagram.draw(phaseVectorsDiagram.getSavedValuesXY());
    positiveVectorsDiagram.draw(positiveVectorsDiagram.getSavedValuesXY());
    negativeVectorsDiagram.draw(negativeVectorsDiagram.getSavedValuesXY());
    zeroVectorsDiagram.draw(zeroVectorsDiagram.getSavedValuesXY());

    positiveVectors2Diagram.draw(positiveVectors2Diagram.getSavedValuesXY());
    negativeVectors2Diagram.draw(negativeVectors2Diagram.getSavedValuesXY());
    zeroVectors2Diagram.draw(zeroVectors2Diagram.getSavedValuesXY());
}

function eventFormVectorsABC(value) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let vA = document.getElementById("Va").value;
	let fiA = document.getElementById("FIa").value;
	let vB = document.getElementById("Vb").value;
	let fiB = document.getElementById("FIb").value;
	let vC = document.getElementById("Vc").value;
	let fiC = document.getElementById("FIc").value;

    let Ax = vA*Math.cos(fiA*Math.PI/180);
    let Ay = vA*Math.sin(fiA*Math.PI/180);
    let Bx = vB*Math.cos(fiB*Math.PI/180);
    let By = vB*Math.sin(fiB*Math.PI/180);
    let Cx = vC*Math.cos(fiC*Math.PI/180);
    let Cy = vC*Math.sin(fiC*Math.PI/180);

    let phaseVectorsValuesXYEvent = [
        {start: {x: 0, y: 0}, voltage: {x: Ax, y: Ay}},
        {start: {x: 0, y: 0}, voltage: {x: Bx, y: By}},
        {start: {x: 0, y: 0}, voltage: {x: Cx, y: Cy}},
     ]

    phaseVectorsDiagram.draw(phaseVectorsValuesXYEvent);

    let positiveVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.positiveVectorsValuesXY;
    let negativeVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.negativeVectorsValuesXY;
    let zeroVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.zeroVectorsValuesXY;
    let positiveVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.positiveVectorsValuesXY;
    let negativeVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.negativeVectorsValuesXY;
    let zeroVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.zeroVectorsValuesXY;
    
    positiveVectorsDiagram.draw(positiveVectorsValuesXY);
    negativeVectorsDiagram.draw(negativeVectorsValuesXY);
    zeroVectorsDiagram.draw(zeroVectorsValuesXY);
    positiveVectors2Diagram.draw(positiveVectors2ValuesXY);
    negativeVectors2Diagram.draw(negativeVectors2ValuesXY);
    zeroVectors2Diagram.draw(zeroVectors2ValuesXY);
    
    document.getElementById("mashtab").value = phaseVectorsSettings.mashtab;
    document.getElementById("Va").value = phaseVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FIa").value = phaseVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("Vb").value = phaseVectorsDiagram.vectorsArray[1].radiusPrev;
    document.getElementById("FIb").value = phaseVectorsDiagram.vectorsArray[1].anglePrev;
    document.getElementById("Vc").value = phaseVectorsDiagram.vectorsArray[2].radiusPrev;
    document.getElementById("FIc").value = phaseVectorsDiagram.vectorsArray[2].anglePrev;

    document.getElementById("V1").value = positiveVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FI1").value = positiveVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("V2").value = negativeVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FI2").value = negativeVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("V0").value = zeroVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FI0").value = zeroVectorsDiagram.vectorsArray[0].anglePrev;
}


function eventFormVectorsA1A2A0(value) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	let v1 = document.getElementById("V1").value;
	let fi1 = document.getElementById("FI1").value;
	let v2 = document.getElementById("V2").value;
	let fi2 = document.getElementById("FI2").value;
	let v0 = document.getElementById("V0").value;
	let fi0 = document.getElementById("FI0").value;

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

    let phaseVectorsValuesXYEvent = [
        {start: {x: 0, y: 0}, voltage: {x: Ax, y: Ay}},
        {start: {x: 0, y: 0}, voltage: {x: Bx, y: By}},
        {start: {x: 0, y: 0}, voltage: {x: Cx, y: Cy}},
     ]

    phaseVectorsDiagram.draw(phaseVectorsValuesXYEvent);

    let positiveVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.positiveVectorsValuesXY;
    let negativeVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.negativeVectorsValuesXY;
    let zeroVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.zeroVectorsValuesXY;
    let positiveVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.positiveVectorsValuesXY;
    let negativeVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.negativeVectorsValuesXY;
    let zeroVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.zeroVectorsValuesXY;
    
    positiveVectorsDiagram.draw(positiveVectorsValuesXY);
    negativeVectorsDiagram.draw(negativeVectorsValuesXY);
    zeroVectorsDiagram.draw(zeroVectorsValuesXY);
    positiveVectors2Diagram.draw(positiveVectors2ValuesXY);
    negativeVectors2Diagram.draw(negativeVectors2ValuesXY);
    zeroVectors2Diagram.draw(zeroVectors2ValuesXY);
    
    document.getElementById("mashtab").value = phaseVectorsSettings.mashtab;
    document.getElementById("Va").value = phaseVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FIa").value = phaseVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("Vb").value = phaseVectorsDiagram.vectorsArray[1].radiusPrev;
    document.getElementById("FIb").value = phaseVectorsDiagram.vectorsArray[1].anglePrev;
    document.getElementById("Vc").value = phaseVectorsDiagram.vectorsArray[2].radiusPrev;
    document.getElementById("FIc").value = phaseVectorsDiagram.vectorsArray[2].anglePrev;

    document.getElementById("V1").value = positiveVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FI1").value = positiveVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("V2").value = negativeVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FI2").value = negativeVectorsDiagram.vectorsArray[0].anglePrev;
    document.getElementById("V0").value = zeroVectorsDiagram.vectorsArray[0].radiusPrev;
    document.getElementById("FI0").value = zeroVectorsDiagram.vectorsArray[0].anglePrev;
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

    if (phaseVectorsDiagram.isCaptured||positiveVectorsDiagram.isCaptured||negativeVectorsDiagram.isCaptured||zeroVectorsDiagram.isCaptured) {

        var xCanvas = event.offsetX;
        var yCanvas = event.offsetY;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (phaseVectorsDiagram.isCaptured){
            let phaseVectorsValuesXYEvent=[];

            let x = (xCanvas - phaseVectorsDiagram.vectorDiagramCenter.xCanvas)*phaseVectorsDiagram.scale;
            let y = (phaseVectorsDiagram.vectorDiagramCenter.yCanvas - yCanvas)*phaseVectorsDiagram.scale;

            for (let i=0;i<phaseVectorsDiagram.vectorsArray.length;i++){
                if (phaseVectorsDiagram.vectorsArray[i].isCaptured){
                    phaseVectorsValuesXYEvent.push({start: {x: 0, y: 0}, voltage: {x: x, y: y}});
                }
                else{
                    phaseVectorsValuesXYEvent.push(phaseVectorsDiagram.getSavedValuesXY()[i]);
                }
            }

            phaseVectorsDiagram.draw(phaseVectorsValuesXYEvent);

            let positiveVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.positiveVectorsValuesXY;
            let negativeVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.negativeVectorsValuesXY;
            let zeroVectorsValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).SymmetricalDiagrams.zeroVectorsValuesXY;
            let positiveVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.positiveVectorsValuesXY;
            let negativeVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.negativeVectorsValuesXY;
            let zeroVectors2ValuesXY = getSymmetricalComponentsValuesXY(phaseVectorsValuesXYEvent).generalDiagram.zeroVectorsValuesXY;
            
            positiveVectorsDiagram.draw(positiveVectorsValuesXY);
            negativeVectorsDiagram.draw(negativeVectorsValuesXY);
            zeroVectorsDiagram.draw(zeroVectorsValuesXY);
            positiveVectors2Diagram.draw(positiveVectors2ValuesXY);
            negativeVectors2Diagram.draw(negativeVectors2ValuesXY);
            zeroVectors2Diagram.draw(zeroVectors2ValuesXY);
            
        } else if (positiveVectorsDiagram.isCaptured){

            let x = (xCanvas - positiveVectorsDiagram.vectorDiagramCenter.xCanvas)*positiveVectorsDiagram.scale;
            let y = (positiveVectorsDiagram.vectorDiagramCenter.yCanvas - yCanvas)*positiveVectorsDiagram.scale;

            let A1x = x;
            let A1y = y;
            let B1x=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['x'];
            let B1y=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, -120)['y'];
            let C1x=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['x'];
            let C1y=getCoordinatesOfTurnedPoint(0, 0, A1x, A1y, 120)['y'];

            let A2x = negativeVectorsDiagram.getSavedValuesXY()[0].voltage.x;
            let A2y = negativeVectorsDiagram.getSavedValuesXY()[0].voltage.y;
            let B2x = negativeVectorsDiagram.getSavedValuesXY()[1].voltage.x;
            let B2y = negativeVectorsDiagram.getSavedValuesXY()[1].voltage.y;
            let C2x = negativeVectorsDiagram.getSavedValuesXY()[2].voltage.x;
            let C2y = negativeVectorsDiagram.getSavedValuesXY()[2].voltage.y;

            let V0x = zeroVectorsDiagram.getSavedValuesXY()[0].voltage.x;
            let V0y = zeroVectorsDiagram.getSavedValuesXY()[0].voltage.y;
            
            Ax = A1x+A2x+V0x;
            Ay = A1y+A2y+V0y;
            Bx = B1x+B2x+V0x;
            By = B1y+B2y+V0y;
            Cx = C1x+C2x+V0x;
            Cy = C1y+C2y+V0y;
        
            let phaseVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: Ax, y: Ay}},
                {start: {x: 0, y: 0}, voltage: {x: Bx, y: By}},
                {start: {x: 0, y: 0}, voltage: {x: Cx, y: Cy}},
            ];
            let positiveVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A1x, y: A1y}},
                {start: {x: 0, y: 0}, voltage: {x: B1x, y: B1y}},
                {start: {x: 0, y: 0}, voltage: {x: C1x, y: C1y}},
            ];     
            let negativeVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A2x, y: A2y}},
                {start: {x: 0, y: 0}, voltage: {x: B2x, y: B2y}},
                {start: {x: 0, y: 0}, voltage: {x: C2x, y: C2y}},
            ];
            let zeroVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
            ];
            let positive2VectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A1x, y: A1y}},
                {start: {x: 0, y: 0}, voltage: {x: B1x, y: B1y}},
                {start: {x: 0, y: 0}, voltage: {x: C1x, y: C1y}},
            ];
            let negative2VectorsValuesXYEvent = [
                {start: {x: A1x, y: A1y}, voltage: {x: A1x+A2x, y: A1y+A2y}},
                {start: {x: B1x, y: B1y}, voltage: {x: B1x+B2x, y: B1y+B2y}},
                {start: {x: C1x, y: C1y}, voltage: {x: C1x+C2x, y: C1y+C2y}},
            ];
            let zeroVectors2ValuesXYEvent = [
                {start: {x: A1x+A2x, y: A1y+A2y}, voltage: {x: A1x+A2x+V0x, y: A1y+A2y+V0y}},
                {start: {x: B1x+B2x, y: B1y+B2y}, voltage: {x: B1x+B2x+V0x, y: B1y+B2y+V0y}},
                {start: {x: C1x+C2x, y: C1y+C2y}, voltage: {x: C1x+C2x+V0x, y: C1y+C2y+V0y}},
            ];
            
            phaseVectorsDiagram.draw(phaseVectorsValuesXYEvent);

            positiveVectorsDiagram.draw(positiveVectorsValuesXYEvent);
            negativeVectorsDiagram.draw(negativeVectorsValuesXYEvent);
            zeroVectorsDiagram.draw(zeroVectorsValuesXYEvent);
            positiveVectors2Diagram.draw(positive2VectorsValuesXYEvent);
            negativeVectors2Diagram.draw(negative2VectorsValuesXYEvent);
            zeroVectors2Diagram.draw(zeroVectors2ValuesXYEvent);
            
        } else if (negativeVectorsDiagram.isCaptured){

            let x = (xCanvas - negativeVectorsDiagram.vectorDiagramCenter.xCanvas)*negativeVectorsDiagram.scale;
            let y = (negativeVectorsDiagram.vectorDiagramCenter.yCanvas - yCanvas)*negativeVectorsDiagram.scale;

            let A1x = positiveVectorsDiagram.getSavedValuesXY()[0].voltage.x;
            let A1y = positiveVectorsDiagram.getSavedValuesXY()[0].voltage.y;
            let B1x = positiveVectorsDiagram.getSavedValuesXY()[1].voltage.x;
            let B1y = positiveVectorsDiagram.getSavedValuesXY()[1].voltage.y;
            let C1x = positiveVectorsDiagram.getSavedValuesXY()[2].voltage.x;
            let C1y = positiveVectorsDiagram.getSavedValuesXY()[2].voltage.y;

            let A2x = x;
            let A2y = y;
            let B2x=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['x'];
            let B2y=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, 120)['y'];
            let C2x=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['x'];
            let C2y=getCoordinatesOfTurnedPoint(0, 0, A2x, A2y, -120)['y'];

            let V0x = zeroVectorsDiagram.getSavedValuesXY()[0].voltage.x;
            let V0y = zeroVectorsDiagram.getSavedValuesXY()[0].voltage.y;
            
            Ax = A1x+A2x+V0x;
            Ay = A1y+A2y+V0y;
            Bx = B1x+B2x+V0x;
            By = B1y+B2y+V0y;
            Cx = C1x+C2x+V0x;
            Cy = C1y+C2y+V0y;
        
            let phaseVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: Ax, y: Ay}},
                {start: {x: 0, y: 0}, voltage: {x: Bx, y: By}},
                {start: {x: 0, y: 0}, voltage: {x: Cx, y: Cy}},
            ];
            let positiveVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A1x, y: A1y}},
                {start: {x: 0, y: 0}, voltage: {x: B1x, y: B1y}},
                {start: {x: 0, y: 0}, voltage: {x: C1x, y: C1y}},
            ];     
            let negativeVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A2x, y: A2y}},
                {start: {x: 0, y: 0}, voltage: {x: B2x, y: B2y}},
                {start: {x: 0, y: 0}, voltage: {x: C2x, y: C2y}},
            ];
            let zeroVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
            ];
            let positive2VectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A1x, y: A1y}},
                {start: {x: 0, y: 0}, voltage: {x: B1x, y: B1y}},
                {start: {x: 0, y: 0}, voltage: {x: C1x, y: C1y}},
            ];
            let negative2VectorsValuesXYEvent = [
                {start: {x: A1x, y: A1y}, voltage: {x: A1x+A2x, y: A1y+A2y}},
                {start: {x: B1x, y: B1y}, voltage: {x: B1x+B2x, y: B1y+B2y}},
                {start: {x: C1x, y: C1y}, voltage: {x: C1x+C2x, y: C1y+C2y}},
            ];
            let zeroVectors2ValuesXYEvent = [
                {start: {x: A1x+A2x, y: A1y+A2y}, voltage: {x: A1x+A2x+V0x, y: A1y+A2y+V0y}},
                {start: {x: B1x+B2x, y: B1y+B2y}, voltage: {x: B1x+B2x+V0x, y: B1y+B2y+V0y}},
                {start: {x: C1x+C2x, y: C1y+C2y}, voltage: {x: C1x+C2x+V0x, y: C1y+C2y+V0y}},
            ];
            
            phaseVectorsDiagram.draw(phaseVectorsValuesXYEvent);

            positiveVectorsDiagram.draw(positiveVectorsValuesXYEvent);
            negativeVectorsDiagram.draw(negativeVectorsValuesXYEvent);
            zeroVectorsDiagram.draw(zeroVectorsValuesXYEvent);
            positiveVectors2Diagram.draw(positive2VectorsValuesXYEvent);
            negativeVectors2Diagram.draw(negative2VectorsValuesXYEvent);
            zeroVectors2Diagram.draw(zeroVectors2ValuesXYEvent);
            
        } if  (zeroVectorsDiagram.isCaptured){

            let x = (xCanvas - zeroVectorsDiagram.vectorDiagramCenter.xCanvas)*zeroVectorsDiagram.scale;
            let y = (zeroVectorsDiagram.vectorDiagramCenter.yCanvas - yCanvas)*zeroVectorsDiagram.scale;

            let A1x = positiveVectorsDiagram.getSavedValuesXY()[0].voltage.x;
            let A1y = positiveVectorsDiagram.getSavedValuesXY()[0].voltage.y;
            let B1x = positiveVectorsDiagram.getSavedValuesXY()[1].voltage.x;
            let B1y = positiveVectorsDiagram.getSavedValuesXY()[1].voltage.y;
            let C1x = positiveVectorsDiagram.getSavedValuesXY()[2].voltage.x;
            let C1y = positiveVectorsDiagram.getSavedValuesXY()[2].voltage.y;

            let A2x = negativeVectorsDiagram.getSavedValuesXY()[0].voltage.x;
            let A2y = negativeVectorsDiagram.getSavedValuesXY()[0].voltage.y;
            let B2x = negativeVectorsDiagram.getSavedValuesXY()[1].voltage.x;
            let B2y = negativeVectorsDiagram.getSavedValuesXY()[1].voltage.y;
            let C2x = negativeVectorsDiagram.getSavedValuesXY()[2].voltage.x;
            let C2y = negativeVectorsDiagram.getSavedValuesXY()[2].voltage.y;

            let V0x = x;
            let V0y = y;
            
            Ax = A1x+A2x+V0x;
            Ay = A1y+A2y+V0y;
            Bx = B1x+B2x+V0x;
            By = B1y+B2y+V0y;
            Cx = C1x+C2x+V0x;
            Cy = C1y+C2y+V0y;

            let phaseVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: Ax, y: Ay}},
                {start: {x: 0, y: 0}, voltage: {x: Bx, y: By}},
                {start: {x: 0, y: 0}, voltage: {x: Cx, y: Cy}},
            ];
            let positiveVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A1x, y: A1y}},
                {start: {x: 0, y: 0}, voltage: {x: B1x, y: B1y}},
                {start: {x: 0, y: 0}, voltage: {x: C1x, y: C1y}},
            ];     
            let negativeVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A2x, y: A2y}},
                {start: {x: 0, y: 0}, voltage: {x: B2x, y: B2y}},
                {start: {x: 0, y: 0}, voltage: {x: C2x, y: C2y}},
            ];
            let zeroVectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
                {start: {x: 0, y: 0}, voltage: {x: V0x, y: V0y}},
            ];
            let positive2VectorsValuesXYEvent = [
                {start: {x: 0, y: 0}, voltage: {x: A1x, y: A1y}},
                {start: {x: 0, y: 0}, voltage: {x: B1x, y: B1y}},
                {start: {x: 0, y: 0}, voltage: {x: C1x, y: C1y}},
            ];
            let negative2VectorsValuesXYEvent = [
                {start: {x: A1x, y: A1y}, voltage: {x: A1x+A2x, y: A1y+A2y}},
                {start: {x: B1x, y: B1y}, voltage: {x: B1x+B2x, y: B1y+B2y}},
                {start: {x: C1x, y: C1y}, voltage: {x: C1x+C2x, y: C1y+C2y}},
            ];
            let zeroVectors2ValuesXYEvent = [
                {start: {x: A1x+A2x, y: A1y+A2y}, voltage: {x: A1x+A2x+V0x, y: A1y+A2y+V0y}},
                {start: {x: B1x+B2x, y: B1y+B2y}, voltage: {x: B1x+B2x+V0x, y: B1y+B2y+V0y}},
                {start: {x: C1x+C2x, y: C1y+C2y}, voltage: {x: C1x+C2x+V0x, y: C1y+C2y+V0y}},
            ];
            
            phaseVectorsDiagram.draw(phaseVectorsValuesXYEvent);

            positiveVectorsDiagram.draw(positiveVectorsValuesXYEvent);
            negativeVectorsDiagram.draw(negativeVectorsValuesXYEvent);
            zeroVectorsDiagram.draw(zeroVectorsValuesXYEvent);
            positiveVectors2Diagram.draw(positive2VectorsValuesXYEvent);
            negativeVectors2Diagram.draw(negative2VectorsValuesXYEvent);
            zeroVectors2Diagram.draw(zeroVectors2ValuesXYEvent);

        }

        document.getElementById("mashtab").value = phaseVectorsSettings.mashtab;
        document.getElementById("Va").value = phaseVectorsDiagram.vectorsArray[0].radiusPrev;
        document.getElementById("FIa").value = phaseVectorsDiagram.vectorsArray[0].anglePrev;
        document.getElementById("Vb").value = phaseVectorsDiagram.vectorsArray[1].radiusPrev;
        document.getElementById("FIb").value = phaseVectorsDiagram.vectorsArray[1].anglePrev;
        document.getElementById("Vc").value = phaseVectorsDiagram.vectorsArray[2].radiusPrev;
        document.getElementById("FIc").value = phaseVectorsDiagram.vectorsArray[2].anglePrev;

        document.getElementById("V1").value = positiveVectorsDiagram.vectorsArray[0].radiusPrev;
        document.getElementById("FI1").value = positiveVectorsDiagram.vectorsArray[0].anglePrev;
        document.getElementById("V2").value = negativeVectorsDiagram.vectorsArray[0].radiusPrev;
        document.getElementById("FI2").value = negativeVectorsDiagram.vectorsArray[0].anglePrev;
        document.getElementById("V0").value = zeroVectorsDiagram.vectorsArray[0].radiusPrev;
        document.getElementById("FI0").value = zeroVectorsDiagram.vectorsArray[0].anglePrev;
    }
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