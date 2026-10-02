// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Element Hook References
const colorMain = document.getElementById('main');
const colorBarrel = document.getElementById('barrel');
const colorEnemy = document.getElementById('enemy');
const colorFallen = document.getElementById('fallen');

// Constants matching native Diep.io style designs
const colorBackground = "#cdcdcd";
const colorGridLines = "#c4c4c4";
const colorOutline = "#555555";

let currentActiveMode = 'ffa';

// Main Canvas Render Pipeline
function renderGamePreview() {
    // 1. Draw Arena Background Floor
    ctx.fillStyle = colorBackground;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw standard Diep.io-style grid system
    ctx.strokeStyle = colorGridLines;
    ctx.lineWidth = 1.0;
    const gridSpacing = 24; 
    for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Set configuration variables for vector outlines
    ctx.strokeStyle = colorOutline;
    ctx.lineWidth = 3.5; 
    ctx.lineJoin = "round";

    // 3. Draw a crisp yellow polygon square in center arena area
    drawSquareElement(425, 130, 0.4, "#ffe869");
    drawFallenBossElement(425, 280, -0.2, colorFallen.value);
    drawHexagonElement(200, 180, 0.2, colorFallen.value);
    drawTriangleElement(600, 280, -0.4, colorFallen.value);

    // 5. Draw Dynamic Game Mode Combat Tanks Layout Setup
    switch (currentActiveMode) {
        case 'ffa':
            // Standard FFA Duel (Single Barrel vs Single Barrel)
            drawTank(220, 200, -0.1, colorMain.value, 1);
            drawTank(620, 180, 3.0, colorEnemy.value, 1);
            break;

        case 'teams2':
            // Team Mode (Flank Guard player vs Twin Cannon enemy)
            // Let's modify the player to have 2 barrels for flavor!
            drawTank(220, 200, -0.1, colorMain.value, 2); 
            drawTank(620, 180, 3.0, colorEnemy.value, 2);
            break;
    }
}

// Vector Triangle Builder Module
function drawTriangleElement(x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        // Rotates 360 / 3 = 120 degrees each step
        let a = (i * 2 * Math.PI / 3) - Math.PI / 2;
        let px = 20 * Math.cos(a); // 20 is the radius size
        let py = 20 * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
}


// Vector Hexagonal Builder Module
function drawHexagonElement(x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        // Rotates 360 / 6 = 60 degrees each step (Math.PI / 3)
        let a = (i * 2 * Math.PI / 6) - Math.PI / 2;
        let px = 24 * Math.cos(a); // 24 is the layout radius scale
        let py = 24 * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
}


// Vector Square Builder Module
function drawSquareElement(x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(-16, -16, 32, 32);
    ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Vector Fallen Pentagonal Boss Builder Module
function drawFallenBossElement(x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        let a = (i * 2 * Math.PI / 5) - Math.PI / 2;
        let px = 28 * Math.cos(a); let py = 28 * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Vector Tank Builder Module
function drawTank(x, y, angle, bodyColor, barrelCount) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = colorBarrel.value;

    ctx.beginPath();
    if (barrelCount === 1) {
        ctx.rect(0, -13, 44, 26); ctx.fill(); ctx.stroke();
    } else if (barrelCount === 2) {
        ctx.rect(0, -19, 42, 15); ctx.rect(0, 4, 42, 15); ctx.fill(); ctx.stroke();
    }

    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, 2 * Math.PI);
    ctx.fill(); ctx.stroke();
    ctx.restore();
}

// Gamemode Active Click Routing Mechanics
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentActiveMode = button.getAttribute('data-mode');
        renderGamePreview();
    });
});

// Dynamic Inputs Change Render Hooks Pipeline
const allPickers = [colorMain, colorBarrel, colorEnemy, colorFallen];
allPickers.forEach(picker => picker.addEventListener('input', renderGamePreview));

// Execute initialization drawing array map loop on start
renderGamePreview();

// Theme Script Generation Logic Module
function generateThemeScript() {
    // Removes the '#' from the beginning of each hex color code
    const main = colorMain.value.replace('#', '');
    const barrel = colorBarrel.value.replace('#', '');
    const enemy = colorEnemy.value.replace('#', '');
    const fallen = colorFallen.value.replace('#', '');

    return `// Diep.io Custom Console Theme Script\n` +
           `net_set_color(1, "${main}"); // Player Tank Body\n` +
           `net_set_color(0, "${barrel}"); // Tank Barrels\n` +
           `net_set_color(12, "${enemy}"); // Target Enemy Color\n` +
           `net_set_color(15, "${fallen}"); // Fallen Boss Color`;
}


document.getElementById('viewCodeBtn').addEventListener('click', () => {
    document.getElementById('codeOutput').value = generateThemeScript();
});

document.getElementById('copyCodeBtn').addEventListener('click', () => {
    const output = document.getElementById('codeOutput');
    output.value = generateThemeScript();
    output.select();
    navigator.clipboard.writeText(output.value);
    alert('Theme script copied to clipboard!');
});
