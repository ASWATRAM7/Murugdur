let CATEGORIES = [];
let PRODUCTS = [];
let FEATURED_IDS = [];

const CART_KEY = "murugdur_cart_v1";

let STRIPE_ENABLED = false;

async function initConfig() {
  try {
    const res = await fetch("/api/config", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      STRIPE_ENABLED = Boolean(data && data.stripeEnabled);
      return;
    }
  } catch {
  }
  STRIPE_ENABLED = false;
}

async function initCatalog() {
  try {
    const res = await fetch("/api/catalog", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      CATEGORIES = Array.isArray(data.categories) ? data.categories : [];
      PRODUCTS = Array.isArray(data.products) ? data.products : [];
      FEATURED_IDS = Array.isArray(data.featuredIds) ? data.featuredIds : [];
      return;
    }
  } catch {
  }

  const local = await import("./data.js");
  CATEGORIES = Array.isArray(local.CATEGORIES) ? local.CATEGORIES : [];
  PRODUCTS = Array.isArray(local.PRODUCTS) ? local.PRODUCTS : [];
  FEATURED_IDS = Array.isArray(local.FEATURED_IDS) ? local.FEATURED_IDS : [];
}

function money(amount, currency) {
  const value = typeof amount === "number" ? amount : Number(amount || 0);
  if (currency === "INR") {
    return "₹" + value.toLocaleString("en-IN");
  }
  return value.toLocaleString(undefined, { style: "currency", currency: currency || "USD" });
}

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function getCartCount() {
  const cart = loadCart();
  return cart.reduce((sum, line) => sum + (Number(line.qty) || 0), 0);
}

function getCartItems() {
  const cart = loadCart();
  const lines = cart
    .map(line => ({
      ...line,
      product: PRODUCTS.find(p => p.id === line.id) || null,
      qty: Number(line.qty) || 0
    }))
    .filter(line => line.product && line.qty > 0);

  return lines;
}

function addToCart(id, qty) {
  const amount = Math.max(1, Number(qty) || 1);
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const cart = loadCart();
  const idx = cart.findIndex(x => x.id === id);
  if (idx >= 0) {
    cart[idx].qty = (Number(cart[idx].qty) || 0) + amount;
  } else {
    cart.push({ id, qty: amount });
  }
  saveCart(cart);
  toast("Added to cart");
}

function setLineQty(id, qty) {
  const amount = Math.max(0, Number(qty) || 0);
  const cart = loadCart();
  const next = cart
    .map(line => line.id === id ? ({ ...line, qty: amount }) : line)
    .filter(line => (Number(line.qty) || 0) > 0);
  saveCart(next);
}

function removeLine(id) {
  const cart = loadCart();
  saveCart(cart.filter(line => line.id !== id));
}

function subtotal(cartLines) {
  return cartLines.reduce((sum, line) => sum + (line.product.price * line.qty), 0);
}

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function el(id) {
  return document.getElementById(id);
}

function updateCartCount() {
  const node = document.querySelector("[data-cart-count]");
  if (!node) return;
  node.textContent = String(getCartCount());
}

function toast(text) {
  const node = document.querySelector("[data-toast]");
  if (!node) return;
  node.textContent = text;
  node.classList.add("show");
  window.clearTimeout(toast._t);
  toast._t = window.setTimeout(() => node.classList.remove("show"), 1800);
}

function imageForCategory(category) {
  const key = String(category || "").toLowerCase();
  if (key === "handbags") return "./assets/hero-handbag.png";
  if (key === "belts") return "./assets/shoes-luxury.png";
  if (key === "perfume") return "./assets/perfume-luxury.png";
  if (key === "trousers") return "./assets/blazer-luxury.png";
  if (key === "overcoats") return "./assets/coat-luxury.png";
  if (key === "tshirts" || key === "t-shirts") return "./assets/tshirt-luxury.png";
  if (key === "wallets") return "./assets/wallet-luxury.png";
  if (key === "watches") return "./assets/watch-luxury.png";
  if (key === "caps") return "./assets/tshirt-luxury.png";
  if (key === "sweatshirts") return "./assets/tshirt-luxury.png";
  if (key === "oversized") return "./assets/coat-luxury.png";
  return "./assets/hero-handbag.png";
}

function productCard(product) {
  const href = `product.html?id=${encodeURIComponent(product.id)}`;
  const img = product.image || imageForCategory(product.category);
  return `
    <a class="card" href="${href}">
      <div class="media photo">
        <img class="image-cover" src="${img}" alt="${product.name}" onerror="this.style.display='none'" />
        <div class="badge tag">${product.badge}</div>
      </div>
      <div class="content">
        <h3>${product.name}</h3>
        <div class="meta">
          <div class="small">${categoryName(product.category)}</div>
          <div class="price">${money(product.price, product.currency)}</div>
        </div>
      </div>
    </a>
  `;
}

function categoryName(key) {
  return (CATEGORIES.find(c => c.key === key) || { name: key }).name;
}

function renderHome() {
  const featured = FEATURED_IDS
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  const grid = el("featuredGrid");
  if (grid) {
    grid.innerHTML = featured.slice(0, 4).map(productCard).join("");
  }
}

function renderCollections() {
  const category = getParam("category") || "all";
  const q = (getParam("q") || "").trim().toLowerCase();
  const sort = getParam("sort") || "featured";

  const title = el("collectionTitle");
  const desc = el("collectionDesc");
  if (title) {
    title.textContent = category === "all" ? "All Collections" : categoryName(category);
  }
  if (desc) {
    desc.textContent = "Luxury essentials crafted for presence — discover signature materials, refined silhouettes, and royal finishes.";
  }

  const pills = el("categoryPills");
  if (pills) {
    const pillHtml = [
      { key: "all", name: "All" },
      ...CATEGORIES
    ].map(c => {
      const active = c.key === category ? "pill active" : "pill";
      const href = `collections.html?category=${encodeURIComponent(c.key)}&q=${encodeURIComponent(q)}&sort=${encodeURIComponent(sort)}`;
      return `<a class="${active}" href="${href}">${c.name}</a>`;
    });
    pills.innerHTML = pillHtml.join("");
  }

  const search = el("searchInput");
  if (search) {
    search.value = q;
    search.addEventListener("input", (e) => {
      const url = new URL(window.location.href);
      url.searchParams.set("q", e.target.value);
      window.history.replaceState({}, "", url);
      renderCollections();
    });
  }

  const sortSel = el("sortSelect");
  if (sortSel) {
    sortSel.value = sort;
    sortSel.addEventListener("change", (e) => {
      const url = new URL(window.location.href);
      url.searchParams.set("sort", e.target.value);
      window.location.href = url.toString();
    });
  }

  let items = PRODUCTS.slice();
  if (category !== "all") {
    items = items.filter(p => p.category === category);
  }
  if (q) {
    items = items.filter(p => (p.name + " " + p.description).toLowerCase().includes(q));
  }

  if (sort === "price-asc") {
    items.sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    items.sort((a, b) => b.price - a.price);
  }
  if (sort === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sort === "featured") {
    const rank = new Map(FEATURED_IDS.map((id, i) => [id, i]));
    items.sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999));
  }

  const grid = el("productsGrid");
  if (grid) {
    grid.innerHTML = items.map(productCard).join("");
  }

  const count = el("resultsCount");
  if (count) {
    count.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
  }
}

function renderProduct() {
  const id = getParam("id");
  const product = PRODUCTS.find(p => p.id === id);

  const title = el("productTitle");
  const meta = el("productMeta");
  const price = el("productPrice");
  const desc = el("productDesc");
  const details = el("productDetails");
  const addBtn = el("addToCartBtn");
  const qtyInput = el("qtyInput");
  const img = el("productImage");

  if (!product) {
    if (title) title.textContent = "Product not found";
    if (desc) desc.textContent = "The product you’re looking for is not available.";
    if (addBtn) addBtn.disabled = true;
    return;
  }

  document.title = `${product.name} · Murugdur`;

  if (title) title.textContent = product.name;
  if (meta) meta.textContent = `${categoryName(product.category)} · SKU ${product.sku}`;
  if (price) price.textContent = money(product.price, product.currency);
  if (desc) desc.textContent = product.description;

  if (img) {
    img.src = product.image || imageForCategory(product.category);
    img.alt = product.name;
    img.style.display = "block";
    img.onerror = () => {
      img.style.display = "none";
    };
  }

  if (details) {
    details.innerHTML = `
      <tr><th>Material</th><td>${product.material}</td></tr>
      <tr><th>Color</th><td>${product.color}</td></tr>
      <tr><th>Size</th><td>${product.size}</td></tr>
      <tr><th>Category</th><td>${categoryName(product.category)}</td></tr>
    `;
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => addToCart(product.id, qtyInput ? qtyInput.value : 1));
  }

  const recGrid = el("recommendedGrid");
  if (recGrid) {
    const rec = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
    recGrid.innerHTML = rec.map(productCard).join("");
  }
}

function renderCart() {
  const lines = getCartItems();
  const table = el("cartTableBody");
  const empty = el("cartEmpty");

  if (empty) {
    empty.style.display = lines.length ? "none" : "block";
  }

  if (table) {
    table.innerHTML = lines.map(line => {
      const p = line.product;
      const lineTotal = p.price * line.qty;
      return `
        <tr>
          <td>
            <div style="font-family:var(--serif); font-size:14px">${p.name}</div>
            <div class="small">${categoryName(p.category)} · SKU ${p.sku}</div>
          </td>
          <td class="price">${money(p.price, p.currency)}</td>
          <td>
            <input class="qty" type="number" min="0" value="${line.qty}" data-qty data-id="${p.id}" />
          </td>
          <td class="price">${money(lineTotal, p.currency)}</td>
          <td>
            <button class="btn" data-remove data-id="${p.id}">Remove</button>
          </td>
        </tr>
      `;
    }).join("");

    table.querySelectorAll("[data-qty]").forEach(input => {
      input.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-id");
        setLineQty(id, e.target.value);
        renderCart();
      });
    });

    table.querySelectorAll("[data-remove]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        removeLine(id);
        renderCart();
      });
    });
  }

  const sub = subtotal(lines);
  const shipping = lines.length ? 0 : 0;
  const total = sub + shipping;

  const subNode = el("subtotal");
  const shipNode = el("shipping");
  const totalNode = el("total");
  if (subNode) subNode.textContent = money(sub, "INR");
  if (shipNode) shipNode.textContent = shipping ? money(shipping, "INR") : "Free";
  if (totalNode) totalNode.textContent = money(total, "INR");

  const checkoutBtn = el("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.disabled = lines.length === 0;
  }

  const stripeNotice = el("stripeNotice");
  if (stripeNotice) {
    stripeNotice.style.display = STRIPE_ENABLED ? "none" : "block";
  }
  if (checkoutBtn && !STRIPE_ENABLED) {
    checkoutBtn.disabled = true;
  }

  const checkoutForm = el("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (lines.length === 0) return;

      const formData = new FormData(checkoutForm);
      const customer = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        phone: String(formData.get("phone") || "").trim()
      };

      const receipt = el("orderReceipt");
      if (receipt) {
        receipt.style.display = "none";
        receipt.innerHTML = "";
      }

      try {
        const res = await fetch("/api/checkout/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: lines.map(l => ({ id: l.id, qty: l.qty })),
            customer
          })
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data && data.error ? data.error : "Checkout failed");
        }
        if (!data.url) {
          throw new Error("Checkout URL not returned");
        }

        window.location.href = data.url;
      } catch (err) {
        const message = String(err && err.message ? err.message : err);
        toast(message);
        if (receipt) {
          receipt.style.display = "block";
          receipt.innerHTML = `
            <div class="notice">
              <div style="font-family:var(--serif); font-size:16px; margin-bottom:6px">Unable to start checkout</div>
              <div class="mini">${message}</div>
            </div>
          `;
        }
      }
    });
  }
}

async function boot() {
  await initConfig();
  await initCatalog();
  updateCartCount();

  const page = document.body.getAttribute("data-page");
  if (page === "home") renderHome();
  if (page === "collections") renderCollections();
  if (page === "product") renderProduct();
  if (page === "cart") renderCart();
}

window.Murugdur = {
  addToCart,
  money
};

document.addEventListener("DOMContentLoaded", boot);
