import { useState, useEffect, useCallback } from 'react';

// Default visibility configurations
const DEFAULT_SECTION_VISIBILITY = {
  header: true,
  about: true,
  whyChooseUs: true,
  testimonial: true,
  services: true,
  training: true,
  team: true,
  contact: true,
  faq: true,
  footer: true
};

const DEFAULT_NAV_LINK_VISIBILITY = {
  home: true,
  about: true,
  whyChoose: true,
  services: true,
  training: true,
  team: true,
  contact: true,
  training: true,
  faq: true
};

// Storage keys
const STORAGE_KEYS = {
  SECTION_VISIBILITY: 'sectionVisibility',
  NAV_LINK_VISIBILITY: 'navLinkVisibility'
};

// Helper functions
const loadFromStorage = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.warn(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save ${key} to localStorage:`, error);
  }
};

export const useVisibilityManager = () => {
  // State management
  const [sectionVisibility, setSectionVisibility] = useState(() => 
    loadFromStorage(STORAGE_KEYS.SECTION_VISIBILITY, DEFAULT_SECTION_VISIBILITY)
  );
  
  const [navLinkVisibility, setNavLinkVisibility] = useState(() => 
    loadFromStorage(STORAGE_KEYS.NAV_LINK_VISIBILITY, DEFAULT_NAV_LINK_VISIBILITY)
  );

  // Toggle functions
  const toggleSection = useCallback((sectionName) => {
    setSectionVisibility(prev => {
      const newState = { ...prev, [sectionName]: !prev[sectionName] };
      saveToStorage(STORAGE_KEYS.SECTION_VISIBILITY, newState);
      return newState;
    });
  }, []);

  const toggleNavLink = useCallback((linkName) => {
    setNavLinkVisibility(prev => {
      const newState = { ...prev, [linkName]: !prev[linkName] };
      saveToStorage(STORAGE_KEYS.NAV_LINK_VISIBILITY, newState);
      return newState;
    });
  }, []);

  // Bulk operations for sections
  const showAllSections = useCallback(() => {
    const allVisible = Object.keys(DEFAULT_SECTION_VISIBILITY).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setSectionVisibility(allVisible);
    saveToStorage(STORAGE_KEYS.SECTION_VISIBILITY, allVisible);
  }, []);

  const hideAllSections = useCallback(() => {
    const allHidden = Object.keys(DEFAULT_SECTION_VISIBILITY).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setSectionVisibility(allHidden);
    saveToStorage(STORAGE_KEYS.SECTION_VISIBILITY, allHidden);
  }, []);

  // Bulk operations for nav links
  const showAllNavLinks = useCallback(() => {
    const allVisible = Object.keys(DEFAULT_NAV_LINK_VISIBILITY).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setNavLinkVisibility(allVisible);
    saveToStorage(STORAGE_KEYS.NAV_LINK_VISIBILITY, allVisible);
  }, []);

  const hideAllNavLinks = useCallback(() => {
    const allHidden = Object.keys(DEFAULT_NAV_LINK_VISIBILITY).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});
    setNavLinkVisibility(allHidden);
    saveToStorage(STORAGE_KEYS.NAV_LINK_VISIBILITY, allHidden);
  }, []);

  // Reset functions
  const resetToDefaults = useCallback(() => {
    setSectionVisibility(DEFAULT_SECTION_VISIBILITY);
    setNavLinkVisibility(DEFAULT_NAV_LINK_VISIBILITY);
    saveToStorage(STORAGE_KEYS.SECTION_VISIBILITY, DEFAULT_SECTION_VISIBILITY);
    saveToStorage(STORAGE_KEYS.NAV_LINK_VISIBILITY, DEFAULT_NAV_LINK_VISIBILITY);
  }, []);

  // Computed values
  const visibleSectionsCount = Object.values(sectionVisibility).filter(Boolean).length;
  const totalSectionsCount = Object.keys(DEFAULT_SECTION_VISIBILITY).length;
  const visibleNavLinksCount = Object.values(navLinkVisibility).filter(Boolean).length;
  const totalNavLinksCount = Object.keys(DEFAULT_NAV_LINK_VISIBILITY).length;

  return {
    // State
    sectionVisibility,
    navLinkVisibility,
    
    // Actions
    toggleSection,
    toggleNavLink,
    showAllSections,
    hideAllSections,
    showAllNavLinks,
    hideAllNavLinks,
    resetToDefaults,
    
    // Computed values
    visibleSectionsCount,
    totalSectionsCount,
    visibleNavLinksCount,
    totalNavLinksCount,
    
    // Constants
    DEFAULT_SECTION_VISIBILITY,
    DEFAULT_NAV_LINK_VISIBILITY
  };
};
