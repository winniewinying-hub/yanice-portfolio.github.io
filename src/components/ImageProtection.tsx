'use client';

import { useEffect, useState } from 'react';

/**
 * ImageProtection Client Component (with Admin Bypass)
 * 
 * Prevents right-clicking on images and dragging for standard users.
 * Bypass (Desktop): Set localStorage.setItem('yannice_admin', 'true') to unlock.
 * Bypass (Mobile/General): Visit URL with ?yannice_pass=open to unlock.
 */
export default function ImageProtection() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check for authorization locally OR via URL param
    const checkAuth = () => {
      // 1. Check URL parameters first (useful for mobile)
      const params = new URLSearchParams(window.location.search);
      if (params.get('yannice_pass') === 'open') {
        localStorage.setItem('yannice_admin', 'true');
        // Clear param from URL to keep it clean
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      } else if (params.get('yannice_pass') === 'lock') {
        localStorage.removeItem('yannice_admin');
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      }

      // 2. Resolve final status
      const auth = localStorage.getItem('yannice_admin') === 'true';
      setIsAuthorized(auth);
      
      if (auth) {
        document.body.classList.add('allow-download');
      } else {
        document.body.classList.remove('allow-download');
      }
    };

    checkAuth();

    // Listen for storage changes
    window.addEventListener('storage', checkAuth);

    const handleContextMenu = (e: MouseEvent) => {
      // If authorized, allow.
      if (localStorage.getItem('yannice_admin') === 'true') return;

      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (localStorage.getItem('yannice_admin') === 'true') return;
      
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('storage', checkAuth);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return null;
}
