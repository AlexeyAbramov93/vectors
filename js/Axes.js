class Axes {

    x0;
    y0;

    constructor(x0, y0) {
        this.x0 = x0;
        this.y0 = y0;
      }

    draw(width=0.3){    // to draw axes from the point (x0,y0)      
        ctx.save();
        ctx.lineWidth = width;
        ctx.strokeStyle = 'black';
        arc_count=4;        // to set a number of arcs
        for (let i=0;i<arc_count;i++){
            ctx.beginPath();
            ctx.arc(this.x0,this.y0,(0.25*canvas.width/arc_count*(i+1))*axisScale,0,Math.PI*2);
            ctx.stroke();
        }

        degrees={0:'0',1:'-30',2:'-60',3:'-90',4:'-120',5:'-150',6:'-180',7:'150',8:'120',9:'90',10:'60',11:'30'};
        for (let i=0;i<12;i++){
            ctx.beginPath();
            ctx.moveTo(this.x0,this.y0);
            ctx.lineTo(this.x0,this.y0-canvas.width/4*axisScale);
            ctx.font = "16px serif";
            ctx.textAlign = "center";
            ctx.fillText(degrees[i], this.x0, this.y0-canvas.width/4*(axisScale+0.02));
            ctx.stroke();
            ctx.translate(this.x0, this.y0);            // translate to rectangle center
            ctx.rotate((Math.PI / 180) * 30);   // rotate
            ctx.translate(-this.x0, -this.y0);          // translate back
        }
        ctx.restore();
    }
}