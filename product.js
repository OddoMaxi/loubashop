/* ============================================
   LOUBASHOP – product.js
   Product detail page logic
   ============================================ */

/* --- Cart state (shared logic) --- */
let cart = JSON.parse(sessionStorage.getItem('ls_cart') || '[]');
let currentQty = 1;

/* --- Read product ID from URL --- */
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get('id'));
const product = PRODUCTS.find(p => p.id === productId);

/* --- Navbar scroll --- */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
});
document.getElementById('navbar').classList.add('scrolled');

/* --- Hamburger --- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* --- Render product --- */
function renderProduct() {
  if (!product) {
    document.getElementById('pdGrid').innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:120px 24px;">
        <p style="font-size:3rem;margin-bottom:16px">◆</p>
        <h2 style="font-family:var(--font-serif);color:var(--white);margin-bottom:12px">Produit introuvable</h2>
        <p style="color:var(--text-muted);margin-bottom:28px">Ce produit n'existe pas ou a été retiré.</p>
        <a href="index.html#produits" class="btn-primary">Voir tous nos produits</a>
      </div>`;
    return;
  }

  // Update page title & breadcrumb
  document.title = `${product.name} – LoubaShop`;
  document.querySelector('meta[name="description"]').setAttribute('content',
    `${product.name} – ${product.shortDesc} – LoubaShop, revendeur Minelab.`
  );
  document.getElementById('pdBreadName').textContent = product.name;

  const stars = '★'.repeat(product.stars) + '☆'.repeat(5 - product.stars);

  const imgHtml = product.img
    ? `<img src="${product.img}" alt="${product.name}" />`
    : `<div class="pd-img-placeholder-lg">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <p>${product.name}</p>
       </div>`;

  const badgeHtml = product.badge
    ? `<div class="pd-badge-lg ${product.badgeClass}">${product.badge}</div>`
    : '';

  document.getElementById('pdGrid').innerHTML = `
    <!-- Image panel -->
    <div class="pd-img-panel" data-anim>
      <div class="pd-img-main">
        ${badgeHtml}
        ${imgHtml}
      </div>
      <div class="pd-trust-mini">
        <div class="pd-trust-item"><span>🔒</span> 100% Authentique Minelab</div>
        <div class="pd-trust-item"><span>🚚</span> Livraison rapide</div>
        <div class="pd-trust-item"><span>🛡️</span> Garantie 2 ans</div>
        <div class="pd-trust-item"><span>💬</span> Support 24/7</div>
      </div>
    </div>

    <!-- Info panel -->
    <div class="pd-info" data-anim>
      <a href="index.html#produits" class="pd-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Retour aux produits
      </a>

      <div>
        <p class="pd-cat-tag">${product.cat}</p>
      </div>

      <h1 class="pd-name">${product.name}</h1>

      <div class="pd-rating">
        <span class="stars">${stars}</span>
        <span class="count">${product.reviews} avis clients</span>
      </div>

      <p class="pd-desc">${product.longDesc}</p>

      <div class="pd-price-row">
        <span class="pd-price">Sur devis</span>
        <span class="pd-price-note">📞 Contactez-nous pour le prix</span>
      </div>

      <div class="pd-qty-row">
        <span class="pd-qty-label">Quantité :</span>
        <div class="pd-qty-ctrl">
          <button class="pd-qty-btn" id="qtyMinus">−</button>
          <span class="pd-qty-val" id="qtyVal">1</span>
          <button class="pd-qty-btn" id="qtyPlus">+</button>
        </div>
      </div>

      <div class="pd-cta-row">
        <button class="btn-primary" id="pdAddBtn">
          🛒 Ajouter au panier
        </button>
        <button class="pd-wa-btn" onclick="contactWhatsApp()">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>
      </div>
    </div>
  `;

  // Qty controls
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (currentQty > 1) { currentQty--; document.getElementById('qtyVal').textContent = currentQty; }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    currentQty++; document.getElementById('qtyVal').textContent = currentQty;
  });

  // Add to cart
  document.getElementById('pdAddBtn').addEventListener('click', () => {
    for (let i = 0; i < currentQty; i++) addToCart(product.id);
    showToast(`✦ ${product.name} × ${currentQty} ajouté au panier`);
  });

  // Specs
  const specsEl = document.getElementById('pdSpecs');
  if (product.specs) {
    specsEl.innerHTML = product.specs.map(s => `
      <tr><td>${s.label}</td><td>${s.value}</td></tr>
    `).join('');
    document.getElementById('pdDetails').style.display = '';
  }

  // Features
  const featEl = document.getElementById('pdFeatures');
  if (product.features) {
    featEl.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
  }

  // Related products
  if (product.related && product.related.length) {
    const relGrid = document.getElementById('pdRelatedGrid');
    relGrid.innerHTML = product.related.map(rid => {
      const r = PRODUCTS.find(p => p.id === rid);
      if (!r) return '';
      const rStars = '★'.repeat(r.stars) + '☆'.repeat(5 - r.stars);
      const rImg = r.img
        ? `<img src="${r.img}" alt="${r.name}" loading="lazy" />`
        : `<div class="product-img-placeholder" style="height:100%">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <p>${r.name}</p>
          </div>`;
      return `
        <article class="product-card" onclick="window.location.href='product.html?id=${r.id}'" style="cursor:pointer">
          <div class="product-img-wrap">${rImg}</div>
          <div class="product-info">
            <p class="product-cat">${r.cat}</p>
            <h3 class="product-name">${r.name}</h3>
            <p class="product-desc">${r.shortDesc}</p>
            <div class="product-rating"><span class="stars">${rStars}</span><span class="rating-count">(${r.reviews} avis)</span></div>
            <div class="product-price-row">
              <span class="price">Sur devis</span>
              <button class="btn-add" onclick="event.stopPropagation();addToCart(${r.id})">Ajouter</button>
            </div>
          </div>
        </article>`;
    }).join('');
    document.getElementById('pdRelated').style.display = '';
  }

  // Animate in
  setTimeout(() => {
    document.querySelectorAll('[data-anim]').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, i * 150);
    });
  }, 50);
}

/* --- WhatsApp contact --- */
function contactWhatsApp() {
  const msg = `👋 Bonjour LoubaShop,\n\nJe suis intéressé(e) par le produit :\n*${product.name}*\n\nPourriez-vous me donner plus d'informations et le prix ?`;
  window.open(`https://wa.me/224627488219?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ============ CART (same logic as main.js) ============ */
function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  const existing = cart.find(i => i.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ ...p, qty: 1 });
  sessionStorage.setItem('ls_cart', JSON.stringify(cart));
  renderCart();
}
function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  sessionStorage.setItem('ls_cart', JSON.stringify(cart));
  renderCart();
}
function renderCart() {
  const total = cart.reduce((s,i) => s+i.qty, 0);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = total;
  countEl.classList.toggle('show', total > 0);
  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter  = document.getElementById('cartFooter');
  const cartTotalEl = document.getElementById('cartTotal');
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
    cartFooter.style.display = 'none'; return;
  }
  cartFooter.style.display = 'block';
  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        ${item.img ? `<img src="${item.img}" alt="${item.name}" />` : `<span style="color:var(--gold);font-size:1.2rem">◆</span>`}
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">Sur devis</p>
        <p style="font-size:0.75rem;color:var(--text-muted)">Qté: ${item.qty}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>`).join('');
  cartTotalEl.textContent = `${total} article(s)`;
}

/* --- Cart drawer --- */
const cartBtn      = document.getElementById('cartBtn');
const cartDrawer   = document.getElementById('cartDrawer');
const cartOverlay  = document.getElementById('cartOverlay');
const cartClose    = document.getElementById('cartClose');
function openCart()  { cartDrawer.classList.add('open'); cartOverlay.classList.add('active'); document.body.style.overflow='hidden'; }
function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('active'); document.body.style.overflow=''; }
cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

/* --- Checkout --- */
const checkoutBtn     = document.getElementById('checkoutBtn');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutClose   = document.getElementById('checkoutClose');
function openCheckout() {
  if (!cart.length) return;
  const recap = document.getElementById('checkoutRecap');
  recap.innerHTML = `<h4>Récapitulatif (${cart.reduce((s,i)=>s+i.qty,0)} article(s))</h4>
    ${cart.map(i=>`<div class="recap-item"><span><strong>${i.name}</strong> × ${i.qty}</span><span style="color:var(--gold)">Devis requis</span></div>`).join('')}`;
  document.getElementById('checkoutForm').reset();
  document.getElementById('checkoutStep1').style.display = '';
  document.getElementById('checkoutStep2').style.display = 'none';
  closeCart();
  setTimeout(() => { checkoutOverlay.classList.add('active'); document.body.style.overflow='hidden'; }, 300);
}
function closeCheckout() { checkoutOverlay.classList.remove('active'); document.body.style.overflow=''; }
function submitOrder(e) {
  e.preventDefault();
  const name    = document.getElementById('oName').value;
  const phone   = document.getElementById('oPhone').value;
  const country = document.getElementById('oCountry').value;
  const city    = document.getElementById('oCity').value;
  const address = document.getElementById('oAddress').value;
  const note    = document.getElementById('oNote').value;
  const itemsList = cart.map(i=>`  • ${i.name} × ${i.qty}`).join('\n');
  const msg = ['🛒 *NOUVELLE COMMANDE – LoubaShop*','',`👤 *Client :* ${name}`,`📞 *Téléphone :* ${phone}`,`🌍 *Pays :* ${country}`,`🏙️ *Ville :* ${city}`,address?`📍 *Adresse :* ${address}`:null,note?`📝 *Note :* ${note}`:null,'','📦 *Produits commandés :*',itemsList,'',`📅 *Date :* ${new Date().toLocaleString('fr-FR')}`].filter(l=>l!==null).join('\n');
  window.open(`https://wa.me/224627488219?text=${encodeURIComponent(msg)}`, '_blank');
  const emailBody = msg.replace(/\*/g,'');
  window.location.href = `mailto:contact@loubashop.com?subject=${encodeURIComponent('Nouvelle commande LoubaShop – '+name)}&body=${encodeURIComponent(emailBody)}`;
  document.getElementById('checkoutStep1').style.display = 'none';
  document.getElementById('checkoutStep2').style.display = '';
  cart = []; sessionStorage.setItem('ls_cart', JSON.stringify(cart)); renderCart();
}
checkoutBtn.addEventListener('click', openCheckout);
checkoutClose.addEventListener('click', closeCheckout);
checkoutOverlay.addEventListener('click', e => { if(e.target===checkoutOverlay) closeCheckout(); });
document.addEventListener('keydown', e => { if(e.key==='Escape'){closeCart();closeCheckout();} });

/* --- Toast --- */
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

/* --- Theme toggle --- */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ls_theme', next);
});

/* --- Init --- */
renderCart();
renderProduct();
