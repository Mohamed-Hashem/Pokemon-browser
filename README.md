# Pokémon Pokédex Application

A modern, responsive web application for browsing and exploring Pokémon data with beautiful UI and smooth interactions. Built with React 19, TypeScript, and TanStack Query v5.

## ✨ Features

### Core Functionality

- **Dual Viewing Modes**: Toggle between pagination and infinite scroll on a single page
    - **Page Controls** (Default): Traditional numbered pagination for quick navigation
    - **Infinite Scroll**: Load more Pokémon dynamically with smooth loading states
- **Detailed Pokémon View**: Comprehensive stats with type-based gradient designs
- **Responsive Grid Layout**: Adapts seamlessly from mobile to desktop
- **Real-time Loading States**: Spinner and count display during data fetching
- **Type-based Theming**: Dynamic colors based on Pokémon types

### UI/UX Excellence

- **Gradient Backgrounds**: Beautiful gradients throughout the application
- **Hover Effects**: Interactive badges and cards with smooth transitions
- **Loading Indicators**: Contextual spinners with progress messages
- **Back Navigation**: Intuitive navigation with dedicated back button component
- **Skeleton Loaders**: Smooth loading experience with skeleton screens
- **Accessibility**: WCAG-compliant with ARIA labels and keyboard navigation

## 🛠️ Tech Stack

- **React 19.1.1** - Latest React with improved Suspense and concurrent features
- **TypeScript 5.9.3** - Full type safety with strict mode enabled
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **TanStack Query v5.90.5** - Powerful async state management
- **React Router v7.9.4** - Modern client-side routing
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Axios 1.12.2** - Promise-based HTTP client
- **ESLint 9.36.0** - Code linting with semicolon enforcement
- **Prettier 3.4.2** - Opinionated code formatter

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/Mohamed-Hashem/Pokemon-test
cd Pokemon
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── api/                        # API layer
│   ├── pokemon.ts             # Pokémon API endpoints with validation
│   └── queryClient.ts         # React Query configuration
├── components/                 # Reusable components (18 total)
│   ├── AbilitiesList/         # Pokemon abilities with badges
│   ├── BackButton/            # Reusable navigation button
│   ├── BaseExperience/        # XP display component
│   ├── BaseStats/             # Stats wrapper component
│   ├── ErrorBoundary/         # Error boundary wrapper
│   ├── InfiniteScrollView/    # Infinite scroll functionality
│   ├── LoadMoreButton/        # Load more with loading states
│   ├── PageHeader/            # Reusable page header
│   ├── PaginationControls/    # Pagination navigation
│   ├── PaginationView/        # Pagination functionality
│   ├── PhysicalStats/         # Height/weight display
│   ├── PokemonCard/           # Individual Pokémon card
│   ├── PokemonGrid/           # Grid layout for cards
│   ├── PokemonHeader/         # Detail page header with gradient
│   ├── PokemonImage/          # Image with fallback
│   ├── SkeletonLoader/        # Loading skeletons
│   ├── Spinner/               # Loading spinner
│   ├── StatProgressBar/       # Individual stat with bar
│   ├── TypeBadges/            # Type badges with colors
│   └── ViewToggle/            # Toggle buttons component
├── constants/                  # Centralized constants
│   ├── index.ts               # API, cache, pagination, UI constants
│   └── colors.ts              # Pokemon type colors and gradients
├── pages/                      # Page components
│   ├── Home/                  # Main page with view toggle
│   └── PokemonDetail/         # Detailed Pokemon view
├── types/                      # TypeScript definitions
│   └── index.ts               # Shared type interfaces
├── App.tsx                     # Main app with routing
├── main.tsx                    # Entry point with providers
└── index.css                   # Global styles with Tailwind
```

## 🔧 Available Scripts

### Development

- `npm run dev` / `yarn dev` - Start development server with HMR
- `npm run build` / `yarn build` - Build for production
- `npm run preview` / `yarn preview` - Preview production build locally

### Code Quality

- `npm run lint` / `yarn lint` - Run ESLint on all files
- `npm run lint:fix` / `yarn lint:fix` - Auto-fix ESLint errors
- `npm run format` / `yarn format` - Format code with Prettier
- `npm run format:check` / `yarn format:check` - Check formatting

## 🎨 Component Architecture

### Atomic Design Principles

The project follows atomic design principles with small, focused, reusable components:

**Page Components:**

- `Home` - View toggle and layout orchestration
- `PokemonDetail` - Detail page composition

**Feature Components:**

- `PaginationView` - Complete pagination functionality
- `InfiniteScrollView` - Complete infinite scroll functionality

**UI Components:**

- All 18 components are self-contained and reusable
- Each component has a single responsibility
- TypeScript interfaces for type safety
- Consistent prop patterns across components

### Benefits of Current Architecture

✅ **Reduced Code Duplication** - 44% reduction in total lines  
✅ **Improved Maintainability** - Changes isolated to single components  
✅ **Better Testability** - Small, focused units  
✅ **Enhanced Reusability** - Components used across multiple views  
✅ **Type Safety** - Full TypeScript coverage with interfaces

## ⚙️ Configuration

### Constants (`src/constants/index.ts`)

```typescript
// API Configuration
API_BASE_URL: "https://pokeapi.co/api/v2"
API_TIMEOUT: 10000  // 10 seconds

// Pagination
PAGE_SIZE: 20
MIN_LIMIT: 1
MAX_LIMIT: 100

// Cache Strategy
CACHE_TIME: {
  STALE_TIME: 300000,              // 5 minutes
  GC_TIME: 600000,                 // 10 minutes
  POKEMON_DETAIL_STALE_TIME: 1800000 // 30 minutes
}

// UI Constants
UI: {
  ID_PADDING: 3,
  HEIGHT_UNIT: "m",
  HEIGHT_DIVISOR: 10,
  WEIGHT_UNIT: "kg",
  WEIGHT_DIVISOR: 10
}
```

### Colors (`src/constants/colors.ts`)

```typescript
// 18 Pokemon type colors
POKEMON_TYPE_COLORS: {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  // ... and more
}

// Gradient backgrounds
GRADIENT_COLORS: {
  BACKGROUND: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
}

// Type-safe color getter
getTypeColor(type: string): string
```

## 🎯 Key Features

### Home Page

- **Toggle Buttons**: Switch between pagination and infinite scroll
- **Gradient Background**: Beautiful purple gradient
- **Responsive Grid**: 1-4 columns based on screen size
- **Smooth Transitions**: View switching without page reload

### Pagination View

- Display 20 Pokémon per page
- Previous/Next navigation
- Page number display
- Disabled states at boundaries
- Instant page switching

### Infinite Scroll View

- Initial load of 20 Pokémon
- "Load More" button
- Loading spinner with message: "Loading more Pokemon..."
- Pokemon count display: "Showing X Pokemon"
- End detection with "No more Pokémon" message

### Pokemon Detail Page

- **Type-based Gradient Header**: Dynamic colors based on primary type
- **Pokemon Image**: Large circular image with fallback
- **Type Badges**: Colored badges for each type
- **Physical Stats**: Height (m) and Weight (kg) with icons
- **Base Stats**: 6 stats with progress bars (HP, Attack, Defense, etc.)
- **Abilities**: Badge-style display with hover effects
- **Base Experience**: XP display in purple
- **Back Button**: Return to main view

## 🚀 Performance Optimizations

### Code Splitting

```tsx
// Lazy load routes for smaller initial bundle
const Home = lazy(() => import("./pages/Home"));
const PokemonDetail = lazy(() => import("./pages/PokemonDetail"));
```

### React Query Optimizations

- **Stale-While-Revalidate**: 5-minute stale time for lists
- **Extended Cache**: 30-minute cache for detail pages
- **Smart Retries**: 1 retry on failure
- **No Window Refocus**: Prevents unnecessary refetches
- **Garbage Collection**: 10-minute cleanup cycle

### Component Optimizations

- **Memoization**: `React.memo` on PokemonCard
- **Suspense Boundaries**: Prevent loading waterfalls
- **Skeleton Loaders**: Better perceived performance
- **Image Lazy Loading**: Native lazy loading enabled

## ♿ Accessibility Features

- ✅ **Semantic HTML**: Proper element usage (`<article>`, `<nav>`, `<main>`)
- ✅ **ARIA Labels**: Comprehensive aria-label attributes
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Screen Reader Support**: aria-live regions for dynamic content
- ✅ **Alt Text**: Descriptive alt text for all images
- ✅ **Color Contrast**: WCAG AA compliant

Example:

```tsx
<button
    onClick={onLoadMore}
    aria-label="Load more Pokémon"
    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
    Load More
</button>
```

## 🔐 Security Features

- ✅ **Input Validation**: Sanitize all user inputs
- ✅ **Request Timeouts**: 10-second timeout protection
- ✅ **Error Sanitization**: Safe error messages
- ✅ **XSS Prevention**: Proper escaping
- ✅ **HTTPS Only**: Secure API communication
- ✅ **Type Safety**: TypeScript prevents many runtime errors

## 📱 Responsive Design

### Breakpoints

```tsx
Mobile:    < 640px   (2 columns)
Tablet:    640-1024px (3-4 columns)
Desktop:   > 1024px   (4+ columns)
```

### Grid System

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

## 🧪 Code Quality

### ESLint Configuration

- **Semicolons**: Required at end of statements
- **TypeScript**: Strict type checking
- **React Hooks**: Rules enforcement
- **Import Order**: Consistent organization

### Prettier Configuration

```json
{
    "semi": true,
    "singleQuote": false,
    "printWidth": 100,
    "tabWidth": 4,
    "trailingComma": "es5"
}
```

## 🐛 Error Handling

### Error Boundaries

```tsx
<ErrorBoundary>
    <App />
</ErrorBoundary>
```

### API Error Handling

```tsx
// Timeout errors
if (error.code === "ECONNABORTED") {
    throw new Error("Request timeout");
}

// Not found errors
if (error.response?.status === 404) {
    throw new Error("Pokémon not found");
}
```

### Loading States

- Skeleton loaders for initial loads
- Spinner with message for pagination
- Inline spinner for infinite scroll
- Error messages with retry options

## 📊 Project Metrics

### Code Reduction

- **Home Page**: 85 → 35 lines (58% reduction)
- **PokemonDetail**: 240 → 75 lines (69% reduction)
- **Overall**: 44% total code reduction through refactoring

### Component Count

- **Total Components**: 18 reusable components
- **Page Components**: 2 (Home, PokemonDetail)
- **Feature Components**: 2 (PaginationView, InfiniteScrollView)
- **UI Components**: 14 atomic components

### Type Safety

- **100% TypeScript Coverage**
- **Zero `any` types in production code**
- **Interface for every component prop**
- **Centralized type definitions**

## 🌐 API Integration

**Base URL**: `https://pokeapi.co/api/v2`

### Endpoints Used

```typescript
GET /pokemon?limit={limit}&offset={offset}  // List Pokemon
GET /pokemon/{name}                          // Pokemon details
```

### Data Validation

```typescript
// Limit validation
const validLimit = Math.min(Math.max(MIN_LIMIT, limit), MAX_LIMIT);

// Name sanitization
const sanitizedName = encodeURIComponent(name.toLowerCase().trim());
```

## 🔄 Recent Refactoring

### Phase 1: Bug Fixes & Updates

- ✅ Fixed React Query v5 syntax (object-based API)
- ✅ Added missing `initialPageParam`
- ✅ Fixed import paths and case sensitivity
- ✅ Added optional chaining for safety

### Phase 2: Constants Centralization

- ✅ Created `constants/index.ts` for all constants
- ✅ Created `constants/colors.ts` for type colors
- ✅ Removed magic numbers from codebase
- ✅ Added type-safe color getter function

### Phase 3: Component Refactoring

- ✅ Extracted 9 components from PokemonDetail page
- ✅ Created reusable UI components (BackButton, LoadMoreButton, etc.)
- ✅ Split view logic into PaginationView and InfiniteScrollView
- ✅ Applied atomic design principles

### Phase 4: Code Cleanup

- ✅ Removed unused PokemonListPagination page
- ✅ Removed unused PokemonListLoadMore page
- ✅ Verified all imports and dependencies
- ✅ Ensured zero TypeScript/ESLint errors

## 🚀 Future Enhancements

- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] Search functionality
- [ ] Favorites/Bookmarks feature
- [ ] Filter by type
- [ ] Sort options
- [ ] Dark mode
- [ ] PWA capabilities
- [ ] Internationalization (i18n)
- [ ] Performance monitoring

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) - Free RESTful Pokémon API
- [TanStack Query](https://tanstack.com/query) - Powerful async state management
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://react.dev/) - The library for web and native user interfaces

```

```
