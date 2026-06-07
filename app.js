// =========================================================================
// 1. STRUKTUR DER BENUTZEROBERFLÄCHE (Hier neue UI-Inputs hinzu!)
// =========================================================================
const uiStructure = [
    {
        category: "Teile & Terminals",
        items: [
            { key: "chipsatz", label: "Chipsatz", icon: "fa-solid fa-microchip", color: "#275b72" },
            { key: "platine", label: "Platine", icon: "fa-solid fa-microchip", color: "#1b8b04" },
            { key: "rohling", label: "Rohling", icon: "fa-solid fa-compact-disc", color: "#ffffff" },
            { key: "energiezelle", label: "Energiezelle", icon: "fa-solid fa-battery-5", color: "#38bdf8" },
            { key: "transistor", label: "Transistoren", icon: "fa-solid fa-microchip", color: "#275b72" },
            { key: "lagerterminal", label: "Lagerterminal", icon: "fa-solid fa-computer", color: "#1b8b04" },
            { key: "encodierterminal", label: "Enkodierterminal", icon: "fa-solid fa-laptop-code", color: "#1b8b04" },
            { key: "clanterminal", label: "Clanterminal", icon: "fa-solid fa-people-group", color: "#ff0000" }
        ]
    },
    {
        category: "Speicherkarten",
        items: [
            { key: "speicherkarte1", label: "Einfache Speicherkarte (4.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#e28e8e" },
            { key: "speicherkarte2", label: "Stabile Speicherkarte (8.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#02f316" },
            { key: "speicherkarte3", label: "Erweiterte Speicherkarte (16.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#606afa" },
            { key: "speicherkarte4", label: "Verstärkte Speicherkarte (32.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#ff0000" },
            { key: "speicherkarte5", label: "Präzise Speicherkarte (64.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#e28e8e" },
            { key: "speicherkarte6", label: "Optimierte Speicherkarte (128.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#02f316" },
            { key: "speicherkarte7", label: "Hochgeschwindikeits Speicherkarte (192.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#606afa" },
            { key: "speicherkarte8", label: "Ultimative Speicherkarte (256.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#ff0000" },
            { key: "apexspeicherkarte", label: "Apex Speicherkarte (1.024.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#60a5fa" },
            { key: "quantenspeicherkarte", label: "Quanten Speicherkarte (2.048.000 Items)", icon: "fa-regular fa-floppy-disk", color: "#000000" }
        ]
    },
    {
        category: "Relikt System",
        items: [
            { key: "gereinigtes_reliktfragment", label: "Gereinigtes Reliktfragment", icon: "fa-solid fa-dumpster-fire", color: "#f59e0b" },
            { key: "vergoldetes_reliktfragment", label: "Vergoldetes Reliktfragment", icon: "fa-solid fa-coins", color: "#fbbf24" },
            { key: "reliktscherbe", label: "Reliktscherbe", icon: "fa-solid fa-triangle-exclamation", color: "#6366f1" },
            { key: "formloses_relikt", label: "Formloses Relikt", icon: "fa-solid fa-circle", color: "#475569" },
            { key: "reliktaltar", label: "Reliktaltar", icon: "fa-solid fa-box-tissue", color: "#14b8a6" }
        ]
    },
    {
        category: "Rubinhändler (50 Rubine)",
        items: [
            { key: "rubinhaendler", label: "Rubinhändler Komplett-Set", icon: "fa-solid fa-gem", color: "#ef4444" }
        ]
    },
    {
        category: "Lootdealer Items",
        items: [
            { key: "frosch_totem", label: "Frosch Totem (Faktor x4)", icon: "fa-solid fa-frog", color: "#4ade80" },
            { key: "uwu_phone", label: "Uwu Phone (Faktor x8)", icon: "fa-solid fa-mobile-screen-button", color: "#f472b6" },
            { key: "warden_flughelm", label: "Warden Flughelm (Faktor x18)", icon: "fa-solid fa-mask", color: "#fb923c" },
            { key: "wisp_krone", label: "Wisp Krone (Faktor x36 + Oxid. Kupfer)", icon: "fa-solid fa-crown", color: "#eab308" }
        ]
    }
];

// =========================================================================
// 2. REZEPT-DATENBANK
// =========================================================================
const recipes = {
    "rohling": { "Amethyst": 4, "Diamant": 4, "Weinender Obsidian": 1 },
    "platine": { "Gold": 3, "Golddurchzogener Schwarzstein": 1, "Honig": 5 },
    "transistor": { "Gold": 3, "Obsidian": 2, "Honig": 4 },
    "energiezelle": { "platine": 1, "chipsatz": 4, "transistor": 4}, 

    "chipsatz": { "Amethyst": 2, "Netherite": 1, "Obsidian": 1, "platine": 1, "transistor": 4 },
    "lagerterminal": { "Eisen": 3, "transistor": 2, "energiezelle": 1, "Obsidian": 3 },
    "encodierterminal": { "Gold": 3, "Obsidian": 3, "chipsatz": 2, "energiezelle": 1},
    "clanterminal": { "Eisen": 3, "transistor": 2, "Rubin Energiezelle": 1, "Obsidian": 1}, 

    "speicherkarte1": { "rohling": 1, "platine": 1 },
    "speicherkarte2": { "transistor": 1, "speicherkarte1": 3 },
    "speicherkarte3": { "transistor": 2, "speicherkarte2": 3 },
    "speicherkarte4": { "transistor": 4, "speicherkarte3": 3 },
    "speicherkarte5": { "chipsatz": 4, "platine": 1, "transistor": 4 },
    "speicherkarte6": { "chipsatz": 4, "platine": 1, "speicherkarte5": 4 },
    "speicherkarte7": { "chipsatz": 4, "platine": 1, "speicherkarte6": 4 },
    "speicherkarte8": { "chipsatz": 6, "platine": 1, "speicherkarte7": 2 },
    "apexspeicherkarte": { "chipsatz": 6, "platine": 1, "Gamma Speicherkarte": 2 },
    "quantenspeicherkarte": { "chipsatz": 2, "platine": 2, "apexspeicherkarte": 2, "rohling": 2, "speicherkarte8": 1 },


    "gereinigtes_reliktfragment": { "Lapislazuli": 8, "Reliktfragment": 1 }, 

 "vergoldetes_reliktfragment": { "relikt_fragment": 8, "Rohgoldblock": 1 }, 

    "reliktscherbe": { "gereinigtes_reliktfragment": 8, "Diamant": 1 },

"formloses_relikt": { "reliktscherbe": 4 }, 

 "reliktaltar": { "Netherite Barren": 3, "formloses_relikt": 5, "Wirrholz": 1 },

    // --- Rubinhändler ---
    "rubinhaendler": {
        "Diamantener Rossharnisch": 1, "Weizenkörner (Menge)": 576, "Strohballen": 128,
        "Pilzlicht": 26, "Fermentierte Spinnenaugen": 24, "Geplatzte Chorusfrucht": 24,
        "Faden": 32, "Kürbiskopf": 16, "Heuballen": 16
    }
};

const contentApfelBasis = {
    "Karotten": 8192, "Kupferblöcke": 2048, "Gebackene Kartoffeln": 8192,
    "Giftige Kartoffeln": 1536, "Diorit": 10240, "Blasseichenholzbretter": 10240
};

// =========================================================================
// 3. LOGIK & APP INITIALISIERUNG
// =========================================================================

// UI beim Laden der Seite vollautomatisch aufbauen
document.addEventListener("DOMContentLoaded", () => {
    buildUI();
});

function buildUI() {
    const container = document.getElementById("inputItemsContainer");
    container.innerHTML = "";

    uiStructure.forEach(cat => {
        // Kategorieüberschrift erstellen
        const header = document.createElement("div");
        header.className = "category-header";
        header.innerText = cat.category;
        container.appendChild(header);

        // Die dazugehörigen Items rendern
        cat.items.forEach(item => {
            const row = document.createElement("div");
            row.className = "input-row";
            row.innerHTML = `
                <label><i class="${item.icon}" style="color: ${item.color};"></i> ${item.label}</label>
                <input type="number" min="0" value="0" data-item="${item.key}" oninput="calculateTotal()">
            `;
            container.appendChild(row);
        });
    });
}

function resolveRecipe(itemName, amount, targetObject) {
    if (recipes[itemName]) {
        for (let ingredient in recipes[itemName]) {
            let ingredientAmount = recipes[itemName][ingredient] * amount;
            resolveRecipe(ingredient, ingredientAmount, targetObject);
        }
    } else {
        targetObject[itemName] = (targetObject[itemName] || 0) + amount;
    }
}

function calculateTotal() {
    let totalResources = {};

    // 1. Alle dynamischen Inputs auslesen, die in "recipes" definiert sind
    for (let itemKey in recipes) {
        let input = document.querySelector(`input[data-item="${itemKey}"]`);
        if (!input) continue;
        let amount = parseInt(input.value) || 0;

        if (amount > 0) {
            resolveRecipe(itemKey, amount, totalResources);
        }
    }

    // 2. Lootdealer gesondert berechnen
    const lootdealerConfig = { frosch_totem: 4, uwu_phone: 8, warden_flughelm: 18, wisp_krone: 36 };
    for (let key in lootdealerConfig) {
        let input = document.querySelector(`input[data-item="${key}"]`);
        if (!input) continue;
        let amount = parseInt(input.value) || 0;

        if (amount > 0) {
            let factor = lootdealerConfig[key] * amount;
            for (let resName in contentApfelBasis) {
                totalResources[resName] = (totalResources[resName] || 0) + (contentApfelBasis[resName] * factor);
            }
            if (key === 'wisp_krone') {
                totalResources["Oxidierter Kupferblock"] = (totalResources["Oxidierter Kupferblock"] || 0) + (64 * amount);
            }
        }
    }

    // 3. HTML Ausgabe erzeugen
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (Object.keys(totalResources).length === 0) {
        container.innerHTML = '<div class="empty-notice">Gib links Mengen ein, um die Berechnung zu starten.</div>';
        return;
    }

    for (let resource in totalResources) {
        let count = totalResources[resource];
        let stacks = Math.floor(count / 64);
        let remainder = count % 64;
        let stackString = "";

        if (stacks >= 54) {
            let doubleChests = Math.floor(stacks / 54);
            stackString = `${doubleChests} Doppelkiste${doubleChests > 1 ? 'n' : ''} (${stacks} Stks)`;
        } else if (stacks >= 27) {
            let shulkers = Math.floor(stacks / 27);
            stackString = `${shulkers} Shulker-Box${shulkers > 1 ? 'en' : ''}`;
        } else if (stacks > 0) {
            stackString = `${stacks} Stack${stacks === 1 ? '' : 's'}`;
            if (remainder > 0) stackString += ` + ${remainder} Items`;
        } else {
            stackString = `${remainder} Items`;
        }

        let row = document.createElement('div');
        row.className = 'result-row';
        row.innerHTML = `
            <div class="result-item-name">${resource}</div>
            <div class="result-amounts">
                <span class="count-total">${count.toLocaleString('de-DE')}x</span>
                <span class="count-stacks">${stackString}</span>
            </div>
        `;
        container.appendChild(row);
    }
}

function resetAll() {
    document.querySelectorAll('.input-row input').forEach(input => input.value = 0);
    calculateTotal();
}

function copyToClipboard() {
    const rows = document.querySelectorAll('.result-row');
    if (rows.length === 0) return alert("Keine Materialien vorhanden!");

    let text = "📋 Benötigte Materialien:\n";
    rows.forEach(row => {
        text += `- ${row.querySelector('.result-item-name').innerText}: ${row.querySelector('.count-total').innerText} (${row.querySelector('.count-stacks').innerText})\n`;
    });

    navigator.clipboard.writeText(text).then(() => alert("Einkaufsliste kopiert!"));
}