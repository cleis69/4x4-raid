#!/bin/bash
#
# ─────────────────────────────────────────────────────────────────
#  RAPATRIEMENT DES IMAGES
#
#  Récupère les 14 photographies de 4x4-raid.com et les dépose dans
#  public/media/. Ce sont vos propres images, sur votre propre site.
#
#  Pourquoi c'est nécessaire, et pas seulement souhaitable :
#
#  1. Beaucoup d'installations WordPress bloquent les images
#     demandées depuis un autre domaine (protection anti-hotlink).
#     C'est la cause la plus probable des images manquantes.
#
#  2. Même sans blocage, pointer vers l'ancien CDN rend le nouveau
#     site dépendant de l'ancien hébergement. Le jour où vous coupez
#     l'ancien WordPress, le site perd toutes ses photos.
#
#  3. Les fichiers servis sont des JPEG de 2560 px non optimisés.
#     Une fois en local, on peut les convertir (voir la fin).
#
#  USAGE — depuis la racine du projet :
#      bash scripts/telecharger-medias.sh
# ─────────────────────────────────────────────────────────────────

set -u
BASE="https://4x4-raid.com/wp-content/uploads"
DEST="public/media"

mkdir -p "$DEST"

# Correspondance : chemin distant → nom local, à plat et lisible
FICHIERS=(
  "Canon6D_Michael_16909-scaled.jpg|hero-piste-coucher-soleil.jpg"
  "2020/05/Canon6D_Michael_16895-scaled.jpg|dunes-franchissement.jpg"
  "2020/04/Canon6D_Michael_16942-scaled.jpg|sur-mesure-piste-sable.jpg"
  "Canon6D_Michael_15482-scaled.jpg|atlas-piste-montagne.jpg"
  "Canon6D_Michael_15545-scaled.jpg|atlas-reliefs.jpg"
  "Canon6D_Michael_15558-scaled.jpg|atlas-piste-oubliee.jpg"
  "Canon6D_Michael_15617-scaled.jpg|atlas-paysage.jpg"
  "Canon6D_Michael_15957-scaled-1024x683.jpg|panorama-sud.jpg"
  "Canon6D_Michael_16631-scaled.jpg|desert-etendue.jpg"
  "GoPro_MSC_1581-scaled.jpg|guide-jean-luc.jpg"
  "2020/05/MG_1614-scaled.jpg|entreprise-convoi.jpg"
  "2020/05/MG_1533-scaled.jpg|entreprise-seminaire.jpg"
  "2020/04/Canon6D_Michael_15486-scaled.jpg|excursion-journee.jpg"
  "Logo-4x4-raid-by-africamiol.png|logo-4x4-raid.png"
)

ok=0
ko=0

echo "Rapatriement de ${#FICHIERS[@]} fichiers vers $DEST/"
echo

for entree in "${FICHIERS[@]}"; do
  distant="${entree%%|*}"
  local="${entree##*|}"

  # -f : échoue proprement sur une erreur HTTP plutôt que d'écrire
  #      une page d'erreur dans le fichier image.
  # -e : certains serveurs n'acceptent que les requêtes présentées
  #      comme venant du site lui-même.
  if curl -fsSL \
      -e "https://4x4-raid.com/" \
      -A "Mozilla/5.0" \
      -o "$DEST/$local" \
      "$BASE/$distant"; then
    taille=$(du -h "$DEST/$local" | cut -f1)
    echo "  ✓ $local  ($taille)"
    ok=$((ok + 1))
  else
    echo "  ✗ $local  — échec sur $distant"
    rm -f "$DEST/$local"
    ko=$((ko + 1))
  fi
done

echo
echo "───────────────────────────────────────────"
echo "  $ok réussis · $ko échecs"
echo "───────────────────────────────────────────"

if [ "$ko" -gt 0 ]; then
  echo
  echo "Des fichiers ont échoué. Deux causes possibles :"
  echo "  — l'URL a changé sur le WordPress"
  echo "  — le serveur bloque même avec un Referer"
  echo
  echo "Solution de repli : téléchargez-les depuis l'admin WordPress"
  echo "(Médias → Bibliothèque), et renommez-les selon la liste"
  echo "ci-dessus."
  exit 1
fi

echo
echo "Étape suivante — optimisation."
echo
echo "Les fichiers récupérés sont des JPEG de 2560 px. C'est le"
echo "principal frein aux performances du site. Pour les convertir :"
echo
echo "  brew install webp"
echo "  for f in $DEST/*.jpg; do"
echo "    cwebp -q 78 -resize 1920 0 \"\$f\" -o \"\${f%.jpg}.webp\""
echo "  done"
echo
echo "Puis remplacez .jpg par .webp dans src/data/medias.ts."
