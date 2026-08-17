import { useSeo } from '@/lib/seo'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  useSeo({
    title: 'Page introuvable — 4x4-raid',
    description: "Cette page n'existe pas ou plus.",
    path: '/404',
  })

  return (
    <section className="flex min-h-[80svh] items-center">
      <div className="container">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="mt-8 max-w-[16ch] text-display-lg">
          Vous êtes sorti
          <br />
          <span className="text-muted">de la piste.</span>
        </h1>
        <p className="mt-8 max-w-measure text-lead text-muted">
          Ça arrive. Contrairement au désert, ici le demi-tour est simple.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Retour à l'accueil</Button>
          <Button to="/raids" variant="ghost">Voir les raids</Button>
        </div>
      </div>
    </section>
  )
}
