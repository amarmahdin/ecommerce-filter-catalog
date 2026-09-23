import { useEffect, useState } from 'react'
import { CATEGORIES } from '../data/products'

/**
 * Filter drawer/modal.
 *
 * INTENTIONAL UI BUG (mobile only):
 * At ~390px width with viewport height <= 500px, the modal uses a fixed
 * short container height + overflow:hidden on the footer row. Category
 * checkboxes and dual price sliders overflow the body; the price-range
 * label overlaps the Reset control; Apply Filters is clipped at the
 * bottom edge. Desktop (>= md / 768px) uses a clean sidebar layout.
 */
export default function FilterModal({
  open,
  onClose,
  filters,
  onApply,
  onReset,
}) {
  const [draft, setDraft] = useState(filters)

  useEffect(() => {
    if (open) setDraft(filters)
  }, [open, filters])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const toggleCategory = (cat) => {
    setDraft((prev) => {
      const has = prev.categories.includes(cat)
      return {
        ...prev,
        categories: has
          ? prev.categories.filter((c) => c !== cat)
          : [...prev.categories, cat],
      }
    })
  }

  const setMinPrice = (value) => {
    const min = Number(value)
    setDraft((prev) => ({
      ...prev,
      minPrice: Math.min(min, prev.maxPrice),
    }))
  }

  const setMaxPrice = (value) => {
    const max = Number(value)
    setDraft((prev) => ({
      ...prev,
      maxPrice: Math.max(max, prev.minPrice),
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="filter-title">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Close filters"
        onClick={onClose}
      />

      {/*
        Panel:
        - Mobile: bottom sheet with FIXED height + overflow hidden (bug path)
        - Desktop (md+): right sidebar, full height, clean scroll
      */}
      <aside
        className={[
          'relative z-10 flex w-full flex-col bg-surface-raised shadow-2xl',
          // Mobile bug container: fixed short height, no scroll escape
          'mx-auto mt-auto h-[420px] max-h-[84vh] overflow-hidden rounded-t-2xl',
          // Desktop: clean full-height sidebar
          'md:ml-auto md:mt-0 md:h-full md:max-h-none md:w-[380px] md:overflow-visible md:rounded-none',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 md:px-5 md:py-4">
          <h2 id="filter-title" className="font-display text-2xl text-ink">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink-muted transition hover:bg-surface hover:text-ink"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/*
          Body: on short mobile viewports content overflows (no overflow-y-auto
          on the bug path). Desktop scrolls cleanly.
        */}
        <div
          className={[
            'flex min-h-0 flex-1 flex-col gap-5 px-4 py-4',
            // Mobile bug: content overflows, no scroll
            'overflow-visible',
            // Desktop: proper scroll
            'md:overflow-y-auto md:px-5',
          ].join(' ')}
        >
          {/* Categories */}
          <section>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
              Categories
            </h3>
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:grid-cols-1">
              {CATEGORIES.map((cat) => {
                const checked = draft.categories.includes(cat)
                return (
                  <li key={cat}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-1 py-1.5 transition hover:border-border hover:bg-surface">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat)}
                        className="h-4 w-4 rounded border-border text-accent accent-accent"
                      />
                      <span className="text-sm font-medium text-ink">{cat}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Price range — label positioned so it overlaps footer Reset on short mobile */}
          <section className="relative pb-2 md:pb-0">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
              Price range
            </h3>

            <div className="space-y-4">
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-ink-muted">
                  <span>Min</span>
                  <span className="font-semibold text-ink">${draft.minPrice}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={1}
                  value={draft.minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full"
                  aria-label="Minimum price"
                />
              </div>
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-ink-muted">
                  <span>Max</span>
                  <span className="font-semibold text-ink">${draft.maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={200}
                  step={1}
                  value={draft.maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full"
                  aria-label="Maximum price"
                />
              </div>
            </div>

            {/*
              BUG: absolutely positioned price summary that collides with the
              Reset button in the footer on 390×≤500 viewports. Hidden on md+.
            */}
            <p
              className="pointer-events-none absolute bottom-[-28px] left-0 z-20 text-sm font-semibold text-ink md:static md:bottom-auto md:mt-3 md:pointer-events-auto"
              data-testid="price-range-label"
            >
              Showing ${draft.minPrice} – ${draft.maxPrice}
            </p>
          </section>

          {/* Extra filler content to force overflow on short mobile heights */}
          <section className="space-y-2 md:hidden">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
              Availability
            </h3>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" className="accent-accent" defaultChecked />
              In stock only
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" className="accent-accent" />
              Free shipping
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" className="accent-accent" />
              On sale
            </label>
          </section>
        </div>

        {/*
          Footer BUG (mobile):
          - flex flex-row with fixed height
          - overflow: hidden clips Apply Filters below the fold
          - Reset sits where price text overlaps
          Desktop: normal, unclipped footer.
        */}
        <div
          className={[
            'shrink-0 border-t border-border bg-surface-raised px-4',
            // Mobile bug layout
            'flex h-12 flex-row items-center gap-2 overflow-hidden py-0',
            // Desktop clean layout
            'md:flex md:h-auto md:overflow-visible md:gap-3 md:px-5 md:py-4',
          ].join(' ')}
          data-testid="filter-footer"
        >
          <button
            type="button"
            onClick={() => {
              onReset()
              setDraft({ categories: [], minPrice: 0, maxPrice: 200 })
            }}
            className="relative z-10 shrink-0 rounded-lg border border-border bg-surface-raised px-3 py-2 text-sm font-semibold text-ink transition hover:bg-surface md:px-4"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(draft)
              onClose()
            }}
            className={[
              'rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover',
              // Mobile bug: push Apply downward so it clips under overflow:hidden
              'mt-10 min-w-[140px] flex-1 md:mt-0 md:flex-1',
            ].join(' ')}
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </div>
  )
}
