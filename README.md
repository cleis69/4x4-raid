# 4X4-RAID — Refonte

Refonte complète de [4x4-raid.com](https://4x4-raid.com). React + TypeScript + Tailwind, prêt pour GitHub et Lovable.

**À lire avant de coder :**
- [`AUDIT-ET-DIRECTION-ARTISTIQUE.md`](./AUDIT-ET-DIRECTION-ARTISTIQUE.md) — audit de l'existant, positionnement, DA, copywriting
- [`CONTENU-A-FOURNIR.md`](./CONTENU-A-FOURNIR.md) — tout ce qui manque, par priorité

---

## Démarrer

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # typecheck + build de production
npm run preview
```

---

## Mise en ligne : GitHub → Lovable

Le dépôt est **déjà initialisé et commité** (branche `main`). Il ne reste que :

```bash
git commit --amend --reset-author --no-edit     # signe sous votre identité
git remote add origin https://github.com/<compte>/4x4-raid.git
git push -u origin main
```

Voir [`DEMARRAGE.md`](./DEMARRAGE.md) pour la procédure complète.

Puis dans Lovable : **New Project → Import from GitHub**.

La stack correspond à celle que Lovable utilise nativement (Vite + React + TS + Tailwind, alias `@/`), l'import se fait donc sans conversion. Après import, l'agent Lovable peut éditer les composants directement.

> ⚠️ **Ne pas laisser Lovable régénérer `src/data/`.** Ces fichiers sont la source de vérité du contenu réel, avec les annotations ✅ / ⚠️ qui distinguent ce qui existe de ce qui manque. Les régénérer réintroduirait du contenu inventé — exactement ce que cette refonte évite.

### Autres hébergements

- **Vercel** — `vercel.json` fourni (rewrites SPA + redirections 301)
- **Netlify** — `public/_redirects` fourni
- Build : `npm run build` · Dossier : `dist`

> 🔴 **Les redirections 301 sont indispensables.** Elles préservent 6 ans d'historique SEO depuis les anciennes URL WordPress. Ne pas mettre en ligne sans elles.

---

## Structure

```
src/
├── data/                 ← SOURCE DE VÉRITÉ DU CONTENU
│   ├── site.ts             identité, contact, navigation, philosophie
│   ├── raids.ts            6 raids + itinéraires réels
│   ├── contenu.ts          territoires, expériences, témoignages, FAQ, infos pratiques
│   ├── vehicules.ts        4 catégories d'engins (specs = placeholders)
│   └── medias.ts           toutes les images (URL centralisées)
│
├── components/
│   ├── ui/               Button · Primitives · Accordion · RaidCard · RouteMap
│   ├── layout/           Header · Footer · Layout · StickyCta
│   └── sections/         les 13 sections de la home
│
├── pages/                Home · Raids · RaidDetail · Destinations ·
│                         DestinationDetail · ExperiencesPage · Vehicules ·
│                         Guide · Contact · NotFound
├── three/                la scène 3D du hero — voir « Le hero 3D »
├── hooks/                useReveal · useParallax · useDunes · useHeroScene
└── lib/                  utils · seo
```

### Les 9 routes

| Route | Rôle |
|---|---|
| `/` | Home narrative, 13 sections (dont le terrain 3D) |
| `/raids` | Plateforme de découverte + filtres |
| `/raids/:slug` | Fiche raid (timeline, diagramme d'étapes, inclusions) |
| `/destinations` | Territoires en traitement éditorial |
| `/destinations/:id` | Fiche territoire + raids associés |
| `/experiences` | Les sensations — la page la plus « film » du site |
| `/vehicules` | Les 4 catégories d'engins |
| `/le-guide` | Jean-Luc, philosophie, témoignages, infos pratiques |
| `/contact` | Demande qualifiée en 3 étapes |

**Pour changer un contenu, éditer `src/data/`** — jamais les composants. C'est le principe du projet : le contenu est séparé de la présentation, et chaque donnée porte une annotation de provenance.

---

## Design system

Tous les tokens sont dans `tailwind.config.ts`, adossés aux variables CSS de `src/index.css`.
**Ne jamais écrire une couleur en dur dans un composant.**

| Token | Valeur | Usage |
|---|---|---|
| `bg-ink` | `#0B0B0A` | Fond principal |
| `bg-surface` | `#151513` | Sections alternées |
| `text-bone` | `#F2F0E9` | Texte principal |
| `text-muted` | `#99968D` | Texte secondaire |
| `text-sand` | `#C8A96B` | **Accent unique** — max 3 % de la surface |
| `text-display-xl` → `sm` | `clamp()` | Échelle fluide |
| `py-section` | `clamp(5rem, 12vh, 11rem)` | Rythme vertical |
| `ease-raid` | `cubic-bezier(.22,1,.36,1)` | Courbe unique |

---

## Le composant `<Placeholder>`

C'est la pièce centrale du projet.

Le brief exigeait de ne rien inventer. Plutôt que de laisser des trous silencieux, chaque information manquante passe par `<Placeholder>` :

```tsx
<Placeholder label="Tarif — Boucle Sud">Sur devis</Placeholder>
```

- **En développement** : surligné en sable, préfixé « À fournir », avec le libellé de ce qui manque
- **En production** : affichage neutre, sans mention technique

Résultat : `npm run dev` produit une **checklist visuelle navigable** de tout ce qui reste à collecter. Chaque losange ◆ correspond à une entrée de `CONTENU-A-FOURNIR.md`.

---

## Formulaire — à brancher

Le formulaire de `/contact` est fonctionnel côté interface mais **n'envoie rien**.

📍 `src/pages/Contact.tsx`, fonction `onSubmit`.

| Option | Effort | Note |
|---|---|---|
| **Formspree / Basin** | 5 min | Aucun back-end, gratuit jusqu'à ~50 envois/mois |
| **Resend + Vercel Function** | 1 h | Contrôle total, e-mail personnalisé |
| **Supabase Edge Function** | 1 h | Recommandé si import Lovable — natif dans la stack |

```ts
const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
  await fetch('https://formspree.io/f/XXXXX', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  setEnvoye(true)
}
```

---

## Performance

Choix faits pour tenir un Lighthouse élevé :

- **Aucune librairie d'animation.** Tout en CSS + un unique `IntersectionObserver`. (Framer Motion : ~45 Ko gzip pour un résultat identique.)
- **Aucune librairie d'icônes.** Les 2 icônes nécessaires sont des SVG inline.
- **Aucune librairie de carte.** La carte est un SVG généré.
- **Aucune librairie de carrousel.** `scroll-snap` natif.
- **Code splitting** : seule la home est dans le bundle initial ; les autres pages sont en chunks.
- **Fonts** : `preconnect` + `display=swap`, 2 familles, 6 graisses.
- **Images** : `loading="lazy"` partout sauf le LCP du Hero, `aspect-ratio` réservé (zéro CLS).

**Bundle initial : 3 dépendances** — `react`, `react-dom`, `react-router-dom`.

### Le hero 3D

Le hero est une scène Three.js temps réel : un 4x4 traverse un erg de dunes pendant que le scroll fait passer la journée de l'aube à l'heure bleue.

📍 `src/three/` — un module par responsabilité, `src/hooks/useHeroScene.ts` pour le pont React.

```
src/three/
├── field.ts           champ de hauteur — la pièce structurante
├── timeline.ts        7 phases solaires, interpolées en continu
├── atmosphere.ts      dôme de ciel, diffusion de Mie, brouillard
├── desert.ts          maillage de dunes, couleur cuite dans les sommets
├── vehicle.ts         4x4 procédural, suspension 4 roues, injection GLB
├── camera.ts          5 plans cinématiques, mélangés et amortis
├── lighting.ts        soleil directionnel + ciel hémisphérique
├── particles.ts       poussière ambiante + sillage des roues
├── postprocessing.ts  grain, vignetage, étalonnage
├── quality.ts         détection du palier de rendu
└── scene.ts           orchestrateur, montage progressif
```

**Quatre décisions techniques qui portent le reste :**

| Décision | Raison |
|---|---|
| Champ de hauteur en **JS**, pas en vertex shader | Le véhicule doit reposer exactement sur le sable. GPU float32 et JS float64 divergent — un 4x4 qui flotte est le défaut que le brief interdit. Terrain et véhicule lisent la même fonction : l'accord est exact par construction. |
| **Ressort amorti**, pas de tween GSAP | La caméra poursuit une cible mobile pilotée par un scroll réversible. Un tween a un début et une fin ; un ressort n'en a pas et ne saute jamais si l'on scrolle à contre-sens. |
| **Pas de bloom** | Le halo solaire est calculé dans le shader de ciel comme une diffusion de Mie : plus juste physiquement, et gratuit. Un bloom par-dessus donnerait le voile laiteux typique du WebGL sur-post-traité. |
| **Montage en 6 étapes**, une par frame | Générer 66 000 sommets de bruit en un bloc fige le thread 100 ms au pire moment. Le ciel apparaît à l'étape 2, le désert se construit derrière. |

**Vérification numérique du terrain** (`heightAt` échantillonné sur 2 000 points de la trajectoire) :

| Mesure | Valeur |
|---|---|
| Dénivelé traversé | 107 m |
| Pente max sous les roues | 17° |
| Écart max entre deux pas | 0,287 m |
| Amplitude des dunes | 130 m |
| Continuité sur 0,5 m | 0,144 m |

**Injecter un vrai modèle 3D.** La carrosserie est procédurale ; le gréement de roues et l'assiette sont indépendants du modèle.

```ts
const gltf = await new GLTFLoader().loadAsync('/models/4x4.glb')
vehicle.setModel(gltf.scene)
```

Le GLB doit être orienté +Z vers l'avant, origine au centre de l'empattement au sol, échelle en mètres. Des roues nommées `wheel_fl` / `wheel_fr` / `wheel_rl` / `wheel_rr` sont rattachées automatiquement au système de suspension.

**Paliers de rendu** — `src/three/quality.ts` décide seul, tous les modules le lisent :

| Palier | Segments | Poussière | Ombres | Post | DPR |
|---|---|---|---|---|---|
| Desktop | 256 | 800 | 2048 px | oui | 2 |
| Tablet | 160 | 420 | 1024 px | oui | 1,5 |
| Mobile | 96 | 220 | non | non | 1,25 |
| Aucun | — | — | — | — | — |

Le palier `none` s'applique si `prefers-reduced-motion` est actif, si WebGL manque, si le rendu est logiciel (SwiftShader) ou si `Save-Data` est demandé. Dans ce cas le hero d'origine — photo ou vidéo, 100 svh — s'affiche tel quel. **Le `<h1>`, les CTA, le bandeau de spécifications et l'ordre du DOM sont identiques dans les deux modes** : ni le SEO ni l'accessibilité ne dépendent du WebGL.

### Three.js — la seule exception, et comment elle est tenue

La section « Relevé de terrain » (`src/components/sections/Dunes.tsx`) rend un champ de dunes en WebGL : bruit fractal déplacé dans un vertex shader, rendu en filaire sable, horizon dissous par le brouillard. C'est la traduction littérale de la tension fondatrice de la DA — Désert × Instrument.

Three.js pèse ~150 Ko gzip. Il **n'entre jamais dans le bundle initial** :

| Garde-fou | Effet |
|---|---|
| `import('three')` dynamique | Rollup crée un chunk séparé |
| `IntersectionObserver` (`rootMargin: 200px`) | Le chunk ne se télécharge qu'à l'approche de la section |
| `prefers-reduced-motion` | Aucun chargement |
| Écran < 768 px | Aucun chargement (coût GPU / batterie) |
| Pas de contexte WebGL | Aucun chargement |
| Section hors écran | Boucle de rendu suspendue |
| Démontage | `dispose()` sur géométrie, matériau et renderer |

Le contenu éditorial de la section est du DOM normal. Si le WebGL ne démarre pas — pour l'une des cinq raisons ci-dessus — la section reste intégralement lisible : le canvas n'est qu'une couche derrière le texte.

📍 Toute la logique est isolée dans `src/hooks/useDunes.ts`. Pour retirer la 3D, supprimez `<Dunes />` de `src/pages/Home.tsx` et la dépendance `three` : rien d'autre n'en dépend.

⚠️ Le principal frein restant est l'origine des images (CDN WordPress, JPEG 2560 px). Voir `CONTENU-A-FOURNIR.md` § 6.

---

## Accessibilité

- Lien d'évitement, focus visible cohérent (`outline` sable)
- Accordéon avec `aria-expanded` / `aria-controls`, en-têtes `<button>`
- Filtres avec `aria-pressed`, résultats en `aria-live`
- Zoom mobile **rétabli** (le site actuel le bloque via `user-scalable=0`)
- `prefers-reduced-motion` respecté partout

---

## SEO

- Titre + description uniques par page (`src/lib/seo.ts`)
- `<h1>` unique par page, hiérarchie H2/H3 cohérente
- Open Graph + canonical dynamiques
- **Données structurées** : `TravelAgency` (global), `TouristTrip` (fiches raid), `FAQPage`, `Person` (Jean-Luc), `ItemList` (page Raids)
- `sitemap.xml` + `robots.txt`
- Redirections 301 depuis toutes les anciennes URL
- Alt text rédigés, jamais des noms de fichiers

**Pas de bourrage de mots-clés** — le site actuel répète « raid 4×4 au Maroc » 6 fois dans un paragraphe de 4 lignes ; c'est contre-productif depuis longtemps.

### Limite à connaître : SPA et indexation

C'est une application Vite en rendu client. Google exécute le JavaScript et indexe correctement ce type de site, mais **si le SEO est un enjeu prioritaire**, deux options :

1. **Migrer vers Next.js** (App Router) — SSR/SSG natif, le meilleur choix pour du SEO sérieux
2. **Ajouter `vite-plugin-ssg`** — prérendu statique, migration légère

L'architecture (données séparées, composants purs) rend les deux migrations peu coûteuses.

---

## État de vérification

| Contrôle | Résultat |
|---|---|
| Syntaxe TypeScript / JSX (`tsc`) | ✅ 0 erreur sur 57 fichiers |
| Résolution des imports internes | ✅ 131/131 |
| `three` absent du graphe statique de `main.tsx` | ✅ 37 modules en bundle initial, aucun n'importe three |
| Terrain sondé numériquement | ✅ continu, 0,287 m d'écart max entre pas |
| Tokens Tailwind déclarés | ✅ 44 tokens, aucun orphelin |
| Équilibre des blocs | ✅ |
| `npm install` + `npm run build` | ⚠️ **non exécutés** — registre npm inaccessible dans l'environnement de génération |

➡️ **Première action recommandée : `npm install && npm run build`.** La validation sémantique complète (types React, props) n'a pas pu être faite sans les `@types`.
