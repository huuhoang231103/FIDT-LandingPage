# FIDT Landing Page - Project Structure

## 📋 Overview

This project is a modern landing page application with a React frontend and PHP backend, featuring contact form functionality with email sending and Google Sheets integration.

## 🏗️ Architecture

```
FIDT-LandingPage/
├── frontend/                 # React frontend application
├── backend/                  # PHP backend API
├── docs/                     # Documentation files
├── scripts/                  # Build and deployment scripts
└── README.md                 # Main project documentation
```

## 📁 Frontend Structure

### Core Files
```
frontend/
├── public/                   # Static assets
│   ├── index.html           # Main HTML template
│   └── vite.svg             # Vite logo
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── common/          # Reusable components
│   │   ├── layout/          # Layout components
│   │   ├── popup/           # Modal/popup components
│   │   └── sections/        # Page section components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── constants/           # Application constants
│   ├── types/               # TypeScript definitions
│   ├── assets/              # Images and media
│   ├── styles/              # Global styles
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global CSS
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── eslint.config.js         # ESLint configuration
```

### Component Organization

#### Common Components (`src/components/common/`)
- `Header.jsx` - Navigation header with responsive design
- `Footer.jsx` - Site footer with links and information
- `ServiceCard.jsx` - Reusable service display card
- `TrainingCard.jsx` - Reusable training course card
- `FreeServiceCard.jsx` - Free service promotion card
- `EditButton.jsx` - Edit functionality button
- `Toast.jsx` - Notification toast component
- `Popup_Login.jsx` - Login modal component
- `PopupEditService.jsx` - Service edit modal
- `PopupEditFaq.jsx` - FAQ edit modal
- `SocialButton.jsx` - Social media buttons
- `SectionVisibilityToggle.jsx` - Section visibility controls

#### Layout Components (`src/components/layout/`)
- `PageLayout.jsx` - Main page layout wrapper

#### Section Components (`src/components/sections/`)
- `Hero.jsx` - Hero section with call-to-action
- `About.jsx` - About us section
- `ProjectsServices.jsx` - Services showcase section
- `FreeServicesSection.jsx` - Free services promotion
- `Training.jsx` - Training courses section
- `Team.jsx` - Team members section
- `Testimonial.jsx` - Customer testimonials
- `FAQ.jsx` - Frequently asked questions
- `Contact.jsx` - Contact form section
- `WhyChooseUs.jsx` - Why choose us section

#### Popup Components (`src/components/popup/`)
- `LoadingPopup.jsx` - Loading overlay component

### Custom Hooks (`src/hooks/`)
- `useAuthManager.js` - Authentication state management
- `useServicesAPI.js` - Services API integration
- `useTrainingsAPI.js` - Trainings API integration
- `useFaqsAPI.js` - FAQs API integration
- `useVisibilityManager.js` - Section visibility management

### Services (`src/services/`)
- `sendMail.js` - Contact form submission service
- `apiService.js` - Base API service with error handling

## 📁 Backend Structure

### Core Files
```
backend/
├── api/                     # API endpoints
│   ├── contact/            # Contact form endpoints
│   │   └── send.php        # Contact form submission
│   ├── services/           # Services management
│   ├── faq/               # FAQ management
│   └── trainings/         # Training management
├── config/                # Configuration files
│   ├── database.php       # Database configuration
│   └── app.php           # Application settings
├── services/              # Business logic services
│   ├── mail/             # Email services
│   │   └── ContactMailService.php
│   ├── sheets/           # Google Sheets integration
│   │   └── GoogleSheetsService.php
│   └── auth/             # Authentication services
├── utils/                 # Utility functions
│   ├── ResponseHandler.php
│   └── Validator.php
├── datas/                 # Static data files
│   ├── DataService.json
│   ├── faqData.json
│   └── trainings.json
├── vendor/                # Composer dependencies
├── tests/                 # Test files
├── logs/                  # Application logs
├── composer.json          # PHP dependencies
└── .env                   # Environment variables
```

### Service Classes

#### Mail Service (`services/mail/`)
- `ContactMailService.php` - Handles email sending with HTML formatting
  - Professional email templates
  - HTML formatting with tables
  - Error handling and logging
  - Configuration validation

#### Google Sheets Service (`services/sheets/`)
- `GoogleSheetsService.php` - Manages Google Sheets integration
  - HTTP requests to Google Apps Script
  - Data formatting and validation
  - Error handling and retry logic
  - Connection testing

#### Authentication Service (`services/auth/`)
- User authentication and authorization
- Session management
- Security validation

### Utility Classes

#### Response Handler (`utils/ResponseHandler.php`)
- Consistent API response formatting
- Error handling and status codes
- CORS headers management
- Request logging

#### Validator (`utils/Validator.php`)
- Form data validation
- Input sanitization
- Vietnamese-specific validation rules
- Error message localization

### API Endpoints

#### Contact Form (`api/contact/`)
- `POST /api/contact/send` - Submit contact form
  - Validates form data
  - Sends email notification
  - Updates Google Sheets
  - Returns success/error response

#### Services (`api/services/`)
- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `PUT /api/services/{id}` - Update service
- `DELETE /api/services/{id}` - Delete service

#### FAQ (`api/faq/`)
- `GET /api/faq` - Get all FAQs
- `POST /api/faq` - Create new FAQ
- `PUT /api/faq/{id}` - Update FAQ
- `DELETE /api/faq/{id}` - Delete FAQ

#### Trainings (`api/trainings/`)
- `GET /api/trainings` - Get all trainings
- `POST /api/trainings` - Create new training
- `PUT /api/trainings/{id}` - Update training
- `DELETE /api/trainings/{id}` - Delete training

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost/backend/api
VITE_APP_NAME=FIDT Landing Page
VITE_APP_VERSION=1.0.0
```

#### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_NAME=your_database
DB_USER=your_username
DB_PASS=your_password

# Email
MAIL_TO=your-email@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password

# Google Sheets
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Application
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
```

## 🚀 Development Workflow

### Frontend Development
1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Build for production: `npm run build`
4. Preview production build: `npm run preview`

### Backend Development
1. Install dependencies: `composer install`
2. Configure environment variables
3. Set up database connection
4. Configure email settings
5. Deploy Google Apps Script

### Code Standards

#### Frontend
- ESLint for code linting
- Prettier for code formatting
- React best practices
- Component documentation
- TypeScript for type safety

#### Backend
- PSR-12 coding standards
- PHPDoc documentation
- Error handling and logging
- Security best practices
- Input validation and sanitization

## 📊 Features

### Frontend Features
- Responsive design (mobile-first)
- Modern UI with Tailwind CSS
- Form validation and error handling
- Loading states and user feedback
- Toast notifications
- Modal dialogs
- Section visibility management
- API integration

### Backend Features
- RESTful API endpoints
- Email sending with HTML formatting
- Google Sheets integration
- Form validation and sanitization
- Error handling and logging
- CORS support
- Security measures

### Integration Features
- Contact form submission
- Email notifications
- Google Sheets data storage
- Real-time validation
- User feedback system

## 🛡️ Security

### Frontend Security
- Input validation
- XSS prevention
- CSRF protection
- Secure API communication

### Backend Security
- Input sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting
- Error handling

## 📝 Documentation

### Code Documentation
- JSDoc comments for JavaScript/React
- PHPDoc comments for PHP
- README files for each component
- API documentation

### User Documentation
- Setup guides
- Configuration instructions
- Deployment guides
- Troubleshooting guides

## 🧪 Testing

### Frontend Testing
- Unit tests for components
- Integration tests for API calls
- E2E tests for user flows

### Backend Testing
- Unit tests for services
- API endpoint tests
- Integration tests

## 📈 Performance

### Frontend Optimization
- Code splitting
- Lazy loading
- Image optimization
- Bundle size optimization

### Backend Optimization
- Database query optimization
- Caching strategies
- Response compression
- Error handling efficiency

## 🔄 Deployment

### Frontend Deployment
- Build optimization
- Static asset optimization
- CDN integration
- Environment configuration

### Backend Deployment
- Server configuration
- Database setup
- Email service configuration
- Google Apps Script deployment

## 📞 Support

For questions and support:
- Check documentation in `/docs` folder
- Review README files
- Check code comments
- Contact development team
