import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'New Arrivals', href: '#' },
  { label: 'Electronics', href: '#' },
  { label: 'Clothing', href: '#' },
  { label: 'Footwear', href: '#' },
  { label: 'Home & Living', href: '#' },
  { label: 'Sports & Outdoors', href: '#' },
  { label: 'Beauty & Personal Care', href: '#' },
  { label: 'Flash Sale', href: '#' },
  { label: 'Best Sellers', href: '#' },
  { label: 'Gift Cards', href: '#' },
  { label: 'Order History', href: '#' },
  { label: 'Track Package', href: '#' },
  { label: 'Help Center', href: '#' },
  { label: 'Store Locator', href: '#' },
]

const DESKTOP_LINKS = [
  'Home',
  'New Arrivals',
  'Electronics',
  'Flash Sale',
  'Help',
]

/**
 * INTENTIONAL UI BUG (mobile only, ~390px × ≤650px):
 * Drawer uses `fixed inset-0 … flex flex-col overflow-hidden`.
 * The long middle nav list has no `overflow-y-auto`, so the bottom
 * "User Profile" / "Sign In / Register" section is clipped below the
 * viewport and cannot be scrolled into view. Desktop (≥768px) keeps a
 * clean horizontal bar with no drawer.
 */
export default function Navbar({ onOpenFilter, activeFilterCount, cartCount = 3 }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [drawerOpen])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/80 bg-surface-raised/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
              NovaMart
            </span>
            <span className="hidden text-xs font-medium uppercase tracking-[0.14em] text-ink-muted md:inline">
              Catalog
            </span>
          </div>

          {/* Desktop horizontal nav — clean, no drawer */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {DESKTOP_LINKS.map((label) => (
              <a
                key={label}
                href="#"
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition hover:bg-surface hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Cart indicator */}
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink transition hover:bg-surface"
              aria-label={`Cart, ${cartCount} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M1 1.75A.75.75 0 0 1 1.75 1h1.628a1.75 1.75 0 0 1 1.734 1.51L5.18 3h11.07a.75.75 0 0 1 .743.86l-1.285 8.25A2.25 2.25 0 0 1 13.48 14H6.52a2.25 2.25 0 0 1-2.228-1.89L3.078 3.5H1.75A.75.75 0 0 1 1 2.75Zm5.52 10.75a.75.75 0 0 0 .743.64h6.96a.75.75 0 0 0 .743-.634l1.08-6.906H5.22l1.3 6.9ZM7.25 17a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Zm7.5 0a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-warm px-1 text-[10px] font-bold leading-none text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Filter (kept from catalog) */}
            <button
              type="button"
              onClick={onOpenFilter}
              className="relative inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Open filters"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 0 1 .628.74v2.288a2.25 2.25 0 0 1-.659 1.59l-4.682 4.683a2.25 2.25 0 0 0-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 0 1 8 18.25v-5.757a2.25 2.25 0 0 0-.659-1.591L2.659 6.22A2.25 2.25 0 0 1 2 4.629V2.34a.75.75 0 0 1 .628-.74Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="hidden sm:inline">Filter</span>
              {activeFilterCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-warm px-1 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink transition hover:bg-surface md:hidden"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer — md:hidden so desktop never shows it */}
      {drawerOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white md:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          data-testid="mobile-nav-drawer"
        >
          {/* Drawer header */}
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <h2
              id="mobile-nav-title"
              className="font-display text-2xl tracking-tight text-ink"
            >
              NovaMart
            </h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted transition hover:bg-surface hover:text-ink"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>

          {/*
            Middle link list — intentionally NO overflow-y-auto and no flex
            shrink. Natural height of the long list pushes bottom actions
            past the fold; parent overflow-hidden clips them (390×≤650).
          */}
          <nav
            className="flex shrink-0 flex-col overflow-hidden px-2 py-3"
            aria-label="Mobile"
          >
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">
              Shop
            </p>
            <ul className="flex flex-col gap-0.5">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-ink transition hover:bg-surface"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {item.label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 text-ink-muted"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/*
            Bottom actions — pushed past the fold / clipped by overflow-hidden
            on short mobile viewports; users cannot scroll to reach Sign In.
          */}
          <div
            className="shrink-0 space-y-3 border-t border-border bg-surface px-4 py-4"
            data-testid="mobile-nav-actions"
          >
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-surface-raised"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                </svg>
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">
                  User Profile
                </span>
                <span className="block text-xs text-ink-muted">
                  Account, orders & wishlist
                </span>
              </span>
            </button>

            <button
              type="button"
              className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      )}
    </>
  )
}
