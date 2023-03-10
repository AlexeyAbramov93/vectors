class Vector {

    title;      // vector title
    titleColor; // vector title color
    width;      // vector width
    color;      // vector color
    dataColor;  // vector data color

    isCaptured = false; // true if the vector is captured onmousedown, otherwise false

    vectorDiagramCenter;

    // values
    xStartPrev;
    yStartPrev;
    xEndPrev;
    yEndPrev;

    radiusPrev;
    anglePrev;

    // canvas coordinares
    xStartPrevCanvas;
    yStartPrevCanvas;
    xEndPrevCanvas;
    yEndPrevCanvas;

    scale;

    constructor(ctx, vectorDiagramCenter, vector, scale, width) {
        this.ctx = ctx;
        this.vectorDiagramCenter = vectorDiagramCenter;
        this.title = vector.title;
        this.color = vector.color;
        this.scale = scale;
        this.width = width;
        this.titleColor = vector.titleColor;
        this.dataColor = vector.dataColor;
    }

    draw(xStart, yStart, xEnd, yEnd, scale){
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;

        // draw line
        this.ctx.beginPath();

        let xStartCanvas = this.vectorDiagramCenter.xCanvas+xStart/scale;
        let yStartCanvas = this.vectorDiagramCenter.yCanvas-yStart/scale;
        this.ctx.moveTo(xStartCanvas,yStartCanvas);
        
        let xEndCanvas = this.vectorDiagramCenter.xCanvas+xEnd/scale;
        let yEndCanvas = this.vectorDiagramCenter.yCanvas-yEnd/scale;
        this.ctx.lineTo(xEndCanvas,yEndCanvas);
        this.ctx.stroke();

        this.xStartPrevCanvas=xStartCanvas;
        this.yStartPrevCanvas=yStartCanvas;
        this.xEndPrevCanvas=xEndCanvas;
        this.yEndPrevCanvas=yEndCanvas;

        this.xStartPrev=xStart;
        this.yStartPrev=yStart;
        this.xEndPrev=(this.xEndPrevCanvas-this.vectorDiagramCenter.xCanvas)*scale;
        this.yEndPrev=(this.vectorDiagramCenter.yCanvas-this.yEndPrevCanvas)*scale;

        var temp = new Complex(this.xEndPrev,this.yEndPrev);
        this.radiusPrev=(temp.mod()).toFixed(2);
        this.anglePrev=(temp.arg()*180/Math.PI).toFixed(2);

        // draw the arrow of the vector
        var arrow_div = 1.3;
        var arrow_angle = 1.85;

        this.ctx.save();
        this.ctx.translate(xStartCanvas, yStartCanvas); // translate to vector start coordinates

        this.ctx.beginPath();
        this.ctx.moveTo((xEndCanvas-xStartCanvas)/arrow_div,(yEndCanvas-yStartCanvas)/arrow_div);
        this.ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        this.ctx.moveTo((xEndCanvas-xStartCanvas)/arrow_div,(yEndCanvas-yStartCanvas)/arrow_div);
        this.ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        this.ctx.lineTo(xEndCanvas-xStartCanvas,yEndCanvas-yStartCanvas);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo((xEndCanvas-xStartCanvas)/arrow_div,(yEndCanvas-yStartCanvas)/arrow_div);
        this.ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        this.ctx.moveTo((xEndCanvas-xStartCanvas)/arrow_div,(yEndCanvas-yStartCanvas)/arrow_div);
        this.ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        this.ctx.lineTo(xEndCanvas-xStartCanvas,yEndCanvas-yStartCanvas);
        this.ctx.stroke();
        this.ctx.restore();

        // draw vector title
        if (this.radiusPrev>125) {
            let xCanvasTitle = (xEnd/2-xStart)/scale;
            let yCanvasTitle  = (-yEnd/2+yStart)/scale;

            this.ctx.save();
            this.ctx.translate(xStartCanvas, yStartCanvas); // translate to vector start coordinates

            this.ctx.fillStyle = this.titleColor;
            this.ctx.font = "26px serif"; 
            this.ctx.textBaseline = 'middle'
            this.ctx.textAlign = 'center';
            this.ctx.fillText(this.title, xCanvasTitle, yCanvasTitle);
            this.ctx.restore();
        }

        // draw value + angle near the vector
        this.ctx.save();
        this.ctx.translate(xStartCanvas, yStartCanvas); // translate to vector start coordinates

		let xCanvasData = (xEnd/0.97 - xStart)/scale;
		let yCanvasData  = (-yEnd + yStart/0.97)/scale;

        if(xCanvasData>xStart) {
            this.ctx.textAlign = 'left';
        }
        else if (xCanvasData<xStart) {
            this.ctx.textAlign = 'right';
        }
        else {
            this.ctx.textAlign = 'center';
        }

        if(yCanvasData<yStart) {
            this.ctx.textBaseline = 'bottom';
        }
        else if (yCanvasData>yStart) {
            this.ctx.textBaseline = 'top';
        }
        else {
            this.ctx.textBaseline = 'middle';
        }
        
        this.ctx.fillStyle = this.dataColor;
        this.ctx.font = "18px serif"; 
        this.ctx.fillText(`${this.radiusPrev}\u2220${this.anglePrev}\u00B0`, xCanvasData, yCanvasData);
        this.ctx.restore();
    }


    clickDistance(xCanvas,yCanvas) { // to calculate distance from click point to vector point
        return ((this.xEndPrevCanvas-xCanvas)**2+(this.yEndPrevCanvas-yCanvas)**2)**0.5;
    }	
}
