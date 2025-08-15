// Add to Dashboard.js - force refresh when returning from journal
const refreshStats = () => {
  fetchUserStats();
};

// Add this to useEffect
useEffect(() => {
  if (user && token) {
    fetchUserStats();
    const interval = setInterval(fetchUserStats, 30000);
    
    // Listen for storage events (when user navigates back)
    const handleStorageChange = () => {
      fetchUserStats();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', fetchUserStats);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', fetchUserStats);
    };
  }
}, [user, token]);
