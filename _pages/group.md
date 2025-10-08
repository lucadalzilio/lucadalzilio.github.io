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
  </div>
  <button class="prev">&#10094;</button>
  <button class="next">&#10095;</button>
</div>

<style>
.slider {
  position: relative;
  max-width: 800px;
  margin: 2em auto;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* slides container will be sized dynamically in JS; keep flex layout */
.slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

/* each image must take the full slider viewport width */
.slides img {
  width: 100%;
  height: auto;
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 4px;
  display: block;
}

button.prev, button.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255,255,255,0.8);
  border: none;
  font-size: 2em;
  cursor: pointer;
  z-index: 10;
  padding: 0 10px;
  border-radius: 50%;
}

button.prev:hover,
button.next:hover {
  background-color: rgba(255,255,255,1);
}

button.prev { left: 10px; }
button.next { right: 10px; }
</style>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slides");
  const images = Array.from(document.querySelectorAll(".slides img"));
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let index = 0;

  // make the slides container wide enough to hold all images side-by-side
  slides.style.width = `${images.length * 100}%`;
  // set each image to the correct proportional width
  images.forEach(img => {
    img.style.width = `${100 / images.length}%`;
  });

  function updateSlider() {
    slides.style.transform = `translateX(-${index * (100 / images.length)}%)`;
  }

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length;
    updateSlider();
  });

  // initialize
  updateSlider();
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
