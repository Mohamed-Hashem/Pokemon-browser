# Pokémon Browser Application

A modern, responsive web application for browsing and exploring Pokémon data. Built with React 19, TypeScript, and TanStack Query v5.

## ✨ Features

- **Dual Viewing Modes**: Toggle between pagination and infinite scroll
- **Detailed Pokémon View**: Comprehensive stats with type-based gradient backgrounds
- **Responsive Grid Layout**: Adapts from mobile to desktop (1-4 columns)
- **Type-based Theming**: Dynamic colors based on Pokémon types
- **Loading States**: Skeleton loaders and spinners for smooth UX
- **Accessibility**: WCAG-compliant with ARIA labels

## 🛠️ Tech Stack

- **React 19** with TypeScript
- **Vite** - Build tool and dev server
- **TanStack Query v5** - Async state management
- **React Router v7** - Client-side routing
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client

## 🌐 Live Demo

**https://pokemon-browser-frontend-test.vercel.app**

## � Getting Started

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

## � Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

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

## ⚙️ Configuration

Centralized constants in `src/constants/`:

- **API**: Base URL, timeout (10s), pagination (20/page)
- **Cache**: 5min stale time, 30min for details
- **Colors**: 18 Pokémon type colors with gradients
- **UI**: Units, formatting, and display settings

## 🎯 Key Features

### Home Page

- Toggle between pagination and infinite scroll views
- Responsive grid (1-4 columns)
- Gradient background

### Pokémon Detail Page

- Type-based gradient header
- Physical stats (height, weight)
- Base stats with progress bars
- Abilities with badge styling
- Type badges and base experience

## ⚡ Performance

- **Code Splitting**: Lazy-loaded routes
- **Smart Caching**: 5min stale time, 30min for details
- **Memoization**: React.memo on expensive components
- **Image Lazy Loading**: Native browser lazy loading

## 🌐 API

Uses [PokéAPI](https://pokeapi.co/api/v2):

- `GET /pokemon?limit={limit}&offset={offset}` - List Pokémon
- `GET /pokemon/{name}` - Pokémon details

## 📄 License

MIT License

---

Built with ❤️ using [PokéAPI](https://pokeapi.co/)
