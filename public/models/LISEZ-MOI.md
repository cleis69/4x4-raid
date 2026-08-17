# Déposer ici : `vehicle.glb`

Le 4x4 procédural de `src/three/vehicle.ts` est un **placeholder**. Il ne
peut pas être photoréaliste, et ce n'est pas une question de réglage.

## Pourquoi un shader ne suffira pas

Un objet manufacturé réel n'a **aucune arête parfaitement vive**. Il porte
partout un congé d'un à deux millimètres qui accroche un liseré
spéculaire quand la lumière rase. C'est ce liseré — et lui seul — que
l'œil utilise pour décider qu'une forme existe physiquement.

C'est de la géométrie. Aucun matériau ne le fabrique.

Le placeholder utilise désormais des volumes congés (`RoundedBoxGeometry`),
ce qui le fait passer de « asset de jeu » à « maquette soignée ». Pour du
photoréalisme, il faut un vrai modèle.

## Mode d'emploi

Déposez le fichier ici sous le nom `vehicle.glb`. C'est tout — il est
détecté et chargé automatiquement au démarrage de la scène. Aucune ligne
du système de caméra, d'animation, de lumière ou de scroll ne change.

Si le fichier est absent, le placeholder reste affiché et rien ne casse.

## Cahier des charges

| Critère | Valeur |
|---|---|
| Orientation | +Z vers l'avant, +Y vers le haut |
| Origine | centre de l'empattement, au niveau du sol |
| Échelle | mètres (un 4x4 fait ~4,8 m) |
| Budget | 150 k à 400 k triangles — inutile d'aller plus haut |
| Matériaux | PBR metallic-roughness |
| Textures | KTX2 (Basis) de préférence, sinon WebP |
| Géométrie | compressée Draco |
| Roues | nommées `wheel_fl`, `wheel_fr`, `wheel_rl`, `wheel_rr` |

⚠️ **Les roues doivent avoir leur origine au centre de rotation.** Sinon
elles décrivent un cercle au lieu de tourner sur elles-mêmes — le défaut
le plus fréquent sur les assets du commerce.

Si le GLB est monobloc (pas de roues nommées), les roues procédurales
sont conservées et continuent de tourner correctement.

## Où trouver un modèle

Sketchfab (filtrer sur licence commerciale), Quixel, Turbosquid, ou un
modèle CAD constructeur décimé. **Vérifiez impérativement la licence
pour un usage commercial** — c'est le point qui bloque le plus souvent.

Un Defender, un Land Cruiser série 70 ou un Hilux correspondent à la
réalité des raids de 4x4-raid. Éviter les SUV urbains.

## Optimisation avant intégration

```bash
npx gltf-transform optimize brut.glb vehicle.glb \
  --compress draco --texture-compress ktx2 --texture-size 2048
```

Cible : moins de 8 Mo. Au-delà, le chargement se voit.
