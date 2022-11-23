class Vector {

    x0;
    y0;
    
    xPrev;
    yPrev;
    
	color = 'black';
	
    isLighted = false; // true if vector is captured onmousemove, otherwise false
    isCaptured = false; // true if the vector is captured onmousedown, otherwise false

    constructor(x0, y0, xPrev, yPrev, color) {
        this.x0 = x0;
        this.y0 = y0;
        this.xPrev = xPrev;
        this.yPrev = yPrev;
        this.color = color;

    }

    radius() {  // to calculate distance from center to vector point
        return (((this.xPrev-this.x0)**2 + (this.yPrev-this.y0)**2)**0.5/200/axisScale).toFixed(2);
    }

    clickDistance(x,y) { // to calculate distance from click point to vector point
        return ((this.xPrev-x)**2+(this.yPrev-y)**2)**0.5;
    }

    draw (x1,y1,width=3){ // to draw vector from center to point(x1,y1)
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = this.color;
        // draw line
        ctx.beginPath();
        ctx.moveTo(this.x0,this.y0);
        ctx.lineTo(x1,y1);
        ctx.stroke();

        var arrow_div = 1.15;
        var arrow_angle = 3;
        // draw the first arrow half
        ctx.beginPath();
        ctx.translate(this.x0, this.y0);    // translate to rectangle center
        ctx.moveTo((x1-this.x0)/arrow_div,(y1-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.moveTo((x1-this.x0)/arrow_div,(y1-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.lineTo(x1-this.x0,y1-this.y0);
        ctx.stroke();

        // draw the second arrow half
        ctx.beginPath();
        ctx.moveTo((x1-this.x0)/arrow_div,(y1-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.moveTo((x1-this.x0)/arrow_div,(y1-this.y0)/arrow_div);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.lineTo(x1-this.x0,y1-this.y0);
        ctx.stroke();

        ctx.restore();
    }
}

