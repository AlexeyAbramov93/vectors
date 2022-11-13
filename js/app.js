var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let captured_flag = false; // true if the orange line is captured by onmousedown, otherwise false

// shifted origin to the canvas geometic center 
o = {
    x: canvas.width/2,
    y: canvas.height/2,
}

// to draw axes from the canvas geometic center 
function drawAxes(width=0.3){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.stroke();
}

// 
myLine = {
    x1Prev: canvas.width/2,
    y1Prev: canvas.height/5,

    draw: function(x1,y1,color='black',width=3){
        ctx.save();
        // show sensitive area to move myLine
        if (color=='orange'){
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'blue';
            ctx.arc(x1,y1,25,0,Math.PI*2)
            ctx.stroke();
        }
        // draw line
        ctx.beginPath();
        ctx.lineCap = 'round';
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(o.x,o.y);
        ctx.lineTo(x1,y1);
        ctx.stroke();

        arrow_div = 1.15;
        arrow_angle = 3;
        // draw the first arrow half
        ctx.beginPath();
        ctx.translate(o.x, o.y);    // translate to rectangle center
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        // ctx.arc((x1-o.x)/2,(y1-o.y)/2,5,0,Math.PI*2);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.lineTo(x1-o.x,y1-o.y);
        ctx.stroke();

        // draw the first arrow half
        ctx.beginPath();
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        ctx.rotate((Math.PI / 180) * -arrow_angle);  // rotate
        ctx.moveTo((x1-o.x)/arrow_div,(y1-o.y)/arrow_div);
        // ctx.arc((x1-o.x)/2,(y1-o.y)/2,5,0,Math.PI*2);
        ctx.rotate((Math.PI / 180) * arrow_angle);  // rotate
        ctx.lineTo(x1-o.x,y1-o.y);
        ctx.stroke();

        ctx.restore();
    }
}

// draw three 120-degrees shifted myLines 
directSequence = {
    draw: function(x1,y1){
        ctx.save();

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        myLine.draw(x1,y1,color='orange');

        ctx.translate(o.x, o.y);            // translate to rectangle center
        ctx.rotate((Math.PI / 180) * 120);  // rotate
        ctx.translate(-o.x, -o.y);          // translate back
        myLine.draw(x1,y1,color='green');

        ctx.translate(o.x, o.y);            // translate to rectangle center
        ctx.rotate((Math.PI / 180) * 120);  // rotate
        ctx.translate(-o.x, -o.y);          // translate back
        myLine.draw(x1,y1,color='red');

        ctx.restore();

        drawAxes();
    }
}

canvas.onmousedown = function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    var distance = ((myLine.x1Prev-x)**2+(myLine.y1Prev-y)**2)**0.5;
    if (distance<25){
        captured_flag = true;
    }
    canvas.onmousemove = function(event){
        if (captured_flag){
            var x = event.offsetX;
            var y = event.offsetY;
            directSequence.draw(x,y);
            myLine.x1Prev = x;
            myLine.y1Prev = y;
        }
    }
    canvas.onmouseup = function(event){
        canvas.onmousemove = null;
        captured_flag = false;
    }
}

directSequence.draw(canvas.width/2,canvas.height/5);
