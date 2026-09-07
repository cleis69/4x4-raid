#!/bin/bash
#
# ─────────────────────────────────────────────────────────────────
#  MÉDIAS — rapatriement puis encodage responsive
#
#  Régénère intégralement public/media/ à partir des originaux
#  2560 px de la médiathèque d'origine (4x4-raid.com). Ce sont vos
#  propres photographies, sur votre propre site.
#
#  Le dépôt contient déjà le résultat : ce script n'est à relancer
#  que pour ajouter une photo ou changer un réglage d'encodage.
#
#  USAGE — depuis la racine du projet :
#      bash scripts/medias.sh
#
#  DÉPENDANCE : cwebp (`brew install webp`) et sips (macOS).
#
#  ── Ce qui est produit, et pourquoi ───────────────────────────
#
#  Chaque photo sort en WebP à trois largeurs. Le composant
#  <Picture> en fait un `srcset` : un téléphone de 390 px télécharge
#  le fichier de 640 px, pas celui de 1920. C'est le principal gain
#  de performance du site.
#
#  Un repli JPEG 1200 px n'est produit que pour les images servies
#  en `og:image` — plusieurs robots de réseaux sociaux ne décodent
#  pas le WebP et afficheraient une carte vide.
#
#  ⚠️ Les clés, les largeurs et les dimensions déclarées ici doivent
#  rester synchronisées avec src/data/medias.ts.
# ─────────────────────────────────────────────────────────────────

set -u
BASE="https://4x4-raid.com/wp-content/uploads"
SRC=".medias-sources"   # originaux, hors dépôt (voir .gitignore)
DEST="public/media"

command -v cwebp >/dev/null || { echo "cwebp introuvable — brew install webp"; exit 1; }

mkdir -p "$SRC" "$DEST"

# chemin distant | clé | profil (paysage | portrait) | og
PHOTOS=(
  "Canon6D_Michael_16946-scaled.jpg|dunes-lever-soleil|paysage|og"
  "Canon6D_Michael_16909-scaled.jpg|piste-coucher-soleil|paysage|og"
  "Canon6D_Michael_16948-scaled.jpg|dune-descente|paysage|og"
  "Canon6D_Michael_16971-scaled.jpg|dune-crete|paysage|og"
  "2020/05/Canon6D_Michael_16895-scaled.jpg|dunes-franchissement|paysage|-"
  "2020/04/Canon6D_Michael_16942-scaled.jpg|dunes-ciel-bleu|paysage|og"
  "Canon6D_Michael_15957-scaled.jpg|bivouac-dunes-crepuscule|paysage|og"
  "Canon6D_Michael_16631-scaled.jpg|desert-etendue|paysage|og"
  "2020/04/Canon6D_Michael_16357-scaled.jpg|oued-traversee|paysage|og"
  "2020/05/MG_1614-scaled.jpg|convoi-atlas-enneige|paysage|og"
  "2020/05/IMG_2564-scaled.jpg|erg-dunes|paysage|-"
  "Canon6D_Michael_16939-scaled.jpg|dune-marcheur|paysage|-"
  "2020/04/Canon6D_Michael_16149-scaled.jpg|erg-vue-plongeante|paysage|og"
  "Canon6D_Michael_16386-scaled.jpg|plateau-rocailleux|paysage|-"
  "Canon6D_Michael_16459-scaled.jpg|acacias-contre-jour|paysage|-"
  "Canon6D_Michael_16269-scaled.jpg|piste-montagne-retroviseur|paysage|-"
  "Canon6D_Michael_15545-scaled.jpg|convoi-poussiere|paysage|-"
  "Canon6D_Michael_15558-scaled.jpg|piste-sable-parebrise|paysage|-"
  "Canon6D_Michael_15617-scaled.jpg|pause-piste-atlas|paysage|-"
  "Canon6D_Michael_15482-scaled.jpg|route-plateau|paysage|-"
  "2020/04/Canon6D_Michael_15486-scaled.jpg|route-hamada|paysage|-"
  "2020/05/MG_1553-scaled.jpg|village-berbere-piste|paysage|og"
  "2020/05/MG_1486-scaled.jpg|oued-vallee-verte|paysage|-"
  "2020/05/MG_1533-scaled.jpg|groupe-prairie-atlas|paysage|-"
  "GoPro_MSC_1581-scaled.jpg|equipe-briefing-plateau|paysage|og"
  "2020/05/PHOTO-CONVENTION-EL-059-scaled.jpg|montee-terre-rouge|paysage|-"
  "2020/05/CIMG5842.jpg|groupe-vehicules-atlas|paysage|-"
  "2020/04/iPhone_Michael_2018-09-27-10.15.30-scaled.jpg|oasis-palmeraie|paysage|og"
  "2020/05/dakar-07-team1-by-yvan-034-scaled.jpg|empreinte-sable|paysage|-"
  "2020/05/IMGP2587.jpg|gorge-village-atlas|portrait|-"
  "2020/05/MG_1498-scaled.jpg|ruelle-kasbah-convoi|portrait|-"
  "2020/05/dakar-07-team1-by-yvan-260-scaled.jpg|dakar-vehicule|portrait|-"
  "Logo-4x4-raid-by-africamiol.png|logo-4x4-raid|copie|-"
)

ok=0; ko=0
for entree in "${PHOTOS[@]}"; do
  IFS='|' read -r distant cle profil og <<< "$entree"
  brut="$SRC/${distant##*/}"

  # -e : certains serveurs n'acceptent que les requêtes présentées
  #      comme venant du site lui-même (anti-hotlink).
  if [ ! -f "$brut" ]; then
    if ! curl -fsSL -e "https://4x4-raid.com/" -A "Mozilla/5.0" -o "$brut" "$BASE/$distant"; then
      echo "  ✗ $cle — échec sur $distant"; rm -f "$brut"; ko=$((ko + 1)); continue
    fi
  fi

  if [ "$profil" = "copie" ]; then
    cp "$brut" "$DEST/$cle.png"; echo "  ✓ $cle (copie)"; ok=$((ok + 1)); continue
  fi

  source_w=$(sips -g pixelWidth "$brut" | awk '/pixelWidth/{print $2}')
  if [ "$profil" = "portrait" ]; then largeurs="480 900 1400"; else largeurs="640 1280 1920"; fi

  for w in $largeurs; do
    [ "$w" -gt "$source_w" ] && continue
    cwebp -quiet -q 76 -m 6 -resize "$w" 0 "$brut" -o "$DEST/$cle-$w.webp"
  done

  [ "$og" = "og" ] && sips -Z 1200 -s format jpeg -s formatOptions 66 "$brut" --out "$DEST/$cle.jpg" >/dev/null 2>&1

  echo "  ✓ $cle"
  ok=$((ok + 1))
done

echo
echo "  $ok traitées · $ko échecs · $(du -sh "$DEST" | cut -f1) dans $DEST/"
[ "$ko" -gt 0 ] && exit 1
exit 0
