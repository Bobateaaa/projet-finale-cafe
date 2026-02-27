# new THREE.Scene();
/Créer un scene 3d

# new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);

fov	
The vertical field of view.
Default is 50.

aspect	
The aspect ratio.
Default is 1.

near	
The camera's near plane.
Default is 0.1.

far	
The camera's far plane.
Default is 2000.

Au lieu d'une caméra normale en utilisant new THREE.Camera, on utilise celui-ci car elle imite la manière dont les humains voient.


# new THREE.WebGLRenderer
Le WebGLRenderer est le "moteur de dessin" qui convertit ta scène 3D en pixels affichés à l'écran.

Il utilise WebGL (une API graphique) pour faire le rendu et s'appuie sur le GPU pour des performances rapides.

Transforme la scene -> en pixel pour l'afficher
 

# new EffectComposer
Utilisé pour implémenter des effets de post-traitement en three.js. Cette classe gère une chaîne de passes de post-traitement pour produire le résultat visuel final.

## Points clés:
- Les passes de post-traitement sont exécutées dans **l'ordre de leur ajout**
- La dernière pass est **automatiquement rendue à l'écran**
- Chaque pass utilise la sortie de la pass précédente comme entrée

## Structure:
*Dans notre cas*
```javascript
const composer = new EffectComposer(renderer);
composer.addPass(renderPass);        // 1ère: rendu de base de la scène
composer.addPass(bloomPass);         // 2ème: ajouter l'effet bloom
composer.addPass(pixelPass);         // 3ème: ajouter l'effet pixel
composer.addPass(colorGradingPass);  // 4ème: ajouter la correction couleur
composer.addPass(outlinePass);       // 5ème: ajouter les contours (rendu à l'écran)
```


# new RenderPass
RenderPass est la **première pass obligatoire** qui rend votre scène 3D de base.

Sans RenderPass, vous on n'a pas d'image de base à traiter. Les autres passes (bloom, pixelation, etc.) ont besoin de cette image pour fonctionner.

## Exemple:
```javascript
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);  
```

## Résumé:
- **Rend la scène** → crée l'image 3D brute
- **Autres passes** → modifient cette image (bloom, filtres, etc.)
- **Résultat final** → affiche à l'écran

### La différence:
- **WebGLRenderer**: Rend directement scene → écran
- **EffectComposer**: Un **système de passes** (filtres chaînés)
- **RenderPass**: Une pass qui dit "rends la scene" dans cette chaîne



 



