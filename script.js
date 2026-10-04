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
    ctx.fillStyle = "#ffffff"; 
    ctx.font = "bold 18px Ubuntu, Arial, sans-serif";
    ctx.textAlign = "center";  
    ctx.textBaseline = "bottom";

    ctx.strokeStyle = "#555555"; 
    ctx.lineWidth = 3.5;       
    ctx.lineJoin = "round";    

    // 1. Scoreboard Text
    ctx.strokeText("Scoreboard", 770, 38);
    ctx.fillText("Scoreboard", 770, 38);

    // 2. OP GIRL Text
    ctx.strokeText("OP GIRL", 425, 345);
    ctx.fillText("OP GIRL", 425, 345);

    // 3. Upgrades Text
    ctx.strokeText("Upgrades", 70, 25);
    ctx.fillText("Upgrades", 70, 25);

    // Summoner
    ctx.strokeText("Summoner", 250, 60);
    ctx.fillText("Summoner", 250, 60);

    // Fallen Booster
    ctx.strokeText("Fallen Booster", 600, 60);
    ctx.fillText("Fallen Booster", 600, 60);

    // FFA enemy
    ctx.strokeText("Enemy", 200, 170);
    ctx.fillText("Enemy", 200, 170);

    ctx.strokeText("Enemy", 650, 170);
    ctx.fillText("Enemy", 650, 170);
    ctx.restore();

    // Bottom right map ----------------------
    drawMovementElement(720, 270, 120, 120, "#76fc87");
    drawArrowElement(780, 330, -0.4, "#8c8c8c", 4);

    // Upgrades ----------------------------------------------
    drawHealthElement(5, 30, 65, 65, "#76fc87");       
    drawMaxElement(75, 30, 65, 65, "#76fc87");        
    drawBodydamageElement(5, 100, 65, 65, "#76fc87");  
    drawBulletspeedElement(75, 100, 65, 65, "#76fc87"); 

    // 3. Draw standard entities in center arena area ----------------------------------------------------
    drawSquareElement(300, 280, 0.4, "#ffe869");
    drawFallenBossElement(400, 280, -0.2, colorFallen.value);
    drawFallenBossElement(680, 280, -0.2, colorFallen.value);
    drawHexagonElement(200, 280, 0.2, colorFallen.value);
    drawTriangleElement(600, 280, -0.4, colorFallen.value, 20);
    drawTriangleElement(500, 280, -0.4, colorFallen.value, 15);
        
    drawFallenBoosterElement(600, 100, 3.1, colorFallen.value);
    drawSummonerElement(250, 100, 3.1, colorFallen.value, 1);

    // Draw Upgrade Stat Bars (Perfectly aligned with an even 5px gap) ----------------------------------------------------
    drawMovementElement(5, 375, 150, 20, "#76fc87"); 
    drawReloadElement(5, 350, 150, 20, "#76fc87");   
    drawBulletdamageElement(5, 325, 150, 20, "#76fc87");
    drawPenetrationElement(5, 300, 150, 20, "#76fc87"); 
    drawBulletspeedElement(5, 275, 150, 20, "#76fc87"); 
    drawBodydamageElement(5, 250, 150, 20, "#76fc87");  
    drawMaxElement(5, 225, 150, 20, "#76fc87");         
    drawHealthElement(5, 200, 150, 20, "#76fc87");      

    // Leaderboard
    drawHealthElement(695, 45, 150, 20, "#76fc87");      
    drawMaxElement(695, 70, 150, 20, "#76fc87");         
    drawBodydamageElement(695, 95, 150, 20, "#76fc87");  
    drawBulletspeedElement(695, 120, 150, 20, "#76fc87"); 
    drawPenetrationElement(695, 145, 150, 20, "#76fc87"); 
      
    // Score bar/Level bar ----------------------------------------------------
    drawScoreElement(350, 350, 150, 20, "#76fc87");
    drawLevelElement(300, 375, 250, 20, "#76fc87");

    // Bullets --------------------
    drawBulletElement(500, 195, 10, colorMain.value);
    drawBulletElement(550, 200, 10, colorEnemy.value);
    drawBulletElement(600, 195, 10, colorEnemy.value);

    drawBulletElement(290, 205, 10, colorEnemy.value);
    drawBulletElement(305, 196, 10, colorEnemy.value);

    // 5. Draw Dynamic Game Mode Combat Tanks Layout Setup ----------------------------------------------------
    switch (currentActiveMode) {
        case 'ffa':
            drawTank(430, 200, 0, colorMain.value, 1);
            drawTank(200, 200, 0, colorEnemy.value, 2);
            drawTank(650, 200, 3.1, colorEnemy.value, 2);
            break;
        case 'teams2':
            drawTank(200, 200, -0.1, colorMain.value, 2);
            drawTank(620, 180, 3.0, colorEnemy.value, 2);
            break;
    }

    // =========================================================================
    // 🧱 🔥 FIXED: ARENA OUTER BOUNDARY BORDER (Placed at the exact bottom)
    // =========================================================================
    ctx.save();
    const borderThickness = 6.0; 
    ctx.strokeStyle = colorOutline; 
    ctx.lineWidth = borderThickness;            
    ctx.lineJoin = "miter";         
    
    // Shift the rendering coordinate points slightly inward so line stroke stays on screen
    const offset = borderThickness / 2;
    ctx.strokeRect(
        offset, 
        offset, 
        canvas.width - borderThickness, 
        canvas.height - borderThickness
    );
    ctx.restore();
}

// All standard object builder modules are preserved below exactly as you have them...
function drawBulletElement(x, y, radius, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, radius, 0, 2 * Math.PI); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
function drawArrowElement(x, y, angle, color, size = 20) { ctx.save(); ctx.globalCompositeOperation = "source-over"; ctx.translate(x, y); ctx.rotate(angle); ctx.fillStyle = color; ctx.beginPath(); for (let i = 0; i < 3; i++) { let a = (i * 2 * Math.PI / 3) - Math.PI / 2; let px = size * Math.cos(a); let py = size * Math.sin(a); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); } ctx.closePath(); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
function drawSummonerElement(x, y, angle, bodyColor, scale = 1.0) { ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.scale(scale, scale); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.fillStyle = colorBarrel.value; for (let i = 0; i < 4; i++) { ctx.save(); ctx.rotate((i * 90) * Math.PI / 180); ctx.beginPath(); ctx.rect(14, -14, 22, 28); ctx.fill(); ctx.stroke(); ctx.restore(); } ctx.fillStyle = bodyColor; ctx.beginPath(); ctx.rect(-28, -28, 56, 56); ctx.fill(); ctx.stroke(); ctx.restore(); }
function drawScoreElement(x, y, width, height, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.rect(x, y, width, height); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
// ... Rest of your helper draw functions (drawLevelElement, drawHealthElement, etc.) match your file exactly ...
function drawLevelElement(x, y, width, height, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.rect(x, y, width, height); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
function drawHealthElement(x, y, width, height, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.rect(x, y, width, height); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
function drawMaxElement(x, y, width, height, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.rect(x, y, width, height); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
function drawBodydamageElement(x, y, width, height, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.rect(x, y, width, height); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
function drawBulletspeedElement(x, y, width, height, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.rect(x, y, width, height); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
function drawPenetrationElement(x, y, width, height, color) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.rect(x, y, width, height); ctx.fill(); ctx.strokeStyle = colorOutline; ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.stroke(); ctx.restore(); }
