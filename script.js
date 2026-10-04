// Canvas Setup ----------------------------------------------------
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Element Hook References ----------------------------------------------------
const colorMain = document.getElementById('main');
const colorBarrel = document.getElementById('barrel');
const colorEnemy = document.getElementById('enemy');
const colorFallen = document.getElementById('fallen');

// Constants matching native Diep.io style designs ----------------------------------------------------
const colorBackground = "#cdcdcd";
const colorGridLines = "#c4c4c4";
const colorOutline = "#555555";

// Configures your square box dimensions layout
const boxX = 720;
const boxY = 270;
const boxSize = 120;

const indicatorX = boxX + (boxSize / 2);
const indicatorY = boxY + (boxSize / 2);
    

let currentActiveMode = 'ffa';

// Main Canvas Render Pipeline ----------------------------------------------------
function renderGamePreview() {
// 1. Draw Arena Background Floor
ctx.fillStyle = colorBackground;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 2. Draw standard Diep.io-style grid system ----------------------------------------------------
ctx.strokeStyle = colorGridLines; 
ctx.lineWidth = 1.0;
const gridSpacing = 24;
for (let x = 0; x < canvas.width; x += gridSpacing) {
ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
}
for (let y = 0; y < canvas.height; y += gridSpacing) {
ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
}

// Set configuration variables for vector outlines ----------------------------------------------------
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";

// texts ---------------------------------------------------
ctx.save();
ctx.fillStyle = "#ffffff"; // Pure white text
ctx.font = "bold 18px Ubuntu, Arial, sans-serif";
ctx.textAlign = "center";  // Centers text cleanly over the 150px bars
ctx.textBaseline = "bottom";

// 🔥 NEW: Configure the thick dark outline style layers
ctx.strokeStyle = "#555555"; // Reuses your classic dark grey outline color
ctx.lineWidth = 3.5;       // Matches the thickness of the tank outlines
ctx.lineJoin = "round";    // Prevents sharp spike glitches on letter corners

// Position the text horizontally centered above the upcoming boxes (695 + 75)
// 1. Scoreboard Text (Outline first, then Fill)
ctx.strokeText("Scoreboard", 770, 38);
ctx.fillText("Scoreboard", 770, 38);

// 2. OP GIRL Text (Outline first, then Fill)
ctx.strokeText("OP GIRL", 425, 345);
ctx.fillText("OP GIRL", 425, 345);

// 3. Upgrades Text (Outline first, then Fill)
ctx.strokeText("Upgrades", 70, 25);
ctx.fillText("Upgrades", 70, 25);

    // Summoner
ctx.strokeText("Summoner", 250, 60);
ctx.fillText("Summoner", 250, 60);

    //fallen booster
ctx.strokeText("Fallen Booster", 600, 60);
ctx.fillText("Fallen Booster", 600, 60);

     //ffa enemy
ctx.strokeText("Enemy", 200, 170);
ctx.fillText("Enemy", 200, 170);

ctx.strokeText("Enemy", 650, 170);
ctx.fillText("Enemy", 650, 170);

ctx.restore();
   
//bottom right map ----------------------
       // 1. Draw the green box background frame first
    drawMovementElement(720, 270, 120, 120, "#76fc87");
    drawArrowElement(780, 330, -0.4, "#8c8c8c", 4); // 🔥 Linked via capital "E" name check

//upgrades ----------------------------------------------
    drawHealthElement(5, 30, 65, 65, "#76fc87");       // Grid Slot 1 (Left Box)
    drawMaxElement(75, 30, 65, 65, "#76fc87");        // Grid Slot 2 (Right Box)
    drawBodydamageElement(5, 100, 65, 65, "#76fc87");  // Grid Slot 3 (Left Box)
    drawBulletspeedElement(75, 100, 65, 65, "#76fc87"); // Grid Slot 4 (Right Box)

// 3. Draw a crisp yellow polygon square in center arena area ----------------------------------------------------
   drawSquareElement(300, 280, 0.4, "#ffe869");
   drawFallenBossElement(400, 280, -0.2, colorFallen.value);
   drawFallenBossElement(680, 280, -0.2, colorFallen.value);
   drawHexagonElement(200, 280, 0.2, colorFallen.value);
   drawTriangleElement(600, 280, -0.4, colorFallen.value,   20);
   drawTriangleElement(500, 280, -0.4, colorFallen.value,   15);
    
   drawFallenBoosterElement(600, 100, 3.1, colorFallen.value);
    drawSummonerElement(250, 100, 3.1, colorFallen.value, 1);

    // Draw Upgrade Stat Bars (Perfectly aligned with an even 5px gap) ----------------------------------------------------
    drawMovementElement(5, 375, 150, 20, "#76fc87"); // Y: 375
    drawReloadElement(5, 350, 150, 20, "#76fc87");   // Y: 350 (-25)
    drawBulletdamageElement(5, 325, 150, 20, "#76fc87");// Y: 325 (-25)
    drawPenetrationElement(5, 300, 150, 20, "#76fc87"); // Y: 300 (-25)
    drawBulletspeedElement(5, 275, 150, 20, "#76fc87"); // Y: 275 (-25)
    drawBodydamageElement(5, 250, 150, 20, "#76fc87");  // Y: 250 (-25)
    drawMaxElement(5, 225, 150, 20, "#76fc87");         // Y: 225 (-25)
    drawHealthElement(5, 200, 150, 20, "#76fc87");      // Y: 200 (-25)

//leaderboard

    drawHealthElement(695, 45, 150, 20, "#76fc87");      // Row 1 (Top)
    drawMaxElement(695, 70, 150, 20, "#76fc87");         // Row 2 (+25px)
    drawBodydamageElement(695, 95, 150, 20, "#76fc87");  // Row 3 (+25px)
    drawBulletspeedElement(695, 120, 150, 20, "#76fc87"); // Row 4 (+25px)
    drawPenetrationElement(695, 145, 150, 20, "#76fc87"); // Row 5 (+25px)
  
    // Score bar/Level bar ----------------------------------------------------
    drawScoreElement(350, 350, 150, 20, "#76fc87");
    drawLevelElement(300, 375, 250, 20, "#76fc87");

      // 2. Draw a red enemy bullet flying towards the player (Radius: 10)--------------------
    drawBulletElement(500, 195, 10, colorMain.value);
    drawBulletElement(550, 200, 10, colorEnemy.value);
    drawBulletElement(600, 195, 10, colorEnemy.value);

    drawBulletElement(290, 205, 10, colorEnemy.value);
    drawBulletElement(305, 196, 10, colorEnemy.value);

// 5. Draw Dynamic Game Mode Combat Tanks Layout Setup ----------------------------------------------------
switch (currentActiveMode) {
case 'ffa':
// Standard FFA Duel 
drawTank(430, 200, 0, colorMain.value, 1);
drawTank(200, 200, 0, colorEnemy.value, 2);
drawTank(650, 200, 3.1, colorEnemy.value, 2);
break;

case 'teams2':
// Team Mode 
drawTank(200, 200, -0.1, colorMain.value, 2);
drawTank(620, 180, 3.0, colorEnemy.value, 2);
break;
}

// =========================================================================
// 🧱 MAP EDGE BORDER
// =========================================================================
ctx.save();
const borderThickness = 6.0; 
ctx.strokeStyle = colorOutline; 
ctx.lineWidth = borderThickness;            
ctx.lineJoin = "miter";         

const offset = borderThickness / 2;
ctx.strokeRect(offset, offset, canvas.width - borderThickness, canvas.height - borderThickness);
ctx.restore();
}

function drawBulletElement(x, y, radius, color) {
    ctx.save();
    
    // 1. Draw the inner circular background color fill
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI); // Creates a full perfect circle arc path
    ctx.fill();

    // 2. Apply your project's classic #555555 dark outline border
    ctx.strokeStyle = colorOutline; // Reuses your global constant
    ctx.lineWidth = 3.5;            // Reuses your theme's default outline thickness
    ctx.lineJoin = "round";
    ctx.stroke();

    ctx.restore();
}
    
// map arrow ----------------------------------------------------
// 🔥 FIXED: Changed "drawArrowelement" to "drawArrowElement" matching your loop call spelling
function drawArrowElement(x, y, angle, color, size = 20) {
    ctx.save();
    
    // FORCE LAYER UP: Tells the canvas engine to explicitly draw this shape in FRONT
    ctx.globalCompositeOperation = "source-over";
    
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        let a = (i * 2 * Math.PI / 3) - Math.PI / 2;
        let px = size * Math.cos(a);
        let py = size * Math.sin(a);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill(); 
    
    // Apply matching stroke outline borders
    ctx.strokeStyle = colorOutline; 
    ctx.lineWidth = 3.5;
    ctx.lineJoin = "round";
    ctx.stroke();
    
    ctx.restore();
}

// Vector Summoner Boss Builder Module
function drawSummonerElement(x, y, angle, bodyColor, scale = 1.0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    // Set configuration variables for vector outlines matching your project style
    ctx.strokeStyle = colorOutline;
    ctx.lineWidth = 3.5;
    ctx.lineJoin = "round";
    
    // Set barrel color to the barrel picker input value
    ctx.fillStyle = colorBarrel.value;

    // 1. Draw the 4 side-mounted spawner boxes (rotated 90 degrees around the center)
    for (let i = 0; i < 4; i++) {
        ctx.save();
        ctx.rotate((i * 90) * Math.PI / 180); // Rotate to North, East, South, West positions
        
        // Draw the spawner box sticking out from the main body line
        ctx.beginPath();
        ctx.rect(14, -14, 22, 28); // (x, y, width, height)
        ctx.fill(); ctx.stroke();
        
        ctx.restore();
    }

    // 2. Draw the main central square base body layer
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.rect(-28, -28, 56, 56); // A large square body matching the boss archetype
    ctx.fill(); ctx.stroke();

    ctx.restore();
}


function drawScoreElement(x, y, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.strokeStyle = colorOutline; 
    ctx.lineWidth = 3.5;            
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.restore();
}


function drawLevelElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
function drawHealthElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
// Vector Square Builder Module
function drawMaxElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
function drawBodydamageElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
function drawBulletspeedElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
function drawPenetrationElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
function drawBulletdamageElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
function drawReloadElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
// Vector Rectangle Builder Module
function drawMovementElement(x, y, width, height, color) {
ctx.save();
ctx.fillStyle = color;
ctx.beginPath();
ctx.rect(x, y, width, height);
ctx.fill();
ctx.strokeStyle = colorOutline;
ctx.lineWidth = 3.5;
ctx.lineJoin = "round";
ctx.stroke();
ctx.restore();
}
// Vector Fallen Booster Builder Module
function drawFallenBoosterElement(x, y, angle, bodyColor, scale = 1.3) {
ctx.save();
ctx.translate(x, y);
ctx.rotate(angle);
ctx.scale(scale, scale);
ctx.fillStyle = colorBarrel.value;
ctx.save(); ctx.rotate(-134 * Math.PI / 180); ctx.fillRect(0, -11, 40, 22); ctx.strokeRect(0, -11, 40, 22); ctx.restore();
ctx.save(); ctx.rotate(136 * Math.PI / 180); ctx.fillRect(0, -11, 40, 22); ctx.strokeRect(0, -11, 40, 22); ctx.restore();
ctx.save(); ctx.rotate(-146 * Math.PI / 180); ctx.fillRect(0, -11, 42, 22); ctx.strokeRect(0, -11, 42, 22); ctx.restore();
ctx.save(); ctx.rotate(151 * Math.PI / 180); ctx.fillRect(0, -11, 42, 22); ctx.strokeRect(0, -11, 42, 22); ctx.restore();
ctx.fillRect(0, -13, 44, 26);
ctx.strokeRect(0, -13, 44, 26);
ctx.fillStyle = bodyColor;
ctx.beginPath();
ctx.arc(0, 0, 24, 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();
ctx.restore();
}
function drawTriangleElement(x, y, angle, color, size = 20) {
ctx.save();
ctx.translate(x, y);
ctx.rotate(angle);
ctx.fillStyle = color;
ctx.beginPath();
for (let i = 0; i < 3; i++) {
let a = (i * 2 * Math.PI / 3) - Math.PI / 2;
let px = size * Math.cos(a);
let py = size * Math.sin(a);
if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
}
ctx.closePath();
ctx.fill(); ctx.stroke();
ctx.restore();
}
function drawHexagonElement(x, y, angle, color, size = 35) {
ctx.save();
ctx.translate(x, y);
ctx.rotate(angle);
ctx.fillStyle = color;
ctx.beginPath();
for (let i = 0; i < 6; i++) {
let a = (i * 2 * Math.PI / 6) - Math.PI / 2;
let px = size * Math.cos(a);
let py = size * Math.sin(a);
if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
}
ctx.closePath();
ctx.fill(); ctx.stroke();
ctx.restore();
}
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
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(button => {
button.addEventListener('click', () => {
modeButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');
currentActiveMode = button.getAttribute('data-mode');
renderGamePreview();
});
});
const allPickers = [colorMain, colorBarrel, colorEnemy, colorFallen];
allPickers.forEach(picker => picker.addEventListener('input', renderGamePreview));
renderGamePreview();
function generateThemeScript() {
const main = colorMain.value.replace('#', '');
const barrel = colorBarrel.value.replace('#', '');
const enemy = colorEnemy.value.replace('#', '');
const fallen = colorFallen.value.replace('#', '');
return // Diep.io Custom Console Theme Script\n +
net_set_color(1, "${main}"); // Player Tank Body\n +
net_set_color(0, "${barrel}"); // Tank Barrels\n +
net_set_color(12, "${enemy}"); // Target Enemy Color\n +
net_set_color(15, "${fallen}"); // Fallen Boss Color;
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
