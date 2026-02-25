const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pointer Lock (Mouse Look)
const controls = new THREE.PointerLockControls(camera, document.body);

document.body.addEventListener('click', () => {
  controls.lock();
});

scene.add(controls.getObject());

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444);
light.position.set(0, 200, 0);
scene.add(light);

// Floor
const floorGeometry = new THREE.PlaneGeometry(200, 200);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Random boxes (like Krunker map)
for (let i = 0; i < 30; i++) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff
    })
  );

  box.position.set(
    (Math.random() - 0.5) * 100,
    1.5,
    (Math.random() - 0.5) * 100
  );

  scene.add(box);
}

// Movement
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keys = {};

document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

function animate() {
  requestAnimationFrame(animate);

  direction.z = Number(keys["KeyW"]) - Number(keys["KeyS"]);
  direction.x = Number(keys["KeyD"]) - Number(keys["KeyA"]);
  direction.normalize();

  if (keys["KeyW"] || keys["KeyS"])
    controls.moveForward(direction.z * 0.3);

  if (keys["KeyA"] || keys["KeyD"])
    controls.moveRight(direction.x * 0.3);

  renderer.render(scene, camera);
}

animate();