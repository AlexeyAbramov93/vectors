class Sequence {

    baseVector;
    nextVector;
    prevVector;

    x0;
    y0;

    constructor(baseVector, nextVector, prevVector,x0,y0) {
        this.baseVector = baseVector;
        this.nextVector = nextVector;
        this.prevVector = prevVector;
        this.x0 = x0;
        this.y0 = y0;
    }

    draw (x1,y1, width=3){ // to draw vector from center to point(x1,y1)
        let x2 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, 120)['x'];
        let y2 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, 120)['y'];
        let x3 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, -120)['x'];
        let y3 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, -120)['y'];

        this.baseVector.draw(x1,y1,'orange',width=width);
        this.nextVector.draw(x2,y2,'green',width=width);
        this.prevVector.draw(x3,y3,'red',width=width);
        this.baseVector.xPrev = x1;
        this.baseVector.yPrev = y1;
        this.nextVector.xPrev = x2;
        this.nextVector.yPrev = y2;
        this.prevVector.xPrev = x3;
        this.prevVector.yPrev = y3;   
    }
}
