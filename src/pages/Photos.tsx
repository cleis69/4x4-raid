import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { SEO } from '@/data/seo'
import { Prose, Section } from '@/components/motion/Editorial'
import { PageHero } from '@/components/sections/PageHero'
import { CrossLinks } from '@/components/sections/CrossLinks'


/**
 * Un seul H1 sur cette page — le site d'origine en portait deux
 * (« Souvenirs d'un raid avec » et « 4×4-raid »). Corrigé.
 * Alt rédigés : les originaux étaient des noms de fichiers.
 */
const GALERIE = [
  { src: '/media/atlas-piste-montagne.jpg', alt: 'Piste de montagne du Haut-Atlas parcourue en 4x4 au départ de Marrakech', span: 'md:col-span-7 md:row-span-2' },
  { src: '/media/atlas-reliefs.jpg', alt: "Circuit raid 4x4 dans les reliefs de l'Atlas marocain", span: 'md:col-span-5' },
  { src: '/media/atlas-paysage.jpg', alt: "Paysage de piste marocaine traversé lors d'un raid 4x4", span: 'md:col-span-5' },
  { src: '/media/atlas-piste-oubliee.jpg', alt: "Véhicule tout-terrain sur une piste oubliée de l'Atlas", span: 'md:col-span-4' },
  { src: '/media/dunes-franchissement.jpg', alt: "Franchissement de dunes lors d'un raid 4x4 dans le désert marocain", span: 'md:col-span-8 md:row-span-2' },
  { src: '/media/sur-mesure-piste-sable.jpg', alt: 'Raid 4x4 sur mesure au Maroc, véhicule sur piste sablonneuse', span: 'md:col-span-4' },
  { src: '/media/hero-piste-coucher-soleil.jpg', alt: '4x4 sur piste du Sud marocain au coucher du soleil', span: 'md:col-span-6' },
  { src: '/media/desert-etendue.jpg', alt: "Étendue désertique du Maroc lors d'un raid 4x4", span: 'md:col-span-6' },
]

export default function Photos() {
  return (
    <>
      <Seo seo={SEO.photos} />
      <PageHero eyebrow="Galerie" h1="Photos raids 4×4 Maroc" />

      <Section>
        <div className="container">
          <Prose className="reveal mb-14">
            <p>
              Découvrez les photos de nos raids 4×4 au Maroc et inspirez-vous pour créer votre
              aventure sur mesure. Souvenirs d'un raid avec 4×4-raid.
            </p>
          </Prose>

          <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
            {GALERIE.map((m, i) => (
              <figure
                key={m.src + i}
                className={`reveal overflow-hidden rounded-card ${m.span}`}
                style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as React.CSSProperties}
              >
                <img
                  src={m.src}
                  alt={m.alt}
                  width={1200}
                  height={800}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="h-full min-h-[200px] w-full object-cover transition-transform duration-700 ease-raid hover:scale-105"
                />
              </figure>
            ))}
          </div>

          <div className="reveal mt-12">
            <Link to="/contact/" className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone">
              Demandez votre offre personnalisée
            </Link>
          </div>
        </div>
      </Section>

      <CrossLinks />
    </>
  )
}
