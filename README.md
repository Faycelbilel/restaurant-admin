# Foodify Admin Dashboard

A modern admin dashboard for managing food delivery operations built with Next.js 14, React 19, and TypeScript.

## 🚀 Tech Stack

- **Framework:** Next.js 16.0.0 (App Router)
- **UI Library:** React 19.2.0
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **State Management:** Redux Toolkit + React Context API
- **Charts:** ApexCharts
- **Icons:** Lucide React

## 📁 Project Structure

The project follows **Atomic Design** principles with a feature-based architecture:

```
src/
├── app/                    # Next.js App Router pages
│   ├── (dashboard)/        # Dashboard routes
│   │   ├── clients/        # Client management
│   │   ├── home/           # Dashboard home
│   │   ├── orders/         # Order management  
│   │   ├── reports/        # Reports & analytics
│   │   ├── restaurants/    # Restaurant management
│   │   ├── riders/         # Rider management
│   │   └── settings/       # Settings
│   └── login/              # Login page
├── features/               # Feature modules
│   ├── auth/               # Authentication (+ Redux slice)
│   ├── clients/            # Client features
│   ├── restaurants/        # Restaurant features
│   └── riders/             # Rider features
├── shared/                 # Shared components & utilities
│   ├── atoms/              # Basic UI components (16)
│   ├── molecules/          # Composite components (20)
│   ├── organisms/          # Complex components (11)
│   ├── contexts/           # React contexts
│   ├── types/              # TypeScript types & enums
│   └── utils/              # Utility functions
└── lib/                    # Core services
    ├── services/           # API service layer
    └── store/              # Redux store configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Architecture

### Atomic Design

Components are organized by complexity:

- **Atoms:** Basic building blocks (Button, Input, Badge, etc.)
- **Molecules:** Simple component combinations (SearchBar, KpiCard, etc.)
- **Organisms:** Complex UI sections (DataTable, Sidebar, Modal, etc.)

### Feature Modules

Each feature is self-contained with:
- `components/` - Feature-specific UI
- `hooks/` - Feature-specific logic
- `services/` - API integration
- `types/` - TypeScript definitions
- `constants/` - Configuration & constants
- `mocks/` - Development mock data

### State Management

- **Global State:** Redux Toolkit (`@reduxjs/toolkit`)
  - Auth slice for authentication state
  - Typed hooks (`useAppDispatch`, `useAppSelector`)
  - Feature-based slices in `features/<name>/store/`
- **Local Context:** React Context API for UI state
  - `AuthContext` - Authentication provider
  - `SidebarContext` - Sidebar state
- **API Integration:** Custom service layer with type-safe HTTP client

See [REDUX_STORE.md](./REDUX_STORE.md) for Redux implementation details.

## 📊 Features

### Implemented

✅ **Rider Management**
- Dashboard with performance metrics
- Financial tracking
- History & activity logs
- Performance analytics

✅ **Client Management**  
- Client list with filtering
- Client profiles
- Membership tracking

✅ **Restaurant Management**
- Restaurant profiles
- Menu management
- Billing & invoicing
- Order history
- Dashboard analytics
- ✅ **Google Maps Location Picker** - Interactive map for selecting restaurant coordinates

### ✅ **Authentication**
- Login with backend integration
- Protected routes with AuthGuard
- Session management with tokens
- Automatic redirect for authenticated users
- Token storage and refresh

**Backend API Endpoint:**
```bash
POST http://localhost:8086/api/auth/login
Content-Type: application/json

{
  "email": "admin@foodify.com",
  "password": "your-password"
}
```

### In Development

🚧 **Orders** - Order management interface
🚧 **Reports** - Analytics & reporting dashboard
🚧 **Settings** - Application settings

## 🔧 API Integration

The application uses a custom API service layer with:

- ✅ Request/Response interceptors
- ✅ Automatic token management
- ✅ Error handling & retry logic
- ✅ TypeScript type safety
- ✅ File upload/download support
- ✅ Timeout & cancellation

See [API_SERVICE.md](./API_SERVICE.md) for detailed documentation.

## 🧪 Development

### Environment Setup

1. Copy `.env.local.example` to `.env.local`
2. Configure required environment variables:
   - `NEXT_PUBLIC_API_BASE_URL` - Backend API URL
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key (for location picker)

See [GOOGLE_MAPS_SETUP.md](./GOOGLE_MAPS_SETUP.md) for Google Maps configuration.

### Code Quality

- **ESLint:** Configured with Next.js rules
- **TypeScript:** Strict mode enabled
- **Prettier:** Code formatting (with Tailwind plugin)

### Best Practices

1. Use TypeScript enums instead of string unions
2. Keep components focused and single-purpose
3. Follow atomic design principles
4. Use shared utilities for common logic
5. Implement proper error handling
6. Add loading states for async operations

## 📝 Documentation

- [API Service Documentation](./API_SERVICE.md) - HTTP client & API integration
- [Redux Store Documentation](./REDUX_STORE.md) - State management with Redux Toolkit
- [Google Maps Setup](./GOOGLE_MAPS_SETUP.md) - Interactive location picker configuration
- [Restaurant API Implementation](./RESTAURANT_API_IMPLEMENTATION.md) - Restaurant creation API integration
- [Code Review Report](./CODE_REVIEW_REPORT.md) - Architecture analysis & recommendations

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript types/enums instead of plain strings
3. Add components to appropriate atomic level
4. Keep feature modules self-contained
5. Update documentation for significant changes

## 📄 License

This project is private and proprietary.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** 2025-11-22  
**Version:** 0.1.0
