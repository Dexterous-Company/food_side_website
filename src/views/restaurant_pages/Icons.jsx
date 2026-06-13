// pages/restaurant_pages/Icons.jsx
export const Icon = {
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  
  Grid: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  
  List: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  ),
  
  Star: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-amber-500">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  
  Check: () => (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  ),
  
  Box: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    </svg>
  ),
  
  Leaf: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
      <path d="M2 2s4 2 8 6 8 10 8 14M14 2s4 4 4 10-4 10-4 10"/>
    </svg>
  ),
  
  AllGrid: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <rect x="3" y="3" width="4" height="4"/>
      <rect x="10" y="3" width="4" height="4"/>
      <rect x="17" y="3" width="4" height="4"/>
      <rect x="3" y="10" width="4" height="4"/>
      <rect x="10" y="10" width="4" height="4"/>
      <rect x="17" y="10" width="4" height="4"/>
      <rect x="3" y="17" width="4" height="4"/>
      <rect x="10" y="17" width="4" height="4"/>
      <rect x="17" y="17" width="4" height="4"/>
    </svg>
  ),
};

// Add default export for Next.js page requirement
const IconsPage = () => {
  return <div>Icons Component - This is not a page</div>;
};

export default IconsPage;