// Definition aller Rezepte exakt nach Crafting-Rezepten
const recipes = {
    // Basiskomponenten
    "rohling": { "Amethyst": 4, "Diamant": 4, "Weinender Obsidian": 1 },
    "platine": { "Gold": 3, "Golddurchzogener Schwarzstein": 1, "Honig": 5 },
    "transistor": { "Gold": 3, "Weinender Obsidian": 2, "Honig": 4 },
    "energiezelle": { "Eisen": 3, "transistor": 2, "Platinen-Rest": 1 }, 

    // Chipsatz und Terminals
    "chipsatz": { "Amethyst": 2, "Netherite": 1, "Obsidian": 1, "platine": 1, "transistor": 4 },
    "lagerterminal": { "Eisen": 3, "transistor": 2, "energiezelle": 1, "Obsidian": 3 }, 

    // Speicherkarten Stufen 1 bis 4
    "speicherkarte1": { "rohling": 1, "platine": 1 },
    "speicherkarte2": { "transistor": 1, "speicherkarte1": 3 },
    "speicherkarte3": { "transistor": 2, "speicherkarte2": 3 },
    "speicherkarte4": { "transistor": 4, "speicherkarte3": 3 },

    // Speicherkarten Stufen 5 bis 8
    "speicherkarte5": { "chipsatz": 4, "platine": 1, "transistor": 4 },
    "speicherkarte6": { "chipsatz": 4, "platine": 1, "speicherkarte5": 4 },
    "speicherkarte7": { "chipsatz": 4, "platine": 1, "speicherkarte6": 4 },
    "speicherkarte8": { "chipsatz": 6, "platine": 1, "speicherkarte7": 2 },

    // Rubinhändler-Set
    "rubinhaendler": {
        "Diamantener Rossharnisch": 1,
        "Weizenkörner (Menge)": 576,
        "Strohballen": 128,
        "Pilzlicht": 26,
        "Fermentierte Spinnenaugen": 24,
        "Geplatzte Chorusfrucht": 24,
        "Faden": 32,
        "Kürbiskopf": 16,
        "Heuballen": 16
    }
};

// Die Basisliste des Content-Apfels vom Lootdealer
const contentApfelBasis = {
    "Karotten": 8192,
    "Kupferblöcke": 2048,
    "Gebackene Kartoffeln": 8192,
    "Giftige Kartoffeln": 1536,
    "Diorit": 10240,
    "Blasseichenholzbretter": 10240
};

/**
 * Rekursive Funktion zur Zerlegung komplexer Rezepte
 */
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

/**
 * Hauptberechnung & HTML Generierung
 */
function calculateTotal() {
    let totalResources = {};

    // 1. Standard-Rezepte & Rubinhändler berechnen
    for (let itemKey in recipes) {
        let input = document.querySelector(`input[data-item="${itemKey}"]`);
        if (!input) continue;
        let amount = parseInt(input.value) || 0;

        if (amount > 0) {
            resolveRecipe(itemKey, amount, totalResources);
        }
    }

    // 2. Lootdealer Multiplikatoren berechnen
    const lootdealerConfig = {
        frosch_totem: 4,
        uwu_phone: 8,
        warden_flughelm: 18,
        wisp_krone: 36
    };

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

    // 3. HTML DOM Generation für die Ausgabe
    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (Object.keys(totalResources).length === 0) {
        container.innerHTML = '<div class="empty-notice">Gib links Mengen ein, um die Berechnung zu starten.</div>';
        return;
    }

    // Ausgabe generieren mit Kisten- & Shulkerbox-Rechner (Aus der Roadmap)
    for (let resource in totalResources) {
        let count = totalResources[resource];

        let stacks = Math.floor(count / 64);
        let remainder = count % 64;
        let stackString = "";

        if (stacks >= 54) {
            let doubleChests = Math.floor(stacks / 54);
            let remainingStacks = stacks % 54;
            stackString = `${doubleChests} Doppelkiste${doubleChests > 1 ? 'n' : ''} (${stacks} Stks)`;
        } else if (stacks >= 27) {
            let shulkers = Math.floor(stacks / 27);
            let remainingStacks = stacks % 27;
            stackString = `${shulkers} Shulker-Box${shulkers > 1 ? 'en' : ''} + ${remainingStacks} Stk`;
        } else if (stacks > 0) {
            stackString = `${stacks} ${stacks === 1 ? 'Stack' : 'Stacks'}`;
            if (remainder > 0) {
                stackString += ` + ${remainder} Items`;
            }
        } else {
            stackString = `${remainder} Items`;
        }

        let formattedCount = count.toLocaleString('de-DE');

        let row = document.createElement('div');
        row.className = 'result-row';
        row.innerHTML = `
            <div class="result-item-name">${resource}</div>
            <div class="result-amounts">
                <span class="count-total">${formattedCount}x</span>
                <span class="count-stacks">${stackString}</span>
            </div>
        `;
        container.appendChild(row);
    }
}

/**
 * Alles auf 0 zurücksetzen
 */
function resetAll() {
    document.querySelectorAll('.input-row input').forEach(input => input.value = 0);
    calculateTotal();
}

/**
 * In die Zwischenablage kopieren (Formatiert für Discord/Ingame-Chat)
 */
function copyToClipboard() {
    const rows = document.querySelectorAll('.result-row');
    if (rows.length === 0) {
        alert("Es gibt noch keine Materialien zum Kopieren!");
        return;
    }
    
    let text = "📋 **Benötigte Materialien für Primeblocks:**\n";
    rows.forEach(row => {
        let name = row.querySelector('.result-item-name').innerText;
        let total = row.querySelector('.count-total').innerText;
        let stacks = row.querySelector('.count-stacks').innerText;
        text += `- ${name}: ${total} (${stacks})\n`;
    });
    
    navigator.clipboard.writeText(text).then(() => {
        alert("Einkaufsliste wurde in die Zwischenablage kopiert!");
    }).catch(err => {
        console.error('Fehler beim Kopieren: ', err);
    });
}