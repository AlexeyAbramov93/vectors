class Vector {

    x0;
    y0;
    
    xPrevCanvas;
    yPrevCanvas;

	xPrev;
    yPrev;

    xPrevCanvasTurned;
    yPrevCanvasTurned;
	
	xPrevTurned;
    yPrevTurned;

	color = 'black';
	
    isLighted = false; // true if vector is captured onmousemove, otherwise false
    isCaptured = false; // true if the vector is captured onmousedown, otherwise false

    constructor(x0, y0, color) {
        this.x0 = x0;
        this.y0 = y0;
        this.color = color;

    }

    drawZFi (z,fi,width=3){ // to draw vector from center to point(x1,y1)
	
		// против часовой на 90
		//let tmpX1 = x1;
		//let tmpY1 = y1;
		//x1 = this.x0 - (this.y0-tmpY1);
		//y1 = this.y0-(tmpX1-this.x0);

		// по часовой на 90
		//let tmpX1 = x1;
		//let tmpY1 = y1;
		//x1 = this.x0 + (this.y0-tmpY1);
		//y1 = this.y0 + (tmpX1-this.x0);
		
		
		let x = z*Math.cos(fi*Math.PI/180);
		let y = z*Math.sin(fi*Math.PI/180);
		let xCanvas = x + this.x0;
		let yCanvas = this.y0 - y;

		// switch counterclockwise (-90 навернопотому что формула для полярных координат)
		let xCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['x'];
		let yCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['y'];

		ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = this.color;
        // draw line
        ctx.beginPath();
        ctx.moveTo(this.x0,this.y0);
        ctx.lineTo(xCanvasTurned,yCanvasTurned);
        ctx.stroke();
		
		this.xPrev=x;
		this.yPrev=y;
		this.xPrevCanvas=xCanvas;
		this.yPrevCanvas=yCanvas;
		this.xPrevCanvasTurned=xCanvasTurned;
		this.yPrevCanvasTurned=yCanvasTurned;


    }
	
	
    drawXYCanvas (xCanvasTurned,yCanvasTurned,width=3){ // to draw vector from center to point(x1,y1)
		// switch counterclockwise (-90 навернопотому что формула для полярных координат)

		ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = this.color;
        // draw line
        ctx.beginPath();
        ctx.moveTo(this.x0,this.y0);
        ctx.lineTo(xCanvasTurned,yCanvasTurned);
        ctx.stroke();
		
		this.xPrevCanvas=calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTurned, yCanvasTurned, 90)['x'];
		this.yPrevCanvas=calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTurned, yCanvasTurned, 90)['y'];

		this.xPrev=this.xPrevCanvas-this.x0;
		this.yPrev=this.y0-this.yPrevCanvas;

		this.xPrevCanvasTurned=xCanvasTurned;
		this.yPrevCanvasTurned=yCanvasTurned;
    }
	
	
    drawXY (x,y,width=3){ // to draw vector from center to point(x1,y1)
		
		// против часовой на 90
		//let tmpX1 = x1;
		//let tmpY1 = y1;
		//x1 = this.x0 - (this.y0-tmpY1);
		//y1 = this.y0-(tmpX1-this.x0);

		// по часовой на 90
		//let tmpX1 = x1;
		//let tmpY1 = y1;
		//x1 = this.x0 + (this.y0-tmpY1);
		//y1 = this.y0 + (tmpX1-this.x0);
		
		let xCanvas = x + this.x0;
		let yCanvas = this.y0 - y;

		// switch counterclockwise (-90 навернопотому что формула для полярных координат)
		let xCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['x'];
		let yCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['y'];


		ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = this.color;
        // draw line
        ctx.beginPath();
        ctx.moveTo(this.x0,this.y0);
        ctx.lineTo(xCanvasTurned,yCanvasTurned);
        ctx.stroke();
		
		this.xPrev=x;
		this.yPrev=y;
		this.xPrevCanvas=xCanvas;
		this.yPrevCanvas=yCanvas;
		this.xPrevCanvasTurned=xCanvasTurned;
		this.yPrevCanvasTurned=yCanvasTurned;
    }
	
    clickDistance(x,y) { // to calculate distance from click point to vector point
		// против часовой на 90
		//let tmpX = x;
		//let tmpY = y;
		
		//x = this.x0 - (this.y0-tmpY);
		//y = this.y0-(tmpX-this.x0);
		//let tmpXPrev = this.x0 - (this.y0-this.yPrev);
		//let tmpYPrev = this.y0-(this.xPrev-this.x0);
        return ((this.xPrevCanvasTurned-x)**2+(this.yPrevCanvasTurned-y)**2)**0.5;
    }	
	
    radius() {  // to calculate distance from center to vector point
        return ((this.xPrev)**2 + (this.yPrev)**2)**0.5;///(canvas.width/4)/axisScale).toFixed(2);
    }
	
    angle() {

        if (this.xPrev>0){
			if (this.yPrev>0){
				return ((Math.atan(this.yPrev/this.xPrev)) / Math.PI * 180).toFixed(2);
			} else if (this.yPrev<0){
				return ((Math.atan(this.yPrev/this.xPrev)) / Math.PI * 180).toFixed(2);
			} else{
				return 0;
			}
		} else if (this.xPrev<0){
			if (this.yPrev>0){
				return ((Math.PI+Math.atan(this.yPrev/this.xPrev)) / Math.PI * 180).toFixed(2);
			} else if (this.yPrev<0){
				return ((-Math.PI+Math.atan(this.yPrev/this.xPrev)) / Math.PI * 180).toFixed(2);
			} else{
				return (Math.PI/ Math.PI * 180).toFixed(2);
			}
		} else if (this.xPrev==0){
			if (this.yPrev>0){
				return (Math.PI/2 / Math.PI * 180).toFixed(2);
			} else if (this.yPrev<0){
				return (-Math.PI/2 / Math.PI * 180).toFixed(2);
			}
		}
    }	
}