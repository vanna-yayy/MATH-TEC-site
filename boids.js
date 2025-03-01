const finalBoids = document.getElementById("full-canva");
let finalBoidsContext = finalBoids.getContext("2d");
let finalBoidsObjects = [];
let boidSpeed = 2;

function updateCanvasScale() {
    finalBoids.width = window.innerWidth - 200 - 17;
    finalBoids.height = 500;
}

document.addEventListener("DOMContentLoaded", function() {
    updateCanvasScale();
    for(let i=0; i < 100; i++) {
        finalBoidsObjects.push([Math.random() * finalBoids.width, Math.random() * finalBoids.height, Math.random() * Math.PI * 2]);
    
    }
});
window.addEventListener("resize", updateCanvasScale);

function mod(x, y) {
    return x - y * Math.floor(x / y);
}

function rotate(x, y, angle) {
    return [Math.cos(angle) * x - Math.sin(angle) * y, Math.sin(angle) * x + Math.cos(angle) * y];
}

function drawObject(x, y, angle, ctx) {
    vertexOffset = [
        rotate(30, 0, angle),
        rotate(-15, 15, angle),
        rotate(-15, -15, angle),
    ]
    
    ctx.beginPath();
    ctx.moveTo(x + vertexOffset[0][0], y + vertexOffset[0][1]);
    ctx.lineTo(x + vertexOffset[1][0], y + vertexOffset[1][1]);
    ctx.lineTo(x + vertexOffset[2][0], y + vertexOffset[2][1]);
    ctx.lineTo(x + vertexOffset[0][0], y + vertexOffset[0][1]);
    ctx.closePath();

    ctx.fillStyle = "#3247CF";
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#1B367A";
    
    ctx.stroke();
}

function drawCanva() {
    finalBoidsContext.clearRect(0, 0, finalBoids.width, finalBoids.height);

    finalBoidsContext.fillStyle = "rgb(40, 40, 40)";
    finalBoidsContext.fillRect(0, 0, finalBoids.width, finalBoids.height);

    for(let i=0; i < finalBoidsObjects.length;i ++) {
        finalBoidsObjects[i][0] = finalBoidsObjects[i][0] + Math.cos(finalBoidsObjects[i][2]) * boidSpeed;
        finalBoidsObjects[i][1] = finalBoidsObjects[i][1] + Math.sin(finalBoidsObjects[i][2]) * boidSpeed;
        finalBoidsObjects[i][0] = mod(finalBoidsObjects[i][0] + 60, finalBoids.width + 120) - 60;
        finalBoidsObjects[i][1] = mod(finalBoidsObjects[i][1] + 60, finalBoids.height + 120) - 60;
        drawObject(finalBoidsObjects[i][0], finalBoidsObjects[i][1], finalBoidsObjects[i][2], finalBoidsContext);
    }
}

setInterval(drawCanva, 1000 / 60);