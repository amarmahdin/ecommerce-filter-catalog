function StarRating({ rating }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.3

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && hasHalf)
        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-3.5 w-3.5 ${filled ? 'text-star' : 'text-border'}`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.836.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.3-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
              clipRule="evenodd"
            />
          </svg>
        )
      })}
      <span className="ml-1 text-xs font-medium text-ink-muted">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-display text-3xl text-ink">No products match</p>
        <p className="mt-2 max-w-sm text-sm text-ink-muted">
          Try adjusting your filters to see more items in the catalog.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="group overflow-hidden rounded-2xl border border-border bg-surface-raised transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_rgb(15_20_25/0.25)]"
        >
          <div className="relative aspect-square overflow-hidden bg-border/40">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/400x400/e4dfd8/5c6670?text=${encodeURIComponent(product.category)}`
              }}
            />
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {product.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-surface-raised/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
              {product.category}
            </p>
            <h2 className="line-clamp-2 text-base font-semibold leading-snug text-ink">
              {product.title}
            </h2>
            <StarRating rating={product.rating} />
            <div className="mt-1 flex items-end justify-between">
              <p className="text-lg font-bold tracking-tight text-ink">
                ${product.price.toFixed(2)}
              </p>
              <span className="text-xs text-ink-muted">{product.reviews} reviews</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
