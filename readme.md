# H1
## H2
### H3
#### H4
##### H5
###### H6

**bold**
*italic*
***bold italic***
~~strikethrough~~
`inline code`

- unordered item
- another item
  - nested item

1. ordered item
2. second item
   1. nested numbered

[link text](https://url.com)
![alt text](image.png)

```javascript
const x = 1;
```

> quote
> > nested quote
____________________________________________________
# Documentation sur le static.yml
Permet de deployer sur github à chaque push

# Git LFS 
Permet de gérer les gros fichiers, car Github rejet les fichier plus gros que 100mb sans le LFS






________________________________________________________

# Documentation sur Three.js

## new THREE.Scene();
Créer un scene 3d

## new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

| Paramètre | Description | Défaut |
|-----------|-------------|--------|
| `fov` | The vertical field of view | 50 |
| `aspect` | The aspect ratio | 1 |
| `near` | The camera's near plane | 0.1 |
| `far` | The camera's far plane | 2000 |

Au lieu d'une caméra normale en utilisant new THREE.Camera, on utilise celui-ci car elle imite la manière dont les humains voient.


## new THREE.WebGLRenderer
Le WebGLRenderer est le "moteur de dessin" qui convertit ta scène 3D en pixels affichés à l'écran.

Il utilise WebGL (une API graphique) pour faire le rendu et s'appuie sur le GPU pour des performances rapides.

Transforme la scene -> en pixel pour l'afficher
 

## new EffectComposer
Utilisé pour implémenter des effets de post-traitement en three.js. Cette classe gère une chaîne de passes de post-traitement pour produire le résultat visuel final.

#### Points clés:
- Les passes de post-traitement sont exécutées dans **l'ordre de leur ajout**
- La dernière pass est **automatiquement rendue à l'écran**
- Chaque pass utilise la sortie de la pass précédente comme entrée

#### Structure:
*Dans notre cas*
```javascript
const composer = new EffectComposer(renderer);
composer.addPass(renderPass);        // 1ère: rendu de base de la scène
composer.addPass(bloomPass);         // 2ème: ajouter l'effet bloom
composer.addPass(pixelPass);         // 3ème: ajouter l'effet pixel
composer.addPass(colorGradingPass);  // 4ème: ajouter la correction couleur
composer.addPass(outlinePass);       // 5ème: ajouter les contours (rendu à l'écran)
```


## new RenderPass
RenderPass est la **première pass obligatoire** qui rend votre scène 3D de base.

Sans RenderPass, vous on n'a pas d'image de base à traiter. Les autres passes (bloom, pixelation, etc.) ont besoin de cette image pour fonctionner.

#### Exemple:
```javascript
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);  
```

## new OrbitControls
Fonction qui permet de tourner, zoomer et pan.

 ```javascript
 const controls = new OrbitControls( camera, renderer.domElement );
 ```

Orbit: Left mouse / touch: one-finger move.
Zoom: Middle mouse, or mousewheel / touch: two-finger spread or squish.
Pan: Right mouse, or left mouse + ctrl/meta/shiftKey, or arrow keys / touch: two-finger move.

#### Propriété utilisées

> **1. .autoRotate** : boolean
> 
> Set to true to automatically rotate around the target.
>
> Note that if this is enabled, you must call update() in your animation loop. If you want the auto-rotate speed to be independent of the frame rate (the refresh rate of the display), you must pass the time deltaTime, in seconds, to update().
>
> Default is `false`.

> **2. .autoRotateSpeed** : number
>
> How fast to rotate around the target if autoRotate is true. The default equates to 30 seconds per orbit at 60fps.
>
> Note that if autoRotate is enabled, you must call update() in your animation loop.
>
> Default is `2`.

> **3. .enableDamping** : boolean
>
> Set to true to enable damping (inertia), which can be used to give a sense of weight to the controls. Note that if this is enabled, you must call update() in your animation loop.
>
> Default is `false`.

> **4. .enablePan** : boolean
>
> Enable or disable camera panning.
>
> Default is `true`.

> **5. .enableRotate** : boolean
>
> Enable or disable horizontal and vertical rotation of the camera.
>
> Note that it is possible to disable a single axis by setting the min and max of the minPolarAngle or minAzimuthAngle to the same value, which will cause the vertical or horizontal rotation to be fixed at that value.
>
> Default is `true`.

> **6. .enableZoom** : boolean
>
> Enable or disable zooming (dollying) of the camera.
>
> Default is `true`.

> **7. .keys** : Object
>
> This object contains references to the keycodes for controlling camera panning.
>
> ```javascript
> controls.keys = {
>   LEFT: 'ArrowLeft',    // left arrow
>   UP: 'ArrowUp',        // up arrow
>   RIGHT: 'ArrowRight',  // right arrow
>   BOTTOM: 'ArrowDown'   // down arrow
> }
> ```

> **8. .maxDistance** : number
>
> How far you can dolly out (perspective camera only).
>
> Default is `Infinity`.

> **9. .maxPolarAngle** : number
>
> How far you can orbit vertically, upper limit. Range is [0, Math.PI] radians.
>
> Default is `Math.PI`.

> **10. .maxZoom** : number
>
> How far you can zoom out (orthographic camera only).
>
> Default is `Infinity`.

> **11. .minDistance** : number
>
> How far you can dolly in (perspective camera only).
>
> Default is `0`.

> **12. .minPolarAngle** : number
>
> How far you can orbit vertically, lower limit. Range is [0, Math.PI] radians.
>
> Default is `0`.



## new DirectionalLight(); + new AmbientLight();
This light globally illuminates all objects in the scene equally.

```javascript
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
```
new DirectionalLight( color : number | Color | string, intensity : number )  
Constructs a new directional light.

| Paramètre   | Description                     | Type                         | Défaut     |
|-------------|---------------------------------|------------------------------|------------|
| `color`     | The light's color.              | `number \| Color \| string`  | `0xffffff` |
| `intensity` | The light's strength/intensity. | `number`                     | `1`        |


## Object 3D

#### Method utilisées

.add( object : Object3D ) : Object3D
Adds the given 3D object as a child to this 3D object. An arbitrary number of objects may be added. Any current parent on an object passed in here will be removed, since an object can have at most one parent.

object	
The 3D object to add.

.lookAt( x : number | Vector3, y : number, z : number )
Rotates the object to face a point in world space.

This method does not support objects having non-uniformly-scaled parent(s).

x	
The x coordinate in world space. Alternatively, a vector representing a position in world space

y	
The y coordinate in world space.

z	
The z coordinate in world space.

#### Propreté utilisées

.position : Vector3
Represents the object's local position.

Default is (0,0,0).

.scale : Vector3
Represents the object's local scale.

Default is (1,1,1).

.visible : boolean
When set to true, the 3D object gets rendered.

Default is true.

## .set(); (METHOD)

Utilisées à travers une varitété de fonction afin d'assignés des valeurs.


## GLTFLoader
A loader for the glTF 2.0 format.

glTF (GL Transmission Format) is an open format specification whenever possible. Be advised that image bitmaps are not automatically GC-collected when they are no longer referenced, and they require special handling during the disposal process.

#### Constructor
new GLTFLoader( manager : LoadingManager )
Constructs a new glTF loader.

manager	
The loading manager.

```JAVASCRIPT
const loader = new GLTFLoader();
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
const gltf = await loader.loadAsync( 'models/gltf/duck/duck.gltf' );
scene.add( gltf.scene );
```

 #### Method 

 .setDRACOLoader( dracoLoader : DRACOLoader ) : GLTFLoader
Sets the given Draco loader to this loader. Required for decoding assets compressed with the KHR_draco_mesh_compression extension.

## dracoLoader	
The Draco loader to set.

Returns: A reference to this loader.

DRACOLoader
A loader for the Draco format.

Draco is an open source library for compressing and decompressing 3D meshes and point clouds. Compressed geometry can be significantly smaller, at the cost of additional decoding time on the client device.

Standalone Draco files have a .drc extension, and contain vertex positions, normals, colors, and other attributes. Draco files do not contain materials, textures, animation, or node hierarchies – to use these features, embed Draco geometry inside of a glTF file. A normal glTF file can be converted to a Draco-compressed glTF file using glTF-Pipeline. When using Draco with glTF, an instance of DRACOLoader will be used internally by GLTFLoader.

It is recommended to create one DRACOLoader instance and reuse it to avoid loading and creating multiple decoder instances.

DRACOLoader will automatically use either the JS or the WASM decoding library, based on browser capabilities.

Code Example