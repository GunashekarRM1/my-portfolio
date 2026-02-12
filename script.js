/* ================================
   THREE.JS SCENE SETUP
================================ */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

/* ================================
   PARTICLES
================================ */
const geometry = new THREE.BufferGeometry();
const particles = 1800;
const positions = new Float32Array(particles * 3);

for (let i = 0; i < particles * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 320;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  color: 0x88ffff,
  size: 0.9,
  transparent: true,
  opacity: 0.75,
  depthWrite: false
});

const points = new THREE.Points(geometry, material);
scene.add(points);

/* ================================
   MOUSE-TILT CAMERA (DEPTH SYNC)
================================ */
let mouseX = 0, mouseY = 0;

window.addEventListener('mousemove', e => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

/* ================================
   SCROLL VELOCITY (SMART PARALLAX)
================================ */
let lastScroll = 0;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  scrollVelocity = current - lastScroll;
  lastScroll = current;
});

/* ================================
   CINEMATIC LOOP
================================ */
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.0015;

  points.rotation.y = time * 0.6;
  points.rotation.x = time * 0.3;

  camera.position.z = 30 + Math.sin(time * 2) * 0.6;
  camera.position.x += (mouseX * 1.4 - camera.position.x) * 0.05;
  camera.position.y += (-mouseY * 1.2 - camera.position.y) * 0.05;

  renderer.render(scene, camera);
}

animate();

/* ================================
   RESIZE
================================ */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ================================
   SCROLL REVEAL (CARDS)
================================ */
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

/* ================================
   IMAGE PARALLAX (SCROLL SPEED SYNC)
================================ */
window.addEventListener('scroll', () => {
  document.querySelectorAll('.card-image').forEach(img => {
    img.style.transform = `translateY(${scrollVelocity * 0.12}px)`;
  });
});

/* ================================
   SUBTLE HAPTIC SOUND (APPLE-STYLE)
================================ */
const hoverSound = new Audio(
  'https://assets.mixkit.co/sfx/preview/mixkit-soft-click-1123.mp3'
);
hoverSound.volume = 0.15;

document.querySelectorAll('.card, .skills-grid span, .contact-row')
  .forEach(el => {
    el.addEventListener('mouseenter', () => {
      hoverSound.currentTime = 0;
      hoverSound.play();
    });
  });

/* ================================
   TECH SVG ICONS
================================ */
const techIcons = {
  Angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  ".NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
};

document.querySelectorAll('.skills-grid span').forEach(skill => {
  const icon = techIcons[skill.innerText.trim()];
  if (icon) {
    skill.style.backgroundImage = `url(${icon})`;
    skill.style.backgroundRepeat = 'no-repeat';
    skill.style.backgroundPosition = 'top 16px right 16px';
    skill.style.backgroundSize = '28px';
  }
});
