import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import StateCard from '../components/StateCard.jsx'
import { useAchievementsStore } from '../store.js'

const ProgressBar = ({ value, maxValue }) => {
  const safeMax = Math.max(maxValue, 0)
  const safeValue = Math.min(Math.max(value, 0), safeMax || 1)
  const percent = safeMax === 0 ? 100 : Math.round((safeValue / safeMax) * 100)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span>Progress to next badge</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-red-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const getProgressPercent = (data) => {
  const remaining = Number(data?.remaining_to_unlock_next_badge ?? 0)
  const nextBadgeAmount = Number(data?.next_badge_amount ?? 0)

  if (Number.isFinite(nextBadgeAmount) && nextBadgeAmount > 0) {
    const progressValue = nextBadgeAmount - Math.max(remaining, 0)
    return clamp(
      Math.round((progressValue / nextBadgeAmount) * 100),
      0,
      100,
    )
  }

  return remaining <= 0 ? 100 : 0
}

function AchievementsDashboard() {
  const { userId } = useParams()
  const { data, isLoading, error, fetchAchievements } = useAchievementsStore()
  const unlockedAchievements = data?.unlocked_achievements || []
  const nextAvailableAchievements = data?.next_available_achievements || []

  useEffect(() => {
    if (userId) {
      fetchAchievements(userId)
    }
  }, [fetchAchievements, userId])

  const remaining = data?.remaining_to_unlock_next_badge || 0
  const progressPercent = getProgressPercent(data)

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">User</p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            {userId}
          </h1>
        </div>
        <Link
          to="/users"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back
        </Link>
      </div>

      {isLoading && (
        <StateCard>
          Loading achievements...
        </StateCard>
      )}

      {!isLoading && error && (
        <StateCard tone="error">
          {error}
        </StateCard>
      )}

      {!isLoading && !error && (
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900">
              Unlocked Achievements
            </h2>
            {unlockedAchievements.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">
                No achievements unlocked yet.
              </p>
            ) : (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {unlockedAchievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Badge Status</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Current badge</dt>
                <dd className="font-medium text-slate-900">
                  {data.current_badge || 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Next badge</dt>
                <dd className="font-medium text-slate-900">
                  {data.next_badge || 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Remaining to unlock next badge</dt>
                <dd className="font-medium text-slate-900">{remaining}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <ProgressBar value={progressPercent} maxValue={100} />
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Next Available Achievements
            </h2>
            {nextAvailableAchievements.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">
                No upcoming achievements available right now.
              </p>
            ) : (
              <ul className="mt-4 flex flex-wrap gap-2">
                {nextAvailableAchievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700"
                  >
                    {achievement}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}
    </main>
  )
}

export default AchievementsDashboard
