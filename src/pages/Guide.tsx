import { useSeo } from '@/lib/seo'
import { media } from '@/data/medias'
import { site, philosophie } from '@/data/site'
import { infosPratiques, temoignages } from '@/data/contenu'
import { Button } from '@/components/ui/Button'
import { Figure, Placeholder, Reveal, Section } from '@/components/ui/Primitives'
import { useParallax } from '@/hooks/useParallax'

/**
 * PAGE LE GUIDE (À propos)
 * Ce n'est pas une page corporate : 4x4-raid n'est pas une agence,
 * c'est un homme. Toute la page est construite autour de ça.
 *
 * ⚠️ INCOHÉRENCE RELEVÉE dans les sources :
 *    « 45 ans d'expérience »  (page Guide)
 *    « 25 ans d'expérience au Maroc » (page Circuits + Contact)
 *    « 20 ans d'expérience »  (page Entreprises)
 *    « plus de 10 ans »       (meta-description Entreprises)
 *    → On retient les deux chiffres les plus récents et cohérents
 *      entre eux (45 ans de raids / 25 ans au Maroc), et on signale.
 */
export default function Guide() {
  const portrait = useParallax<HTMLDivElement>(50)

  useSeo({
    title: 'Jean-Luc Miolane — Le Renard du Désert | Guide raids 4x4 Maroc',
    description:
      "45 ans d'expérience des raids et du sable, installé au Maroc depuis plus de 25 ans. Jean-Luc Miolane trace et guide chaque raid 4x4 de 4x4-raid.",
    path: '/le-guide',
    image: media.guide.src,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jean-Luc Miolane',
      alternateName: 'Le Renard du Désert',
      jobTitle: 'Guide et organisateur de raids 4x4',
      worksFor: { '@type': 'TravelAgency', name: '4x4-raid', url: site.url },
      address: { '@type': 'PostalAddress', addressLocality: 'Marrakech', addressCountry: 'MA' },
    },
  })

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-line pb-section-sm pt-[calc(var(--header-h)+5rem)]">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow">Le guide</p>
            <h1 className="mt-8 text-display-lg">
              Jean-Luc
              <br />
              Miolane
            </h1>
            <p className="mt-6 font-display text-display-sm text-sand">« Le Renard du Désert »</p>
            <p className="mt-8 max-w-measure text-lead text-muted">
              Quarante-cinq ans d'expérience des raids et du sable. Installé au Maroc
              depuis plus de vingt-cinq ans — pas en visite&nbsp;: sur place, en permanence.
            </p>
          </div>

          <div ref={portrait}>
            <Figure media={media.guide} className="rounded-card" sizes="(max-width: 1024px) 100vw, 45vw" />
          </div>
        </div>
      </header>

      {/* ─── CHIFFRES ─────────────────────────────────────── */}
      <div className="border-b border-line bg-surface">
        <dl className="container grid grid-cols-2 divide-x divide-line md:grid-cols-4">
          <Chiffre value="45" unit="ans" label="D'expérience des raids et du sable" />
          <Chiffre value="25" unit="ans" label="Installé au Maroc, en permanence sur place" />
          <Chiffre value="14" unit="nuits" label="Format le plus long du répertoire" />
          <Chiffre value="36" unit="h" label="Délai de réponse à votre demande" />
        </dl>
        <div className="container pb-6">
          <Placeholder label="Chiffres à arbitrer — le site actuel annonce 45, 25, 20 et 10 ans selon les pages">
            Les durées d'expérience diffèrent d'une page à l'autre sur le site actuel.
            À unifier avant publication.
          </Placeholder>
        </div>
      </div>

      {/* ─── RÉCIT ────────────────────────────────────────── */}
      <Section>
        <div className="container grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-24">
          <Reveal>
            <p className="eyebrow lg:sticky lg:top-32">L'histoire</p>
          </Reveal>

          <div className="max-w-measure space-y-8 text-lead leading-relaxed">
            <Reveal delay={80}>
              <p>
                Le but n'a jamais changé&nbsp;: donner accès aux raids 4x4 à tous ceux qui
                rêvent de rouler sur les traces du Dakar, de traverser les Atlas, de
                connaître le désert de sable et d'en franchir les dunes. En sécurité,
                sans rien retirer à l'intensité.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="text-muted">
                Vivre sur place change tout. Cela veut dire la meilleure logistique, une
                équipe formée par ses soins, et surtout un répertoire d'étapes tenu à jour
                par des repérages permanents. Les pistes bougent&nbsp;; un catalogue imprimé
                il y a cinq ans ne le sait pas.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-muted">
                Jean-Luc est présent sur toutes les opérations. Pas un nom sur une brochure&nbsp;:
                la personne qui ouvre la piste devant vous, qui répare quand il faut réparer,
                et qui prépare les pique-niques dont les participants parlent encore
                des années plus tard.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p>
                Exigence, sécurité et bonne humeur. Dans cet ordre, et sans jamais en
                sacrifier une seule.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="pt-4">
                <Placeholder variant="block" label="Photo de Jean-Luc en action + éventuelle photo d'équipe">
                  Portrait et photos d'équipe supplémentaires à fournir pour renforcer
                  la dimension humaine de cette page.
                </Placeholder>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── PHILOSOPHIE ──────────────────────────────────── */}
      <Section tone="surface">
        <div className="container">
          <Reveal>
            <p className="eyebrow">La philosophie</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-8 max-w-[18ch] text-display-lg">
              Vous méritez mieux
              <br />
              <span className="text-muted">qu'un prix</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
            {philosophie.map((p, i) => (
              <Reveal key={p.index} delay={i * 80}>
                <div className="h-full bg-surface p-8 md:p-10">
                  <p className="font-display text-micro uppercase text-sand">{p.index}</p>
                  <h3 className="mt-5 text-display-sm">{p.title}</h3>
                  <p className="mt-5 leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── TÉMOIGNAGES ──────────────────────────────────── */}
      <Section id="temoignages">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Ce qu'ils en disent</p>
          </Reveal>

          <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {temoignages.map((t) => (
              <figure
                key={t.auteur}
                className="mb-6 break-inside-avoid rounded-card border border-line bg-surface p-7"
              >
                <blockquote className="leading-relaxed text-bone/90">{t.citation}</blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <p className="font-display text-sm">{t.auteur}</p>
                  <p className="mt-1 font-display text-micro uppercase text-muted">{t.contexte}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── INFOS PRATIQUES ──────────────────────────────── */}
      <Section id="pratique" tone="surface">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Infos pratiques</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-8 max-w-[20ch] text-display-md">
              Un pays froid où le soleil est chaud
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {infosPratiques.map((info, i) => (
              <Reveal key={info.titre} delay={(i % 3) * 60}>
                <div className="border-t border-line pt-5">
                  <h3 className="font-display text-micro uppercase tracking-[0.22em] text-sand">
                    {info.titre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{info.texte}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <Section>
        <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[18ch] text-display-md">
            Le meilleur moyen de comprendre, c'est de venir.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button to="/contact" size="lg">Créer mon aventure</Button>
            <Button to="/raids" variant="ghost" size="lg">Voir les raids</Button>
          </div>
        </div>
      </Section>
    </>
  )
}

function Chiffre({ value, unit, label }: { value: string; unit: string; label: string }) {
  return (
    <div className="px-2 py-10 first:pl-0 md:px-6">
      <p className="font-display text-display-md leading-none">
        {value}
        <span className="ml-1 text-sand">{unit}</span>
      </p>
      <p className="mt-4 max-w-[22ch] text-sm text-muted">{label}</p>
    </div>
  )
}
