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

    drawSequence (x1,y1, width=3){ // to draw vector from center to point(x1,y1)
        let x2 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, 120)['x'];
        let y2 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, 120)['y'];
        let x3 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, -120)['x'];
        let y3 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, -120)['y'];

        this.baseVector.draw(x1,y1,width=width);
        this.nextVector.draw(x2,y2,width=width);
        this.prevVector.draw(x3,y3,width=width);
        this.baseVector.xPrev = x1;
        this.baseVector.yPrev = y1;
        this.nextVector.xPrev = x2;
        this.nextVector.yPrev = y2;
        this.prevVector.xPrev = x3;
        this.prevVector.yPrev = y3;   
    }
	
    drawZeroSequence (x1,y1, width=3){ // to draw zero sequence vectors from point(x0,y0) to point(x1,y1)

        let x2 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, 2.5)['x'];
        let y2 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, 2.5)['y'];
        let x3 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, -2.5)['x'];
        let y3 = calcCoordinatesOfTurnedPoint(this.x0, this.y0, x1, y1, -2.5)['y'];
	
        let x02 = calcCoordinatesOfTurnedPoint(x1, y1, this.x0, this.y0, -2.5)['x'];
        let y02 = calcCoordinatesOfTurnedPoint(x1, y1, this.x0, this.y0, -2.5)['y'];
        let x03 = calcCoordinatesOfTurnedPoint(x1, y1, this.x0, this.y0, 2.5)['x'];
        let y03 = calcCoordinatesOfTurnedPoint(x1, y1, this.x0, this.y0, 2.5)['y'];
		
		this.nextVector.x0=x02;
		this.nextVector.y0=y02;
		this.prevVector.x0=x03;
		this.prevVector.y0=y03;
		
        this.baseVector.draw(x1,y1,width=width);
        this.nextVector.draw(x2,y2,width=width);
        this.prevVector.draw(x3,y3,width=width);
		
        this.baseVector.xPrev = x1;
        this.baseVector.yPrev = y1;
        this.nextVector.xPrev = x2;
        this.nextVector.yPrev = y2;
        this.prevVector.xPrev = x3;
        this.prevVector.yPrev = y3; 
    }
	
	
    drawPhaseVectors (x1,y1, width=3){ // to draw vector from center to point(x1,y1)


        if (this.baseVector.isCaptured /*|| this.baseVector.isLighted*/){
            this.baseVector.draw(x1,y1,width=width);
            this.baseVector.xPrev = x1;
            this.baseVector.yPrev = y1;
        } else if(this.nextVector.isCaptured /*|| this.nextVector.isLighted*/) {
            this.nextVector.draw(x1,y1,width=width);
            this.nextVector.xPrev = x1;
            this.nextVector.yPrev = y1;
        } else if(this.prevVector.isCaptured /*|| this.prevVector.isLighted*/) {
            this.prevVector.draw(x1,y1,width=width);
            this.prevVector.xPrev = x1;
            this.prevVector.yPrev = y1;
        }

        this.baseVector.draw(this.baseVector.xPrev,this.baseVector.yPrev,width=width);
        this.nextVector.draw(this.nextVector.xPrev,this.nextVector.yPrev,width=width);
        this.prevVector.draw(this.prevVector.xPrev,this.prevVector.yPrev,width=width);
        
    }
}
