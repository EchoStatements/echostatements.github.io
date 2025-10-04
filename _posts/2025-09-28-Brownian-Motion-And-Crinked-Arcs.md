---
title: 'Brownian Motion and Crinkled Arcs'
permalink: /posts/2025/09/brownian-motion-and-crinkled-arcs/
tags:
- legendre transform
- maths
---


# Crinkled Arcs and Brownian Motion

On first glance, crinkled arcs are really weird objects. Loosely speaking,
 they are continuous curves such that are making right angle turns
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

$$f(t) = \sqrt{2} \sum_{n=1}^\infty x_n \frac{\sin((n-\frac{1}{2})\pi t)}{(n-\frac{1}{2}) \pi t},$$

Where $${x_n}$$ are an orthonormal set defining a subspace of $$X$$. While this is true (as we 
will prove), it hides the fact that we can construct crinkled arcs in a more intuitive way. 


## Construction of a solution

In Halmos' book [[NAME]], he presents an exercise defining the crinkled arc (though not by name),
and challenging the reader to come up with an example of such an arc. This is the solution that 
he presents, declaring that everyone set this problem find the same solution.

Consider the Hilbert space $$L^2(0,1)$$, that is, the space of all square integrable 
functions over the interval (0,1). 
For this space, the inner product is defined using
multiplication of the two functions, so two functions $$f:[0,1]\to\mathbb{R}$$ and 
$$g:[0,1]\to\mathbb{R}$$ are orthogonal if and only if they satisfy
$$\int_0^1 f(x) g(x) \,dx=0$$.

More generally, our Hilbert spaces dot product is defined by this integral $$\langle \psi,\phi 
\rangle 
= \int^1_0 \psi(x)\phi(x)\,dx $$. Here, we use Greek letters $$\phi$$ and $$\psi$$ to denote 
functions from $$
(0,1)$$ to $$\mathbb{R}$$ so as to not confuse them with $$f$$, which maps from the interval $$
(0,1)$$ to _functions_ with that domain and range. 

Remember that for crinkled arcs, we want 
$$ \langle f(b) - f(a), f(d) - f(c) \rangle = 0$$ for all 
$$0 \leq a < b \leq c < d$$. This gives us an idea for how to construct a solution: if the function 
$$f(b)-f(a)$$ is zero outside the interval $$[a,b]$$ and $$f(d)-f(c)$$ is zero outside of the 
interval $[c,d]$. 

The easiest way to do this is with indicator functions. Defining $$𝟙_{[0,t]}(x)$ = \begin{cases}1 
\textnormal{ if } t \leq 0 \\ 0 \textnormal{ if } t > 0 \end
{cases}$$.

With a little thought, we can see that defining $$f(t) = 𝟙_{[0,t]}$$ gives us what we want: 
The function given by the difference of two indicator functions with $$t=a$$ and $$t=b$$ with 
$$b>a$$ is 
non-zero only for values between $$a$$ and $$b$$, and the product of $$f(b)-f(a)$$ and $$f(d)-f(c)$$
is a function with non-zero regions if and only if the intervals $$(a,b)$$ and $$(c,d)$$ overlap.

[DIAGRAMS HERE].


The last thing we need to check is continuity of $$f$$, which we get from 

[TODO]

## Getting to the Wikipedia solution

We now have a solution, but on the surface it looks very much unlike the solution that Wikipedia 
give. 
We have a function that satisfies the _crinkled arc_ definition but that definition isn't very 
vector space-y. It would be nice if we could give it some coordinates. So let's try using the 
Fourier basis and to see what the components look like

To get here, we must choose an orthonomal set of basis functions for $$L^2(0,1)$$. In this case, 
we choose the set of functions $$e_n(x) = 2 \sin (2 \pi n x)$$ for $$n \in \mathbb{N}$$ as our 
basis. This choice is somewhat arbitrary, and other choices of basis would also work but the 
solution would look slightly different.
[^ footnote] 


## How is this Brownian Motion?

Brownian motion is the random motion of particles suspended in a medium consisting of smaller 
particles, such as small mote of dust floating in the air or grains of pollen on the surface of 
water (the latter example being the original case of Brownian motion that Robert Brown observed).

In Brownian motion, the particles movement is constantly changing, and though over time it will
move through the medium, its overall motion is jittery, and its movement over any two 
non-overlapping intervals is completely independent.

Surprisingly, in describing the crinkled arc, we have also incidentally formulated a 
representation of Brownian motion.

Brownian 

| Property                                                                                                                                                 | Description |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| \(W_{0} = 0\) Almost surely                                                                                                                              |
| Independent increments: For every \(t > 0\), the future increments \(W_{t+u} - W_t, \, u \geq 0\), are independent of the past values \(W_s, \, s < t\). |
| Gaussian increments: For all \(t \geq 0, u \geq 0\), \(W_{t+u} - W_t \sim \mathcal{N}(0,u)\).                                                            |
| Continuous paths \(W_t\) is almost surely continuous in \(t\).                                                                                           |


[^ footnote]
There are 
That the set of function $$\{\cos(2 \pi n x)\}_{n \in \mathbb{N}}$$ is complete 

The key property that makes this