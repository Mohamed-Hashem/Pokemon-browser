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
│   ├── SkeletonLoader/    # Loading skeleton components
│   └── Spinner/           # Loading spinner
├── constants/             # Application constants
│   └── index.ts          # Centralized constants (API, cache, pagination)
├── pages/                 # Page components
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
-   `npm run type-check` - Type check without emitting files

### Additional Scripts (Can be added)

```json
{
    "scripts": {
        "test": "vitest",
        "test:ui": "vitest --ui",
        "test:coverage": "vitest --coverage",
        "analyze": "vite build --mode analyze"
    }
}
```

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

**Problem**: Folder names had inconsistent casing.
**Solution**: Standardized all folder names to lowercase (`pages`, `constants`) for consistency and to avoid case-sensitivity issues across different operating systems.

**Why it occurred**: Windows file systems are case-insensitive, so the code may work locally but fail on case-sensitive systems (Linux, macOS with case-sensitive file systems) or in build processes. Using lowercase for folders is a common convention.

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

## ⚙️ Constants Configuration

All application constants are centralized in `src/constants/index.ts` for easy maintenance and consistency:

### API Configuration

```typescript
API_BASE_URL: "https://pokeapi.co/api/v2"; // PokéAPI base URL
API_TIMEOUT: 10000; // 10 second timeout
```

### Pagination Constants

```typescript
PAGE_SIZE: 20; // Items per page
MIN_LIMIT: 1; // Minimum items per request
MAX_LIMIT: 100; // Maximum items per request
```

### Cache Time Constants

```typescript
CACHE_TIME: {
  STALE_TIME: 1000 * 60 * 5,               // 5 minutes stale time
  GC_TIME: 1000 * 60 * 10,                 // 10 minutes garbage collection
  POKEMON_DETAIL_STALE_TIME: 1000 * 60 * 30 // 30 minutes for details
}
```

### Query Configuration

```typescript
QUERY_CONFIG: {
  RETRY: 1,                                // Retry failed requests once
  REFETCH_ON_WINDOW_FOCUS: false,          // Don't refetch on focus
  REFETCH_ON_RECONNECT: "always",          // Refetch on reconnect
  REFETCH_INTERVAL: false                  // No auto-refetch interval
}
```

**Benefits of Centralized Constants:**

-   Single source of truth for configuration values
-   Easy to update across the entire application
-   Prevents magic numbers in code
-   Improves maintainability and testability
-   TypeScript type safety for all constants

## 📱 Responsive Design

-   **Mobile**: 2 columns grid
-   **Small Tablet**: 3 columns grid
-   **Medium Tablet**: 4 columns grid
-   **Desktop**: 6 columns grid

### Responsive Breakpoints

```tsx
// Tailwind CSS breakpoints
sm: '640px'   // Small tablets
md: '768px'   // Tablets
lg: '1024px'  // Desktops
xl: '1280px'  // Large desktops

// Grid classes
grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
```

## 🎯 Best Practices Implemented

### ✅ Performance

-   [x] Lazy loading routes
-   [x] Component memoization
-   [x] Image lazy loading
-   [x] Optimized cache strategy
-   [x] Request timeout protection
-   [x] Skeleton loaders instead of spinners

### ✅ Accessibility

-   [x] Semantic HTML elements
-   [x] ARIA labels and roles
-   [x] Keyboard navigation
-   [x] Focus indicators
-   [x] Screen reader support
-   [x] Skip links
-   [x] Alt text for images

### ✅ Security

-   [x] Input validation
-   [x] Request timeouts
-   [x] Error handling
-   [x] Safe error messages
-   [x] HTTPS only
-   [x] Sanitized inputs

### ✅ Code Quality

-   [x] TypeScript for type safety
-   [x] Component modularity
-   [x] Shared components (DRY)
-   [x] Consistent code style
-   [x] Error boundaries
-   [x] Loading states

## 🚀 Performance Optimizations

-   **Code Splitting**: React.lazy and Suspense for route-based splitting
-   **Data Caching**: React Query caches API responses automatically
-   **Suspense Boundaries**: Prevent waterfall loading patterns
-   **Optimistic Updates**: Immediate UI feedback
-   **Retry Strategy**: Limited retries (2) to avoid excessive API calls
-   **Component Memoization**: React.memo to prevent unnecessary re-renders
-   **Image Lazy Loading**: Native lazy loading for images
-   **Stale-While-Revalidate**: 5-minute stale time, 10-minute cache time
-   **Request Timeout**: 10-second timeout to prevent hanging requests

### Performance Configuration

```tsx
// Query Client Settings
{
  staleTime: 1000 * 60 * 5,     // 5 minutes
  gcTime: 1000 * 60 * 10,        // 10 minutes
  retry: 2,                       // Retry failed requests twice
  refetchOnWindowFocus: false,    // Don't refetch on window focus
}

// Component Memoization
const PokemonCardInner = memo(({ name }) => { ... })
```

## 🔐 Security Improvements

-   **Input Validation**: Sanitize and validate all user inputs
-   **Request Timeout**: Prevent hanging requests with 10s timeout
-   **Error Sanitization**: Safe error messages without exposing internals
-   **XSS Prevention**: Proper escaping and sanitization
-   **Rate Limiting**: Client-side request throttling
-   **HTTPS Only**: All API calls use secure HTTPS protocol

### Security Measures

```tsx
// Input Sanitization
const sanitizedName = encodeURIComponent(name.toLowerCase().trim());

// Timeout Protection
timeout: 10000; // 10 second timeout

// Error Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Safe error messages
        throw new Error("Something went wrong. Please try again.");
    }
);
```

## ♿ Accessibility Features

-   **Semantic HTML**: Proper use of `<nav>`, `<main>`, `<article>`, `<header>` elements
-   **ARIA Labels**: Comprehensive aria-label attributes
-   **Keyboard Navigation**: Full keyboard support with visible focus states
-   **Skip Links**: "Skip to main content" for screen reader users
-   **Screen Reader Support**: aria-live regions for dynamic content
-   **Focus Management**: Proper focus indicators and outlines
-   **Alt Text**: Descriptive alt text for all images
-   **Color Contrast**: WCAG AA compliant color combinations
-   **Semantic Lists**: Using `<dl>`, `<dt>`, `<dd>` for data

### Accessibility Implementation

```tsx
// Skip Link
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// ARIA Labels
<button aria-label="Go to next page" aria-disabled={!hasNext}>
  Next
</button>

// Live Regions
<span aria-live="polite" aria-current="page">
  Page {page}
</span>

// Focus Indicators
className="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

## 📝 React Query Configuration

```tsx
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2, // Retry failed requests twice
            refetchOnWindowFocus: false, // Don't refetch on window focus
            staleTime: 1000 * 60 * 5, // 5 minutes stale time
            gcTime: 1000 * 60 * 10, // 10 minutes garbage collection
            refetchOnReconnect: "always", // Refetch on reconnect
            refetchInterval: false, // No automatic polling
        },
    },
});
```

### Query Configuration Benefits

-   **Reduced Network Calls**: 5-minute stale time prevents unnecessary fetches
-   **Better UX**: Data stays cached for 10 minutes
-   **Auto-Retry**: Automatic retry on transient failures
-   **Reconnect Handling**: Auto-refetch on network reconnection

## 🌐 API Integration

The application uses the [PokéAPI](https://pokeapi.co/) which provides:

-   List of Pokémon with pagination
-   Detailed information for each Pokémon
-   Sprites and images
-   Type information
-   Stats and characteristics

### API Security & Error Handling

```tsx
// Timeout Protection
const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 10000, // 10 second timeout
});

// Error Interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 404) {
            throw new Error("Pokémon not found");
        }
        if (error.code === "ECONNABORTED") {
            throw new Error("Request timeout - please try again");
        }
        throw new Error("Something went wrong. Please try again.");
    }
);

// Input Validation
export const getPokemonByName = async (name: string) => {
    if (!name || typeof name !== "string") {
        throw new Error("Invalid Pokémon name");
    }
    const sanitizedName = encodeURIComponent(name.toLowerCase().trim());
    // ... fetch data
};
```

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

-   [PokéAPI](https://pokeapi.co/) for providing the free Pokémon data
-   [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
-   [TanStack Query](https://tanstack.com/query) for the excellent data fetching library
-   [Vite](https://vitejs.dev/) for the blazing fast build tool

## 📊 Performance Metrics

### Lighthouse Scores (Target)

-   **Performance**: 95+
-   **Accessibility**: 100
-   **Best Practices**: 95+
-   **SEO**: 100

### Key Metrics

-   **First Contentful Paint (FCP)**: < 1.5s
-   **Largest Contentful Paint (LCP)**: < 2.5s
-   **Time to Interactive (TTI)**: < 3.5s
-   **Cumulative Layout Shift (CLS)**: < 0.1

## 🔍 Browser Support

-   Chrome (latest)
-   Firefox (latest)
-   Safari (latest)
-   Edge (latest)
-   Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Development Guidelines

### Component Structure

```
ComponentName/
  ├── index.tsx          # Main component
  ├── ComponentName.test.tsx  # Tests
  └── types.ts           # Component-specific types (if needed)
```

### Naming Conventions

-   **Components**: PascalCase (e.g., `PokemonCard`)
-   **Files**: PascalCase for components, camelCase for utilities
-   **Functions**: camelCase (e.g., `getPokemonList`)
-   **Types/Interfaces**: PascalCase (e.g., `PokemonDetail`)

### Code Style

-   Use TypeScript for all new code
-   Follow ESLint rules
-   Add ARIA labels for accessibility
-   Memoize expensive components
-   Use semantic HTML elements
-   Add proper error handling

## 🚀 Future Enhancements

-   [ ] Add unit tests with Vitest
-   [ ] Implement E2E tests with Playwright
-   [ ] Add search functionality
-   [ ] Implement favorites/bookmarks
-   [ ] Add filters by type
-   [ ] Dark mode support
-   [ ] PWA capabilities (offline support)
-   [ ] Animation improvements
-   [ ] Performance monitoring dashboard
-   [ ] i18n (internationalization) support

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
