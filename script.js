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

// Generate the specific theme script output text block
function generateThemeScript() {
    const themeSettings = {
        author: "Custom Theme Creator",
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

    // Formatted structure matching expected console custom setup array formats
    return `// Copy this text into your browser console or script manager:\n\nconst myCustomTheme = ${JSON.stringify(themeSettings, null, 2)};\n\nconsole.log("Diep.io Theme Applied Successfully!");`;
}

// Attach Event Listeners onto input forms
const inputs = [colorBarrel, colorBody, colorBackground, colorGrid, colorSquare, colorTriangle, colorPentagon, colorHealth, colorMinimap, colorScoreboard];
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
