// to calculate coordinates of the turned point
// https://foxford.ru/wiki/informatika/povorot-tochki
function getCoordinatesOfTurnedPoint(oX, oY, curPointX, curPointY, degree){
    turnedPointX = oX + (curPointX-oX)*Math.cos(Math.PI/180*degree) - (curPointY-oY)*Math.sin(Math.PI/180*degree);
    turnedPointY = oY + (curPointX-oX)*Math.sin(Math.PI/180*degree) + (curPointY-oY)*Math.cos(Math.PI/180*degree);
    return {'x': turnedPointX, 'y': turnedPointY};
}

function getSymmetricalComponentsValuesXY(valuesXY){

    let a = new Complex(Math.cos(2/3*Math.PI),Math.sin(2/3*Math.PI)); 
    let aSquare = a.pow(2);

    let A=[];
    for (let i=0;i<valuesXY.length;i++){
        A.push(new Complex(valuesXY[i].voltage.x/3,valuesXY[i].voltage.y/3));
    }

    let A0 = (A[0].sum(A[1])).sum(A[2]);
    let A1 = (A[0].sum(a.mul(A[1]))).sum(aSquare.mul(A[2]));
    let A2 = (A[0].sum(aSquare.mul(A[1]))).sum(a.mul(A[2]));

    let B1x=getCoordinatesOfTurnedPoint(0, 0, A1.x, A1.y, -120)['x'];
    let B1y=getCoordinatesOfTurnedPoint(0, 0, A1.x, A1.y, -120)['y'];
    let C1x=getCoordinatesOfTurnedPoint(0, 0, A1.x, A1.y, 120)['x'];
    let C1y=getCoordinatesOfTurnedPoint(0, 0, A1.x, A1.y, 120)['y'];

    let B2x=getCoordinatesOfTurnedPoint(0, 0, A2.x, A2.y, 120)['x'];
    let B2y=getCoordinatesOfTurnedPoint(0, 0, A2.x, A2.y, 120)['y'];
    let C2x=getCoordinatesOfTurnedPoint(0, 0, A2.x, A2.y, -120)['x'];
    let C2y=getCoordinatesOfTurnedPoint(0, 0, A2.x, A2.y, -120)['y'];

    let B1 = new Complex(B1x,B1y); 
    let B2 = new Complex(B2x,B2y); 
    let C1 = new Complex(C1x,C1y); 
    let C2 = new Complex(C2x,C2y); 

    return (
        {
            generalDiagram: {
                'positiveVectorsValuesXY': 
                [
                    {start: {x: 0, y: 0}, voltage: {x: A1.x, y: A1.y}},
                    {start: {x: 0, y: 0}, voltage: {x: B1.x, y: B1.y}},
                    {start: {x: 0, y: 0}, voltage: {x: C1.x, y: C1.y}},
                ],
                'negativeVectorsValuesXY': 
                [
                    {start: {x: A1.x, y: A1.y}, voltage: {x: A1.x+A2.x, y: A1.y+A2.y}},
                    {start: {x: B1.x, y: B1.y}, voltage: {x: B1.x+B2.x, y: B1.y+B2.y}},
                    {start: {x: C1.x, y: C1.y}, voltage: {x: C1.x+C2.x, y: C1.y+C2.y}},
                ],
                'zeroVectorsValuesXY': 
                [
                    {start: {x: A1.x+A2.x, y: A1.y+A2.y}, voltage: {x: A1.x+A2.x+A0.x, y: A1.y+A2.y+A0.y}},
                    {start: {x: B1.x+B2.x, y: B1.y+B2.y}, voltage: {x: B1.x+B2.x+A0.x, y: B1.y+B2.y+A0.y}},
                    {start: {x: C1.x+C2.x, y: C1.y+C2.y}, voltage: {x: C1.x+C2.x+A0.x, y: C1.y+C2.y+A0.y}},
                ]
            },

            SymmetricalDiagrams: {
                'positiveVectorsValuesXY': 
                [
                    {start: {x: 0, y: 0}, voltage: {x: A1.x, y: A1.y}},
                    {start: {x: 0, y: 0}, voltage: {x: B1.x, y: B1.y}},
                    {start: {x: 0, y: 0}, voltage: {x: C1.x, y: C1.y}},
                ],
                'negativeVectorsValuesXY': 
                [
                    {start: {x: 0, y: 0}, voltage: {x: A2.x, y: A2.y}},
                    {start: {x: 0, y: 0}, voltage: {x: B2.x, y: B2.y}},
                    {start: {x: 0, y: 0}, voltage: {x: C2.x, y: C2.y}},
                ],
                'zeroVectorsValuesXY': 
                [
                    {start: {x: 0, y: 0}, voltage: {x: A0.x, y: A0.y}},
                    {start: {x: 0, y: 0}, voltage: {x: A0.x, y: A0.y}},
                    {start: {x: 0, y: 0}, voltage: {x: A0.x, y: A0.y}},
                ]    
            }
        });
}