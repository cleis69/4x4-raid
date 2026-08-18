# 4X4-RAID — Refonte

React · TypeScript · TSX · Tailwind. **Stack conservée**, composition refondue,
SEO préservé.

Document de référence : [`INVENTAIRE-SEO.md`](./INVENTAIRE-SEO.md) — le relevé
verbatim de l'ancien site, contrat du portage.

---

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + prérendu statique dans dist/
npm run preview
```

---

## La correction SEO de fond : le prérendu

Le site est en React. Sans prérendu, Google reçoit un `<div id="root">` vide et
doit exécuter le JavaScript pour voir le contenu — risque réel sur un site déjà
positionné.

`vite-react-ssg` génère **un fichier HTML complet par route au build**. React
reste React, react-router reste react-router, mais Google reçoit une page pleine,
comme avec WordPress.

Le test décisif, après `npm run build` :

```bash
grep "Notre répertoire de circuits" dist/circuits-raid-4x4-au-maroc/index.html
```

Si la commande renvoie la ligne, le texte est dans le HTML servi.

⚠️ **Conséquence à connaître** : les métadonnées ne peuvent pas être posées via
`useEffect` (il ne s'exécute pas au build). Elles passent par `<Head>` dans
`src/components/Seo.tsx`, donc rendues dans l'arbre React.

---

## Les 13 URLs — identiques à WordPress

📍 `src/routes.tsx` · **ne jamais modifier un `path` de ce fichier.**

| URL | Page |
|---|---|
| `/` | Home |
| `/circuits-raid-4x4-au-maroc/` | Circuits |
| `/circuits-raid-4x4-au-maroc/raid-4x4-sur-mesure/` | SurMesure |
| `/circuits-raid-4x4-au-maroc/raids-4x4-pour-entreprises/` | Entreprises |
| `/circuits-raid-4x4-au-maroc/raid-4x4-marrakech/` | Marrakech |
| `/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/` | Excursions |
| `/guide-raids-4x4-maroc/` | Guide |
| `/decouvrir-le-maroc-en-4x4/` | Decouvrir |
| `/actualite-raids-4x4-maroc/` | Actualite |
| `/photos-raids-4x4-maroc/` | Photos |
| `/temoignages/` | Temoignages |
| `/partenaires/` | Partenaires |
| `/contact/` | Contact |

Aucune redirection nécessaire : les URLs ne changent pas.

---

## Ce qui a été refondu

### La composition, pas seulement les couleurs

📍 `src/components/motion/`

| Composant | Rôle |
|---|---|
| `ParallaxImage` | Image sur-dimensionnée qui défile plus lentement. Amplitude bridée à 80 px : au-delà, l'effet se remarque et devient gadget. |
| `FanCards` | Éventail de cartes, rotations de ±3°. Au survol : la carte se redresse et avance, les voisines reculent. |
| `HorizontalScroll` | Section collante dont le contenu glisse latéralement. **Ne détourne pas l'événement `wheel`** — lit la position native. |
| `Carousel` | Glisser-déposer sur défilement natif. Seuil de 4 px avant de considérer un glissement, sinon les clics seraient avalés. |
| `Editorial` | `DisplayIndex` (contraste d'échelle 1:16), `SplitEditorial` (asymétrie 7/5 + débord), `Prose`, `Section`, `SectionHeader`. |

### La 3D a été entièrement retirée

`src/three/`, les hooks associés, `public/models/` et la dépendance `three` :
supprimés. Le bundle retombe à **3 dépendances de production**.

### Corrections SEO appliquées (gains, sans risque)

- Bloc « 3 cartes » dupliqué sur les 13 pages → maillage **contextuel**
  (`CrossLinks` exclut la page courante).
- Lien mort `<>` de la page Circuits → corrigé.
- Page Photos : deux H1 → un seul.
- Alt d'images (noms de fichiers) → rédigés.
- Meta descriptions tronquées (Circuits, Contact) → complétées.
- Zoom mobile rétabli (l'ancien site le bloquait via `user-scalable=0`).
- Données structurées ajoutées : `TravelAgency`, `TouristTrip`, `Person`,
  `Review`, `FAQPage`, `LocalBusiness`.

### Le contenu qui rank est préservé

Texte repris **mot pour mot** de l'ancien site, seules les fautes corrigées
(décision client). Aucun paragraphe raccourci pour le design.

---

## Les animations ne cachent jamais le contenu

`reveal` s'appuie sur un `IntersectionObserver` unique. Le contenu est du DOM
normal : le carrousel, le défilement horizontal et l'éventail sont des
présentations visuelles, jamais une condition d'accès. `prefers-reduced-motion`
et les écrans < 768 px désactivent parallax et défilement horizontal — le
contenu reste identique.

---

## Images — action requise

Les pages pointent vers `/media/…`, pas encore dans le dépôt.

```bash
bash scripts/telecharger-medias.sh
```

Le script rapatrie les 14 photographies de 4x4-raid.com. Tant qu'elles viennent
du CDN WordPress, elles peuvent être bloquées (anti-hotlink) et le site dépend de
l'ancien hébergement.

---

## Formulaire — à brancher

📍 `src/pages/Contact.tsx`, fonction `onSubmit`. Formspree ou Basin : 5 minutes.

---

## Arbitrages

| Sujet | Statut |
|---|---|
| Années d'expérience | ✅ 45 ans raid / 25 ans Maroc |
| Jour 7 de la Boucle Sud | ⏳ placeholder sur la page Marrakech |
| Page Actualité | ✅ conservée, contenu propre minimal |
| Fautes de frappe | ✅ corrigées |
| Liens partenaires | ⏳ vérifier que les 5 domaines sont actifs |

---

## État de vérification

| Contrôle | Résultat |
|---|---|
| Syntaxe TypeScript / JSX | ✅ 0 erreur sur 34 fichiers |
| Imports internes résolus | ✅ 100/100 |
| 13 URLs = URLs WordPress | ✅ |
| `npm install` + `npm run build` | ⚠️ **non exécutés** — registre npm inaccessible ici |

➡️ **Première action : `npm install && npm run build`**, puis le `grep` sur
`dist/` pour confirmer que le texte est bien dans le HTML.
