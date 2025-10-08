---
layout: archive
title: "Group"
permalink: /group/
author_profile: true
---

Welcome to the Computational Geophysics Lab at NTU Singapore, where we explore the lithosphere deformation, physics of earthquakes, underground flow, and geoenergy systems.

<div id="group-slideshow" style="position: relative; max-width: 100%; margin-bottom: 2em;">
  <img id="group-photo" src="{{ site.baseurl }}/images/group1.jpg" style="width: 100%; border-radius: 5px;" />
  
  <button onclick="prevPhoto()" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); font-size: 24px;">&#10094;</button>
  <button onclick="nextPhoto()" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); font-size: 24px;">&#10095;</button>
</div>

<script>
  const photos = [
    "{{ site.baseurl }}/images/group1.jpg",
    "{{ site.baseurl }}/images/group2.jpg",
    "{{ site.baseurl }}/images/group3.jpg"
  ];

  let current = 0;
  const photoElement = document.getElementById("group-photo");

  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    photoElement.src = photos[current];
  }

  function nextPhoto() {
    showPhoto(current + 1);
  }

  function prevPhoto() {
    showPhoto(current - 1);
  }

  // Auto-slide every 5 seconds
  setInterval(nextPhoto, 5000);
</script>

## Research Fellows

- Dr. Giuseppe Petrillo  
- Dr. Eyup Sopaci  
- Dr. Ignatius Ryan Pranantyo  

## PhD Students

- Zhenhuan Wang (2024–2028)  
- Lewis Edmond-Lovell (2024–2028)  
- Wenzhi Zhao (2025–2029)  

## Visiting

- Shupeng Chai, Hong Kong Polytechnic University (2025-2026) 
- Yajin Pang, China Earthquake Administration, Tianjin, China (2025) 
- Han Chen, China Earthquake Administration, Beijing, China (2024-2025)  
