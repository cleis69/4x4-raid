# DÉMARRAGE — GitHub → Lovable

Le dépôt git est **déjà initialisé et commité**. Branche `main`, 7 commits, 77 fichiers, 692 Ko.
Il ne reste que le `remote` et le `push`.

---

## 1 · Vérifier en local — à faire en premier

C'est la seule étape qui n'a pas pu être validée à la génération : le registre npm était inaccessible. Corrigez avant que le code parte sur GitHub.

```bash
cd 4x4-raid
npm install
npm run build      # tsc --noEmit puis build Vite
npm run dev        # http://localhost:5173
```

**Ce qu'il faut regarder :**

| Contrôle | Attendu |
|---|---|
| `npm run build` | 0 erreur TypeScript |
| Hero au chargement | La photo s'affiche, puis fondu vers la scène 3D |
| Console | Aucune erreur de compilation de shader |
| Scroll dans le hero | Le soleil traverse le ciel, la caméra change de focale |
| Les 23 placeholders | Losanges ◆ sable, chacun renvoyant à `CONTENU-A-FOURNIR.md` |

⚠️ Si `@types/three` et `three` résolvent des versions différentes, alignez-les — c'est la friction la plus probable.

---

## 2 · Pousser sur GitHub

Créez un dépôt **vide** — sans README, sans .gitignore, sans licence. Ils existent déjà et vous auriez un conflit au premier push.

```bash
git commit --amend --reset-author --no-edit     # signe sous votre identité git
git remote add origin https://github.com/<votre-compte>/4x4-raid.git
git push -u origin main
```

En SSH : `git remote add origin git@github.com:<votre-compte>/4x4-raid.git`

> Le `--amend` ne réécrit que le dernier commit. Pour réattribuer les 7 :
> `git rebase --root --exec "git commit --amend --reset-author --no-edit"`

---

## 3 · Importer dans Lovable

**New Project → Import from GitHub → sélectionner `4x4-raid`.**

La stack est celle de Lovable nativement : Vite + React 18 + TypeScript + Tailwind, alias `@/`, react-router-dom. Aucune conversion à l'import.

**Trois différences à connaître avant de prompter :**

| | |
|---|---|
| **Pas de shadcn/ui** | Les composants sont maison (`src/components/ui/`). Volontaire : 44 tokens et 4 dépendances. Demander à Lovable d'ajouter shadcn installerait Radix et une trentaine de paquets. |
| **`three` en dépendance** | Uniquement pour le hero 3D et la section dunes. Chargé dynamiquement, hors du bundle initial. |
| **Pas de Supabase** | Rien côté back tant que le formulaire n'a pas d'endpoint (§ 5). |

---

## 4 · Le garde-fou — à poser AVANT le premier prompt

Dans Lovable : **Settings → Knowledge** (Project Knowledge). Collez ce bloc tel quel.

> **1 — Ne jamais inventer de contenu.**
>
> Le dossier `src/data/` est la source de vérité du contenu. Chaque champ porte une annotation : `✅` information réelle vérifiée sur 4x4-raid.com, `⚠️` information manquante à fournir par le client.
>
> Les champs valant `null` — tarifs, caractéristiques véhicules, distances, exclusions, hébergements — sont vides **parce que l'information n'existe pas**. Ne jamais les remplir avec une valeur plausible ou un exemple. Ils restent `null` jusqu'à ce que le client fournisse la donnée. Ne pas régénérer ni restructurer `src/data/`, ne pas supprimer les commentaires d'annotation.
>
> **2 — Ne pas toucher à `src/three/` sans demande explicite.**
>
> Ce dossier contient la scène 3D du hero. Trois points sont fragiles et cassent silencieusement :
>
> - `desert.ts` injecte du GLSL dans `MeshStandardMaterial` via `onBeforeCompile`, en ciblant cinq chunks Three.js précis (`common`, `worldpos_vertex`, `normal_fragment_maps`, `roughnessmap_fragment`, `opaque_fragment`). Modifier ces chaînes casse le rendu du sable sans erreur visible.
> - `field.ts` est lu à la fois par le terrain et par le véhicule. Toute modification de `heightAt` doit rester continue, sinon le 4x4 flotte ou s'enfonce.
> - `three` doit rester en import **dynamique** (`import('@/three/scene')`). Le passer en import statique le ferait entrer dans le bundle initial et détruirait les Core Web Vitals.
>
> **3 — Design system.**
>
> Couleurs, tailles typographiques, espacements et courbes sont des tokens définis dans `tailwind.config.ts` et `src/index.css`. Ne jamais écrire de valeur hexadécimale, de `px` arbitraire ou de `cubic-bezier` en dur dans un composant. L'accent sable (`text-sand` / `bg-sand`) ne doit pas dépasser environ 3 % de la surface d'un écran.
>
> **4 — Dépendances.**
>
> 4 dépendances de production : react, react-dom, react-router-dom, three. Ne pas ajouter framer-motion, lucide-react, gsap, une librairie de carrousel ou de carte sans demande explicite. Les animations sont en CSS + un unique IntersectionObserver.
>
> **5 — Langue.** Site francophone, tout le contenu visible est en français.

Sans ce bloc, l'agent comblera les champs `null` avec des tarifs inventés dès le premier prompt un peu large, et réécrira volontiers les shaders.

---

## 5 · Brancher le formulaire

C'est ce qui empêche le site de convertir. 📍 `src/pages/Contact.tsx`, fonction `onSubmit`.

**Le plus rapide — Formspree**, 5 minutes, aucun back-end :

```ts
const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
  await fetch('https://formspree.io/f/XXXXX', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, objet, raid }),
  })
  setEnvoye(true)
}
```

**Si vous restez dans Lovable — Supabase Edge Function + Resend.** Prompt :

> Branche le formulaire de `src/pages/Contact.tsx` sur une Edge Function Supabase qui envoie un e-mail via Resend à `info@4x4-raid.com`. Ne change rien à l'interface du formulaire ni à ses 3 étapes. Ajoute seulement la gestion des états de chargement et d'erreur.

---

## 6 · Le modèle 3D du véhicule

Le 4x4 procédural est un **placeholder** et ne peut pas être photoréaliste — c'est une limite géométrique, pas un réglage. Voir `public/models/LISEZ-MOI.md`.

Déposez `public/models/vehicle.glb` : il est détecté et chargé automatiquement, sans qu'une ligne du système de caméra, d'animation ou de lumière ne change.

⚠️ **Un GLB dépasse souvent 50 Mo.** GitHub avertit au-delà et refuse à 100 Mo. Passez par Git LFS :

```bash
git lfs install
git lfs track "*.glb"
git add .gitattributes public/models/vehicle.glb
git commit -m "feat: modèle 3D du véhicule"
```

Optimisez avant de committer — cible sous 8 Mo :

```bash
npx gltf-transform optimize brut.glb public/models/vehicle.glb \
  --compress draco --texture-compress ktx2 --texture-size 2048
```

---

## 7 · Comment prompter Lovable sur ce projet

**Par section, jamais par page entière.** L'agent respecte bien mieux le design system sur un périmètre serré.

| ✅ Bon prompt | ❌ Mauvais prompt |
|---|---|
| « Dans `RaidDetail.tsx`, resserre l'espacement vertical de la timeline sur mobile » | « Améliore la page raid » |
| « Ajoute un hover sur les cartes de `Destinations.tsx`, en respectant `duration-base` et `ease-raid` » | « Rends le site plus dynamique » |
| « Remplace les URL de `src/data/medias.ts` par les fichiers de `/public/media/` » | « Optimise les images » |
| « Dans `src/three/timeline.ts`, réchauffe la phase `sunset` » | « Améliore le rendu 3D » |

Relisez le diff après chaque série — en particulier `src/data/` et `src/three/`.

---

## 8 · Déploiement

| Hébergeur | Fichier fourni |
|---|---|
| Vercel | `vercel.json` — rewrites SPA + redirections 301 |
| Netlify | `public/_redirects` |

Build : `npm run build` · Dossier : `dist`

🔴 **Les redirections 301 sont le point critique.** Elles préservent 6 ans d'historique SEO depuis les anciennes URL WordPress. Si vous déployez via Lovable plutôt que Netlify ou Vercel, vérifiez que `_redirects` est pris en compte — sinon recréez-les côté hébergeur ou DNS. **Ne mettez pas en ligne sans elles.**

---

## 9 · Avant la mise en ligne

| Priorité | Action | Où |
|---|---|---|
| 🔴 | Trancher les incohérences (45/25/20/10 ans · Jour 7 de la boucle Sud) | `CONTENU-A-FOURNIR.md` § 1 |
| 🔴 | Fourchettes tarifaires | § 2 |
| 🔴 | Inclus / non inclus | § 3 |
| 🔴 | Pages légales (mentions, CGV, confidentialité) | § 5 |
| 🔴 | Vérifier les redirections 301 | § 8 ci-dessus |
| 🟠 | Ré-exporter les images en AVIF/WebP | § 6 |
| 🟠 | Endpoint du formulaire | § 5 ci-dessus |
| 🟠 | Modèle GLB du véhicule | § 6 ci-dessus |

---

## Les documents du projet

| Fichier | Contenu |
|---|---|
| `AUDIT-ET-DIRECTION-ARTISTIQUE.md` | Audit de l'existant, positionnement, DA, copywriting, conversion |
| `CONTENU-A-FOURNIR.md` | Tout ce qui manque, par priorité, avec l'emplacement dans le code |
| `README.md` | Stack, structure, design system, hero 3D, performance, SEO |
| `public/models/LISEZ-MOI.md` | Cahier des charges du GLB véhicule |
