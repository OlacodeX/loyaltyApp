import { Link, Route, Routes } from 'react-router-dom'
import AchievementsDashboard from './pages/AchievementsDashboard.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import UsersPage from './pages/UsersPage.jsx'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/users" element={<UsersPage />} />
      <Route
        path="/users/:userId/achievements"
        element={<AchievementsDashboard />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
