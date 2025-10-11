// Shared utility functions for Fourier series visualizations
const FourierUtils = {
    // Constants
    padding: 50,

    // Function to update dimensions for the canvas
    updatePlotDimensions: function(canvas) {
        return {
            plotWidth: canvas.width - 2 * this.padding,
            plotHeight: canvas.height - 2 * this.padding
        };
    },

    // Function to draw a title at the top of the canvas
    drawTitle: function(canvas, ctx, title) {
        ctx.fillStyle = '#444';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(title, canvas.width / 2, 10);
    },

    // Function to draw axes on the canvas
    drawAxes: function(canvas, ctx, plotWidth, plotHeight) {
        const padding = this.padding;

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

        // Y-axis labels (from -0.2 to 1.2)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const yValues = [-0.2, 0, 0.5, 1, 1.2];
        for (let val of yValues) {
            const y = this.toCanvasY(canvas, plotHeight, val);
            ctx.fillText(val.toFixed(1), padding - 10, y);

            // Tick marks
            ctx.beginPath();
            ctx.moveTo(padding - 5, y);
            ctx.lineTo(padding, y);
            ctx.stroke();
        }

        // Axis labels
        ctx.textAlign = 'center';
        ctx.fillText('x', canvas.width / 2, canvas.height - 10);
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('f(x)', 0, 0);
        ctx.restore();

        // Zero line
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        const y0 = this.toCanvasY(canvas, plotHeight, 0);
        ctx.beginPath();
        ctx.moveTo(padding, y0);
        ctx.lineTo(canvas.width - padding, y0);
        ctx.stroke();
        ctx.setLineDash([]);
    },

    // Helper functions to convert coordinates
    toCanvasX: function(canvas, plotWidth, x) {
        return this.padding + x * plotWidth;
    },

    toCanvasY: function(canvas, plotHeight, y) {
        // Map from [-0.2, 1.2] to canvas coordinates
        return canvas.height - this.padding - ((y + 0.2) / 1.4) * plotHeight;
    },

    // Function to draw the indicator function
    drawIndicatorFunction: function(canvas, ctx, plotWidth, plotHeight, c, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;

        // Set dashed line style for indicator functions
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        ctx.moveTo(this.toCanvasX(canvas, plotWidth, 0), this.toCanvasY(canvas, plotHeight, 1));
        ctx.lineTo(this.toCanvasX(canvas, plotWidth, c), this.toCanvasY(canvas, plotHeight, 1));
        ctx.lineTo(this.toCanvasX(canvas, plotWidth, c), this.toCanvasY(canvas, plotHeight, 0));
        ctx.lineTo(this.toCanvasX(canvas, plotWidth, 1), this.toCanvasY(canvas, plotHeight, 0));
        ctx.stroke();

        // Reset line dash
        ctx.setLineDash([]);

        // Draw discontinuity
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(this.toCanvasX(canvas, plotWidth, c), this.toCanvasY(canvas, plotHeight, 1), 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.toCanvasX(canvas, plotWidth, c), this.toCanvasY(canvas, plotHeight, 0), 4, 0, 2 * Math.PI);
        ctx.fill();
    },

    // Generic function to draw a curve based on a calculation function
    drawCurve: function(canvas, ctx, plotWidth, plotHeight, calcFunction, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 1;

        // Draw the curve
        ctx.beginPath();

        // Use many points for a smooth curve
        const numPoints = 500;
        for (let i = 0; i <= numPoints; i++) {
            const x = i / numPoints;
            const y = calcFunction(x);

            if (i === 0) {
                ctx.moveTo(this.toCanvasX(canvas, plotWidth, x), this.toCanvasY(canvas, plotHeight, y));
            } else {
                ctx.lineTo(this.toCanvasX(canvas, plotWidth, x), this.toCanvasY(canvas, plotHeight, y));
            }
        }

        ctx.stroke();
    },

    // Function to draw a legend with variable items
    drawLegend: function(canvas, ctx, items) {
        const padding = this.padding;
        const legendX = canvas.width - padding - 200;
        const legendY = padding + 20;
        const lineHeight = 22;

        // Calculate height based on number of items
        const legendHeight = 20 + items.length * lineHeight;

        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.fillRect(legendX - 10, legendY - 10, 190, legendHeight);
        ctx.strokeRect(legendX - 10, legendY - 10, 190, legendHeight);

        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        // Draw each legend item
        items.forEach((item, index) => {
            const y = legendY + index * lineHeight;

            // Set style based on item type
            ctx.globalAlpha = item.alpha || 1;
            ctx.strokeStyle = item.color;
            ctx.lineWidth = 3;

            if (item.dashed) {
                ctx.setLineDash([5, 5]);
            } else {
                ctx.setLineDash([]);
            }

            // Draw line
            ctx.beginPath();
            ctx.moveTo(legendX, y);
            ctx.lineTo(legendX + 25, y);
            ctx.stroke();

            // Reset dash
            ctx.setLineDash([]);

            // Draw text
            ctx.fillStyle = '#333';
            ctx.globalAlpha = 1;
            ctx.fillText(item.label, legendX + 35, y);
        });
    },

    // Function to calculate the Fourier series approximation with cosine basis
    calculateFourierApproximation: function(x, c, components) {
    let result = c; // a0/2 = c
    for (let n = 1; n < components; n++) {
        result += (2 / (n * Math.PI)) *
                  Math.sin(n * Math.PI * c) *
                  Math.cos(n * Math.PI * x);
    }
    return result;
    },

    // Function to calculate the half-integer cosine wave approximation
    calculateHalfIntegerCosineApproximation: function(x, c, components) {
        let result = 0;

        // Using the formula: sqrt(2) cos((k-0.5) pi x) with coefficients sqrt(2) * sin((k-0.5) pi c) / ((k-0.5)*pi)
        for (let k = 1; k <= components; k++) {
            const term = (k - 0.5) * Math.PI;
            result += (Math.sqrt(2) / term) * Math.sin(term * c) * Math.sqrt(2) * Math.cos(term * x);
        }

        return result;
    }
};

// Make the utility functions available globally
window.FourierUtils = FourierUtils;
