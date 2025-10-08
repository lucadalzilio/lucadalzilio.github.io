---
layout: archive
title: "Group"
permalink: /group/
author_profile: true
---

Welcome to the Computational Geophysics Lab at NTU Singapore, where we explore the lithosphere deformation, physics of earthquakes, underground flow, and geoenergy systems.

<div class="slider">
  <div class="slides">
    <img src="{{ site.baseurl }}/images/group1.jpeg" alt="CGL Group 1" />
    <img src="{{ site.baseurl }}/images/group2.jpeg" alt="CGL Group 2" />
    <img src="{{ site.baseurl }}/images/group3.jpeg" alt="CGL Group 3" />
    <!-- Add more if needed -->
  </div>
  <button class="prev">&#10094;</button>
  <button class="next">&#10095;</button>
</div>

<style>
.slider {
  position: relative;
  max-width: 100%;
  margin-bottom: 2em;
  overflow: hidden;
}

.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.slides img {
  width: 100%;
  flex-shrink: 0;
}

button.prev, button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255,255,255,0.7);
  border: none;
  font-size: 2em;
  cursor: pointer;
  z-index: 100;
  padding: 0 10px;
}

button.prev { left: 10px; }
button.next { right: 10px; }
</style> 
<script>
  let currentIndex = 0;
  const slides = document.querySelector('.slides');
  const images = document.querySelectorAll('.slides img');
  const totalSlides = images.length;

  function showSlide(index) {
    slides.style.transform = 'translateX(' + (-index * 100) + '%)';
  }

  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
    showSlide(currentIndex);
  });

  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  });
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
