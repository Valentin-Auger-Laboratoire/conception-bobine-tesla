# Conception d'une bobine Tesla

🇫🇷 [Français](#français) · 🇬🇧 [English](#english)

**Essayer l'outil :** https://valentin-auger-laboratoire.github.io/portfolio/outils/bobine-tesla/

---

## Français

### Ce que fait l'outil
Outil web de dimensionnement d'une bobine Tesla, en HTML / CSS / JavaScript pur (schéma et courbe en SVG, aucune bibliothèque).

On donne le diamètre du tube, la hauteur bobinée, le diamètre du fil émaillé et celui de la sphère du haut. L'outil calcule :
- le **nombre de spires** (bobinage jointif, une couche), la **longueur** et la **résistance** du fil ;
- l'**inductance** du secondaire, sa **capacité propre** et celle de la sphère ;
- la **fréquence de résonance**, avec et sans sphère ;
- le rapport hauteur / diamètre, le quart de longueur d'onde et le facteur de qualité (borne haute, en résistance continue) ;
- **le primaire** :
  - **à éclateur (SGTC)** : à partir du condensateur primaire, l'inductance nécessaire puis le **nombre de spires de la spirale plate** où placer la prise, et son diamètre extérieur ;
  - **à transistors (SSTC)** : la fréquence à laquelle le circuit de commande doit osciller.

La page affiche aussi un **schéma à l'échelle**, une **courbe de la fréquence selon la hauteur bobinée** (valeur au survol) et des **avertissements** (bobine trop trapue ou trop fine, trop peu ou trop de spires, sphère trop petite, primaire trop proche…).

### Formules
| Grandeur | Formule |
|---|---|
| Inductance du secondaire | Wheeler, solénoïde à une couche : L(µH) = r²N² / (9r + 10h), en pouces |
| Capacité propre | Medhurst simplifiée : C(pF) = 0,29·h + 0,41·r + 1,94·√(r³/h), en cm |
| Sphère du haut | sphère isolée : C = 4·π·ε₀·r |
| Résonance | f = 1 / (2·π·√(L·C)) |
| Primaire en spirale plate | Wheeler : L(µH) = R²N² / (8R + 11W), en pouces, résolu par dichotomie |

### Limites
- Ce sont des **approximations** : quelques pourcents d'écart sont normaux, et la proximité de la sphère et du primaire décale un peu la fréquence réelle.
- Le couplage primaire / secondaire et la tension de sortie ne sont pas calculés.
- **Outil de calcul uniquement** : aucune bobine n'a été construite ni mesurée.

### Fichiers
| Fichier | Rôle |
|---|---|
| `tesla.js` | Moteur de calcul (testable avec Node) |
| `index.html` | Interface, bilingue FR / EN |
| `tests/test.js` | Tests : formules sur des valeurs calculées à la main, accord primaire / secondaire, avertissements |

```bash
node tests/test.js
```

---

## English

### What the tool does
Web tool to size a Tesla coil, in plain HTML / CSS / JavaScript (SVG drawing and chart, no library).

Enter the former diameter, winding height, enamelled wire diameter and top sphere diameter. The tool computes:
- the **number of turns** (close-wound, single layer), wire **length** and **resistance**;
- the secondary **inductance**, its **self-capacitance** and the sphere capacitance;
- the **resonant frequency**, with and without the sphere;
- the height / diameter ratio, quarter wavelength and quality factor (upper bound, DC resistance);
- **the primary**:
  - **spark gap (SGTC)**: from the primary capacitor, the required inductance, then the **flat spiral turn** where to place the tap, and its outer diameter;
  - **solid state (SSTC)**: the frequency the driver must oscillate at.

The page also shows a **drawing to scale**, a **frequency vs winding height chart** (value on hover) and **warnings** (coil too squat or too thin, too few or too many turns, sphere too small, primary too close…).

### Formulas
See the table above: Wheeler (single-layer solenoid), simplified Medhurst self-capacitance, isolated sphere, LC resonance, Wheeler flat spiral (solved by bisection).

### Limitations
- These are **approximations**: a few percent of error is normal, and the nearby sphere and primary shift the real frequency slightly.
- Primary / secondary coupling and output voltage are not computed.
- **Calculation tool only**: no coil has been built or measured.

### Files
| File | Purpose |
|---|---|
| `tesla.js` | Calculation engine (testable with Node) |
| `index.html` | User interface, bilingual FR / EN |
| `tests/test.js` | Tests: formulas against hand-computed values, primary / secondary tuning, warnings |

```bash
node tests/test.js
```
