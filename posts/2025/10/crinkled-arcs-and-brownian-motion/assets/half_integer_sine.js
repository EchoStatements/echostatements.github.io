document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the canvas
    const canvas = document.getElementById('half-integer-canvas');

    // Get context for the canvas
    const ctx = canvas.getContext('2d');

    // Get references to the sliders
    const componentsSlider = document.getElementById('half-integer-components-slider');
    const componentsValue = document.getElementById('half-integer-components-value');
    const regenerateBtn = document.getElementById('regenerate-coefficients');

    const padding = 50;

    // Define dimensions for the canvas
    let plotWidth, plotHeight;

    // Store random coefficients
    let coefficients = [];

    // Function to generate random coefficients
    function generateCoefficients(count) {
        const newCoefficients = [];
        for (let i = 0; i < count; i++) {
            // Generate random values between -1 and 1
            newCoefficients.push(Math.random() * 2 - 1);
        }
        return newCoefficients;
    }

    // Initialize coefficients
    function initializeCoefficients() {
        // Generate enough coefficients for the maximum number of components (20)
        coefficients = generateCoefficients(20);
    }

    // Function to update dimensions for the canvas
    function updatePlotDimensions() {
        plotWidth = canvas.width - 2 * padding;
        plotHeight = canvas.height - 2 * padding;
    }

    // Initial update of dimensions
    updatePlotDimensions();
    initializeCoefficients();

    // Function to draw a title at the top of the canvas
    function drawTitle(canvas, ctx, title) {
        ctx.fillStyle = '#444';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(title, canvas.width / 2, 10);
    }

    // Function to draw axes on the canvas
    function drawAxes(canvas, ctx, plotWidth, plotHeight) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;

        // X-axis
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        // Y-axis
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();

        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';

        // X-axis labels
        for (let i = 0; i <= 10; i++) {
            const x = padding + (i / 10) * plotWidth;
            const label = (i / 10).toFixed(1);
            ctx.fillText(label, x, canvas.height - padding + 20);

            // Tick marks
            ctx.beginPath();
            ctx.moveTo(x, canvas.height - padding);
            ctx.lineTo(x, canvas.height - padding + 5);
            ctx.stroke();
        }

        // Y-axis labels (from -1.2 to 1.2)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const yValues = [-1.2, -1, -0.5, 0, 0.5, 1, 1.2];
        for (let val of yValues) {
            const y = toCanvasY(canvas, plotHeight, val);
            ctx.fillText(val.toFixed(1), padding - 10, y);

            // Tick marks
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding, y);
            ctx.stroke();
        }

        // Axis labels
        ctx.textAlign = 'center';
        ctx.fillText('t', canvas.width / 2, canvas.height - 10);
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('f(t)', 0, 0);
        ctx.restore();

        // Zero line
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        const y0 = toCanvasY(canvas, plotHeight, 0);
        ctx.beginPath();
        ctx.moveTo(padding, y0);
        ctx.lineTo(canvas.width - padding, y0);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Helper functions to convert coordinates
    function toCanvasX(canvas, plotWidth, x) {
        return padding + x * plotWidth;
    }

    function toCanvasY(canvas, plotHeight, y) {
        // Map from [-1.2, 1.2] to canvas coordinates
        return canvas.height - padding - ((y + 1.2) / 2.4) * plotHeight;
    }

    // Function to calculate the half-integer sine wave Fourier series
    function calculateHalfIntegerSineSeries(t, components) {
        let result = 0;

        // Using the formula from the text:
        // f(t) = √2 * ∑(n=1 to components) x_n * sin((n-1/2)πt)/((n-1/2)π)
        for (let n = 1; n <= components; n++) {
            const x_n = coefficients[n-1]; // Get the nth coefficient
            const term = (n - 0.5) * Math.PI;
            result += Math.sqrt(2) * x_n * Math.sin(term * t) / term;
        }

        return result;
    }

    // Function to draw the half-integer sine wave Fourier series
    function drawHalfIntegerSineSeries(canvas, ctx, plotWidth, plotHeight, components, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1;

        // Draw the Fourier series curve
        ctx.beginPath();

        // Use many points for a smooth curve
        const numPoints = 500;
        for (let i = 0; i <= numPoints; i++) {
            const t = i / numPoints;
            const y = calculateHalfIntegerSineSeries(t, components);

            if (i === 0) {
                ctx.moveTo(toCanvasX(canvas, plotWidth, t), toCanvasY(canvas, plotHeight, y));
            } else {
                ctx.lineTo(toCanvasX(canvas, plotWidth, t), toCanvasY(canvas, plotHeight, y));
            }
        }

        ctx.stroke();
    }

    // Function to draw individual basis functions
    function drawBasisFunctions(canvas, ctx, plotWidth, plotHeight, components) {
        // Draw each basis function with a different color and lower opacity
        const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#795548'];
        
        for (let n = 1; n <= Math.min(components, 5); n++) {
            const color = colors[(n-1) % colors.length];
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.4;
            
            ctx.beginPath();
            
            const numPoints = 500;
            for (let i = 0; i <= numPoints; i++) {
                const t = i / numPoints;
                // Calculate just this basis function
                const term = (n - 0.5) * Math.PI;
                const y = Math.sqrt(2) * Math.sin(term * t) / term;
                
                if (i === 0) {
                    ctx.moveTo(toCanvasX(canvas, plotWidth, t), toCanvasY(canvas, plotHeight, y));
                } else {
                    ctx.lineTo(toCanvasX(canvas, plotWidth, t), toCanvasY(canvas, plotHeight, y));
                }
            }
            
            ctx.stroke();
        }
        
        // Reset opacity
        ctx.globalAlpha = 1;
    }

    // Function to draw the legend
    function drawLegend(canvas, ctx, components) {
        const legendX = canvas.width - padding - 200;
        const legendY = padding + 20;
        const lineHeight = 22;

        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        
        // Calculate height based on number of items
        const legendHeight = 60 + Math.min(components, 5) * lineHeight;
        
        ctx.fillRect(legendX - 10, legendY - 10, 190, legendHeight);
        ctx.strokeRect(legendX - 10, legendY - 10, 190, legendHeight);

        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        // Series line
        ctx.globalAlpha = 1;
        ctx.strokeStyle = '#E91E63';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(legendX, legendY);
        ctx.lineTo(legendX + 25, legendY);
        ctx.stroke();

        // Text for series
        ctx.fillStyle = '#333';
        ctx.fillText('Half-Integer Sine Series', legendX + 35, legendY);
        
        // Coefficients used
        ctx.fillText('Coefficients used:', legendX, legendY + lineHeight * 1.5);
        
        // List the first few coefficients
        const colors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#795548'];
        for (let n = 1; n <= Math.min(components, 5); n++) {
            const color = colors[(n-1) % colors.length];
            
            // Draw line for basis function
            ctx.globalAlpha = 0.4;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(legendX, legendY + lineHeight * (1.5 + n));
            ctx.lineTo(legendX + 25, legendY + lineHeight * (1.5 + n));
            ctx.stroke();
            
            // Show coefficient value
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#333';
            ctx.fillText(`x${n} = ${coefficients[n-1].toFixed(2)}`, legendX + 35, legendY + lineHeight * (1.5 + n));
        }
        
        // If there are more coefficients than we're showing
        if (components > 5) {
            ctx.fillText(`... (${components-5} more)`, legendX + 35, legendY + lineHeight * (1.5 + 6));
        }
    }

    // Function to draw the canvas
    function drawCanvas() {
        const components = parseInt(componentsSlider.value);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTitle(canvas, ctx, 'Half-Integer Sine Wave Fourier Series');
        drawAxes(canvas, ctx, plotWidth, plotHeight);

        // Draw basis functions if checkbox is checked
        if (document.getElementById('show-basis-functions').checked) {
            drawBasisFunctions(canvas, ctx, plotWidth, plotHeight, components);
        }

        // Draw the Fourier series
        drawHalfIntegerSineSeries(canvas, ctx, plotWidth, plotHeight, components, '#E91E63');

        // Draw the legend
        drawLegend(canvas, ctx, components);
    }

    // Event listeners for sliders
    componentsSlider.addEventListener('input', function(e) {
        const components = parseInt(e.target.value);
        componentsValue.textContent = components;
        drawCanvas();
    });

    // Event listener for regenerate button
    regenerateBtn.addEventListener('click', function() {
        initializeCoefficients();
        drawCanvas();
    });

    // Event listener for show basis functions checkbox
    document.getElementById('show-basis-functions').addEventListener('change', drawCanvas);

    // Handle window resize
    window.addEventListener('resize', function() {
        updatePlotDimensions();
        drawCanvas();
    });

    // Initial draw
    drawCanvas();
});