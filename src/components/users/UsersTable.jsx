import { Link } from 'react-router-dom'

function UsersTable({
  users,
  purchaseModalUserId,
  purchaseAmountByUserId,
  purchaseLoadingByUserId,
  purchaseResultByUserId,
  onPurchaseAmountChange,
  onOpenPurchaseModal,
  onClosePurchaseModal,
  onConfirmPurchase,
}) {
  const selectedUser = users.find((user) => user?.id === purchaseModalUserId)
  const selectedUserId = selectedUser?.id
  const selectedAmount = selectedUserId ? purchaseAmountByUserId[selectedUserId] || '' : ''
  const selectedResult = selectedUserId
    ? purchaseResultByUserId[selectedUserId]
    : null
  const selectedLoading = selectedUserId
    ? Boolean(purchaseLoadingByUserId[selectedUserId])
    : false

  return (
    <div>
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
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {users.map((user, index) => {
              const userId = user?.id
              const isPurchaseLoading = Boolean(purchaseLoadingByUserId[userId])
              const purchaseResult = purchaseResultByUserId[userId]

              return (
                <tr key={userId}>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-800">{user?.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{user?.email}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenPurchaseModal(userId)}
                          disabled={isPurchaseLoading}
                          className="inline-flex rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isPurchaseLoading
                            ? 'Simulating...'
                            : 'Simulate Purchase'}
                        </button>
                        <Link
                          to={`/users/${userId}/achievements`}
                          className="inline-flex rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500"
                        >
                          View achievements
                        </Link>
                      </div>
                      {purchaseResult && (
                        <p
                          className={`text-xs ${
                            purchaseResult.type === 'success'
                              ? 'text-emerald-600'
                              : 'text-red-600'
                          }`}
                        >
                          {purchaseResult.message}
                        </p>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {selectedUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900">
              Simulate Purchase
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              User: {selectedUser?.name} ({selectedUserId})
            </p>
            <label className="mt-4 block text-sm font-medium text-slate-700">
              Amount
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={selectedAmount}
              onChange={(event) =>
                onPurchaseAmountChange(selectedUserId, event.target.value)
              }
              placeholder="Enter amount"
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800"
            />
            {selectedResult && (
              <p
                className={`mt-2 text-xs ${
                  selectedResult.type === 'success'
                    ? 'text-emerald-600'
                    : 'text-red-600'
                }`}
              >
                {selectedResult.message}
              </p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClosePurchaseModal}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={selectedLoading}
                onClick={async () => {
                  const success = await onConfirmPurchase(selectedUserId)
                  if (success) {
                    onClosePurchaseModal()
                  }
                }}
                className="rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {selectedLoading ? 'Simulating...' : 'Confirm Purchase'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UsersTable
