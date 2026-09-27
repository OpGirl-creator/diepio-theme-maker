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

// Render Loop Function (Draws the precise Diep.io elements)
function renderGamePreview() {
    const bg = colorBackground.value;
    const grid = colorGrid.value;
    const border = colorOutline.value;
    const lineWidth = 3.5; // True Diep.io thick outer border layout style

    // 1. Draw Canvas background color
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Math Gridlines Background mapping
    ctx.strokeStyle = grid;
    ctx.lineWidth = 1.0;
    const gridSpacing = 30;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Configure global styling configurations for gaming elements outline stroke limits
    ctx.strokeStyle = border;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";

    // 3. Draw Square Entity (Rotated)
    ctx.save();
    ctx.translate(120, 100);
    ctx.rotate(0.3); // Slight aesthetic angle matching screenshot
    ctx.fillStyle = colorSquare.value;
    ctx.beginPath();
    ctx.rect(-15, -15, 30, 30);
    ctx.fill(); ctx.stroke();
    ctx.restore();

    // 4. Draw Triangle Entity
    ctx.save();
    ctx.translate(180, 260);
    ctx.rotate(-0.5);
    ctx.fillStyle = colorTriangle.value;
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(16, 14);
    ctx.lineTo(-16, 14);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();

    // 5. Draw Pentagon Entity
    ctx.save();
    ctx.translate(450, 120);
    ctx.rotate(0.1);
    ctx.fillStyle = colorPentagon.value;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        let angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
        let x = 20 * Math.cos(angle);
        let y = 20 * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.restore();

    // 6. Draw Player Tank (Barrel beneath, Circle Body on top)
    const tankX = canvas.width / 2;
    const tankY = canvas.height / 2 + 20;

    // Tank Barrel drawing
    ctx.save();
    ctx.translate(tankX, tankY);
    ctx.rotate(-Math.PI / 2); // Facing upwards slightly angled or standard
    ctx.fillStyle = colorBarrel.value;
    ctx.beginPath();
    ctx.rect(0, -14, 45, 28); // Barrel configuration rectangles
    ctx.fill(); ctx.stroke();
    
    // Tank Round Body drawing
    ctx.fillStyle = colorBody.value;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, 24 * Math.PI);
    ctx.fill(); ctx.stroke();
    ctx.restore();

    // 7. Draw UI Score Card Header top left
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.beginPath(); ctx.roundRect(15, 15, 110, 30, 4); ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px Arial";
    ctx.fillText("Score: 42,910", 25, 34);

    // 8. Draw Leaderboard Card Header top right
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.beginPath(); ctx.roundRect(440, 15, 140, 75, 4); ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 12px Arial";
    ctx.fillText("Leaderboard", 475, 32);
    
    // CustomTheme label text entry row
    ctx.fillStyle = colorBody.value;
    ctx.font = "11px Arial";
    ctx.fillText("1. CustomTheme", 450, 52);
    ctx.fillText("42k", 550, 52);

    // Opponent label text entry row
    ctx.fillStyle = "#f14e54";
    ctx.fillText("2. Opponent", 450, 72);
    ctx.fillText("18k", 550, 72);
}

// Gamemode Button Switching Logic
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const mode = button.getAttribute('data-mode');
        if (mode === 'sandbox') {
            colorBody.value = "#9842eb"; // Purple
        } else if (mode === 'ffa' || mode === 'maze') {
            colorBody.value = "#00b2e1"; // Light Blue
        } else if (mode === 'teams2' || mode === 'ctf') {
            colorBody.value = colorBlue.value; // Blue team variable sync
        } else if (mode === 'teams4') {
            colorBody.value = colorRed.value; // Red team variable sync
        }
        renderGamePreview();
    });
});

// Live-updating trigger loop engine configuration hooks
const allPickers = [colorBarrel, colorBody, colorOutline, colorBackground, colorGrid, colorSquare, colorTriangle, colorPentagon, colorBlue, colorRed];
allPickers.forEach(picker => {
    picker.addEventListener('input', renderGamePreview);
});

// Initial load build draw trigger
renderGamePreview();

// Code Output Generation Logic
function generateThemeScript() {
    const activeModeBtn = document.querySelector('.mode-btn.active');
    const currentMode = activeModeBtn ? activeModeBtn.textContent.trim() : "Standard";
    
    return `// Diep.io Custom Console Theme Script\n` +
           `net_set_color(3, "${colorBackground.value}"); // Canvas Background\n` +
           `net_set_color(4, "${colorGrid.value}"); // Grid Lines\n` +
           `net_set_color(1, "${colorBody.value}"); // Tank Body\n` +
           `net_set_color(0, "${colorBarrel.value}"); // Tank Barrels\n` +
           `net_set_color(2, "${colorOutline.value}"); // Element Outlines`;
}

document.getElementById('viewCodeBtn').addEventListener('click', () => {
    document.getElementById('codeOutput').value = generateThemeScript();
});

document.getElementById('copyCodeBtn').addEventListener('click', () => {
    const output = document.getElementById('codeOutput');
    output.value = generateThemeScript();
    output.select();
    navigator.clipboard.writeText(output.value);
    alert('Diep.io script commands copied to your clipboard!');
});
