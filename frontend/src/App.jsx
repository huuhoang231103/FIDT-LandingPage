import React from 'react';
import { useAuthManager } from './hooks/useAuthManager';
import { useVisibilityManager } from './hooks/useVisibilityManager';
import PageLayout from './components/layout/PageLayout';
import SectionVisibilityToggle from './components/common/SectionVisibilityToggle';
import MinimalAuthButton from './components/common/MinimalAuthButton';
import Toast from './components/common/Toast';
import Popup from './components/common/Popup_Login';

const App = () => {
  // Custom hooks for clean state management
  const {
    isLoggedIn,
    isPopupOpen,
    toast,
    handleLoginSuccess,
    handleLogout,
    openLoginPopup,
    closeLoginPopup,
    handleAuthClick
  } = useAuthManager();

  const {
    sectionVisibility,
    navLinkVisibility,
    toggleSection,
    toggleNavLink,
    showAllSections,
    hideAllSections,
    showAllNavLinks,
    hideAllNavLinks,
    visibleSectionsCount,
    totalSectionsCount
  } = useVisibilityManager();

  return (
    <div className="min-h-screen">
      {/* Toast notifications */}
      <Toast show={toast.show} message={toast.message} />

      {/* Minimal auth button when header is hidden */}
      {!sectionVisibility.header && (
        <MinimalAuthButton
          isLoggedIn={isLoggedIn}
          onLoginClick={openLoginPopup}
          onLogoutClick={handleLogout}
        />
      )}

      {/* Main page layout */}
      <PageLayout
        isLoggedIn={isLoggedIn}
        sectionVisibility={sectionVisibility}
        navLinkVisibility={navLinkVisibility}
        onAuthClick={handleAuthClick}
      />

      {/* Section visibility toggle - only show when logged in */}
      {isLoggedIn && (
        <SectionVisibilityToggle
          sectionVisibility={sectionVisibility}
          onToggleSection={toggleSection}
          onShowAll={showAllSections}
          onHideAll={hideAllSections}
          navLinkVisibility={navLinkVisibility}
          onToggleNavLink={toggleNavLink}
          onShowAllNavLinks={showAllNavLinks}
          onHideAllNavLinks={hideAllNavLinks}
        />
      )}

      {/* Login popup */}
      <Popup
        isOpen={isPopupOpen}
        onClose={closeLoginPopup}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;