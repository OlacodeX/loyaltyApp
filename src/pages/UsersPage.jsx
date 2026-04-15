import { useEffect } from 'react'
import PaginationControls from '../components/PaginationControls.jsx'
import StateCard from '../components/StateCard.jsx'
import UsersTable from '../components/users/UsersTable.jsx'
import { usersStore } from '../store.js'

function UsersPage() {
  const {
    data,
    currentPage,
    lastPage,
    totalUsers,
    isLoading,
    error,
    purchaseModalUserId,
    purchaseLoadingByUserId,
    purchaseAmountByUserId,
    purchaseResultByUserId,
    setCurrentPage,
    setPurchaseAmount,
    openPurchaseModal,
    closePurchaseModal,
    fetchUsers,
    simulatePurchaseForUser,
  } = usersStore()

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage, fetchUsers])

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
        <StateCard>
          Loading users...
        </StateCard>
      )}

      {!isLoading && error && (
        <StateCard tone="error">
          {error}
        </StateCard>
      )}

      {!isLoading && !error && (
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <UsersTable
            users={data}
            purchaseModalUserId={purchaseModalUserId}
            purchaseAmountByUserId={purchaseAmountByUserId}
            purchaseLoadingByUserId={purchaseLoadingByUserId}
            purchaseResultByUserId={purchaseResultByUserId}
            onPurchaseAmountChange={setPurchaseAmount}
            onOpenPurchaseModal={openPurchaseModal}
            onClosePurchaseModal={closePurchaseModal}
            onConfirmPurchase={simulatePurchaseForUser}
          />
          {!data.length && (
            <p className="px-4 py-5 text-sm text-slate-600">
              No users found.
            </p>
          )}
          <PaginationControls
            currentPage={currentPage}
            lastPage={lastPage}
            totalUsers={totalUsers}
            onPageChange={setCurrentPage}
          />
        </section>
      )}
    </main>
  )
}

export default UsersPage
