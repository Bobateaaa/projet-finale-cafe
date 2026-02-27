import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// POST-PROCESSING: importer les passes nécessaires pour les effets visuels pour traitement du rendu de la scène
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';



// ============================================
// Variables 
// ============================================
const zoomLevel = 0.1; // controler le zoom
const startingScreen = document.getElementById('starting-screen'); // référence à l'écran de démarrage
const enterBtn = document.getElementById('enter-btn'); // référence au bouton pour entrer dans le café



// ============================================
// Initialisation de la scène 3D
// ============================================

//Au clic le bouton le splash screen disparaît
enterBtn.addEventListener('click', () => {
  startingScreen.classList.add('hidden');
});

//Initalisation de la scène etde la caméra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//-------------------------------
// Section: Post-traitement
//
// - UnrealBloomPass pour un effet de lueur douce
// - PixelPass pour un effet pixelisé/retro
// - ColorGradingPass pour ajuster la teinte et les couleurs
// - OutlinePass pour ajouter un contour
//--------------------------------


//Créer le renderer WebGL pour dessiner la scène 3D
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



// POST-PROCESSING: Initaliser EffectComposer pour gérer les passes de post-traitement 
let composer;
composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);



// POST-PROCESSING: UnrealBloomPass
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.01,  // intensité
  0.05,  // rayon
  1  // seuil
);



// POST-PROCESSING: PixelPass pour un effet pixelisé/retro
const pixelShader = {
  uniforms: {
    tDiffuse: { value: null },
    pixelSize: { value: 500.0 }  // Ajuster la taille des blocs de pixels
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float pixelSize;
    varying vec2 vUv;
    void main() {
      vec2 pixelated = floor(vUv * pixelSize) / pixelSize;
      gl_FragColor = texture2D(tDiffuse, pixelated);
    }
  `
};
const pixelPass = new ShaderPass(pixelShader);



// POST-PROCESSING: ColorGradingPass pour ajuster la teinte et les couleurs
const colorGradingShader = {
  uniforms: {
    tDiffuse: { value: null },
    saturation: { value: 1.1 },          // 0 = grayscale, 1 = normal, 2 = hypersaturated
    brightness: { value: 1.2 },          // 0 = black, 1 = normal, 2 = bright
    contrast: { value: 0.6 },           // 0 = gray, 1 = normal, 2 = high contrast
    highlightTint: { value: new THREE.Vector3(1.0, 0.85, 0.90) },  // Light pinkish for bright tones
    shadowTint: { value: new THREE.Vector3(1.0, 0.95, 0.98) }    // Subtle pink for dark tones
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float saturation;
    uniform float brightness;
    uniform float contrast;
    uniform vec3 highlightTint;
    uniform vec3 shadowTint;
    varying vec2 vUv;
    
    void main() {
      vec4 texColor = texture2D(tDiffuse, vUv);
      vec3 col = texColor.rgb;
      
      // Convert to grayscale for saturation control
      float gray = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(gray), col, saturation);
      
      // Apply selective tinting based on brightness
      // Brighter pixels get more pink (highlightTint), darker pixels get less (shadowTint)
      float brightness_level = dot(col, vec3(0.299, 0.587, 0.114));
      vec3 tint = mix(shadowTint, highlightTint, brightness_level);
      col *= tint;
      
      // Apply brightness
      col *= brightness;
      
      // Apply contrast
      col = (col - 0.5) * contrast + 0.5;
      
      gl_FragColor = vec4(col, texColor.a);
    }
  `
};
const colorGradingPass = new ShaderPass(colorGradingShader);




// POST-PROCESSING: OutlinePass pour ajouter un contour 
let outlinePass;
outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 3.0;  // Force du contour
outlinePass.edgeThickness = 3.0; // Épaisseur du contour
outlinePass.edgeGlow = 0.4;      // Intensité de la lueur
outlinePass.pulsePeriod = 4;   // Animation de pulsation (0 = pas de pulsation)
outlinePass.visibleEdgeColor.set(0xffc0cb);  // Contour rose clair
outlinePass.hiddenEdgeColor.set(0xff69b4);   // Rose foncé pour les bords cachés


// Ajouter les passes de post-traitement à l'EffectComposer dans l'ordre souhaité
composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(pixelPass);
composer.addPass(colorGradingPass);
composer.addPass(outlinePass);

//-------------------------------
// Fin du post-processing 
//--------------------------------


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// Limites par défaut pour empêcher de regarder sous le modèle
controls.minPolarAngle = 0; // angle minimum (vue du dessus)
controls.maxPolarAngle = Math.PI / 2 - 0.05; // empêche de passer sous l'horizon
controls.enablePan = false; // désactiver le pan pour éviter de déplacer la caméra sous le modèle

//------------------------------
// Ajout de lumières pour un éclairage 
//-----------------------------
const whiteLight = new THREE.DirectionalLight(0xffffff, 2.0);
whiteLight.position.set(5, 10, 5);
scene.add(whiteLight);

const blueLight = new THREE.DirectionalLight(0xffb3c1, 1.5);  // Soft pink light
blueLight.position.set(-5, 5, -10);
scene.add(blueLight);

scene.add(new THREE.AmbientLight(0x404040, 1.0));

// Animation
const clock = new THREE.Clock();
let mixer = null;


// Charger GLTF/GLB
const loader = new GLTFLoader();

// Si le GLB utilise la compression Draco, initialiser DRACOLoader.
// On pointe par défaut vers le CDN officiel Draco; changez pour un chemin local si nécessaire.
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(dracoLoader);

// MODEL
const gltfPath = '/model/cafeshop_compressed.glb';

loader.load(
  gltfPath,
  (gltf) => {
    // GLTFLoader renvoie un objet contenant `.scene` et `.animations`
    const model = gltf.scene;
    model.scale.set(1, 1, 1);

    // Centrer le modèle à l'origine
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);
    // Ajustement fin de l'origine : déplacer légèrement vers la gauche
    // (valeur en unités Three.js — changez -0.15 si vous voulez plus/moins)
    const originOffset = new THREE.Vector3(-45, -5, 0);
    model.position.add(originOffset);
    scene.add(model);

    // POST-PROCESSING: Configurer l'OutlinePass pour entourer le modèle
    const selectedObjects = [];
    model.traverse((child) => {
      if (child.isMesh) selectedObjects.push(child);
    });
    if (outlinePass && selectedObjects.length > 0) {
      outlinePass.selectedObjects = selectedObjects;
    }

    // Adapter la caméra au modèle
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= zoomLevel;
    camera.position.set(0, 0, cameraZ);
    camera.near = Math.max(0.1, cameraZ / 100);
    camera.far = cameraZ * 100;
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);

    // Verrouiller la cible des contrôles et appliquer des contraintes
    controls.target.set(0, 0, 0);
    // Interdire de passer sous l'horizon (on retire une petite marge)
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.enablePan = false;
    // Limiter les distances de zoom pour éviter d'entrer sous le modèle
    controls.minDistance = Math.max(0.1, Math.min(cameraZ * 0.2, Math.max(size.x, size.y, size.z) * 0.25));
    controls.maxDistance = cameraZ * 5;
    controls.update();

    // Jouer les animations si présentes
    if (gltf.animations && gltf.animations.length) {
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => mixer.clipAction(clip).play());
      console.log('Animations GLTF trouvées et en cours');
    }
    console.log('GLTF chargé et ajouté à la scène');
  },
  (xhr) => {
    if (xhr.total) console.log(((xhr.loaded / xhr.total) * 100).toFixed(1) + '% chargé');
  },
  (err) => console.error('Erreur de chargement GLTF:', err)
);

//-----------------------------------------------
//  Particules pétales : petites pétales de cerisier tombant
// ---------------------------------------------- 
const textureLoader = new THREE.TextureLoader();
const petalTexture = textureLoader.load('/image/pixel-art-sakura-flower.png');
petalTexture.magFilter = THREE.NearestFilter;
petalTexture.minFilter = THREE.NearestFilter;

const petalCount = 180;
const petalGeom = new THREE.BufferGeometry();
const petalPositions = new Float32Array(petalCount * 3);
const petalSizes = new Float32Array(petalCount);
const petalPhase = new Float32Array(petalCount);
const petalSpeed = new Float32Array(petalCount);
// paramètres pour mouvement de chute (sway horizontal, vitesse de chute)
const petalFallSpeed = new Float32Array(petalCount);
const petalSwaySpeed = new Float32Array(petalCount);
const petalSwayAmount = new Float32Array(petalCount);

for (let i = 0; i < petalCount; i++) {
  const x = (Math.random() - 0.5) * 300;
  const y = Math.random() * 100;
  const z = (Math.random() - 0.5) * 500;
  petalPositions[i * 3] = x;
  petalPositions[i * 3 + 1] = y;
  petalPositions[i * 3 + 2] = z;
  petalSizes[i] = 0.5 + Math.random() * 6.0;
  petalPhase[i] = Math.random() * Math.PI * 2;
  petalSpeed[i] = 0.3 + Math.random() * 0.1;
  
  // Vitesse de chute (vers le bas, négatif)
  petalFallSpeed[i] = 10 + Math.random() * 20;
  petalSwaySpeed[i] = 0.5 + Math.random() * 1.5;
  petalSwayAmount[i] = 15 + Math.random() * 30;
}

petalGeom.setAttribute('position', new THREE.BufferAttribute(petalPositions, 3));
petalGeom.setAttribute('aSize', new THREE.BufferAttribute(petalSizes, 1));
petalGeom.setAttribute('aPhase', new THREE.BufferAttribute(petalPhase, 1));
petalGeom.setAttribute('aSpeed', new THREE.BufferAttribute(petalSpeed, 1));

const petalMat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.NormalBlending,
  uniforms: { 
    uTime: { value: 0.0 },
    uTexture: { value: petalTexture }
  },
  vertexShader: `
    attribute float aSize;
    attribute float aPhase;
    attribute float aSpeed;
    varying float vPhase;
    varying float vSpeed;
    void main() {
      vPhase = aPhase;
      vSpeed = aSpeed;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * (180.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
    varying float vPhase;
    varying float vSpeed;
    void main() {
      vec4 texColor = texture2D(uTexture, gl_PointCoord);
      if (texColor.a < 0.5) discard;
      float flick = sin(uTime * vSpeed * 2.0 + vPhase) * 0.3 + 0.7;
      vec3 col = texColor.rgb;
      gl_FragColor = vec4(col, texColor.a * flick);
    }
  `
});

const petals = new THREE.Points(petalGeom, petalMat);
scene.add(petals);

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  
  // Mettre à jour les pétales de sakura
  if (typeof petals !== 'undefined' && petalGeom && petalGeom.attributes.position) {
    const pos = petalGeom.attributes.position.array;
    for (let i = 0; i < petalCount; i++) {
      const idx = i * 3;
      
      // Chute verticale
      pos[idx + 1] -= petalFallSpeed[i] * delta;
      
      // Sway horizontal sinusoïdal
      const swayX = Math.sin(clock.elapsedTime * petalSwaySpeed[i] + petalPhase[i]) * petalSwayAmount[i];
      pos[idx] += swayX * delta * 2;
      
      // Réinitialiser la position si les pétales tombent trop bas
      if (pos[idx + 1] < -100) {
        pos[idx + 1] = 100;
        pos[idx] = (Math.random() - 0.5) * 200;
        pos[idx + 2] = (Math.random() - 0.5) * 200;
      }
    }
    petalGeom.attributes.position.needsUpdate = true;
    if (petalMat && petalMat.uniforms) petalMat.uniforms.uTime.value += delta;
  }

  controls.update();
  composer.render();
}

animate();

// Gérer le redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
