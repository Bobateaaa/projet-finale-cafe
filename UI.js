// ============================================
// Données sur le menu avec l'utilisation d'un array et des objets
// ============================================
const menuItems = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Boissons',
    description: 'Un classique intense et savoureux',
    ingredients: ['Café arabica premium', 'Eau filtrée'],
    image: '',
    sizes: { 'Simple': 2.50, 'Double': 3.50 },
    calories: 3
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Boissons',
    description: 'Mélange parfait de café et mousse',
    ingredients: ['Café arabica', 'Lait vapeur', 'Mousse de lait'],
    image: '',
    sizes: { 'Petit (250ml)': 3.50, 'Moyen (350ml)': 4.00, 'Grand (450ml)': 4.50 },
    calories: 120
  },
  {
    id: 3,
    name: 'Latte',
    category: 'Boissons',
    description: 'Café doux avec beaucoup de lait',
    ingredients: ['Café arabica', 'Lait entier', 'Mousse fine'],
    image: '',
    sizes: { 'Petit (250ml)': 3.50, 'Moyen (350ml)': 4.00, 'Grand (450ml)': 4.50 },
    calories: 150
  },
  {
    id: 4,
    name: 'Croissant au Beurre',
    category: 'Pâtisseries',
    description: 'Croissant feuilleté fait maison',
    ingredients: ['Farine premium', 'Beurre normand', 'Sel de mer', 'Levure'],
    image: '',
    sizes: { 'Unité': 2.80 },
    calories: 270
  },
  {
    id: 5,
    name: 'Pain au Chocolat',
    category: 'Pâtisseries',
    description: 'Chocolat riche et pâte fondante',
    ingredients: ['Farine premium', 'Chocolat noir 70%', 'Beurre', 'Levure'],
    image: '',
    sizes: { 'Unité': 2.50 },
    calories: 290
  },
  {
    id: 6,
    name: 'Tarte aux Pommes',
    category: 'Pâtisseries',
    description: 'Pommes fraîches et pâte croustillante',
    ingredients: ['Pommes locales', 'Pâte brisée', 'Sucre roux', 'Cannelle'],
    image: '',
    sizes: { 'Part': 3.80, 'Tarte entière': 12.00 },
    calories: 320
  },
  {
    id: 7,
    name: 'Salade César Classique',
    category: 'Encas',
    description: 'Laitue croustillante et sauce maison',
    ingredients: ['Laitue romaine', 'Parmesan', 'Croûtons', 'Sauce César maison', 'Poulet grillé'],
    image: '',
    sizes: { 'Regular': 7.50, 'Large': 9.50 },
    calories: 280
  },
  {
    id: 8,
    name: 'Sandwich Club',
    category: 'Encas',
    description: 'Triple étage savoureux',
    ingredients: ['Pain complet', 'Jambon de qualité', 'Poulet grillé', 'Bacon', 'Salade', 'Tomate', 'Fromage', 'Mayonnaise'],
    image: '/image/sandwich.jpg',
    sizes: { 'Demi': 6.50, 'Entier': 9.00 },
    calories: 450
  },
  {
    id: 9,
    name: 'Jus d\'Orange Frais',
    category: 'Boissons',
    description: 'Pressé à froid chaque matin',
    ingredients: ['Oranges fraîches Siciliennes'],
    image: '/image/jus-orange.jpg',
    sizes: { 'Verre (250ml)': 3.00, 'Pichet (750ml)': 7.50 },
    calories: 100
  },
  {
    id: 10,
    name: 'Smoothie Fraise-Banane',
    category: 'Boissons',
    description: 'Frais et protéiné',
    ingredients: ['Fraises fraîches', 'Banane', 'Yaourt', 'Miel', 'Glaçons'],
    image: '/image/smoothie.jpg',
    sizes: { 'Moyen (300ml)': 4.50, 'Grand (450ml)': 5.50 },
    calories: 180
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
// Pop-up "À propos" 
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
// Pop-up du menu avec catégories, détails et prix
// ============================================
const initMenuPopup = () => {
  const menuTrigger = document.getElementById('menu-trigger');
  const menuOverlay = document.getElementById('menu-popup');
  const menuCloseBtn = document.querySelector('.menu-close');
  const menuCategoriesContainer = document.getElementById('menu-categories');
  const menuItemsContainer = document.getElementById('menu-items');
  const menuDetailContainer = document.getElementById('menu-detail');

  // Récupérer les catégories uniques
  const categories = ['Tous', ...new Set(menuItems.map(item => item.category))];
  let activeCategory = 'Tous';
  let selectedItemId = null;

  // Afficher les catégories
  const renderCategories = () => {
    menuCategoriesContainer.innerHTML = categories
      .map(cat => `
        <button class="category-btn ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">
          ${cat}
        </button>
      `)
      .join('');

    // Ajouter des écouteurs pour changer la catégorie
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        renderMenu();
      });
    });
  };

  // Afficher les articles du menu
  const renderMenu = () => {
    // Filtrer par catégorie
    let filtered = activeCategory === 'Tous'
      ? menuItems
      : menuItems.filter(item => item.category === activeCategory);

    // Afficher les articles filtrés
    menuItemsContainer.innerHTML = filtered
      .map(item => `
        <div class="menu-item ${item.id === selectedItemId ? 'selected' : ''}" data-id="${item.id}">
          <span class="menu-item-name">${item.name}</span>
          <span class="menu-item-price">$${Math.min(...Object.values(item.sizes)).toFixed(2)}</span>
        </div>
      `)
      .join('');

    // Mettre à jour le bouton de catégorie actif
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === activeCategory);
    });

    // Ajouter des écouteurs pour les articles du menu
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        selectedItemId = parseInt(item.dataset.id);
        renderMenu();
        renderDetail();
      });
    });
  };

  // Afficher les détails de l'article sélectionné
  const renderDetail = () => {
    if (!selectedItemId) {
      menuDetailContainer.innerHTML = '<p class="no-selection">Sélectionnez un article pour voir les détails</p>';
      return;
    }

    const item = menuItems.find(m => m.id === selectedItemId);
    if (!item) return;

    // Générer le HTML pour les prix
    const pricesHtml = Object.entries(item.sizes)
      .map(([size, price]) => `
        <div class="price-item">
          <div class="price-item-size">${size}</div>
          <div class="price-item-value">$${price.toFixed(2)}</div>
        </div>
      `)
      .join('');

    // Afficher les détails dans le conteneur
    menuDetailContainer.innerHTML = `
      <div class="menu-detail-image-container">
        <img src="${item.image}" alt="${item.name}" class="menu-detail-image" onerror="this.parentElement.classList.add('image-error')">
        <div class="menu-detail-placeholder">☕</div>
      </div>
      <h3>${item.name}</h3>
      <p style="color: #999; margin: 8px 0; font-size: 13px;">${item.description}</p>
      
      <div class="menu-detail-section">
        <strong>Ingrédients</strong>
        <p>${item.ingredients.join(', ')}</p>
      </div>

      <div class="menu-detail-section">
        <strong>Tailles & Prix</strong>
        <div class="menu-prices">${pricesHtml}</div>
      </div>
    `;
  };

  // Ouvrir le menu au clic
  menuTrigger.addEventListener('click', () => {
    menuOverlay.classList.add('active');
    if (!selectedItemId) {
      renderCategories();
      renderMenu();
    }
  });

  // Fermer le menu au clic du bouton
  menuCloseBtn.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
  });

  // Fermer le menu en cliquant en dehors du contenu
  menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) {
      menuOverlay.classList.remove('active');
    }
  });
};

// ============================================
// Initialisation
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initAboutPopup();
  initMenuPopup();
});
