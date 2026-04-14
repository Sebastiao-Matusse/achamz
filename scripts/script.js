const EMOJIS = {
  Electronics: "📱",
  "Clothing & Accessories": "👕",
  Jewellery: "💍",
  "Bags & Wallets": "👜",
  "Documents & ID": "🪪",
  Keys: "🔑",
  Pets: "🐾",
  Other: "📦",
};

let items = [
  {
    id: 1,
    type: "lost",
    name: "iPhone 14 Pro",
    cat: "Electronicos",
    province: "Maputo",
    location: "Julius Nyerere Ave, near US Embassy",
    date: "12 Apr 2026",
    desc: "Black iPhone 14 Pro with cracked screen protector. Has a green silicone case. Important family photos inside.",
    contact: "+258 84 321 0011",
    reward: "500 MZN",
  },
  {
    id: 2,
    type: "found",
    name: "Gold wedding ring",
    cat: "Joelheria",
    province: "Maputo",
    location: "Mercado Central, Maputo",
    date: "11 Apr 2026",
    desc: "Found a gold wedding ring near the fresh produce section. Has an engraving inside.",
    contact: "+258 82 456 7890",
    reward: "",
  },
  {
    id: 3,
    type: "lost",
    name: "Blue Mochila (backpack)",
    cat: "Bags & Wallets",
    province: "Beira",
    location: "Terminal Rodoviário, Beira",
    date: "10 Apr 2026",
    desc: "Navy blue backpack with a broken zip on the front pocket. Contains school textbooks and a grey laptop.",
    contact: "+258 86 111 2233",
    reward: "300 MZN",
  },
  {
    id: 4,
    type: "found",
    name: "National ID Card",
    cat: "Documents & ID",
    province: "Nampula",
    location: "Mercado Informal, Nampula City",
    date: "9 Apr 2026",
    desc: "Found a BI (bilhete de identidade) near the market entrance. Belongs to someone from Monapo district.",
    contact: "+258 84 999 8877",
    reward: "",
  },
  {
    id: 5,
    type: "lost",
    name: "Black labrador dog",
    cat: "Pets",
    province: "Maputo",
    location: "Sommerschield neighbourhood",
    date: "9 Apr 2026",
    desc: 'Male black labrador named "Bobo", wearing a red collar. Very friendly. Lost during load-shedding at night.',
    contact: "+258 84 123 4567",
    reward: "1000 MZN",
  },
  {
    id: 6,
    type: "found",
    name: "Set of car keys",
    cat: "Keys",
    province: "Matola",
    location: "Shoprite Matola parking lot",
    date: "8 Apr 2026",
    desc: "Found a set of Toyota car keys with a small elephant keyring attached. 3 keys in total.",
    contact: "+258 82 000 1122",
    reward: "",
  },
  {
    id: 7,
    type: "lost",
    name: "Laptop bag with Dell laptop",
    cat: "Bags & Wallets",
    province: "Maputo",
    location: "LAM Airport, International terminal",
    date: "8 Apr 2026",
    desc: "Black executive laptop bag left on the conveyor belt or in Departures. Contains Dell Latitude, charger and documents.",
    contact: "+258 86 444 5566",
    reward: "2000 MZN",
  },
  {
    id: 8,
    type: "found",
    name: "Child's school bag",
    cat: "Bags & Wallets",
    province: "Quelimane",
    location: "Escola Primária Quelimane",
    date: "7 Apr 2026",
    desc: 'Small red and white school bag with a child\'s name "João" stitched on the front. Contains books and a pencil case.',
    contact: "+258 84 777 6655",
    reward: "",
  },
  {
    id: 9,
    type: "lost",
    name: "Bicycles keys & remote",
    cat: "Keys",
    province: "Tete",
    location: "Mercado Municipal, Tete City",
    date: "6 Apr 2026",
    desc: "Keys on a yellow keychain, includes moto and padlock keys. Lost near the market entrance on Saturday morning.",
    contact: "+258 82 555 4433",
    reward: "",
  },
  {
    id: 10,
    type: "found",
    name: "Samsung Galaxy A54",
    cat: "Electronics",
    province: "Beira",
    location: "Beira train station",
    date: "5 Apr 2026",
    desc: "Found a Samsung phone on one of the benches. Screen shows a baby photo as wallpaper. Battery is low.",
    contact: "+258 86 222 3344",
    reward: "",
  },
];

let selectedType = "all";
let selectedProvince = "All";
let selectedPostType = "lost";

function getFilteredItems() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  return items.filter((item) => {
    const typeMatch = selectedType === "all" || item.type === selectedType;
    const provMatch =
      selectedProvince === "All" ||
      item.province === selectedProvince ||
      item.location.toLowerCase().includes(selectedProvince.toLowerCase());
    const qMatch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q);
    return typeMatch && provMatch && qMatch;
  });
}

function renderItems() {
  const grid = document.getElementById("itemsGrid");
  const filtered = getFilteredItems();
  const lost = filtered.filter((i) => i.type === "lost").length;
  const found = filtered.filter((i) => i.type === "found").length;
  document.getElementById("totalStat").textContent = items.length;
  document.getElementById("lostStat").textContent = items.filter(
    (i) => i.type === "lost",
  ).length;
  document.getElementById("foundStat").textContent = items.filter(
    (i) => i.type === "found",
  ).length;
  document.getElementById("countAll").textContent = items.length;
  document.getElementById("countLost").textContent = items.filter(
    (i) => i.type === "lost",
  ).length;
  document.getElementById("countFound").textContent = items.filter(
    (i) => i.type === "found",
  ).length;

  if (!filtered.length) {
    grid.innerHTML =
      '<div class="empty-state"><div class="empty-icon">🔎</div><p>No items found. Try adjusting your filters or <a href="#" onclick="openModal()" style="color:var(--teal)">post a new listing</a>.</p></div>';
    return;
  }
  grid.innerHTML = filtered
    .map(
      (item) => `
    <div class="item-card" onclick="showDetail(${item.id})">
      <div class="item-img ${item.type === "lost" ? "lost-bg" : "found-bg"}">
        <span>${EMOJIS[item.cat] || "📦"}</span>
        <span class="badge badge-${item.type}">${item.type}</span>
      </div>
      <div class="item-body">
        <div class="item-name">${item.name}</div>
        <div class="item-meta">
          <span class="item-location">${item.location.length > 40 ? item.location.slice(0, 40) + "..." : item.location}</span>
          <span class="item-date">${item.date}</span>
        </div>
        ${item.reward ? `<span class="item-reward">🎁 Reward: ${item.reward}</span>` : ""}
      </div>
    </div>
  `,
    )
    .join("");
}

function setType(t, el) {
  selectedType = t;
  document
    .querySelectorAll("[data-type]")
    .forEach((e) => e.classList.remove("active"));
  el.classList.add("active");
  renderItems();
}

function setProvince(p, el) {
  selectedProvince = p;
  document
    .querySelectorAll(".province-btn")
    .forEach((e) => e.classList.remove("active"));
  el.classList.add("active");
  renderItems();
}

function filterItems() {
  renderItems();
}

function sortItems(val) {
  if (val === "newest") items.sort((a, b) => b.id - a.id);
  else if (val === "oldest") items.sort((a, b) => a.id - b.id);
  else if (val === "reward")
    items.sort((a, b) => (b.reward ? 1 : 0) - (a.reward ? 1 : 0));
  renderItems();
}

function openModal() {
  document.getElementById("postModal").classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

function selectType(t) {
  selectedPostType = t;
  document.getElementById("typeLost").className =
    "type-btn" + (t === "lost" ? " active-lost" : "");
  document.getElementById("typeFound").className =
    "type-btn" + (t === "found" ? " active-found" : "");
}

function submitPost() {
  const name = document.getElementById("postName").value.trim();
  if (!name) {
    alert("Please enter an item name.");
    return;
  }
  const newItem = {
    id: items.length + 1,
    type: selectedPostType,
    name,
    cat: document.getElementById("postCat").value,
    province: document.getElementById("postProvince").value,
    location:
      document.getElementById("postLocation").value ||
      document.getElementById("postProvince").value,
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    desc: document.getElementById("postDesc").value,
    contact: document.getElementById("postContact").value,
    reward: document.getElementById("postReward").value,
  };
  items.unshift(newItem);
  closeModal("postModal");
  renderItems();
}

function showDetail(id) {
  const item = items.find((i) => i.id === id);
  if (!item) return;
  const header = document.getElementById("detailHeader");
  header.style.background =
    item.type === "lost" ? "#993C1D" : "var(--teal-dark)";
  document.getElementById("detailTitle").textContent =
    (item.type === "lost" ? "🔍 Lost" : "✅ Found") + " — " + item.name;
  document.getElementById("detailBody").innerHTML = `
    <div class="detail-icon" style="background:${item.type === "lost" ? "#FAECE7" : "#E1F5EE"}">${EMOJIS[item.cat] || "📦"}</div>
    <div>
      <div class="detail-row"><span class="detail-key">Category</span><span class="detail-val">${item.cat}</span></div>
      <div class="detail-row"><span class="detail-key">Location</span><span class="detail-val">${item.location}</span></div>
      <div class="detail-row"><span class="detail-key">Province</span><span class="detail-val">${item.province}</span></div>
      <div class="detail-row"><span class="detail-key">Date</span><span class="detail-val">${item.date}</span></div>
      <div class="detail-row"><span class="detail-key">Description</span><span class="detail-val">${item.desc}</span></div>
      ${item.reward ? `<div class="detail-row"><span class="detail-key">Reward</span><span class="detail-val" style="color:var(--amber);font-weight:500">${item.reward}</span></div>` : ""}
    </div>
    <button class="contact-btn" onclick="alert('Contact: ${item.contact}')">📞 Contact — ${item.contact}</button>
  `;
  document.getElementById("detailModal").classList.add("open");
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    document
      .querySelectorAll(".modal-overlay")
      .forEach((m) => m.classList.remove("open"));
  }
});

renderItems();
