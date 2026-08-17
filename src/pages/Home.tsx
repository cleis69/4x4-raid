import { useSeo } from '@/lib/seo'
import { media } from '@/data/medias'
import { Hero } from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { Experiences } from '@/components/sections/Experiences'
import { RaidsPreview } from '@/components/sections/RaidsPreview'
import { Immersion } from '@/components/sections/Immersion'
import { Dunes } from '@/components/sections/Dunes'
import { Territoires } from '@/components/sections/Territoires'
import { Vehicules } from '@/components/sections/Vehicules'
import { Process } from '@/components/sections/Process'
import { Temoignages } from '@/components/sections/Temoignages'
import { Galerie } from '@/components/sections/Galerie'
import { Faq, faqJsonLd } from '@/components/sections/Faq'
import { FinalCta } from '@/components/sections/FinalCta'

/**
 * HOMEPAGE — narration en 12 mouvements.
 * L'ordre suit le parcours : Explorer → Désirer → Se projeter →
 * Se rassurer → Réserver.
 */
export default function Home() {
  useSeo({
    title: '4x4-raid — Raids 4x4 sur mesure au Maroc | Atlas, Sahara, Merzouga',
    description:
      "Raids 4x4 sur mesure au Maroc, tracés et guidés par Jean-Luc Miolane. De la journée dans l'Atlas à la boucle Sud de 1 500 km. Départs Marrakech, Agadir, Ouarzazate.",
    path: '/',
    image: media.heroPoster.src,
    jsonLd: faqJsonLd,
  })

  return (
    <>
      <Hero />
      <Manifesto />
      <Experiences />
      <RaidsPreview />
      <Immersion />
      <Dunes />
      <Territoires />
      <Vehicules />
      <Process />
      <Temoignages />
      <Galerie />
      <Faq />
      <FinalCta />
    </>
  )
}
