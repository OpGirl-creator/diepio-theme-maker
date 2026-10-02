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
  drawFallenBoosterElement(650, 100, 2.8, colorFallen.value);

    // Draw Upgrade Stat Bars (Perfectly aligned with an even 5px gap)
    drawMovementElement(5, 375, 150, 20, "#76fc87"); // Y: 375
    drawReloadElement(5, 350, 150, 20, "#76fc87");   // Y: 350 (-25)
    drawBulletdamageElement(5, 325, 150, 20, "#76fc87");// Y: 325 (-25)
    drawPenetrationElement(5, 300, 150, 20, "#76fc87"); // Y: 300 (-25)
    drawBulletspeedElement(5, 275, 150, 20, "#76fc87"); // Y: 275 (-25)
    drawBodydamageElement(5, 250, 150, 20, "#76fc87");  // Y: 250 (-25)
    drawMaxElement(5, 225, 150, 20, "#76fc87");         // Y: 225 (-25)
    drawHealthElement(5, 200, 150, 20, "#76fc87");      // Y: 200 (-25)


// side boxs
drawNameHUD("YOUR_NAME");

// 5. Draw Dynamic Game Mode Combat Tanks Layout Setup
switch (currentActiveMode) {
case 'ffa':
// Standard FFA Duel (Single Barrel vs Single Barrel)
drawTank(390, 200, -0.1, colorMain.value, 1);
drawTank(620, 180, 3.0, colorEnemy.value, 2);
break;

case 'teams2':
// Team Mode (Flank Guard player vs Twin Cannon enemy)
// Let's modify the player to have 2 barrels for flavor!
drawTank(220, 200, -0.1, colorMain.value, 2);
drawTank(620, 180, 3.0, colorEnemy.value, 2);
break;
}
}

function drawHealthElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}

function drawMaxElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}

function drawBodydamageElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}

function drawBulletspeedElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}

function drawPenetrationElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}

function drawBulletdamageElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}

function drawReloadElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}

// Vector Rectangle Builder Module
function drawMovementElement(x, y, width, height, color) {
    ctx.save();
    
    // 1. Draw the inner background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}


// UI HUD Name Box Builder Module
function drawNameHUD(nameText) {
ctx.save();

// 1. Configure the Container Box Position & Dimensions
const boxX = 15;
const boxY = 15;
const boxWidth = 160;
const boxHeight = 35;
const cornerRadius = 4; // Slight roundness matching UI panels

// 2. Draw the Box Background (Semi-transparent dark grey)
ctx.fillStyle = "rgba(85, 85, 85, 0.4)"; // 40% opaque dark outline color
ctx.beginPath();
ctx.roundRect(boxX, boxY, boxWidth, boxHeight, cornerRadius);
ctx.fill();

// 3. Draw the Outer Border Outlines
ctx.strokeStyle = colorOutline; // Reuses your #555555 constant
ctx.lineWidth = 2.5;
ctx.stroke();

// 4. Draw the Typography Text Layer
ctx.fillStyle = "#ffffff"; // Pure white text
ctx.font = "bold 14px Ubuntu, Arial, sans-serif"; // Diep.io utilizes 'Ubuntu' font
ctx.textAlign = "center";
ctx.textBaseline = "middle";

// Position text exactly in the center of our bounding box layout
const textX = boxX + (boxWidth / 2);
const textY = boxY + (boxHeight / 2);
ctx.fillText(nameText, textX, textY);

ctx.restore();
}

// Vector Fallen Booster Builder Module
function drawFallenBoosterElement(x, y, angle, bodyColor, scale = 1.6) { // 🔥 Added scale parameter (Defaults to 1.6)
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale); // 🔥 This single line scales up all barrels and the body together!
    
    // Set color to the barrel picker input value
    ctx.fillStyle = colorBarrel.value;

    // 1. Draw the 4 Back/Flank Propulsion Barrels first (so they render behind the body)
    // Extreme Back-Left Barrel (-134 degrees)
    ctx.save(); ctx.rotate(-134 * Math.PI / 180); ctx.fillRect(0, -11, 40, 22); ctx.strokeRect(0, -11, 40, 22); ctx.restore();
    
    // Extreme Back-Right Barrel (136 degrees)
    ctx.save(); ctx.rotate(136 * Math.PI / 180); ctx.fillRect(0, -11, 40, 22); ctx.strokeRect(0, -11, 40, 22); ctx.restore();
    
    // Outer Back-Left Flank Barrel (-146 degrees)
    ctx.save(); ctx.rotate(-146 * Math.PI / 180); ctx.fillRect(0, -11, 42, 22); ctx.strokeRect(0, -11, 42, 22); ctx.restore();
    
    // Outer Back-Right Flank Barrel (151 degrees)
    ctx.save(); ctx.rotate(151 * Math.PI / 180); ctx.fillRect(0, -11, 42, 22); ctx.strokeRect(0, -11, 42, 22); ctx.restore();

    // 2. Draw Main Front Barrel (Facing forward at 0 degrees)
    ctx.fillRect(0, -13, 44, 26);
    ctx.strokeRect(0, -13, 44, 26);

    // 3. Draw the Central Tank Body Circle
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, 2 * Math.PI);
    ctx.fill(); 
    ctx.stroke();
    
    ctx.restore();
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
function drawHexagonElement(x, y, angle, color, size = 35) { // 🔥 Added size parameter (defaults to 24)
ctx.save();
ctx.translate(x, y);
ctx.rotate(angle);
ctx.fillStyle = color;
ctx.beginPath();
for (let i = 0; i < 6; i++) {
let a = (i * 2 * Math.PI / 6) - Math.PI / 2;
let px = size * Math.cos(a); // 🔥 Uses the dynamic size value for horizontal stretch
let py = size * Math.sin(a); // 🔥 Uses the dynamic size value for vertical stretch
if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
}
ctx.closePath();
ctx.fill(); ctx.stroke();
ctx.restore();
}

// Vector Square Builder Module
function drawRegen(x, y, angle, color) {
ctx.save();
ctx.translate(x, y);
ctx.rotate(angle);
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(-50, -50, 20, 20);
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
