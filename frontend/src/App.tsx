import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Properties from './pages/Properties'
import Login from './pages/Login'
import Contact from './pages/Contact'
import Favorites from './pages/Favorites'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Layout>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
