# FIDT Landing Page - Refactored Architecture

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
│   │   └── useTrainingsAPI.js    # Trainings API integration
│   ├── components/
│   │   ├── common/               # Reusable components
│   │   │   ├── Toast.jsx         # Notification component
│   │   │   ├── MinimalAuthButton.jsx # Fallback auth button
│   │   │   └── SectionVisibilityToggle.jsx # Visibility controls
│   │   ├── layout/               # Layout components
│   │   │   └── PageLayout.jsx    # Main page layout
│   │   └── sections/             # Page sections
│   └── App.jsx                   # Main application component
```

### Backend Architecture

```
backend/
├── config/
│   └── database.php              # Database configuration & file management
├── services/
│   └── DataService.php           # Centralized data operations
├── utils/
│   └── ResponseHandler.php       # Standardized API responses
├── datas/                        # JSON data files
├── trainings/                    # Training-specific endpoints
└── FAQ/                         # FAQ-specific endpoints
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
- **Service Layer**: Centralized data operations through `DataService`
- **Error Handling**: Consistent error responses and validation
- **Configuration Management**: Centralized database configuration
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

### Backend Service Layer

#### `DataService`
```php
$dataService = new DataService('services');
$data = $dataService->getAll();
$updatedData = $dataService->updateArrayItem('services', $index, $item, $isNew, $isDelete);
```

#### `ResponseHandler`
```php
ResponseHandler::success($data, 'Operation successful');
ResponseHandler::error('Operation failed', 400);
ResponseHandler::validationError($errors);
```

## 📁 File Structure

### Frontend Components

| Component | Purpose |
|-----------|---------|
| `PageLayout.jsx` | Main page layout with conditional rendering |
| `Toast.jsx` | Reusable notification component |
| `MinimalAuthButton.jsx` | Fallback auth button when header is hidden |
| `SectionVisibilityToggle.jsx` | Visibility control panel with tabs |

### Backend Services

| Service | Purpose |
|---------|---------|
| `DatabaseConfig` | File paths, default structures, data validation |
| `DataService` | CRUD operations for all data types |
| `ResponseHandler` | Standardized API responses and CORS handling |

## 🔧 Configuration

### Default Data Structures
```php
const DEFAULT_STRUCTURES = [
    'services' => [
        'services' => [],
        'free_services' => [],
        'section_titles' => [...]
    ],
    'trainings' => [
        'trainings' => [],
        'trainingTitle' => '...',
        'trainingSubtitle' => '...'
    ]
];
```

### Storage Keys
```javascript
const STORAGE_KEYS = {
    SECTION_VISIBILITY: 'sectionVisibility',
    NAV_LINK_VISIBILITY: 'navLinkVisibility',
    AUTH_TOKEN: 'token'
};
```

## 🎯 Benefits of Refactoring

### 1. **Maintainability**
- Clear separation of concerns
- Consistent code patterns
- Easy to understand and modify

### 2. **Scalability**
- Modular architecture allows easy extension
- Reusable components and services
- Centralized configuration management

### 3. **Reliability**
- Comprehensive error handling
- Data validation at multiple levels
- Graceful fallbacks for edge cases

### 4. **Developer Experience**
- Clean, readable code
- Consistent API responses
- Well-documented structure

## 🚀 Getting Started

1. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend Setup**
   ```bash
   cd backend
   php -S localhost:8000
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 🔄 Migration Guide

### From Old Architecture
1. **State Management**: Replace individual useState calls with custom hooks
2. **API Calls**: Use centralized service classes instead of direct file operations
3. **Error Handling**: Implement ResponseHandler for consistent error responses
4. **Component Structure**: Organize components into logical folders

### Benefits
- **Reduced Code Duplication**: Common functionality is centralized
- **Improved Error Handling**: Consistent error responses across all endpoints
- **Better Maintainability**: Clear structure makes debugging and updates easier
- **Enhanced User Experience**: Smooth animations and consistent UI patterns

## 📝 API Documentation

### Services API
- `GET /get_services.php` - Retrieve all services data
- `POST /update_service.php` - Update services, free services, or section titles

### Trainings API
- `GET /trainings/get_trainings.php` - Retrieve all trainings data
- `POST /trainings/update_training.php` - Update trainings or training headers

### Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on all screen sizes
- **Smooth Animations**: Framer Motion for fluid transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Visual Feedback**: Toast notifications and loading states
- **Intuitive Controls**: Clear icons and tooltips

This refactored architecture provides a solid foundation for future development while maintaining all existing functionality in a clean, maintainable codebase.
