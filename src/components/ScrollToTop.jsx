import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * This component automatically scrolls the window to the top
 * on every route change with a smooth animation.
 */
function ScrollToTop() {
  // Extracts pathname property from location object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    try {
      // --- UPDATED: Use the object-based syntax for smooth scrolling ---
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (e) {
      // Fallback for older browsers that don't support the object-based syntax
      console.log(e);
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // This component does not render anything to the DOM
  return null;
}

export default ScrollToTop;
