class Vector {

    title;

    x0;
    y0;

	xPrev;
    yPrev;
    xPrevCanvas;
    yPrevCanvas;

	xPrevTurned;
    yPrevTurned;
    xPrevCanvasTurned;
    yPrevCanvasTurned;
	
	color = 'black';
	
    isLighted = false; // true if vector is captured onmousemove, otherwise false
    isCaptured = false; // true if the vector is captured onmousedown, otherwise false

    constructor(x0,y0,title,color) {
        this.x0 = x0;
        this.y0 = y0;
        this.title = title;
        this.color = color;

    }

    radius() {  // to calculate distance from center to vector point
        return (((this.xPrev)**2 + (this.yPrev)**2)**0.5).toFixed(2);///(canvas.width/4)/axisScale).toFixed(2);
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

    drawVector(xCanvasTurned,yCanvasTurned,width=3){

		ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = this.color;
        // draw line
        ctx.beginPath();
        ctx.moveTo(this.x0,this.y0);
        ctx.lineTo(xCanvasTurned,yCanvasTurned);
        ctx.stroke();

		ctx.save();
        var arrow_div = 1.15;
        var arrow_angle = 3;
        // draw the first arrow half
        ctx.beginPath();
        ctx.translate(this.x0, this.y0);    // translate to rectangle center
        ctx.moveTo((xCanvasTurned-this.x0)/arrow_div,(yCanvasTurned-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.moveTo((xCanvasTurned-this.x0)/arrow_div,(yCanvasTurned-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.lineTo(xCanvasTurned-this.x0,yCanvasTurned-this.y0);
        ctx.stroke();

        // draw the second arrow half
        ctx.beginPath();
        ctx.moveTo((xCanvasTurned-this.x0)/arrow_div,(yCanvasTurned-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.moveTo((xCanvasTurned-this.x0)/arrow_div,(yCanvasTurned-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.lineTo(xCanvasTurned-this.x0,yCanvasTurned-this.y0);
        ctx.stroke();

        ctx.restore();
    }

    drawTitle(){
		let xCanvasTitle = this.xPrev/2 + this.x0;
		let yCanvasTitle  = this.y0 - this.yPrev/2;
        let xCanvasTurnedTitle = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTitle, yCanvasTitle, -90)['x'];
		let yCanvasTurnedTitle = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTitle, yCanvasTitle, -90)['y'];
        
        if(this.radius()>50) {
            ctx.save();
            //ctx.fillStyle = this.color;
            ctx.font = "24px serif"; 
            ctx.textBaseline = 'middle'
            ctx.textAlign = 'center';
            ctx.fillText(this.title, xCanvasTurnedTitle, yCanvasTurnedTitle);
            ctx.restore();
        }
    }

    drawDegrees(){
		let xCanvasTitle = this.xPrev/0.9 + this.x0;
		let yCanvasTitle  = this.y0 - this.yPrev/0.9;
        let xCanvasTurnedTitle = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTitle, yCanvasTitle, -85)['x'];
		let yCanvasTurnedTitle = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTitle, yCanvasTitle, -90)['y'];
        
        if(this.radius()>30) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.font = "21px serif"; 
            ctx.textBaseline = 'top'
            ctx.textAlign = 'center';
            ctx.fillText(this.angle(), xCanvasTurnedTitle, yCanvasTurnedTitle);
            ctx.restore();
        }
    }

    drawZFi (z,fi,width=3){ // to draw vector from center to point(x1,y1)		
		let x = z*Math.cos(fi*Math.PI/180);
		let y = z*Math.sin(fi*Math.PI/180);
		let xCanvas = x + this.x0;
		let yCanvas = this.y0 - y;
		// switch counterclockwise (-90 навернопотому что формула для полярных координат)
		let xCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['x'];
		let yCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['y'];
		
        this.drawVector(xCanvasTurned,yCanvasTurned,width)

		this.xPrev=x;
		this.yPrev=y;
		this.xPrevCanvas=xCanvas;
		this.yPrevCanvas=yCanvas;
		this.xPrevCanvasTurned=xCanvasTurned;
		this.yPrevCanvasTurned=yCanvasTurned;

        this.drawTitle();
        this.drawDegrees();
    }
	
	
    drawXYCanvas (xCanvasTurned,yCanvasTurned,width=3){ // to draw vector from center to point(x1,y1)
		
        this.drawVector(xCanvasTurned,yCanvasTurned,width)

		this.xPrevCanvas=calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTurned, yCanvasTurned, 90)['x'];
		this.yPrevCanvas=calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvasTurned, yCanvasTurned, 90)['y'];
		this.xPrev=this.xPrevCanvas-this.x0;
		this.yPrev=this.y0-this.yPrevCanvas;
		this.xPrevCanvasTurned=xCanvasTurned;
		this.yPrevCanvasTurned=yCanvasTurned;

        this.drawTitle();
        this.drawDegrees();
    }
	
	
    drawXY (x,y,width=3){ // to draw vector from center to point(x1,y1)
			
		let xCanvas = x + this.x0;
		let yCanvas = this.y0 - y;
		// switch counterclockwise (-90 навернопотому что формула для полярных координат)
		let xCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['x'];
		let yCanvasTurned = calcCoordinatesOfTurnedPoint(this.x0, this.y0, xCanvas, yCanvas, -90)['y'];

        this.drawVector(xCanvasTurned,yCanvasTurned,width)

		this.xPrev=x;
		this.yPrev=y;
		this.xPrevCanvas=xCanvas;
		this.yPrevCanvas=yCanvas;
		this.xPrevCanvasTurned=xCanvasTurned;
		this.yPrevCanvasTurned=yCanvasTurned;

        this.drawTitle();
        this.drawDegrees();
    }
	
    clickDistance(x,y) { // to calculate distance from click point to vector point
        return ((this.xPrevCanvasTurned-x)**2+(this.yPrevCanvasTurned-y)**2)**0.5;
    }		
}