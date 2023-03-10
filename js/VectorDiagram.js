// в классе создать событие
// в аппе должен быть слушатель eventListener
// у канваса возникает событие, в обработчики
class VectorDiagram {

    ctx;    // canvas

    topLeftX;   // VectorDiagram top-left coordinate X of the canvas
    topLeftY;   // VectorDiagram top-left coordinate Y of the canvas

    width;   // VectorDiagram width in px

    title;  // VectorDiagram name

    vectorDiagramCenter = {}; // coordinate of the VectorDiagram center (xCanvas,yCanvas) 

    background; // axes(0,30,60,90,120... degrees) + arcs + title

    vectorsArray=[];    // array of vector objects

    mashtab;
    scale; // =2*Mashtab/width eg: max width = 500px, max mashtab = 2000В, scale = 8, it means 2000V=500px/2*8

    vectorsValuesPrev;

    isCaptured = false; // true if any vector is captured onmousedown, otherwise false
    
    constructor(settings) {
        this.ctx = settings.ctx;
        this.topLeftX = settings.topLeft.x;
        this.topLeftY = settings.topLeft.y;
        this.width = settings.width;
        this.title = settings.title;

        this.mashtab = settings.mashtab;
        this.scale = 2*settings.mashtab/this.width;

        this.vectorWidth = settings.vectorWidth;

        this.vectorDiagramCenter = {xCanvas: this.topLeftX+this.width/2, yCanvas: this.topLeftY+this.width/2};

        this.background = new Background(ctx, this.title, this.vectorDiagramCenter, this.width, settings.bgcolor);

        for (let i=0;i<settings.vectors.length;i++){
            this.vectorsArray.push(new Vector(ctx, this.vectorDiagramCenter, settings.vectors[i], this.scale, this.vectorWidth));
        }
    }

    draw(valuesXYinVolts) {
        this.scale = 2*this.mashtab/this.width;
        this.background.draw();
        for (let i=0;i<valuesXYinVolts.length;i++){
            this.vectorsArray[i].scale = this.scale;            
            this.vectorsArray[i].draw(
                valuesXYinVolts[i].start.x,
                valuesXYinVolts[i].start.y,
                valuesXYinVolts[i].voltage.x,
                valuesXYinVolts[i].voltage.y,
                this.scale
                );
        }
    }

    // to get array with the saved values {value:659, angle:59} of the all vectors
    getSavedValuesXY(){
        let savedValuesXY=[];
        for (let i=0;i<this.vectorsArray.length;i++){

            savedValuesXY.push({
                start: {
                    x: this.vectorsArray[i].xStartPrev,
                    y: this.vectorsArray[i].yStartPrev
                }, 
                voltage: {
                    x: this.vectorsArray[i].xEndPrev, 
                    y: this.vectorsArray[i].yEndPrev
                }
            })
        }
        return savedValuesXY;
    }

    checkCapture(x,y){
        let min = 0; // to capture the nearest vector it's neccery to find min clickDistance
        for (let i=1;i<this.vectorsArray.length;i++){
            if (this.vectorsArray[i].clickDistance(x,y)<this.vectorsArray[min].clickDistance(x,y)){
                min = i;
            }
        }
        this.vectorsArray[min].isCaptured = this.vectorsArray[min].clickDistance(x,y)<25;
        this.isCaptured = this.vectorsArray[min].clickDistance(x,y)<25;
    }

    resetCapture(){
        for (let i=0;i<this.vectorsArray.length;i++){
            this.vectorsArray[i].isCaptured = false;
            this.isCaptured = false;
        }
    }

}

