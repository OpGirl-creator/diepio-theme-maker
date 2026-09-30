// Canvas Initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Color Input References (Only the Tanks area)
const colorMain = document.getElementById('main');
const colorBarrel = document.getElementById('barrel');
const colorEnemy = document.getElementById('enemy');
const colorFallen = document.getElementById('fallen');

// Hardcoded background/environment colors (since the pickers were removed)
const colorBackground = "#cdcdcd";
const colorGrid = "#555555";
const colorOutline = "#555555";

// Track active mode globally
let currentActiveMode = 'ffa'; 

// Render Loop Function
function renderGamePreview() {
    const lineWidth = 3.5; 
    
    // 1. Clear & Draw base background
    ctx.fillStyle = colorBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Draw Math Gridlines
    ctx.strokeStyle = colorGrid;
    ctx.lineWidth = 1.0;
    const gridSpacing = 30;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Configure configurations for geometry shapes & tanks
    ctx.strokeStyle = colorOutline;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";

    // 3. Draw Floating scatter shapes (Square, Triangle, Fallen Boss representation)
    drawShape(200, 150, 0.3, "#ffe869", 'square');
    drawShape(600, 130, -0.2, "#fc7677", 'triangle');
    
    // Feature the "Fallen Boss" color dynamically on a giant polygon shape!
    drawShape(400, 100, 0.5, colorFallen.value, 'pentagon');

    // 4. Draw Tanks based on chosen mode
    if (currentActiveMode === 'teams2') {
        // 2 Teams Mode: Player Tank (Blue/Main) vs Enemy Team Tank (Red/Enemy)
        drawTank(250, 250, -0.2, colorMain.value, 1);    // Your Tank
        drawTank(550, 230, 2.9, colorEnemy.value, 4);    // Enemy Team Tank
    } else {
        // FFA Mode: Player Tank vs standard FFA Enemy Tank
        drawTank(250, 250, -0.2, colorMain.value, 1);    // Your Tank
        drawTank(550, 230, 2.9, colorEnemy.value, 1);    // FFA Enemy Tank
    }

    // 5. Draw simple text header overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.beginPath(); ctx.roundRect(15, 15, 120, 30, 4); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 12px Arial";
    ctx.fillText(currentActiveMode === 'teams2' ? "Mode: 2 Teams" : "Mode: FFA", 25, 34);
}

// Helper block to build math vector shapes
function drawShape(x, y, angle, color, type) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    if (type === 'square') {
        ctx.rect(-12, -12, 24, 24);
    } else if (type === 'triangle') {
        ctx.moveTo(0, -14); ctx.lineTo(13, 11); ctx.lineTo(-13, 11); ctx.closePath();
    } else if (type === 'pentagon') {
        for (let i = 0; i < 5; i++) {
            let a = (i * 2 * Math.PI / 5) - Math.PI / 2;
            let px = 25 * Math.cos(a); let py = 25 * Math.sin(a); // Made slightly bigger for "Boss"
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
    }
    ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Helper block to construct tank designs
function drawTank(x, y, angle, bodyColor, barrelCount) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = colorBarrel.value; // Linked directly to your Barrel picker
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = colorOutline;
    
    ctx.beginPath();
    if (barrelCount === 1) {
        ctx.rect(0, -11, 40, 22); ctx.fill(); ctx.stroke();
    } else if (barrelCount === 4) { 
        ctx.rect(0, -16, 38, 14); ctx.rect(0, 2, 38, 14); ctx.fill(); ctx.stroke();
    }
    
    // Tank center circle capsule
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, 2 * Math.PI);
    ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Gamemode Button Switching
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentActiveMode = button.getAttribute('data-mode');
        renderGamePreview();
    });
});

// Sync input listeners onto our 4 remaining pickers
const allPickers = [colorMain, colorBarrel, colorEnemy, colorFallen];
allPickers.forEach(picker => picker.addEventListener('input', renderGamePreview));

// Execute drawing render run on startup
renderGamePreview();

// Script Builder Generation
function generateThemeScript() {
    return `// Diep.io Custom Console Theme Script\n` +
           `net_set_color(1, "${colorMain.value}"); // Player Tank Body\n` +
           `net_set_color(0, "${colorBarrel.value}"); // Tank Barrels\n` +
           `net_set_color(12, "${colorEnemy.value}"); // Enemy Color\n` +
           `net_set_color(15, "${colorFallen.value}"); // Fallen Boss Color`;
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
