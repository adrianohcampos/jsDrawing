
var jsDrawing = {};

jsDrawing.createCanvas = function (parent, width, height) {
    var canvas = {};
    canvas.node = document.createElement('canvas');
    canvas.context = canvas.node.getContext('2d');
    canvas.node.width = width || 100;
    canvas.node.height = height || 100;
    document.querySelector(parent).appendChild(canvas.node);
    return canvas;
}

jsDrawing.init = function (element, width, height, fillColor) {

    var canvas = jsDrawing.createCanvas(element, width, height);
    var ctx = canvas.context;

    canvas.drawColor = fillColor || '#000';
    canvas.drawWidth = 5;
    canvas.isDrawing = false;

    ctx.start = function (e) {
        canvas.isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        e.preventDefault();
    }

    ctx.stop = function (e) {
        if (canvas.isDrawing) {
            ctx.stroke()
            ctx.closePath()
            canvas.isDrawing = false;
        }
        e.preventDefault();
    }

    ctx.draw = function (e) {
        if (canvas.isDrawing) {
            ctx.lineTo(e.clientX - canvas.node.offsetLeft, e.clientY - canvas.node.offsetTop);
            ctx.strokeStyle = canvas.drawColor;
            ctx.lineWidth = canvas.drawWidth;
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.stroke()
        }
        e.preventDefault();
    }

    ctx.clearTo = function () {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.fillRect(0, 0, width, height);
    };

    ctx.clearTo();

    // bind mouse events
    canvas.node.onmousemove = function (e) {
        ctx.draw(e)
    };
    canvas.node.onmousedown = function (e) {
        ctx.start(e)
    };
    canvas.node.onmouseup = function (e) {
        ctx.stop(e)
    };

    // bind touch events
    canvas.node.ontouchmove = function (e) {
        ctx.draw(e)
    };
    canvas.node.ontouchdown = function (e) {
        ctx.start(e)
    };
    canvas.node.ontouchup = function (e) {
        ctx.stop(e)
    };
}