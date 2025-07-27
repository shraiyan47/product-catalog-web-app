# 🛍️ Product Catalog Web App

A modern, responsive product catalog web application built with **Next.js**, **TailwindCSS**, and **JavaScript** (no TypeScript). This project features authentication, state management, and dynamic product listing using the [Fake Store API](https://fakestoreapi.com/products).

## 🚀 Live Demo

🔗 [Click here to view the live app](https://e-product-catalog.vercel.app)

---

## 📦 Features

- 🔐 **Authentication System** with demo credentials (username: `demo`, password: `password`)
- 🏠 **Home Page** with responsive product grid (1-4 columns based on screen size)
- 🔍 **Real-time Search** and **Category Filtering** for products
- 🛒 **Shopping Cart** with quantity management, tax calculation, and shipping
- ❤️ **Favorites System** with dedicated favorites page
- 📄 **Product Details Page** with SSR for SEO optimization
- 🚫 **Protected Routes** – login required for product details, cart, and favorites
- 🔄 **Smart Redirect** – users redirected to intended page after login
- 📱 **Login Modal** – contextual login prompts with product information
- 🧹 **Logout Cleanup** – cart and favorites cleared on logout
- ⚡ **Performance Optimizations**
  - `next/image` for automatic image optimization
  - **SSR** for product details pages (SEO benefits)
  - **CSR** for home page (real-time filtering)
  - **API caching** with 5-minute TTL
  - **Memoized filtering** for search performance
- 📱 **Fully Responsive** design using TailwindCSS
- 🎨 **Modern UI** with hover effects, loading states, and smooth transitions

---

## 🛠️ Tech Stack

| Tech        | Usage                            |
|-------------|----------------------------------|
| Next.js 15  | Framework, App Router, SSR       |
| React 18    | Component-based UI with Hooks    |
| JavaScript  | No TypeScript (as requested)     |
| TailwindCSS | Utility-first styling            |
| Context API | Global state management          |
| Vercel      | Deployment platform              |
| Fake Store API | Real product data source      |
| Lucide React | Beautiful icon library          |

---

## 🏗️ Architecture Decisions

### **Rendering Strategy:**
- **SSR for Product Details**: SEO optimization, social sharing, faster initial load
- **CSR for Home Page**: Real-time search/filtering, interactive state management
- **No SSG**: Product data changes frequently, user-specific cart/favorites

### **State Management:**
- **Context API over Redux**: Simpler setup, sufficient for app complexity
- **localStorage Integration**: Persistent cart and favorites across sessions
- **Event-driven Cleanup**: Custom events for logout synchronization

### **Authentication Flow:**
- **Modal-first Approach**: Contextual login prompts
- **Smart Redirects**: Users return to intended page after login
- **Session Persistence**: User state maintained across browser sessions

---

## 🏛️ System Architecture

### **Overall System Design:**
This application follows a modern React architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  Components (UI) → Pages (Routes) → Layouts (Structure)    │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT                         │
├─────────────────────────────────────────────────────────────┤
│  AuthContext (User) ← → CartContext (Shopping Data)        │
└─────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────┐
│                    DATA ACCESS LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  API Functions → Caching → External API (Fake Store)       │
└─────────────────────────────────────────────────────────────┘
```

### **Component Architecture:**
- **Atomic Design Principles**: Small, reusable components
- **Container/Presentational Pattern**: Logic separated from UI
- **Custom Hooks**: Reusable stateful logic
- **Context Providers**: Global state management

### **Data Flow:**
```
User Action → Component → Context → API → Cache → UI Update
     ↑                                              ↓
     └──────────── State Persistence ←──────────────┘
                  (localStorage)
```

## 🎯 Architecture Decisions Explained

### **Why Next.js App Router?**
- **File-based Routing**: Automatic route generation
- **Server Components**: Better performance and SEO
- **Built-in Optimizations**: Image, font, and bundle optimization
- **Deployment Ready**: Optimized for Vercel deployment
- **Developer Experience**: Hot reload, TypeScript support, built-in CSS

### **Why Context API over Redux?**
```javascript
// Context API - Simple and sufficient
const AuthContext = createContext()
const useAuth = () => useContext(AuthContext)

// vs Redux - Overkill for this app size
// - More boilerplate code
// - Additional dependencies
// - Complex setup for simple state
```

**Reasons:**
- ✅ **App Complexity**: Simple enough for Context API
- ✅ **Team Size**: Small team, less learning curve
- ✅ **Performance**: No over-engineering needed
- ✅ **Maintenance**: Easier to debug and maintain
- ✅ **Bundle Size**: No additional dependencies

### **Why JavaScript over TypeScript?**
- ✅ **Rapid Prototyping**: Faster initial development
- ✅ **Team Accessibility**: Lower barrier to entry
- ✅ **Simplicity**: Less configuration overhead
- ✅ **Migration Path**: Can add TypeScript incrementally later

## 🔄 Rendering Strategy Deep Dive

### **Server-Side Rendering (SSR) - Product Details**
```javascript
// app/product/[id]/page.js
export default async function ProductDetail({ params }) {
  const product = await getProductById(id) // Server-side fetch
  return <ProductDisplay product={product} />
}
```

**Why SSR for Product Pages:**
- 🎯 **SEO Benefits**: Search engines can crawl product content
- 🎯 **Social Sharing**: Rich previews for Facebook, Twitter, etc.
- 🎯 **Performance**: Faster First Contentful Paint (FCP)
- 🎯 **User Experience**: Content visible immediately
- 🎯 **Core Web Vitals**: Better LCP (Largest Contentful Paint)

### **Client-Side Rendering (CSR) - Home Page**
```javascript
// app/page.js
export default function Home() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  
  // Client-side filtering and state management
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [products, searchTerm])
}
```

**Why CSR for Home Page:**
- 🎯 **Interactivity**: Real-time search and filtering
- 🎯 **State Management**: Complex user interactions
- 🎯 **Dynamic Content**: Frequently changing cart/favorites
- 🎯 **User Experience**: Smooth transitions without page reloads

### **Why NOT Static Site Generation (SSG)?**
- ❌ **Dynamic Data**: Product inventory changes frequently
- ❌ **User-Specific**: Cart and favorites are personalized
- ❌ **Real-time Features**: Search and filtering need client-side logic
- ❌ **Authentication**: User state requires runtime rendering

**Future Consideration - ISR (Incremental Static Regeneration):**
```javascript
// Could be used for popular products
export const revalidate = 3600 // Revalidate every hour
```

## 📁 Detailed Folder Structure

```
product-catalog-web-app/
├── app/                          # Next.js App Router
│   ├── components/               # Reusable UI Components
│   │   ├── Navigation.js         # Top navigation with auth state
│   │   ├── ProductCard.js        # Product display with login protection
│   │   ├── SearchBar.js          # Real-time search component
│   │   ├── CategoryFilter.js     # Category filtering buttons
│   │   └── LoginModal.js         # Contextual login popup
│   ├── contexts/                 # Global State Management
│   │   ├── AuthContext.js        # User authentication state
│   │   └── CartContext.js        # Shopping cart & favorites state
│   ├── lib/                      # Utility Functions
│   │   └── products.js           # API functions with caching logic
│   ├── product/[id]/             # Dynamic Product Routes
│   │   ├── page.js               # SSR product details page
│   │   └── ProductActions.js     # Add to cart/favorites actions
│   ├── cart/                     # Shopping Cart Feature
│   │   └── page.js               # Cart page with calculations
│   ├── favorites/                # Favorites Feature
│   │   └── page.js               # Favorites list with management
│   ├── login/                    # Authentication
│   │   └── page.js               # Login form with redirect handling
│   ├── layout.js                 # Root layout with providers
│   ├── page.js                   # Home page (CSR)
│   ├── globals.css               # Global styles & Tailwind
│   └── loading.js                # Loading UI component
├── public/                       # Static Assets
│   └── placeholder.svg           # Fallback images
├── package.json                  # Dependencies & scripts
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── README.md                     # Project documentation
```

### **Folder Organization Principles:**
- **Feature-Based**: Related files grouped together (`/cart`, `/favorites`)
- **Component Co-location**: Components near their usage
- **Separation of Concerns**: UI, state, and data layers separated
- **Scalability**: Easy to add new features without restructuring

## 🔧 Installation Process (Detailed)

### **System Requirements:**
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (or yarn 1.22+)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, Edge

### **Step-by-Step Installation:**

#### **1. Environment Setup**
```bash
# Check Node.js version
node --version  # Should be 18.0+

# Check npm version
npm --version   # Should be 8.0+
```

#### **2. Project Setup**
```bash
# Clone the repository
git clone https://github.com/shraiyan47/product-catalog-web-app.git

# Navigate to project directory
cd product-catalog-web-app

# Verify project structure
ls -la  # Should see app/, public/, package.json, etc.
```

#### **3. Dependency Installation**
```bash
# Install all dependencies
npm install

# Verify installation
npm list --depth=0  # Shows installed packages
```

#### **4. Environment Configuration**
```bash
# Create environment file (optional)
touch .env.local

# Add configuration (if needed)
echo "NEXT_PUBLIC_API_URL=https://fakestoreapi.com" >> .env.local
```

#### **5. Development Server**
```bash
# Start development server
npm run dev

# Alternative: yarn dev
yarn dev

# Server should start on http://localhost:3000
```

#### **6. Verify Installation**
- ✅ Open browser to `http://localhost:3000`
- ✅ Should see product catalog home page
- ✅ Products should load from Fake Store API
- ✅ Search and filtering should work
- ✅ Login with demo/password should work

### **Production Build Process:**
```bash
# Build for production
npm run build

# Start production server
npm start

# Or export static files (if needed)
npm run export
```

### **Troubleshooting Installation:**

**Common Issues:**
```bash
# Node version too old
nvm install 18
nvm use 18

# Port already in use
npm run dev -- -p 3001

# Cache issues
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Permission issues (macOS/Linux)
sudo npm install -g npm@latest
```
## 🔍 System Components Explained

### **Authentication System:**
```javascript
// AuthContext.js - Centralized auth logic
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [redirectUrl, setRedirectUrl] = useState(null)
  
  // Login with redirect handling
  const login = async (username, password) => {
    // Validate credentials
    // Store user data
    // Handle redirect to intended page
  }
}
```

### **State Management Flow:**
```
User Login → AuthContext → localStorage → UI Update
     ↓
Cart Action → CartContext → localStorage → Badge Update
     ↓
Logout → Clear All Data → Event Dispatch → Context Reset
```

### **API Integration Architecture:**
```javascript
// lib/products.js - API layer with caching
const getProducts = async () => {
  // 1. Check cache first
  if (cachedProducts && !isExpired()) {
    return cachedProducts
  }
  
  // 2. Fetch from API
  const response = await fetch('https://fakestoreapi.com/products')
  
  // 3. Update cache
  cachedProducts = await response.json()
  cacheTimestamp = Date.now()
  
  return cachedProducts
}
```

### **Performance Architecture:**
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic route-based splitting
- **Memoization**: useMemo for expensive filtering operations
- **Caching**: API response caching with TTL
- **Bundle Optimization**: Tree shaking and minification

---

## 🧭 Folder Structure

```
/app
├── /components
│   ├── Navigation.js           → Top navigation with auth state
│   ├── ProductCard.js          → Product display with login protection
│   ├── SearchBar.js            → Real-time search component
│   ├── CategoryFilter.js       → Category filtering buttons
│   └── LoginModal.js           → Contextual login popup
├── /contexts
│   ├── AuthContext.js          → Authentication state management
│   └── CartContext.js          → Cart and favorites management
├── /lib
│   └── products.js             → API functions with caching
├── /product/[id]
│   ├── page.js                 → SSR product details page
│   └── ProductActions.js       → Add to cart/favorites actions
├── /cart
│   └── page.js                 → Shopping cart with calculations
├── /favorites
│   └── page.js                 → Favorites list with management
├── /login
│   └── page.js                 → Login form with redirect handling
├── layout.js                   → Root layout with providers
├── page.js                     → Home page with CSR
└── globals.css                 → TailwindCSS styles
```

---

## 🔐 Authentication System

### **Demo Credentials:**
- **Username:** `demo`
- **Password:** `password`

### **Protected Features:**
- Product details viewing
- Adding items to cart
- Adding items to favorites
- Cart page access
- Favorites page access

### **Login Flow:**
1. User clicks protected action → Login modal appears
2. User chooses to login → Redirected to login page
3. Successful login → Automatic redirect to intended page
4. Logout → All user data (cart, favorites) cleared

---

## 🛒 Shopping Features

### **Cart System:**
- Add products with automatic quantity management
- Update quantities with +/- buttons
- Remove individual items or clear entire cart
- **Calculations:**
  - Subtotal: Sum of all items
  - Tax: 8% of subtotal
  - Shipping: $9.99 (FREE over $50)
  - Final Total: Subtotal + Tax + Shipping

### **Favorites System:**
- Heart icon on product cards
- Dedicated favorites page with grid layout
- Quick actions: View details, Add to cart, Remove
- Persistent across browser sessions

---

## 🧳 Getting Started Locally (VS Code recommended)

### 1. Clone the repo from github
```bash
git clone https://github.com/shraiyan47/product-catalog-web-app.git
cd product-catalog-web-app
```

### 2. Install dependencies for this project
```bash
npm install
```

### 3. Create `.env.local` file (not currently using any, optional)
```bash
NEXT_PUBLIC_API_URL=https://fakestoreapi.com 
```

### 4. Run the dev server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### 5. Build for production
```bash
npm run build
npm start
```

---

## 🔌 API Integration

### **Fake Store API Endpoints:**
- `GET /products` - All products with caching
- `GET /products/{id}` - Single product for details page
- `GET /products/categories` - Category list for filtering

### **Caching Strategy:**
```javascript
// 5-minute in-memory cache
const CACHE_DURATION = 5 * 60 * 1000
let cachedProducts = null
let cacheTimestamp = null
```

---

## 🛡️ Route Protection

### **Authentication Logic:**
- **Not Logged In:** Login modal appears for protected actions
- **Logged In:** Full access to all features
- **After Login:** Smart redirect to originally requested page
- **After Logout:** All user data cleared, redirected to home

### **Protected Routes:**
- `/product/[id]` - Product details
- `/cart` - Shopping cart
- `/favorites` - Favorites list

---

## ⚡ Performance Optimizations

### **Current Optimizations:**
- **Image Optimization:** Next.js Image component with lazy loading
- **API Caching:** 5-minute cache for product data
- **Memoized Filtering:** Prevents unnecessary re-renders during search
- **Code Splitting:** Automatic route-based splitting
- **Responsive Images:** Automatic WebP conversion and sizing

### **Bundle Size:**
- Initial bundle: ~200KB (gzipped)
- Route-based code splitting
- Dynamic imports for non-critical features

---

## 🧪 Testing Strategy

### **Manual Testing Checklist:**
- [ ] Login/logout functionality
- [ ] Cart operations (add, update, remove)
- [ ] Favorites management
- [ ] Search and filtering
- [ ] Responsive design across devices
- [ ] Protected route redirects

### **Future Testing:**
- Unit tests with Jest & React Testing Library
- E2E tests with Playwright
- Performance testing with Lighthouse

---

## 🚀 Deployment

### **Vercel (Current):**
```bash
# Deploy to Vercel
vercel

# Or connect GitHub repository for automatic deployments
```

### **Other Platforms:**
- **Netlify:** Build command: `npm run build`, Publish directory: `.next`
- **Docker:** Dockerfile included for containerized deployment

---

## 🙋‍♂️ Author

**Shahadat Hossain**  
💼 [LinkedIn](https://linkedin.com/in/shahadat-hossain-raiyan)  
📧 [shraiyan47@gmail.com](mailto:shraiyan47@gmail.com)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE). You may use it for personal or commercial purposes (with proper credit).

---

## 🔮 Future Enhancements

### **Version 2.0 Features:**
- [ ] User registration system
- [ ] Product reviews and ratings
- [ ] Advanced filtering (price range, ratings)
- [ ] Order history and tracking
- [ ] Email notifications

### **Performance Improvements:**
- [ ] Redis caching for production
- [ ] Service worker for offline support
- [ ] Virtual scrolling for large product lists
- [ ] Advanced image optimization

---

## 🛠️ Development Notes

### **Why JavaScript over TypeScript:**
- Faster development for MVP
- Simpler setup and configuration
- Easier for junior developers to contribute
- Can be migrated to TypeScript later if needed

### **Why Context API over Redux:**
- Sufficient complexity for current features
- Simpler setup and less boilerplate
- Built into React, no additional dependencies
- Easier state management for authentication and cart

### **API Caching Strategy:**
- In-memory caching for development simplicity
- 5-minute TTL balances freshness and performance
- Ready for Redis upgrade in production
- Prevents API rate limiting issues

---

**Built with ❤️ using Next.js, React, and TailwindCSS**
