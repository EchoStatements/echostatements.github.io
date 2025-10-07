---
title: 'Crinkled Arcs And Brownian Motion'
permalink: /posts/2025/10/crinkled-arcs-and-brownian-motion
tags:
- maths
- Brownian motion
---


On first glance, crinkled arcs are really weird objects. Loosely speaking,
 they are continuous curves that are making right angle turns
 at every point, and their direction at
every point is orthogonal to their direction before or after that point.

Reading their definition for the first time, it felt deeply unintuitive to me that such
a curve should be able to exist---even if they only exist in infinite-dimensional spaces.
However, they have a connection to Brownian motion that makes their properties seem
much more obvious

## Crinkled Arcs

Crinkled arcs are continuous functions from the unit interval to a Hilbert space such that for 
any two non-overlapping intervals $$[a,b]$$ and $$[c,d]$$ in the unit interval, the chords $$f(b)
-f(a)$$ and $$f(d)-f(c)$$ are orthogonal in the Hilbert space. Their name is derived from this 
property, as it is observed that "seem to be making a sudden right angle turn at each point"

Let $$X$$ be a Hilbert space equipped with an inner product $$\langle \cdot, \cdot \rangle$$.
We say that $$f: [0,1] \to X$$ is a crinkled arc if $$f$$ is a continuous function such that for 
all $$ 0 \leq a < b \leq c < d \leq 
1$$,
we have $$\langle f(b)-f(a), f(d)-f(c)\rangle = 0$$. 

The above definitions are largely paraphrased from Wikipedia, and after this introduction, 
Wikipedia announces that crinkled arcs (up to certain normalisation procedures) are of the form

$$f(t) = \sqrt{2} \sum_{n=1}^\infty x_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) \pi},$$

Where $${x_n}$$ are an orthonormal set defining a subspace of $$X$$. While this is true (as we 
will prove), it hides the fact that we can construct crinkled arcs in a more intuitive way. 


## Construction of a solution

In Halmos' book [[NAME]], he presents an exercise defining the crinkled arc (though not by name),
and challenging the reader to come up with an example of such an arc. This is the solution that 
he presents, declaring that everyone set this problem find the same solution.

Consider the Hilbert space $$L^2(0,1)$$, that is, the space of all square integrable 
functions over the interval (0,1). 
For this space, the inner product is defined using
multiplication of the two functions, so two functions $$\psi:[0,1]\to\mathbb{R}$$ and 
$$\phi:[0,1]\to\mathbb{R}$$ are orthogonal if and only if they satisfy
$$\int_0^1 \psi(x) \phi(x) \,dx=0$$. Here, we use Greek letters $$\phi$$ and $$\psi$$ to denote 
functions from $$(0,1)$$ to $$\mathbb{R}$$ so as to not confuse them with $$f$$, 
which maps from the interval $$(0,1)$$ to _functions_ with that domain and range. 

More generally, our Hilbert spaces dot product is defined by this integral $$\langle \psi,\phi 
\rangle 
= \int^1_0 \psi(x)\phi(x)\,dx $$. 

Remember that for crinkled arcs, we want 
$$ \langle f(b) - f(a), f(d) - f(c) \rangle = 0$$ for all 
$$0 \leq a < b \leq c < d$$. This gives us an idea for how to construct a solution: if the function 
$$f(b)-f(a)$$ is zero outside the interval $$[a,b]$$ and $$f(d)-f(c)$$ is zero outside of the 
interval $$[c,d]$$. 

The easiest way to do this is with indicator functions. Defining $$𝟙_{[0,t]}(x) = \begin{cases}1 
\textnormal{ if } x \leq t \\ 0 \textnormal{ if } x > t \end
{cases}$$.

With a little thought, we can see that defining $$f(t) = 𝟙_{[0,t]}$$ gives us what we want: 
The function given by the difference of two indicator functions with $$t=a$$ and $$t=b$$ with 
$$b>a$$ is 
non-zero only for values between $$a$$ and $$b$$, and the product of $$f(b)-f(a)$$ and $$f(d)-f(c)$$
is a function with non-zero regions if and only if the intervals $$(a,b)$$ and $$(c,d)$$ overlap.

<div class="container">
    <h3>Interactive Visualization of Indicator Functions</h3>
    <div class="description">
        Visualization of 𝟙<sub>[0,c₂]</sub>(x) - 𝟙<sub>[0,c₁]</sub>(x) on [0,1]
    </div>

    <div class="plot-container">
        <canvas id="canvas1" width="800" height="210"></canvas>
    </div>

    <div class="plot-container">
        <canvas id="canvas2" width="800" height="210"></canvas>
    </div>

    <div class="plot-container">
        <canvas id="canvas3" width="800" height="210"></canvas>
    </div>

    <div class="controls">
        <div class="control-group">
            <h3>First Difference Pair</h3>
            <h4>𝟙<sub>[0,c₁]</sub></h4>
            <div class="slider-container">
                <input type="range" id="c1-slider" min="0" max="1" step="0.01" value="0.3">
                <span class="value-display" id="c1-value">0.30</span>
            </div>
            <h4>𝟙<sub>[0,c₂]</sub></h4>
            <div class="slider-container">
                <input type="range" id="c2-slider" min="0" max="1" step="0.01" value="0.6">
                <span class="value-display" id="c2-value">0.60</span>
            </div>
        </div>

        <div class="control-group">
            <h3>Second Difference Pair</h3>
            <h4>𝟙<sub>[0,c₃]</sub></h4>
            <div class="slider-container">
                <input type="range" id="c3-slider" min="0" max="1" step="0.01" value="0.4">
                <span class="value-display" id="c3-value">0.40</span>
            </div>
            <h4>𝟙<sub>[0,c₄]</sub></h4>
            <div class="slider-container">
                <input type="range" id="c4-slider" min="0" max="1" step="0.01" value="0.7">
                <span class="value-display" id="c4-value">0.70</span>
            </div>
        </div>
    </div>

    <div class="toggles">
        <div class="toggle-item">
            <input type="checkbox" id="toggle-indicators" checked>
            <label for="toggle-indicators">Indicator functions</label>
        </div>
        <div class="toggle-item">
            <input type="checkbox" id="toggle-differences" checked>
            <label for="toggle-differences">Differences</label>
        </div>
        <button id="non-overlapping-btn">Non-overlapping example</button>
        <button id="overlapping-btn">Overlapping example</button>
    </div>
</div>

<link rel="stylesheet" href="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/styles.css">
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/indicator_functions.js"></script>

This interactive visualization demonstrates how indicator functions work and how their differences behave. You can adjust the parameters using the sliders to see how the functions change.


The last thing we need to check is continuity of $$f$$, which we get from the fact that as for 
any $$a$$ and $$b$$, as $$a->b$$ the norm of the difference of the functions tends to zero. We use
the same property of indicator functions we used in computing chord inner products to find:

$$\lvert\lvert f(b)-f(a)\rvert\rvert^2 = \int\lvert f(b)(s) - f(a)(s)\rvert^2 ds =  \int^b_a = b-a$$

from which the continuity of $$f$$ becomes apparent.

## Building A Basis: Attempt 1

We now have a solution, but on the surface it looks very much unlike the solution that Wikipedia 
give. 
We have a function that satisfies the _crinkled arc_ definition but that definition isn't very 
vector space-y. It would be nice if we could give it some coordinates. So let's try using the 
Fourier basis and to see what the components look like.

Recall that absolutely integrable period function with period 2 and only finitely many maxima, 
minima and discontinuities can be written as 
$$\phi(x) = a_0 + \sum_{n=1}^\infty a_n \cos nx + \sum_{n=1}^\infty b_n \sin nx,$$

for some $$a_0, a_1, \ldots$$ and some $$b_1, b_2, \ldots$$. However, since our functions are in 
$$L^2(0,1)$$ rather than $$L^2(-1, 1)$$, we can make life easier for ourselves by imagining that 
it is extended to be an even function (recall that for an even function, $$f(x)=f(-x)$$ and that 
all $$b_n$$ can be shown to be zero).

Given this choice of basis vectors, we expect to be able to write for any $$t$$, write the function
$$f(t)$$ in terms of these basis functions.
In this case our un-normalised basis are $$e_0(x)=1$$, the constant function and the set of 
cosine functions of the form $$\cos(n \pi x)$$. The later need need normalising, so our non-constant
basis functions are of the form $$e_n(x)= \sqrt{2} \cos(n \pi x)$$.

With this, we have that $$f (t) = \sum_{n=1}^\infty a_n(t) e_n$$ 
for some sequence of $$a_n \in \mathbb{R}$$. We find these coefficients using our inner product
to find the projection of $$f(t)$$ onto $$e_n$$ for each $$e_n$$, so for $$n>0$$

$$\begin{aligned} a_n(t) &= \int_0^1 f(t)(x) e_n(x) \, dx\\
&= \int_0^t e_n(x) \\
&= \int_0^t \sqrt 2 \cos (n \pi x) \,dx \\
&= -\frac{\sqrt 2}{n \pi} \sin (n \pi x) \end{aligned}$$

and for $$n=0$$ we have

$$\begin{aligned} a_0(t) &= \int_0^1 f(t)(x) \, dx\\
&= t \end{aligned}.$$

Remembering the $$\sqrt{2}$$ in the basis functions, this gives

$$f(t) : x \mapsto t + \sum_{n=1}^\infty \frac{2}{n \pi} \sin (n \pi t) \cos(n \pi x) $$.

We can also write this to as

$$f(t)= e_0(t) + \sum_{n=1}^\infty \frac{2}{n \pi} \sin(n \pi t) e_n(t).$$

<div class="container">
    <h3>Interactive Visualization of Fourier Series Approximation</h3>
    <div class="description">
        Visualization of the Fourier series approximation of an indicator function 𝟙<sub>[0,c]</sub>(x) on [0,1]
    </div>

    <div class="plot-container">
        <canvas id="canvas-cosine" width="800" height="400"></canvas>
    </div>

    <div class="controls">
        <div class="control-group">
            <h3>Indicator Function Parameter</h3>
            <h4>c value (cutoff point)</h4>
            <div class="slider-container">
                <input type="range" id="c-slider-cosine" min="0" max="1" step="0.01" value="0.5">
                <span class="value-display" id="c-value-cosine">0.50</span>
            </div>
        </div>

        <div class="control-group">
            <h3>Fourier Series Components</h3>
            <h4>Number of components</h4>
            <div class="slider-container">
                <input type="range" id="components-slider-cosine" min="1" max="200" step="1" value="3">
                <span class="value-display" id="components-value-cosine">3</span>
            </div>
        </div>
    </div>

    <div class="description" style="margin-top: 20px;">
        <p>
            This visualization shows how a Fourier series can approximate an indicator function.
            The indicator function 𝟙<sub>[0,c]</sub>(x) equals 1 for x ≤ c and 0 for x > c.
        </p>
        <p>
            The Fourier series approximation is given by:
            f(x) = 0.5 + ∑<sub>n=1</sub><sup>N</sup> (2/(nπ)) sin(nπc) cos(nπx)
        </p>
        <p>
            Adjust the c value to change the indicator function's cutoff point.
            Adjust the number of components to see how the approximation improves with more terms.
        </p>
    </div>
</div>

<link rel="stylesheet" href="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/styles.css">
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_utils.js"></script>
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_series_cosine.js"></script>

This interactive visualization demonstrates how the Fourier series can approximate an indicator function using the cosine basis. You can adjust the c value to change the cutoff point of the indicator function and the number of components to see how the approximation improves with more terms.


## Building A Basis Attempt 2: Working Backwards From the Solution

In the previous section, we wrote our crinkled arc in terms of a series based on the Fourier 
expansion of functions. In this section we are going to use what we know the coefficients look
like and what the coefficients for the standard solution look like to guess at a set of basis
functions which get us to the standard solution.

This is unsatisfying for a couple of reasons. Firstly, we need to worry about whether 
this basis is even a complete basis for $$L^2(0,1)$$ or is otherwise powerful enough to fully 
describe our functions, and secondly, it feels like we've just plucked
it from thin air. The first problem can be solved fairly easily [ADD DETAILS], and while there is 
a very good reason why this basis is a natural choice, its derivation is non-trivial and is left
as a potential topic for a future post.

I wasn't able to find the form of these basis vectors anywhere online, though looking at the 
coefficients 
In order to get the standard solution we need to make a choice for the basis functions that 
seems arbitrary. In particular, we choose the basis functions to be $$e_n$$ of the form 
$$e_n(x) = \sqrt{2} \cos \left( (k - \frac{1}{2}) \pi x \right)$$. 

With this change, we can once again calculate the coeffecients in the same way:

$$\begin{aligned} a_n(t) &= \int_0^1 f(t)(x) e_n(x) \, dx\\
&= \int_0^t e_n(x) \\
&= \int_0^t \sqrt 2 \cos ( (n - \frac{1}{2})\pi x) \,dx \\
&= -\frac{\sqrt 2}{ (n - \frac{1}{2})\pi } \sin ( (n - \frac{1}{2})\pi x) \end{aligned}$$

Since this time there is no $$e_0$$ coefficient, we get the solution:

$$f(t) = \sqrt{2} \sum_{n=1}^\infty x_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) \pi},$$

We can once again verify that our this solution makes sense by plotting, as shown in the following
visualisation. It's interesting to observe that while both series (unsurprisingly) converge to the 
target function, they converge faster to each other.

<div class="container">
    <h3>Interactive Visualization of Fourier Series Approximations</h3>
    <div class="description">
        Visualization of Fourier series approximations of an indicator function 𝟙<sub>[0,c]</sub>(x) on [0,1]
    </div>

    <div class="plot-container">
        <canvas id="canvas" width="800" height="400"></canvas>
    </div>

    <div class="controls">
        <div class="control-group">
            <h3>Indicator Function Parameter</h3>
            <h4>c value (cutoff point)</h4>
            <div class="slider-container">
                <input type="range" id="c-slider" min="0" max="1" step="0.01" value="0.5">
                <span class="value-display" id="c-value">0.50</span>
            </div>
        </div>

        <div class="control-group">
            <h3>Fourier Series Components</h3>
            <h4>Number of components</h4>
            <div class="slider-container">
                <input type="range" id="components-slider" min="1" max="200" step="1" value="3">
                <span class="value-display" id="components-value">3</span>
            </div>
        </div>
    </div>

    <div class="description" style="margin-top: 20px;">
        <p>
            This visualization shows how different Fourier series can approximate an indicator function.
            The indicator function 𝟙<sub>[0,c]</sub>(x) equals 1 for x ≤ c and 0 for x > c.
        </p>
        <p>
            The cosine basis approximation (pink) is given by:
            f(x) = 0.5 + ∑<sub>n=1</sub><sup>N</sup> (√2/(nπ)) sin(nπc) cos(nπx)
        </p>
        <p>
            The half-integer sine basis approximation (green) is given by:
            f(x) = ∑<sub>k=1</sub><sup>N</sup> (√2/(k-1/2)π) sin((k-1/2)πc) · √2 sin((k-1/2)πx)
        </p>
        <p>
            Adjust the c value to change the indicator function's cutoff point.
            Adjust the number of components to see how the approximations improve with more terms.
        </p>
    </div>
</div>

<link rel="stylesheet" href="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/styles.css">
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_utils.js"></script>
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_series.js"></script>


## How is this Brownian Motion?

Brownian motion is the random motion of particles suspended in a medium consisting of smaller 
particles, such as small motes of dust floating in the air or grains of pollen on the surface of 
water (the latter example being the original case of Brownian motion that Robert Brown observed).

In Brownian motion, the particle's movement is constantly changing, and though over time it will
move through the medium, its overall motion is jittery, and its movement over any two 
non-overlapping intervals is completely independent.

Surprisingly, in describing the crinkled arc, we have also incidentally formulated a 
representation of Brownian motion. 

Mathematically, Brownian motion is a stochastic process: a set of random variables 

$$\{W_t\}_{t\in\mathbb(0,1)}$$ indexed by $$t$$ and defined by the following four properties:

1. Almost surely, $$W_0 = 0$$
2. $$W_t$$ is almost surely continuous in $$t$$
3. For $$0\leq a < b \leq c < d \leq 1$$, $$W_b-W_a$$ is independent of $$W_d-W_c$$
4. $$W_b-W_a \sim \mathcal{N}(0, b-a)$$ for $$0 \leq b \leq a$$

These properties are very similar to the properties we've encountered in our construction of the
crinkled arc using interval functions. For our crinkled arc $$f$$:

1. $$f(0)$$ is the zero function (i.e., $$f(0): x \mapsto 0$$ for all $$x$$).
2. $$f$$ is continuous.
3. For $$0\leq a < b \leq c < d \leq 1$$ $$f(b)-f(a)$$ is orthogonal to $$f(d)-f(c)$$.
4. $$\lvert \lvert f(b) - f(a) \rvert \rvert = (b-a)$$ for $$0 \leq b \leq a$$.

These connections are concrete enough that we should expect to be able to construct an isomorphism
between the two.

The crinkled arc describes the covariance

And in fact, we can use the fact that the crinkled arc to take our Brownian motion, which is defined
as uncountably many correlated random variables and represent it as the sum of only countably many
independent random variables.

[BROWNIAN MOTION DEMO]

We know that for orthogonal objects, 

[^ footnote]
This set of basis vectors is 
