import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/FBXLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0x404040));

// Animation
const clock = new THREE.Clock();
let mixer = null;

// FBX loader
const loader = new FBXLoader();

// Change this path if your FBX is elsewhere inside `public/` or served root
const fbxPath = 'model/cafeshopver.fbx';

loader.load(
  fbxPath,
  (object) => {
    // FBXLoader returns an Object3D (not a GLTF with `.scene`)
    const model = object;
    model.scale.set(1, 1, 1);

    // Center model at origin
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    scene.add(model);

    // Fit camera to model
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 2.0;
    camera.position.set(0, Math.max(1, size.y / 2), cameraZ);
    camera.near = Math.max(0.1, cameraZ / 100);
    camera.far = cameraZ * 100;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);

    // Play animations if present
    if (object.animations && object.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      object.animations.forEach((clip) => mixer.clipAction(clip).play());
      console.log('FBX animations found and playing');
    }
    console.log('FBX loaded and added to scene');
  },
  (xhr) => {
    if (xhr.total) console.log(((xhr.loaded / xhr.total) * 100).toFixed(1) + '% loaded');
  },
  (err) => console.error('FBX load error:', err)
);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
