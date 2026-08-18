import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'

const seo = {
  path: '/404/',
  title: 'Page introuvable - 4x4-raid.com',
  description:
    "Cette page n'existe pas ou plus. Revenez à l'accueil ou explorez nos raids 4×4 au Maroc.",
}

export default function NotFound() {
  return (
    <>
      <Seo seo={seo} />
      <section className="flex min-h-[72svh] items-center">
        <div className="container">
          <p className="eyebrow">Erreur 404</p>
          <h1 className="mt-8 max-w-[16ch] text-display-lg">Vous êtes sorti de la piste.</h1>
          <p className="mt-8 max-w-measure text-lead text-muted">
            Cette page n'existe pas ou plus. Contrairement au désert, ici le demi-tour
            est simple.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex h-14 items-center rounded-pill bg-sand px-9 font-display text-eyebrow uppercase text-ink transition-colors duration-200 hover:bg-bone"
            >
              Retour à l'accueil
            </Link>
            <Link
              to="/circuits-raid-4x4-au-maroc/"
              className="inline-flex h-14 items-center rounded-pill border border-line-strong px-9 font-display text-eyebrow uppercase transition-colors duration-200 hover:border-sand hover:text-sand"
            >
              Voir les raids
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
