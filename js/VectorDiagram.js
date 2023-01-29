// в классе создать событие
// в аппе должен быть слушатель eventListener
// у канваса возникает событие, в обработчики
class VectorDiagram {

    ctx;    // canvas

    topLeftX;   // VectorDiagram top-left coordinate X of the canvas
    topLeftY;   // VectorDiagram top-left coordinate Y of the canvas

    width;   // VectorDiagram width in px

    title;  // VectorDiagram name

    VectorDiagramCenterXCanvas; // X coordinate of the VectorDiagram center
    VectorDiagramCenterYCanvas; // Y coordinate of the VectorDiagram center

    background; // axes(0,30,60,90,120... degrees) + arcs + title

    vectorsArray=[];    // array of vector objects

    static mashtab;
    static scale; // =2*Mashtab/width eg: max width = 500px, max mashtab = 2000В, scale = 8, it means 2000V=500px/2*8

    vectorsValuesPrev;
    
    constructor(ctx, topLeftX, topLeftY, title, settings) {
        this.ctx = ctx;
        this.topLeftX = topLeftX;
        this.topLeftY = topLeftY;
        this.width = settings.width;
        this.title = title;

        VectorDiagram.mashtab = settings.mashtab;
        VectorDiagram.scale = 2*settings.mashtab/this.width;

        this.VectorDiagramCenterXCanvas = topLeftX+this.width/2;
        this.VectorDiagramCenterYCanvas = topLeftY+this.width/2;
        this.background = new Background(ctx, title, this.VectorDiagramCenterXCanvas, this.VectorDiagramCenterYCanvas, this.width);

        for (let i=0;i<settings.vectors.length;i++){
            this.vectorsArray.push(new Vector(ctx, this.VectorDiagramCenterXCanvas, this.VectorDiagramCenterYCanvas, settings.vectors[i].name, settings.vectors[i].color, this.scale));
        }
    }

    drawVectorsByCoordinates(coordinates) {
        VectorDiagram.scale = 2*VectorDiagram.mashtab/this.width;
        this.background.draw();
        for (let i=0;i<coordinates.length;i++){
            this.vectorsArray[i].scale = VectorDiagram.scale;
            this.vectorsArray[i].draw(this.VectorDiagramCenterXCanvas, this.VectorDiagramCenterYCanvas, coordinates[i].xCanvas, coordinates[i].yCanvas);
        }
    }

    drawVectorsByValues(values) {
        VectorDiagram.scale = 2*VectorDiagram.mashtab/this.width;
        var coordinates = [];
        for (let i=0;i<values.length;i++){
            let x = values[i].value*Math.cos(values[i].angle*Math.PI/180)/VectorDiagram.scale;
            let y = values[i].value*Math.sin(values[i].angle*Math.PI/180)/VectorDiagram.scale;
            let xCanvas = this.VectorDiagramCenterXCanvas+x;
            let yCanvas = this.VectorDiagramCenterYCanvas-y;
            coordinates.push({'xCanvas': xCanvas, 'yCanvas': yCanvas});
        } 
        this.drawVectorsByCoordinates(coordinates);
    }

    // to get array with the saved values {value:659, angle:59} of the all vectors
    getSavedPhaseVectorsValuesPrev(){
        let savedPhaseVectorsValuesPrev=[];
        for (let i=0;i<this.vectorsArray.length;i++){
            savedPhaseVectorsValuesPrev.push({value: this.vectorsArray[i].radiusPrev, angle: this.vectorsArray[i].anglePrev});
        }
        return savedPhaseVectorsValuesPrev;
    }

    getCoordinatesFromClick(xCanvas,yCanvas) {
        let coordinates=[];
        for (let i=0;i<this.vectorsArray.length;i++){
            if (this.vectorsArray[i].isCaptured){
                coordinates.push({'xCanvas':xCanvas,'yCanvas':yCanvas});
            }
            else{
                coordinates.push({'xCanvas':this.vectorsArray[i].xPrevCanvas,'yCanvas':this.vectorsArray[i].yPrevCanvas});
            }
        }
        return coordinates;
    }

    checkCapture(x,y){
        let min = 0; // to capture the nearest vector it's neccery to find min clickDistance
        for (let i=1;i<this.vectorsArray.length;i++){
            if (this.vectorsArray[i].clickDistance(x,y)<this.vectorsArray[min].clickDistance(x,y)){
                min = i;
            }
        }
        this.vectorsArray[min].isCaptured = this.vectorsArray[min].clickDistance(x,y)<25;
    }

    resetCapture(){
        for (let i=0;i<this.vectorsArray.length;i++){
            this.vectorsArray[i].isCaptured = false;
        }
    }


    // getCoordinatesFromValueAngle(values) {
    //     var cordinates = [];

    //     for (let i=0;i<values.length;i++){
            
    //         let x = Vector.convert(values[i].value, values[i].angle, phaseVectors.x0, phaseVectors.y0).xCanvas
    //         let y = Vector.convert(values[i].value, values[i].angle, phaseVectors.x0, phaseVectors.y0).yCanvas
        
    //         cordinates.push({'xCanvas': x, 'yCanvas': y});
    //     } 
    //     return cordinates;
    // }
}

