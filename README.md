# 🛍️ Modern Product Catalog with JWT Authentication

A production-grade, responsive product catalog web application built with **Next.js 15**, **TailwindCSS**, and **JavaScript**. Features comprehensive JWT authentication, user-specific data management, and a modern UI/UX design.

## 🚀 Live Demo

🔗 [Click here to view the live app](https://product-catalog-jwt.vercel.app)



## 📦 Key Features

### 🔐 **JWT Authentication System**
- **Secure Login**: Industry-standard JWT token authentication
- **Mock Users**: Two pre-configured test users with different data
- **Token Persistence**: Login state maintained across browser sessions
- **Protected Routes**: Authentication required for sensitive actions
- **Smart Redirects**: Users redirected to intended page after login

### 👤 **User Management**
- **User-Specific Data**: Separate cart and favorites for each user
- **Data Isolation**: Complete separation between user accounts
- **Session Management**: Secure token-based session handling
- **Logout Cleanup**: All user data cleared on logout

### 🛒 **Shopping Features**
- **Smart Cart**: Add products with automatic quantity management
- **Favorites System**: Heart-based favorites with persistent storage
- **Price Calculations**: Subtotal, tax (8%), and shipping calculations
- **Free Shipping**: Automatic free shipping over $50

### 🎨 **Modern UI/UX**
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Loading States**: Skeleton UI and shimmer effects
- **Interactive Elements**: Smooth hover effects and transitions
- **Login Modals**: Contextual authentication prompts
- **Error Handling**: User-friendly error messages

### ⚡ **Performance Optimizations**
- **SSR/CSR Hybrid**: Server-side rendering for SEO, client-side for interactivity
- **Image Optimization**: Next.js Image component with lazy loading
- **API Caching**: 5-minute cache for product data
- **Code Splitting**: Automatic route-based code splitting
- **Memoization**: Optimized filtering and search performance



## 🔑 **Authentication Credentials**

### **Test Users:**
#### javascript
// User 1 - Has pre-loaded favorites and cart
- Email: test1@example.com
- Password: 123456

// User 2 - Different set of favorites and cart
- Email: test2@example.com  
- Password: abcdef




## 🛠️ **Tech Stack**

| Technology                    | Purpose                             | Version             |
|_______________________________|_____________________________________|_____________________|
- | **Next.js**                 | React framework with App Router     | 15.1.3              |
- | **React**                   | Component-based UI library          | 18+                 |
- | **JavaScript**              | Primary programming language        | ES2022              |
- | **TailwindCSS**             | Utility-first CSS framework         | 3.4+                |
- | **JWT**                     | Secure authentication tokens        | 9.0+                |
- | **Context API**             | Global state management             | Built-in            |
- | **Zustand**                 | Lightweight state management        | Latest              |
- | **Jest**                    | Unit testing framework              | 29.7+               |
- | **React Testing Library**   | Component testing utilities         | 14.1+               |
- | **Lucide React**            | Beautiful icon library              | Latest              |



## 🏗️ **Architecture Overview**

### **System Design:**

┌─────────────────────────────────────────────────────────────┐

│                    PRESENTATION LAYER                       │

├─────────────────────────────────────────────────────────────┤

│  Components → Pages → Layouts → Authentication UI          │

└─────────────────────────────────────────────────────────────┘

                              ↕

┌─────────────────────────────────────────────────────────────┐

│                  AUTHENTICATION LAYER                       │

├─────────────────────────────────────────────────────────────┤

│  JWT Tokens → Context API → Protected Routes               │

└─────────────────────────────────────────────────────────────┘

                              ↕

┌─────────────────────────────────────────────────────────────┐

│                  STATE MANAGEMENT LAYER                     │

├─────────────────────────────────────────────────────────────┤

│  Zustand Store → Context API → JWT Tokens                   │

└─────────────────────────────────────────────────────────────┘

                              ↕

┌─────────────────────────────────────────────────────────────┐

│                    DATA ACCESS LAYER                        │

├─────────────────────────────────────────────────────────────┤

│  Mock APIs → JSON Files → External API (Fake Store)        │

└─────────────────────────────────────────────────────────────┘



### **Authentication Flow:**


User Login → JWT Generation → Token Storage → API Requests

     ↓              ↓              ↓              ↓

Credentials → Server Validation → localStorage → Bearer Header

     ↓              ↓              ↓              ↓

Mock Users → Token Signing → Persistence → Protected Routes





## 📁 **Project Structure**


product-catalog-app/

├── 📁 app/                          # Next.js App Router

│   ├── 📁 api/                      # JWT Authentication APIs

│   │   ├── 📁 login/                # POST /api/login

│   │   ├── 📁 me/                   # GET /api/me

│   │   ├── 📁 user-data/            # GET /api/user-data

│   │   ├── 📁 favorite/             # POST /api/favorite

│   │   └── 📁 cart/                 # POST /api/cart

│   ├── 📁 components/               # Reusable UI Components

│   │   ├── 📄 Navigation.js         # Top nav with auth state

│   │   ├── 📄 ProductCard.js        # Product display with login protection

│   │   ├── 📄 LoginModal.js         # Contextual login popup

│   │   ├── 📄 SearchBar.js          # Real-time search

│   │   ├── 📄 CategoryFilter.js     # Category filtering

│   │   ├── 📄 ProductGridSkeleton.js # Loading skeleton UI

│   │   └── 📄 LogoutConfirmModal.js # Logout confirmation

│   ├── 📁 contexts/                 # Global State Management

│   │   ├── 📄 AuthContext.js        # JWT authentication state

│   │   └── 📄 CartContext.js        # Cart and favorites with API integration

│   ├── 📁 lib/                      # Utility Functions

│   │   ├── 📄 products.js           # Fake Store API integration

│   │   ├── 📄 jwt.js                # JWT token utilities

│   │   └── 📄 mockData.js           # JSON file operations

│   ├── 📁 product/[id]/             # Dynamic Product Routes

│   │   ├── 📄 page.js               # SSR product details

│   │   └── 📄 ProductActions.js     # Add to cart/favorites

│   ├── 📁 cart/                     # Shopping Cart

│   │   └── 📄 page.js               # Cart management with calculations

│   ├── 📁 favorites/                # Favorites Management

│   │   └── 📄 page.js               # User favorites with API integration

│   ├── 📁 login/                    # Authentication

│   │   └── 📄 page.js               # JWT login form

│   ├── 📄 layout.js                 # Root layout with providers

│   ├── 📄 page.js                   # Home page with CSR

│   └── 📄 globals.css               # TailwindCSS styles

├── 📁 mock-data/                    # JSON Data Storage

│   ├── 📄 mock-users.json           # User credentials and profiles

│   ├── 📄 mock-favorites.json       # User-specific favorite products

│   └── 📄 mock-cart.json            # User-specific cart items

├── 📁 __tests__/                    # Unit Tests

│   ├── 📁 components/               # Component tests

│   ├── 📁 contexts/                 # Context tests

│   ├── 📁 lib/                      # Utility tests

│   └── 📁 api/                      # API route tests

├── 📄 jest.config.js                # Jest configuration

├── 📄 jest.setup.js                 # Test setup and mocks

├── 📄 package.json                  # Dependencies and scripts

└── 📄 README.md                     # Project documentation




## 🚀 **Installation & Setup**

### **Prerequisites:**
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher
- **Git**: For version control

### **Step-by-Step Installation:**

#### **1. Clone Repository**

git clone https://github.com/your-username/product-catalog-jwt.git

cd product-catalog-jwt


#### **2. Install Dependencies**

npm install


#### **3. Environment Setup (Optional)** [Not Implimented]

##### Create .env.local file

echo "JWT_SECRET=your-super-secret-jwt-key-change-in-production" > .env.local

echo "NEXT_PUBLIC_API_URL=https://fakestoreapi.com" >> .env.local


#### **4. Start Development Server**

npm run dev

#### **5. Build for Production**

npm run build

npm start


____________________________

## 🔐 Authentication System

### JWT Implementation

#### javascript
// Token Generation (lib/jwt.js)

export function signToken(payload) {

  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })

}

// Token Verification

export function verifyToken(token) {

  try {

    return jwt.verify(token, JWT_SECRET)

  } catch (error) {

    return null

  }

}

____________________________

### API Endpoints:

#### **POST /api/login**
#### javascript
// Request

{

  "email": "test1@example.com",

  "password": "123456"

}

// Response

{

  "success": true,

  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",

  "user": {

    "id": "user_1",

    "email": "test1@example.com",

    "name": "John Doe"

  }

}


#### **GET /api/me**
#### javascript
// Headers
Authorization: Bearer <jwt-token>

// Response

{

  "success": true,

  "user": {

    "id": "user_1",

    "email": "test1@example.com",

    "name": "John Doe"

  }

}


#### **GET /api/user-data**
#### javascript
// Headers

Authorization: Bearer <jwt-token>

// Response

{

  "success": true,

  "data": {

    "favorites": ["1", "3", "5"], 

    "cart": [

      { "productId": "1", "quantity": 2, "product": {...} }

    ]

  }

}

_____________________

### **Protected Route Implementation:**
#### javascript
// Middleware pattern for API protection

const token = getTokenFromRequest(request)

const decoded = verifyToken(token)


if (!decoded) {

  return NextResponse.json(

    { success: false, error: 'Invalid token' }, 

    { status: 401 }

  )

}


____________________________

## 🧪 **Testing**

### **Test Coverage:**
- ✅ **Component Tests**: UI components and user interactions
- ✅ **Context Tests**: Authentication and cart state management
- ✅ **API Tests**: JWT authentication and data endpoints
- ✅ **Utility Tests**: JWT functions and mock data operations


## 📊 **Performance Metrics**

### **Optimization Techniques:**
- **Image Optimization**: Next.js Image component with WebP conversion
- **Code Splitting**: Automatic route-based splitting
- **API Caching**: 5-minute TTL for product data
- **Memoization**: React.useMemo for expensive operations
- **Lazy Loading**: Images and components loaded on demand



## 🔄 **Data Flow Architecture**

### **Authentication Flow:**

1. User enters credentials → Login form
2. Form submits → POST /api/login
3. Server validates → JWT token generated
4. Token stored → localStorage
5. Context updated → User state set
6. API requests → Bearer token in headers
7. Server validates → Protected data returned


### **Cart/Favorites Flow:**

1. User action → Add to cart/favorites
2. Check auth → JWT token validation
3. API call → POST /api/cart or /api/favorite
4. Server updates → JSON file modification
5. Response → Updated data returned
6. Zustand store update → UI re-renders
7. Persistence → Data saved per user


## 🙋‍♂️ **Author**

**Your Name**
- Shahadat Hossain
- 💼 [LinkedIn](https://linkedin.com/in/shahadat-hossain-raiyan)
- 📧 [your.email@example.com](mailto:shraiyan47@gmail.com)
- 🐙 [GitHub](https://github.com/shraiyan47)


