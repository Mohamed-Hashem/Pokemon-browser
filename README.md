# Pokémon Browser Application

A modern, responsive web application for browsing and exploring Pokémon data. Built with React 19, TypeScript, and TanStack Query v5 — optimized for performance, accessibility, and security.

## ✨ Features

- **Dual Viewing Modes**: Toggle between pagination and infinite scroll
- **Virtualized Infinite Scroll**: Renders only visible items using `react-virtuoso` for smooth performance at scale
- **Detailed Pokémon View**: Comprehensive stats with type-based gradient backgrounds
- **Responsive Grid Layout**: Adapts from mobile to desktop (1-4 columns)
- **Type-based Theming**: Dynamic colors and WCAG-compliant contrast based on Pokémon types
- **Loading States**: Accessible skeleton loaders and spinners with ARIA attributes
- **Accessibility**: WCAG 2.1 AA compliant — skip navigation, live regions, focus management, semantic markup
- **Security Hardened**: URL encoding, dev-only error logging, input validation

## 🛠️ Tech Stack

### Production

- **React 19** with TypeScript 5.9
- **Vite 7** — Build tool with manual chunk splitting
- **TanStack Query v5** — Async state management with prefetching
- **React Router v7** — Client-side routing with lazy-loaded routes
- **Tailwind CSS 4** — Utility-first styling
- **Axios** — HTTP client with validation
- **react-virtuoso** — List virtualization for infinite scroll

### Development & Quality

- **ESLint 9** with `eslint-plugin-jsx-a11y` (14 accessibility rules)
- **Prettier** — Code formatting
- **react-scan** — Runtime render visualization (dev-only)
- **react-grab** — Component inspection
- **why-did-you-render** — Unnecessary re-render detection
- **knip** — Dead code and unused dependency detection
- **react-doctor** — React best practices audit (100/100)

## 🌐 Live Demo

**https://pokemon-browser-frontend-test.vercel.app**

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Mohamed-Hashem/Pokemon-test
cd Pokemon

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

## 🏗️ Project Structure

```
src/
├── api/                        # API layer
│   ├── pokemon.ts             # Pokémon API endpoints with validation & URL encoding
│   └── queryClient.ts         # React Query configuration
├── components/                 # Reusable components (18 total)
│   ├── AbilitiesList/         # Pokemon abilities with badges
│   ├── BackButton/            # Navigation button (aria-hidden SVG)
│   ├── BaseExperience/        # XP display component
│   ├── BaseStats/             # Stats wrapper component
│   ├── ErrorBoundary/         # Error boundary (dev/prod error split)
│   ├── InfiniteScrollView/    # Virtualized infinite scroll (VirtuosoGrid)
│   ├── LoadMoreButton/        # Load more with loading states
│   ├── PageHeader/            # Reusable page header (ReactNode title)
│   ├── PaginationControls/    # Pagination navigation
│   ├── PaginationView/        # Paginated view with prefetching & focus management
│   ├── PhysicalStats/         # Height/weight display
│   ├── PokemonCard/           # Individual Pokémon card (memoized)
│   ├── PokemonGrid/           # Grid layout for cards
│   ├── PokemonHeader/         # Detail header with dynamic contrast text
│   ├── PokemonImage/          # Image with fallback
│   ├── SkeletonLoader/        # Accessible loading skeletons (role="status")
│   ├── Spinner/               # Loading spinner
│   ├── StatProgressBar/       # Individual stat with bar
│   ├── TypeBadges/            # Type badges with WCAG-compliant text color
│   └── ViewToggle/            # Toggle buttons with aria-pressed & focus ring
├── constants/                  # Centralized constants
│   ├── index.ts               # API, cache, pagination, UI constants
│   └── colors.ts              # Type colors, gradients & luminance-based text color
├── pages/                      # Page components
│   ├── Home/                  # Main page with useTransition view toggle
│   └── PokemonDetail/         # Detailed Pokemon view (memoized, staleTime)
├── types/                      # TypeScript definitions
│   └── index.ts               # Shared type interfaces
├── App.tsx                     # Root app with skip-to-content & <main> landmark
├── main.tsx                    # Entry point with react-scan (dev-only)
└── index.css                   # Global styles with Tailwind
```

## 📜 Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server                 |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview production build                 |
| `npm run lint`         | Run ESLint with accessibility rules      |
| `npm run lint:fix`     | Auto-fix ESLint issues                   |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check formatting without writing         |
| `npm run knip`         | Detect dead code and unused dependencies |
| `npm run doctor`       | Run react-doctor best practices audit    |

## 🎨 Architecture

The project uses **atomic design principles** with 18 reusable components:

- **2 Page Components**: Home, PokemonDetail
- **2 View Components**: PaginationView, InfiniteScrollView
- **14 UI Components**: PokemonCard, TypeBadges, StatProgressBar, etc.

**Benefits:**

- ✅ 44% code reduction through refactoring
- ✅ Single responsibility per component
- ✅ Full TypeScript type safety
- ✅ Easy to test and maintain

## ⚡ Performance

- **Bundle Splitting**: Manual chunks for `react-vendor`, `router`, `query`, `http`
- **Route-level Code Splitting**: Lazy-loaded pages with Suspense
- **React.memo**: All leaf components wrapped to prevent unnecessary re-renders
- **useMemo / useCallback**: Stable references for derived data and event handlers
- **useTransition**: Non-blocking view and page switching
- **Prefetching**: Next page prefetched on pagination for instant navigation
- **Virtualization**: `VirtuosoGrid` renders only visible cards in infinite scroll
- **Smart Caching**: 5min stale time for lists, 30min for details
- **Image Lazy Loading**: Native browser `loading="lazy"`

## ♿ Accessibility

- **Skip to Content**: Skip link to bypass navigation
- **Landmarks**: `<main id="main-content">` wrapping app content
- **Live Regions**: `aria-live="polite"` for page changes and infinite scroll loading status
- **Focus Management**: Focus moves to grid after pagination page change
- **WCAG Contrast**: Luminance-based `getTextColorForType()` ensures 4.5:1 contrast on all 18 type colors
- **Semantic Markup**: `role="list"`, `role="status"`, `aria-pressed`, `aria-hidden` on decorative elements
- **Screen Reader Support**: `.sr-only` loading text, emoji hidden from assistive tech
- **ESLint a11y**: 14 rules enforced via `eslint-plugin-jsx-a11y`

## 🔒 Security

- **URL Encoding**: `encodeURIComponent()` on all user-supplied URL path segments
- **Input Validation**: Type and presence checks before API calls
- **Error Isolation**: `ErrorBoundary` with dev-only `console.error` (no stack traces in production)
- **Dev/Prod Split**: `react-scan` and debug logging only in development builds
- **Dependency Audit**: Regular `npm audit` with known dev-only exceptions documented

## ⚙️ Configuration

Centralized constants in `src/constants/`:

- **API**: Base URL, timeout (10s), pagination (20/page)
- **Cache**: 5min stale time, 30min for details
- **Colors**: 18 Pokémon type colors with gradients + luminance-based text color
- **UI**: Units, formatting, and display settings

## 🎯 Key Features

### Home Page

- Toggle between pagination and infinite scroll views
- Responsive grid (1-4 columns)
- Gradient background
- `useTransition` for non-blocking view switching

### Pokémon Detail Page

- Type-based gradient header with dynamic contrast text
- Physical stats (height, weight)
- Base stats with progress bars
- Abilities with badge styling
- Type badges with WCAG-compliant colors and base experience

## 🌐 API

Uses [PokéAPI](https://pokeapi.co/api/v2):

- `GET /pokemon?limit={limit}&offset={offset}` — List Pokémon
- `GET /pokemon/{name}` — Pokémon details

## 📄 License

MIT License

---

Built with ❤️ using [PokéAPI](https://pokeapi.co/)
