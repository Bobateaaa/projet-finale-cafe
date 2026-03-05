//importer les modules nécessaires de Three.js et les loaders pour charger les modèles 3D
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

// MODEL - use BASE_URL for proper path in both dev and production
const gltfPath = import.meta.env.BASE_URL + 'model/cafeshop_compressed.glb';



// ============================================
// Initialisation de la scène 3D
// ============================================

//créez la scène et la caméra
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

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
    contrast: { value: 0.7 },           // 0 = gray, 1 = normal, 2 = high contrast
    highlightTint: { value: new THREE.Vector3(1.0, 1, 1) },  // Light pinkish for bright tones
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
controls.enablePan = false; //empecher le déplacement latéral

// Limites par défaut pour empêcher de regarder sous le modèle
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI / 2 ; 
controls.minDistance = 1;
controls.maxDistance = 140;
controls.autoRotate = true; //permet la cam du tourner automatiquement
controls.autoRotateSpeed = -0.17; //assigner la vitesse de rotation de autoRotate


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




/*------------------------------
 Charger le modèle GLTF/GLB 
 loader.load(gltfPath, onLoad, onProgress, onError)


 @param {string} gltfPath - chemin vers le fichier GLTF/GLB
 @param {function} onLoad - callback appelé une fois le modèle chargé avec le paramètre gltf (le modèle chargé)
 @param {function} onProgress - callback appelé pendant le chargement avec le paramètre progress (progression du chargement)
 @param {function} onError - callback appelé si une erreur de chargement se produit avec le paramètre error (l'erreur rencontrée)
----------------------------- */
loader.load(
  gltfPath,
  //OnLoad callback: une fois le modèle chargé, on l'ajoute à la scène et on configure la caméra
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(model); // Calculer la boîte englobante du modèle pour le centrer et ajuster la caméra
    const center = box.getCenter(new THREE.Vector3()); //Returne le centre de la boite sous forme de Vector3
    model.position.sub(center); // Centrer le modèle en soustrayant le centre de sa position
    const originOffset = new THREE.Vector3(0, -5, 0); //Variable de decalage pour ajuster la position verticale du modèle
    model.position.add(originOffset); // Appliquer le décalage pour ajuster la position verticale du modèle
    scene.add(model); // Ajouter le modèle à la scène



    const selectedObjects = []; //array pour stocker les objets sélectionnés pour l'OutlinePass

    /* Parcourir tous les enfants du modèle et ajouter les meshes à selectedObjects pour l'OutlinePass
    
    @param {THREE.Object3D} child - chaque enfant du modèle parcouru
    */
    model.traverse((child) => {
      // Si l'enfant est un mesh, l'ajouter à selectedObjects pour qu'il soit affecté par l'OutlinePass
      if (child.isMesh) selectedObjects.push(child);
    });

    // Assigner les objets sélectionnés à l'OutlinePass pour qu'ils soient entourés d'un contour
    outlinePass.selectedObjects = selectedObjects;



    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.max(120, Math.abs(maxDim / 2 / Math.tan(fov / 2))); // Distance dynamique avec minimum de sécurité

    const lookTarget = new THREE.Vector3(0, 0, 0);
    camera.position.set(0, lookTarget.y, cameraZ); // Même hauteur que la cible => vue horizontale
    camera.updateProjectionMatrix(); // Mettre à jour la matrice de projection de la caméra après avoir modifié sa position
    camera.lookAt(lookTarget); // Orienter la caméra vers le centre de la scène

    controls.target.copy(lookTarget);
    controls.update(); // Mettre à jour les contrôles pour refléter la nouvelle position de la caméra

    console.log('GLTF chargé et ajouté à la scène'); //retourne que le modèle a été chargé et ajouté à la scène
  },
  //OnProgress callback: afficher la progression du chargement dans la console
  (progress) => {
    console.log('Chargement:', (progress.loaded / progress.total * 100).toFixed(1) + '%'); // Afficher la progression du chargement en pourcentage dans la console
  },
  //OnError callback: afficher une erreur si le chargement échoue
  (error) => {
    console.error('Erreur de chargement GLTF:', error); // Afficher une erreur dans la console si le chargement du modèle échoue
  }
); 


//=========================================================
//  Particules pétales : petites pétales de cerisier tombant
//=========================================================
const textureLoader = new THREE.TextureLoader();
// Charger la texture des pétales (sprite pixel-art)
const petalTexture = textureLoader.load(import.meta.env.BASE_URL + 'image/pixel-art-sakura-flower.png');
// Garder un rendu net (non flou) pour le style pixel-art
petalTexture.magFilter = THREE.NearestFilter;
petalTexture.minFilter = THREE.NearestFilter; 

// Nombre total de particules pétales affichées
const petalCount = 180;
const petalGeom = new THREE.BufferGeometry(); // BufferGeometry pour stocker les données des pétales (positions, tailles, phases, vitesses) de manière efficace pour le GPU

//Float32Array = stockage brut des nombres, puis BufferGeometry/BufferAttribute l’utilisent pour le rendu.
// Chaque tableau contient un paramètre par pétale (sauf positions: x,y,z donc *3)
const petalPositions = new Float32Array(petalCount * 3);
const petalBaseX = new Float32Array(petalCount);
const petalSizes = new Float32Array(petalCount);
const petalPhase = new Float32Array(petalCount);
const petalSpeed = new Float32Array(petalCount);
// paramètres pour mouvement de chute (sway horizontal, vitesse de chute)
const petalFallSpeed = new Float32Array(petalCount);
const petalSwaySpeed = new Float32Array(petalCount);
const petalSwayAmount = new Float32Array(petalCount);

// Initialiser les données des pétales avec des positions aléatoires, des tailles, des phases et des vitesses pour créer un effet de chute 
for (let i = 0; i < petalCount; i++) {
  const x = (Math.random() - 0.5) * 350;
  const y = Math.random() * 100;
  const z = (Math.random() - 0.5) * 500;
  petalBaseX[i] = x;
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

const petalPositionAttribute = new THREE.BufferAttribute(petalPositions, 3); // Créer un BufferAttribute pour les positions des pétales, avec 3 composantes par pétale (x, y, z)
petalPositionAttribute.setUsage(THREE.DynamicDrawUsage); // Indiquer que les positions seront mises à jour fréquemment pour permettre l'animation de chute des pétales
petalGeom.setAttribute('position', petalPositionAttribute); // Ajouter les positions des pétales à la géométrie en tant qu'attribut "position"
// Attributs custom lus dans le shader (taille + vitesse)
petalGeom.setAttribute('aSize', new THREE.BufferAttribute(petalSizes, 1)); // Ajouter les tailles des pétales à la géométrie en tant qu'attribut "aSize"géométrie en tant qu'attribut "aPhase"
petalGeom.setAttribute('aPhase', new THREE.BufferAttribute(petalPhase, 1)); // Ajouter la phase de scintillement pour chaque pétale
petalGeom.setAttribute('aSpeed', new THREE.BufferAttribute(petalSpeed, 1)); //Ajouter les vitesses des pétales à la géométrie en tant qu'attribut "aSpeed" 

// Matériau shader:
// - vertexShader: gère la position et la taille des points (pétales) en fonction de leur distance à la caméra pour un rendu correct en perspective, et transmet les phases et vitesses aux shaders de fragment pour l'animation du scintillement
// - fragmentShader: gere la couleur et la transparence des pétales, applique un effet de scintillement basé sur le temps et les vitesses individuelles pour donner vie aux pétales qui tombent
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
  // Boucle de rendu (appelée à chaque frame)
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  const elapsedTime = clock.elapsedTime;
  if (mixer) mixer.update(delta);
  
  // Mettre à jour les pétales de sakura
  const pos = petalPositionAttribute.array;
  for (let i = 0; i < petalCount; i++) {
    // Gerer les 3 composantes de position (x, y, z) pour chaque pétale
    const idx = i * 3;

    // Chute verticale
    pos[idx + 1] -= petalFallSpeed[i] * delta;

    // Sway horizontal sinusoïdal autour d'une base fixe (pas de dérive)
    pos[idx] = petalBaseX[i] + Math.sin(elapsedTime * petalSwaySpeed[i] + petalPhase[i]) * petalSwayAmount[i];

    // Réinitialiser la position si les pétales tombent trop bas
    if (pos[idx + 1] < -100) {
      // Recycle le pétale en haut pour créer une chute continue
      pos[idx + 1] = 100;
      petalBaseX[i] = (Math.random() - 0.5) * 350;
      pos[idx] = petalBaseX[i];
      pos[idx + 2] = (Math.random() - 0.5) * 200;
    }
  }
  // Indiquer à Three.js d'envoyer les nouvelles positions au GPU
  petalPositionAttribute.needsUpdate = true;
  // Fait avancer le temps du shader (scintillement)
  if (petalMat && petalMat.uniforms) petalMat.uniforms.uTime.value += delta;

  controls.update();
  composer.render();
}

animate();

/* Gérer le redimensionnement de la fenêtre
- Met à jour l'aspect ratio de la caméra pour correspondre à la nouvelle taille de la fenêtre
- Met à jour la matrice de projection de la caméra pour que les objets soient rendus correctement avec le nouvel aspect ratio
- Met à jour la taille du renderer pour qu'elle corresponde à la nouvelle taille de la fenêtre
@param {Event} resize - l'événement de redimensionnement de la fenêtre
*/

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});
