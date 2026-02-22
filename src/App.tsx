import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const PokemonDetail = lazy(() => import("./pages/PokemonDetail"));

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
            >
                Skip to main content
            </a>
            <main id="main-content">
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/pokemon/:name" element={<PokemonDetail />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
    );
}
