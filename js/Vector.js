class Vector {

    title;  // vector title
    width = 3;  // vector width
    color = 'black';    // vector color

    isCaptured = false; // true if the vector is captured onmousedown, otherwise false

    xPrev;
    yPrev;

    xPrevCanvas;
    yPrevCanvas;

    radiusPrev;
    anglePrev;

    scale;

    // объединить в словарь координаты центра
    constructor(ctx, VectorDiagramCenterXCanvas, VectorDiagramCenterYCanvas, title, color, scale) {
        this.ctx = ctx;
        this.VectorDiagramCenterXCanvas = VectorDiagramCenterXCanvas;
        this.VectorDiagramCenterYCanvas = VectorDiagramCenterYCanvas;
        this.title = title;
        this.color = color;
        this.scale = scale;
    }

    draw(x0, y0, xCanvas,yCanvas){
        this.ctx.lineCap = 'round';
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;

        // draw line
        this.ctx.beginPath();
        this.ctx.moveTo(x0,y0);
        this.ctx.lineTo(xCanvas,yCanvas);
        this.ctx.stroke();

        this.xPrevCanvas=xCanvas;
        this.yPrevCanvas=yCanvas;

        this.xPrev=this.xPrevCanvas-this.VectorDiagramCenterXCanvas;
        this.yPrev=this.VectorDiagramCenterYCanvas-this.yPrevCanvas;

        var temp = new Complex(this.xPrev,this.yPrev);
        this.radiusPrev=(temp.mod()*this.scale).toFixed(2);
        this.anglePrev=(temp.arg()*180/Math.PI).toFixed(2);
    }

    clickDistance(xCanvas,yCanvas) { // to calculate distance from click point to vector point
        return ((this.xPrevCanvas-xCanvas)**2+(this.yPrevCanvas-yCanvas)**2)**0.5;
    }	

}
