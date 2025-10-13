document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the canvas
    const canvas = document.getElementById('canvas');

    // Get context for the canvas
    const ctx = canvas.getContext('2d');

    // Get references to the sliders
    const cSlider = document.getElementById('c-slider');
    const componentsSlider = document.getElementById('components-slider');
    const cValue = document.getElementById('c-value');
    const componentsValue = document.getElementById('components-value');

    // Use the shared utility module
    const utils = window.FourierUtils;

    // Define dimensions for the canvas
    let plotWidth, plotHeight;

    // Function to update dimensions for the canvas
    function updatePlotDimensions() {
        const dimensions = utils.updatePlotDimensions(canvas);
        plotWidth = dimensions.plotWidth;
        plotHeight = dimensions.plotHeight;
    }

    // Initial update of dimensions
    updatePlotDimensions();

    // Function to draw the canvas
    function drawCanvas() {
        const c = parseFloat(cSlider.value);
        const components = parseInt(componentsSlider.value);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        utils.drawTitle(canvas, ctx, 'Fourier Series Approximations of Indicator Function');
        utils.drawAxes(canvas, ctx, plotWidth, plotHeight);

        // Draw the indicator function
        utils.drawIndicatorFunction(canvas, ctx, plotWidth, plotHeight, c, '#2196F3');

        // Draw the Fourier approximation (cosine basis)
        utils.drawCurve(canvas, ctx, plotWidth, plotHeight, 
            (x) => utils.calculateFourierApproximation(x, c, components), 
            '#E91E63');

        // Draw the half-integer cosine wave approximation
        utils.drawCurve(canvas, ctx, plotWidth, plotHeight, 
            (x) => utils.calculateHalfIntegerCosineApproximation(x, c, components), 
            '#5679B4FF');

        // Draw the legend
        utils.drawLegend(canvas, ctx, [
            { color: '#2196F3', label: 'Indicator Function', alpha: 0.6, dashed: true },
            { color: '#E91E63', label: 'Cosine Basis Approximation' },
            { color: '#5679B4FF', label: 'Half-Integer Cosine Approximation' }
        ]);
    }

    // Event listeners for sliders
    cSlider.addEventListener('input', function(e) {
        const c = parseFloat(e.target.value);
        cValue.textContent = c.toFixed(2);
        drawCanvas();
    });

    componentsSlider.addEventListener('input', function(e) {
        const components = parseInt(e.target.value);
        componentsValue.textContent = components;
        drawCanvas();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        updatePlotDimensions();
        drawCanvas();
    });

    // Initial draw
    drawCanvas();
});
