import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../api/usersApi.js'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const loadUsers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await getUsers(currentPage)
        const list = response?.data
        const meta = response?.meta

        if (isMounted) {
          setUsers(list)
          setLastPage(meta?.last_page)
          setTotalUsers(meta?.total)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Failed to load users.',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUsers()
    return () => {
      isMounted = false
    }
  }, [currentPage])

  const canGoPrev = currentPage > 1
  const canGoNext = currentPage < lastPage

  const pageNumbers = []
  for (let page = 1; page <= lastPage; page += 1) {
    pageNumbers.push(page)
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
          Users
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Select a user to view their achievements dashboard.
        </p>
      </div>

      {isLoading && (
        <section className="rounded-2xl bg-white p-6 text-slate-600 shadow-sm ring-1 ring-slate-200">
          Loading users...
        </section>
      )}

      {!isLoading && error && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </section>
      )}

      {!isLoading && !error && (
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {users.map((user, index) => {
                  return (
                    <tr key={user?.id}>
                      <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-700">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-800">{user?.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{user?.email}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          to={`/users/${user?.id}/achievements`}
                          className="inline-flex rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-500"
                        >
                          View achievements
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          {!users.length && (
            <p className="px-4 py-5 text-sm text-slate-600">
              No users found.
            </p>
          )}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Page {currentPage} of {lastPage} · Total users: {totalUsers}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={!canGoPrev}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    page === currentPage
                      ? 'bg-indigo-600 text-white'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, lastPage))
                }
                disabled={!canGoNext}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition enabled:hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default UsersPage
