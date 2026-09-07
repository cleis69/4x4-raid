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

### Les photographies

📍 `src/data/medias.ts` — catalogue, source unique de vérité ·
📍 `src/components/Picture.tsx` — le seul composant autorisé à écrire un `<img>`

| | Avant | Maintenant |
|---|---|---|
| Photos distinctes | 13 | **32** |
| Format | JPEG 1920 px unique | WebP en 640 / 1280 / 1920 px |
| `srcset` | absent (le `sizes` seul ne sert à rien) | complet sur **chaque** image |
| Poids servi à un téléphone | ~2,9 Mo | quelques dizaines de Ko |
| `alt` | parfois un nom de fichier | rédigé, attaché à la photo |

Les 32 photographies viennent toutes de la médiathèque d'origine — dont une
vingtaine n'avait jamais été publiée. Aucune page ne partage plus sa photo de
tête avec une autre, et les huit images de la galerie historique sont
conservées.

Un repli JPEG n'existe que pour les treize images servies en `og:image` :
plusieurs robots de réseaux sociaux ne décodent pas le WebP.

Pour régénérer `public/media/` : `bash scripts/medias.sh`.

### La section « Nos raids » est devenue lisible

📍 `src/components/sections/Formules.tsx`

L'éventail de cartes est conservé — quatre tirages légèrement pivotés qui se
redressent au survol — mais il ne cachait plus rien. Auparavant le texte était
posé sur la photo et la description n'apparaissait qu'**au survol** : on
faisait défiler quatre grandes images sans comprendre ce qui était proposé, et
sur écran tactile la description n'apparaissait jamais.

Désormais chaque carte porte, toujours visibles, **les mêmes trois axes** :
durée · qui conduit · ce que comprend le format. On ne compare que ce qui est
aligné.

### Régressions SEO corrigées

Trois fichiers de configuration étaient restés d'une refonte abandonnée qui
changeait les URLs. Mis en ligne tels quels, ils annulaient le travail :

| Fichier | Ce qu'il faisait | Corrigé en |
|---|---|---|
| `public/_redirects` · `vercel.json` | **301 de chacune des 13 URLs positionnées vers une adresse inexistante** (`/raids`, `/destinations`, `/le-guide`…) — 404 sur tout le site | plus aucune 301 depuis WordPress : les URLs ne changent pas. Seule reste la canonicalisation vers la forme avec slash final |
| `public/_redirects` · `vercel.json` | rewrite attrape-tout `/* → /index.html`, qui servait le HTML de l'**accueil** sur les treize adresses et annulait le prérendu | supprimé. Le serveur sert le fichier prérendu de chaque route |
| `public/sitemap.xml` | 18 URLs inexistantes, aucune des 13 vraies, et un espace de noms erroné (`sitemap.org` au lieu de `sitemaps.org`) | les 13 URLs réelles, espace de noms valide |
| `index.html` | `<title>` et `<meta description>` génériques **en plus** de ceux de la page → deux `<title>` par document | métadonnées laissées à `<Seo>` seul |

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
| Endpoint du formulaire de contact | ⏳ à brancher (`src/pages/Contact.tsx`) |
| Pages légales | ⏳ mentions, CGV, confidentialité |
| Page 404 personnalisée sur Vercel | ⏳ Netlify la sert déjà (`/* /index.html 404`) |

---

## État de vérification

| Contrôle | Résultat |
|---|---|
| Syntaxe TypeScript / JSX | ✅ 0 erreur sur 34 fichiers |
| Imports internes résolus | ✅ 100/100 |
| 13 URLs = URLs WordPress | ✅ |
| `npm install` + `npm run build` | ✅ 13 pages prérendues, 0 erreur |
| Chaque `<img>` porte un `srcset` | ✅ |
| Références `/media/…` résolues dans `dist/` | ✅ 100 % |
| Un seul `<title>` et un seul `<h1>` par page | ✅ |
| Texte indexé présent dans le HTML servi | ✅ |
