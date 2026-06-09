const state = {
    clothes: [],
    selectedId: null,
    importDrafts: [],
    wellnessEntries: [],
    currentTravelList: null,
    activePage: "closet",
};

const defaultApiBaseUrl = window.location.protocol === "capacitor:"
    ? ""
    : window.location.protocol === "file:"
        ? "http://localhost:8080"
        : window.location.origin;

const els = {
    grid: document.querySelector("#clothesGrid"),
    detail: document.querySelector("#detailPanel"),
    dialog: document.querySelector("#itemDialog"),
    form: document.querySelector("#itemForm"),
    dialogTitle: document.querySelector("#dialogTitle"),
    totalCount: document.querySelector("#totalCount"),
    careCount: document.querySelector("#careCount"),
    idleCount: document.querySelector("#idleCount"),
    seasonFilter: document.querySelector("#seasonFilter"),
    occasionFilter: document.querySelector("#occasionFilter"),
    sortBy: document.querySelector("#sortBy"),
    toast: document.querySelector("#toast"),
    settingsDialog: document.querySelector("#settingsDialog"),
    settingsForm: document.querySelector("#settingsForm"),
    apiBaseUrl: document.querySelector("#apiBaseUrl"),
    batchImageFiles: document.querySelector("#batchImageFiles"),
    importDialog: document.querySelector("#importDialog"),
    importForm: document.querySelector("#importForm"),
    importList: document.querySelector("#importList"),
    topTitle: document.querySelector(".top-bar h1"),
    closetPage: document.querySelector("#closetPage"),
    browseSection: document.querySelector("#browseSection"),
    outfitsPage: document.querySelector("#outfitsPage"),
    fittingPage: document.querySelector("#fittingPage"),
    toolsPage: document.querySelector("#toolsPage"),
    wellnessPage: document.querySelector("#wellnessPage"),
    recentGrid: document.querySelector("#recentGrid"),
    homeRecommendation: document.querySelector("#homeRecommendation"),
    weatherTemp: document.querySelector("#weatherTemp"),
    weatherSummary: document.querySelector("#weatherSummary"),
    homeTemperature: document.querySelector("#homeTemperature"),
    homeSeason: document.querySelector("#homeSeason"),
    homeOccasion: document.querySelector("#homeOccasion"),
    outfitForm: document.querySelector("#outfitForm"),
    outfitOccasion: document.querySelector("#outfitOccasion"),
    outfitSeason: document.querySelector("#outfitSeason"),
    outfitTemperature: document.querySelector("#outfitTemperature"),
    outfitColor: document.querySelector("#outfitColor"),
    outfitResults: document.querySelector("#outfitResults"),
    avatarBody: document.querySelector("#avatarBody"),
    avatarHead: document.querySelector("#avatarHead"),
    avatarHair: document.querySelector("#avatarHair"),
    avatarStyle: document.querySelector("#avatarStyle"),
    avatarShape: document.querySelector("#avatarShape"),
    avatarSkin: document.querySelector("#avatarSkin"),
    avatarHairStyle: document.querySelector("#avatarHairStyle"),
    avatarScale: document.querySelector("#avatarScale"),
    fitTopSelect: document.querySelector("#fitTopSelect"),
    fitBottomSelect: document.querySelector("#fitBottomSelect"),
    fitOuterwearSelect: document.querySelector("#fitOuterwearSelect"),
    fitShoesSelect: document.querySelector("#fitShoesSelect"),
    fitBagSelect: document.querySelector("#fitBagSelect"),
    fitLayerTop: document.querySelector("#fitLayerTop"),
    fitLayerBottom: document.querySelector("#fitLayerBottom"),
    fitLayerOuterwear: document.querySelector("#fitLayerOuterwear"),
    fitLayerShoes: document.querySelector("#fitLayerShoes"),
    fitLayerBag: document.querySelector("#fitLayerBag"),
    fittingSummary: document.querySelector("#fittingSummary"),
    wellnessForm: document.querySelector("#wellnessForm"),
    wellnessDate: document.querySelector("#wellnessDate"),
    weightKg: document.querySelector("#weightKg"),
    mood: document.querySelector("#mood"),
    periodStart: document.querySelector("#periodStart"),
    periodDay: document.querySelector("#periodDay"),
    importantEvents: document.querySelector("#importantEvents"),
    wellnessNotes: document.querySelector("#wellnessNotes"),
    wellnessList: document.querySelector("#wellnessList"),
    cycleAlert: document.querySelector("#cycleAlert"),
    cycleLength: document.querySelector("#cycleLength"),
    periodLength: document.querySelector("#periodLength"),
    calendarOutput: document.querySelector("#calendarOutput"),
    careReminderList: document.querySelector("#careReminderList"),
    idleReminderList: document.querySelector("#idleReminderList"),
    colorAnalysis: document.querySelector("#colorAnalysis"),
    shoppingCategory: document.querySelector("#shoppingCategory"),
    shoppingColor: document.querySelector("#shoppingColor"),
    shoppingCheckResult: document.querySelector("#shoppingCheckResult"),
    shoppingDecisionOutput: document.querySelector("#shoppingDecisionOutput"),
    favoriteOutfitList: document.querySelector("#favoriteOutfitList"),
    occasionTemplates: document.querySelector("#occasionTemplates"),
    travelDestination: document.querySelector("#travelDestination"),
    travelDays: document.querySelector("#travelDays"),
    travelSeason: document.querySelector("#travelSeason"),
    travelOccasion: document.querySelector("#travelOccasion"),
    travelTemperature: document.querySelector("#travelTemperature"),
    travelCustomItem: document.querySelector("#travelCustomItem"),
    travelCustomQuantity: document.querySelector("#travelCustomQuantity"),
    travelPlanOutput: document.querySelector("#travelPlanOutput"),
    privacySummary: document.querySelector("#privacySummary"),
    partnerAccessPanel: document.querySelector("#partnerAccessPanel"),
};

const fields = {
    id: document.querySelector("#itemId"),
    imageUrl: document.querySelector("#imageUrl"),
    imageFile: document.querySelector("#imageFile"),
    name: document.querySelector("#name"),
    category: document.querySelector("#category"),
    color: document.querySelector("#color"),
    season: document.querySelector("#season"),
    occasion: document.querySelector("#occasion"),
    material: document.querySelector("#material"),
    brand: document.querySelector("#brand"),
    price: document.querySelector("#price"),
    sizeLabel: document.querySelector("#sizeLabel"),
    purchaseDate: document.querySelector("#purchaseDate"),
    outfitAdoptionCount: document.querySelector("#outfitAdoptionCount"),
    specialCare: document.querySelector("#specialCare"),
    specialTag: document.querySelector("#specialTag"),
    careInstructions: document.querySelector("#careInstructions"),
    specialMeaning: document.querySelector("#specialMeaning"),
    recyclingNotes: document.querySelector("#recyclingNotes"),
};

const labels = {
    spring: "Spring",
    summer: "Summer",
    autumn: "Autumn",
    winter: "Winter",
    work: "Work",
    casual: "Casual",
    party: "Party",
    sport: "Sport",
    outerwear: "Outerwear",
    top: "Top",
    bottom: "Bottom",
    dress: "Dress",
    shoes: "Shoes",
    bag: "Bag",
    accessory: "Accessory",
    unknown: "Unknown",
    calm: "Calm",
    happy: "Happy",
    tired: "Tired",
    anxious: "Anxious",
    low: "Low",
    angry: "Irritated",
};

function todayString() {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000;
    return new Date(today.getTime() - offset).toISOString().slice(0, 10);
}

function defaultSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 3 && month <= 5) return "spring";
    if (month >= 6 && month <= 8) return "summer";
    if (month >= 9 && month <= 11) return "autumn";
    return "winter";
}

function weatherText(code) {
    if ([0, 1].includes(code)) return "Clear";
    if ([2, 3].includes(code)) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Current Weather";
}

function labelOf(value) {
    return labels[value] || value || "Not Set";
}

function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

function apiUrl(path, params = {}) {
    const configuredBaseUrl = localStorage.getItem("smartOutfitApiBaseUrl") || defaultApiBaseUrl;
    const url = new URL(path, configuredBaseUrl || window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            url.searchParams.set(key, value);
        }
    });
    return url;
}

function assetUrl(path) {
    if (!path || path.startsWith("data:")) {
        return path;
    }

    if (path.startsWith("/uploads/")) {
        return apiUrl(path).toString();
    }

    try {
        const parsed = new URL(path);
        if ((parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") && parsed.pathname.startsWith("/uploads/")) {
            return apiUrl(parsed.pathname).toString();
        }
        return parsed.toString();
    } catch (error) {
        return new URL(path, window.location.href).toString();
    }
}

function storedImageUrl(path) {
    if (!path) {
        return null;
    }

    try {
        const parsed = new URL(path);
        if ((parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") && parsed.pathname.startsWith("/uploads/")) {
            return parsed.pathname;
        }
    } catch (error) {
        return path;
    }

    return path;
}

function openSettings() {
    els.apiBaseUrl.value = localStorage.getItem("smartOutfitApiBaseUrl") || defaultApiBaseUrl;
    els.settingsDialog.showModal();
}

function saveSettings(event) {
    event.preventDefault();
    const value = els.apiBaseUrl.value.trim().replace(/\/$/, "");
    if (value) {
        localStorage.setItem("smartOutfitApiBaseUrl", value);
    } else {
        localStorage.removeItem("smartOutfitApiBaseUrl");
    }
    els.settingsDialog.close();
    loadClothes();
    showToast("API address updated");
}

function resetApiBaseUrl() {
    localStorage.removeItem("smartOutfitApiBaseUrl");
    els.apiBaseUrl.value = defaultApiBaseUrl;
    showToast("Restored current address");
}

function updateWeatherChip(summary = "Manual weather") {
    els.weatherTemp.textContent = `${Math.round(Number(els.homeTemperature.value || 0))}°C`;
    els.weatherSummary.textContent = summary;
}

function switchPage(page) {
    state.activePage = page;
    els.closetPage.classList.toggle("active", page === "closet");
    els.outfitsPage.classList.toggle("active", page === "outfits");
    els.fittingPage.classList.toggle("active", page === "fitting");
    els.toolsPage.classList.toggle("active", page === "tools");
    els.wellnessPage.classList.toggle("active", page === "wellness");
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.classList.toggle("active", button.dataset.page === page);
    });
    els.topTitle.textContent = page === "wellness"
        ? "Wellness"
        : page === "outfits"
            ? "Outfit Planner"
            : page === "fitting"
                ? "My Fitting Mirror"
                : page === "tools"
                    ? "Tools"
                    : "My Wardrobe";

    if (page === "wellness") {
        loadWellnessEntries();
    } else if (page === "outfits" && !els.outfitResults.innerHTML.trim()) {
        renderEmptyOutfitState();
    } else if (page === "fitting") {
        renderFittingRoom();
    } else if (page === "tools") {
        renderTools();
    }
}

function showBrowseSection() {
    switchPage("closet");
    els.browseSection.hidden = false;
    renderGrid();
    renderSelectedDetail();
    els.browseSection.scrollIntoView({behavior: "smooth", block: "start"});
}

function hideBrowseSection() {
    els.browseSection.hidden = true;
}

async function request(path, options = {}) {
    const {params, ...fetchOptions} = options;
    const target = typeof path === "string" ? apiUrl(path, params) : path;
    const response = await fetch(target, {
        headers: fetchOptions.body instanceof FormData ? undefined : {"Content-Type": "application/json"},
        ...fetchOptions,
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const contentType = response.headers.get("content-type") || "";
    return contentType.includes("application/json") ? response.json() : response.text();
}

async function loadClothes() {
    els.grid.innerHTML = `<div class="image-placeholder">Loading</div>`;
    els.recentGrid.innerHTML = `<div class="image-placeholder">Loading</div>`;
    try {
        state.clothes = await request("/clothes", {
            params: {sortBy: "createdAt", direction: "desc"},
        });
        renderStats();
        renderHomeRecent();
        renderGrid();
        renderSelectedDetail();
        renderHomeRecommendation();
    } catch (error) {
        state.clothes = demoClothes();
        renderStats();
        renderHomeRecent();
        renderGrid();
        renderSelectedDetail();
        renderHomeRecommendation();
        showToast("Demo mode: backend is not connected");
    }
}

function demoClothes() {
    const now = new Date().toISOString();
    return [
        {
            id: 1001,
            name: "White Cotton Shirt",
            imageUrl: "sample-clothes/white-shirt.svg",
            category: "top",
            color: "white",
            season: "spring",
            occasion: "work",
            material: "cotton",
            brand: "Demo Studio",
            price: 49.99,
            sizeLabel: "M",
            purchaseDate: "2025-04-12",
            wearCount: 8,
            outfitAdoptionCount: 3,
            favoriteScore: 68,
            specialCare: false,
            specialTag: false,
            careInstructions: "Machine wash cold, hang dry.",
            recyclingNotes: "",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 1002,
            name: "Navy Blazer",
            imageUrl: "sample-clothes/navy-blazer.svg",
            category: "outerwear",
            color: "blue",
            season: "autumn",
            occasion: "work",
            material: "wool",
            brand: "Demo Atelier",
            price: 129.99,
            sizeLabel: "M",
            purchaseDate: "2024-10-03",
            wearCount: 5,
            outfitAdoptionCount: 4,
            favoriteScore: 68,
            specialCare: true,
            specialTag: false,
            careInstructions: "Dry clean recommended.",
            recyclingNotes: "",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 1003,
            name: "Black Trousers",
            imageUrl: "sample-clothes/black-trousers.svg",
            category: "bottom",
            color: "black",
            season: "autumn",
            occasion: "work",
            material: "polyester",
            brand: "Demo Basics",
            price: 69.99,
            sizeLabel: "38",
            purchaseDate: "2025-01-18",
            wearCount: 11,
            outfitAdoptionCount: 5,
            favoriteScore: 100,
            specialCare: false,
            specialTag: false,
            careInstructions: "Wash inside out.",
            recyclingNotes: "",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 1004,
            name: "Red Date Dress",
            imageUrl: "sample-clothes/red-dress.svg",
            category: "dress",
            color: "red",
            season: "summer",
            occasion: "party",
            material: "silk",
            brand: "Demo Muse",
            price: 159.99,
            sizeLabel: "S",
            purchaseDate: "2024-06-20",
            wearCount: 2,
            outfitAdoptionCount: 2,
            favoriteScore: 32,
            specialCare: true,
            specialTag: true,
            specialMeaning: "Anniversary dinner outfit.",
            careInstructions: "Professional care recommended.",
            recyclingNotes: "",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 1005,
            name: "White Sneakers",
            imageUrl: "sample-clothes/white-sneakers.svg",
            category: "shoes",
            color: "white",
            season: "spring",
            occasion: "casual",
            material: "leather",
            brand: "Demo Walk",
            price: 89.99,
            sizeLabel: "38",
            purchaseDate: "2025-03-09",
            wearCount: 9,
            outfitAdoptionCount: 3,
            favoriteScore: 72,
            specialCare: true,
            specialTag: false,
            careInstructions: "Wipe clean after rain.",
            recyclingNotes: "",
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 1006,
            name: "Tan Leather Bag",
            imageUrl: "sample-clothes/tan-bag.svg",
            category: "bag",
            color: "brown",
            season: "spring",
            occasion: "work",
            material: "leather",
            brand: "Demo Carry",
            price: 119.99,
            sizeLabel: "One size",
            purchaseDate: "2024-11-14",
            wearCount: 6,
            outfitAdoptionCount: 3,
            favoriteScore: 60,
            specialCare: true,
            specialTag: false,
            careInstructions: "Use leather conditioner regularly.",
            recyclingNotes: "",
            createdAt: now,
            updatedAt: now,
        },
    ];
}

function renderStats() {
    els.totalCount.textContent = state.clothes.length;
    els.careCount.textContent = state.clothes.filter((item) => item.specialCare).length;
    els.idleCount.textContent = state.clothes.filter((item) => item.unwornOverOneYear).length;
}

function imageMarkup(item, className = "") {
    if (item.imageUrl) {
        return `<img class="${className}" src="${escapeHtml(assetUrl(item.imageUrl))}" alt="${escapeHtml(item.name || item.category)}">`;
    }
    return `<div class="image-placeholder ${className}">${escapeHtml(item.category || "Item")}</div>`;
}

function filteredClothes() {
    let items = [...state.clothes];
    if (els.seasonFilter.value) {
        items = items.filter((item) => item.season === els.seasonFilter.value);
    }
    if (els.occasionFilter.value) {
        items = items.filter((item) => item.occasion === els.occasionFilter.value);
    }

    const sortBy = els.sortBy.value;
    items.sort((a, b) => compareItems(a, b, sortBy));
    return items;
}

function compareItems(a, b, sortBy) {
    const av = a[sortBy] ?? "";
    const bv = b[sortBy] ?? "";
    if (sortBy === "wearCount") {
        return Number(bv || 0) - Number(av || 0);
    }
    return String(bv).localeCompare(String(av));
}

function renderGrid() {
    const items = filteredClothes();
    if (items.length === 0) {
        els.grid.innerHTML = `<div class="image-placeholder">No items yet</div>`;
        return;
    }

    els.grid.innerHTML = items.map((item) => `
        <button class="clothing-card" type="button" data-id="${item.id}">
            ${imageMarkup(item)}
            <div class="card-body">
                <p class="card-title">${escapeHtml(item.name || item.category)}</p>
                <div class="meta-line">
                    <span class="pill">${labelOf(item.season)}</span>
                    <span class="pill">${labelOf(item.occasion)}</span>
                    <span class="pill">${item.wearCount || 0} times</span>
                    ${item.specialCare ? `<span class="pill warn">Care</span>` : ""}
                    ${item.unwornOverOneYear ? `<span class="pill warn">Idle</span>` : ""}
                </div>
            </div>
        </button>
    `).join("");

    els.grid.querySelectorAll(".clothing-card").forEach((card) => {
        card.addEventListener("click", () => {
            state.selectedId = Number(card.dataset.id);
            renderSelectedDetail();
        });
    });
}

function renderHomeRecent() {
    const recentItems = state.clothes.slice(0, 6);
    if (recentItems.length === 0) {
        els.recentGrid.innerHTML = `<div class="image-placeholder">No items yet</div>`;
        return;
    }

    els.recentGrid.innerHTML = recentItems.map((item) => `
        <button class="recent-card" type="button" data-id="${item.id}">
            ${imageMarkup(item)}
            <div>
                <strong>${escapeHtml(item.name || item.category)}</strong>
                <p>${labelOf(item.season)} · ${labelOf(item.occasion)}</p>
            </div>
        </button>
    `).join("");

    els.recentGrid.querySelectorAll(".recent-card").forEach((card) => {
        card.addEventListener("click", () => {
            state.selectedId = Number(card.dataset.id);
            showBrowseSection();
            renderSelectedDetail();
        });
    });
}

function renderSelectedDetail() {
    const selected = state.clothes.find((item) => item.id === state.selectedId) || state.clothes[0];
    if (!selected) {
        els.detail.innerHTML = `<div class="empty-detail"><p>Select an item to view details</p></div>`;
        return;
    }

    state.selectedId = selected.id;
    els.detail.innerHTML = `
        ${imageMarkup(selected, "detail-visual")}
        <div class="detail-content">
            <h2>${escapeHtml(selected.name || selected.category)}</h2>
            <div class="meta-line">
                ${selected.specialCare ? `<span class="pill warn">Special Care</span>` : ""}
                ${selected.specialTag ? `<span class="pill warn">Meaningful</span>` : ""}
                ${selected.unwornOverOneYear ? `<span class="pill warn">Unworn over 1 year</span>` : ""}
            </div>
            <div class="favorite-meter">
                <div>
                    <strong>${favoriteLevel(selected.favoriteScore)}</strong>
                    <span>Favorite Score ${selected.favoriteScore || 0}/100</span>
                </div>
                <progress max="100" value="${selected.favoriteScore || 0}"></progress>
            </div>
            <div class="detail-list">
                <div><span>Category</span>${escapeHtml(selected.category)}</div>
                <div><span>Color</span>${escapeHtml(selected.color)}</div>
                <div><span>Brand</span>${escapeHtml(selected.brand || "Not Set")}</div>
                <div><span>Size</span>${escapeHtml(selected.sizeLabel || "Not Set")}</div>
                <div><span>Price</span>${formatMoney(selected.price)}</div>
                <div><span>Season</span>${labelOf(selected.season)}</div>
                <div><span>Occasion</span>${labelOf(selected.occasion)}</div>
                <div><span>Material</span>${escapeHtml(selected.material || "Not Set")}</div>
                <div><span>Wear Count</span>${selected.wearCount || 0}</div>
                <div><span>Outfit Adoption</span>${selected.outfitAdoptionCount || 0} times</div>
                <div><span>Purchase Date</span>${selected.purchaseDate || "Not Set"}</div>
                <div><span>Added Date</span>${formatDateTime(selected.createdAt)}</div>
                <div><span>Last Worn</span>${formatDateTime(selected.lastWornAt)}</div>
            </div>
            ${selected.careInstructions ? `<p><strong>Care：</strong>${escapeHtml(selected.careInstructions)}</p>` : ""}
            ${selected.specialMeaning ? `<p><strong>Special Meaning：</strong>${escapeHtml(selected.specialMeaning)}</p>` : ""}
            ${selected.recyclingNotes ? `<p><strong>Recycle:</strong>${escapeHtml(selected.recyclingNotes)}</p>` : ""}
            <div class="detail-actions">
                <button class="primary-button" id="wearButton" type="button">Worn Today</button>
                <button class="ghost-button" id="editButton" type="button">Edit</button>
            </div>
        </div>
    `;

    document.querySelector("#wearButton").addEventListener("click", () => recordWear(selected.id));
    document.querySelector("#editButton").addEventListener("click", () => openDialog(selected));
}

function formatDateTime(value) {
    if (!value) {
        return "Not Recorded";
    }
    return String(value).replace("T", " ").slice(0, 16);
}

function formatMoney(value) {
    if (value === undefined || value === null || value === "") {
        return "Not Set";
    }
    return `¥${Number(value).toFixed(2)}`;
}

function favoriteLevel(score = 0) {
    if (score >= 80) return "Favorite";
    if (score >= 45) return "Frequently Worn";
    if (score >= 15) return "Occasionally Worn";
    return "Getting Started";
}

function openDialog(item = null) {
    els.form.reset();
    fields.id.value = item?.id || "";
    fields.imageUrl.value = item?.imageUrl || "";
    fields.name.value = item?.name || "";
    fields.category.value = item?.category || "";
    fields.color.value = item?.color || "";
    fields.season.value = item?.season || "spring";
    fields.occasion.value = item?.occasion || "casual";
    fields.material.value = item?.material || "";
    fields.brand.value = item?.brand || "";
    fields.price.value = item?.price ?? "";
    fields.sizeLabel.value = item?.sizeLabel || "";
    fields.purchaseDate.value = item?.purchaseDate || "";
    fields.outfitAdoptionCount.value = item?.outfitAdoptionCount || 0;
    fields.specialCare.checked = Boolean(item?.specialCare);
    fields.specialTag.checked = Boolean(item?.specialTag);
    fields.careInstructions.value = item?.careInstructions || "";
    fields.specialMeaning.value = item?.specialMeaning || "";
    fields.recyclingNotes.value = item?.recyclingNotes || "";
    els.dialogTitle.textContent = item ? "EditItem" : "Add Item";
    document.querySelector("#deleteButton").hidden = !item;
    els.dialog.showModal();
}

async function uploadImageIfNeeded() {
    const file = fields.imageFile.files[0];
    if (!file) {
        return fields.imageUrl.value || null;
    }

    const body = new FormData();
    body.append("file", file);
    const result = await request("/images/upload", {method: "POST", body});
    return storedImageUrl(result.imageUrl);
}

async function saveItem(event) {
    event.preventDefault();
    const id = fields.id.value ? Number(fields.id.value) : null;
    try {
        const imageUrl = storedImageUrl(await uploadImageIfNeeded());
        const current = id ? state.clothes.find((item) => item.id === id) : {};
        const payload = {
            ...current,
            id,
            imageUrl,
            name: fields.name.value,
            category: fields.category.value,
            color: fields.color.value,
            season: fields.season.value,
            occasion: fields.occasion.value,
            material: fields.material.value,
            brand: fields.brand.value,
            price: fields.price.value ? Number(fields.price.value) : null,
            sizeLabel: fields.sizeLabel.value,
            purchaseDate: fields.purchaseDate.value || null,
            outfitAdoptionCount: Number(fields.outfitAdoptionCount.value || 0),
            specialCare: fields.specialCare.checked,
            specialTag: fields.specialTag.checked,
            careInstructions: fields.careInstructions.value,
            specialMeaning: fields.specialMeaning.value,
            recyclingNotes: fields.recyclingNotes.value,
        };

        const saved = await request("/clothes", {
            method: id ? "PUT" : "POST",
            body: JSON.stringify(payload),
        });

        state.selectedId = saved.id;
        els.dialog.close();
        await loadClothes();
        showToast("Saved");
    } catch (error) {
        showToast("Save failed");
    }
}

async function openBatchImport(files) {
    if (!files.length) {
        return;
    }

    const body = new FormData();
    Array.from(files).forEach((file) => body.append("files", file));

    showToast("Creating import drafts");
    try {
        state.importDrafts = await request("/clothes/import/preview", {method: "POST", body});
        renderImportDrafts();
        els.importDialog.showModal();
    } catch (error) {
        showToast("Batch import failed");
    } finally {
        els.batchImageFiles.value = "";
    }
}

function renderImportDrafts() {
    if (state.importDrafts.length === 0) {
        els.importList.innerHTML = `<div class="image-placeholder">No importable images</div>`;
        return;
    }

    els.importList.innerHTML = state.importDrafts.map((draft, index) => `
        <article class="import-card" data-index="${index}">
            ${imageMarkup(draft, "import-preview")}
            <div class="import-fields">
                <label>
                    Name
                    <input data-field="name" type="text" value="${escapeHtml(draft.name)}">
                </label>
                <div class="form-row">
                    <label>
                        Category
                        <select data-field="category">
                            ${optionMarkup("top", "Top", draft.category)}
                            ${optionMarkup("outerwear", "Outerwear", draft.category)}
                            ${optionMarkup("bottom", "Bottom", draft.category)}
                            ${optionMarkup("dress", "Dress", draft.category)}
                            ${optionMarkup("shoes", "Shoes", draft.category)}
                            ${optionMarkup("bag", "Bag", draft.category)}
                            ${optionMarkup("accessory", "Accessory", draft.category)}
                        </select>
                    </label>
                    <label>
                        Color
                        <input data-field="color" type="text" value="${escapeHtml(draft.color)}">
                    </label>
                </div>
                <div class="form-row">
                    <label>
                        Season
                        <select data-field="season">
                            ${optionMarkup("spring", "Spring", draft.season)}
                            ${optionMarkup("summer", "Summer", draft.season)}
                            ${optionMarkup("autumn", "Autumn", draft.season)}
                            ${optionMarkup("winter", "Winter", draft.season)}
                        </select>
                    </label>
                    <label>
                        Occasion
                        <select data-field="occasion">
                            ${optionMarkup("work", "Work", draft.occasion)}
                            ${optionMarkup("casual", "Casual", draft.occasion)}
                            ${optionMarkup("party", "Party", draft.occasion)}
                            ${optionMarkup("sport", "Sport", draft.occasion)}
                        </select>
                    </label>
                </div>
                <label>
                    Material
                    <input data-field="material" type="text" value="${escapeHtml(draft.material || "")}">
                </label>
                <label class="checkbox-line">
                    <input data-field="specialCare" type="checkbox" ${draft.specialCare ? "checked" : ""}>
                    Special material care
                </label>
                <p class="import-note">${escapeHtml(draft.confidenceNote || "")}</p>
            </div>
        </article>
    `).join("");
}

function optionMarkup(value, label, selected) {
    return `<option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>`;
}

async function saveImportDrafts(event) {
    event.preventDefault();
    const cards = [...els.importList.querySelectorAll(".import-card")];
    if (cards.length === 0) {
        return;
    }

    document.querySelector("#saveImportButton").disabled = true;
    try {
        for (const card of cards) {
            const index = Number(card.dataset.index);
            const draft = state.importDrafts[index];
            const payload = {
                imageUrl: storedImageUrl(draft.imageUrl),
                name: valueFrom(card, "name"),
                category: valueFrom(card, "category"),
                color: valueFrom(card, "color"),
                season: valueFrom(card, "season"),
                occasion: valueFrom(card, "occasion"),
                material: valueFrom(card, "material"),
                purchaseDate: null,
                wearCount: 0,
                outfitAdoptionCount: 0,
                specialCare: checkedFrom(card, "specialCare"),
                specialTag: false,
                careInstructions: draft.careInstructions || "",
                specialMeaning: "",
                recyclingNotes: draft.recyclingNotes || "",
            };
            await request("/clothes", {method: "POST", body: JSON.stringify(payload)});
        }

        state.importDrafts = [];
        els.importDialog.close();
        await loadClothes();
        showToast("Batch import saved");
    } catch (error) {
        showToast("Batch import save failed");
    } finally {
        document.querySelector("#saveImportButton").disabled = false;
    }
}

function valueFrom(root, field) {
    return root.querySelector(`[data-field="${field}"]`).value.trim();
}

function checkedFrom(root, field) {
    return root.querySelector(`[data-field="${field}"]`).checked;
}

async function deleteSelected() {
    const id = fields.id.value;
    if (!id) {
        return;
    }
    try {
        await request("/clothes", {method: "DELETE", params: {id}});
        state.selectedId = null;
        els.dialog.close();
        await loadClothes();
        showToast("Deleted");
    } catch (error) {
        showToast("Delete failed");
    }
}

async function deleteAllData() {
    const confirmed = window.confirm("Clear all wardrobe items and local uploaded images? Sample and uploaded images will be deleted from the database.");
    if (!confirmed) {
        return;
    }

    try {
        await request("/clothes/all", {method: "DELETE"});
        state.selectedId = null;
        state.clothes = [];
        els.settingsDialog.close();
        await loadClothes();
        showToast("Wardrobe data cleared");
    } catch (error) {
        showToast("Clear failed");
    }
}

async function deleteWellnessData() {
    const confirmed = window.confirm("Clear all wellness records? This will not delete wardrobe data.");
    if (!confirmed) {
        return;
    }

    try {
        await request("/wellness/entries", {method: "DELETE"});
        state.wellnessEntries = [];
        els.settingsDialog.close();
        if (state.activePage === "wellness") {
            await loadWellnessEntries();
        }
        showToast("Wellness records cleared");
    } catch (error) {
        showToast("WellnessClear failed");
    }
}

async function recordWear(id) {
    try {
        const updated = await request("/clothes/wear", {method: "PATCH", params: {id}});
        state.selectedId = updated.id;
        await loadClothes();
        showToast("Wear count updated");
    } catch (error) {
        showToast("Update failed");
    }
}

async function recommendOutfits(event) {
    event.preventDefault();
    els.outfitResults.innerHTML = `<div class="image-placeholder">Generating outfits</div>`;

    try {
        const plans = await request("/outfits/recommendations", {
            params: {
                occasion: els.outfitOccasion.value,
                season: els.outfitSeason.value,
                temperature: els.outfitTemperature.value,
                colorPreference: els.outfitColor.value,
            },
        });
        renderOutfitPlans(plans);
    } catch (error) {
        els.outfitResults.innerHTML = `<div class="image-placeholder">Recommendation failed</div>`;
        showToast("Outfit recommendation failed");
    }
}

async function renderHomeRecommendation() {
    if (state.clothes.length === 0) {
        els.homeRecommendation.innerHTML = `
            <div class="empty-outfit-state compact">
                <h2>Import Items First</h2>
                <p>Add a few clothing items and the home page will recommend today's outfit.</p>
            </div>
        `;
        return;
    }

    updateWeatherChip(els.weatherSummary.textContent || "Manual weather");
    localStorage.setItem("smartOutfitHomeTemperature", els.homeTemperature.value);
    localStorage.setItem("smartOutfitHomeSeason", els.homeSeason.value);
    localStorage.setItem("smartOutfitHomeOccasion", els.homeOccasion.value);

    els.homeRecommendation.innerHTML = `<div class="image-placeholder">Calculating today's recommendation</div>`;
    try {
        const plans = await request("/outfits/recommendations", {
            params: {
                occasion: els.homeOccasion.value,
                season: els.homeSeason.value,
                temperature: els.homeTemperature.value,
                colorPreference: "",
            },
        });

        if (!plans.length) {
            els.homeRecommendation.innerHTML = `
                <div class="empty-outfit-state compact">
                    <h2>No Matching Plan</h2>
                    <p>Adjust temperature/occasion or add more wardrobe categories.</p>
                </div>
            `;
            return;
        }

        const plan = plans[0];
        els.homeRecommendation.innerHTML = `
            <article class="home-outfit-card">
                <div>
                    <h3>${escapeHtml(plan.title)}</h3>
                    <p>${labelOf(plan.occasion)} · ${labelOf(plan.season)} · ${plan.temperature}°C</p>
                </div>
                <div class="home-outfit-pieces">
                    ${plan.items.slice(0, 4).map((item) => `
                        <div class="mini-piece">
                            ${imageMarkup(item)}
                            <span>${escapeHtml(item.name || item.category)}</span>
                        </div>
                    `).join("")}
                </div>
        </article>
    `;
    } catch (error) {
        els.homeRecommendation.innerHTML = `<div class="image-placeholder">Today's recommendation failed</div>`;
    }
}

async function useLocationWeather() {
    if (!navigator.geolocation) {
        showToast("This browser does not support location");
        return;
    }

    els.weatherSummary.textContent = "Fetching weather";
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const {latitude, longitude} = position.coords;
            try {
                const url = new URL("https://api.open-meteo.com/v1/forecast");
                url.searchParams.set("latitude", latitude);
                url.searchParams.set("longitude", longitude);
                url.searchParams.set("current", "temperature_2m,weather_code");
                url.searchParams.set("timezone", "auto");
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const data = await response.json();
                const temperature = Math.round(data.current.temperature_2m);
                const summary = weatherText(data.current.weather_code);
                els.homeTemperature.value = temperature;
                updateWeatherChip(summary);
                await renderHomeRecommendation();
                showToast("Weather updated");
            } catch (error) {
                els.weatherSummary.textContent = "Weather fetch failed";
                showToast("Weather fetch failed");
            }
        },
        () => {
            els.weatherSummary.textContent = "Location not authorized";
            showToast("Allow location access to read weather");
        },
        {enableHighAccuracy: false, timeout: 8000, maximumAge: 30 * 60 * 1000}
    );
}

function renderEmptyOutfitState() {
    els.outfitResults.innerHTML = `
        <div class="empty-outfit-state">
            <h2>Choose an occasion to generate outfits</h2>
            <p>Recommendations pick wardrobe items and combine them into visual outfit plans.</p>
        </div>
    `;
}

function renderOutfitPlans(plans) {
    if (!plans.length) {
        els.outfitResults.innerHTML = `
            <div class="empty-outfit-state">
                <h2>Not Enough Wardrobe Items</h2>
                <p>Batch import items first so the system can generate outfits from your real wardrobe.</p>
            </div>
        `;
        return;
    }

    els.outfitResults.innerHTML = plans.map((plan) => `
        <article class="outfit-card" data-item-ids="${plan.items.map((item) => item.id).filter(Boolean).join(",")}">
            <div class="section-heading">
                <div>
                    <h2>${escapeHtml(plan.title)}</h2>
                    <p class="dialog-subtitle">${labelOf(plan.occasion)} · ${labelOf(plan.season)} · ${plan.temperature}°C</p>
                </div>
                ${plan.colorPreference ? `<span class="pill">${escapeHtml(plan.colorPreference)}</span>` : ""}
            </div>
            <div class="outfit-collage">
                ${plan.items.map((item) => `
                    <div class="outfit-piece">
                        ${imageMarkup(item)}
                        <p>${escapeHtml(item.name || item.category)}</p>
                    </div>
                `).join("")}
            </div>
            <p class="quiet-note">${escapeHtml(plan.message)}</p>
            <button class="primary-button adopt-outfit-button" type="button">Use This Outfit</button>
        </article>
    `).join("");
}

function renderFittingRoom() {
    populateFittingSelects();
    loadAvatarProfile();
    updateAvatarPreview();
}

function fittingSelectConfig() {
    return [
        [els.fitTopSelect, ["top"]],
        [els.fitBottomSelect, ["bottom", "dress"]],
        [els.fitOuterwearSelect, ["outerwear"]],
        [els.fitShoesSelect, ["shoes"]],
        [els.fitBagSelect, ["bag"]],
    ];
}

function populateFittingSelects() {
    fittingSelectConfig().forEach(([select, categories]) => {
        const currentValue = select.value;
        const items = state.clothes.filter((item) => {
            const category = normalizeCategory(item.category);
            return categories.includes(category);
        });
        select.innerHTML = `<option value="">None</option>` + items.map((item) => `
            <option value="${item.id}">${escapeHtml(item.name || item.category)}</option>
        `).join("");
        if ([...select.options].some((option) => option.value === currentValue)) {
            select.value = currentValue;
        }
    });
}

function selectedFitItem(select) {
    const id = Number(select.value || 0);
    return state.clothes.find((item) => item.id === id) || null;
}

function updateAvatarPreview() {
    const profile = avatarProfileFromInputs();
    applyAvatarProfile(profile);
    updateFitLayer(els.fitLayerTop, selectedFitItem(els.fitTopSelect), "Top");
    updateFitLayer(els.fitLayerBottom, selectedFitItem(els.fitBottomSelect), "Bottom");
    updateFitLayer(els.fitLayerOuterwear, selectedFitItem(els.fitOuterwearSelect), "Outerwear");
    updateFitLayer(els.fitLayerShoes, selectedFitItem(els.fitShoesSelect), "Shoes");
    updateFitLayer(els.fitLayerBag, selectedFitItem(els.fitBagSelect), "Bag");
    renderFittingSummary();
}

function avatarProfileFromInputs() {
    return {
        style: els.avatarStyle.value,
        shape: els.avatarShape.value,
        skin: els.avatarSkin.value,
        hairStyle: els.avatarHairStyle.value,
        scale: els.avatarScale.value,
    };
}

function applyAvatarProfile(profile) {
    els.avatarBody.dataset.style = profile.style;
    els.avatarBody.dataset.shape = profile.shape;
    els.avatarBody.dataset.scale = profile.scale;
    els.avatarBody.dataset.skin = profile.skin;
    els.avatarHead.dataset.style = profile.style;
    els.avatarHead.dataset.skin = profile.skin;
    els.avatarHair.dataset.style = profile.hairStyle;
    els.avatarHair.dataset.avatar = profile.style;
}

function saveAvatarProfile() {
    localStorage.setItem("smartOutfitAvatarProfile", JSON.stringify(avatarProfileFromInputs()));
    showToast("Fitting mirror profile saved");
}

function loadAvatarProfile() {
    try {
        const profile = JSON.parse(localStorage.getItem("smartOutfitAvatarProfile") || "{}");
        els.avatarStyle.value = profile.style || "cute";
        els.avatarShape.value = profile.shape || "balanced";
        els.avatarSkin.value = profile.skin || "light";
        els.avatarHairStyle.value = profile.hairStyle || "bob";
        els.avatarScale.value = profile.scale || "natural";
    } catch (error) {
        els.avatarStyle.value = "cute";
        els.avatarShape.value = "balanced";
        els.avatarSkin.value = "light";
        els.avatarHairStyle.value = "bob";
        els.avatarScale.value = "natural";
    }
}

function updateFitLayer(layer, item, fallback) {
    layer.classList.toggle("empty", !item);
    layer.dataset.garment = item ? garmentType(item, fallback) : "empty";
    if (!item) {
        layer.innerHTML = `<span>${fallback}</span>`;
        layer.style.removeProperty("--fit-color");
        layer.style.removeProperty("--fit-accent");
        return;
    }
    layer.style.setProperty("--fit-color", colorToFitColor(item.color));
    layer.style.setProperty("--fit-accent", fitAccentColor(item.color));
    layer.innerHTML = `<span>${escapeHtml(item.name || item.category)}</span>`;
}

function garmentType(item, fallback) {
    const value = `${item.category || ""} ${item.name || ""} ${fallback || ""}`.toLowerCase();
    if (value.includes("dress") || value.includes("Dress")) return "dress";
    if (value.includes("skirt") || value.includes("skirt")) return "skirt";
    if (value.includes("pants") || value.includes("jeans") || value.includes("Bottom")) return "pants";
    if (value.includes("coat") || value.includes("jacket") || value.includes("outer") || value.includes("Outerwear")) return "outerwear";
    if (value.includes("shoe") || value.includes("Shoes")) return "shoes";
    if (value.includes("bag") || value.includes("Bag")) return "bag";
    return "top";
}

function colorToFitColor(color = "") {
    const value = color.toLowerCase();
    if (value.includes("black") || value.includes("black")) return "#303038";
    if (value.includes("white") || value.includes("white")) return "#fffaf7";
    if (value.includes("pink") || value.includes("pink")) return "#f7a7cf";
    if (value.includes("purple") || value.includes("purple")) return "#b99bed";
    if (value.includes("blue") || value.includes("blue")) return "#8fb8ee";
    if (value.includes("red") || value.includes("red")) return "#e66c7b";
    if (value.includes("green") || value.includes("green")) return "#91c9a7";
    if (value.includes("brown") || value.includes("brown")) return "#a5795a";
    if (value.includes("beige") || value.includes("beige")) return "#e8d4ba";
    if (value.includes("gray") || value.includes("grey") || value.includes("gray")) return "#b8b5bd";
    return "#f3badb";
}

function fitAccentColor(color = "") {
    const value = color.toLowerCase();
    if (value.includes("black") || value.includes("black")) return "#5a5266";
    if (value.includes("white") || value.includes("white")) return "#ded8f0";
    if (value.includes("pink") || value.includes("pink")) return "#ffd4e9";
    if (value.includes("purple") || value.includes("purple")) return "#e2d4ff";
    if (value.includes("blue") || value.includes("blue")) return "#cfe2ff";
    if (value.includes("red") || value.includes("red")) return "#ffc5ca";
    if (value.includes("green") || value.includes("green")) return "#d0f0dc";
    if (value.includes("brown") || value.includes("brown")) return "#d2aa87";
    if (value.includes("beige") || value.includes("beige")) return "#f6e8d1";
    if (value.includes("gray") || value.includes("grey") || value.includes("gray")) return "#dedbe4";
    return "#ffe4f3";
}

function renderFittingSummary() {
    const items = [
        selectedFitItem(els.fitTopSelect),
        selectedFitItem(els.fitBottomSelect),
        selectedFitItem(els.fitOuterwearSelect),
        selectedFitItem(els.fitShoesSelect),
        selectedFitItem(els.fitBagSelect),
    ].filter(Boolean);
    els.fittingSummary.innerHTML = items.length
        ? `
            <p>Current try-on：${items.map((item) => escapeHtml(item.name || item.category)).join("、")}</p>
            <div class="fit-reference-strip">
                ${items.map((item) => `
                    <div class="fit-reference-item">
                        ${item.imageUrl ? `<img src="${escapeHtml(assetUrl(item.imageUrl))}" alt="${escapeHtml(item.name || item.category)}">` : `<span>${escapeHtml(item.category || "Item")}</span>`}
                    </div>
                `).join("")}
            </div>
        `
        : `<p>Choose wardrobe items and the fitting mirror will create an avatar outfit preview.</p>`;
}

function clearFittingRoom() {
    [els.fitTopSelect, els.fitBottomSelect, els.fitOuterwearSelect, els.fitShoesSelect, els.fitBagSelect].forEach((select) => {
        select.value = "";
    });
    updateAvatarPreview();
}

async function adoptOutfitPlan(card) {
    const ids = (card.dataset.itemIds || "")
        .split(",")
        .map((id) => Number(id))
        .filter(Boolean);

    if (!ids.length) {
        showToast("No trackable items in this outfit");
        return;
    }

    try {
        await Promise.all(ids.map((id) => request("/clothes/adopt-outfit", {method: "PATCH", params: {id}})));
        await loadClothes();
        showToast("Outfit adoption count recorded");
    } catch (error) {
        showToast("Failed to record adoption");
    }
}

async function renderTools() {
    renderCareReminders();
    renderIdleReminders();
    renderColorAnalysis();
    renderShoppingDecision();
    await renderCalendarEntries();
    await renderFavorites();
    renderOccasionTemplates();
    renderPrivacySummary();
    renderPartnerAccess();
}

function renderCareReminders() {
    const items = state.clothes.filter((item) => item.specialCare || ["wool", "silk", "leather"].includes((item.material || "").toLowerCase()));
    els.careReminderList.innerHTML = items.length
        ? items.slice(0, 8).map((item) => `<p><strong>${escapeHtml(item.name || item.category)}</strong> needs care: ${escapeHtml(item.careInstructions || item.material || "check the care label")}</p>`).join("")
        : `<p>No special care reminders.</p>`;
}

function renderIdleReminders() {
    const items = state.clothes.filter((item) => item.unwornOverOneYear);
    els.idleReminderList.innerHTML = items.length
        ? items.map((item) => `
            <article class="suggestion-card">
                <strong>${escapeHtml(item.name || item.category)}</strong>
                <p>Long idle item. Try styling it again; if it still does not work, consider donation, resale, or recycling.</p>
            </article>
        `).join("")
        : `<article class="suggestion-card"><strong>Looks Good</strong><p>No long-idle items. Keep tracking outfits.</p></article>`;
}

function renderColorAnalysis() {
    if (state.clothes.length === 0) {
        els.colorAnalysis.innerHTML = `<p>No wardrobe data yet.</p>`;
        return;
    }

    const counts = state.clothes.reduce((acc, item) => {
        const color = item.color || "unknown";
        acc[color] = (acc[color] || 0) + 1;
        return acc;
    }, {});
    const total = state.clothes.length;
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0];
    const suggestion = dominant && dominant[1] / total > 0.45
        ? `Your wardrobe has a high share of ${dominant[0]}. Try adding a bright accessory or light-colored top.`
        : "Color distribution is balanced. Keep adding easy-to-style items around frequently worn colors.";
    els.colorAnalysis.innerHTML = sorted
        .sort((a, b) => b[1] - a[1])
        .map(([color, count]) => `
            <div class="color-row">
                <span>${escapeHtml(color)}</span>
                <div><i style="width:${Math.round((count / total) * 100)}%"></i></div>
                <strong>${count}</strong>
            </div>
        `).join("") + `<article class="suggestion-card"><strong>Suggestion</strong><p>${escapeHtml(suggestion)}</p></article>`;
}

function checkShoppingDuplicate() {
    const category = els.shoppingCategory.value.trim().toLowerCase();
    const color = els.shoppingColor.value.trim().toLowerCase();
    const matches = state.clothes.filter((item) => {
        const categoryMatch = !category || (item.category || "").toLowerCase().includes(category);
        const colorMatch = !color || (item.color || "").toLowerCase().includes(color);
        return categoryMatch && colorMatch;
    });

    els.shoppingCheckResult.innerHTML = matches.length
        ? `<p>Your wardrobe already has ${matches.length} similar items: ${matches.slice(0, 5).map((item) => escapeHtml(item.name || item.category)).join("、")}</p>`
        : `<p>No obvious duplicates found. Consider whether it works with existing items.</p>`;
}

function renderShoppingDecision() {
    if (state.clothes.length === 0) {
        els.shoppingDecisionOutput.innerHTML = `
            <article class="suggestion-card">
                <strong>Build Wardrobe Data First</strong>
                <p>Import items first so the system can identify gaps, duplicate risks, and budget priorities.</p>
            </article>
        `;
        return;
    }

    const categoryCounts = countBy(state.clothes, (item) => normalizeCategory(item.category));
    const colorCounts = countBy(state.clothes, (item) => (item.color || "unknown").toLowerCase());
    const brandCounts = countBy(
        state.clothes.filter((item) => item.brand),
        (item) => item.brand.trim()
    );
    const missing = shoppingGapSuggestions(categoryCounts);
    const avoid = Object.entries(categoryCounts)
        .filter(([, count]) => count >= 4)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    const idleValue = state.clothes
        .filter((item) => (item.wearCount || 0) === 0 && Number(item.price || 0) > 0)
        .reduce((sum, item) => sum + Number(item.price || 0), 0);
    const dominantColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0];
    const topBrands = Object.entries(brandCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);

    els.shoppingDecisionOutput.innerHTML = [
        adviceCard(
            "Buy First",
            missing.length
                ? `Prioritize: ${missing.map((item) => labelOf(item)).join("、")}。`
                : "Core categories look complete. Next, add high-quality pieces by occasion."
        ),
        adviceCard(
            "Avoid for Now",
            avoid.length
                ? `${avoid.map(([category, count]) => `${labelOf(category)}: ${count} items`).join("；")} Avoid similar purchases for now.`
                : "No obviously overstocked category. Use duplicate check for individual purchases."
        ),
        adviceCard(
            "Budget Tip",
            idleValue > 0
                ? `Unworn items with recorded prices are worth about ${formatMoney(idleValue)}. Style or organize them before buying more.`
                : "Prioritize gaps and high-frequency occasions. Do not buy only because of a discount."
        ),
        adviceCard(
            "Color Direction",
            dominantColor && dominantColor[1] / state.clothes.length > 0.45
                ? `${dominantColor[0]} is highly represented. Consider light, bright, or layering-friendly neutrals.`
                : "Colors are balanced. Prioritize colors that pair with at least three existing items."
        ),
        adviceCard(
            "Brand Preferences",
            topBrands.length
                ? `Frequent brands: ${topBrands.map(([brand]) => brand).join("、")}. Watch these brands for missing categories.`
                : "Brand data is limited. Add brands in item details for better advice later."
        ),
    ].join("");
}

function countBy(items, getter) {
    return items.reduce((acc, item) => {
        const key = getter(item) || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
}

function normalizeCategory(category = "") {
    const value = category.toLowerCase();
    if (value.includes("top") || value.includes("shirt") || value.includes("Top")) return "top";
    if (value.includes("bottom") || value.includes("pants") || value.includes("skirt") || value.includes("Bottom")) return "bottom";
    if (value.includes("dress") || value.includes("Dress")) return "dress";
    if (value.includes("outer") || value.includes("coat") || value.includes("jacket") || value.includes("Outerwear")) return "outerwear";
    if (value.includes("shoe") || value.includes("Shoes")) return "shoes";
    if (value.includes("bag") || value.includes("Bag")) return "bag";
    if (value.includes("accessory") || value.includes("Accessory")) return "accessory";
    return value || "unknown";
}

function shoppingGapSuggestions(counts) {
    const essentials = ["top", "bottom", "outerwear", "shoes", "bag"];
    return essentials.filter((category) => !counts[category] || counts[category] < 1);
}

function adviceCard(title, body) {
    return `
        <article class="suggestion-card">
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(body)}</p>
        </article>
    `;
}

async function saveCalendarToday() {
    const planTitle = els.homeRecommendation.querySelector("h3")?.textContent
        || els.outfitResults.querySelector(".outfit-card h2")?.textContent
        || "Today's Outfit";
    const itemSummary = [...document.querySelectorAll(".home-outfit-card .mini-piece span, .outfit-card:first-child .outfit-piece p")]
        .map((node) => node.textContent.trim())
        .filter(Boolean)
        .join("、");

    try {
        await request("/outfit-calendar", {
            method: "POST",
            body: JSON.stringify({
                entryDate: todayString(),
                title: planTitle,
                itemSummary: itemSummary || "Manual record",
                notes: "Logged from Smart Outfit",
            }),
        });
        await renderCalendarEntries();
        showToast("Today's outfit saved");
    } catch (error) {
        showToast("Outfit calendar save failed");
    }
}

async function renderCalendarEntries() {
    try {
        const entries = await request("/outfit-calendar");
        els.calendarOutput.innerHTML = entries.length
            ? entries.slice(0, 5).map((entry) => `<p><strong>${escapeHtml(entry.entryDate)}</strong> ${escapeHtml(entry.title || "Outfit")} · ${escapeHtml(entry.itemSummary || "")}</p>`).join("")
            : `<p>No outfit calendar records yet.</p>`;
    } catch (error) {
        els.calendarOutput.innerHTML = `<p>Failed to load outfit calendar.</p>`;
    }
}

async function favoriteCurrentOutfit() {
    const title = els.outfitResults.querySelector(".outfit-card h2")?.textContent;
    if (!title) {
        showToast("Generate an outfit before saving");
        return;
    }

    const itemSummary = [...els.outfitResults.querySelectorAll(".outfit-card:first-child .outfit-piece p")]
        .map((node) => node.textContent.trim())
        .filter(Boolean)
        .join("、");

    try {
        await request("/favorite-outfits", {
            method: "POST",
            body: JSON.stringify({title, itemSummary, notes: "User saved outfit"}),
        });
        await renderFavorites();
        showToast("Outfit saved");
    } catch (error) {
        showToast("Failed to save outfit");
    }
}

async function renderFavorites() {
    try {
        const favorites = await request("/favorite-outfits");
        els.favoriteOutfitList.innerHTML = favorites.length
            ? favorites.map((item) => `<p><strong>${escapeHtml(item.title)}</strong> · ${escapeHtml(item.itemSummary || "")}</p>`).join("")
            : `<p>No saved outfits yet.</p>`;
    } catch (error) {
        els.favoriteOutfitList.innerHTML = `<p>Failed to load saved outfits.</p>`;
    }
}

function renderOccasionTemplates() {
    const templates = [
        ["Interview", "work", "spring", 20],
        ["Date", "party", "summer", 24],
        ["Work", "work", "spring", 16],
        ["Travel", "casual", "summer", 26],
        ["Gym", "sport", "summer", 22],
        ["Family Gathering", "casual", "autumn", 18],
    ];

    els.occasionTemplates.innerHTML = templates.map(([name, occasion, season, temperature]) => `
        <button type="button" data-occasion="${occasion}" data-season="${season}" data-temperature="${temperature}">${name}</button>
    `).join("");

    els.occasionTemplates.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            els.outfitOccasion.value = button.dataset.occasion;
            els.outfitSeason.value = button.dataset.season;
            els.outfitTemperature.value = button.dataset.temperature;
            switchPage("outfits");
            renderEmptyOutfitState();
        });
    });
}

async function createTravelPlan() {
    const days = Number(els.travelDays.value || 3);
    const categories = ["top", "bottom", "dress", "outerwear", "shoes", "bag"];
    const available = categories
        .map((category) => state.clothes.find((item) =>
            (item.category || "").toLowerCase().includes(category)
            && (!els.travelSeason.value || item.season === els.travelSeason.value || category === "bag")
            && (!els.travelOccasion.value || item.occasion === els.travelOccasion.value || ["shoes", "bag"].includes(category))
        ))
        .filter(Boolean);
    const items = buildTravelPackingItems(days, available);
    const summary = summarizeTravelPackingItems(items);

    try {
        const saved = await request("/travel-packing-lists", {
            method: "POST",
            body: JSON.stringify({
                destination: els.travelDestination.value || "Untitled Trip",
                days,
                season: els.travelSeason.value,
                occasion: els.travelOccasion.value,
                temperature: Number(els.travelTemperature.value || 22),
                itemSummary: summary,
                packingItems: JSON.stringify(items),
                notes: "Draft generated from current wardrobe; users can add, remove, and edit items",
            }),
        });
        renderTravelPackingList(saved);
        showToast("Draft created. You can edit the list.");
    } catch (error) {
        els.travelPlanOutput.innerHTML = items.length
            ? `<p>Suggested first: ${items.map((item) => escapeHtml(item.name)).join("、")}。</p>`
            : `<p>Wardrobe data is insufficient. Import items first to generate a packing list.</p>`;
    }
}

function buildTravelPackingItems(days, available) {
    const basics = [
        {name: "Underwear / Socks", quantity: Math.max(days, 1), category: "basic"},
        {name: "Sleepwear", quantity: 1, category: "basic"},
        {name: "Toiletry Bag", quantity: 1, category: "basic"},
        {name: "Charger", quantity: 1, category: "basic"},
    ];
    const temperature = Number(els.travelTemperature.value || 22);
    if (temperature <= 12) {
        basics.push({name: "Thermal Layer", quantity: 1, category: "basic"});
    }
    if (temperature >= 24) {
        basics.push({name: "Sun Protection", quantity: 1, category: "basic"});
    }

    return [
        ...available.map((item) => ({
            id: travelItemId(),
            name: item.name || labelOf(item.category),
            quantity: 1,
            category: labelOf(item.category),
            source: "Wardrobe Pick",
            clothingId: item.id,
            packed: false,
        })),
        ...basics.map((item) => ({
            id: travelItemId(),
            ...item,
            source: "Basic Essential",
            packed: false,
        })),
    ];
}

function travelItemId() {
    return `travel-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function summarizeTravelPackingItems(items) {
    return items
        .map((item) => `${item.name}${Number(item.quantity || 1) > 1 ? ` x${item.quantity}` : ""}`)
        .join("、");
}

function travelItemsFromList(list) {
    if (list?.packingItems) {
        try {
            const parsed = JSON.parse(list.packingItems);
            if (Array.isArray(parsed)) {
                return parsed.map(normalizeTravelItem);
            }
        } catch (error) {
            // Fall back to the text summary below for older records.
        }
    }

    return String(list?.itemSummary || "")
        .split("、")
        .map((name) => name.trim())
        .filter(Boolean)
        .map((name) => normalizeTravelItem({name}));
}

function normalizeTravelItem(item) {
    return {
        id: item.id || travelItemId(),
        name: item.name || "Unnamed Item",
        quantity: Math.max(Number(item.quantity || 1), 1),
        category: item.category || "Custom",
        source: item.source || "Manual Add",
        clothingId: item.clothingId || null,
        packed: Boolean(item.packed),
    };
}

function renderTravelPackingList(list) {
    const items = travelItemsFromList(list);
    state.currentTravelList = {...list, items};
    const doneCount = items.filter((item) => item.packed).length;

    els.travelPlanOutput.innerHTML = `
        <div class="packing-header">
            <div>
                <strong>${escapeHtml(list.destination || "Untitled Trip")}</strong>
                <p>${escapeHtml(list.days || 1)} days · ${labelOf(list.season)} · ${labelOf(list.occasion)} · ${escapeHtml(list.temperature || "")}°C</p>
            </div>
            <span class="pill">${doneCount}/${items.length} Packed</span>
        </div>
        <div class="packing-list">
            ${items.map((item, index) => `
                <div class="packing-row" data-index="${index}">
                    <input class="travel-packed-input" type="checkbox" ${item.packed ? "checked" : ""} aria-label="Packed">
                    <input class="travel-name-input" type="text" value="${escapeHtml(item.name)}" aria-label="Item Name">
                    <input class="travel-quantity-input" type="number" min="1" max="99" value="${escapeHtml(item.quantity)}" aria-label="Quantity">
                    <span>${escapeHtml(item.source)}</span>
                    <button class="icon-button travel-remove-button" type="button" aria-label="Delete">×</button>
                </div>
            `).join("")}
        </div>
        <div class="packing-actions">
            <button class="primary-button" id="travelSaveListButton" type="button">Save Changes</button>
            <p>${items.length ? "Recommendations are only a draft; adjust for your real trip." : "The list is empty. Add items manually."}</p>
        </div>
    `;
}

function syncTravelListFromDom() {
    if (!state.currentTravelList) return;

    state.currentTravelList.items = Array.from(els.travelPlanOutput.querySelectorAll(".packing-row")).map((row, index) => {
        const existing = state.currentTravelList.items[index] || {};
        return normalizeTravelItem({
            ...existing,
            packed: row.querySelector(".travel-packed-input").checked,
            name: row.querySelector(".travel-name-input").value.trim() || "Unnamed Item",
            quantity: row.querySelector(".travel-quantity-input").value,
        });
    });
}

function addTravelPackingItem() {
    if (!state.currentTravelList) {
        showToast("Generate a packing list first");
        return;
    }

    const name = els.travelCustomItem.value.trim();
    if (!name) {
        showToast("Enter an item first");
        return;
    }

    syncTravelListFromDom();
    state.currentTravelList.items.push(normalizeTravelItem({
        name,
        quantity: els.travelCustomQuantity.value || 1,
        category: "Custom",
        source: "Manual Add",
    }));
    els.travelCustomItem.value = "";
    els.travelCustomQuantity.value = 1;
    renderTravelPackingList({...state.currentTravelList, packingItems: JSON.stringify(state.currentTravelList.items)});
}

async function saveTravelPackingList() {
    if (!state.currentTravelList) return;
    syncTravelListFromDom();
    const items = state.currentTravelList.items;
    const saved = await request("/travel-packing-lists", {
        method: "POST",
        body: JSON.stringify({
            id: state.currentTravelList.id,
            destination: state.currentTravelList.destination,
            days: state.currentTravelList.days,
            season: state.currentTravelList.season,
            occasion: state.currentTravelList.occasion,
            temperature: state.currentTravelList.temperature,
            itemSummary: summarizeTravelPackingItems(items),
            packingItems: JSON.stringify(items),
            notes: "User edited and saved",
        }),
    });
    renderTravelPackingList(saved);
    showToast("Packing list saved");
}

function handleTravelPackingClick(event) {
    if (event.target.closest(".travel-remove-button")) {
        syncTravelListFromDom();
        const row = event.target.closest(".packing-row");
        state.currentTravelList.items.splice(Number(row.dataset.index), 1);
        renderTravelPackingList({...state.currentTravelList, packingItems: JSON.stringify(state.currentTravelList.items)});
        return;
    }

    if (event.target.closest("#travelSaveListButton")) {
        saveTravelPackingList();
    }
}

function renderPrivacySummary() {
    const uploaded = state.clothes.filter((item) => (item.imageUrl || "").startsWith("/uploads/")).length;
    els.privacySummary.innerHTML = `
        <p>Current items: ${state.clothes.length}</p>
        <p>Local uploaded image records: ${uploaded}</p>
        <p>Mode: private wardrobe, not public.</p>
    `;
}

function partnerAccessState() {
    try {
        return JSON.parse(localStorage.getItem("smartOutfitPartnerAccess") || "{}");
    } catch (error) {
        return {};
    }
}

function selectedPartnerFields() {
    return [...document.querySelectorAll(".partner-field:checked")].map((input) => input.value);
}

function renderPartnerAccess() {
    const access = partnerAccessState();
    const enabled = Boolean(access.enabled);
    const fields = Array.isArray(access.fields) ? access.fields : [];
    document.querySelectorAll(".partner-field").forEach((input) => {
        input.checked = fields.includes(input.value);
    });

    const preview = buildPartnerInsightPreview(fields);
    els.partnerAccessPanel.innerHTML = `
        <div class="partner-status ${enabled ? "enabled" : ""}">
            <strong>${enabled ? "Authorization simulated" : "No company authorized"}</strong>
            <p>${enabled
                ? `Allowed fields: ${fields.length ? fields.map(partnerFieldLabel).join("、") : "No fields selected"}`
                : "Partner recommendation API is off by default. Without authorization, no company can read wardrobe data."
            }</p>
        </div>
        <article class="suggestion-card">
            <strong>Partner-visible Data Preview</strong>
            <p>${escapeHtml(preview)}</p>
        </article>
    `;
}

function enablePartnerAccess() {
    const fields = selectedPartnerFields();
    if (!fields.length) {
        showToast("Choose fields to share first");
        return;
    }

    localStorage.setItem("smartOutfitPartnerAccess", JSON.stringify({
        enabled: true,
        fields,
        updatedAt: new Date().toISOString(),
    }));
    renderPartnerAccess();
    showToast("Authorization simulated; no data is actually sent.");
}

function revokePartnerAccess() {
    localStorage.removeItem("smartOutfitPartnerAccess");
    document.querySelectorAll(".partner-field").forEach((input) => {
        input.checked = false;
    });
    renderPartnerAccess();
    showToast("Partner access revoked");
}

function partnerFieldLabel(field) {
    return {
        wardrobeSummary: "Aggregated Wardrobe Insights",
        styleGoals: "Occasion and Style Goals",
        sizes: "Size Information",
        brandPreferences: "Brand Preferences",
    }[field] || field;
}

function buildPartnerInsightPreview(fields) {
    if (!fields.length) {
        return "No fields will be shared.";
    }

    const parts = [];
    if (fields.includes("wardrobeSummary")) {
        const counts = countBy(state.clothes, (item) => normalizeCategory(item.category));
        const missing = shoppingGapSuggestions(counts).map(labelOf);
        parts.push(`Missing categories: ${missing.length ? missing.join("、") : "No obvious gaps"}`);
    }
    if (fields.includes("styleGoals")) {
        const occasions = Object.entries(countBy(state.clothes, (item) => item.occasion))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 2)
            .map(([occasion]) => labelOf(occasion));
        parts.push(`Frequent occasions: ${occasions.length ? occasions.join("、") : "Not Set"}`);
    }
    if (fields.includes("sizes")) {
        const sizes = [...new Set(state.clothes.map((item) => item.sizeLabel).filter(Boolean))].slice(0, 4);
        parts.push(`Size：${sizes.length ? sizes.join("、") : "Not Set"}`);
    }
    if (fields.includes("brandPreferences")) {
        const brands = Object.entries(countBy(state.clothes.filter((item) => item.brand), (item) => item.brand.trim()))
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([brand]) => brand);
        parts.push(`Brand Preferences：${brands.length ? brands.join("、") : "Not Set"}`);
    }
    return parts.join("；");
}

async function loadWellnessEntries() {
    try {
        const end = todayString();
        const startDate = new Date(`${end}T00:00:00`);
        startDate.setDate(startDate.getDate() - 120);
        const start = startDate.toISOString().slice(0, 10);
        state.wellnessEntries = await request("/wellness/entries", {params: {start, end}});
        populateTodayWellness();
        renderCycleAlert();
        renderWellnessList();
    } catch (error) {
        els.wellnessList.innerHTML = `<div class="image-placeholder">Failed to load wellness records</div>`;
        showToast("Failed to load wellness records");
    }
}

function populateTodayWellness() {
    const today = els.wellnessDate.value || todayString();
    els.wellnessDate.value = today;
    const entry = state.wellnessEntries.find((item) => item.entryDate === today);
    els.weightKg.value = entry?.weightKg ?? "";
    els.mood.value = entry?.mood || "";
    els.periodStart.checked = Boolean(entry?.periodStart);
    els.periodDay.checked = Boolean(entry?.periodDay || entry?.periodStart);
    els.importantEvents.value = entry?.importantEvents || "";
    els.wellnessNotes.value = entry?.notes || "";
}

async function saveWellnessEntry(event) {
    event.preventDefault();
    const payload = {
        entryDate: els.wellnessDate.value || todayString(),
        weightKg: els.weightKg.value ? Number(els.weightKg.value) : null,
        periodStart: els.periodStart.checked,
        periodDay: els.periodDay.checked || els.periodStart.checked,
        mood: els.mood.value || null,
        importantEvents: els.importantEvents.value,
        notes: els.wellnessNotes.value,
    };

    try {
        await request("/wellness/entries", {method: "POST", body: JSON.stringify(payload)});
        await loadWellnessEntries();
        showToast("Wellness saved");
    } catch (error) {
        showToast("WellnessSave failed");
    }
}

function renderCycleAlert() {
    const periodStarts = state.wellnessEntries
        .filter((entry) => entry.periodStart)
        .map((entry) => entry.entryDate)
        .sort();

    if (periodStarts.length === 0) {
        els.cycleAlert.innerHTML = `
            <strong>No cycle data yet</strong>
            <p>Record one period start date and the system will estimate the next period and ovulation window.</p>
        `;
        return;
    }

    localStorage.setItem("smartOutfitCycleLength", els.cycleLength.value);
    localStorage.setItem("smartOutfitPeriodLength", els.periodLength.value);

    const cycleLength = Number(els.cycleLength.value || 28);
    const periodLength = Number(els.periodLength.value || 5);
    const today = new Date(`${todayString()}T00:00:00`);
    const lastStart = new Date(`${periodStarts.at(-1)}T00:00:00`);
    const daysSinceStart = Math.floor((today - lastStart) / 86400000);
    const cycleDay = ((daysSinceStart % cycleLength) + cycleLength) % cycleLength + 1;
    const daysUntilNextPeriod = cycleLength - cycleDay + 1;
    const ovulationDay = Math.max(1, cycleLength - 14);
    const daysUntilOvulation = ovulationDay - cycleDay;

    let title = `Estimated cycle day ${cycleDay} days`;
    let message = `Estimated ${daysUntilNextPeriod} days until the next period.`;

    if (cycleDay <= periodLength) {
        title = "During Period";
        message = "Keep warm, rest, and hydrate. Reduce intensity if your mood fluctuates.";
    } else if (daysUntilNextPeriod <= 3) {
        title = "Period Coming Soon";
        message = "Keep warm, sleep regularly, and leave emotional buffer space.";
    } else if (Math.abs(daysUntilOvulation) <= 2) {
        title = "Near Ovulation";
        message = "Notice body and mood changes, and plan moderate exercise and enough rest.";
    }

    els.cycleAlert.innerHTML = `
        <strong>${escapeHtml(title)}</strong>
        <p>${escapeHtml(message)}</p>
        <small>Last period started: ${escapeHtml(periodStarts.at(-1))}</small>
    `;
}

function renderWellnessList() {
    if (state.wellnessEntries.length === 0) {
        els.wellnessList.innerHTML = `<div class="image-placeholder">No wellness records yet</div>`;
        return;
    }

    els.wellnessList.innerHTML = state.wellnessEntries.slice(0, 20).map((entry) => `
        <article class="wellness-row">
            <div>
                <strong>${escapeHtml(entry.entryDate)}</strong>
                <p>${entry.weightKg ? `${entry.weightKg} kg` : "Weight not recorded"} · ${labelOf(entry.mood)}</p>
            </div>
            <div class="meta-line">
                ${entry.periodStart ? `<span class="pill warn">Period Started</span>` : ""}
                ${entry.periodDay && !entry.periodStart ? `<span class="pill warn">Period</span>` : ""}
            </div>
            ${(entry.importantEvents || entry.notes) ? `
                <p class="wellness-note">${escapeHtml(entry.importantEvents || entry.notes)}</p>
            ` : ""}
        </article>
    `).join("");
}

function escapeHtml(value) {
    return String(value || "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

document.querySelector("#refreshButton").addEventListener("click", loadClothes);
document.querySelector("#settingsButton").addEventListener("click", openSettings);
document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchPage(button.dataset.page));
});
document.querySelector("#newItemButton").addEventListener("click", () => openDialog());
document.querySelector("#homeNewItemButton").addEventListener("click", () => openDialog());
document.querySelector("#batchImportButton").addEventListener("click", () => els.batchImageFiles.click());
document.querySelector("#homeBatchImportButton").addEventListener("click", () => els.batchImageFiles.click());
document.querySelector("#browseAllButton").addEventListener("click", showBrowseSection);
document.querySelector("#recentBrowseButton").addEventListener("click", showBrowseSection);
document.querySelector("#closeBrowseButton").addEventListener("click", hideBrowseSection);
document.querySelector("#refreshHomeRecommendationButton").addEventListener("click", renderHomeRecommendation);
document.querySelector("#useLocationWeatherButton").addEventListener("click", useLocationWeather);
els.batchImageFiles.addEventListener("change", () => openBatchImport(els.batchImageFiles.files));
document.querySelector("#closeDialogButton").addEventListener("click", () => els.dialog.close());
document.querySelector("#closeImportButton").addEventListener("click", () => els.importDialog.close());
document.querySelector("#cancelImportButton").addEventListener("click", () => els.importDialog.close());
document.querySelector("#closeSettingsButton").addEventListener("click", () => els.settingsDialog.close());
document.querySelector("#resetApiButton").addEventListener("click", resetApiBaseUrl);
document.querySelector("#deleteButton").addEventListener("click", deleteSelected);
document.querySelector("#deleteAllDataButton").addEventListener("click", deleteAllData);
document.querySelector("#deleteWellnessDataButton").addEventListener("click", deleteWellnessData);
document.querySelector("#shoppingCheckButton").addEventListener("click", checkShoppingDuplicate);
document.querySelector("#refreshShoppingAdviceButton").addEventListener("click", renderShoppingDecision);
document.querySelector("#favoriteCurrentOutfitButton").addEventListener("click", favoriteCurrentOutfit);
document.querySelector("#travelPlanButton").addEventListener("click", createTravelPlan);
document.querySelector("#travelAddItemButton").addEventListener("click", addTravelPackingItem);
els.travelPlanOutput.addEventListener("click", handleTravelPackingClick);
els.outfitResults.addEventListener("click", (event) => {
    const button = event.target.closest(".adopt-outfit-button");
    if (button) {
        adoptOutfitPlan(button.closest(".outfit-card"));
    }
});
document.querySelector("#calendarTodayButton").addEventListener("click", saveCalendarToday);
document.querySelector("#openPrivacySettingsButton").addEventListener("click", openSettings);
document.querySelector("#enablePartnerAccessButton").addEventListener("click", enablePartnerAccess);
document.querySelector("#revokePartnerAccessButton").addEventListener("click", revokePartnerAccess);
document.querySelector("#saveAvatarProfileButton").addEventListener("click", saveAvatarProfile);
document.querySelector("#clearFittingButton").addEventListener("click", clearFittingRoom);
els.form.addEventListener("submit", saveItem);
els.importForm.addEventListener("submit", saveImportDrafts);
els.settingsForm.addEventListener("submit", saveSettings);
els.outfitForm.addEventListener("submit", recommendOutfits);
els.wellnessForm.addEventListener("submit", saveWellnessEntry);
els.wellnessDate.addEventListener("change", populateTodayWellness);
document.querySelector("#refreshWellnessButton").addEventListener("click", loadWellnessEntries);
[els.cycleLength, els.periodLength].forEach((el) => el.addEventListener("change", renderCycleAlert));
[els.homeTemperature, els.homeSeason, els.homeOccasion].forEach((el) => el.addEventListener("change", renderHomeRecommendation));
[els.avatarStyle, els.avatarShape, els.avatarSkin, els.avatarHairStyle, els.avatarScale].forEach((el) => el.addEventListener("change", updateAvatarPreview));
[els.fitTopSelect, els.fitBottomSelect, els.fitOuterwearSelect, els.fitShoesSelect, els.fitBagSelect].forEach((el) => el.addEventListener("change", updateAvatarPreview));
els.periodStart.addEventListener("change", () => {
    if (els.periodStart.checked) {
        els.periodDay.checked = true;
    }
});
[els.seasonFilter, els.occasionFilter, els.sortBy].forEach((el) => el.addEventListener("change", loadClothes));

if ("serviceWorker" in navigator && ["http:", "https:"].includes(window.location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
}

els.wellnessDate.value = todayString();
els.homeSeason.value = localStorage.getItem("smartOutfitHomeSeason") || defaultSeason();
els.homeTemperature.value = localStorage.getItem("smartOutfitHomeTemperature") || "16";
els.homeOccasion.value = localStorage.getItem("smartOutfitHomeOccasion") || "work";
updateWeatherChip();
els.cycleLength.value = localStorage.getItem("smartOutfitCycleLength") || "28";
els.periodLength.value = localStorage.getItem("smartOutfitPeriodLength") || "5";
loadClothes();
