# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Pokémon Browser Application

A modern, responsive web application for browsing Pokémon data with two viewing modes: pagination and infinite scroll. Built with React, TypeScript, and TanStack Query.

## 🚀 Features

-   **Dual Viewing Modes**
    -   Pagination View: Browse Pokémon with traditional page navigation
    -   Load More View: Infinite scroll with "Load More" button
-   **Detailed Pokémon Information**: Click any Pokémon to view detailed stats
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
-   **Error Handling**: Graceful error boundaries and retry mechanisms
-   **Performance Optimized**: Suspense boundaries and efficient data fetching
-   **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

-   **React 18** - UI framework with Suspense support
-   **TypeScript** - Type safety and better developer experience
-   **Vite** - Fast build tool and development server
-   **TanStack Query (React Query)** - Powerful data synchronization
-   **React Router v6** - Client-side routing
-   **Tailwind CSS** - Utility-first CSS framework
-   **Axios** - HTTP client for API requests
-   **PokéAPI** - RESTful Pokémon API

## 📦 Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pokemon-browser
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── api/                    # API configuration and functions
│   ├── pokemon.ts         # Pokémon API endpoints
│   └── queryClient.ts     # React Query client configuration
├── components/            # Reusable UI components
│   ├── ErrorBoundary/     # Error boundary wrapper
│   ├── PaginationControls/# Pagination navigation
│   ├── PokemonCard/       # Individual Pokémon card
│   └── Spinner/           # Loading spinner
├── Pages/                 # Page components
│   ├── PokemonDetail/     # Detailed Pokémon view
│   ├── PokemonListLoadMore/# Infinite scroll view
│   └── PokemonListPagination/# Paginated list view
├── types/                 # TypeScript type definitions
├── App.tsx                # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles
```

## 🔧 Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### Pagination View

-   Display 12 Pokémon per page
-   Navigate using Previous/Next buttons
-   Current page indicator
-   Disabled state for navigation boundaries

### Load More View

-   Initial load of 12 Pokémon
-   "Load More" button to fetch additional Pokémon
-   Automatic detection of end of list
-   Loading state during fetch

### Pokémon Details

-   Display sprite image
-   Show basic stats (ID, height, weight)
-   List Pokémon types
-   Navigate back to list view

## 🐛 Error Fixes Applied

### 1. **Import Path Issues**

**Problem**: Components were using incorrect relative imports from the `Pages` folder.
**Solution**: Updated all imports to use proper relative paths:

-   Pages components: `../../api/pokemon` and `../../components/*`
-   Components: Correct relative paths based on folder structure

**Why it occurred**: The `Pages` folder is at the same level as `components` and `api`, so components inside `Pages` need to go up two levels (`../../`) to access sibling folders.

### 2. **React Query API Changes**

**Problem**: Using deprecated array-based syntax for `useQuery` and `useInfiniteQuery`.

```tsx
// Old (deprecated)
useQuery(["key"], () => fetchFn());

// New (correct)
useQuery({
    queryKey: ["key"],
    queryFn: () => fetchFn(),
});
```

**Solution**: Updated all query hooks to use object-based configuration.

**Why it occurred**: TanStack Query v5 changed the API from array-based to object-based for better TypeScript support, clearer parameter names, and improved maintainability.

### 3. **Missing `initialPageParam`**

**Problem**: `useInfiniteQuery` requires `initialPageParam` in v5.
**Solution**: Added `initialPageParam: 0` to the configuration.

**Why it occurred**: In TanStack Query v5, the initial page parameter must be explicitly defined to make the API more predictable and type-safe.

### 4. **Case Sensitivity in Imports**

**Problem**: Imports used `./pages/` but the folder is named `Pages/`.
**Solution**: Standardized to use `Pages` with capital P to match the actual folder name.

**Why it occurred**: Windows file systems are case-insensitive, so the code may work locally but fail on case-sensitive systems (Linux, macOS with case-sensitive file systems) or in build processes.

### 5. **Optional Chaining Issues**

**Problem**: Accessing properties without checking if parent objects exist.
**Solution**: Added optional chaining (`?.`) and nullish coalescing (`|| []`) operators:

```tsx
const all = data?.pages.flatMap((p) => p.results) || [];
const hasNext = Boolean(data?.next);
const sprite = data?.sprites?.front_default;
```

**Why it occurred**: During loading states or when Suspense boundaries are resolving, `data` may be undefined. React Query with Suspense mode should handle this, but defensive programming prevents runtime errors.

## 🔐 Error Handling

-   **Error Boundaries**: Catch and display React component errors
-   **Query Retries**: Automatic retry on failed API requests (configured to 1 retry)
-   **Loading States**: Suspense boundaries for smooth loading experience
-   **Graceful Degradation**: Show placeholder when images are unavailable

## 🎨 Styling

The application uses Tailwind CSS for styling with:

-   Responsive grid layouts
-   Hover effects and transitions
-   Consistent spacing and typography
-   Shadow and rounded corners for cards

## 📱 Responsive Design

-   **Mobile**: 2 columns grid
-   **Small Tablet**: 3 columns grid
-   **Medium Tablet**: 4 columns grid
-   **Desktop**: 6 columns grid

## 🚀 Performance Optimizations

-   **Code Splitting**: React.lazy and Suspense for route-based splitting
-   **Data Caching**: React Query caches API responses automatically
-   **Suspense Boundaries**: Prevent waterfall loading patterns
-   **Optimistic Updates**: Immediate UI feedback
-   **Retry Strategy**: Limited retries (1) to avoid excessive API calls

## 📝 React Query Configuration

```tsx
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true, // Enable Suspense mode
            retry: 1, // Retry failed requests once
            refetchOnWindowFocus: false, // Don't refetch on window focus
        },
    },
});
```

## 🌐 API Integration

The application uses the [PokéAPI](https://pokeapi.co/) which provides:

-   List of Pokémon with pagination
-   Detailed information for each Pokémon
-   Sprites and images
-   Type information
-   Stats and characteristics

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

-   [PokéAPI](https://pokeapi.co/) for providing the free Pokémon data
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
-   [TanStack Query](https://tanstack.com/query) for the excellent data fetching library
-   [Vite](https://vitejs.dev/) for the blazing fast build tool

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs["recommended-typescript"],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```
