import { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import PokemonListPagination from './Pages/PokemonListPagination'
import PokemonListLoadMore from './Pages/PokemonListLoadMore'
import PokemonDetail from './Pages/PokemonDetail'
import Spinner from './components/Spinner'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Pokémon Browser</h1>
          <nav className="flex gap-4 items-center">
            <Link to="/" className="text-sm text-gray-700 hover:text-blue-600">Pagination</Link>
            <Link to="/load-more" className="text-sm text-gray-700 hover:text-blue-600">Load More</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Suspense fallback={<div className="text-center p-6"><Spinner /></div>}>
          <Routes>
            <Route path="/" element={<PokemonListPagination />} />
            <Route path="/load-more" element={<PokemonListLoadMore />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
