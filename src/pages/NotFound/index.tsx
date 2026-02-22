import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <span className="text-8xl mb-4" role="img" aria-label="Confused Pokéball">
                ❓
            </span>
            <h1 className="text-5xl font-bold text-gray-800 mb-3">404</h1>
            <p className="text-xl text-gray-600 mb-8">
                Oops! This page doesn't exist.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Back to Pokédex
            </Link>
        </div>
    );
}
