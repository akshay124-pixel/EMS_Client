# Employee Management System - Frontend

A stunning, modern React application with premium UI/UX, built with Vite, TailwindCSS, and Framer Motion.

## 🎨 Features

- **Beautiful UI/UX**: Premium design with smooth animations and transitions
- **Dual View Modes**: Toggle between Grid View (10-column table) and Tile View (card layout)
- **Responsive Design**: Works perfectly on all devices
- **Interactive Components**:
  - Hamburger menu with nested submenus
  - Horizontal navigation
  - Employee cards with ellipsis menu (Edit, Flag, Delete)
  - Detailed employee modal with smooth transitions
- **GraphQL Integration**: Apollo Client for efficient data fetching
- **State Management**: Zustand for lightweight, fast state management
- **Animations**: Framer Motion for fluid, professional animations

## 📦 Installation

```bash
cd frontend
npm install
```

## 🔧 Configuration

Create a `.env` file:

```env
VITE_GRAPHQL_URI=http://localhost:4000/graphql
```

## 🏃 Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── EmployeeModal.jsx      # Detailed employee view modal
│   │   ├── GridView.jsx           # 10-column table view
│   │   ├── Header.jsx             # Top navigation bar
│   │   ├── ProtectedRoute.jsx     # Route authentication
│   │   ├── Sidebar.jsx            # Hamburger menu with submenus
│   │   └── TileView.jsx           # Card/tile layout view
│   ├── graphql/
│   │   └── queries.js             # GraphQL queries & mutations
│   ├── lib/
│   │   └── apolloClient.js        # Apollo Client configuration
│   ├── pages/
│   │   ├── DashboardPage.jsx      # Main dashboard
│   │   └── LoginPage.jsx          # Authentication page
│   ├── store/
│   │   ├── authStore.js           # Authentication state
│   │   └── uiStore.js             # UI state (view mode, modals)
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Components

### GridView
- 10-column responsive table
- Sortable columns
- Inline actions menu
- Hover effects
- Status badges
- Progress bars for attendance

### TileView
- Responsive card grid (1-4 columns based on screen size)
- Compact employee information
- Hover animations
- Quick actions menu
- Visual stats display

### EmployeeModal
- Full-screen detailed view
- Smooth slide-in animation
- Comprehensive employee information
- Performance metrics
- Skills/subjects display
- Contact information

### Sidebar
- Collapsible hamburger menu
- Nested submenu support
- Smooth animations
- Mobile-responsive
- Overlay for mobile

## 🎨 Design System

### Colors
- Primary: Blue gradient (#0ea5e9 - #0369a1)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)
- Dark: Gray scale (#0f172a - #f8fafc)

### Animations
- Fade in/out
- Slide transitions
- Scale effects
- Hover states
- Loading spinners

### Components
- Buttons: Primary, Secondary, Danger
- Cards: Elevated, Hover effects
- Badges: Status indicators
- Inputs: Focus states, Validation
- Modals: Backdrop blur, Smooth transitions

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `VITE_GRAPHQL_URI`: Your GraphQL API URL

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Set environment variables:
   - `VITE_GRAPHQL_URI`: Your GraphQL API URL

### Deploy to GitHub Pages

1. Update `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
});
```

2. Build and deploy:
```bash
npm run build
npx gh-pages -d dist
```

## 🔐 Authentication

The app uses JWT-based authentication. Login credentials:

- **Admin**: admin@company.com / admin123
- **Employee**: sarah.johnson@company.com / employee123

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎭 Animations & Transitions

All animations use Framer Motion for:
- Page transitions
- Component mounting/unmounting
- Hover effects
- Loading states
- Modal overlays

## 🧪 Testing

Run linting:
```bash
npm run lint
```

## 📈 Performance Optimizations

- Code splitting with React.lazy
- Apollo Client caching
- Optimized re-renders with Zustand
- Image lazy loading
- Debounced search inputs
- Virtualized lists for large datasets

## 🎨 Customization

### Changing Theme Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Adding New Views

1. Create component in `src/components/`
2. Add to view mode toggle in `DashboardPage.jsx`
3. Update `uiStore.js` if needed

## 📝 License

MIT
