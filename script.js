// Canvas Initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Color Input References
const colorBarrel = document.getElementById('colorBarrel');
const colorBody = document.getElementById('colorBody');
const colorOutline = document.getElementById('colorOutline');
const colorBackground = document.getElementById('colorBackground');
const colorGrid = document.getElementById('colorGrid');
const colorSquare = document.getElementById('colorSquare');
const colorTriangle = document.getElementById('colorTriangle');
const colorPentagon = document.getElementById('colorPentagon');
const colorBlue = document.getElementById('colorBlue');
const colorRed = document.getElementById('colorRed');

// Global Trackers for Teams
const colorGreen = "#00e676";
const colorPurple = "#bf5fff";

// Track the current active mode globally
let currentActiveMode = 'sandbox'; 

// Render Loop Function (Draws layout styles based on the chosen mode)
function renderGamePreview() {
    const bg = colorBackground.value;
    const grid = colorGrid.value;
    const border = colorOutline.value;
    const lineWidth = 3.5; 

    // 1. Draw standard background base
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. IF 4 TEAMS MODE IS ACTIVE: Color the background quadrants
    if (currentActiveMode === 'teams4') {
        const halfW = canvas.width / 2;
        const halfH = canvas.height / 2;
        
        // Top-Left (Blue Team Base Area) - tinted subtly
        ctx.fillStyle = colorBlue.value + "22"; // Add transparency
        ctx.fillRect(0, 0, halfW, halfH);
        
        // Top-Right (Purple Team Base Area)
        ctx.fillStyle = colorPurple + "22";
        ctx.fillRect(halfW, 0, halfW, halfH);
        
        // Bottom-Left (Green Team Base Area)
        ctx.fillStyle = colorGreen + "22";
        ctx.fillRect(0, halfH, halfW, halfH);
        
        // Bottom-Right (Red Team Base Area)
        ctx.fillStyle = colorRed.value + "22";
        ctx.fillRect(halfW, halfH, halfW, halfH);
    }

    // 3. Draw Math Gridlines Background matching
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1.0;
    const gridSpacing = 30;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // 4. IF 4 TEAMS MODE IS ACTIVE: Draw quadrant separation lines
    if (currentActiveMode === 'teams4') {
        ctx.strokeStyle = border;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    }

    // 5. IF MAZE MODE IS ACTIVE: Draw dark gray maze wall blocks
    if (currentActiveMode === 'maze') {
        ctx.fillStyle = "#bbbbbb"; // Maze wall color
        ctx.strokeStyle = border;
        ctx.lineWidth = lineWidth;
        
        // Main left wall partition border block
        ctx.beginPath(); ctx.rect(0, 0, 200, 80); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.rect(0, 80, 50, 240); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.rect(0, 320, 400, 80); ctx.fill(); ctx.stroke();
        
        // Top floating maze divider wall
        ctx.beginPath(); ctx.rect(260, 0, 140, 110); ctx.fill(); ctx.stroke();
    }

    // Set configuration layouts for dynamic geometric shapes
    ctx.strokeStyle = border;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";

    // 6. Draw floating game shapes scatter objects
    drawShape(120, 140, 0.3, colorSquare.value, 'square');
    drawShape(340, 130, -0.2, colorTriangle.value, 'triangle');
    drawShape(410, 280, 0.5, colorSquare.value, 'square');
    drawShape(800, 390, 0.6, colorHexagon.value, 'hexagon');

    if (currentActiveMode !== 'maze') {
        drawShape(480, 90, 0.1, colorPentagon.value, 'pentagon');
    }

    // 7. Draw the appropriate tanks based on the selected game mode
    if (currentActiveMode === 'teams4') {
        // Draw 4 distinct team tanks layout representation from screenshot!
        drawTank(130, 80, 0.6, colorBlue.value, 4);      // Blue Twin/Overseer tank
        drawTank(450, 75, 0.0, colorPurple, 8);         // Purple Octo tank
        drawTank(160, 290, -0.4, colorGreen, 1);        // Green Basic tank
        drawTank(440, 300, 0.8, colorRed.value, 4);      // Red Flank tank
    } else {
        // Just draw the standard single active player tank centered
        const tankX = currentActiveMode === 'maze' ? 240 : canvas.width / 2;
        const tankY = currentActiveMode === 'maze' ? 200 : canvas.height / 2 + 20;
        drawTank(tankX, tankY, -Math.PI/2, colorBody.value, 1);
    }

    // 8. Draw UI Elements text display details over the top
    drawUIOverlay();
}

// Helper block to build crisp vector math shapes
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
            let px = 18 * Math.cos(a); let py = 18 * Math.sin(a);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.closePath();
    }
    ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Helper block to construct specific Diep tanks classes types
function drawTank(x, y, angle, bodyColor, barrelCount) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = colorBarrel.value;
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = colorOutline.value;

    // Draw custom weapon barrels configurations array parameters
    ctx.beginPath();
    if (barrelCount === 1) {
        ctx.rect(0, -11, 40, 22); ctx.fill(); ctx.stroke();
    } else if (barrelCount === 4) { // Twin / Flank arrangement setups
        ctx.rect(0, -16, 38, 14); ctx.rect(0, 2, 38, 14); ctx.fill(); ctx.stroke();
    } else if (barrelCount === 8) { // Circle Octo-tank layout setups
        for (let i = 0; i < 8; i++) {
            ctx.save(); ctx.rotate(i * Math.PI / 4); ctx.rect(0, -9, 36, 18); ctx.fill(); ctx.stroke(); ctx.restore();
        }
    }
    
    // Draw central round bubble base shell cover capsule
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, 2 * Math.PI);
    ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Helper layout overlays text mapping
function drawUIOverlay() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.beginPath(); ctx.roundRect(15, 15, 110, 30, 4); ctx.fill();
    ctx.fillStyle = "#ffffff"; ctx.font = "bold 12px Arial";
    ctx.fillText(currentActiveMode === 'teams4' ? "4 Team TDM" : "Score: 42,910", 25, 34);

    if (currentActiveMode === 'maze') {
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.beginPath(); ctx.roundRect(210, 355, 60, 18, 10); ctx.fill();
        ctx.fillStyle = "#ffffff"; ctx.font = "10px Arial";
        ctx.fillText("Jimmy", 225, 368);
    }
}

// Gamemode Button Switching Event Routing Hooks
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentActiveMode = button.getAttribute('data-mode');
        
        // Setup state variable modifications variables adjustments
        if (currentActiveMode === 'sandbox') colorBody.value = "#9842eb";
        else if (currentActiveMode === 'ffa' || currentActiveMode === 'maze') colorBody.value = "#00b2e1";
        else if (currentActiveMode === 'teams2' || currentActiveMode === 'ctf') colorBody.value = colorBlue.value;
        else if (currentActiveMode === 'teams4') colorBody.value = colorRed.value;

        renderGamePreview();
    });
});

// Sync listeners up onto configurations matrix changes loops
const allPickers = [colorBarrel, colorBody, colorOutline, colorBackground, colorGrid, colorSquare, colorTriangle, colorPentagon, colorBlue, colorRed];
allPickers.forEach(picker => picker.addEventListener('input', renderGamePreview));

// Execute drawing render run on creation trigger setup
renderGamePreview();

// Standard configurations script builders output triggers functions 
function generateThemeScript() {
    return `// Diep.io Custom Console Theme Script\n` +
           `net_set_color(3, "${colorBackground.value}"); // Canvas Background\n` +
           `net_set_color(4, "${colorGrid.value}"); // Grid Lines\n` +
           `net_set_color(1, "${colorBody.value}"); // Player Tank Body\n` +
           `net_set_color(0, "${colorBarrel.value}"); // Tank Barrels\n` +
           `net_set_color(2, "${colorOutline.value}"); // Outlines`;
}

document.getElementById('viewCodeBtn').addEventListener('click', () => {
    document.getElementById('codeOutput').value = generateThemeScript();
});

document.getElementById('copyCodeBtn').addEventListener('click', () => {
    const output = document.getElementById('codeOutput');
    output.value = generateThemeScript(); output.select();
    navigator.clipboard.writeText(output.value);
    alert('Diep.io theme copied!');
});
