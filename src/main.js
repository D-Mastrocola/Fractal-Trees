let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let angle;

let init = () => {
    canvas.width = window.innerWidth;
    canvas.height =  window.innerHeight;
    window.requestAnimationFrame(gameLoop);
}
let getAngle = (rotation)  => {
    return ((rotation/360) * Math.PI*2 ) ;
}

let branch = (x, y, len, previousAngle) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    let xOffset = x + len * Math.sin(previousAngle + angle);
    let yOffset = y + len * Math.cos(previousAngle + angle);
    ctx.lineTo(xOffset, yOffset);
    ctx.stroke();
    if(len > 4)  {
        console.log('right')
        branch(xOffset, yOffset, len*.75, previousAngle + angle);
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    xOffset = x + len * Math.sin(previousAngle - angle);
    yOffset = y + len * Math.cos(previousAngle - angle);
    ctx.lineTo(xOffset, yOffset);
    ctx.stroke();
    if(len > 4)  {
        console.log('left')
        branch(xOffset, yOffset, len*.75, previousAngle-angle);
    }
}

//---------------------------------
let secondsPassed;
let oldTimeStamp;
let fps;


let draw = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#555555";
    ctx.strokeStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height);
    let length = 150;
    ctx.lineTo(canvas.width/2, canvas.height - length);
    ctx.stroke();
    branch(canvas.width/2, canvas.height - length, length*.75, Math.PI);
    
}

let update = () => {
    angle = parseFloat(document.getElementById('angle-slider').value * Math.PI * -1);
    document.getElementById('angle-text').innerHTML = 'Angle: ' + document.getElementById('angle-slider').value
    draw();
}
function gameLoop(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    // Draw number to the screen

    // Perform the drawing operation
    update(timeStamp);

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}
init();