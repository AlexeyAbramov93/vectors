class Background {

    axisScale=1/*0.8*/;              // to set scale of the canvas
    backgroundArcCount=4;       // to set a number of arcs
    backgroundLineWidth=0.3;    // to set line width for the background


    constructor(ctx, title, x0, y0, size) {
        this.ctx = ctx;
        this.title = title;
        this.x0 = x0;
        this.y0 = y0;
        this.size = size;
    }


    draw(){ // to draw axes for the point (x0,y0)  
        
        this.ctx.save();

        this.ctx.font = "18px serif"; 
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.title, this.x0, this.y0-this.size/(2.95-this.axisScale));

        this.ctx.lineWidth = this.backgroundLineWidth;
        this.ctx.strokeStyle = 'black';

        for (let i=0;i<this.backgroundArcCount;i++){
            this.ctx.beginPath();
            this.ctx.arc(this.x0,this.y0,0.5*this.size/this.backgroundArcCount*(i+1)*this.axisScale,0,Math.PI*2);
            this.ctx.stroke();
        }

        let degrees=['90','60','30','0','-30','-60','-90','-120','-150','-180','150','120'];
        this.ctx.font = "16px serif";
        this.ctx.textAlign = "center";
        for (let i=0;i<degrees.length;i++){
            this.ctx.beginPath();
            this.ctx.moveTo(this.x0,this.y0);
            this.ctx.lineTo(this.x0,this.y0+0.5*this.size*this.axisScale);
            this.ctx.fillText(degrees[i], this.x0, this.y0-0.5*this.size*(this.axisScale+0.02));
            this.ctx.stroke();
            this.ctx.translate(this.x0, this.y0);   // translate to rectangle center
            this.ctx.rotate((Math.PI / 180) * 30);  // rotate
            this.ctx.translate(-this.x0, -this.y0); // translate back
        }
        this.ctx.restore();
    }
}

