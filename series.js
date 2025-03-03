const basicCircle = document.getElementById("basic-circle");
const basicCircleCtx = basicCircle.getContext("2d");
const compCircle = document.getElementById("composite-circle");
const compCircleCtx = compCircle.getContext("2d");
const drawingCircle = document.getElementById("drawing-circle");
const drawingCircleCtx = drawingCircle.getContext("2d");

let basicCircleCenter = [basicCircle.width / 2, basicCircle.height / 2];
let compCircleCenter = [compCircle.width / 2, compCircle.height / 2];
let drawingCircleCenter = [drawingCircle.width / 2, drawingCircle.height / 2];

function drawLine(x1, y1, x2, y2, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}
function drawCirc(x, y, r, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
}

function reset(object, ctx) {
    ctx.clearRect(0, 0, object.width, object.height);
    ctx.fillStyle = "rgb(40, 40, 40)";
    ctx.fillRect(0, 0, object.width, object.height);
    ctx.strokeStyle = "white";
}

let time = 0;

let compEnds = [];
let drawingEnds = [];
let spd = [1, 3];
let mag = [50, 25];
let drawCircles = [
    [1, 20],
    [1, 20],
    [1, 20],
    [1, 20],
    [1, 20],
];
let deltaTime = 300;
let drawingDeltaTime = 800;
let tickSkip = 3;
let drawingTickSkip = 2;
let maxList = Math.floor(deltaTime / (tickSkip * 2));
let drawingMaxList = Math.floor(drawingDeltaTime / (drawingTickSkip * Math.PI));

function rotation(phase, speed, magnitude) {
    return [Math.cos(phase + speed * time / deltaTime * 2 * Math.PI) * magnitude, -Math.sin(phase + speed * time / deltaTime * 2 * Math.PI) * magnitude];
}
function drawingRotation(phase, speed, magnitude) {
    return [Math.cos(phase + speed * time / drawingDeltaTime * 2 * Math.PI) * magnitude, -Math.sin(phase + speed * time / drawingDeltaTime * 2 * Math.PI) * magnitude];
}

function drawCanva() {
    time += 1;
    basicCanva();
    compCanva();
    drawingCanva();
}

function basicCanva() {
    reset(basicCircle, basicCircleCtx);
    
    drawCirc(basicCircleCenter[0], basicCircleCenter[1], 100, basicCircleCtx);
    
    let rotVal = rotation(1, 1, 100);
    drawLine(
        basicCircleCenter[0], basicCircleCenter[1],
        basicCircleCenter[0] + rotVal[0], basicCircleCenter[1] + rotVal[1],
        basicCircleCtx
    )
}

function compCanva() {
    reset(compCircle, compCircleCtx);
    
    let end = [];
    let rotVal = [];
    rotVal.push(rotation(spd[0], 1, mag[0]));
    rotVal.push(rotation(spd[1], 2, mag[1]));
    end.push([compCircleCenter[0] + rotVal[0][0], compCircleCenter[1] + rotVal[0][1]]);
    end.push([end[0][0] + rotVal[1][0], end[0][1] + rotVal[1][1]]);

    drawLine(compCircleCenter[0], compCircleCenter[1], end[0][0], end[0][1], compCircleCtx);
    drawLine(end[0][0], end[0][1], end[1][0], end[1][1], compCircleCtx);

    drawCirc(compCircleCenter[0], compCircleCenter[1], mag[0], compCircleCtx);
    drawCirc(end[0][0], end[0][1], mag[1], compCircleCtx);

    if (time % tickSkip == 0) {
        if (compEnds.length < maxList) {
            compEnds.push(end[1]);
        }
    }
    if (compEnds.length >= maxList) {
        compEnds = compEnds.slice(1, -1);
    }
    for(let i=0; i + 1 < compEnds.length; i++) {
        compCircleCtx.strokeStyle = `rgba(255, 255, 255, ${(i / maxList)})`;
        drawLine(compEnds[i][0], compEnds[i][1], compEnds[i + 1][0], compEnds[i + 1][1], compCircleCtx);
    }
    
}

function drawingCanva() {
    reset(drawingCircle, drawingCircleCtx);

    let end = [drawingCircleCenter];
    let rotVal = [];
    for(let i=0; i < drawCircles.length; i++) {
        rotVal.push(drawingRotation(drawCircles[i][0], i, drawCircles[i][1]));
        end.push([end[i][0] + rotVal[i][0], end[i][1] + rotVal[i][1]]);

        drawingCircleCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        drawLine(end[i][0], end[i][1], end[i + 1][0], end[i + 1][1], drawingCircleCtx);
        
        drawingCircleCtx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        drawCirc(end[i][0], end[i][1], drawCircles[i][1], drawingCircleCtx);
    };
    
    if (time % tickSkip == 0) {
        if (drawingEnds.length < drawingMaxList) {
            drawingEnds.push(end[end.length - 1]);
        }
    }
    if (drawingEnds.length >= drawingMaxList) {
        drawingEnds = drawingEnds.slice(1, -1);
    }
    for(let i=0; i + 1 < drawingEnds.length; i++) {
        drawingCircleCtx.strokeStyle = `rgba(255, 255, 255, ${(i / drawingMaxList)})`;
        drawLine(drawingEnds[i][0], drawingEnds[i][1], drawingEnds[i + 1][0], drawingEnds[i + 1][1], drawingCircleCtx);
    }
}

setInterval(drawCanva, 1000 / 60);