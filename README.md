# FIDT Landing Page - Clean & Organized Architecture

A modern, clean, and maintainable landing page with comprehensive content management capabilities.

## 🏗️ Architecture Overview

### Frontend Architecture

```
frontend/
├── src/
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuthManager.js     # Authentication state management
│   │   ├── useVisibilityManager.js # Section/link visibility management
│   │   ├── useServicesAPI.js     # Services API integration
│   │   ├── useTrainingsAPI.js    # Trainings API integration
│   │   └── useFaqsAPI.js        # FAQs API integration
│   ├── components/
│   │   ├── common/               # Reusable components
│   │   │   ├── Toast.jsx         # Notification component
│   │   │   ├── MinimalAuthButton.jsx # Fallback auth button
│   │   │   ├── EditButton.jsx    # Edit functionality button
│   │   │   ├── ServiceCard.jsx   # Service display card
│   │   │   ├── TrainingCard.jsx  # Training display card
│   │   │   ├── SocialButton.jsx  # Social media buttons
│   │   │   └── SectionVisibilityToggle.jsx # Visibility controls
│   │   ├── layout/               # Layout components
│   │   │   └── PageLayout.jsx    # Main page layout
│   │   ├── popup/                # Modal components
│   │   │   ├── Popup_Login.jsx   # Login modal
│   │   │   ├── PopupEditService.jsx # Service edit modal
│   │   │   └── PopupEditFaq.jsx  # FAQ edit modal
│   │   └── sections/             # Page sections
│   │       ├── Hero.jsx          # Hero section
│   │       ├── About.jsx         # About section
│   │       ├── ProjectsServices.jsx # Services section
│   │       ├── Training.jsx      # Training section
│   │       ├── Team.jsx          # Team section
│   │       ├── Contact.jsx       # Contact form
│   │       ├── FAQ.jsx           # FAQ section
│   │       └── WhyChooseUs.jsx   # Why choose us section
│   ├── services/                 # API services
│   │   └── sendMail.js           # Contact form submission
│   └── App.jsx                   # Main application component
```

### Backend Architecture

```
backend/
├── data_consolidated/            # All data files in one place
│   ├── DataService.json          # Services data
│   ├── trainings.json            # Training data
│   ├── faqData.json              # FAQ data
│   └── emails.json               # Email submissions
├── service_apis/                 # Service management APIs
│   ├── get_services.php          # Get services
│   └── update_service.php        # Update services
├── auth/                         # Authentication APIs
│   ├── login.php                 # Login endpoint
│   └── check_login.php           # Check login status
├── api/                          # Email management APIs
│   ├── send_mail.php             # Send contact form email
│   ├── get_emails_json.php       # Get email list
│   └── export_emails_json.php    # Export emails to Excel
├── services/                     # Core services
│   └── mail.php                  # Mail functions
├── trainings/                    # Training APIs
│   ├── get_trainings.php         # Get training data
│   └── update_training.php       # Update training data
├── FAQ/                          # FAQ APIs
│   ├── get_faqs.php              # Get FAQ data
│   └── update_faq.php            # Update FAQ data
└── admin/                        # Admin functionality
```

## 🚀 Key Features

### 1. **Clean State Management**
- **Custom Hooks**: Centralized state management with `useAuthManager` and `useVisibilityManager`
- **Persistence**: Automatic localStorage saving with error handling
- **Type Safety**: Consistent data structures and validation

### 2. **Modular Component Architecture**
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Common components can be used across the application
- **Maintainability**: Easy to modify and extend

### 3. **Comprehensive Visibility Control**
- **Section Management**: Show/hide entire page sections
- **Navigation Control**: Individual header link visibility
- **Persistent Settings**: All visibility preferences are saved
- **Bulk Operations**: Show/hide all sections or links at once

### 4. **Robust Backend Architecture**
- **Organized Structure**: Clean folder organization for easy maintenance
- **Centralized Data**: All data files in one location
- **API Management**: Grouped APIs by functionality
- **CORS Support**: Proper cross-origin request handling

## 🛠️ Technical Implementation

### Frontend Custom Hooks

#### `useAuthManager`
```javascript
const {
  isLoggedIn,
  isPopupOpen,
  toast,
  handleLoginSuccess,
  handleLogout,
  handleAuthClick
} = useAuthManager();
```

#### `useVisibilityManager`
```javascript
const {
  sectionVisibility,
  navLinkVisibility,
  toggleSection,
  toggleNavLink,
  showAllSections,
  hideAllSections,
  resetToDefaults
} = useVisibilityManager();
```

#### `useServicesAPI`
```javascript
const {
  paidServices,
  freeServices,
  sectionTitles,
  updateService,
  updateSectionTitles
} = useServicesAPI();
```

### Backend API Structure

#### Service Management
- `GET /service_apis/get_services.php` - Retrieve all services
- `POST /service_apis/update_service.php` - Update service data

#### Authentication
- `POST /auth/login.php` - User login
- `GET /auth/check_login.php` - Check login status

#### Email Management
- `POST /api/send_mail.php` - Send contact form email
- `GET /api/get_emails_json.php` - Get email submissions
- `GET /api/export_emails_json.php` - Export emails to Excel

## 🔧 Configuration

### Environment Setup

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=FIDT Landing Page
VITE_APP_VERSION=1.0.0
```

#### Backend Configuration
- **Server**: PHP 8.0+ Development Server
- **Port**: 8000 (configurable)
- **CORS**: Configured for localhost:5173 (frontend)

### Data Management

#### Services Data Structure
```json
{
  "section_titles": {
    "main_title": "Our Services",
    "main_subtitle": "Comprehensive financial consulting services",
    "free_services_title": "Free Consultation Package",
    "paid_services_title": "Professional Consulting Services"
  },
  "services": [...],
  "free_services": [...]
}
```

#### Training Data Structure
```json
{
  "trainingTitle": "Training Programs",
  "trainingSubtitle": "Investment & Financial Knowledge Updates",
  "trainings": [...]
}
```

## 🚀 Getting Started

### Prerequisites
- **PHP**: 8.0 or higher
- **Node.js**: 18 or higher
- **npm**: Latest version

### Installation

#### 1. Clone Repository
```bash
git clone <repository-url>
cd FIDT-LandingPage
```

#### 2. Backend Setup
```bash
cd backend
# Start PHP development server
php -S localhost:8000 -t .
```

#### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Development Workflow

#### 1. Start Backend Server
```bash
# From project root
php -S localhost:8000 -t backend
```

#### 2. Start Frontend Development Server
```bash
# From frontend directory
npm run dev
```

#### 3. Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000

## 📝 Content Management

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Edit buttons appear when logged in

### Editable Content
- **Services**: Add, edit, delete services
- **Trainings**: Manage training programs
- **FAQs**: Update frequently asked questions
- **Section Titles**: Customize page headings

### Data Persistence
- **JSON Storage**: All data stored in JSON files
- **Real-time Updates**: Changes reflect immediately
- **Backup**: Data files can be easily backed up

## 🔒 Security Features

### Authentication
- **Session-based**: Secure login system
- **Admin Only**: Edit functionality restricted to authenticated users
- **CORS Protection**: Proper cross-origin request handling

### Input Validation
- **Client-side**: React form validation
- **Server-side**: PHP input sanitization
- **XSS Prevention**: HTML escaping for user input

## 🧪 Testing

### API Testing
```bash
# Test backend connectivity
curl http://localhost:8000/test_connection.php

# Test services API
curl http://localhost:8000/service_apis/get_services.php

# Test authentication
curl http://localhost:8000/auth/check_login.php
```

### Frontend Testing
- **Component Testing**: React Testing Library
- **Hook Testing**: Custom hook validation
- **Integration Testing**: API communication

## 📊 Performance

### Optimization Features
- **Code Splitting**: Lazy loading for components
- **Image Optimization**: Optimized asset loading
- **Bundle Optimization**: Vite build optimization
- **Caching**: API response caching

### Monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance Metrics**: Load time monitoring
- **User Analytics**: Usage tracking

## 🚀 Deployment

### Production Build
```bash
# Frontend build
cd frontend
npm run build

# Backend deployment
# Copy backend folder to server
# Configure web server (Apache/Nginx)
```

### Environment Configuration
- **Development**: `.env.development`
- **Production**: `.env.production`
- **Staging**: `.env.staging`

### Server Requirements
- **PHP**: 8.0+
- **Web Server**: Apache/Nginx
- **SSL**: HTTPS recommended
- **CORS**: Configure for production domain

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /auth/login.php
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### Check Login Status
```http
GET /auth/check_login.php
```

### Service Management

#### Get Services
```http
GET /service_apis/get_services.php
```

#### Update Service
```http
POST /service_apis/update_service.php
Content-Type: application/json

{
  "index": 0,
  "type": "services",
  "service": {
    "name": "Service Name",
    "target": "Individual",
    "price": "5,000,000 VND"
  }
}
```

### Email Management

#### Send Contact Form
```http
POST /api/send_mail.php
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+84 123 456 789",
  "email": "john@example.com",
  "service": "Financial Consultation",
  "message": "I need help with investment planning",
  "subscribe": true
}
```

#### Get Email List
```http
GET /api/get_emails_json.php?page=1&limit=20
```

## 🤝 Contributing

### Code Standards
- **ESLint**: JavaScript/React linting
- **Prettier**: Code formatting
- **PHP Standards**: PSR-12 coding standards

### Development Guidelines
1. **Feature Branches**: Create separate branches for features
2. **Code Review**: All changes require review
3. **Testing**: Test all functionality before commit
4. **Documentation**: Update README for new features

## 📞 Support

### Contact Information
- **Email**: cskh@newtoyovn.com
- **Technical Support**: Available for deployment issues
- **Documentation**: Comprehensive guides provided

### Common Issues
- **CORS Errors**: Check backend CORS configuration
- **File Permissions**: Ensure JSON files are writable
- **Port Conflicts**: Verify no other services use port 8000

## 📄 License

This project is proprietary software. All rights reserved.

---

**Last Updated**: August 2025
**Version**: 2.0.0
**Status**: Production Ready
