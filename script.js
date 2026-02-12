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

geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

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
   ANIMATION – CINEMATIC
================================ */
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.0015;

  // Slow cinematic particle movement
  points.rotation.y = time * 0.6;
  points.rotation.x = time * 0.3;

  // Camera breathing (video feel)
  camera.position.z = 30 + Math.sin(time * 2) * 0.6;
  camera.position.x = Math.sin(time) * 0.4;
  camera.position.y = Math.cos(time * 1.3) * 0.3;

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
