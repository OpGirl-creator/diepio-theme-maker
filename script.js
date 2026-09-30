// Get canvas context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// State tracking variables
let currentMode = 'FFA'; // Default mode

// Get UI Elements
const btnFFA = document.getElementById('btnFFA');
const btnTDM = document.getElementById('btnTDM');

const colorMainBody = document.getElementById('colorMainBody');
const colorBarrels = document.getElementById('colorBarrels');
const colorFFAEnemy = document.getElementById('colorFFAEnemy');
const colorFallenBoss = document.getElementById('colorFallenBoss');

// Main Render Function to draw the Diep.io elements
function drawPreview() {
    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Setup generic center positioning
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 1. Draw the Barrel (Shared between states)
    ctx.fillStyle = colorBarrels.value;
    ctx.strokeStyle = '#555555';
    ctx.lineWidth = 4;
    ctx.fillRect(centerX - 20, centerY - 60, 40, 70);
    ctx.strokeRect(centerX - 20, centerY - 60, 40, 70);

    // 2. Draw the Main Tank Body (Changes colors dynamically based on picked options)
    ctx.beginPath();
    ctx.arc(centerX, centerY, 45, 0, 2 * Math.PI);
    
    if (currentMode === 'FFA') {
        ctx.fillStyle = colorMainBody.value; // Uses the custom main body choice
    } else if (currentMode === 'TDM') {
        // In TDM, typically the body defaults to the team color (e.g. blue team)
        // Here we keep using your picker color asset for direct user control
        ctx.fillStyle = colorMainBody.value; 
    }
    
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // 3. Draw a secondary entity next to it depending on the gamemode
    if (currentMode === 'FFA') {
        // Draw an Enemy Tank nearby using the FFA Enemy Color Picker
        ctx.beginPath();
        ctx.arc(centerX + 140, centerY + 40, 35, 0, 2 * Math.PI);
        ctx.fillStyle = colorFFAEnemy.value;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    } else if (currentMode === 'TDM') {
        // Draw a gray/neutral neutral structure or Boss using Fallen Boss color picker
        ctx.beginPath();
        ctx.arc(centerX - 140, centerY + 60, 40, 0, 2 * Math.PI);
        ctx.fillStyle = colorFallenBoss.value;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}

// Gamemode Button Click Handlers
btnFFA.addEventListener('click', () => {
    currentMode = 'FFA';
    btnFFA.classList.add('active');
    btnTDM.classList.remove('active');
    drawPreview(); // Refresh canvas view immediately
});

btnTDM.addEventListener('click', () => {
    currentMode = 'TDM';
    btnTDM.classList.add('active');
    btnFFA.classList.remove('active');
    drawPreview(); // Refresh canvas view immediately
});

// Event Listeners for Color Pickers (Trigger re-draw instantly when tweaked)
const tankPickers = [colorMainBody, colorBarrels, colorFFAEnemy, colorFallenBoss];
tankPickers.forEach(picker => {
    picker.addEventListener('input', drawPreview);
});

// Initial Run to render the template right when the page finishes loading
drawPreview();
