import { Suspense, lazy } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { GridSkeleton } from "./components/SkeletonLoader";

const PokemonListPagination = lazy(() => import("./pages/PokemonListPagination"));
const PokemonListLoadMore = lazy(() => import("./pages/PokemonListLoadMore"));
const PokemonDetail = lazy(() => import("./pages/PokemonDetail"));

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Skip to main content
            </a>

            <header className="bg-white shadow" role="banner">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Pokémon Browser</h1>
                    <nav
                        className="flex gap-4 items-center"
                        role="navigation"
                        aria-label="Main navigation"
                    >
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `text-sm ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"} hover:text-blue-600 focus:outline-none focus:underline transition-colors`
                            }
                            aria-label="View Pokémon with pagination"
                        >
                            Pagination
                        </NavLink>
                        <NavLink
                            to="/load-more"
                            className={({ isActive }) =>
                                `text-sm ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"} hover:text-blue-600 focus:outline-none focus:underline transition-colors`
                            }
                            aria-label="View Pokémon with load more"
                        >
                            Load More
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main id="main-content" className="max-w-6xl mx-auto px-4 py-6" role="main">
                <Suspense
                    fallback={
                        <div className="text-center p-6" role="status" aria-live="polite">
                            <GridSkeleton count={12} />
                            <span className="sr-only">Loading Pokémon...</span>
                        </div>
                    }
                >
                    <Routes>
                        <Route path="/" element={<PokemonListPagination />} />
                        <Route path="/load-more" element={<PokemonListLoadMore />} />
                        <Route path="/pokemon/:name" element={<PokemonDetail />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}
