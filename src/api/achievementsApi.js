const getApiBaseUrl = () => {
  const base = import.meta.env.VITE_API_BASE_URL
  if (!base) {
    throw new Error('Missing VITE_API_BASE_URL in environment configuration.')
  }
  return base.replace(/\/+$/, '')
} 

export const getUserAchievements = async (userId) => {
  const response = await fetch(
    `${getApiBaseUrl()}/users/${userId}/achievements`,
  )

  if (!response.ok) {
    throw new Error(`Unable to fetch achievements for ${userId}.`)
  }

  return response.json()
}
