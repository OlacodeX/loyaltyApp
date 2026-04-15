const getApiBaseUrl = () => {
  const base = import.meta.env.VITE_API_BASE_URL
  if (!base) {
    throw new Error('Missing VITE_API_BASE_URL in environment configuration.')
  }
  return base.replace(/\/+$/, '')
}

export const getUsers = async (page = 1) => {
  const params = new URLSearchParams({ page: String(page) })
  const response = await fetch(`${getApiBaseUrl()}/users?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Unable to fetch users list.')
  }

  return response.json()
}
