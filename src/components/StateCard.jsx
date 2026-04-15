function StateCard({ tone = 'neutral', children }) {
  const toneClasses =
    tone === 'error'
      ? 'border border-red-200 bg-red-50 text-red-700'
      : 'bg-white text-slate-600 shadow-sm ring-1 ring-slate-200'

  return <section className={`rounded-2xl p-6 ${toneClasses}`}>{children}</section>
}

export default StateCard
