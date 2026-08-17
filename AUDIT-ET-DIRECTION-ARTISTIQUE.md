# 4X4-RAID — AUDIT, POSITIONNEMENT, DIRECTION ARTISTIQUE

Document de référence de la refonte. Août 2026.
Source de l'audit : les 10 pages publiques de `4x4-raid.com`, consultées et analysées intégralement.

---

## 1. AUDIT DU SITE EXISTANT

### 1.1 Ce qu'est réellement 4x4-raid

C'est le point le plus important, et le site actuel le dit mal.

**4x4-raid n'est pas une agence de voyage. C'est un homme.**

Jean-Luc Miolane, surnommé « le Renard du Désert », 45 ans d'expérience des raids, installé au Maroc depuis plus de 25 ans. Il trace les itinéraires, il fait les repérages, il ouvre la piste devant les clients, il répare, et il prépare les pique-niques dont les participants parlent encore des années après.

Le site actuel enterre cette information sur une page secondaire intitulée « Votre guide ». C'est l'actif de marque le plus fort de l'entreprise, et il est en cinquième position dans le menu.

**Le modèle économique n'est pas la réservation, c'est le devis.** Aucun prix n'est publié nulle part. C'est cohérent avec l'offre — chaque raid est composé sur mesure — mais le site ne l'assume pas : il ressemble à un catalogue amputé de ses tarifs plutôt qu'à un service de conception sur mesure.

### 1.2 Architecture actuelle

```
Accueil
├── Raids 4×4              ├── sur mesure
│                          └── pour entreprises
├── Excursions 4×4         (3 excursions à Marrakech)
├── Votre guide            ← l'actif principal, enterré ici
├── Informations           ├── Découvrir le Maroc en 4×4
│                          ├── Actualités
│                          ├── Photos
│                          ├── Témoignages
│                          └── Partenaires
└── Contact
```

**Problèmes structurels :**

| Problème | Conséquence |
|---|---|
| Menu « Informations » fourre-tout à 5 entrées | Les témoignages — la meilleure preuve sociale du site — sont invisibles |
| La page « Raids 4×4 » ne liste pas les raids | Elle liste 3 *catégories* d'offre. L'utilisateur qui veut voir un itinéraire doit deviner qu'il est dans « Circuits départ de Marrakech » |
| Le seul itinéraire réellement détaillé (boucle Sud, 7 jours) est en bas d'une sous-page | Le contenu le plus vendeur du site est à 3 clics de la home |
| Le même bloc « 3 cartes + CTA » est répété en bas de **chaque** page | Aucune page ne se termine sur un argument spécifique |
| CTA unique : « Demandez votre offre personnalisée » | Il apparaît 3 à 4 fois par page, y compris deux fois d'affilée. Un des liens pointe vers `<>` (lien mort) |

### 1.3 Identité visuelle actuelle

- **Thème** : Divi Photography 1.0.0 (WordPress). Template photographe générique, jamais personnalisé.
- **Typographie** : polices par défaut du thème, aucune hiérarchie construite. Les titres de section sont en `<h3>` gras, parfois avec du `**markdown**` visible.
- **Couleurs** : blanc / gris, aucune couleur de marque identifiable.
- **Logo** : « 4x4-raid by africamiol », PNG basse définition, pas de version vectorielle.
- **Images** : c'est le point fort du site. Photographies réelles, de bonne qualité, prises pendant les raids (fichiers `Canon6D_Michael_*`, `GoPro_MSC_*`, `MG_*`). **À conserver absolument.**

### 1.4 Contenu — la vraie richesse, mal exposée

Ce que le site possède et qui vaut de l'or :

- **Un itinéraire jour par jour de 7 jours / 1 500 km**, avec kilométrages précis, terrains, hébergements. C'est un document de vente exceptionnel, présenté comme une liste à puces au milieu d'une page.
- **8 témoignages nominatifs**, dont un directeur général de L'Oréal et un directeur commercial de Bardahl. Écrits, précis, crédibles.
- **9 références entreprises** : L'Oréal, Renault, Bardahl, BF Goodrich, Carglass, Labeyrie, Dade Behring, Gemma Gastronomie, Siligom.
- **Une page d'infos pratiques Maroc** complète et utile.

Ce qui manque totalement :

- Tarifs (aucun, nulle part)
- Fiches véhicules (aucune marque, aucun modèle, aucune caractéristique)
- Détail des 3 excursions Marrakech (volontairement caché : « on ne va pas tout vous dire »)
- Vidéo (« VIDEO disponible bientôt » depuis 2020)
- Dates, disponibilités, calendrier
- Conditions d'annulation, assurances, mentions légales, CGV
- Instagram / YouTube (seul Facebook, dernière activité non vérifiable)

### 1.5 Incohérences relevées

À arbitrer avant publication — elles sont visibles par un prospect attentif :

| Information | Valeurs trouvées | Où |
|---|---|---|
| Années d'expérience | **45 ans** / **25 ans** / **20 ans** / **plus de 10 ans** | Guide / Circuits + Contact / Entreprises / meta Entreprises |
| Boucle Sud | Annoncée « **7 jours / 6 nuits** » mais seuls les **Jours 1 à 6** sont détaillés | Page Raid 4x4 Marrakech |
| Nom de l'entité | « Africamiol & J.L.M Organisations » / « Jean-Luc Miolane Organisation » | Footer / Page Contact |

Le texte comporte par ailleurs de nombreuses fautes de frappe et d'accord (« à bort du 4×4 », « nous ferons reste », « Prévoyer », « la meilleure manière » / « les meilleure manière »). Sur un positionnement premium, c'est disqualifiant.

### 1.6 SEO

**Ce qui fonctionne :** structure de meta correcte (Yoast/Rank Math), Open Graph présent, canonicals, sitemap, ciblage géographique clair (Marrakech / Agadir / Ouarzazate).

**Ce qui ne fonctionne pas :**
- Bourrage de mots-clés visible : « raid 4×4 au Maroc » répété 6 fois dans un paragraphe de 4 lignes.
- Titres H1/H3 dupliqués entre pages, hiérarchie H2/H3 incohérente.
- URLs longues et imbriquées : `/circuits-raid-4x4-au-maroc/3-excursions-4x4-a-marrakech/`
- Aucune donnée structurée (pas de `TouristTrip`, `TravelAgency`, `FAQPage`, `Review`) — alors que le contenu s'y prête parfaitement.
- Alt text absents ou égaux au nom de fichier.

### 1.7 Performance & responsive

- Images servies en **`-scaled.jpg`, jusqu'à 2560 px de large**, en JPEG, sans `srcset` réel, sans lazy loading systématique.
- WordPress + Divi : ~1,2 Mo de JS/CSS avant tout contenu.
- `maximum-scale=1.0, user-scalable=0` dans le viewport → **le zoom est bloqué sur mobile**. C'est un défaut d'accessibilité (WCAG 1.4.4) et pénalisé par Google.
- Bandeau cookies non conforme (pas de refus possible).

---

## 2. CE QU'ON GARDE, CE QU'ON SUPPRIME, CE QU'ON TRANSFORME

### ✅ On garde

| Élément | Pourquoi |
|---|---|
| **Toutes les photographies** | Vraies, bonnes, irremplaçables. Elles portent le site. |
| **L'itinéraire 7 jours détaillé** | Meilleur contenu de vente disponible. On le remonte au premier plan. |
| **Les 8 témoignages** | Preuve sociale de premier ordre. On les remonte en home. |
| **Les 9 références entreprises** | Crédibilité B2B immédiate. |
| **Les infos pratiques Maroc** | Utiles, réassurantes, bon pour le SEO longue traîne. |
| **Jean-Luc Miolane** | L'actif de marque. On le remonte au centre. |
| **Le modèle du devis sur mesure** | Cohérent avec l'offre. On l'assume au lieu de le subir. |

### ❌ On supprime

| Élément | Pourquoi |
|---|---|
| Le bloc « 3 cartes » répété en pied de chaque page | Redondance sans valeur, dilue chaque page |
| Le menu « Informations » | Fourre-tout. Son contenu est redistribué. |
| La page « Partenaires » | Vide de substance en l'état |
| La page « Actualités » | Non alimentée. À rouvrir seulement s'il y a un vrai rythme éditorial. |
| `user-scalable=0` | Défaut d'accessibilité |
| Le bourrage de mots-clés | Contre-productif et illisible |

### 🔄 On transforme

| Avant | Après |
|---|---|
| « Votre guide » (page n°5 du menu) | **Le Guide** — page pilier, remontée dans la nav, et Jean-Luc présent dès la home |
| « Circuits départ de Marrakech » (sous-sous-page) | **Boucle Sud — La grande traversée**, fiche raid premium avec timeline |
| « Photos » (galerie brute) | **Galerie éditoriale** intégrée à la home, en grille asymétrique |
| « Témoignages » (page isolée) | **Preuve sociale** en home + page Guide |
| « Découvrir le Maroc en 4×4 » | **Infos pratiques**, section de la page Guide |
| CTA unique répété | **Hiérarchie de 3 CTA** : Explorer les raids → Créer mon aventure → Réserver |

### Nouvelle architecture

```
/                       Home narrative en 12 mouvements
/raids                  Plateforme de découverte + filtres
/raids/:slug            Fiche raid premium (6 raids)
/destinations           Traitement éditorial des territoires
/destinations/:id       Fiche territoire (5 territoires) + raids associés
/experiences            Les sensations, pas les lieux
/vehicules              Les 4 catégories d'engins
/le-guide               Jean-Luc + philosophie + témoignages + infos pratiques
/contact                Demande qualifiée en 3 étapes
```

**Navigation :** Raids · Destinations · Expériences · Véhicules · Le Guide · Contact — plus le CTA « Réserver ». Six entrées : c'est le maximum tenable avant de perdre en lisibilité. Le passage au menu plein écran se fait à 1280 px, pas 1024, pour éviter le tassement.

Toutes les anciennes URL sont redirigées en 301 (`public/_redirects` et `vercel.json`). **Ne pas mettre en ligne sans ces redirections** — c'est 6 ans d'historique SEO.

---

## 3. POSITIONNEMENT

### 3.1 La phrase

> **4x4-raid ne vend pas des circuits. Il ouvre des pistes.**

### 3.2 Ce qu'on est / ce qu'on n'est pas

| On est | On n'est pas |
|---|---|
| Un cartographe d'itinéraires inédits | Un tour-opérateur |
| Un homme qui vit sur le terrain | Une agence avec un call-center |
| Le sur-mesure par défaut | Un catalogue avec option personnalisation |
| Vous au volant | Vous à l'arrière d'un minibus |
| Une expédition | Une excursion |

### 3.3 Le socle de différenciation

Trois arguments que **personne d'autre ne peut copier** :

1. **Le repérage permanent.** Les pistes changent. Un opérateur basé en Europe vend un tracé de 2019. Jean-Luc vit à Marrakech et remet son répertoire à jour en continu.
2. **Vous conduisez.** Ce n'est pas une visite guidée, c'est un apprentissage. Débutant ou pilote confirmé, vous êtes aux commandes.
3. **Une personne, pas une marque.** Le même homme trace, guide, répare et cuisine. Les témoignages ne parlent pas de « l'agence » — ils parlent de Jean-Luc.

### 3.4 Le message central

**Adventure. Freedom. Morocco.** — mais en français, parce que la clientèle et le site le sont.

> **La route s'arrête ici. L'aventure, non.**

Sous-titre : *Des raids 4x4 tracés sur mesure, hors des pistes balisées. Vous êtes au volant ; Jean-Luc ouvre la piste.*

---

## 4. DIRECTION ARTISTIQUE

### 4.1 Le principe

Toute la DA tient dans une tension :

**Désert × Instrument.**

Le désert apporte la matière : sable, grain, chaleur, immensité, silence.
L'instrument apporte la rigueur : mesures, kilométrages, road-book, cadran, précision.

Concrètement : de **très grandes images**, du **noir profond**, et par-dessus, une couche de données typographiques nettes (`J04 · 120 KM HORS-PISTE · BIVOUAC MERZOUGA`). Le paysage est romantique ; la donnée ne l'est pas. C'est le frottement des deux qui produit le premium.

Ce que ça évite : le site « orange désert » avec des icônes de chameau, et le site « agence de voyage 2015 » avec ses gros boutons colorés.

### 4.2 Palette

| Rôle | Hex | Usage |
|---|---|---|
| Fond principal | `#0B0B0A` | 80 % de la surface. Presque noir, jamais pur noir. |
| Surface | `#151513` | Sections alternées, cartes |
| Surface surélevée | `#1E1E1B` | Rare |
| Off-white | `#F2F0E9` | Texte principal. Cassé, jamais blanc pur. |
| Texte secondaire | `#99968D` | Paragraphes, labels |
| **Accent sable** | `#C8A96B` | **Le seul accent visible.** CTA primaire, numéros d'étape, filets. |
| Accent terre | `#8A5A3B` | Uniquement en dégradé, jamais en aplat |

**Règle de retenue :** le sable ne doit jamais dépasser **3 % de la surface** d'un écran. Sur la home, il n'apparaît que sur le CTA principal, les numéros d'étape et les filets d'eyebrow. Si un écran commence à paraître doré, c'est qu'il y a une erreur.

### 4.3 Typographie

| Usage | Police | Traitement |
|---|---|---|
| Titres | **Space Grotesk** 400/500/700 | Très grands, `letter-spacing` négatif jusqu'à `-0.035em`, `line-height` 0.86 sur le display XL |
| Texte | **Inter** 300/400/500 | 62 caractères max par ligne |
| Labels & données | **Space Grotesk** | Majuscules, `letter-spacing` +0.22em, 11–12 px |

**L'échelle est fluide** (`clamp()`) : le titre Hero fait 3 rem sur un iPhone SE et 11 rem sur un écran large, sans palier intermédiaire.

**Le contraste d'échelle est l'outil principal.** Un titre de 11 rem à côté d'un label de 11 px : c'est un rapport de 16 à 1. C'est ce rapport, pas la couleur, qui crée la sensation de luxe.

### 4.4 Espace

Sections : `clamp(5rem, 12vh, 11rem)` de padding vertical. C'est beaucoup, et c'est volontaire — l'espace négatif est ce qui distingue un site premium d'un site dense.

### 4.5 Mouvement

Une seule courbe : `cubic-bezier(0.22, 1, 0.36, 1)`. Elle démarre vite et s'arrête doucement — l'inverse d'une animation « web ». Trois durées : 220 ms (interactions), 480 ms (transitions), 900 ms (reveals).

**Règles :**
- Chaque élément ne s'anime **qu'une fois** (`unobserve` après déclenchement). Un site qui rejoue ses animations au scroll arrière est fatigant.
- Le parallax est plafonné à 70 px et **désactivé sous 768 px**.
- `prefers-reduced-motion` coupe tout, proprement.
- **Aucune librairie d'animation.** Tout est CSS + un unique `IntersectionObserver`. Framer Motion aurait coûté ~45 Ko gzip pour un résultat visuellement identique.

### 4.6 Ce qu'on s'interdit

Carrousels à flèches · Cartes Google par défaut · Icônes décoratives · Ombres portées · Angles arrondis supérieurs à 4 px · Dégradés colorés · Compteurs animés · Curseurs personnalisés · Preloaders · Photos de banque d'images · Emojis

---

## 5. COPYWRITING — LA VOIX

### 5.1 Le ton

**Direct, factuel, sans adjectifs de brochure.** Le désert n'a pas besoin d'être qualifié d'« inoubliable » — il faut juste dire ce qui s'y passe.

La règle de test : *si la phrase pourrait figurer sur le site d'un concurrent, elle est mauvaise.*

### 5.2 Bannis

> « Bienvenue sur notre site » · « Découvrez nos magnifiques circuits » · « Une expérience inoubliable » · « Nous sommes une agence passionnée » · « Des paysages à couper le souffle » · « Au cœur de… » · « Laissez-vous transporter »

### 5.3 Le procédé qui marche : le chiffre nu

Le contenu réel de 4x4-raid est déjà rempli de faits saisissants. Il suffit de les sortir du paragraphe.

| Texte actuel | Réécriture |
|---|---|
| « 120 Km hors pistes dont 50 km de franchissement de Dunes » | **50 km.** Cinquante kilomètres de franchissement de dunes en une seule journée. Pas une trace de piste. |
| « une expérience inoubliable » | *(supprimé — remplacé par un témoignage réel)* |
| « Départ de Marrakech 5h30 » | **5h30.** Le premier jour commence avant le jour. |

### 5.4 Exemples de la nouvelle voix

- **Hero** — *La route s'arrête ici. L'aventure, non.*
- **Manifeste** — *Ce n'est pas un circuit. C'est une expédition.*
- **Véhicules** — *Le vôtre, ou le nôtre.*
- **Entreprises** — *Une dune apprend plus vite qu'un séminaire.*
- **Process** — *Cinq étapes. Pas une de plus.*
- **404** — *Vous êtes sorti de la piste. Ça arrive. Contrairement au désert, ici le demi-tour est simple.*
- **CTA final** — *Votre raid commence ici.*

---

## 6. PARCOURS DE CONVERSION

```
EXPLORER          Hero, manifeste, expériences
    ↓
DÉSIRER           Raids, immersion (50 km), territoires
    ↓
SE PROJETER       Véhicules, process en 5 étapes
    ↓
SE RASSURER       Témoignages, références, FAQ, infos pratiques
    ↓
RÉSERVER          CTA final, formulaire en 3 étapes
```

**Trois CTA, trois rôles, jamais mélangés :**

| CTA | Rôle | Où |
|---|---|---|
| **Explorer les raids** | Découverte | Hero, fins de section |
| **Créer mon aventure** | Conversion principale | Barre mobile, CTA finaux |
| **Réserver** | Intention haute | Navbar uniquement |

Le téléphone est présent partout (navbar desktop, barre mobile, footer, page contact). Pour ce type d'achat — plusieurs milliers d'euros, à l'étranger — **beaucoup de prospects veulent entendre une voix avant de remplir un formulaire.**

### Le choix structurant : pas de tunnel de paiement

Le brief évoquait un système de réservation. **Analyse faite : il n'y en a aucun sur le site actuel**, et il ne faut pas en créer.

Le produit est un devis sur mesure. Imposer un panier obligerait à figer des prix qui n'existent pas, et détruirait la valeur perçue du sur-mesure. Le formulaire en 3 étapes (8 champs) est le bon compromis : il qualifie la demande sans intimider.

---

## 7. CE QUI RESTE À FAIRE

La refonte livrée est structurellement complète. Ce qui la sépare d'une mise en ligne :

1. **Le contenu manquant** → voir `CONTENU-A-FOURNIR.md`. C'est le chemin critique.
2. **Les images** → actuellement servies depuis le CDN WordPress. À ré-exporter en AVIF/WebP.
3. **Le formulaire** → à brancher sur un service d'envoi.
4. **Les pages légales** → mentions, CGV, confidentialité (obligatoire).

**Ordre de priorité recommandé :**

| Priorité | Action | Impact |
|---|---|---|
| 🔴 1 | Trancher les incohérences (années d'expérience, Jour 7) | Crédibilité |
| 🔴 2 | Fournir une fourchette tarifaire, même large | C'est la première question de tout prospect |
| 🟠 3 | Ré-exporter les images en AVIF/WebP | Performance, LCP |
| 🟠 4 | Brancher le formulaire | Sans ça, le site ne convertit pas |
| 🟠 5 | Pages légales | Obligation |
| 🟡 6 | Tourner une vidéo Hero | Le Hero est déjà prévu pour la recevoir |
| 🟡 7 | Fiches véhicules | Débloque une vraie page Véhicules |
