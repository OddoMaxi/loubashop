/* ============ LOUBASHOP – main.js ============ */

/* ---------- PRODUCT DATA ---------- */
const products = [
  {
    id: 0, name: 'Minelab GPX 6000', cat: 'Série GPX – Pro',
    price: 'Demander un devis', img: 'product1.png',
    desc: 'Le détecteur d\'or le plus avancé de Minelab. Technologie MLXTREME™, détection de pépites ultra-fines en profondeur. Idéal pour terrains minéralisés d\'Afrique de l\'Ouest.',
    stars: 5, reviews: 48
  },
  {
    id: 1, name: 'Minelab GPZ 7000', cat: 'Série GPZ – Pro',
    price: 'Demander un devis', img: 'product2.png',
    desc: 'Technologie ZVT™ exclusive, détecte l\'or jusqu\'à 40% plus profond que tout autre détecteur. La référence mondiale des prospecteurs professionnels.',
    stars: 5, reviews: 32
  },
  {
    id: 2, name: 'Minelab SDC 2300', cat: 'Série SDC – Pro',
    price: 'Demander un devis', img: 'product3.png',
    desc: 'Compact, pliable et waterproof. Technologie Pulse Induction multi-période, idéal pour ruisseaux aurifères et terrains difficiles.',
    stars: 5, reviews: 21
  },
  {
    id: 3, name: 'Minelab Equinox 800', cat: 'Série Equinox',
    price: 'Demander un devis', img: null,
    desc: 'Multi-fréquences simultanées MULTI-IQ®. Polyvalent, waterproof, parfait pour l\'or alluvionnaire et les minéraux variés. Interface intuitive.',
    stars: 5, reviews: 57
  },
  {
    id: 4, name: 'Minelab Gold Monster 1000', cat: 'Gold Monster',
    price: 'Demander un devis', img: null,
    desc: 'Automatique, simple et redoutablement efficace. Idéal pour débutants et prospecteurs intermédiaires. Résultats immédiats dès la première utilisation.',
    stars: 4, reviews: 83
  },
  {
    id: 5, name: 'Bobines & Accessoires Minelab', cat: 'Accessoires Officiels',
    price: 'Demander un devis', img: 'GPZ19_LandingPage_Transparent.png',
    desc: 'Bobines de recherche, protections, chargeurs et accessoires 100% originaux Minelab pour optimiser vos performances sur le terrain.',
    stars: 5, reviews: 29
  },
  {
    id: 6, name: 'Minelab CTX 3030', cat: 'Série CTX – Multi-fréquences',
    price: 'Demander un devis', img: 'CTX-3030_ProductImage.png',
    desc: 'Détecteur multi-fréquences avancé avec écran couleur GPS intégré. Discrimination et profondeur exceptionnelles sur tous terrains.',
    stars: 5, reviews: 19
  },
  {
    id: 7, name: 'Minelab E-TRAC / Safari', cat: 'Série E-TRAC',
    price: 'Demander un devis', img: 'ETRAC-SAFARI__ControlBoxCover_LandingPage_Transparent.png',
    desc: 'Technologie Full Band Spectrum (FBS). Discrimination bidimensionnelle, idéal pour terrains à forte densité de déchets métalliques.',
    stars: 5, reviews: 14
  },
  {
    id: 8, name: 'Minelab Pro-Find 40', cat: 'Accessoires Officiels',
    price: 'Demander un devis', img: 'pro-find40_web.png',
    desc: 'Sonde de localisation (pinpointer) waterproof pour identifier précisément la position exacte de vos cibles sur le terrain.',
    stars: 5, reviews: 36
  },
  {
    id: 9, name: 'Minelab PRO-Gold', cat: 'Accessoires Officiels',
    price: 'Demander un devis', img: 'PRO-Gold_LandingPage_Transparent.png',
    desc: 'Kit de récupération de l\'or alluvionnaire professionnel. Maximisez votre rendement de paillettes et pépites.',
    stars: 4, reviews: 11
  },
  {
    id: 10, name: 'Chargeur GPZ BC10', cat: 'Accessoires Officiels',
    price: 'Demander un devis', img: 'GPZ_BC10_LandingPage_Transparent.png',
    desc: 'Chargeur de base officiel Minelab pour détecteurs série GPZ. Recharge complète et sécurisée, compatible panneau solaire.',
    stars: 5, reviews: 8
  }
];

/* ---------- CART STATE ---------- */
let cart = [];

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- HAMBURGER ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity=''; });
  });
});

/* ---------- CHECKOUT ---------- */
const checkoutBtn    = document.getElementById('checkoutBtn');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutClose  = document.getElementById('checkoutClose');

function openCheckout() {
  // Build recap
  const recap = document.getElementById('checkoutRecap');
  if (cart.length === 0) return;
  recap.innerHTML = `
    <h4>Récapitulatif (${cart.reduce((s,i)=>s+i.qty,0)} article(s))</h4>
    ${cart.map(i => `
      <div class="recap-item">
        <span><strong>${i.name}</strong> × ${i.qty}</span>
        <span style="color:var(--gold)">Devis requis</span>
      </div>
    `).join('')}
  `;
  // Reset form & show step 1
  document.getElementById('checkoutForm').reset();
  document.getElementById('checkoutStep1').style.display = '';
  document.getElementById('checkoutStep2').style.display = 'none';
  // Close cart drawer first
  closeCart();
  setTimeout(() => {
    checkoutOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 300);
}

function closeCheckout() {
  checkoutOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function submitOrder(e) {
  e.preventDefault();
  const name    = document.getElementById('oName').value;
  const phone   = document.getElementById('oPhone').value;
  const country = document.getElementById('oCountry').value;
  const city    = document.getElementById('oCity').value;
  const address = document.getElementById('oAddress').value;
  const note    = document.getElementById('oNote').value;

  // Build WhatsApp message
  const itemsList = cart.map(i => `  • ${i.name} × ${i.qty}`).join('\n');
  const msg = [
    '🛒 *NOUVELLE COMMANDE – LoubaShop*',
    '',
    `👤 *Client :* ${name}`,
    `📞 *Téléphone :* ${phone}`,
    `🌍 *Pays :* ${country}`,
    `🏙️ *Ville :* ${city}`,
    address ? `📍 *Adresse :* ${address}` : null,
    note    ? `📝 *Note :* ${note}`    : null,
    '',
    '📦 *Produits commandés :*',
    itemsList,
    '',
    `📅 *Date :* ${new Date().toLocaleString('fr-FR')}`,
  ].filter(l => l !== null).join('\n');

  const waNumber = '224627488219';
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');

  // Also open email client
  const emailTo  = 'contact@loubashop.com';
  const emailSubject = `Nouvelle commande LoubaShop – ${name} (${country})`;
  const emailBody = msg.replace(/\*/g, ''); // strip WhatsApp bold markers
  window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  // Show success screen
  document.getElementById('checkoutStep1').style.display = 'none';
  document.getElementById('checkoutStep2').style.display = '';

  // Clear cart
  cart = [];
  renderCart();
}

checkoutBtn.addEventListener('click', openCheckout);
checkoutClose.addEventListener('click', closeCheckout);
checkoutOverlay.addEventListener('click', e => {
  if (e.target === checkoutOverlay) closeCheckout();
});
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartCount = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotalEl = document.getElementById('cartTotal');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function addToCart(productId) {
  const product = products[productId];
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  showToast(`✦ ${product.name} ajouté au panier`);
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  renderCart();
}

function renderCart() {
  const total = cart.length;
  cartCount.textContent = total;
  cartCount.classList.toggle('show', total > 0);
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
    cartFooter.style.display = 'none';
    return;
  }
  
  cartFooter.style.display = 'block';
  
  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.img
          ? `<img src="${item.img}" alt="${item.name}" />`
          : `<span style="color:var(--gold);font-size:1.2rem">◆</span>`}
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price}</p>
        <p style="font-size:0.75rem;color:var(--text-muted)">Qté: ${item.qty}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');
  
  // Just show number of items since prices are strings
  cartTotalEl.textContent = `${cart.reduce((s, i) => s + i.qty, 0)} article(s)`;
}

/* ---------- PRODUCT FILTER ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hidden', !show);
      if (show) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeUp 0.4s ease-out both';
      }
    });
  });
});

/* ---------- CATEGORY CARDS ---------- */
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const filter = card.dataset.filter;
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      filterBtns.forEach(b => b.classList.remove('active'));
      const targetBtn = [...filterBtns].find(b => b.dataset.filter === filter);
      if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.click();
      }
    }, 600);
  });
});

/* ---------- QUICK VIEW MODAL ---------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

function quickView(productId) {
  const p = products[productId];
  const stars = '★'.repeat(p.stars) + '☆'.repeat(5 - p.stars);
  
  modalContent.innerHTML = `
    <div class="modal-inner">
      <div class="modal-img">
        ${p.img
          ? `<img src="${p.img}" alt="${p.name}" />`
          : `<div style="width:100%;height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:var(--gold);background:var(--dark3);">
               <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               <p style="font-size:0.85rem;color:var(--text-muted)">${p.name}</p>
             </div>`}
      </div>
      <div class="modal-info">
        <p class="modal-cat">${p.cat}</p>
        <h3 class="modal-name">${p.name}</h3>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:4px;">
          <span style="color:var(--gold);font-size:0.9rem">${stars}</span>
          <span style="font-size:0.78rem;color:var(--text-muted)">(${p.reviews} avis)</span>
        </div>
        <p class="modal-price">${p.price}</p>
        <p class="modal-desc">${p.desc}</p>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:8px;">
          <div style="display:flex;gap:8px;align-items:center;font-size:0.82rem;color:var(--text-muted)">
            <span style="color:var(--gold)">✦</span> Livraison internationale incluse
          </div>
          <div style="display:flex;gap:8px;align-items:center;font-size:0.82rem;color:var(--text-muted)">
            <span style="color:var(--gold)">✦</span> Garantie 2 ans constructeur
          </div>
          <div style="display:flex;gap:8px;align-items:center;font-size:0.82rem;color:var(--text-muted)">
            <span style="color:var(--gold)">✦</span> Formation à l'utilisation incluse
          </div>
        </div>
        <button class="btn-primary" onclick="addToCart(${p.id});closeModal();" style="margin-top:20px">
          Ajouter au panier
        </button>
      </div>
    </div>
  `;
  
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeCart(); closeCheckout(); }
});

/* ---------- TOAST ---------- */
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

/* ---------- NEWSLETTER ---------- */
function subscribeNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('nlEmail').value;
  if (email) {
    showToast('✦ Merci ! Vous êtes abonné(e) avec succès.');
    document.getElementById('nlEmail').value = '';
  }
}

/* ---------- CONTACT FORM ---------- */
function submitContact(e) {
  e.preventDefault();
  showToast('✦ Message envoyé ! Nous vous répondrons sous 24h.');
  e.target.reset();
}

/* ---------- SCROLL ANIMATIONS ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.product-card, .cat-card, .ava-card, .testi-card, .contact-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold-light)' : '';
  });
});

/* ---------- SMOOTH NUMBER COUNTER ---------- */
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const update = () => {
    current += step;
    if (current >= target) {
      el.textContent = target + suffix;
    } else {
      el.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(update);
    }
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(el => {
        const text = el.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        animateCounter(el, num, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

console.log('%cLoubaShop ◆ Prêt', 'color:#c9a84c;font-size:16px;font-weight:bold;');
