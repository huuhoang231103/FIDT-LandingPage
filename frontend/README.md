# Frontend Application Documentation

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── index.html         # Main HTML file
│   └── vite.svg           # Vite logo
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── common/        # Reusable components
│   │   ├── layout/        # Layout components
│   │   ├── popup/         # Modal/popup components
│   │   └── sections/      # Page section components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── constants/         # Application constants
│   ├── types/             # TypeScript type definitions
│   ├── assets/            # Images and other assets
│   ├── styles/            # Global styles
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global CSS
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── eslint.config.js       # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost/backend/api
VITE_APP_NAME=FIDT Landing Page
VITE_APP_VERSION=1.0.0
```

## 🧩 Component Architecture

### Common Components
- `Header.jsx` - Navigation header
- `Footer.jsx` - Site footer
- `ServiceCard.jsx` - Service display card
- `TrainingCard.jsx` - Training display card
- `FreeServiceCard.jsx` - Free service card
- `EditButton.jsx` - Edit functionality button
- `Toast.jsx` - Notification toast
- `Popup_Login.jsx` - Login modal
- `PopupEditService.jsx` - Service edit modal
- `PopupEditFaq.jsx` - FAQ edit modal

### Layout Components
- `PageLayout.jsx` - Main page layout wrapper

### Section Components
- `Hero.jsx` - Hero section
- `About.jsx` - About section
- `Services.jsx` - Services section
- `Trainings.jsx` - Training courses section
- `Team.jsx` - Team members section
- `Testimonial.jsx` - Customer testimonials
- `FAQ.jsx` - Frequently asked questions
- `Contact.jsx` - Contact form section
- `WhyChooseUs.jsx` - Why choose us section

### Popup Components
- `LoadingPopup.jsx` - Loading overlay

## 🔧 Custom Hooks

### Authentication
- `useAuthManager.js` - Authentication state management

### API Integration
- `useServicesAPI.js` - Services API integration
- `useTrainingsAPI.js` - Trainings API integration
- `useFaqsAPI.js` - FAQs API integration

### UI Management
- `useVisibilityManager.js` - Section visibility management

## 📡 API Services

### Contact Form
- `sendMail.js` - Contact form submission service

### Data Management
- `apiService.js` - Base API service with error handling
- `servicesService.js` - Services data management
- `trainingsService.js` - Trainings data management
- `faqsService.js` - FAQs data management

## 🎨 Styling

### CSS Framework
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom CSS** - Component-specific styles

### Design System
- Color palette defined in `tailwind.config.js`
- Typography scales
- Spacing system
- Component variants

## 📱 Responsive Design

### Breakpoints
- Mobile: `sm:` (640px+)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)
- Large Desktop: `xl:` (1280px+)

### Mobile-First Approach
- All components designed mobile-first
- Progressive enhancement for larger screens

## 🔒 Security

### Input Validation
- Client-side form validation
- XSS prevention
- CSRF protection

### API Security
- Secure API communication
- Error handling
- Rate limiting awareness

## 🧪 Testing

### Unit Testing
- Component testing with React Testing Library
- Hook testing
- Utility function testing

### Integration Testing
- API integration testing
- Form submission testing

## 📊 Performance

### Optimization
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization

### Monitoring
- Performance metrics
- Error tracking
- User analytics

## 🚀 Deployment

### Build Process
1. `npm run build` - Create production build
2. `npm run preview` - Preview production build
3. Deploy to hosting service

### Environment Configuration
- Development: `.env.development`
- Production: `.env.production`
- Staging: `.env.staging`

## 📝 Code Standards

### ESLint Configuration
- React best practices
- JavaScript standards
- Import/export rules

### Prettier Configuration
- Code formatting
- Consistent style

### Git Hooks
- Pre-commit linting
- Code formatting
- Type checking

## 🔄 State Management

### Local State
- React useState for component state
- React useReducer for complex state

### Global State
- Context API for theme/auth
- Local storage for persistence

## 📦 Dependencies

### Core Dependencies
- React 18+
- Vite - Build tool
- Tailwind CSS - Styling

### Development Dependencies
- ESLint - Code linting
- Prettier - Code formatting
- PostCSS - CSS processing

## 🐛 Debugging

### Development Tools
- React Developer Tools
- Browser DevTools
- Vite DevTools

### Error Handling
- Error boundaries
- Error logging
- User-friendly error messages
