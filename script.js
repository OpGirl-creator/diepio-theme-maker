// Canvas Initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Color Input References
const colorMain = document.getElementById('main');
const colorBarrel = document.getElementById('barrel');
const colorEnemy = document.getElementById('enemy');
const colorSquare = document.getElementById('square');

// Hardcoded Environment Colors to perfectly match standard Diep.io
const colorBackground = "#cdcdcd";
const colorGridLines = "#c4c4c4"; // Subtle grey grid lines
const colorOutline = "#555555";   // Standard thick asset outline

let currentActiveMode = 'ffa'; 

// Render Loop Function
function renderGamePreview() {
    // 1. Draw solid arena floor base
    ctx.fillStyle = colorBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Draw Diep.io-style grid system
    ctx.strokeStyle = colorGridLines;
    ctx.lineWidth = 1.0;
    const gridSpacing = 24; // Diep.io grid cells are roughly this density relative to tanks
    
    for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Set configuration variables for outline borders
    ctx.strokeStyle = colorOutline;
    ctx.lineWidth = 3.5; // Distinct thick Diep.io lines
    ctx.lineJoin = "round";

    // 3. Draw a Collectible Shiny Square on the Arena Floor
    // Placed smoothly near the middle (X: 425, Y: 140)
    drawShape(425, 140, 0.4, colorSquare.value);

    // 4. Draw Interactive Custom Tank Formations
    if (currentActiveMode === 'teams2') {
        // Blue Team Player vs Red Team Twin Tank Arrangement
        drawTank(250, 230, -0.1, colorMain.value, 1);    
        drawTank(580, 210, 3.0, colorEnemy.value, 2);    
    } else {
        // Standard FFA Matchup: Player vs Basic Red Tank Enemy
        drawTank(250, 230, -0.1, colorMain.value, 1);    
        drawTank(580, 210, 3.0, colorEnemy.value, 1);    
    }

    // 5. Draw UI Mode Title Card Top Left
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.beginPath(); ctx.roundRect(15, 15, 120, 30, 4); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 12px Arial";
    ctx.fillText(currentActiveMode === 'teams2' ? "Mode: 2 Teams" : "Mode: FFA", 25, 34);
}

// Vector Polygon Renderer for Square
function drawShape(x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    
    ctx.beginPath();
    // Diep squares are standard centered bounding rectangles
    ctx.rect(-18, -18, 36, 36); 
    ctx.fill(); 
    ctx.stroke();
    
    ctx.restore();
}

// Vector Tank Model Assembly Module
function drawTank(x, y, angle, bodyColor, barrelCount) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    
    ctx.fillStyle = colorBarrel.value;
    
    ctx.beginPath();
    if (barrelCount === 1) {
        // Basic Barrel
        ctx.rect(0, -13, 44, 26); ctx.fill(); ctx.stroke();
    } else if (barrelCount === 2) { 
        // Twin Cannon Arrangement Setup
        ctx.rect(0, -19, 42, 15); ctx.rect(0, 4, 42, 15); ctx.fill(); ctx.stroke();
    }
    
    // Core Round Bubble Shell Base
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, 2 * Math.PI);
    ctx.fill(); 
    ctx.stroke();
    
    ctx.restore();
}

// Gamemode Switch Route Logic Hooks
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentActiveMode = button.getAttribute('data-mode');
        renderGamePreview();
    });
});

// Dynamic Configuration Inputs Sync Pipeline
const allPickers = [colorMain, colorBarrel, colorEnemy, colorSquare];
allPickers.forEach(picker => picker.addEventListener('input', renderGamePreview));

// Execute drawing render run on creation runtime start
renderGamePreview();

// Script Output Generator Engine
function generateThemeScript() {
    return `// Diep.io Custom Console Theme Script\n` +
           `net_set_color(1, "${colorMain.value}"); // Player Tank Body\n` +
           `net_set_color(0, "${colorBarrel.value}"); // Tank Barrels\n` +
           `net_set_color(2, "${colorOutline.value}"); // Asset Outline Borders\n` +
           `net_set_color(12, "${colorEnemy.value}"); // Enemy Arena Target Color\n` +
           `net_set_color(16, "${colorSquare.value}"); // Square Polygon Grid Color`;
}

document.getElementById('viewCodeBtn').addEventListener('click', () => {
    document.getElementById('codeOutput').value = generateThemeScript();
});

document.getElementById('copyCodeBtn').addEventListener('click', () => {
    const output = document.getElementById('codeOutput');
    output.value = generateThemeScript(); 
    output.select();
    navigator.clipboard.writeText(output.value);
    alert('Theme copied to clipboard!');
});
