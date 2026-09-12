const API_BASE = "http://localhost:3000";
async function apiFetch(url, options = {}) {
  return fetch(url, options);
}

const CHECKOUT_LIVE = false; // flip to true once backend + shipping API are deployed and tested
const WA_NUMBER = "6287862377765"; // your real WhatsApp number, country code + no leading 0

let gift9Color = "cream";
const GIFT9_PRICES = {
  cream: 50000,  // EDIT: real price, 9pcs Cream
  gold:  50000,  // EDIT: real price, 9pcs Gold
  pink:  50000   // EDIT: real price, 9pcs Pink
};

const GIFT12_PRICES = {
  "pink-dark-milk":   108000,  // EDIT: real price
  "pink-milk-white":  75000,  // EDIT: real price
  "pink-dark-white":  108000,  // EDIT: real price
  "green-dark-milk":  108000,  // EDIT: real price
  "green-milk-white": 75000,  // EDIT: real price
  "green-dark-white": 108000   // EDIT: real price
};

let gift5Color = "gold";
let gift5Shape = "cube";
let gift5Chocolate = "milk";

const GIFT5_PRICES = {
  "gold-cube-milk": 37500,   // EDIT: real price
  "gold-cube-white": 37500,  // EDIT: real price
  "gold-dome-milk": 34000,   // EDIT: real price
  "gold-dome-white": 34000,  // EDIT: real price
  "gold-heart-milk": 30000,  // EDIT: real price
  "gold-heart-white": 30000, // EDIT: real price
  "red-cube-milk": 37500,    // EDIT: real price
  "red-cube-white": 37500,   // EDIT: real price
  "red-dome-milk": 34000,    // EDIT: real price
  "red-dome-white": 34000,   // EDIT: real price
  "red-heart-milk": 30000,   // EDIT: real price
  "red-heart-white": 30000,  // EDIT: real price
  "pink-cube-milk": 37500,   // EDIT: real price
  "pink-cube-white": 37500,  // EDIT: real price
  "pink-dome-milk": 34000,   // EDIT: real price
  "pink-dome-white": 34000,  // EDIT: real price
  "pink-heart-milk": 30000,  // EDIT: real price
  "pink-heart-white": 30000  // EDIT: real price
};

const GIFT5_IMAGES = {
  "cube-milk": "milk-cube-gold-5pcs.jpg",
  "cube-white": "white-cube-pink-5pcs.jpg",
  "heart-milk": "milk-heart-red-5pcs.jpg",
  "heart-white": "white-heart-pink-5pcs.jpg",
  "dome-milk": "dome-chocolate-5pcs.jpg",
  "dome-white": "dome-chocolate-5pcs.jpg"
};

function updateGift5() {
  const priceKey = gift5Color + "-" + gift5Shape + "-" + gift5Chocolate;
  document.getElementById("gift5Price").textContent = formatRupiah(GIFT5_PRICES[priceKey]);

  const imageKey = gift5Shape + "-" + gift5Chocolate;
  document.getElementById("gift5-image").src = "assets/gift-box-5pcs/" + GIFT5_IMAGES[imageKey];
}

function select5Color(color, button) {
  gift5Color = color;
  button.parentElement.querySelectorAll(".variation-btn").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  updateGift5();
}

function select5Shape(shape, button) {
  gift5Shape = shape;
  button.parentElement.querySelectorAll(".variation-btn").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  updateGift5();
}

function select5Chocolate(chocolate, button) {
  gift5Chocolate = chocolate;
  button.parentElement.querySelectorAll(".variation-btn").forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  updateGift5();
}

function addGift5ToCart() {
  const colorLabels = { gold: "Gold", red: "Red", pink: "Pink" };
  const shapeLabels = { cube: "Cube", dome: "Dome", heart: "Heart" };
  const chocoLabels = { milk: "Milk", white: "White" };
  const key = gift5Color + "-" + gift5Shape + "-" + gift5Chocolate;
  const price = GIFT5_PRICES[key];
  const name = "Gift Box Isi 5 (" + colorLabels[gift5Color] + " " + shapeLabels[gift5Shape] + ", " + chocoLabels[gift5Chocolate] + ")";
  addToCart("giftbox-5-" + key, name, price, 1);
}

function formatRupiah(n){ return "Rp " + n.toLocaleString("id-ID"); }

function changeGift9(color, button) {
  gift9Color = color;
  const image = document.getElementById("gift9-image");
  image.src = "assets/gift-box/9-pcs-" + color + "-box-without-lid.jpeg";
  const buttons = button.parentElement.querySelectorAll(".variation-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  button.classList.add("active");
  document.getElementById("gift9Price").textContent = formatRupiah(GIFT9_PRICES[gift9Color]);
  updateGift5();
}

let gift12Color = "pink";
let gift12Chocolate = "dark-milk";

function addGift9ToCart(){
  const labels = { cream: "Cream", gold: "Gold", pink: "Pink" };
  const price = GIFT9_PRICES[gift9Color];
  addToCart("giftbox-9-" + gift9Color, "Gift Box Isi 9 (" + labels[gift9Color] + ")", price, 1);
}

function addGift12ToCart(){
  const colorLabels = { pink: "Pink", green: "Hijau" };
  const chocoLabels = { "dark-milk": "Dark+Milk", "milk-white": "Milk+White", "dark-white": "Dark+White" };
  const key = gift12Color + "-" + gift12Chocolate;
  const price = GIFT12_PRICES[key];
  addToCart("giftbox-12-" + key, "Gift Box Isi 12 (" + colorLabels[gift12Color] + ", " + chocoLabels[gift12Chocolate] + ")", price, 1);
}

function toBackendProductId(cartId){
  if(cartId.startsWith("giftbox-9-")) return "giftbox-9";
  if(cartId.startsWith("giftbox-12-")) return "giftbox-12";
  return cartId;
}

function updateGift12Image() {
  const image = document.getElementById("gift12-image");
  image.src = "assets/gift-box/12-pcs-" + gift12Color + "-box-without-lid-" + gift12Chocolate + ".jpeg";
  document.getElementById("gift12Price").textContent = formatRupiah(GIFT12_PRICES[gift12Color + "-" + gift12Chocolate]);
  
}

function select12Color(color, button) {
  gift12Color = color;

  const buttons = button.parentElement.querySelectorAll(".variation-btn");

  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  updateGift12Image();
}

function select12Chocolate(chocolate, button) {
  gift12Chocolate = chocolate;

  const buttons = button.parentElement.querySelectorAll(".variation-btn");

  buttons.forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  updateGift12Image();
}

(function(){
  const slides = document.querySelectorAll('#heroSlideshow img');
  if(slides.length < 2) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;
  let i = 0;
  setInterval(()=>{
    slides[i].classList.remove('active');
    i = (i+1) % slides.length;
    slides[i].classList.add('active');
  }, 4000);
})();

/* ---------- review wall slideshows ---------- */
(function(){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const AUTOPLAY_MS = 3200;

  function initSlideshow(show){
    const slides = show.querySelectorAll('.review-slide');
    const dots = show.querySelectorAll('.review-dots .dot');
    if(slides.length < 2) return null;

    let index = 0;
    let timer = null;

    function render(newIndex){
      slides[index].classList.remove('active');
      if(dots[index]) dots[index].classList.remove('active');
      index = (newIndex + slides.length) % slides.length;
      slides[index].classList.add('active');
      if(dots[index]) dots[index].classList.add('active');
    }

    function startAutoplay(){
      if(reduceMotion || timer) return;
      timer = setInterval(() => render(index + 1), AUTOPLAY_MS);
    }

    function stopAutoplay(){
      if(timer){
        clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        render(dotIndex);
      });
    });

    startAutoplay();

    return {
      next: () => render(index + 1),
      prev: () => render(index - 1),
      stopAutoplay
    };
  }

  const controllers = Array.from(document.querySelectorAll('.review-slideshow'))
    .map(initSlideshow)
    .filter(Boolean);

  const globalPrev = document.querySelector('.review-arrow-global.prev');
  const globalNext = document.querySelector('.review-arrow-global.next');

  if(globalPrev){
    globalPrev.addEventListener('click', () => {
      controllers.forEach(c => { c.stopAutoplay(); c.prev(); });
    });
  }

  if(globalNext){
    globalNext.addEventListener('click', () => {
      controllers.forEach(c => { c.stopAutoplay(); c.next(); });
    });
  }
})();

/* ---------- review image lightbox ---------- */
document.addEventListener('DOMContentLoaded', function(){
  const overlay = document.getElementById('lightboxOverlay');
  if(!overlay) return;
  const overlayImg = document.getElementById('lightboxImg');
  const closeBtn = overlay.querySelector('.lightbox-close');

  document.querySelectorAll('.review-slide img').forEach(img => {
    img.addEventListener('click', () => {
      overlayImg.src = img.src;
      overlayImg.alt = img.alt;
      overlay.classList.add('open');
    });
  });

  function closeLightbox(){
    overlay.classList.remove('open');
    overlayImg.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if(e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeLightbox();
  });
});

(function(){
  const track = document.getElementById('storiesTrack');
  const prev = document.getElementById('storyPrev');
  const next = document.getElementById('storyNext');
  if(!track) return;
  function scrollByCard(dir){
    const card = track.querySelector('.story-card');
    const gap = 16;
    const amount = (card ? card.offsetWidth : 220) + gap;
    track.scrollBy({left: dir*amount, behavior:'smooth'});
  }
  prev.addEventListener('click', ()=>scrollByCard(-1));
  next.addEventListener('click', ()=>scrollByCard(1));
})();

(function(){
  const track = document.getElementById('storiesTrack');
  const videos = document.querySelectorAll('.story-card video.lazy-video');
  if(!videos.length || !track) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const v = entry.target;
      if(entry.isIntersecting){
        v.play().catch(()=>{});
      } else {
        v.pause();
      }
    });
  }, { root: track, threshold: 0.6 });

  videos.forEach(v => io.observe(v));
})();

document.addEventListener('DOMContentLoaded', function(){
  const viewer = document.getElementById('storyViewer');
  const mediaWrap = document.getElementById('storyViewerMedia');
  const closeBtn = document.getElementById('storyViewerClose');
  const cards = document.querySelectorAll('.story-card');
  if(!viewer || !cards.length) return;

  function openStory(card){
    const type = card.dataset.type;
    const src = card.dataset.src;
    mediaWrap.innerHTML = '';

    if(type === 'video'){
      const v = document.createElement('video');
      v.src = src; v.controls = true; v.autoplay = true; v.loop = true; v.playsInline = true;
      mediaWrap.appendChild(v);
      const inlineVideo = card.querySelector('video');
      if(inlineVideo) inlineVideo.pause();
    } else {
      const img = document.createElement('img');
      img.src = src; img.alt = '';
      mediaWrap.appendChild(img);
    }
    viewer.classList.add('open');
  }

  function closeStory(){
    viewer.classList.remove('open');
    mediaWrap.innerHTML = '';
  }

cards.forEach(card => {
    card.addEventListener('click', (e) => { e.preventDefault(); openStory(card); });
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openStory(card); }
    });
  });

  closeBtn.addEventListener('click', closeStory);
  viewer.addEventListener('click', (e) => { if(e.target === viewer) closeStory(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && viewer.classList.contains('open')) closeStory(); });
});

let cart = JSON.parse(localStorage.getItem("flowCart") || "[]");

function saveCart(){ localStorage.setItem("flowCart", JSON.stringify(cart)); renderCart(); }

function addToCart(id, name, price, qty){
  const existing = cart.find(i => i.id === id);
  if(existing){ existing.qty += qty; existing.name = name; existing.price = price; }
  else { cart.push({ id, name, price, qty }); }
  saveCart();
  toggleCart(true);
}

function removeFromCart(id){ cart = cart.filter(i => i.id !== id); saveCart(); }
function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) return removeFromCart(id);
  saveCart();
}

document.getElementById("gift9Price").textContent = formatRupiah(GIFT9_PRICES[gift9Color]);
document.getElementById("gift12Price").textContent = formatRupiah(GIFT12_PRICES[gift12Color + "-" + gift12Chocolate]);
updateGift5();

function renderCart(){
  const wrap = document.getElementById("cartItems");
  const empty = document.getElementById("cartEmpty");
  const checkoutSection = document.getElementById("cartCheckoutSection");
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartCount").textContent = count;

  if(cart.length === 0){
    wrap.innerHTML = ""; empty.style.display = "block"; checkoutSection.style.display = "none";
    return;
  }
  empty.style.display = "none"; checkoutSection.style.display = "flex";

  wrap.innerHTML = cart.map(i => `
    <div class="cart-item">
      <span>${i.name}</span>
      <span>
        <button onclick="changeQty('${i.id}',-1)">-</button> ${i.qty} <button onclick="changeQty('${i.id}',1)">+</button>
        <button onclick="removeFromCart('${i.id}')">✕</button>
      </span>
    </div>`).join("");

  const itemsTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const grandTotal = itemsTotal + shippingCost;

  document.getElementById("cartTotal").textContent = "Rp " + grandTotal.toLocaleString("id-ID");
}


function toggleCart(open){
  document.getElementById("cartOverlay").classList.toggle("open", open);
  if(open) prefillSavedAddress();
}

function toggleAuth(open){
  document.getElementById("authOverlay").classList.toggle("open", open);
}

async function updateAuthHeader(){
  const btn = document.getElementById("authBtn");
  const token = localStorage.getItem("flowToken");

  if(!token){
    btn.textContent = "👤 Masuk";
    btn.onclick = () => toggleAuth(true);
    return;
  }

  try{
    const res = await apiFetch(API_BASE + "/api/accounts/me", {
      headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();
    if(data.error){ logout(); return; }

    btn.textContent = "👤 " + data.name;
    btn.onclick = () => openSettings(data);
  }catch(err){
    logout();
  }
}

function toggleSettings(open){
  document.getElementById("settingsOverlay").classList.toggle("open", open);
}

function openSettings(account){
  document.getElementById("settingsName").textContent = account.name;

  const phoneInput = document.getElementById("settingsPhone");
  const emailInput = document.getElementById("settingsEmail");

  phoneInput.value = account.phone || "";
  phoneInput.disabled = !!account.phone;

  emailInput.value = account.email || "";
  emailInput.disabled = !!account.email;

  document.getElementById("settingsError").textContent = "";
  toggleSettings(true);
  loadMyOrders();
}

async function submitSettings(){
  const phone = document.getElementById("settingsPhone").value.trim();
  const email = document.getElementById("settingsEmail").value.trim();
  const errorEl = document.getElementById("settingsError");
  errorEl.textContent = "";

  const token = localStorage.getItem("flowToken");

  try{
    const res = await apiFetch(API_BASE + "/api/accounts/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ phone, email })
    });
    const data = await res.json();
    if(data.error){ errorEl.textContent = data.error; return; }

    alert("Data akun berhasil disimpan.");
    toggleSettings(false);
  }catch(err){
    errorEl.textContent = "Gagal terhubung ke server.";
  }
}

function logout(){
  localStorage.removeItem("flowToken");
  localStorage.removeItem("flowName");
  updateAuthHeader();
}

async function submitRegister(){
  const name = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const errorEl = document.getElementById("authError");
  errorEl.textContent = "";

  if(!name || !password){ errorEl.textContent = "Nama dan password wajib diisi."; return; }
  if(!phone && !email){ errorEl.textContent = "Isi salah satu: No. WhatsApp atau Email."; return; }

  try{
    const res = await apiFetch(API_BASE + "/api/accounts/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone: phone || undefined, email: email || undefined, password })
    });
    const data = await res.json();
    if(data.error){ errorEl.textContent = data.error; return; }

    alert("Akun berhasil dibuat! Selamat datang, " + data.name);
    toggleAuth(false);
  }catch(err){
    errorEl.textContent = "Gagal terhubung ke server.";
  }
}

function showLoginForm(){
  document.getElementById("authTitle").textContent = "Masuk";
  document.getElementById("loginForm").style.display = "flex";
  document.getElementById("registerForm").style.display = "none";
}

function showRegisterForm(){
  document.getElementById("authTitle").textContent = "Daftar Akun";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "flex";
}

async function submitLogin(){
  const identifier = document.getElementById("loginIdentifier").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");
  errorEl.textContent = "";

  if(!identifier || !password){ errorEl.textContent = "Isi No. WhatsApp/Email dan password."; return; }

  try{
    const res = await apiFetch(API_BASE + "/api/accounts/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    if(data.error){ errorEl.textContent = data.error; return; }

    localStorage.setItem("flowToken", data.token);
    localStorage.setItem("flowName", data.name);
    updateAuthHeader();
    toggleAuth(false);
  }catch(err){
    errorEl.textContent = "Gagal terhubung ke server.";
  }
}

async function prefillSavedAddress(){
  const token = localStorage.getItem("flowToken");
  if(!token) return;

  // Don't overwrite anything the customer has already started filling in
  if(document.getElementById("custProvince").value) return;

  try{
    const res = await apiFetch(API_BASE + "/api/accounts/me", {
      headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();
    if(data.error || !data.savedAddress || !data.savedAddress.provinceCode) return;

    const addr = data.savedAddress;

    if(!document.getElementById("custName").value) document.getElementById("custName").value = data.name || "";
    if(!document.getElementById("custPhone").value) document.getElementById("custPhone").value = data.phone || "";

    document.getElementById("custProvince").value = addr.provinceCode;
    await loadCities(addr.provinceCode);

    document.getElementById("custCity").value = addr.cityCode;
    await loadDistricts(addr.cityCode);

    document.getElementById("custDistrict").value = addr.districtCode;
    await loadShippingOptions(addr.districtCode);

    document.getElementById("custAddress").value = addr.address || "";
  }catch(err){
    // Prefill is a convenience, not a requirement -- fail quietly
  }
}

async function saveAddressIfLoggedIn(destination, address){
  const token = localStorage.getItem("flowToken");
  if(!token) return;

  try{
    await apiFetch(API_BASE + "/api/accounts/address", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({ ...destination, address })
    });
  }catch(err){
    // Saving the address is a convenience, not a requirement -- fail quietly
  }
}

const WILAYAH_API = API_BASE + "/api/wilayah";

async function loadProvinces() {
  const res = await apiFetch(`${WILAYAH_API}/provinces`);
  const json = await res.json();
  const select = document.getElementById("custProvince");
  json.data.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.code;
    opt.textContent = p.name;
    select.appendChild(opt);
  });
}

async function loadCities(provinceCode) {
  const citySelect = document.getElementById("custCity");
  const districtSelect = document.getElementById("custDistrict");
  citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten</option>';
  districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
  districtSelect.disabled = true;
  if (!provinceCode) { citySelect.disabled = true; return; }

  const res = await apiFetch(`${WILAYAH_API}/regencies/${provinceCode}`);
  const json = await res.json();
  json.data.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.code;
    opt.textContent = c.name;
    citySelect.appendChild(opt);
  });
  citySelect.disabled = false;
}

async function loadDistricts(regencyCode) {
  const districtSelect = document.getElementById("custDistrict");
  districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
  if (!regencyCode) { districtSelect.disabled = true; return; }

  const res = await apiFetch(`${WILAYAH_API}/districts/${regencyCode}`);
  const json = await res.json();
  json.data.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.code;
    opt.textContent = d.name;
    districtSelect.appendChild(opt);
  });
  districtSelect.disabled = false;
}

async function submitCheckout(){
  const name = document.getElementById("custName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const errorEl = document.getElementById("cartError");
  errorEl.textContent = "";

  if(!name || !phone || !address){ errorEl.textContent = "Lengkapi semua data dulu ya."; return; }
  if(cart.length === 0){ errorEl.textContent = "Keranjang masih kosong."; return; }

  if(!CHECKOUT_LIVE){
    const lines = cart.map(i => `- ${i.name} x${i.qty} (Rp ${(i.price*i.qty).toLocaleString("id-ID")})`).join("\n");
    const subtotal = cart.reduce((sum,i) => sum + i.price*i.qty, 0);
    const msg = `Halo Flow Chocolates, saya mau order:\n\n${lines}\n\nSubtotal: Rp ${subtotal.toLocaleString("id-ID")} (belum termasuk ongkir)\n\nNama: ${name}\nNo. HP: ${phone}\nAlamat: ${address}\n\nMohon info total + ongkos kirim ke alamat saya ya, terima kasih!`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    return;
  }

  // ... your existing fetch(API_BASE + "/api/checkout") code stays exactly as it is below this line
}

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById("custProvince").addEventListener("change", e => loadCities(e.target.value));
  document.getElementById("custCity").addEventListener("change", e => loadDistricts(e.target.value));
  document.getElementById("custDistrict").addEventListener("change", e => loadShippingOptions(e.target.value));
  loadProvinces();
  renderCart();
  updateAuthHeader();
  
  const params = new URLSearchParams(window.location.search);
  const paidOrder = params.get("paid");
  const pendingOrder = params.get("pending");
  const finishOrderId = params.get("order_id");
  const finishStatus = params.get("transaction_status");
  const banner = document.getElementById("orderStatusBanner");
  const bannerText = document.getElementById("orderStatusText");

  if(paidOrder){
    bannerText.textContent = "Pembayaran berhasil! Terima kasih atas pesanan " + paidOrder + ". Struk pembayaran sudah dikirim ke email kamu — cek folder spam/promosi jika belum muncul di kotak masuk.";
    banner.style.display = "flex";
    window.history.replaceState({}, "", "index.html");
  } else if(pendingOrder){
    const link = "payment.html?order=" + encodeURIComponent(pendingOrder);
    if(confirm("Pesanan " + pendingOrder + " sedang menunggu pembayaran. Klik OK untuk melanjutkan pembayaran sekarang.")){
      window.location.href = link;
    }
    window.history.replaceState({}, "", "index.html");
  } else if(finishOrderId && finishStatus){
    if(finishStatus === "settlement" || finishStatus === "capture"){
      bannerText.textContent = "Pembayaran berhasil! Terima kasih atas pesanan " + finishOrderId + ". Struk pembayaran sudah dikirim ke email kamu — cek folder spam/promosi jika belum muncul di kotak masuk.";
      banner.style.display = "flex";
    } else if(finishStatus === "pending"){
      const link = "payment.html?order=" + encodeURIComponent(finishOrderId);
      if(confirm("Pesanan " + finishOrderId + " sedang menunggu pembayaran. Klik OK untuk melanjutkan pembayaran sekarang.")){
        window.location.href = link;
      }
    } else {
      bannerText.textContent = "Pesanan " + finishOrderId + " tidak berhasil diproses. Silakan coba lagi.";
      banner.style.display = "flex";
    }
    window.history.replaceState({}, "", "index.html");
  } else {
  const lastOrder = localStorage.getItem("flowLastOrder");
  if(lastOrder){
    apiFetch(API_BASE + "/api/orders/" + lastOrder).then(res => res.json()).then(order => {
      if(order.error) return;
      if(order.status === "paid"){
        bannerText.textContent = "Pembayaran berhasil! Terima kasih atas pesanan " + lastOrder + ". Struk pembayaran sudah dikirim ke email kamu, cek folder spam/promosi jika belum muncul di kotak masuk.";
        banner.style.display = "flex";
        localStorage.removeItem("flowLastOrder");
      } else if(order.status === "pending"){
        const link = "payment.html?order=" + encodeURIComponent(lastOrder);
        if(confirm("Pesanan " + lastOrder + " sedang menunggu pembayaran. Klik OK untuk melanjutkan pembayaran sekarang.")){
          window.location.href = link;
        }
        localStorage.removeItem("flowLastOrder");
      }
      // if status is anything else (failed), just silently clear it -- no banner needed
      else {
        localStorage.removeItem("flowLastOrder");
      }
    }).catch(() => {});
  }
}
  
});

let selectedShipping = null;

async function loadShippingOptions(districtCode) {
  const container = document.getElementById("shippingOptions");
  container.innerHTML = "";
  selectedShipping = null;

  if (!districtCode || cart.length === 0) return;

  if(!CHECKOUT_LIVE){
    selectedShipping = { courier: "manual", service: "-", price: 0, eta: "-" };
    container.innerHTML = '<p style="font-size:.82rem;color:var(--cacao);font-weight:600;">Ongkos kirim akan dikonfirmasi manual lewat WhatsApp setelah kamu klik "Bayar Sekarang".</p>';
    return;
  }

  const res = await apiFetch(API_BASE + "/api/shipping-options", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: cart.map(i => ({ productId: i.id, qty: i.qty })),
      destination: { districtCode }
    })
  });
  const data = await res.json();

  data.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "variation-btn shipping-btn";
    btn.textContent = opt.courier.toUpperCase() + " " + opt.service + " - " + formatRupiah(opt.price) + " (" + opt.eta + ")";
    btn.onclick = () => {
      selectedShipping = opt;
      container.querySelectorAll(".variation-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCart(); // refresh total to include shipping
    };
    container.appendChild(btn);
  });
}

async function loadMyOrders(){
  const token = localStorage.getItem("flowToken");
  const container = document.getElementById("myOrders");
  container.innerHTML = "Memuat...";

  try{
    const res = await apiFetch(API_BASE + "/api/accounts/orders", {
      headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();

    if(!data.orders || data.orders.length === 0){
      container.innerHTML = "<p style='font-size:.85rem;color:var(--cacao);'>Belum ada pesanan.</p>";
      return;
    }

    container.innerHTML = data.orders.map(o => `
      <div class="cart-item">
        <span>${o.id} - ${formatRupiah(o.total)}</span>
        <span>
          ${o.status === 'pending'
            ? `<a href="payment.html?order=${encodeURIComponent(o.id)}" class="btn btn-pink" style="font-size:.75rem;padding:6px 12px;">Bayar</a>`
            : `<span style="font-weight:700;">${o.status}</span>`}
        </span>
      </div>
    `).join("");
  }catch(err){
    container.innerHTML = "<p style='font-size:.85rem;'>Gagal memuat pesanan.</p>";
  }
}

