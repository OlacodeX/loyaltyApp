import { Link, Route, Routes } from 'react-router-dom'
import AchievementsDashboard from './pages/AchievementsDashboard.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import UsersPage from './pages/UsersPage.jsx'
 
function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">
          Loyalty Customer Dashboard
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Open the users list and view achievements by UUID.
        </p>
        <Link
          to="/users"
          className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
        >
          Open Users Page
        </Link>
      </div>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<UsersPage />} />
      <Route
        path="/users/:user/achievements"
        element={<AchievementsDashboard />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
