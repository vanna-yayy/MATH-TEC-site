const basicCircle = document.getElementById("basic-circle");
const basicCircleCtx = basicCircle.getContext("2d");
const compCircle = document.getElementById("composite-circle");
const compCircleCtx = compCircle.getContext("2d");

let time = 0;

function basicCanva() {
    time += 1;
    basicCircleCtx.clearRect(0, 0, basicCircle.width, basicCircle.height);
    basicCircleCtx.fillStyle = "rgb(40, 40, 40)";
    basicCircleCtx.fillRect(0, 0, basicCircle.width, basicCircle.height);

    basicCircleCtx.strokeStyle = "white";
    basicCircleCtx.beginPath();
    basicCircleCtx.arc(basicCircle.width / 2, basicCircle.height / 2, 100, 0, Math.PI * 2);
    basicCircleCtx.closePath();
    
    basicCircleCtx.stroke();
    
    basicCircleCtx.beginPath();
    basicCircleCtx.moveTo(basicCircle.width / 2, basicCircle.height / 2);
    basicCircleCtx.lineTo(basicCircle.width / 2 + Math.cos(time / 100) * 100, basicCircle.height / 2 - Math.sin(time / 100) * 100);
    basicCircleCtx.closePath();
    

    basicCircleCtx.stroke();
}

let spd = [1, 2];
let mag = [50, 35];
let ends = [];

function drawLine(x1, y1, x2, y2, ctx) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
}

function compCanva() {
    time += 1;
    compCircleCtx.clearRect(0, 0, compCircle.width, basicCircle.height);
    compCircleCtx.fillStyle = "rgb(40, 40, 40)";
    compCircleCtx.fillRect(0, 0, compCircle.width, basicCircle.height);

    compCircleCtx.strokeStyle = "white";
    
    compCircleCtx.beginPath();
    compCircleCtx.moveTo(compCircle.width / 2, compCircle.height / 2);
    let end = [
        [compCircle.width / 2 + Math.cos(time * spd[0] / 100) * mag[0], compCircle.height / 2 - Math.sin(time * spd[0] / 100) * mag[0]],
    ];
    end.push([end[0][0] + Math.cos(time * spd[1] / 100) * mag[1], end[0][1] - Math.sin(time * spd[1] / 100) * mag[1]]);
    compCircleCtx.lineTo(end[0][0], end[0][1]);
    compCircleCtx.lineTo(end[1][0], end[1][1]);

    compCircleCtx.stroke();

    if (time % 10 == 0) {
        if (ends.length < 20) {
            ends.push(end[1]);
        }
    }
    if (ends.length >= 20) {
        ends = ends.slice(1, -1);
    }
    for(let i=0; i + 1 < ends.length; i++) {
        compCircleCtx.strokeStyle = `rgba(255, 255, 255, ${(i / 5)})`;
        drawLine(ends[i][0], ends[i][1], ends[i + 1][0], ends[i + 1][1], compCircleCtx);
    }
    
}

setInterval(basicCanva, 1000 / 60);
setInterval(compCanva, 1000 / 60);