const nodeCanva = document.getElementById("nodes");
nodeContext = nodeCanva.getContext("2d");

let canvaWidth = nodeCanva.width;
let canvaHeight = nodeCanva.height;
nodeCanva.width = window.innerWidth;

let callWidth;
let callHeight;
let imageLoaded;

const image = new Image();
image.src = "midia/chamada.png";

image.onload = function() {
    callWidth = image.width;
    callHeight = image.height;
    imageLoaded = true;
}

let circumference = 2 * Math.PI;

let points = 100;
let minRadius = 500;
let maxRadius = 1000;
let pointCoords = [];
let connections = [];
let nearbyComparisons = 20;
let connectionRadius = 400;

for(let i = 0; i < points; i ++) {
    let angle = i / points * circumference;
    let radius = Math.random() * (maxRadius - minRadius) + minRadius;
    pointCoords.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius
        ]);
}
for(let i = 0; i < points; i ++) {
    for(let j = 0; j < nearbyComparisons; j ++) {
        let comparisonIndex = i + j - nearbyComparisons / 2;
        comparisonIndex = mod(comparisonIndex, pointCoords.length);
        let dist = distance(pointCoords[i][0], pointCoords[i][1], pointCoords[comparisonIndex][0], pointCoords[comparisonIndex][1])
        if (dist < connectionRadius && dist > 50) {
            connections.push([i, comparisonIndex]);
        }
    }
}

function mod(x, y) {
    return x - y * Math.floor(x / y);
}

function distance(x1, y1, x2, y2) {
    return Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5);
}

function circle(x, y, canvas, color) {
    canvas.beginPath();
    canvas.arc(x, y, 15, 0, circumference);
    canvas.fillStyle = color;
    canvas.fill();
    canvas.closePath();
}

function line(x1, y1, x2, y2, canvas, color) {
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.strokeStyle = color;
    canvas.stroke();
    canvas.closePath();
}

function updateCanva() {
    nodeCanva.width = window.innerWidth - 20;
    drawCanva();
}

window.addEventListener("resize", updateCanva);
document.addEventListener("DOMContentLoaded", updateCanva);

function drawCanva() {
    nodeContext.clearRect(0, 0, nodeCanva.width, nodeCanva.height);

    const grad = nodeContext.createLinearGradient(0, 0, 0, 200);
    grad.addColorStop(0, "rgba(231, 231, 231, 0)");
    grad.addColorStop(1, "#E7E7E7");

    nodeContext.fillStyle = grad;

    nodeContext.fillRect(0, 0, nodeCanva.width, nodeCanva.height);
    
    const frontGrad = nodeContext.createLinearGradient(0, 0, 0, 200);
    frontGrad.addColorStop(0, "rgba(231, 231, 231, 0)");
    frontGrad.addColorStop(1, "rgba(50, 50, 50, 1)");

    for(let i = 0; i < points; i ++) {
        circle(nodeCanva.width / 2 + pointCoords[i][0], nodeCanva.height / 2 + pointCoords[i][1],
            nodeContext, frontGrad);
    }
    for(let i = 0; i < connections.length; i ++) {
        indexA = connections[i][0];
        indexB = connections[i][1];

        line(nodeCanva.width / 2 + pointCoords[indexA][0], nodeCanva.height / 2 + pointCoords[indexA][1],
            nodeCanva.width / 2 + pointCoords[indexB][0], nodeCanva.height / 2 + pointCoords[indexB][1],
            nodeContext, frontGrad);
    }

    if (imageLoaded) {
        nodeContext.drawImage(image, (nodeCanva.width - callWidth) / 2, (nodeCanva.height - callHeight) / 2);
    }
}