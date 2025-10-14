document.addEventListener('DOMContentLoaded', function() {
    // Get references to all three canvases
    const canvas1 = document.getElementById('canvas1');
    const canvas2 = document.getElementById('canvas2');
    const canvas3 = document.getElementById('canvas3');

    // Get contexts for all three canvases
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    const ctx3 = canvas3.getContext('2d');

    const c1Slider = document.getElementById('c1-slider');
    const c2Slider = document.getElementById('c2-slider');
    const c3Slider = document.getElementById('c3-slider');
    const c4Slider = document.getElementById('c4-slider');
    const c1Value = document.getElementById('c1-value');
    const c2Value = document.getElementById('c2-value');
    const c3Value = document.getElementById('c3-value');
    const c4Value = document.getElementById('c4-value');
    const toggleIndicators = document.getElementById('toggle-indicators');
    const toggleDifferences = document.getElementById('toggle-differences');

    const padding = 50;

    // Define dimensions for each canvas
    let plotWidth1, plotHeight1;
    let plotWidth2, plotHeight2;
    let plotWidth3, plotHeight3;

    // Function to update dimensions for all canvases
    function updatePlotDimensions() {
        plotWidth1 = canvas1.width - 2 * padding;
        plotHeight1 = canvas1.height - 2 * padding;

        plotWidth2 = canvas2.width - 2 * padding;
        plotHeight2 = canvas2.height - 2 * padding;

        plotWidth3 = canvas3.width - 2 * padding;
        plotHeight3 = canvas3.height - 2 * padding;
    }

    // Initial update of dimensions
    updatePlotDimensions();

    // Function to draw a title at the top of the canvas
    function drawTitle(canvas, ctx, title) {
        ctx.fillStyle = '#444';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(title, canvas.width / 2, 10);
    }

    // Function to draw axes on a specific canvas
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

        // Y-axis labels (from -0.2 to 1.2)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const yValues = [-0.2, 0, 0.5, 1, 1.2];
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
        ctx.fillText('x', canvas.width / 2, canvas.height - 10);
        ctx.save();
        ctx.translate(15, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('ψ(x)', 0, 0);
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
        // Map from [-0.2, 1.2] to canvas coordinates
        return canvas.height - padding - ((y + 0.2) / 1.4) * plotHeight;
    }

    function drawIndicatorFunction(canvas, ctx, plotWidth, plotHeight, c, color, offset = 0) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;

        // Set dashed line style for indicator functions
        ctx.setLineDash([5, 5]);

        ctx.beginPath();
        ctx.moveTo(toCanvasX(canvas, plotWidth, 0), toCanvasY(canvas, plotHeight, 1 + offset));
        ctx.lineTo(toCanvasX(canvas, plotWidth, c), toCanvasY(canvas, plotHeight, 1 + offset));
        ctx.lineTo(toCanvasX(canvas, plotWidth, c), toCanvasY(canvas, plotHeight, 0 + offset));
        ctx.lineTo(toCanvasX(canvas, plotWidth, 1), toCanvasY(canvas, plotHeight, 0 + offset));
        ctx.stroke();

        // Reset line dash
        ctx.setLineDash([]);

        // Draw discontinuity
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(toCanvasX(canvas, plotWidth, c), toCanvasY(canvas, plotHeight, 1 + offset), 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(toCanvasX(canvas, plotWidth, c), toCanvasY(canvas, plotHeight, 0 + offset), 4, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawDifference(canvas, ctx, plotWidth, plotHeight, c1, c2, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 1;

        // Always calculate c2-c1 for first difference pair
        // and c4-c3 for second difference pair
        const minC = Math.min(c1, c2);
        const maxC = Math.max(c1, c2);
        const diff = c2 > c1 ? 1 : -1;

        ctx.beginPath();

        if (c1 === c2) {
            // Zero everywhere
            ctx.moveTo(toCanvasX(canvas, plotWidth, 0), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, 1), toCanvasY(canvas, plotHeight, 0));
        } else if (c2 > c1) {
            // Positive on (c1, c2], zero elsewhere
            ctx.moveTo(toCanvasX(canvas, plotWidth, 0), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c1), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c1), toCanvasY(canvas, plotHeight, 1));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c2), toCanvasY(canvas, plotHeight, 1));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c2), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, 1), toCanvasY(canvas, plotHeight, 0));

            // Fill the area under the curve and above 0
            ctx.fillStyle = color + '40'; // Add 40 (25% opacity) to the color
            ctx.fill();
        } else {
            // For the case where c2 < c1, we still want to show c2-c1
            // which is negative on (c2, c1], zero elsewhere
            ctx.moveTo(toCanvasX(canvas, plotWidth, 0), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c2), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c2), toCanvasY(canvas, plotHeight, -1));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c1), toCanvasY(canvas, plotHeight, -1));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c1), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, 1), toCanvasY(canvas, plotHeight, 0));
        }

        ctx.stroke();

        // Draw discontinuity points
        ctx.fillStyle = color;
        if (c1 !== c2) {
            ctx.beginPath();
            ctx.arc(toCanvasX(canvas, plotWidth, minC), toCanvasY(canvas, plotHeight, 0), 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(toCanvasX(canvas, plotWidth, minC), toCanvasY(canvas, plotHeight, diff), 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(toCanvasX(canvas, plotWidth, maxC), toCanvasY(canvas, plotHeight, diff), 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(toCanvasX(canvas, plotWidth, maxC), toCanvasY(canvas, plotHeight, 0), 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    // Helper functions for difference calculations
    function getDiff1(c1, c2, x) {
        if (c1 === c2) return 0;
        if (c2 > c1) return (x > c1 && x <= c2) ? 1 : 0;
        return (x > c2 && x <= c1) ? -1 : 0;
    }

    function getDiff2(c3, c4, x) {
        if (c3 === c4) return 0;
        return (x > c3 && x <= c4) ? 1 : 0;
    }

    // Function to draw the difference areas on the product canvas
    function drawDifferenceAreas(canvas, ctx, plotWidth, plotHeight, c1, c2, c3, c4) {
        // Draw Diff 1 area (semi-transparent)
        if (c2 > c1) {
            ctx.beginPath();
            ctx.moveTo(toCanvasX(canvas, plotWidth, c1), toCanvasY(canvas, plotHeight, 0));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c1), toCanvasY(canvas, plotHeight, 1));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c2), toCanvasY(canvas, plotHeight, 1));
            ctx.lineTo(toCanvasX(canvas, plotWidth, c2), toCanvasY(canvas, plotHeight, 0));
            ctx.fillStyle = '#4CAF5040'; // Semi-transparent green (Diff 1 color)
            ctx.fill();
        }

        // Draw Diff 2 area (semi-transparent)
        // Since we enforce c4 > c3 in the slider event listeners, we don't need to handle c3 > c4
        ctx.beginPath();
        ctx.moveTo(toCanvasX(canvas, plotWidth, c3), toCanvasY(canvas, plotHeight, 0));
        ctx.lineTo(toCanvasX(canvas, plotWidth, c3), toCanvasY(canvas, plotHeight, 1));
        ctx.lineTo(toCanvasX(canvas, plotWidth, c4), toCanvasY(canvas, plotHeight, 1));
        ctx.lineTo(toCanvasX(canvas, plotWidth, c4), toCanvasY(canvas, plotHeight, 0));
        ctx.fillStyle = '#00BCD440'; // Semi-transparent cyan (Diff 2 color)
        ctx.fill();
    }

    // Function to draw the product curve and area
    function drawProduct(canvas, ctx, plotWidth, plotHeight, c1, c2, c3, c4) {
        // Calculate product of two differences
        // Diff1 = I[0,c1] - I[0,c2]
        // Diff2 = I[0,c3] - I[0,c4]
        // Product = Diff1 * Diff2

        ctx.strokeStyle = '#E91E63';
        ctx.lineWidth = 3;
        ctx.globalAlpha = 1;

        // Create sorted array of all boundary points
        const points = [0, c1, c2, c3, c4, 1].sort((a, b) => a - b);
        const uniquePoints = [...new Set(points)];

        // Draw product curve
        ctx.beginPath();
        ctx.moveTo(toCanvasX(canvas, plotWidth, 0), toCanvasY(canvas, plotHeight, 0));

        // Draw product area (emphasized)
        for (let i = 0; i < uniquePoints.length - 1; i++) {
            const x1 = uniquePoints[i];
            const x2 = uniquePoints[i + 1];
            const xMid = (x1 + x2) / 2;

            // Calculate product at midpoint of this segment
            const product = getDiff1(c1, c2, xMid) * getDiff2(c3, c4, xMid);

            // If product is positive, fill the area
            if (product > 0) {
                ctx.fillStyle = '#E91E6360'; // More opaque pink (Product color)
                ctx.fillRect(
                    toCanvasX(canvas, plotWidth, x1),
                    toCanvasY(canvas, plotHeight, product),
                    toCanvasX(canvas, plotWidth, x2) - toCanvasX(canvas, plotWidth, x1),
                    toCanvasY(canvas, plotHeight, 0) - toCanvasY(canvas, plotHeight, product)
                );
            }

            // Draw horizontal segment at this height
            ctx.lineTo(toCanvasX(canvas, plotWidth, x1), toCanvasY(canvas, plotHeight, product));
            ctx.lineTo(toCanvasX(canvas, plotWidth, x2), toCanvasY(canvas, plotHeight, product));
        }

        ctx.stroke();

        // Draw discontinuity points at transitions
        ctx.fillStyle = '#E91E63';
        for (let i = 1; i < uniquePoints.length - 1; i++) {
            const x = uniquePoints[i];
            const eps = 0.0001;

            // Value just before and after this point
            const productBefore = getDiff1(c1, c2, x - eps) * getDiff2(c3, c4, x - eps);
            const productAfter = getDiff1(c1, c2, x + eps) * getDiff2(c3, c4, x + eps);

            if (productBefore !== productAfter) {
                // Draw filled circle for the value on the interval to the left
                ctx.beginPath();
                ctx.arc(toCanvasX(canvas, plotWidth, x), toCanvasY(canvas, plotHeight, productBefore), 4, 0, 2 * Math.PI);
                ctx.fill();
                // Draw filled circle for the value on the interval to the right
                ctx.beginPath();
                ctx.arc(toCanvasX(canvas, plotWidth, x), toCanvasY(canvas, plotHeight, productAfter), 4, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    // Common function to draw a canvas with indicator functions and difference
    function drawPairCanvas(canvas, ctx, plotWidth, plotHeight,
                           param1Slider, param2Slider,
                           color1, color2, diffColor,
                           drawLegendFn,
                           title) {
        const param1 = parseFloat(param1Slider.value);
        const param2 = parseFloat(param2Slider.value);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTitle(canvas, ctx, title);
        drawAxes(canvas, ctx, plotWidth, plotHeight);

        // Draw indicator functions if toggled
        if (toggleIndicators.checked) {
            drawIndicatorFunction(canvas, ctx, plotWidth, plotHeight, param1, color1, 0.025);
            drawIndicatorFunction(canvas, ctx, plotWidth, plotHeight, param2, color2, -0.025);
        }

        // Draw the difference if toggled
        if (toggleDifferences.checked) {
            drawDifference(canvas, ctx, plotWidth, plotHeight, param1, param2, diffColor);
        }

        // Draw legend
        drawLegendFn();
    }

    // Draw the first canvas: first pair (c1, c2) and its difference
    function drawCanvas1() {
        drawPairCanvas(
            canvas1, ctx1, plotWidth1, plotHeight1,
            c1Slider, c2Slider,
            '#2196F3', '#FF5722', '#4CAF50',
            drawLegend1,
            'First Pair and Difference'
        );
    }

    // Draw the second canvas: second pair (c3, c4) and its difference
    function drawCanvas2() {
        drawPairCanvas(
            canvas2, ctx2, plotWidth2, plotHeight2,
            c3Slider, c4Slider,
            '#9C27B0', '#FF9800', '#00BCD4',
            drawLegend2,
            'Second Pair and Difference'
        );
    }

    // Draw the third canvas: product of the differences
    function drawCanvas3() {
        const c1 = parseFloat(c1Slider.value);
        const c2 = parseFloat(c2Slider.value);
        const c3 = parseFloat(c3Slider.value);
        const c4 = parseFloat(c4Slider.value);

        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        drawTitle(canvas3, ctx3, 'Product Function');
        drawAxes(canvas3, ctx3, plotWidth3, plotHeight3);

        // Draw the difference areas first if differences are shown
        if (toggleDifferences.checked) {
            drawDifferenceAreas(canvas3, ctx3, plotWidth3, plotHeight3, c1, c2, c3, c4);
        }

        // Always draw the product last so it's on top
        drawProduct(canvas3, ctx3, plotWidth3, plotHeight3, c1, c2, c3, c4);

        // Draw legend for canvas3
        drawLegend3();
    }

    // Draw all canvases
    function drawAll() {
        drawCanvas1();
        drawCanvas2();
        drawCanvas3();
    }

    // Common function to draw a legend
    function drawLegend(canvas, ctx, items, height = 80) {
        const legendX = canvas.width - padding - 160;
        const legendY = padding + 20;
        const lineHeight = 22;

        // Background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.fillRect(legendX - 10, legendY - 10, 150, height);
        ctx.strokeRect(legendX - 10, legendY - 10, 150, height);

        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        items.forEach((item, i) => {
            const y = legendY + i * lineHeight;
            const alpha = item.visible ? 1 : 0.3;

            // Line
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = item.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(legendX, y);
            ctx.lineTo(legendX + 25, y);
            ctx.stroke();

            // Text
            ctx.fillStyle = item.visible ? '#333' : '#999';
            ctx.fillText(item.label, legendX + 35, y);
            ctx.globalAlpha = 1;
        });
    }

    // Draw legend for canvas1
    function drawLegend1() {
        const items = [
            { color: '#2196F3', label: 'f(a)(x) = 𝟙[0,a](x)', visible: toggleIndicators.checked },
            { color: '#FF5722', label: 'f(b)(x) = 𝟙[0,b](x)', visible: toggleIndicators.checked },
            { color: '#4CAF50', label: 'Difference', visible: toggleDifferences.checked }
        ];
        drawLegend(canvas1, ctx1, items, 60);
    }

    // Draw legend for canvas2
    function drawLegend2() {
        const items = [
            { color: '#9C27B0', label: 'f(c) = 𝟙[0,c](x)', visible: toggleIndicators.checked },
            { color: '#FF9800', label: 'f(d) = 𝟙[0,d](x)', visible: toggleIndicators.checked },
            { color: '#00BCD4', label: 'Difference', visible: toggleDifferences.checked }
        ];
        drawLegend(canvas2, ctx2, items, 60);
    }

    // Draw legend for canvas3
    function drawLegend3() {
        const items = [
            { color: '#E91E63', label: 'Product', visible: true }, // Product is always visible
            { color: '#4CAF5040', label: 'f(b)-f(a) Difference', visible: toggleDifferences.checked },
            { color: '#00BCD440', label: 'f(d)-f(c) Difference', visible: toggleDifferences.checked }
        ];
        drawLegend(canvas3, ctx3, items, 60); // Increased height for additional items
    }

    c1Slider.addEventListener('input', (e) => {
        let c1 = parseFloat(e.target.value);
        let c2 = parseFloat(c2Slider.value);

        // Enforce c2 > c1
        if (c1 >= c2) {
            // If user tries to move c1 above or equal to c2, move c2 along with c1
            c2 = c1 + 0.01;
            if (c2 > 1) {
                c2 = 1;
                c1 = 0.99;
                e.target.value = c1;
            }
            c2Slider.value = c2;
            c2Value.textContent = c2.toFixed(2);
        }

        c1Value.textContent = c1.toFixed(2);
        drawAll();
    });

    c2Slider.addEventListener('input', (e) => {
        let c2 = parseFloat(e.target.value);
        let c1 = parseFloat(c1Slider.value);

        // Enforce c2 > c1
        if (c2 <= c1) {
            // If user tries to move c2 below or equal to c1, move c1 along with c2
            c1 = c2 - 0.01;
            if (c1 < 0) {
                c1 = 0;
                c2 = 0.01;
                e.target.value = c2;
            }
            c1Slider.value = c1;
            c1Value.textContent = c1.toFixed(2);
        }

        c2Value.textContent = c2.toFixed(2);
        drawAll();
    });

    c3Slider.addEventListener('input', (e) => {
        let c3 = parseFloat(e.target.value);
        let c4 = parseFloat(c4Slider.value);

        // Enforce c4 > c3
        if (c3 >= c4) {
            // If user tries to move c3 above or equal to c4, move c4 along with c3
            c4 = c3 + 0.01;
            if (c4 > 1) {
                c4 = 1;
                c3 = 0.99;
                e.target.value = c3;
            }
            c4Slider.value = c4;
            c4Value.textContent = c4.toFixed(2);
        }

        c3Value.textContent = c3.toFixed(2);
        drawAll();
    });

    c4Slider.addEventListener('input', (e) => {
        let c4 = parseFloat(e.target.value);
        let c3 = parseFloat(c3Slider.value);

        // Enforce c4 > c3
        if (c4 <= c3) {
            // If user tries to move c4 below or equal to c3, move c3 along with c4
            c3 = c4 - 0.01;
            if (c3 < 0) {
                c3 = 0;
                c4 = 0.01;
                e.target.value = c4;
            }
            c3Slider.value = c3;
            c3Value.textContent = c3.toFixed(2);
        }

        c4Value.textContent = c4.toFixed(2);
        drawAll();
    });

    toggleIndicators.addEventListener('change', drawAll);
    toggleDifferences.addEventListener('change', drawAll);

    // Example buttons
    const nonOverlappingBtn = document.getElementById('non-overlapping-btn');
    const overlappingBtn = document.getElementById('overlapping-btn');

    // Set values for non-overlapping example (0.1, 0.3, 0.6, 0.8)
    nonOverlappingBtn.addEventListener('click', function() {
        // Set values in the right order to avoid constraint issues
        // First set c1 and c3 (the smaller values)
        c1Slider.value = 0.1;
        c1Value.textContent = '0.10';
        c3Slider.value = 0.6;
        c3Value.textContent = '0.60';

        // Then set c2 and c4 (the larger values)
        c2Slider.value = 0.3;
        c2Value.textContent = '0.30';
        c4Slider.value = 0.8;
        c4Value.textContent = '0.80';

        // Redraw all canvases
        drawAll();
    });

    // Set values for overlapping example (0.3, 0.6, 0.4, 0.8)
    overlappingBtn.addEventListener('click', function() {
        // Set values in the right order to avoid constraint issues
        // First set c1 and c3 (the smaller values)
        c1Slider.value = 0.3;
        c1Value.textContent = '0.30';
        c3Slider.value = 0.4;
        c3Value.textContent = '0.40';

        // Then set c2 and c4 (the larger values)
        c2Slider.value = 0.6;
        c2Value.textContent = '0.60';
        c4Slider.value = 0.8;
        c4Value.textContent = '0.80';

        // Redraw all canvases
        drawAll();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        updatePlotDimensions();
        drawAll();
    });

    // Initial draw
    drawAll();
});
