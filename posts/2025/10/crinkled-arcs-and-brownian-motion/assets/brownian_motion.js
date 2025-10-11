// Brownian Motion Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the canvases
    const canvas1 = document.getElementById('brownian-canvas1');
    const canvas2 = document.getElementById('brownian-canvas2');
    const canvas3 = document.getElementById('brownian-canvas3');

    // Get contexts for the canvases
    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    const ctx3 = canvas3.getContext('2d');

    // Get references to the sliders
    const granularitySlider = document.getElementById('granularity-slider');
    const granularityValue = document.getElementById('granularity-value');
    const termsSlider = document.getElementById('terms-slider');
    const termsValue = document.getElementById('terms-value');

    // Use the shared utility module
    const utils = window.FourierUtils;

    // Define dimensions for the canvases
    let plotWidth1, plotHeight1;
    let plotWidth2, plotHeight2;
    let plotWidth3, plotHeight3;

    // Function to update dimensions for all canvases
    function updatePlotDimensions() {
        const dimensions1 = utils.updatePlotDimensions(canvas1);
        plotWidth1 = dimensions1.plotWidth;
        plotHeight1 = dimensions1.plotHeight;

        const dimensions2 = utils.updatePlotDimensions(canvas2);
        plotWidth2 = dimensions2.plotWidth;
        plotHeight2 = dimensions2.plotHeight;

        const dimensions3 = utils.updatePlotDimensions(canvas3);
        plotWidth3 = dimensions3.plotWidth;
        plotHeight3 = dimensions3.plotHeight;
    }

    // Initial update of dimensions
    updatePlotDimensions();

    // Function to generate random normal variable using Box-Muller transform
    function randomNormal() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    // Function to simulate Brownian motion using random walk
    function simulateBrownianMotionRandomWalk(steps) {
        const paths = [[], [], []]; // Three sample paths

        for (let path = 0; path < 3; path++) {
            let position = 0;
            paths[path].push({ x: 0, y: position });

            for (let i = 1; i <= steps; i++) {
                const t = i / steps;
                const stepSize = 1 / Math.sqrt(steps);
                position += randomNormal() * stepSize;
                paths[path].push({ x: t, y: position });
            }
        }

        return paths;
    }

    // Function to simulate Brownian motion using Fourier series
    function simulateBrownianMotionFourier(terms) {
        const paths = [[], [], []]; // Three sample paths
        const coefficients = [];

        // Generate random coefficients for each path
        for (let path = 0; path < 3; path++) {
            coefficients[path] = [];
            coefficients[path].push(randomNormal()); // X_0

            for (let n = 1; n <= terms; n++) {
                coefficients[path].push(randomNormal());
            }
        }

        // Calculate paths using the coefficients
        const steps = 100;
        for (let path = 0; path < 3; path++) {
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                let position = coefficients[path][0] * t; // X_0 * t term

                // Start from n=2 to exclude the first sine wave term
                // This ensures the first term is just the constant t
                for (let n = 2; n <= terms; n++) {
                    position += coefficients[path][n] * Math.sqrt(2) / (n * Math.PI) * Math.sin(n * Math.PI * t);
                }

                paths[path].push({ x: t, y: position });
            }
        }

        return paths;
    }

    // Function to simulate Brownian motion using half-integer cosine wave method
    function simulateBrownianMotionHalfIntegerCosine(terms) {
        const paths = [[], [], []]; // Three sample paths
        const coefficients = [];

        // Generate random coefficients for each path
        for (let path = 0; path < 3; path++) {
            coefficients[path] = [];
            for (let n = 1; n <= terms; n++) {
                coefficients[path].push(randomNormal());
            }
        }

        // Calculate paths using the coefficients
        const steps = 100;
        for (let path = 0; path < 3; path++) {
            for (let i = 0; i <= steps; i++) {
                const t = i / steps;
                let position = 0;

                for (let n = 1; n <= terms; n++) {
                    const halfInteger = n - 0.5;
                    position += coefficients[path][n-1] * Math.sqrt(2) * Math.sin(halfInteger * Math.PI * t) / (halfInteger * Math.PI);
                }

                paths[path].push({ x: t, y: position });
            }
        }

        return paths;
    }

    // Function to draw a Brownian motion path
    function drawPath(canvas, ctx, plotWidth, plotHeight, path, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        // Find min and max y values to scale properly
        let minY = Infinity;
        let maxY = -Infinity;
        for (const point of path) {
            minY = Math.min(minY, point.y);
            maxY = Math.max(maxY, point.y);
        }

        // Add some padding
        const padding = (maxY - minY) * 0.1;
        minY -= padding;
        maxY += padding;

        // Draw the path
        for (let i = 0; i < path.length; i++) {
            const x = utils.toCanvasX(canvas, plotWidth, path[i].x);
            // Scale y to fit in the canvas
            const normalizedY = (path[i].y - minY) / (maxY - minY);
            const y = utils.toCanvasY(canvas, plotHeight, normalizedY);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    // Function to draw the first canvas (Random Walk Brownian Motion)
    function drawCanvas1() {
        const granularity = parseInt(granularitySlider.value);

        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        utils.drawTitle(canvas1, ctx1, 'Brownian Motion via Random Walk');
        utils.drawAxes(canvas1, ctx1, plotWidth1, plotHeight1);

        const paths = simulateBrownianMotionRandomWalk(granularity);
        drawPath(canvas1, ctx1, plotWidth1, plotHeight1, paths[0], '#E91E63');
        drawPath(canvas1, ctx1, plotWidth1, plotHeight1, paths[1], '#4CAF50');
        drawPath(canvas1, ctx1, plotWidth1, plotHeight1, paths[2], '#2196F3');

    }

    // Function to draw the second canvas (Fourier Series Brownian Motion)
    function drawCanvas2() {
        const terms = parseInt(termsSlider.value);

        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        utils.drawTitle(canvas2, ctx2, 'Brownian Motion via Fourier Series');
        utils.drawAxes(canvas2, ctx2, plotWidth2, plotHeight2);

        const paths = simulateBrownianMotionFourier(terms);
        drawPath(canvas2, ctx2, plotWidth2, plotHeight2, paths[0], '#E91E63');
        drawPath(canvas2, ctx2, plotWidth2, plotHeight2, paths[1], '#4CAF50');
        drawPath(canvas2, ctx2, plotWidth2, plotHeight2, paths[2], '#2196F3');

    }

    // Function to draw the third canvas (Half-Integer Cosine Method)
    function drawCanvas3() {
        const terms = parseInt(termsSlider.value);

        ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
        utils.drawTitle(canvas3, ctx3, 'Brownian Motion via Half-Integer Cosine Method');
        utils.drawAxes(canvas3, ctx3, plotWidth3, plotHeight3);

        const paths = simulateBrownianMotionHalfIntegerCosine(terms);
        drawPath(canvas3, ctx3, plotWidth3, plotHeight3, paths[0], '#E91E63');
        drawPath(canvas3, ctx3, plotWidth3, plotHeight3, paths[1], '#4CAF50');
        drawPath(canvas3, ctx3, plotWidth3, plotHeight3, paths[2], '#2196F3');

    }

    // Function to draw all canvases
    function drawAll() {
        console.log("Redrawing all canvases with new random samples");
        drawCanvas1();
        drawCanvas2();
        drawCanvas3();
    }

    // Event listeners for sliders
    granularitySlider.addEventListener('input', function(e) {
        const granularity = parseInt(e.target.value);
        granularityValue.textContent = granularity;
        drawCanvas1();
    });

    termsSlider.addEventListener('input', function(e) {
        const terms = parseInt(e.target.value);
        termsValue.textContent = terms;
        drawCanvas2();
        drawCanvas3();
    });

    // Event listener for the re-sample button
    function attachResampleButtonListener() {
        try {
            console.log("Trying to find resample button...");
            const resampleBtn = document.getElementById('resample-btn');
            console.log("Button element:", resampleBtn);

            if (resampleBtn) {
                console.log("Resample button found, attaching event listener");

                // Remove any existing click listeners to avoid duplicates
                const newBtn = resampleBtn.cloneNode(true);
                resampleBtn.parentNode.replaceChild(newBtn, resampleBtn);

                // Add the click event listener
                newBtn.addEventListener('click', function(e) {
                    console.log("Resample button clicked", e);
                    e.preventDefault();
                    e.stopPropagation();
                    drawAll();
                    return false;
                });

                // Also add a direct onclick attribute as a fallback
                newBtn.onclick = function(e) {
                    console.log("Resample button onclick triggered");
                    drawAll();
                    return false;
                };

                console.log("Event listeners attached successfully");
            } else {
                console.log("Resample button not found, retrying in 500ms");
                setTimeout(attachResampleButtonListener, 500);
            }
        } catch (error) {
            console.error("Error attaching event listener:", error);
        }
    }

    // Start trying to attach the event listener
    attachResampleButtonListener();

    // Also try again when the window is fully loaded
    window.addEventListener('load', function() {
        console.log("Window fully loaded, trying to attach event listener again");
        attachResampleButtonListener();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        updatePlotDimensions();
        drawAll();
    });

    // Initial draw
    drawAll();
});
