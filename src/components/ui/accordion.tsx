import { useState, useId } from 'react'
import { cn } from '@/lib/utils'

type Item = { q: string; r: React.ReactNode }

/**
 * Accordéon accessible : un seul panneau ouvert, aria-expanded/controls,
 * navigation clavier native (les en-têtes sont de vrais <button>).
 * Transition sur grid-template-rows — pas de mesure de hauteur en JS.
 */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i
        const panelId = `${baseId}-panel-${i}`
        const btnId = `${baseId}-btn-${i}`
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-8 py-6 text-left transition-colors duration-fast hover:text-sand md:py-8"
              >
                <span className="font-display text-display-sm">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    'mt-1 shrink-0 text-2xl font-light leading-none transition-transform duration-base ease-raid',
                    isOpen ? 'rotate-45 text-sand' : 'text-muted group-hover:text-sand',
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows] duration-base ease-raid',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <div className="max-w-measure pb-8 text-muted">{item.r}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
