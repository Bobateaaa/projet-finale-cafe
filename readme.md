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

.load( url : string, onLoad : function, onProgress : onProgressCallback, onError : onErrorCallback )
Starts loading from the given URL and passes the loaded glTF asset to the onLoad() callback.

url	
The path/URL of the file to be loaded. This can also be a data URI.

onLoad	
Executed when the loading process has been finished.

onProgress	
Executed while the loading is in progress.

onError	
Executed when errors occur.

Overrides: Loader#load


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

## new THREE.Box3()

Represents an axis-aligned bounding box (AABB) in 3D space.

Constructor
new Box3( min : Vector3, max : Vector3 )
Constructs a new bounding box.

min	
A vector representing the lower boundary of the box.

Default is (Infinity,Infinity,Infinity).

max	
A vector representing the upper boundary of the box.

Default is (-Infinity,-Infinity,-Infinity).

#### Method
.setFromObject( object : Object3D, precise : boolean ) : Box3
Computes the world-axis-aligned bounding box for the given 3D object (including its children), accounting for the object's, and children's, world transforms. The function may result in a larger box than strictly necessary.

object	
The 3D object to compute the bounding box for.

precise	
If set to true, the method computes the smallest world-axis-aligned bounding box at the expense of more computation.

Default is false.

Returns: A reference to this bounding box.


.getCenter( target : Vector3 ) : Vector3
Returns the center point of this box.

target	
The target vector that is used to store the method's result.

Returns: The center point.


## Vector3
Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y and z), which can be used to represent a number of things, such as:

A point in 3D space.
A direction and length in 3D space. In three.js the length will always be the Euclidean distance(straight-line distance) from (0, 0, 0) to (x, y, z) and the direction is also measured from (0, 0, 0) towards (x, y, z).
Any arbitrary ordered triplet of numbers.
There are other things a 3D vector can be used to represent, such as momentum vectors and so on, however these are the most common uses in three.js.

Iterating through a vector instance will yield its components (x, y, z) in the corresponding order.

const a = new THREE.Vector3( 0, 1, 0 );
//no arguments; will be initialised to (0, 0, 0)
const b = new THREE.Vector3( );
const d = a.distanceTo( b );


Constructor
new Vector3( x : number, y : number, z : number )
Constructs a new 3D vector.

x	
The x value of this vector.

Default is 0.

y	
The y value of this vector.

Default is 0.

z	
The z value of this vector.

Default is 0.

### Method

.sub( v : Vector3 ) : Vector3
Subtracts the given vector from this instance.

v	
The vector to subtract.


.getSize( target : Vector3 ) : Vector3
Returns the dimensions of this box.

target	
The target vector that is used to store the method's result.

Returns: The size.


## TextureLoader
Class for loading textures. Images are internally loaded via ImageLoader.

Please note that TextureLoader has dropped support for progress events in r84. For a TextureLoader that supports progress events, see this thread.

Code Example
const loader = new THREE.TextureLoader();
const texture = await loader.loadAsync( 'textures/land_ocean_ice_cloud_2048.jpg' );
const material = new THREE.MeshBasicMaterial( { map:texture } );

Constructor
new TextureLoader( manager : LoadingManager )
Constructs a new texture loader.

manager	
The loading manager.

Methods
.load( url : string, onLoad : function, onProgress : onProgressCallback, onError : onErrorCallback ) : Texture
Starts loading from the given URL and pass the fully loaded texture to the onLoad() callback. The method also returns a new texture object which can directly be used for material creation. If you do it this way, the texture may pop up in your scene once the respective loading process is finished.

url	
The path/URL of the file to be loaded. This can also be a data URI.

onLoad	
Executed when the loading process has been finished.

onProgress	
Unsupported in this loader.

onError	
Executed when errors occur.

Overrides: Loader#load
Returns: The texture.


## Texture 

#### Method
.magFilter : NearestFilter | NearestMipmapNearestFilter | NearestMipmapLinearFilter | LinearFilter | LinearMipmapNearestFilter | LinearMipmapLinearFilter
How the texture is sampled when a texel covers more than one pixel.


.minFilter : NearestFilter | NearestMipmapNearestFilter | NearestMipmapLinearFilter | LinearFilter | LinearMipmapNearestFilter | LinearMipmapLinearFilter
How the texture is sampled when a texel covers less than one pixel.



## BufferGeometry
A representation of mesh, line, or point geometry. Includes vertex positions, face indices, normals, colors, UVs, and custom attributes within buffers, reducing the cost of passing all this data to the GPU.

Code Example
const geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2
	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );
// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry, material );

Constructor
new BufferGeometry()
Constructs a new geometry.



## ShaderMaterial
A material rendered with custom shaders. A shader is a small program written in GLSL. that runs on the GPU. You may want to use a custom shader if you need to implement an effect not included with any of the built-in materials.

There are the following notes to bear in mind when using a ShaderMaterial:

ShaderMaterial can only be used with WebGLRenderer.
Built in attributes and uniforms are passed to the shaders along with your code. If you don't want that, use RawShaderMaterial instead.
You can use the directive #pragma unroll_loop_start and #pragma unroll_loop_end in order to unroll a for loop in GLSL by the shader preprocessor. The directive has to be placed right above the loop. The loop formatting has to correspond to a defined standard.
The loop has to be normalized.
The loop variable has to be i.
The value UNROLLED_LOOP_INDEX will be replaced with the explicitly value of i for the given iteration and can be used in preprocessor statements.