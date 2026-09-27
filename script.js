document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('gameCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Link pickers inputs smoothly from HTML configuration ids mapping
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
    const codeOutput = document.getElementById('codeOutput');

    const colorGreen = "#00e676";
    const colorPurple = "#bf5fff";
    let currentActiveMode = 'sandbox'; 

    function formatToGameHex(hexValue) {
        if (!hexValue) return '0x000000';
        return '0x' + hexValue.replace('#', '').toLowerCase();
    }

    function renderGamePreview() {
        if (!canvas || !ctx) return;

        // Force string conversion safe checks to avoid blank screens errors
        const bg = String(colorBackground.value);
        const grid = String(colorGrid.value);
        const border = String(colorOutline.value);
        const lineWidth = 3.5; 

        // 1. Draw Canvas background color base
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Map Quadrant colors if 4 Teams mode layout properties are checked
        if (currentActiveMode === 'teams4') {
            const halfW = canvas.width / 2;
            const halfH = canvas.height / 2;
            ctx.fillStyle = String(colorBlue.value) + "22"; ctx.fillRect(0, 0, halfW, halfH);
            ctx.fillStyle = colorPurple + "22"; ctx.fillRect(halfW, 0, halfW, halfH);
            ctx.fillStyle = colorGreen + "22"; ctx.fillRect(0, halfH, halfW, halfH);
            ctx.fillStyle = String(colorRed.value) + "22"; ctx.fillRect(halfW, halfH, halfW, halfH);
        }

        // 3. Draw Gridlines Background structures paths loops
        ctx.strokeStyle = grid;
        ctx.lineWidth = 1.0;
        const gridSpacing = 30;
        for (let x = 0; x < canvas.width; x += gridSpacing) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSpacing) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // 4. Split cross grid intersection coordinates if 4 Teams mode
        if (currentActiveMode === 'teams4') {
            ctx.strokeStyle = border; ctx.lineWidth = 2; ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2); ctx.stroke();
        }

        // 5. Build Arena walls grids structures properties if Maze mode is selected
        if (currentActiveMode === 'maze') {
            ctx.fillStyle = "#bbbbbb"; ctx.strokeStyle = border; ctx.lineWidth = lineWidth;
            ctx.fillRect(0, 0, 200, 80); ctx.strokeRect(0, 0, 200, 80);
            ctx.fillRect(0, 80, 50, 240); ctx.strokeRect(0, 80, 50, 240);
            ctx.fillRect(0, 320, 400, 80); ctx.strokeRect(0, 320, 400, 80);
            ctx.fillRect(260, 0, 140, 110); ctx.strokeRect(260, 0, 140, 110);
        }

        // Apply fallback guidelines limits variables definitions setup configuration
        ctx.strokeStyle = border;
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";

        // 6. Draw Polygons
        drawShape(120, 140, 0.3, String(colorSquare.value), 'square');
        drawShape(340, 130, -0.2, String(colorTriangle.value), 'triangle');
        drawShape(410, 280, 0.5, String(colorSquare.value), 'square');
        drawShape(520, 330, 0.1, String(colorTriangle.value), 'triangle');

        if (currentActiveMode !== 'maze') {
            drawShape(480, 90, 0.1, String(colorPentagon.value), 'pentagon');
        }

        // 7. Render Tank profiles variables bounds indicators arrays setup
        if (currentActiveMode === 'teams4') {
            drawTank(130, 80, 0.6, String(colorBlue.value), 4);      
            drawTank(450, 75, 0.0, colorPurple, 8);         
            drawTank(160, 290, -0.4, colorGreen, 1);        
            drawTank(440, 300, 0.8, String(colorRed.value), 4);      
        } else {
            const tankX = currentActiveMode === 'maze' ? 240 : canvas.width / 2;
            const tankY = currentActiveMode === 'maze' ? 200 : canvas.height / 2 + 20;
            drawTank(tankX, tankY, -Math.PI/2, String(colorBody.value), 1);
        }

        // 8. Base card header overlays setups commands limits
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(15, 15, 110, 30);
        ctx.fillStyle = "#ffffff"; ctx.font = "bold 12px Arial";
        ctx.fillText(currentActiveMode === 'teams4' ? "4 Team TDM" : "Score: 42,910", 25, 34);

        // 9. Update the visible text code string terminal instructions properties
        if (codeOutput) {
            codeOutput.value = generateThemeScript();
        }
    }

    function drawShape(x, y, angle, color, type) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.fillStyle = color; ctx.beginPath();
        if (type === 'square') { ctx.rect(-12, -12, 24, 24); }
        else if (type === 'triangle') { ctx.moveTo(0, -14); ctx.lineTo(13, 11); ctx.lineTo(-13, 11); ctx.closePath(); }
        else if (type === 'pentagon') {
            for (let i = 0; i < 5; i++) {
                let a = (i * 2 * Math.PI / 5) - Math.PI / 2;
                let px = 18 * Math.cos(a); let py = 18 * Math.sin(a);
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
        }
        ctx.fill(); ctx.stroke(); ctx.restore();
    }

    function drawTank(x, y, angle, bodyColor, barrelCount) {
        ctx.save(); ctx.translate(x, y); ctx.rotate(angle); ctx.fillStyle = String(colorBarrel.value); ctx.lineWidth = 3.5; ctx.strokeStyle = String(colorOutline.value);
        ctx.beginPath();
        if (barrelCount === 1) { ctx.rect(0, -11, 40, 22); ctx.fill(); ctx.stroke(); }
        else if (barrelCount === 4) { ctx.rect(0, -16, 38, 14); ctx.rect(0, 2, 38, 14); ctx.fill(); ctx.stroke(); }
        else if (barrelCount === 8) {
            for (let i = 0; i < 8; i++) { ctx.save(); ctx.rotate(i * Math.PI / 4); ctx.rect(0, -9, 36, 18); ctx.fill(); ctx.stroke(); ctx.restore(); }
        }
        ctx.fillStyle = bodyColor; ctx.beginPath(); ctx.arc(0, 0, 22, 0, 2 * Math.PI); ctx.fill(); ctx.stroke(); ctx.restore();
    }

    // Sidebar gamemode button selection handler parameters mapping
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentActiveMode = button.getAttribute('data-mode');
            if (currentActiveMode === 'sandbox') colorBody.value = "#9842eb";
            else if (currentActiveMode === 'ffa' || currentActiveMode === 'maze') colorBody.value = "#00b2e1";
            else if (currentActiveMode === 'teams2' || currentActiveMode === 'ctf') colorBody.value = colorBlue.value;
            else if (currentActiveMode === 'teams4') colorBody.value = colorRed.value;

            renderGamePreview();
        });
    });

    // Attach listeners on input events across all theme parameters values matrix controls
    const allPickers = [colorBarrel, colorBody, colorOutline, colorBackground, colorGrid, colorSquare, colorTriangle, colorPentagon, colorBlue, colorRed];
    allPickers.forEach(picker => {
        if (picker) picker.addEventListener('input', renderGamePreview);
    });

    function generateThemeScript() {
        const strokeSolid = formatToGameHex(colorOutline.value);
        const canvasBg = formatToGameHex(colorBackground.value);
        const gridColor = formatToGameHex(colorGrid.value);
        const barrelColor = formatToGameHex(colorBarrel.value);
        const blueTeamColor = formatToGameHex(colorBlue.value);
        const redTeamColor = formatToGameHex(colorRed.value);
        const squareColor = formatToGameHex(colorSquare.value);
        const triangleColor = formatToGameHex(colorTriangle.value);
        const pentagonColor = formatToGameHex(colorPentagon.value);

