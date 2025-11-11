import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/Home"));
const PokemonDetail = lazy(() => import("./pages/PokemonDetail"));

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pokemon/:name" element={<PokemonDetail />} />
                </Routes>
            </Suspense>
        </div>
    );
}
