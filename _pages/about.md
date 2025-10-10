---
permalink: /
title: "About Me"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I am Lead AI Research Scientist at [Fuzzy Labs](https://fuzzylabs.ai) in Manchester. I specialise in Large Language Models, AI security and
numerical computing.

Previously, I was a machine learning postdoctoral research associate at the University of Manchester in the Alliance Manchester Business School, and before that in the department of Computer Science. During that time, I worked with [Richard Allmendinger](https://personalpages.manchester.ac.uk/staff/richard.allmendinger/default.htm) and [Theo Papamarkou](https://www.theopapamarkou.com/), and in collaboration with [Matt Benatan](https://matt-benatan.squarespace.com/) on explainable uncertainty,
and before that I worked with [Gavin Brown](https://profgavinbrown.github.io/), looking at the role of diversity in machine learning ensembles.

Prior to these roles, I completed a PhD studying the memory and stability of recurrent neural networks (supervised by [Ke Chen](http://www.cs.man.ac.uk/~kechen/) and co-supervised by [Paul Glendinning](https://personalpages.manchester.ac.uk/staff/paul.glendinning/)), interned at IBM working on Bayesian deep learning and completed an MSc looking at the representations learnt by unsupervised models. 
I also have an interest in applications of machine learning to healthcare having participated in 2022's PhysioNet challenge on a team lead by [Dave Wong](https://personalpages.manchester.ac.uk/staff/david.wong/).

My research interests include ensemble methods in machine learning, uncertainty estimation, Bayesian deep learning and recurrent neural networks. 

## Contact

You can contact me either by email \[MyGithubSubDomain\]@gmail.com, on BlueSky or LinkedIn.

{% include base_path %}

<div class="recent-posts-frame">
  <h2>Recent Blog Posts</h2>
  <div class="recent-posts-container">
    {% assign recent_posts = site.posts | sort: 'date' | reverse | limit: 3 %}
    {% for post in recent_posts %}
      <div class="recent-post-item">
        {% assign has_image = false %}
        {% if post.header.teaser %}
          {% assign teaser = post.header.teaser %}
          {% assign has_image = true %}
          {% if teaser contains "://" %}
            <!-- External URL, use as is -->
          {% else %}
            {% assign teaser = teaser | prepend: base_path %}
          {% endif %}
        {% else %}
          {% assign image_path = post.content | split: '![' | last | split: '](' | last | split: ')' | first | strip %}
          {% if image_path != "" %}
            {% if image_path contains "://" %}
              {% assign teaser = image_path %}
              {% assign has_image = true %}
            {% else %}
              {% assign teaser = base_path | append: image_path %}
              {% assign has_image = true %}
            {% endif %}
          {% endif %}
        {% endif %}

        {% if has_image %}
        <div class="recent-post-image">
          <a href="{{ base_path }}{{ post.url }}">
            <img src="{{ teaser }}" alt="{{ post.title }}" />
          </a>
        </div>
        {% endif %}

        <h3 class="recent-post-title"><a href="{{ base_path }}{{ post.url }}">{{ post.title }}</a></h3>
        <p class="recent-post-date"><i class="fa fa-calendar" aria-hidden="true"></i> {{ post.date | date: "%B %d, %Y" }}</p>
        {% if post.excerpt %}
          <p class="recent-post-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
        {% endif %}
        <a href="{{ base_path }}{{ post.url }}" class="read-more-link">Read More &raquo;</a>
      </div>
    {% endfor %}
  </div>
</div>

<style>
  .recent-posts-frame {
    margin-top: 3em;
    padding: 1.5em;
    border: 1px solid var(--global-border-color, #ddd);
    border-radius: 5px;
    background-color: var(--global-background-color, #f8f9fa);
  }

  .recent-posts-frame h2 {
    margin-top: 0;
    margin-bottom: 1em;
    padding-bottom: 0.5em;
    border-bottom: 1px solid var(--global-border-color, #ddd);
    text-align: center;
  }

  .recent-posts-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1.5em;
  }

  .recent-post-item {
    flex: 1 1 calc(33.333% - 1em);
    min-width: 250px;
    padding: 1em;
    border: 1px solid var(--global-border-color, #eee);
    border-radius: 4px;
    background-color: var(--global-card-background-color, #fff);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;
  }

  .recent-post-image {
    margin-bottom: 1em;
    overflow: hidden;
    border-radius: 4px;
    height: 150px;
  }

  .recent-post-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: var(--global-background-color, #f8f9fa);
    transition: transform 0.3s ease;
  }

  .recent-post-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }

  .recent-post-item:hover .recent-post-image img {
    transform: scale(1.05);
  }

  .recent-post-title {
    margin-top: 0;
    font-size: 1.2em;
  }

  .recent-post-title a {
    text-decoration: none;
    color: var(--global-link-color, #2a76dd);
  }

  .recent-post-title a:hover {
    text-decoration: underline;
  }

  .recent-post-date {
    font-size: 0.8em;
    color: var(--global-text-color-light, #767676);
    margin-bottom: 0.8em;
  }

  .recent-post-excerpt {
    font-size: 0.9em;
    line-height: 1.5;
    margin-bottom: 1em;
  }

  .read-more-link {
    display: inline-block;
    font-size: 0.9em;
    font-weight: bold;
    text-decoration: none;
    color: var(--global-link-color, #2a76dd);
  }

  .read-more-link:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    .recent-posts-container {
      flex-direction: column;
    }

    .recent-post-item {
      flex: 1 1 100%;
    }
  }
</style>
