import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSeo } from '@/lib/seo'
import { site } from '@/data/site'
import { raids } from '@/data/raids'
import { media } from '@/data/medias'
import { Button } from '@/components/ui/Button'
import { Placeholder, Reveal, Section } from '@/components/ui/Primitives'
import { cn } from '@/lib/utils'

/**
 * PAGE CONTACT / DEMANDE
 *
 * Parti pris : PAS de tunnel de réservation avec paiement.
 * Le site actuel n'en a pas, et le modèle de 4x4-raid est le devis
 * sur mesure — imposer un panier casserait l'offre.
 * On construit donc le parcours le plus court possible vers une
 * demande qualifiée : 3 étapes, 8 champs, aucune case superflue.
 *
 * ⚠️ Le formulaire n'est PAS branché. Voir README § « Formulaire ».
 */

type Etape = 0 | 1 | 2

const objets = [
  { id: 'raid', label: 'Un raid du répertoire', desc: "Vous avez repéré un itinéraire" },
  { id: 'sur-mesure', label: 'Un raid sur mesure', desc: 'Vous voulez tracer le vôtre' },
  { id: 'entreprise', label: 'Une opération entreprise', desc: 'Incentive, team-building' },
  { id: 'info', label: 'Une simple question', desc: 'Avant de vous décider' },
] as const

const niveaux = ['Jamais fait de tout-terrain', 'Quelques sorties', 'Pilote confirmé'] as const

export default function Contact() {
  const [params] = useSearchParams()
  const [etape, setEtape] = useState<Etape>(0)
  const [objet, setObjet] = useState<string>(params.get('objet') ?? '')
  const [raid, setRaid] = useState<string>(params.get('raid') ?? '')
  const [envoye, setEnvoye] = useState(false)

  useSeo({
    title: 'Contact — Créer votre raid 4x4 au Maroc | 4x4-raid',
    description:
      "Décrivez votre projet de raid 4x4 au Maroc. Réponse sous 36 heures par Jean-Luc Miolane. Marrakech, Agadir, Ouarzazate.",
    path: '/contact',
    image: media.surMesure.src,
  })

  const suivant = () => setEtape((e) => Math.min(2, e + 1) as Etape)
  const precedent = () => setEtape((e) => Math.max(0, e - 1) as Etape)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ⚠️ À BRANCHER : endpoint (Formspree, Resend, Supabase Edge Function…).
    setEnvoye(true)
  }

  return (
    <>
      <header className="border-b border-line pb-14 pt-[calc(var(--header-h)+5rem)]">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-8 max-w-[14ch] text-display-lg">
            Dites-nous
            <br />
            <span className="text-muted">où vous voulez aller</span>
          </h1>
          <p className="mt-8 max-w-measure text-lead text-muted">
            Trois étapes, deux minutes. Jean-Luc revient vers vous sous {site.responseTime}
            &nbsp;— avec un tracé, pas un catalogue.
          </p>
        </div>
      </header>

      <Section className="!pt-14">
        <div className="container grid gap-16 lg:grid-cols-[1.35fr_0.65fr] lg:gap-24">
          {/* ─── FORMULAIRE ────────────────────────────────── */}
          <div>
            {envoye ? (
              <div className="rounded-card border border-sand/40 bg-sand/[0.05] p-10 text-center">
                <p className="font-display text-display-sm text-sand">Demande enregistrée</p>
                <p className="mx-auto mt-5 max-w-measure text-muted">
                  Jean-Luc revient vers vous sous {site.responseTime}. En attendant, si
                  c'est urgent&nbsp;: {site.contact.phoneDisplay}.
                </p>
                <div className="mt-8">
                  <Placeholder variant="block" label="Endpoint d'envoi du formulaire">
                    Aucun message n'a réellement été envoyé — le formulaire doit être
                    branché à un service d'envoi. Voir README § Formulaire.
                  </Placeholder>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {/* Progression */}
                <ol className="flex gap-2" aria-label="Progression du formulaire">
                  {['Votre projet', 'Le cadre', 'Vous'].map((label, i) => (
                    <li key={label} className="flex-1">
                      <div className={cn('h-px w-full transition-colors duration-base', i <= etape ? 'bg-sand' : 'bg-line')} />
                      <p className={cn('mt-3 font-display text-micro uppercase transition-colors', i <= etape ? 'text-bone' : 'text-muted')}>
                        {String(i + 1).padStart(2, '0')} — {label}
                      </p>
                    </li>
                  ))}
                </ol>

                <div className="mt-12">
                  {/* ─── Étape 1 ─────────────────────────── */}
                  {etape === 0 && (
                    <fieldset>
                      <legend className="text-display-sm">Qu'est-ce qui vous amène&nbsp;?</legend>
                      <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {objets.map((o) => (
                          <label
                            key={o.id}
                            className={cn(
                              'cursor-pointer rounded-card border p-6 transition-colors duration-fast',
                              objet === o.id ? 'border-sand bg-sand/[0.06]' : 'border-line hover:border-line-strong',
                            )}
                          >
                            <input
                              type="radio"
                              name="objet"
                              value={o.id}
                              checked={objet === o.id}
                              onChange={(e) => setObjet(e.target.value)}
                              className="sr-only"
                            />
                            <span className={cn('block font-display text-lg', objet === o.id && 'text-sand')}>
                              {o.label}
                            </span>
                            <span className="mt-1.5 block text-sm text-muted">{o.desc}</span>
                          </label>
                        ))}
                      </div>

                      {objet === 'raid' && (
                        <div className="mt-8">
                          <Field label="Lequel">
                            <select
                              value={raid}
                              onChange={(e) => setRaid(e.target.value)}
                              className={inputCls}
                            >
                              <option value="">Choisir un raid</option>
                              {raids.map((r) => (
                                <option key={r.slug} value={r.slug}>{r.nom} — {r.duree}</option>
                              ))}
                            </select>
                          </Field>
                        </div>
                      )}

                      <div className="mt-10 flex justify-end">
                        <Button onClick={suivant} disabled={!objet}>Continuer</Button>
                      </div>
                    </fieldset>
                  )}

                  {/* ─── Étape 2 ─────────────────────────── */}
                  {etape === 1 && (
                    <fieldset>
                      <legend className="text-display-sm">Le cadre</legend>
                      <p className="mt-3 text-sm text-muted">
                        Approximatif suffit. Tout est ajustable ensuite.
                      </p>

                      <div className="mt-8 grid gap-7 sm:grid-cols-2">
                        <Field label="Période souhaitée" hint="Mois ou dates précises">
                          <input type="text" name="periode" placeholder="Ex. mars 2027" className={inputCls} />
                        </Field>
                        <Field label="Nombre de participants">
                          <input type="number" name="participants" min={1} placeholder="2" className={inputCls} />
                        </Field>
                        <Field label="Durée envisagée">
                          <input type="text" name="duree" placeholder="Ex. 7 jours" className={inputCls} />
                        </Field>
                        <Field label="Votre véhicule" hint="Si vous venez avec le vôtre">
                          <select name="vehicule" className={inputCls}>
                            <option value="">Je n'en ai pas — à prévoir</option>
                            <option value="4x4">4x4 personnel</option>
                            <option value="moto">Moto</option>
                            <option value="ssv">SSV</option>
                            <option value="buggy">Buggy</option>
                          </select>
                        </Field>
                      </div>

                      <div className="mt-7">
                        <Field label="Niveau en tout-terrain" hint="Aucun niveau n'est requis">
                          <div className="flex flex-wrap gap-2">
                            {niveaux.map((n) => (
                              <label key={n} className="cursor-pointer">
                                <input type="radio" name="niveau" value={n} className="peer sr-only" />
                                <span className="inline-block rounded-pill border border-line px-4 py-2 font-display text-micro uppercase text-muted transition-colors peer-checked:border-sand peer-checked:bg-sand peer-checked:text-ink hover:border-line-strong">
                                  {n}
                                </span>
                              </label>
                            ))}
                          </div>
                        </Field>
                      </div>

                      <div className="mt-10 flex justify-between">
                        <Button onClick={precedent} variant="line">Retour</Button>
                        <Button onClick={suivant}>Continuer</Button>
                      </div>
                    </fieldset>
                  )}

                  {/* ─── Étape 3 ─────────────────────────── */}
                  {etape === 2 && (
                    <fieldset>
                      <legend className="text-display-sm">Vous</legend>

                      <div className="mt-8 grid gap-7 sm:grid-cols-2">
                        <Field label="Nom et prénom" required>
                          <input type="text" name="nom" required autoComplete="name" className={inputCls} />
                        </Field>
                        <Field label="E-mail" required>
                          <input type="email" name="email" required autoComplete="email" className={inputCls} />
                        </Field>
                        <Field label="Téléphone" hint="Pour les échanges rapides">
                          <input type="tel" name="telephone" autoComplete="tel" className={inputCls} />
                        </Field>
                        <Field label="Pays">
                          <input type="text" name="pays" autoComplete="country-name" className={inputCls} />
                        </Field>
                      </div>

                      <div className="mt-7">
                        <Field label="Ce que vous cherchez à vivre" hint="C'est la partie la plus utile">
                          <textarea
                            name="message"
                            rows={5}
                            placeholder="Les dunes, l'Atlas, les pistes du Dakar, un bivouac…"
                            className={cn(inputCls, 'resize-y')}
                          />
                        </Field>
                      </div>

                      <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm text-muted">
                        <input type="checkbox" required className="mt-1 h-4 w-4 accent-[rgb(var(--sand))]" />
                        <span>
                          J'accepte que mes données soient utilisées pour traiter ma demande.
                          {/* ⚠️ À FOURNIR : lien vers la politique de confidentialité. */}
                        </span>
                      </label>

                      <div className="mt-10 flex items-center justify-between">
                        <Button onClick={precedent} variant="line">Retour</Button>
                        <Button type="submit" size="lg">Envoyer ma demande</Button>
                      </div>
                    </fieldset>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* ─── COLONNE RÉASSURANCE ───────────────────────── */}
          <aside className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <div className="rounded-card border border-line bg-surface p-8">
                <p className="font-display text-micro uppercase text-sand">Réponse sous {site.responseTime}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  L'équipe est disponible tous les jours. Vous recevez un tracé et un devis,
                  pas une brochure automatique.
                </p>

                <div className="mt-8 space-y-5 border-t border-line pt-6">
                  <div>
                    <p className="font-display text-micro uppercase text-muted">Téléphone</p>
                    <a href={`tel:${site.contact.phoneHref}`} className="link-underline mt-1.5 block text-bone">
                      {site.contact.phoneDisplay}
                    </a>
                  </div>
                  <div>
                    <p className="font-display text-micro uppercase text-muted">E-mail</p>
                    <a href={`mailto:${site.contact.email}`} className="link-underline mt-1.5 block text-bone">
                      {site.contact.email}
                    </a>
                  </div>
                  <div>
                    <p className="font-display text-micro uppercase text-muted">Sur place</p>
                    <address className="mt-1.5 text-sm not-italic leading-relaxed text-bone/85">
                      {site.address.line2}
                      <br />
                      {site.address.line3}
                      <br />
                      {site.address.line4}
                    </address>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-6">
                <Placeholder variant="block" label="Éléments de réassurance à fournir">
                  Conditions d'annulation, acompte, assurances, immatriculation d'agence&nbsp;:
                  ces informations rassurent au moment décisif. Leur absence coûte des
                  conversions.
                </Placeholder>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  )
}

const inputCls =
  'w-full rounded border border-line bg-transparent px-4 py-3 text-bone placeholder:text-muted/60 ' +
  'transition-colors duration-fast focus:border-sand focus:outline-none'

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="font-display text-micro uppercase text-muted">
        {label}
        {required && <span className="ml-1 text-sand">*</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-muted/70">{hint}</span>}
      <div className="mt-2.5">{children}</div>
    </label>
  )
}
