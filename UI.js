/* ============================================
Données sur le menu avec l'utilisation d'un array et des objets

id(number): un identifiant unique pour chaque article
name(string): le nom de l'article
category(string): la catégorie à laquelle appartient l'article (ex: Boissons, Desserts, Repas)
description(string): une brève description de l'article
ingredients(array): une liste des ingrédients utilisés dans l'article
image(string): une URL vers une image de l'article
sizes(object): un objet contenant les différentes tailles disponibles et leurs prix respectifs
calories(number): le nombre de calories pour chaque portion
============================================*/ 
const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Boissons',
    description: 'Un classique intense et savoureux',
    ingredients: ['Café arabica torréfié', 'Eau filtrée sous pression'],
    image: '',
    sizes: { 'Petit (250ml)': 2.50, 'Moyen (350ml)': 3.00, 'Grand (450ml)': 3.50 },
    calories: 3
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Boissons',
    description: 'Mélange parfait de café et mousse',
    ingredients: ['Espresso double', 'Lait entier vapeur', 'Mousse de lait crémeuse', 'Cacao en poudre (optionnel)'],
    image: '',
    sizes: { 'Petit (250ml)': 3.50, 'Moyen (350ml)': 4.00, 'Grand (450ml)': 4.50 },
    calories: 120
  },
  {
    id: 3,
    name: 'Latte',
    category: 'Boissons',
    description: 'Café doux avec beaucoup de lait',
    ingredients: ['Espresso', 'Lait entier chaud', 'Mousse légère', 'Sirop vanille (optionnel)'],
    image: '',
    sizes: { 'Petit (250ml)': 3.50, 'Moyen (350ml)': 4.00, 'Grand (450ml)': 4.50 },
    calories: 150
  },
  {
    id: 4,
    name: 'Croissant au beurre',
    category: 'Desserts',
    description: 'Croissant feuilleté fait maison',
    ingredients: ['Farine de blé T45', 'Beurre AOP 82% MG', 'Lait entier', 'Sucre', 'Sel', 'Levure boulangère', 'Œuf (dorure)'],
    image: '',
    sizes: { 'Unité': 2.80 },
    calories: 270
  },
  {
    id: 5,
    name: 'Pain au chocolat',
    category: 'Desserts',
    description: 'Chocolat riche et pâte fondante',
    ingredients: ['Pâte feuilletée levée', 'Beurre', 'Bâtons de chocolat noir 55%', 'Sucre', 'Sel', 'Levure', 'Œuf'],
    image: '',
    sizes: { 'Unité': 2.50 },
    calories: 290
  },
  {
    id: 6,
    name: 'Tarte aux pommes',
    category: 'Desserts',
    description: 'Pommes fraîches et pâte croustillante',
    ingredients: ['Pommes Golden', 'Pâte brisée (farine, beurre, eau)', 'Compote de pommes', 'Sucre roux', 'Cannelle', 'Nappage abricot', 'Beurre'],
    image: '',
    sizes: { 'Part': 3.80, 'Tarte entière': 12.00 },
    calories: 320
  },
  {
    id: 7,
    name: 'Salade césar classique',
    category: 'Repas',
    description: 'Laitue croustillante et sauce maison',
    ingredients: ['Laitue romaine', 'Parmesan reggiano', 'Croûtons à l\'ail', 'Poulet grillé', 'Sauce César (jaune d\'œuf, anchois, ail, moutarde, huile d\'olive, citron)', 'Poivre noir'],
    image: '',
    sizes: { 'Regular': 7.50, 'Large': 9.50 },
    calories: 280
  },
  {
    id: 8,
    name: 'Sandwich club',
    category: 'Repas',
    description: 'Triple étage savoureux',
    ingredients: ['Pain de mie toasté', 'Blanc de poulet grillé', 'Bacon croustillant', 'Laitue iceberg', 'Tomate fraîche', 'Œuf dur', 'Mayonnaise maison', 'Moutarde de Dijon'],
    image: '/image/sandwich.jpg',
    sizes: { 'Demi': 6.50, 'Entier': 9.00 },
    calories: 450
  },
  {
    id: 9,
    name: 'Jus d\'orange frais',
    category: 'Boissons',
    description: 'Pressé à froid chaque matin',
    ingredients: ['Oranges Valencia fraîches', 'Pulpe naturelle'],
    image: '/image/jus-orange.jpg',
    sizes: { 'Petit (250ml)': 3.00, 'Moyen (350ml)': 4.20, 'Grand (450ml)': 5.40 },
    calories: 100
  },
  {
    id: 10,
    name: 'Smoothie fraise-banane',
    category: 'Boissons',
    description: 'Frais et protéiné',
    ingredients: ['Fraises fraîches', 'Banane mûre', 'Yaourt grec nature', 'Lait d\'amande', 'Miel d\'acacia', 'Graines de chia'],
    image: '/image/smoothie.jpg',
    sizes: { 'Petit (250ml)': 4.00, 'Moyen (350ml)': 4.50, 'Grand (450ml)': 5.50 },
    calories: 180
  },
  {
    id: 11,
    name: 'Strawberry horchata',
    category: 'Boissons',
    description: 'Horchata crémeuse à la fraise, douce et rafraîchissante',
    ingredients: ['Riz blanc trempé', 'Eau', 'Lait concentré', 'Cannelle en bâton', 'Extrait de vanille', 'Fraises fraîches', 'Sucre', 'Amandes'],
    image: '',
    sizes: { 'Petit (250ml)': 4.30, 'Moyen (350ml)': 4.80, 'Grand (450ml)': 5.80 },
    calories: 210
  },
  {
    id: 12,
    name: 'Citron yuzu tea',
    category: 'Boissons',
    description: 'Thé glacé agrumé au yuzu et citron',
    ingredients: ['Thé vert sencha', 'Marmelade de yuzu', 'Jus de citron frais', 'Miel', 'Zeste de citron', 'Eau chaude', 'Glaçons'],
    image: '',
    sizes: { 'Petit (250ml)': 3.80, 'Moyen (350ml)': 4.20, 'Grand (450ml)': 5.20 },
    calories: 95
  },
  {
    id: 13,
    name: 'Tiramisu cold brew',
    category: 'Boissons',
    description: 'Cold brew gourmand inspiré du tiramisu',
    ingredients: ['Cold brew 12h', 'Mascarpone', 'Crème fouettée', 'Sirop de vanille', 'Poudre de cacao amer', 'Biscuits savoiardi émiettés', 'Sucre muscovado'],
    image: '',
    sizes: { 'Petit (250ml)': 4.70, 'Moyen (350ml)': 5.20, 'Grand (450ml)': 6.20 },
    calories: 190
  },
  {
    id: 14,
    name: 'Passion lychee capiroska',
    category: 'Boissons',
    description: 'Mocktail tropical au fruit de la passion et litchi',
    ingredients: ['Pulpe de fruit de la passion', 'Litchis en sirop', 'Jus de citron vert', 'Sirop de sucre de canne', 'Eau pétillante', 'Feuilles de menthe', 'Glaçons pilés'],
    image: '',
    sizes: { 'Petit (250ml)': 4.60, 'Moyen (350ml)': 5.00, 'Grand (450ml)': 5.60 },
    calories: 120
  },
  {
    id: 15,
    name: 'Milkshake aux pêches',
    category: 'Boissons',
    description: 'Milkshake pêche onctueux et fruité',
    ingredients: ['Pêches mûres', 'Glace vanille', 'Lait entier', 'Crème fraîche', 'Sirop de pêche', 'Chantilly'],
    image: '',
    sizes: { 'Petit (250ml)': 4.40, 'Moyen (350ml)': 4.90, 'Grand (450ml)': 5.90 },
    calories: 260
  },
  {
    id: 16,
    name: 'Lait aux bananes',
    category: 'Boissons',
    description: 'Boisson lactée coréenne à la banane',
    ingredients: ['Bananes mûres', 'Lait entier', 'Lait concentré sucré', 'Extrait de vanille', 'Sucre', 'Pincée de sel'],
    image: '',
    sizes: { 'Petit (250ml)': 3.90, 'Grand (450ml)': 5.20 },
    calories: 170
  },
  {
    id: 17,
    name: 'Hwachae',
    category: 'Boissons',
    description: 'Punch coréen aux fruits frais et soda léger',
    ingredients: ['Pastèque fraîche', 'Fraises', 'Kiwi', 'Raisins', 'Sirop de sucre', 'Sprite ou 7Up', 'Glaçons', 'Feuilles de menthe'],
    image: '',
    sizes: { 'Petit (250ml)': 4.80, 'Grand (450ml)': 6.20 },
    calories: 140
  },
  {
    id: 18,
    name: 'Hibiscus lemonade',
    category: 'Boissons',
    description: 'Limonade florale à l\'hibiscus',
    ingredients: ['Fleurs d\'hibiscus séchées', 'Jus de citron frais', 'Sucre de canne', 'Eau froide', 'Zeste de citron', 'Glaçons'],
    image: '',
    sizes: { 'Petit (250ml)': 3.90, 'Moyen (350ml)': 4.30, 'Grand (450ml)': 5.30 },
    calories: 105
  },
  {
    id: 19,
    name: 'Pomegranate sangria',
    category: 'Boissons',
    description: 'Sangria sans alcool à la grenade et agrumes',
    ingredients: ['Jus de grenade pur', 'Jus d\'orange', 'Jus de citron', 'Tranches d\'orange et citron', 'Grains de grenade', 'Eau pétillante', 'Sirop d\'agave', 'Cannelle'],
    image: '',
    sizes: { 'Petit (250ml)': 4.80, 'Moyen (350ml)': 5.20, 'Grand (450ml)': 5.90 },
    calories: 130
  },
  {
    id: 20,
    name: 'Watermelon spritz',
    category: 'Boissons',
    description: 'Spritz sans alcool ultra frais à la pastèque',
    ingredients: ['Pastèque fraîche mixée', 'Jus de citron vert', 'Feuilles de menthe', 'Sirop de sucre', 'Eau pétillante', 'Glaçons'],
    image: '',
    sizes: { 'Petit (250ml)': 4.40, 'Grand (450ml)': 5.40 },
    calories: 90
  },
  {
    id: 21,
    name: 'Mango pomelo sago',
    category: 'Boissons',
    description: 'Dessert-boisson asiatique à la mangue, pomelo et perles de sagou',
    ingredients: ['Mangue Alphonso', 'Chair de pomelo rose', 'Perles de sagou cuites', 'Lait de coco', 'Lait évaporé', 'Sucre', 'Glaçons'],
    image: '',
    sizes: { 'Petit (250ml)': 5.20, 'Grand (450ml)': 6.20 },
    calories: 230
  },
  {
    id: 22,
    name: 'Virgin mojito',
    category: 'Boissons',
    description: 'Mocktail menthe-citron vert classique et pétillant',
    ingredients: ['Feuilles de menthe fraîche', 'Citron vert en quartiers', 'Sucre de canne', 'Eau gazeuse', 'Glaçons pilés', 'Angostura bitters (optionnel)'],
    image: '',
    sizes: { 'Petit (250ml)': 4.10, 'Moyen (350ml)': 4.50, 'Grand (450ml)': 5.10 },
    calories: 85
  },
  {
    id: 23,
    name: 'Shirley temple',
    category: 'Boissons',
    description: 'Mocktail rétro pétillant et fruité',
    ingredients: ['Ginger ale', 'Sirop de grenadine', 'Jus de citron frais', 'Cerise au marasquin', 'Tranche d\'orange', 'Glaçons'],
    image: '',
    sizes: { 'Petit (250ml)': 3.90, 'Grand (450ml)': 4.90 },
    calories: 110
  },
  {
    id: 24,
    name: 'Nojito framboise',
    category: 'Boissons',
    description: 'Twist framboise du mojito sans alcool',
    ingredients: ['Framboises fraîches', 'Feuilles de menthe', 'Citron vert', 'Sirop de framboise', 'Eau pétillante', 'Sucre de canne', 'Glaçons'],
    image: '',
    sizes: { 'Petit (250ml)': 4.50, 'Moyen (350ml)': 4.90, 'Grand (450ml)': 5.50 },
    calories: 100
  },
  {
    id: 25,
    name: 'Crème brûlée',
    category: 'Desserts',
    description: 'Crème vanille soyeuse et croûte caramélisée',
    ingredients: ['Crème fraîche 35%', 'Jaunes d\'œufs', 'Sucre fin', 'Gousse de vanille Bourbon', 'Cassonade (pour caraméliser)'],
    image: '',
    sizes: { 'Unité': 4.80 },
    calories: 310
  },
  {
    id: 26,
    name: 'Mochi matcha',
    category: 'Desserts',
    description: 'Mochi tendre au cœur matcha',
    ingredients: ['Farine de riz gluant (mochiko)', 'Poudre de matcha Uji', 'Sucre', 'Eau', 'Fécule de maïs', 'Pâte de haricots rouges sucrée (anko)'],
    image: '',
    sizes: { '2 pièces': 4.20, '4 pièces': 7.80 },
    calories: 220
  },
  {
    id: 27,
    name: 'Panna cotta',
    category: 'Desserts',
    description: 'Dessert italien frais et léger',
    ingredients: ['Crème fraîche', 'Lait entier', 'Sucre', 'Gélatine en feuilles', 'Extrait de vanille', 'Coulis de fruits rouges (framboise, fraise, mûre)'],
    image: '',
    sizes: { 'Unité': 4.50 },
    calories: 260
  },
  {
    id: 28,
    name: 'Cheesecake yuzu',
    category: 'Desserts',
    description: 'Cheesecake crémeux avec touche d\'agrume',
    ingredients: ['Cream cheese Philadelphia', 'Jus et zeste de yuzu', 'Œufs', 'Sucre', 'Crème fraîche', 'Biscuits digestifs', 'Beurre fondu'],
    image: '',
    sizes: { 'Part': 5.20 },
    calories: 340
  },
  {
    id: 29,
    name: 'Wrap poulet',
    category: 'Repas',
    description: 'Wrap grillé au poulet et sauce maison',
    ingredients: ['Tortilla de blé', 'Filet de poulet mariné grillé', 'Laitue romaine', 'Tomates cerises', 'Oignon rouge', 'Sauce yaourt-citron', 'Paprika fumé'],
    image: '',
    sizes: { 'Petit': 6.80, 'Grand': 8.90 },
    calories: 420
  },
  {
    id: 30,
    name: 'Bagel saumon',
    category: 'Repas',
    description: 'Bagel fondant au saumon fumé',
    ingredients: ['Bagel nature toasté', 'Saumon fumé sauvage', 'Cream cheese', 'Câpres', 'Oignon rouge émincé', 'Concombre', 'Aneth frais', 'Jus de citron'],
    image: '',
    sizes: { 'Unité': 8.50 },
    calories: 390
  },
  {
    id: 31,
    name: 'Croque truffe',
    category: 'Repas',
    description: 'Croque gourmet au fromage et truffe',
    ingredients: ['Pain de mie brioché', 'Gruyère râpé', 'Comté AOP', 'Crème fraîche à la truffe noire', 'Jambon blanc supérieur', 'Beurre', 'Huile de truffe'],
    image: '',
    sizes: { 'Unité': 9.20 },
    calories: 470
  },
  {
    id: 32,
    name: 'Bowl falafel',
    category: 'Repas',
    description: 'Bowl végétarien frais et croustillant',
    ingredients: ['Falafels maison (pois chiches, persil, coriandre, cumin)', 'Quinoa', 'Concombre', 'Tomates', 'Chou rouge', 'Houmous', 'Sauce tahini', 'Grenade', 'Persil frais'],
    image: '',
    sizes: { 'Regular': 8.20, 'Large': 10.20 },
    calories: 430
  },
  {
    id: 33,
    name: 'Tarte tatin',
    category: 'Desserts',
    description: 'Tarte caramélisée aux pommes renversée',
    ingredients: ['Pommes Granny Smith', 'Pâte feuilletée pur beurre', 'Beurre demi-sel', 'Sucre', 'Gousse de vanille', 'Crème fraîche (service)'],
    image: '',
    sizes: { 'Part': 4.20, 'Tarte entière': 14.00 },
    calories: 330
  },
  {
    id: 34,
    name: 'Soupe tourte au poulet',
    category: 'Repas',
    description: 'Soupe crémeuse style chicken pot pie',
    ingredients: ['Poulet rôti effiloché', 'Pommes de terre', 'Carottes', 'Petits pois', 'Céleri', 'Oignon', 'Bouillon de poulet', 'Crème fraîche', 'Beurre', 'Farine', 'Thym', 'Feuilleté pour garnir'],
    image: '',
    sizes: { 'Bol': 7.20, 'Grand bol': 9.40 },
    calories: 420
  },
  {
    id: 35,
    name: 'Soupe aux champignons',
    category: 'Repas',
    description: 'Velouté onctueux aux champignons',
    ingredients: ['Champignons de Paris', 'Champignons shiitake', 'Oignon', 'Ail', 'Bouillon de légumes', 'Crème fraîche', 'Beurre', 'Thym frais', 'Persil', 'Sel et poivre'],
    image: '',
    sizes: { 'Bol': 6.50, 'Grand bol': 8.40 },
    calories: 280
  },
  {
    id: 36,
    name: 'Soupe oignon',
    category: 'Repas',
    description: 'Soupe à l\'oignon gratinée et réconfortante',
    ingredients: ['Oignons jaunes caramélisés', 'Bouillon de bœuf', 'Vin blanc sec', 'Beurre', 'Farine', 'Pain baguette grillé', 'Gruyère râpé', 'Thym', 'Feuille de laurier'],
    image: '',
    sizes: { 'Bol': 6.80, 'Grand bol': 8.80 },
    calories: 310
  },
  {
    id: 37,
    name: 'Tomate basilic',
    category: 'Repas',
    description: 'Soupe tomate-basilic douce et parfumée',
    ingredients: ['Tomates San Marzano', 'Basilic frais', 'Ail', 'Oignon', 'Bouillon de légumes', 'Crème légère', 'Huile d\'olive extra vierge', 'Sucre', 'Sel et poivre'],
    image: '',
    sizes: { 'Bol': 6.20, 'Grand bol': 8.10 },
    calories: 230
  },
  {
    id: 38,
    name: 'Minestrone',
    category: 'Repas',
    description: 'Soupe italienne aux légumes et pâtes',
    ingredients: ['Haricots blancs cannellini', 'Courgettes', 'Carottes', 'Céleri', 'Tomates concassées', 'Pâtes ditalini', 'Bouillon de légumes', 'Parmesan', 'Huile d\'olive', 'Ail', 'Romarin'],
    image: '',
    sizes: { 'Bol': 6.90, 'Grand bol': 8.90 },
    calories: 260
  },
  {
    id: 39,
    name: 'Soupe lentilles',
    category: 'Repas',
    description: 'Soupe nourrissante aux lentilles épicées',
    ingredients: ['Lentilles vertes du Puy', 'Carottes', 'Céleri', 'Oignon', 'Tomates concassées', 'Ail', 'Cumin', 'Coriandre moulue', 'Paprika', 'Bouillon de légumes', 'Jus de citron', 'Huile d\'olive'],
    image: '',
    sizes: { 'Bol': 6.40, 'Grand bol': 8.30 },
    calories: 290
  },
  {
    id: 40,
    name: 'Pho poulet',
    category: 'Repas',
    description: 'Bouillon parfumé au poulet et nouilles de riz',
    ingredients: ['Bouillon de poulet parfumé (anis étoilé, cannelle, clou de girofle)', 'Poulet poché', 'Nouilles de riz', 'Oignon grillé', 'Gingembre', 'Sauce poisson (nuoc mam)', 'Germes de soja', 'Basilic thaï', 'Coriandre', 'Citron vert', 'Piment', 'Sauce hoisin'],
    image: '',
    sizes: { 'Bol': 7.50, 'Grand bol': 9.70 },
    calories: 350
  }
];


// ============================================
// Gestion du Splash Screen
// ============================================
const startingScreen = document.getElementById('starting-screen'); // référence à l'écran de démarrage
const enterBtn = document.getElementById('enter-btn'); // référence au bouton pour entrer dans le café

//Au clic le bouton le splash screen disparaît
enterBtn.addEventListener('click', () => {
  startingScreen.classList.add('hidden');
});

// ============================================
// Gestion about me
// ============================================
const initAboutPopup = () => {
  const aboutButton = document.querySelector('.btn:nth-of-type(1)');
  const aboutOverlay = document.getElementById('about');
  const aboutCloseBtn = document.querySelector('.about-close');

  // Ouvrir le pop-up au clic du bouton
  aboutButton.addEventListener('click', () => {
    aboutOverlay.classList.add('active');
  });

  // Fermer au clic du bouton close
  aboutCloseBtn.addEventListener('click', () => {
    aboutOverlay.classList.remove('active');
  });

  // Fermer en cliquant en dehors du contenu
  aboutOverlay.addEventListener('click', (event) => {
    if (event.target === aboutOverlay) {
      aboutOverlay.classList.remove('active');
    }
  });
};

// ============================================
// Gestion menu avec catégories, détails et prix
// ============================================
const initMenuPopup = () => {
  // Références aux éléments du DOM
  const menuTrigger = document.getElementById('menu-trigger');     // Bouton pour ouvrir le menu
  const menuOverlay = document.getElementById('menu-popup');       // Fond sombre du popup
  const menuCloseBtn = document.querySelector('.menu-close');      // Bouton fermer (X)
  const searchInput = document.getElementById('menu-search');      // Champ de recherche
  const categoriesEl = document.getElementById('menu-categories'); // Conteneur des boutons catégories
  const itemsEl = document.getElementById('menu-items');           // Liste des articles
  const detailEl = document.getElementById('menu-detail');         // Panneau de détails

  // Génère un tableau de catégories uniques: ['Tous', 'Boissons', 'Desserts', 'Repas']
  // new Set() élimine les doublons, puis ... (spread) reconvertit en tableau
  const categories = ['Tous','Boissons', 'Desserts', 'Repas'];
  
  // État de l'interface - quelle catégorie est active et quel article est sélectionné
  let activeCategory = 'Tous';
  let selectedId = null;

  // Fonction pour normaliser le texte (supprime accents, minuscules)
  const normalizeText = (text) => {
    return String(text || '').toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  // Fonction principale qui met à jour tout l'affichage
  // Appelée à chaque changement (catégorie ou sélection)
  const render = () => {
    // ========== RENDU DES CATÉGORIES ==========
    // Génère les boutons de catégorie avec la classe 'active' sur celui sélectionné
    categoriesEl.innerHTML = categories.map(cat => 
      `<button class="category-btn ${cat === activeCategory ? 'active' : ''}">${cat}</button>`
    ).join('');
    
    // Attache un onclick à chaque bouton catégorie
    // i correspond à l'index dans le tableau (array) categories
    categoriesEl.querySelectorAll('.category-btn').forEach((btn, i) => {
      btn.onclick = () => { activeCategory = categories[i]; render(); };
    });

    // ========== RENDU DES ARTICLES ==========
    // Récupère le terme de recherche
    const searchTerm = normalizeText(searchInput.value.trim());
    
    // Filtre les articles selon la catégorie active (ou tous si 'Tous')
    let items = activeCategory === 'Tous' ? menuItems : menuItems.filter(i => i.category === activeCategory);
    
    // Filtre aussi par nom si un terme de recherche est saisi
    if (searchTerm !== '') {
      items = items.filter(item => normalizeText(item.name).includes(searchTerm));
    }

    // Si l'élément sélectionné n'est plus visible, on efface la sélection
    if (selectedId !== null && !items.some(item => item.id === selectedId)) {
      selectedId = null;
    }
    
    // Génère le HTML pour chaque article avec nom et prix minimum
    // Math.min(...Object.values(item.sizes)) trouve le prix le plus bas parmi les tailles
    itemsEl.innerHTML = items.length
      ? items.map(item => `
        <div class="menu-item ${item.id === selectedId ? 'selected' : ''}" data-id="${item.id}">
          <span class="menu-item-name">${item.name}</span>
          <span class="menu-item-price">$${Math.min(...Object.values(item.sizes)).toFixed(2)}</span>
        </div>
      `).join('')
      : '<p class="no-selection">Aucun résultat</p>';

    // Attache un onclick à chaque article
    // +el.dataset.id convertit le string en number
    itemsEl.querySelectorAll('.menu-item').forEach(el => {
      el.onclick = () => { selectedId = +el.dataset.id; render(); };
    });

    // ========== RENDU DES DÉTAILS DE L'ARTICLE ==========
    // Trouve l'article sélectionné dans le tableau menuItems
    const item = menuItems.find(i => i.id === selectedId);
    
    // Si un article est sélectionné, affiche ses détails
    // Sinon, affiche un message par défaut
    detailEl.innerHTML = item ? `
      <div class="menu-detail-image-container">
        <img src="${item.image}" alt="${item.name}" class="menu-detail-image" onerror="this.parentElement.classList.add('image-error')">
        <div class="menu-detail-placeholder">☕</div>
      </div>
      <div class="menu-detail-body">
        <div class="menu-detail-header">
          <div class="menu-detail-title-group">
            <h3>${item.name}</h3>
            <p class="menu-detail-description">${item.description}</p>
          </div>
          <div class="menu-detail-calories">${item.calories} cal</div>
        </div>
        <div class="menu-detail-content">
          <div class="menu-detail-ingredients">
            <strong>Ingrédients</strong>
            <p>${item.ingredients.join(', ')}</p>
          </div>
          <div class="menu-detail-prices-wrapper">
            <strong>Tailles & Prix</strong>
            <div class="menu-prices">
              ${Object.entries(item.sizes).map(([s, p]) => `
                <div class="price-item">
                  <div class="price-item-size">${s}</div>
                  <div class="price-item-value">$${p.toFixed(2)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    ` : '<p class="no-selection">Sélectionnez un article</p>';
  };
  //fin de la fonction render

  // ========== GESTION OUVERTURE/FERMETURE ==========
  menuTrigger.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    render();
    searchInput.focus();
  });

  // ========== GESTION DE LA RECHERCHE ==========
  // Filtre les articles en temps réel pendant la saisie
  searchInput.addEventListener('input', () => render());
  searchInput.addEventListener('keyup', () => render());

  menuCloseBtn.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
  });
  
  // Ferme le menu si on clique sur le fond (pas sur le contenu)
  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove('active');
    }
  });
};

// ============================================
// Musique
// ============================================
let music = new Audio(import.meta.env.BASE_URL + 'image/musique.mp3');
music.loop = true;
music.volume = 0.1;

// Jouer la musique automatiquement après interaction utilisateur
const musicToggle = document.getElementById('music-toggle');

// Jouer la musique dès que le DOM est chargé 
document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si la musique est déjà jouée (dans le cas où l'utilisateur a interagi avant)
  music.play()
  music.volume = 0.4;
});

// Toggle pour contrôler la musique
musicToggle.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicToggle.innerHTML = '<img src="./image/sound.png" alt="">';
  } else {
    music.pause();
    musicToggle.innerHTML = '<img src="./image/mute.png" alt="">';
  }
});

// ============================================
// Initialisation
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initAboutPopup();
  initMenuPopup();
});
