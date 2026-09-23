import { useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import FilterModal from './components/FilterModal'
import { products as allProducts } from './data/products'

const INITIAL_FILTERS = {
  categories: [],
  minPrice: 0,
  maxPrice: 200,
}

export default function App() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState(INITIAL_FILTERS)

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const inCategory =
        filters.categories.length === 0 || filters.categories.includes(p.category)
      const inPrice = p.price >= filters.minPrice && p.price <= filters.maxPrice
      return inCategory && inPrice
    })
  }, [filters])

  const activeFilterCount =
    filters.categories.length +
    (filters.minPrice > 0 || filters.maxPrice < 200 ? 1 : 0)

  return (
    <div className="min-h-screen">
      <Navbar
        onOpenFilter={() => setFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
              Shop the collection
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
              Curated goods across electronics, apparel, home, and outdoors —
              filter by category and price to find your next favorite.
            </p>
          </div>
          <p className="text-sm font-medium text-ink-muted">
            {filtered.length} of {allProducts.length} products
          </p>
        </div>

        <ProductGrid products={filtered} />
      </main>

      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onApply={setFilters}
        onReset={() => setFilters(INITIAL_FILTERS)}
      />
    </div>
  )
}
