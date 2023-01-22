---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

All papers can be downloaded by clicking on the pdf symbol beneath them.

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
