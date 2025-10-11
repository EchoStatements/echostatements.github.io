---
title: 'Crinkled Arcs And Brownian Motion'
permalink: /posts/2025/10/crinkled-arcs-and-brownian-motion
header:
  teaser: /posts/2025/10/crinkled-arcs-and-brownian-motion/brownian.png
published:
  false
tags:
  - maths
  - physics
  - Brownian motion
---

A crinkled arc is a continuous curve that appears as if it is making 
right-angle turns at every point along its trajectory. Additionally, if you draw a straight line 
between two recent points and compare that line to a line drawn between any two points in its more
distance past, you will find that these two lines are also perpendicular.

On first glance, this feels really weird, and it may not be clear that such a curve should  
exist, even if we allow ourselves an infinite dimensional space to draw it 
in. However, it turns out that not only do such curves exist, there are ways of constructing 
them such that the fact that they should have these properties begins to feel obvious.
In this post, I describe two such ways that 
crinkled arcs have been constructed, the first by defining it as a path through a space of 
functions 
and the second drawing a connection to Brownian motion, the random movement of particles suspended in fluid.

## Crinkled Arcs

We begin by giving a more formal definition of what a crinkled arc is.

A crinkled arc is a continuous function $$f$$ from the unit interval to a Hilbert space such that 
for 
any two non-overlapping intervals $$[a,b] \subset [0,1]$$ and $$[c,d] \subset [0,1]$$, the chords $$f(b)
-f(a)$$ and $$f(d)-f(c)$$ are orthogonal in the Hilbert space. Their name is derived from this 
property, as it is observed that ["seem to be making a sudden right angle turn at each point"](https://archive.org/details/hilbertspaceprob0019halm/page/4/mode/2up)

Let $$X$$ be a Hilbert space equipped with an inner product $$\langle \cdot, \cdot \rangle$$.
We say that $$f: [0,1] \to X$$ is a crinkled arc if $$f$$ is a continuous function such that for 
all $$ 0 \leq a < b \leq c < d \leq 
1$$,
we have $$\langle f(b)-f(a), f(d)-f(c)\rangle = 0$$. 

The above definitions are largely paraphrased from [Wikipedia](https://en.wikipedia.org/wiki/Crinkled_arc). 
After this introduction, the article asserts that all crinkled arcs (up to certain 
normalisation procedures) are of the form

$$f(t) = \sqrt{2} \sum_{n=1}^\infty \phi_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) 
\pi},$$

Where $${\phi_n}$$ are an orthonormal set defining a subspace of $$X$$. While this is indeed a 
crinkled arc (as we are about to prove), it hides the fact that we can construct crinkled arcs 
in a more intuitive way. 

## Construction of a solution

In [A Hilbert Space Problem Book](https://archive.org/details/hilbertspaceprob0019halm/page/370/mode/2up), 
Halmos presents an exercise
and challenging the reader to come up with an example of a curve satisfying the properties of the 
crinkled arc. What follows is the solution that 
he presents. Interestingly, he also declares that everyone set this problem find the same 
solution.

Consider the Hilbert space $$L^2(0,1)$$, that is, the space of all square integrable 
functions over the interval (0,1). 
For this space, the inner product is defined using the integral of the product
of the two functions, so functions $$\psi:[0,1]\to\mathbb{R}$$ and 
$$\varphi:[0,1]\to\mathbb{R}$$ are orthogonal if and only if they satisfy
$$\int_0^1 \psi(x) \varphi(x) \,dx=0$$. Here, we use Greek letters $$\varphi$$ and $$\psi$$ to denote 
functions from $$(0,1)$$ to $$\mathbb{R}$$ so as to not confuse them with $$f$$, 
which maps from the interval $$(0,1)$$ to real-valued _functions_.

More generally, our Hilbert spaces dot product is defined by this integral $$\langle \psi,\varphi 
\rangle 
= \int^1_0 \psi(x)\varphi(x)\,dx $$. 

Remember that for crinkled arcs, we want 
$$ \langle f(b) - f(a), f(d) - f(c) \rangle = 0$$ for all 
$$0 \leq a < b \leq c < d$$. This gives us an idea for how to construct a solution: if the function 
$$f(b)-f(a)$$ is zero outside the interval $$[a,b]$$ and $$f(d)-f(c)$$ is zero outside of the 
interval $$[c,d]$$, then their inner product will be zero, since the product of the two 
functions will be zero everwhere. 

The easiest way to do this is with indicator functions. Defining $$𝟙_{[0,t]}(x) = \begin{cases}1 
\textnormal{ if } x \leq t \\ 0 \textnormal{ if } x > t \end
{cases}$$.

With a little thought, we can see that defining $$f(t) = 𝟙_{[0,t]}$$ gives us what we want: 
The function given by the difference of two indicator functions with $$t=a$$ and $$t=b$$ with 
$$b>a$$ is 
non-zero only for values between $$a$$ and $$b$$, and the product of $$f(b)-f(a)$$ and $$f(d)-f(c)$$
is a function with non-zero regions if and only if the intervals $$(a,b)$$ and $$(c,d)$$ overlap.

This is demonstrated with the visualisation below. You can set the sliders to see how different 
values of $$a,b,c$$ and $$d$$ affect the inner product of the function differences (visualised 
as the pink area in the bottom plot).

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

One last thing we need to check is the continuity of $$f$$, which we get from the fact that as for
any $$a$$ and $$b$$, as $$a\rightarrow b$$ the norm of the difference of the functions tends to 
zero. We use
the same property of indicator functions we used in computing chord inner products to find:

$$\begin{aligned}\lvert\lvert f(b)-f(a)\rvert\rvert^2 &= \langle f(b)-f(a), f(b)-f(a) \rangle\\
&= \int_{0}^1 \lvert f(b)(s)- f(a)(s)\rvert^2 ds \\
&=  \int^b_a \,ds \\
&= b-a\end{aligned}$$

from which the continuity of $$f$$ becomes apparent.

## Building A Fourier Basis

We now have a solution, but on the surface it looks very much unlike the solution that we were 
expecting. 
We have a function that satisfies the _crinkled arc_ definition but that definition isn't very 
vector space-y; it feels like we've been treating $$L^2(0,1)$$ more as a set of functions rather 
than a proper vector space.
To fix this, it would be nice if we could define a basis and give the curve some coordinates.
So let's try using the Fourier basis and to see what the components look like.

Recall that absolutely integrable period function with period 2 and only finitely many maxima, 
minima and discontinuities can be written as:

$$\varphi(x) = a_0 + \sum_{n=1}^\infty a_n \cos nx + \sum_{n=1}^\infty b_n \sin nx,$$

for some $$a_0, a_1, \ldots \in \mathbb{R}$$ and some $$b_1, b_2, \ldots\in\mathbb{R}$$. However, 
since our functions are in $$L^2(0,1)$$ rather than $$L^2(-1, 1)$$, we can make life easier for ourselves by imagining that 
it is extended to be an even function (recall that for an even function, $$f(x)=f(-x)$$ and that 
all $$b_n$$ can be shown to be zero).

Given this choice of basis vectors, we expect for any $$t$$, write the function
$$f(t)$$ in terms of these basis functions.
In this case our un-normalised basis functions are $$\phi_0(x)=1$$, the constant function and the 
set of 
cosine functions of the form $$\cos(n \pi x)$$. The later need normalising, so our non-constant
basis functions are of the form $$\phi_n(x)= \sqrt{2} \cos(n \pi x)$$.

With this, we have that $$f (t) = \sum_{n=1}^\infty a_n(t) \phi_n$$ 
for some sequence of $$a_n \in \mathbb{R}$$. We find these coefficients using our inner product
to find the projection of $$f(t)$$ onto $$\phi_n$$ for each $$\phi_n$$, so for $$n>0$$

$$\begin{aligned} a_n(t) &= \int_0^1 f(t)(x) \phi_n(x) \, dx\\
&= \int_0^t \phi_n(x) \\
&= \int_0^t \sqrt 2 \cos (n \pi x) \,dx \\
&= -\frac{\sqrt 2}{n \pi} \sin (n \pi x) \end{aligned}$$

and for $$n=0$$ we have

$$\begin{aligned} a_0(t) &= \int_0^1 f(t)(x) \, dx\\
&= t \end{aligned}.$$

Remembering the $$\sqrt{2}$$ in the basis functions, this gives

$$f(t) : x \mapsto t + \sum_{n=1}^\infty \frac{2}{n \pi} \sin (n \pi t) \cos(n \pi x) $$.

We can also write this to as

$$f(t)= \phi_0(t) + \sum_{n=1}^\infty \frac{2}{n \pi} \sin(n \pi t) \phi_n(t).$$

This solution can be verified using the visualisation below, showing that even with finite 
approximations of the infinite sum, we get a good approximation of the indicator function.

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



## Building the Standard Solution

In the previous section, we wrote our crinkled arc in terms of a series based on the Fourier 
expansion of functions. In this section we are going to use what we know the coefficients look
for the standard solution to guess at a set of basis functions. 

This is unsatisfying for a couple of reasons. Firstly, we need to worry about whether 
this basis is even a complete basis for $$L^2(0,1)$$ or is otherwise powerful enough to fully 
describe our functions, and secondly, it feels like we've just plucked
it from thin air. The first problem can be solved fairly easily [ADD DETAILS], and while there is 
a very good reason why this basis is a natural choice, its derivation is non-trivial and is left
as a potential topic for a future post.

I wasn't able to find the form of these basis vectors anywhere online, though looking at the 
coefficients, they can be guessed at pretty easily, and then we can verify that the guess is 
correct. 
In order to get the standard solution we need to make a choice for the basis functions that 
seems arbitrary. In particular, we choose the basis functions to be $$\phi_n$$ of the form 
$$\phi_n(x) = \sqrt{2} \cos \left( (k - \frac{1}{2}) \pi x \right)$$. 

With this change, we can once again calculate the coeffecients in the same way:

$$\begin{aligned} a_n(t) &= \int_0^1 f(t)(x) \phi_n(x) \, dx\\
&= \int_0^t \phi_n(x) \\
&= \int_0^t \sqrt 2 \cos ( (n - \frac{1}{2})\pi x) \,dx \\
&= -\frac{\sqrt 2}{ (n - \frac{1}{2})\pi } \sin ( (n - \frac{1}{2})\pi x) \end{aligned}$$

Since this time there is no $$\phi_0$$ coefficient, we get the solution:

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

$$\{W_t\}_{t\in\mathbb(0,1)}$$ indexed by real-valued $$t$$ and defined by the following four 
properties:

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

Let's start off with properties 3 and 4 of Brownian motion. We want that for $$a,b,c,d$$ defined
in the usual way that $$W_b-W_a \sim \mathcal{N}(0, b-a)$$ and $$W_b-W_a \sim \mathcal{N}(0, d-c)$$
with the two normal distributions being independent. 

We can notice that for our crinkled arc $$f$$,
the inner product and norm behave  in the same way that we would like the covariance and 
variance to behave. 
More precisely, we want $$\text{cov}(W_a, W_b)=\langle f(a), f(b)\rangle$$ and $$\text{cov}
(W_b-W_a, 
W_d-W_c)$$ 
$$= 
\langle f(b)
-f(a), f(d)-f(c)\rangle$$. It sure looks like we want $$W_t$$ to live in a space with an inner 
product structure! 

Since $$W_t$$ are all real-valued random variables, we can do all the operations on them with 
regard to adding them together and scaling them to form a vector space, and we can define the 
inner product to be the covariance (after proving that covariance fits all the necessary 
criteria for an inner product). But, now we know that if we want the covariance of $$W_t$$'s 
trajectory to have the properties we want, then $$W_t$$ has to follow a crinkled arc. 

More than that, we know that for the crinkled arc, there is a basis such that 

$$W_t = \sqrt{2} \sum_{n=1}^\infty X_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) \pi},$$

Now what are the basis vectors? They're independent normal distributions with zero mean and unit
variance! We get that they're normally distributed because they are a basis for the space spanned by
$$W_t$$, which consists solely of zero-mean normally distributed variables (consider the third 
property 
and that $$W_t = W_t-W_0$$ by the first property). And by the criterion that the basis form an 
orthonormal set guarantee unit variance (by normalisation) and independence (by orthogonality).

This derivation is the opposite way round from what you will typically find in the literature. 
In fact, the general solution for the form of the crinkled arc was derived by first identifying 
the crinkled arcs are Brownian motion and immediately porting over the known form of the result.


<div class="container">
    <h3>Interactive Visualization of Brownian Motion</h3>
    <div class="description">
        Visualization of Brownian motion on [0,1] using different simulation methods
    </div>

    <div class="plot-container">
        <canvas id="brownian-canvas1" width="800" height="300"></canvas>
    </div>

    <div class="plot-container">
        <canvas id="brownian-canvas2" width="800" height="300"></canvas>
    </div>

    <div class="plot-container">
        <canvas id="brownian-canvas3" width="800" height="300"></canvas>
    </div>

    <div class="controls">
        <div class="control-group">
            <h3>Random Walk Simulation</h3>
            <h4>Granularity (number of steps)</h4>
            <div class="slider-container">
                <input type="range" id="granularity-slider" min="10" max="1000" step="10" value="100">
                <span class="value-display" id="granularity-value">100</span>
            </div>
        </div>

        <div class="control-group">
            <h3>Fourier Series Simulation</h3>
            <h4>Number of terms</h4>
            <div class="slider-container">
                <input type="range" id="terms-slider" min="1" max="1000" step="1" value="10">
                <span class="value-display" id="terms-value">10</span>
            </div>
        </div>

        <div class="toggles" style="margin-top: 20px; margin-bottom: 20px;">
            <button id="resample-btn">Re-sample All Paths</button>
        </div>
    </div>

    <div class="description" style="margin-top: 20px;">
        <p>
            This visualization demonstrates two methods for simulating Brownian motion on the interval [0,1].
        </p>
        <p>
            The first plot shows Brownian motion simulated as the limit of a random walk. As the granularity increases, 
            the simulation approaches true Brownian motion. Three sample paths are shown to illustrate the random nature.
        </p>
        <p>
            The second plot shows Brownian motion simulated using the Fourier series representation:
            B(t) = X₀·t + ∑ₙ₌₂ Xₙ·√2/(nπ)·sin(nπt)
            where X₀, X₁, X₂, ... are independent standard normal random variables.
        </p>
        <p>
            The third plot shows Brownian motion simulated using the half-integer sine wave method:
            B(t) = ∑ₙ Xₙ·√2·sin((n-1/2)πt)/((n-1/2)π)
            where X₁, X₂, ... are independent standard normal random variables.
        </p>
    </div>
</div>

<link rel="stylesheet" href="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/styles.css">
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_utils.js"></script>
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/brownian_motion.js"></script>

## Conclusion

This post has described crinkled arcs in three ways: a function describing the curve made by 
continuously varying a parameter in an interval function, using a set of basis 
trigonometric basis functions and as the trajectory of Brownian motion through a Hilbert space 
of normal distribution random variables.

The original motivation for this blog post was to clarify for myself the relationship between these 
three descriptions (in his original work, Johnson jumped immediately between the third and second
using the Kosambi–Karhunen–Loève theorem). I was somewhat surprised to find the definition of the 
basis functions for the crinkled arc in $$L^2(0,1)$$ did not appear in any sources that I found, 
though I was also surprised by how few sources I could find.

## References

Halmos, P. R. (2012). A Hilbert space problem book (Vol. 19). Springer Science & Business Media. 
(Problem 4)

Johnson, G. G. (1970, June). A crinkled arc. In Proc. Amer. Math. Soc (Vol. 25, pp. 375-376).

Vitale, Richard A. "Representation of a crinkled arc." Proceedings of the American Mathematical Society 52.1 (1975): 303-304.

## Cite This Post
```bibtex
@misc{woood2025crinkled,
  author = {Wood, Danny},
  title = {Crinkled Arcs and Brownian Motion},
  year = {2025},
  howpublished = {Blog post},
  url = {https://echostatements.github.io/posts/2025/10/crinkled_arcs_and_brownian_motion/}
}
```
