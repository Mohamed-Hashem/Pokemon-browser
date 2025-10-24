import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { GridSkeleton } from "./components/SkeletonLoader";

const Home = lazy(() => import("./pages/Home/index"));
const PokemonDetail = lazy(() => import("./pages/PokemonDetail/index"));

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense
                fallback={
                    <div className="text-center p-6" role="status" aria-live="polite">
                        <GridSkeleton count={12} />
                        <span className="sr-only">Loading Pokémon...</span>
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokemon/:name" element={<PokemonDetail />} />
                </Routes>
            </Suspense>
        </div>
    );
}
