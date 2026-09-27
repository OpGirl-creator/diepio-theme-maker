// Get UI target elements from the Preview window
const gamePreview = document.getElementById('gamePreview');
const previewBarrel = document.getElementById('previewBarrel');
const previewBody = document.getElementById('previewBody');
const previewSquare = document.getElementById('previewSquare');
const previewTriangle = document.getElementById('previewTriangle');
const previewPentagon = document.getElementById('previewPentagon');
const previewHealth = document.getElementById('previewHealth');
const previewMinimap = document.getElementById('previewMinimap');
const previewScoreboard = document.getElementById('previewScoreboard').querySelector('.score-bar');

// Get Input Element Pickers
const colorBarrel = document.getElementById('colorBarrel');
const colorBody = document.getElementById('colorBody');
const colorBackground = document.getElementById('colorBackground');
const colorGrid = document.getElementById('colorGrid');
const colorSquare = document.getElementById('colorSquare');
const colorTriangle = document.getElementById('colorTriangle');
const colorPentagon = document.getElementById('colorPentagon');
const colorHealth = document.getElementById('colorHealth');
const colorMinimap = document.getElementById('colorMinimap');
const colorScoreboard = document.getElementById('colorScoreboard');
const colorBlue = document.getElementById('colorBlue');
const colorRed = document.getElementById('colorRed');

// Setup update engine functionality
function updateThemeColors() {
    // Apply changes instantly onto visual preview properties
    previewBarrel.style.backgroundColor = colorBarrel.value;
    previewBody.style.backgroundColor = colorBody.value;
    gamePreview.style.backgroundColor = colorBackground.value;
    previewSquare.style.backgroundColor = colorSquare.value;
    previewTriangle.style.borderBottomColor = colorTriangle.value;
    previewPentagon.style.backgroundColor = colorPentagon.value;
    previewHealth.style.backgroundColor = colorHealth.value;
    previewMinimap.style.backgroundColor = colorMinimap.value;
    previewScoreboard.style.backgroundColor = colorScoreboard.value;

    // Dynamically regenerate css inline linear grids lines colors
    gamePreview.style.backgroundImage = `
        linear-gradient(to right, ${colorGrid.value} 1px, transparent 1px),
        linear-gradient(to bottom, ${colorGrid.value} 1px, transparent 1px)
    `;
}

// Gamemode Interaction Engine
const modeButtons = document.querySelectorAll('.mode-btn');
modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Swap active visual styling borders on the buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // 2. Modify player tank preview body depending on picked gamemode rules
        const modeText = button.textContent.trim();
        if (modeText === "FFA" || modeText === "Maze") {
            colorBody.value = "#00b2e1"; // Reset to standard solo blue color
            alert(`Switched to ${modeText} layout simulation! Colors are now set for standard free-for-all mechanics.`);
        } else if (modeText === "2 Teams") {
            colorBody.value = colorBlue.value; // Force sync with team variable settings
            alert("Switched to 2 Teams simulation mode!");
        } else if (modeText === "4 Teams") {
            colorBody.value = colorRed.value; // Force alternate team body representation
            alert("Switched to 4 Teams simulation mode!");
        } else if (modeText === "Sandbox") {
            colorBody.value = "#9842eb"; // Use sandbox purple theme indicator
        }
        
        // Execute recalculations engine
        updateThemeColors();
    });
});

// Generate the specific theme script output text block
function generateThemeScript() {
    const activeModeBtn = document.querySelector('.mode-btn.active');
    const currentMode = activeModeBtn ? activeModeBtn.textContent.trim() : "Standard";

    const themeSettings = {
        author: "Custom Theme Creator",
        selectedMode: currentMode,
        barrel: colorBarrel.value,
        tankBody: colorBody.value,
        bg: colorBackground.value,
        grid: colorGrid.value,
        shapes: {
            square: colorSquare.value,
            triangle: colorTriangle.value,
            pentagon: colorPentagon.value
        },
        ui: {
            health: colorHealth.value,
            minimap: colorMinimap.value,
            score: colorScoreboard.value
        }
    };

    return `// Copy this text into your browser console or script manager:\n\nconst myCustomTheme = ${JSON.stringify(themeSettings, null, 2)};\n\nconsole.log("Diep.io ${currentMode} Theme Applied Successfully!");`;
}

// Attach Event Listeners onto input forms
const inputs = [colorBarrel, colorBody, colorBackground, colorGrid, colorSquare, colorTriangle, colorPentagon, colorHealth, colorMinimap, colorScoreboard, colorBlue, colorRed];
inputs.forEach(input => {
    input.addEventListener('input', updateThemeColors);
});

// Trigger setup execution once elements load
updateThemeColors();

// Buttons interactions configurations
document.getElementById('viewCodeBtn').addEventListener('click', () => {
    const codeBox = document.getElementById('codeOutput');
    codeBox.value = generateThemeScript();
});

document.getElementById('copyCodeBtn').addEventListener('click', () => {
    const codeBox = document.getElementById('codeOutput');
    codeBox.value = generateThemeScript();
    
    codeBox.select();
    navigator.clipboard.writeText(codeBox.value);
    alert('Theme code copied directly to your clipboard!');
});
