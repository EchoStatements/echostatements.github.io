---
title: 'Crinkled Arcs And Brownian Motion'
permalink: /posts/2025/10/crinkled-arcs-and-brownian-motion
header:
  teaser: /posts/2025/10/crinkled-arcs-and-brownian-motion/brownian.png
tags:
  - maths
  - physics
  - Brownian motion
---

A crinkled arc is a continuous curve that appears as if it is making 
right-angle turns at every point along its trajectory. Additionally, if you draw a straight line 
between two recent points and compare that line to a line drawn between any two points in its more
distance past, you will find that these two lines are also perpendicular.

On first hearing about the crinkled arc, 
this feels really weird, and it may not be clear that such a curve should exist at all, even if 
we allow ourselves an infinite-dimensional space to draw it 
in. However, it turns out that not only do such curves exist, there are ways of constructing 
them so that the fact that they have these properties begins to feel obvious.
In this post, I describe two such ways that 
crinkled arcs have been constructed, the first by defining it as a path through a space of 
functions 
and the second drawing a connection to Brownian motion, the random movement of particles suspended in fluid.

## Crinkled Arcs

We begin by giving a more formal definition of what a crinkled arc is.

A crinkled arc is a continuous function $$f$$ from the unit interval to a Hilbert space $$X$$
such that for 
any two non-overlapping intervals $$[a,b] \subset [0,1]$$ and $$[c,d] \subset [0,1]$$, the chords $$f(b)
-f(a)$$ and $$f(d)-f(c)$$ are orthogonal in the Hilbert space. Their name is derived from this 
property, as it is observed that ["seem to be making a sudden right angle turn at each point"](https://archive.org/details/hilbertspaceprob0019halm/page/4/mode/2up), giving them a crinkled 
quality.


More formally, if $$X$$ is equipt with an inner product $$\langle \cdot, \cdot \rangle$$, then
we say that $$f: [0,1] \to X$$ is a crinkled arc if $$f$$ is a continuous function such that for 
all $$ 0 \leq a < b \leq c < d \leq 
1$$,
we have $$\langle f(b)-f(a), f(d)-f(c)\rangle = 0$$. 

This definition is largely paraphrased from [Wikipedia](https://en.wikipedia.
org/wiki/Crinkled_arc), and after this introduction, the article asserts that all crinkled arcs 
(up to certain 
normalisation procedures) are of the form

$$f(t) = \sqrt{2} \sum_{n=1}^\infty \phi_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) 
\pi},$$

Where $${\phi_n}$$ are an orthonormal set defining a subspace of $$X$$. While this is indeed a 
crinkled arc (as we are about to prove), it is not immediately obvious, and in fact that we can 
construct crinkled arcs in a more intuitive way. 

## Building an Arc

In [A Hilbert Space Problem Book](https://archive.org/details/hilbertspaceprob0019halm/page/370/mode/2up), 
Halmos presents an exercise
and challenging the reader to come up with an example of a curve satisfying the properties of the 
crinkled arc. What follows is the solution that 
he presents, and indeed the solution that he claims that everyone who is set this problem finds. 

Consider the Hilbert space $$L^2(0,1)$$, that is, the space of all square integrable 
functions over the interval (0,1). 
For this space, the inner product is defined using the integral of the product
of the two functions, so functions $$\psi:[0,1]\to\mathbb{R}$$ and 
$$\varphi:[0,1]\to\mathbb{R}$$ are orthogonal if and only if they satisfy
$$\int_0^1 \psi(x) \varphi(x) \,dx=0$$. Here, we use Greek letters $$\varphi$$ and $$\psi$$ to denote 
functions from $$(0,1)$$ to $$\mathbb{R}$$ so as to not confuse them with $$f$$, 
which is a function which maps from the interval $$(0,1)$$ to real-valued _functions_, i.e.
$$f: [0,1] \to L^2(0,1)$$, and for $$t \in [0,1]$$, $$f(t):[0,1]\to\mathbb{R}$$.

More generally, our Hilbert space's dot product is defined by this integral $$\langle \psi,\varphi 
\rangle 
= \int^1_0 \psi(x)\varphi(x)\,dx $$. 

Remember that for crinkled arcs, we want 
$$ \langle f(b) - f(a), f(d) - f(c) \rangle = 0$$ for all 
$$0 \leq a < b \leq c < d$$. This gives us an idea for how to construct a solution:
if the function 
$$\phi = f(b)-f(a)$$ is zero outside the interval $$[a,b]$$ and $$\psi = f(d)-f(c)$$ is zero 
outside of the 
interval $$[c,d]$$, then there is no value of $$x$$ such that both $$\phi(x)$$ and $$\psi(x)$$ 
are both non-zero, and therefore their inner product will also be zero.

The easiest way to do this is with indicator functions. Defining $$𝟙_{[0,t]}(x) = \begin{cases}1 
\textnormal{ if } x \leq t \\ 0 \textnormal{ if } x > t \end{cases}$$.

With a little thought, we can see that defining $$f(t) = 𝟙_{[0,t]}$$ gives us what we want: 
The function given by the difference of two indicator functions with $$t=a$$ and $$t=b$$ with 
$$b>a$$ is 
non-zero only for values between $$a$$ and $$b$$, and the product of $$f(b)-f(a)$$ and $$f(d)-f(c)$$
is a function with non-zero regions if and only if the intervals $$(a,b)$$ and $$(c,d)$$ overlap.

This is demonstrated with the visualisation below. You can set the sliders to see how different 
values of $$a,b,c$$ and $$d$$ affect the inner product of the function differences (visualised 
as the pink area in the bottom plot). When the intervals overlap, there are values at which 
both differences give a non-zero value at $$x$$, contributing to a non-zero inner product. When 
they don't overlap, the product is zero everywhere, meaning that the functions are orthogonal.

<div class="container">
    <h3>Interactive Visualization of Indicator Functions</h3>

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
            <h4>𝟙<sub>[0,a]</sub></h4>
            <div class="slider-container">
                <input type="range" id="c1-slider" min="0" max="1" step="0.01" value="0.3">
                <span class="value-display" id="c1-value">0.30</span>
            </div>
            <h4>𝟙<sub>[0,b]</sub></h4>
            <div class="slider-container">
                <input type="range" id="c2-slider" min="0" max="1" step="0.01" value="0.6">
                <span class="value-display" id="c2-value">0.60</span>
            </div>
        </div>

        <div class="control-group">
            <h3>Second Difference Pair</h3>
            <h4>𝟙<sub>[0,c]</sub></h4>
            <div class="slider-container">
                <input type="range" id="c3-slider" min="0" max="1" step="0.01" value="0.4">
                <span class="value-display" id="c3-value">0.40</span>
            </div>
            <h4>𝟙<sub>[0,d]</sub></h4>
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
&= b-a \xrightarrow{a\rightarrow b} 0\end{aligned}$$

from which the continuity of $$f$$ becomes apparent.

## Building A Fourier Basis

We now have a solution, but on the surface it looks very much unlike the solution that we were 
expecting from earlier. 
Additionally, while we have a function that satisfies the _crinkled arc_ definition, that 
definition isn't 
very 
vector space-y; it feels like we've been treating $$L^2(0,1)$$ more as a set of functions rather 
than a proper Hilbert space.
To fix this, it would be nice if we could define a basis and give the curve some coordinates.
So let's try using the [Fourier series](https://scholar.harvard.edu/files/schwartz/files/lecture5-fourier.pdf) 
to find a basis and to see what the components look like.

Recall that absolutely integrable periodic function with period 2 and only finitely many maxima, 
minima and discontinuities can be written as:

$$\varphi(x) = a_0 + \sum_{n=1}^\infty a_n \cos nx + \sum_{n=1}^\infty b_n \sin nx,$$

for some $$a_0, a_1, \ldots \in \mathbb{R}$$ and some $$b_1, b_2, \ldots\in\mathbb{R}$$. However, 
since our functions are in $$L^2(0,1)$$ rather than $$L^2(-1, 1)$$, meaning we care only about 
its behaviour over a interval of length 1 rather than 2, we can 
make life 
easier for ourselves by imagining that 
it is extended to be an even function (recall that for an even function, $$f(x)=f(-x)$$). 
Doing so, we immediately get that 
all $$b_n$$, as coefficients of odd functions, can be shown to be zero.

Given this choice of basis functions, we expect for any $$t$$, to be able to write the function
$$f(t)$$ in terms of these basis functions.
In this case our un-normalised basis functions are $$\phi_0(x)=1$$ (the constant function) and the 
set of 
cosine functions of the form $$\cos(n \pi x)$$. The latter need normalising, so that 
their 
square integrates to one[^normalise], so our non-constant
basis functions are of the form $$\phi_n(x)= \sqrt{2} \cos(n \pi x)$$.

With this, we have that $$f (t) = \sum_{n=0}^\infty a_n(t) \phi_n$$ 
for some sequence of $$a_n \in \mathbb{R}$$. We find these coefficients using our inner product
to find the projection of $$f(t)$$ onto $$\phi_n$$ for each $$\phi_n$$. So for $$n>0$$, 
remembering that $$f(t)$$ is the interval indicator function for the interval $$[0,t]$$:

$$\begin{aligned} a_n(t) &= \langle \phi_n, f(t) \rangle \\
&=\int_0^1 f(t)(x) \phi_n(x) \, dx\\
&= \int_0^t \phi_n(x) \\
&= \int_0^t \sqrt 2 \cos (n \pi x) \,dx \\
&= -\frac{\sqrt 2}{n \pi} \sin (n \pi t) \end{aligned}$$

and for $$n=0$$ we have

$$\begin{aligned} a_0(t) &= \langle \phi_0, f(t) \rangle \\&= \int_0^1 f(t)(x) \, dx\\
&= t \end{aligned}.$$

Remembering the $$\sqrt{2}$$ in front of non-constant basis functions, this gives

$$f(t) : x \mapsto t + \sum_{n=1}^\infty \frac{2}{n \pi} \sin (n \pi t) \cos(n \pi x) $$.

Reabsorbing the basis functions into $$\phi_n$$, we can also write this to as

$$f(t)= \phi_0 t + \sum_{n=1}^\infty \frac{\sqrt{2}}{n \pi} \sin(n \pi t) \phi_n.$$

This solution can be verified using the visualisation below, showing that even with finite 
approximations of the infinite sum, we get a good approximation of the indicator function.

<div class="container">
    <h3>Interactive Visualization of Fourier Series Approximation</h3>
    <div class="description">
        Visualization of the Fourier series approximation of an indicator function 𝟙<sub>[0,t]</sub>(x) on [0,1]
    </div>

    <div class="plot-container">
        <canvas id="canvas-cosine" width="800" height="400"></canvas>
    </div>

    <div class="controls">
        <div class="control-group">
            <h3>Indicator Function Parameter</h3>
            <h4>t value</h4>
            <div class="slider-container">
                <input type="range" id="t-slider-cosine" min="0" max="1" step="0.01" value="0.5">
                <span class="value-display" id="t-value-cosine">0.50</span>
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

</div>

<link rel="stylesheet" href="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/styles.css">
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_utils.js"></script>
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_series_cosine.js"></script>


## Building the Standard Solution

In the previous section, we wrote our crinkled arc in terms of a series based on the Fourier 
expansion of functions.
However, when we introduced the crinkled arc a couple of sections ago, we also gave a claimed 
general solution:

$$f(t) = \sqrt{2} \sum_{n=1}^\infty \phi_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) 
\pi},$$

This does not look like our expansion in terms of Fourier basis functions. So what 
set of basis functions would we need for the standard solution?
In this section we are going to use what we know the coefficients look like
for the standard solution to guess at a set of basis functions. 

Guessing and checking may feel unsatisfying for a couple of reasons: Firstly, we need to worry 
about whether this basis is even a complete basis for $$L^2(0,1)$$ or is otherwise powerful enough 
to fully describe our functions, and secondly, it feels like we've just plucked
it from thin air. The first problem can be solved fairly easily [^derivation], and while there is 
a very good reason why this basis is a natural choice, its derivation is non-trivial [^derivation2]
and is left
as a potential topic for a future post.

I wasn't able to find the form of these basis functions anywhere, though looking at the 
coefficients, they can be guessed at pretty easily, and then we can verify that the guess is 
correct. 
Given that the coefficients we are expecting look a lot  like the coefficients we just derived for 
the Fourier series but with $$n$$ shifted by $$\frac{1}{2}$$, we choose the new basis functions 
to 
$$\phi_n$$ to have that same shift
$$\phi_n(x) = \sqrt{2} \cos \left( (n - \frac{1}{2}) \pi x \right)$$. Note that have to 
[check](https://www.wolframalpha.com/input?i=integral+of+cos%5E2%28%28n-%281%2F2%29%29+pi+x%29+dx+between+0+and+1) that 
$$\sqrt{2}$$ remains the correct normalisation constant.

With this change, we can once again calculate the coefficients in the same way to verify our guess:

$$\begin{aligned} a_n(t) &= \langle \phi_n, f(t)\rangle\\
&=\int_0^1 f(t)(x) \phi_n(x) \, dx\\
&= \int_0^t \phi_n(x) \\
&= \int_0^t \sqrt 2 \cos ( (n - \frac{1}{2})\pi x) \,dx \\
&= -\frac{\sqrt 2}{ (n - \frac{1}{2})\pi } \sin ( (n - \frac{1}{2})\pi t) \end{aligned}$$

Since this time there is no $$\phi_0$$ coefficient, we get the solution:

$$f(t) = \sqrt{2} \sum_{n=1}^\infty \phi_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) \pi}.$$

We can once again show that this solution makes sense by plotting, as shown in the following
visualisation. It's interesting to observe that while both series (unsurprisingly) converge to the 
target function, they also converge faster to each other.

<div class="container">
    <h3>Interactive Visualization of Fourier Series Approximations</h3>
    <div class="description">
        Visualization of Fourier series approximations of an indicator function 𝟙<sub>[0,t]</sub>(x) on [0,1]
    </div>

    <div class="plot-container">
        <canvas id="canvas" width="800" height="400"></canvas>
    </div>

    <div class="controls">
        <div class="control-group">
            <h3>Indicator Function Parameter</h3>
            <h4>t value</h4>
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

</div>

<link rel="stylesheet" href="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/styles.css">
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_utils.js"></script>
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_series.js"></script>


## What Does This Have to do With Brownian Motion?

Brownian motion is the random motion of particles suspended in a medium consisting of smaller 
particles, such as small motes of dust floating in the air or grains of pollen on the surface of 
water (the latter example being the original case of Brownian motion that Robert Brown observed).

In Brownian motion, the particle's movement is random and constantly changing, and though over 
time it will
move through the medium, its overall motion is jittery, and its movement over any two 
non-overlapping intervals is completely independent.

Surprisingly, in describing the crinkled arc, we have also incidentally formulated a representation 
of Brownian motion, a connection that we will now explore in more detail.

Mathematically, Brownian motion is a stochastic process: a set of real-valued random variables 
$$\{W_t\}_{t\in[0,1]}$$ indexed by real-valued $$t$$ and defined by the following four 
properties:

1. Almost surely, $$W_0 = 0$$
2. $$W_t$$ is almost surely continuous in $$t$$
3. For $$0\leq a < b \leq c < d \leq 1$$, $$W_b-W_a$$ is independent of $$W_d-W_c$$
4. $$W_b-W_a \sim \mathcal{N}(0, b-a)$$ for $$0 \leq a \leq b$$

These properties are very similar to the properties we've encountered in our construction of the
crinkled arc using indicator functions. For our crinkled arc $$f$$:

1. $$f(0)$$ is the zero function (i.e., $$f(0): x \mapsto 0$$ for all $$x$$).
2. $$f$$ is continuous.
3. For $$0\leq a < b \leq c < d \leq 1$$ $$f(b)-f(a)$$ is orthogonal to $$f(d)-f(c)$$.
4. $$\lvert \lvert f(b) - f(a) \rvert \rvert = (b-a)$$ for $$0 \leq a \leq b$$.

These connections are concrete enough that we should expect to be able to construct an isomorphism
between the two.

Let's start off with properties 3 and 4 of Brownian motion. We want that for $$a,b,c,d$$ defined
in the usual way that $$W_b-W_a \sim \mathcal{N}(0, b-a)$$ and $$W_d-W_c \sim \mathcal{N}(0, d-c)$$
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
criteria for an inner product). But, now we know that $$W_t$$'s live in a Hilbert space, and their
trajectory fits all the properties that $$W_t$$ has to follow a crinkled arc.

More than that, since we know that for the crinkled arc, there is an orthonormal basis $$\{X_n\}$$ 
such that 

$$W_t = \sqrt{2} \sum_{n=1}^\infty X_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) \pi},$$

Now what are the basis vectors? They're independent normal distributions with zero mean and unit
variance! We get that they're normally distributed because they are a basis for the space spanned by
$$W_t$$, which consists solely of zero-mean normally distributed variables (to see that 
$$W_t$$ is normally distributed consider that $$W_t = W_t-W_0$$ follows a normal distribution 
and that $$W_0$$ is almost-surely zero). And by the 
criterion that the basis form an 
orthonormal set guarantee unit variance (by normalisation) and independence (by orthogonality).

Though this representation of Brownian motion is well-known in the literature, this is not the 
usual derivation. Indeed, in proving the generality of the solution for the crinkled arc, [Vitale](https://www.ams.org/journals/proc/1975-052-01/S0002-9939-1975-0388056-1/S0002-9939-1975-0388056-1.pdf)
drew the connection the other way, asserting that the crinkled arc is a form of Brownian motion
and going from there. 

The Fourier cosine basis as a representation of Brownian motion is also 
well known (see a derivation on YouTube [here](https://www.youtube.com/watch?v=gtaaoi9rHMo)). 
Using the same reasoning as for the half-integer cosine series, we get that Brownian motion can 
also be represented as:

$$W_t= X(t) + \sum_{n=1}^\infty \frac{\sqrt{2}}{n \pi} \sin(n \pi t) \phi_n(t).$$

We now show three examples of generating Brownian motion: the first showing it as the limit of 
a random walk as step size increases, and two using our series approximations to a given 
number of terms.

<div class="container">
    <h3>Interactive Visualization of Brownian Motion</h3>

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
                <input type="range" id="granularity-slider" min="10" max="200" step="10" value="100">
                <span class="value-display" id="granularity-value">100</span>
            </div>
        </div>

        <div class="control-group">
            <h3>Fourier Series Simulation</h3>
            <h4>Number of terms</h4>
            <div class="slider-container">
                <input type="range" id="terms-slider" min="1" max="200" step="1" value="100">
                <span class="value-display" id="terms-value">100</span>
            </div>
        </div>

        <div class="toggles" style="margin-top: 20px; margin-bottom: 20px;">
            <button id="resample-btn">Re-sample All Paths</button>
        </div>

        <div class="control-group">
            <h3>Path Visualization</h3>
            <h4>Number of paths to draw</h4>
            <div class="slider-container">
                <input type="range" id="paths-slider" min="1" max="5" step="1" value="3">
                <span class="value-display" id="paths-value">3</span>
            </div>
        </div>
    </div>
    <div class="description" style="margin-top: 20px;">
        <p>
            This visualization demonstrates two methods for simulating Brownian motion on the interval [0,1].
        </p>
    </div>
</div>

<link rel="stylesheet" href="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/styles.css">
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/fourier_utils.js"></script>
<script src="/posts/2025/10/crinkled-arcs-and-brownian-motion/assets/brownian_motion.js"></script>

## Conclusion

This post has described crinkled arcs in three ways: a function describing the curve made by 
continuously varying a parameter in an interval function, using a set of
trigonometric basis functions and as the trajectory of Brownian motion through a Hilbert space 
of normal distribution random variables.

The original motivation for this post was to clarify for myself the relationship between these 
three descriptions, giving more space to elucidate the relationship between the crinkled arc and 
Brownian motion than I was able to find in the literature. I was somewhat surprised to find the 
definition of the basis functions for the crinkled arc in $$L^2(0,1)$$ did not appear in any sources
that I found. In exploring these connections, I hope that this post can serve as reasonable 
introduction to the crinkled arc and make its properties seem a little less unintuitive.


_Thanks to [Andrew Webb](https://twitter.com/AndrewM_Webb) for feedback on a draft version of this post._

## References

Halmos, P. R. (2012). A Hilbert space problem book (Vol. 19). Springer Science & Business Media. 
(Problem 4)

Johnson, G. G. (1970, June). A crinkled arc. In Proc. Amer. Math. Soc (Vol. 25, pp. 375-376).

Vitale, Richard A. "Representation of a crinkled arc." Proceedings of the American Mathematical Society 52.1 (1975): 303-304.

## Cite This Post
```bibtex
@misc{wood2025crinkled,
  author = {Wood, Danny},
  title = {Crinkled Arcs and Brownian Motion},
  year = {2025},
  howpublished = {Blog post},
  url = {https://echostatements.github.io/posts/2025/10/crinkled-arcs-and-brownian-motion/}
}
```
[^normalise]: see [here](https://www.wolframalpha.com/input?i=integral+of+cos%5E2%28n+pi+x%29+dx+between+0+and+1) for evaluation of the integral.

[^derivation]: Given the solution that we find, this can be done by rescaling and using the 
completeness of the set of $$\cos(n \pi x)$$ as a basis for $$L^2(0,1)$$.

[^derivation2]: At least the way that I would currently attempt it.
