(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  const FALLBACK_IMG =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23FFE4DC'/%3E%3Ctext x='50%25' y='53%25' font-size='14' fill='%23FF4429' text-anchor='middle' font-family='sans-serif'%3EGambar tidak tersedia%3C/text%3E%3C/svg%3E";

  function formatId(id) {
    return "#" + String(id).padStart(3, "0");
  }

  function normalize(str) {
    return String(str).toLowerCase().trim();
  }

  // Matches "20", "020", "#20", "#020" against a product id
  function idMatchesQuery(id, q) {
    const cleaned = q.replace(/^#/, "").replace(/^0+(?=\d)/, "");
    if (cleaned === "" || !/^\d+$/.test(cleaned)) return false;
    return Number(cleaned) === id;
  }

  const SAVE_KEY = "shopfinds_saved_ids";
  function getSavedIds() {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function setSavedIds(ids) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(ids));
    } catch (e) {
      /* localStorage unavailable — saved feature silently no-ops */
    }
  }
  function isSaved(id) {
    return getSavedIds().includes(id);
  }
  function toggleSaved(id) {
    const ids = getSavedIds();
    const idx = ids.indexOf(id);
    if (idx === -1) ids.push(id);
    else ids.splice(idx, 1);
    setSavedIds(ids);
    return ids.includes(id);
  }

  /* ---------- state ---------- */
  let activeCategory = "All";
  let searchQuery = "";

  /* ---------- category pills ---------- */
  function renderCategoryPills(container, onSelect) {
    container.innerHTML = "";
    CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "pill" + (cat === activeCategory ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", () => onSelect(cat));
      container.appendChild(btn);
    });
  }

  function refreshPillStates() {
    $$(".pill").forEach((p) => {
      p.classList.toggle("active", p.textContent === activeCategory);
    });
  }

  /* ---------- filtering ---------- */
  function filterProducts(query, category) {
    const q = normalize(query);
    return products.filter((p) => {
      const inCategory = category === "All" || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;

      if (idMatchesQuery(p.id, q)) return true;

      const haystack = [p.name, p.category, ...(p.keywords || [])]
        .map(normalize)
        .join(" ");
      return haystack.includes(q);
    });
  }

  /* ---------- card rendering ---------- */
  const cardTemplate = $("#cardTemplate");

  function buildCard(product) {
    const node = cardTemplate.content.firstElementChild.cloneNode(true);
    const img = $("img", node);
    img.src = product.image;
    img.alt = product.name;
    img.addEventListener("error", () => {
      img.src = FALLBACK_IMG;
    });

    $(".card-id", node).textContent = formatId(product.id);
    $(".card-name", node).textContent = product.name;
    $(".card-category", node).textContent = product.category;
    $(".card-price", node).textContent = product.price || "";

    const saveBtn = $(".save-toggle", node);
    if (isSaved(product.id)) saveBtn.classList.add("saved");
    saveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const nowSaved = toggleSaved(product.id);
      saveBtn.classList.toggle("saved", nowSaved);
      if ($("#savedView").classList.contains("open")) renderSavedView();
    });

    node.addEventListener("click", () => openDetail(product.id));
    node.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openDetail(product.id);
    });

    return node;
  }

  function renderGrid(container, emptyEl, list) {
    container.innerHTML = "";
    if (list.length === 0) {
      container.classList.add("hidden");
      if (emptyEl) emptyEl.classList.remove("hidden");
      return;
    }
    container.classList.remove("hidden");
    if (emptyEl) emptyEl.classList.add("hidden");
    const frag = document.createDocumentFragment();
    list.forEach((p) => frag.appendChild(buildCard(p)));
    container.appendChild(frag);
  }

  /* ---------- catalog (home) ---------- */
  const productGrid = $("#productGrid");
  const catalogEmpty = $("#catalogEmpty");
  const catalogLabel = $("#catalogLabel");
  const categoryRow = $("#categoryRow");

  function renderCatalog() {
    const list = filterProducts("", activeCategory);
    catalogLabel.textContent =
      activeCategory === "All" ? "Semua produk" : activeCategory;
    renderGrid(productGrid, catalogEmpty, list);
  }

  renderCategoryPills(categoryRow, (cat) => {
    activeCategory = cat;
    refreshPillStates();
    renderCatalog();
  });
  renderCatalog();

  /* ---------- search overlay ---------- */
  const searchOverlay = $("#searchOverlay");
  const searchInput = $("#searchInput");
  const searchGrid = $("#searchGrid");
  const searchEmpty = $("#searchEmpty");
  const searchIdle = $("#searchIdle");
  const searchCount = $("#searchCount");
  const clearSearchBtn = $("#clearSearchBtn");
  const searchCatRow = $("#searchCatRow");
  let searchCategory = "All";

  renderCategoryPills(searchCatRow, (cat) => {
    searchCategory = cat;
    $$(".pill", searchCatRow).forEach((p) =>
      p.classList.toggle("active", p.textContent === cat)
    );
    runSearch();
  });
  // search pills start independent of home pills
  $$(".pill", searchCatRow).forEach((p) =>
    p.classList.toggle("active", p.textContent === "All")
  );

  function runSearch() {
    const q = searchInput.value.trim();
    searchQuery = q;
    clearSearchBtn.classList.toggle("hidden", q.length === 0);

    if (q.length === 0) {
      searchIdle.classList.remove("hidden");
      searchEmpty.classList.add("hidden");
      searchGrid.classList.add("hidden");
      searchCount.textContent = "";
      return;
    }
    searchIdle.classList.add("hidden");

    const list = filterProducts(q, searchCategory);
    searchCount.textContent =
      list.length === 0
        ? ""
        : `${list.length} hasil ditemukan`;
    renderGrid(searchGrid, searchEmpty, list);
  }

  searchInput.addEventListener("input", runSearch);
  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    runSearch();
    searchInput.focus();
  });

  function openSearch() {
    searchOverlay.classList.add("open");
    searchOverlay.setAttribute("aria-hidden", "false");
    setTimeout(() => searchInput.focus(), 200);
    runSearch();
  }
  function closeSearch() {
    searchOverlay.classList.remove("open");
    searchOverlay.setAttribute("aria-hidden", "true");
  }

  $("#openSearchBtn").addEventListener("click", openSearch);
  $("#closeSearchBtn").addEventListener("click", closeSearch);

  /* ---------- product detail ---------- */
  const detailView = $("#detailView");
  const detailBody = $("#detailBody");
  const detailCtaLink = $("#detailCtaLink");
  const detailSaveBtn = $("#detailSaveBtn");
  let currentDetailId = null;

  function openDetail(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    currentDetailId = id;

    detailBody.innerHTML = `
      <div class="detail-image">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" />
      </div>
      <div class="detail-id">${formatId(product.id)}</div>
      <h2 class="detail-name">${escapeHtml(product.name)}</h2>
      <div class="detail-row">
        <span class="detail-category-tag">${escapeHtml(product.category)}</span>
        ${product.price ? `<span class="detail-price">${escapeHtml(product.price)}</span>` : ""}
      </div>
      <p class="detail-desc">${escapeHtml(product.description || "")}</p>
    `;
    const img = $("img", detailBody);
    img.addEventListener("error", () => {
      img.src = FALLBACK_IMG;
    });

    detailCtaLink.href = product.shopee;
    detailSaveBtn.classList.toggle("saved", isSaved(product.id));

    detailView.classList.add("open");
    detailView.setAttribute("aria-hidden", "false");
    detailBody.scrollTop = 0;
  }

  function closeDetail() {
    detailView.classList.remove("open");
    detailView.setAttribute("aria-hidden", "true");
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  $("#detailBackBtn").addEventListener("click", closeDetail);
  detailSaveBtn.addEventListener("click", () => {
    if (currentDetailId == null) return;
    const nowSaved = toggleSaved(currentDetailId);
    detailSaveBtn.classList.toggle("saved", nowSaved);
    renderCatalog();
  });

  /* ---------- saved view ---------- */
  const savedView = $("#savedView");
  const savedGrid = $("#savedGrid");
  const savedEmpty = $("#savedEmpty");

  function renderSavedView() {
    const ids = getSavedIds();
    const list = products.filter((p) => ids.includes(p.id));
    renderGrid(savedGrid, savedEmpty, list);
  }

  function openSaved() {
    renderSavedView();
    savedView.classList.add("open");
    savedView.setAttribute("aria-hidden", "false");
  }
  function closeSaved() {
    savedView.classList.remove("open");
    savedView.setAttribute("aria-hidden", "true");
  }
  $("#savedCloseBtn").addEventListener("click", closeSaved);

  /* ---------- bottom nav ---------- */
  $$(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".nav-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.nav;
      if (target === "search") {
        openSearch();
      } else if (target === "saved") {
        openSaved();
      } else {
        closeSearch();
        closeSaved();
        closeDetail();
      }
    });
  });

  /* ---------- android back button support (history) ---------- */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (detailView.classList.contains("open")) closeDetail();
      else if (searchOverlay.classList.contains("open")) closeSearch();
      else if (savedView.classList.contains("open")) closeSaved();
    }
  });
})();
                                   
