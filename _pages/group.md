---
layout: archive
title: "Group"
permalink: /group/
author_profile: true
---

Welcome to the Computational Geophysics Lab at NTU Singapore, where we explore the lithosphere deformation, physics of earthquakes, underground flow, and geoenergy systems.

<div style="width:100%; margin-bottom: 2em;">
  <img id="group-slideshow" src="{{ site.baseurl }}/images/group1.jpeg" alt="CGL Group Photo" style="width:100%; transition: opacity 0.5s ease-in-out;">
</div>

<script>
  const images = [
    "{{ site.baseurl }}/images/group1.jpeg",
    "{{ site.baseurl }}/images/group2.jpeg",
    "{{ site.baseurl }}/images/group3.jpeg"
  ];

  let currentIndex = 0;
  const imgElement = document.getElementById("group-slideshow");

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    imgElement.style.opacity = 0;
    setTimeout(() => {
      imgElement.src = images[currentIndex];
      imgElement.style.opacity = 1;
    }, 300);
  }, 5000); // change every 5 seconds
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
