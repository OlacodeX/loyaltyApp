function PaginationControls({
  currentPage,
  lastPage,
  totalUsers,
  onPageChange,
}) {
  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < lastPage
  const pageNumbers = []

  for (let page = 1; page <= lastPage; page += 1) {
    pageNumbers.push(page)
  }

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-600">
        Page {currentPage} of {lastPage} · Total users: {totalUsers}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={!canGoPrev}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              page === currentPage
                ? 'bg-red-600 text-white'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
          disabled={!canGoNext}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PaginationControls
