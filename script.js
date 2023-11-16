
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const bounceCountElement = document.getElementById('bounceCount');

let ball = {
    x: 50,
    y: 50,
    radius: 20,
    color: '#ffffff',
    speed: 5,
    dx: 2,
    dy: 2
};

let bounceCount = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off the walls
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
        bounceCount++;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        bounceCount++;
    }
}

function gameLoop() {
    clearCanvas();
    update();
    drawBall();
    bounceCountElement.textContent = `Bounces: ${bounceCount}`;
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Set the ball position to the clicked location
    ball.x = clickX;
    ball.y = clickY;

    // Reset the bounce count
    bounceCount = 0;
});

resetButton.addEventListener('click', () => {
    // Reset the ball position and bounce count
    ball.x = 50;
    ball.y = 50;
    bounceCount = 0;
});

gameLoop(); // Start the game loop