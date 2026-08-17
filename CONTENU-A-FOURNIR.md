# CONTENU À FOURNIR

Tout ce qui manque pour mettre le site en ligne. **Rien n'a été inventé** : chaque information absente du site actuel apparaît dans le code sous forme de `<Placeholder>` visible, avec un libellé qui renvoie à cette liste.

En développement (`npm run dev`), les placeholders sont surlignés en sable avec la mention « À fournir ». En production, ils s'affichent de façon neutre ou disparaissent.

**Comment relire :** lancez `npm run dev` et parcourez le site. Chaque losange ◆ sable est un trou à combler.

---

## 🔴 BLOQUANT — sans ça, le site ne peut pas être publié

### 1. Trancher les incohérences existantes

Ces contradictions sont **déjà en ligne aujourd'hui** et visibles par un prospect attentif.

**1.1 — Années d'expérience.** Quatre chiffres différents cohabitent :

| Valeur | Page |
|---|---|
| « Plus de 45 ans d'expérience des Raids et du sable » | Guide |
| « 25 ans qu'il s'installe au Maroc » | Guide |
| « Mes 25 ans d'expérience au Maroc » | Circuits |
| « Installés au MAROC depuis plus de 25 ans » | Contact |
| « Mes 20 ans d'expérience au Maroc » | Entreprises |
| « Plus de 10 ans d'expérience » | meta Entreprises |

➡️ **Décision attendue** : deux chiffres définitifs — années de raid, et années au Maroc.
📍 `src/pages/Guide.tsx` — bloc `<Chiffre>` + placeholder juste en dessous.

**1.2 — Boucle Sud : le Jour 7 manque.** Le circuit est annoncé « 7 jours / 6 nuits » mais seuls les **Jours 1 à 6** sont détaillés. Le Jour 6 se termine par « retour Marrakech vers 18h00 » — ce qui suggère un circuit de 6 jours.

➡️ **Décision attendue** : soit fournir le Jour 7, soit corriger en « 6 jours / 5 nuits ».
📍 `src/data/raids.ts` — constante `boucleSud`, champ `notes`.

**1.3 — Nom de l'entité.** « Africamiol & J.L.M Organisations » (footer) vs « Jean-Luc Miolane Organisation » (contact).
➡️ Retenir la raison sociale exacte.

---

### 2. Tarifs

**Aucun prix n'existe sur le site actuel.** C'est la première question de tout visiteur, et son absence totale fait fuir.

On ne demande pas de publier une grille rigide — le modèle est le devis. Mais **une fourchette, même large, change radicalement la conversion** : elle permet à l'utilisateur de s'auto-qualifier.

| Offre | Information attendue |
|---|---|
| Excursion journée Marrakech | Le forfait unique annoncé (« tarif unique pour chacun de ces circuits ») |
| Atlas — Oukaïmeden (1 j) | À partir de … € / véhicule ou / personne ? |
| Haut-Atlas (2 j / 1 n) | À partir de … € |
| Boucle Sud (7 j) | À partir de … € |
| Sur mesure | 3 fourchettes : accompagnement seul / semi / tout compris |
| Entreprises | Budget par participant et par jour, taille de groupe min–max |

➡️ **Préciser aussi** : le prix est-il par personne ou par véhicule ? Que couvre-t-il ?
📍 `src/data/raids.ts` — champ `prixAPartirDe` (actuellement `null` partout).

---

### 3. Inclus / non inclus

Le site n'a **aucune liste d'exclusions**. C'est l'information de réassurance la plus consultée avant un achat de ce montant.

Pour chaque raid :

- [ ] Véhicule fourni ou non
- [ ] Carburant
- [ ] Encadrement et véhicule d'accompagnement
- [ ] Hébergements (le détail est partiellement connu)
- [ ] Repas : lesquels sont inclus, lesquels ne le sont pas
- [ ] Assurances (véhicule, personnes, annulation)
- [ ] Transferts aéroport
- [ ] Vols
- [ ] Boissons, pourboires, dépenses personnelles

📍 `src/data/raids.ts` — champs `inclus` (partiellement rempli) et `nonInclus` (vide).

---

### 4. Conditions de vente

- [ ] Montant de l'acompte et modalités de règlement
- [ ] Politique d'annulation (client / organisateur)
- [ ] Assurance annulation : incluse, proposée, obligatoire ?
- [ ] Conditions météo / force majeure
- [ ] Immatriculation d'agence de voyage, licence, garantie financière
- [ ] Assurance responsabilité civile professionnelle

📍 `src/pages/RaidDetail.tsx` — section « Conditions ».

---

### 5. Pages légales — obligation

- [ ] **Mentions légales** (éditeur, hébergeur, directeur de publication, immatriculation)
- [ ] **CGV**
- [ ] **Politique de confidentialité** (RGPD — le formulaire collecte des données personnelles)
- [ ] **Bandeau cookies conforme** (l'actuel ne permet pas de refuser)

📍 Routes `/mentions-legales`, `/cgv`, `/confidentialite` — liées dans le footer, **pages à créer**.

---

## 🟠 IMPORTANT — dégrade fortement l'expérience

### 6. Images optimisées

Le site pointe actuellement vers le CDN WordPress (`4x4-raid.com/wp-content/uploads/`). Tant que c'est le cas, le nouveau site **dépend de l'ancien hébergement** et Lighthouse restera pénalisé.

➡️ Récupérer les originaux auprès du photographe, puis pour chaque image :

| Format | Largeurs | Qualité |
|---|---|---|
| AVIF (principal) | 640 / 1280 / 1920 px | ~50 |
| WebP (fallback) | 640 / 1280 / 1920 px | ~75 |
| JPG (fallback ultime) | 1280 px | ~80 |

Déposer dans `/public/media/`, puis mettre à jour `src/data/medias.ts`.

**Images actuellement utilisées** (11 fichiers) : voir `src/data/medias.ts`.

**Photos supplémentaires souhaitées :**
- [ ] Portrait de Jean-Luc en action (celle existante est une GoPro un peu floue)
- [ ] Photos d'équipe
- [ ] Photos par étape pour la boucle Sud (Chegaga, Merzouga, Sarhro, Aït Benhaddou)
- [ ] Photos de véhicules, traitées comme des photos produit
- [ ] Bivouac de nuit
- [ ] Détails : road-book, tableau de bord, mains sur le volant, pique-nique

---

### 7. Formulaire — à brancher

Le formulaire est **fonctionnel côté interface mais n'envoie rien**. Voir `README.md` § Formulaire pour les options d'intégration.

➡️ Fournir l'adresse de réception des demandes.
📍 `src/pages/Contact.tsx` — fonction `onSubmit`.

---

### 8. Vidéo Hero

Le site annonce « VIDEO disponible bientôt » depuis 2020. Le Hero est **déjà construit pour la recevoir** : dès que `src/data/medias.ts` est renseigné, il bascule automatiquement de la photo à la vidéo.

**Cahier des charges :**

| Critère | Valeur |
|---|---|
| Durée | 12 à 20 s, boucle propre |
| Format | `.mp4` (H.264, < 3 Mo) **et** `.webm` |
| Résolution | 1920 × 1080 |
| Audio | Aucun (le Hero est en `muted`) |
| Plans | Roues dans le sable · crête de dune · silhouette à contre-jour · piste qui défile · main sur le volant |

⚠️ **Pas de plan de drone touristique générique.** Le Hero doit raconter la conduite, pas le paysage.

---

### 9. Fiches véhicules

Le site actuel ne nomme **aucun véhicule** : ni marque, ni modèle, ni motorisation. Seules quatre *catégories* sont mentionnées (4x4, moto, SSV, buggy), plus le fait qu'on peut venir avec le sien ou en louer un sur place.

La page `/vehicules` **existe et est entièrement mise en page**, avec un tableau de caractéristiques par engin. Chaque ligne est actuellement un placeholder. **Dès que `src/data/vehicules.ts` est rempli, la page devient une vraie fiche produit — sans une ligne de code à modifier.**

Pour chaque véhicule de la flotte :

- [ ] Marque et modèle
- [ ] Motorisation, transmission, boîte
- [ ] Capacité (places, coffre)
- [ ] Équipement spécifique (treuil, snorkel, suspension, réservoir additionnel, GPS)
- [ ] Terrain recommandé
- [ ] 3 à 5 photos par véhicule, traitées comme des photos produit
- [ ] Disponible en location seule ? À quel tarif ?

📍 `src/data/vehicules.ts` — champ `specs`, actuellement `null` partout.

---

### 10. Détail des 3 excursions Marrakech

Le site indique volontairement : *« on ne va pas tout vous dire pour que vous puissiez découvrir »*.

**C'est un parti pris défendable**, mais il a un coût : impossible de se différencier ou de référencer trois offres identiques et anonymes.

➡️ **Deux options :**
- **A.** Garder le mystère, mais nommer les trois circuits (ex. « Agafay », « Vallées berbères », « Contreforts de l'Atlas ») avec durée et type de terrain.
- **B.** Détailler complètement.

➡️ **Recommandation : option A.** On garde la surprise tout en donnant matière à choisir.
📍 `src/data/raids.ts` — constante `excursions`.

---

## 🟡 SOUHAITABLE — améliore nettement le résultat

### 11. Saisonnalité

Le site évoque « en tenant compte des saisons » sans jamais préciser lesquelles.

- [ ] Fenêtres praticables par région (Sahara / Atlas / côte)
- [ ] Périodes à éviter
- [ ] Meilleure période pour les dunes

➡️ Active le **filtre « Saison »** sur la page Raids (actuellement désactivé) et alimente une réponse FAQ.
📍 `src/data/raids.ts` — `filtreSaisonDisponible = false`.

### 12. Traces GPS

La carte actuelle est un **diagramme d'étapes schématique**, explicitement libellé comme tel — car aucune coordonnée n'est publiée et qu'il était hors de question d'inventer un tracé.

- [ ] Fichiers GPX ou tracés approximatifs par raid

➡️ Permet une vraie carte MapLibre avec fond sombre personnalisé.
📍 `src/components/ui/RouteMap.tsx`

### 13. Autorisations & conformité

- [ ] **Témoignages** : accord des personnes citées nommément (RGPD)
- [ ] **Références entreprises** : autorisation d'usage des marques (L'Oréal, Renault, Bardahl…). En texte seul le risque est faible ; pour les logos, l'autorisation est nécessaire.

### 14. Réseaux sociaux

Seul Facebook figure sur le site.

- [ ] Instagram ? (essentiel sur ce marché — c'est là que se joue le désir)
- [ ] YouTube ?
- [ ] TripAdvisor / Google Business ?

📍 `src/data/site.ts` — tableau `social`.

### 15. Divers

- [ ] Le numéro est-il joignable sur **WhatsApp** ? (très utilisé par cette clientèle)
- [ ] Logo **vectoriel** (SVG) — l'actuel est un PNG basse définition
- [ ] Langues : une **version anglaise** est-elle souhaitée ? L'architecture le permet.
- [ ] Nombre de raids organisés, nombre de participants — des chiffres crédibilisants, s'ils existent

---

## Récapitulatif

| Priorité | Élément | Effort client |
|---|---|---|
| 🔴 | Trancher les incohérences | 15 min |
| 🔴 | Fourchettes tarifaires | 1 h |
| 🔴 | Inclus / non inclus | 1 h |
| 🔴 | Conditions de vente | 2 h |
| 🔴 | Pages légales | Juridique |
| 🟠 | Images optimisées | 1 j (ou prestataire) |
| 🟠 | Adresse de réception du formulaire | 5 min |
| 🟠 | Vidéo Hero | Tournage |
| 🟠 | Fiches véhicules | 2 h + photos |
| 🟠 | Nommer les 3 excursions | 30 min |
| 🟡 | Saisonnalité | 30 min |
| 🟡 | Traces GPS | Variable |
| 🟡 | Autorisations | Variable |

**Le minimum pour une mise en ligne :** les 5 lignes rouges + l'adresse du formulaire. Comptez une demi-journée de travail côté client.
