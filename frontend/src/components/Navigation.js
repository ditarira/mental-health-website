import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1200);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1200);
    };
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Add animations and fonts
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');

      @keyframes brainFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-6px) rotate(5deg); }
      }

      @keyframes slideLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .brain-animate {
        animation: brainFloat 3s ease-in-out infinite;
        filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
      }

      .mobile-menu {
        animation: slideLeft 0.3s ease-out;
      }

      .mindful-logo {
        font-family: 'Poppins', sans-serif;
        font-weight: 800;
        letter-spacing: -1px;
      }

      .nav-text {
        font-family: 'Inter', sans-serif;
      }

      .profile-hover {
        transition: all 0.3s ease;
      }

      .profile-hover:hover {
        background: rgba(102, 126, 234, 0.15) !important;
        transform: translateY(-1px);
      }

      .profile-hover:active {
        background: rgba(102, 126, 234, 0.2) !important;
        transform: translateY(0px);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const navigationItems = [
    { id: "dashboard", name: "Dashboard", icon: "🏠", path: "/dashboard" },
    { id: "journal", name: "Journal", icon: "📝", path: "/journal" },
    { id: "breathing", name: "Breathing", icon: "🧘", path: "/breathing" },
    { id: "resources", name: "Resources", icon: "📚", path: "/resources" },
    { id: "settings", name: "Settings", icon: "⚙️", path: "/settings" }
  ];

  if (user?.role === "ADMIN") {
    navigationItems.push({ id: "admin", name: "Admin", icon: "👑", path: "/admin" });
  }

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowMobileMenu(false);
  };

  // Handle mobile profile click
  const handleMobileProfileClick = () => {
    navigate("/settings");
    setShowMobileMenu(false);
  };

  // Handle logo click
  const handleLogoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isMobile) {
      navigate("/dashboard");
    }
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMobileMenu(prev => !prev);
  };

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: isMobile ? "0.5rem 1rem" : isTablet ? "0.5rem 1rem" : "0.5rem 1.5rem",
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(25px)",
        boxShadow: "0 8px 32px rgba(102, 126, 234, 0.12)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        minHeight: isMobile ? "60px" : isTablet ? "60px" : "60px",
        maxWidth: "100vw",
        overflow: "hidden"
      }}>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0" : isTablet ? "0.6rem" : "0.8rem",
            cursor: isMobile ? "default" : "pointer",
            transition: "all 0.3s ease"
          }}
          onClick={handleLogoClick}
        >
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: isMobile ? "40px" : isTablet ? "40px" : "45px",
            height: isMobile ? "40px" : isTablet ? "40px" : "45px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: isMobile ? "16px" : "16px",
            boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)"
          }}>
            <span className="brain-animate" style={{
              fontSize: isMobile ? "1.5rem" : isTablet ? "1.5rem" : "1.8rem",
              color: "white"
            }}>
              🧠
            </span>
          </div>
          {/* Show text only on desktop */}
          {!isMobile && !isTablet && (
            <span className="mindful-logo" style={{
              fontSize: "1.5rem",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 4px rgba(102, 126, 234, 0.1)"
            }}>
              MindfulMe
            </span>
          )}
        </div>

        {/* Tablet & Desktop Navigation */}
        {!isMobile && (
          <div style={{
            display: "flex",
            gap: isTablet ? "0.3rem" : "0.5rem",
            alignItems: "center",
            background: "rgba(102, 126, 234, 0.05)",
            padding: isTablet ? "0.8rem 1rem" : "0.7rem 1.2rem",
            borderRadius: "18px",
            border: "1px solid rgba(102, 126, 234, 0.1)",
            flex: 1,
            justifyContent: "center",
            width: "100%",
            maxWidth: isTablet ? "350px" : "750px"
          }}>
            {navigationItems.map(item => (
              <button
                key={item.id}
                className="nav-text"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isTablet ? "0" : "0.4rem",
                  padding: isTablet ? "0.6rem 0.8rem" : "0.5rem 0.8rem",
                  background: isActive(item.path)
                    ? "linear-gradient(135deg, #667eea, #764ba2)"
                    : "transparent",
                  color: isActive(item.path) ? "white" : "#667eea",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  fontSize: isTablet ? "0.85rem" : "0.85rem",
                  fontWeight: "600",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isActive(item.path)
                    ? "0 8px 25px rgba(102, 126, 234, 0.3)"
                    : "none",
                  transform: isActive(item.path) ? "translateY(-2px)" : "none",
                  minWidth: isTablet ? "48px" : "auto"
                }}
                onClick={() => navigate(item.path)}
              >
                <span style={{ fontSize: isTablet ? "1.3rem" : "1.2rem" }}>{item.icon}</span>
                {!isTablet && window.innerWidth > 1366 && <span>{item.name}</span>}
              </button>
            ))}
          </div>
        )}

        {/* Right Section */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "0.8rem" : isTablet ? "0.8rem" : "0.8rem",
          position: "relative"
        }}>
          {/* Mobile Hamburger Menu Button */}
          {isMobile && (
            <button
              style={{
                width: "42px",
                height: "42px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                fontSize: "1.2rem",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1001,
                position: "relative"
              }}
              onClick={toggleMobileMenu}
            >
              {showMobileMenu ? "✕" : "☰"}
            </button>
          )}

          {/* Desktop & Tablet User Profile & Logout */}
          {!isMobile && (
            <>
              <div
                className="nav-text"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: isTablet ? "0.3rem" : "0.4rem",
                  padding: isTablet ? "0.4rem 0.6rem" : "0.4rem 0.6rem",
                  background: "rgba(102, 126, 234, 0.08)",
                  border: "1px solid rgba(102, 126, 234, 0.2)",
                  borderRadius: "18px",
                  color: "#667eea",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                  maxWidth: isTablet ? "80px" : "150px"
                }}
                onClick={() => navigate("/settings")}
              >
                <div style={{
                  width: isTablet ? "24px" : "26px",
                  height: isTablet ? "24px" : "26px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6rem",
                  fontWeight: "700",
                  flexShrink: 0,
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
                }}>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </div>
                {!isTablet && (
                  <div style={{ minWidth: 0, overflow: "hidden" }}>
                    <div style={{
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "#667eea"
                    }}>
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div style={{
                      fontSize: "0.55rem",
                      opacity: 0.7,
                      whiteSpace: "nowrap",
                      color: "#667eea",
                      fontWeight: "500"
                    }}>
                      {user?.role === "ADMIN" ? "Admin" : "Member"}
                    </div>
                  </div>
                )}
              </div>

              <button
                className="nav-text"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  padding: "0.5rem 0.8rem",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
                  flexShrink: 0,
                  whiteSpace: "nowrap"
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && isMobile && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 4999,
              background: "rgba(0, 0, 0, 0.3)"
            }}
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Menu */}
          <div
            className="mobile-menu"
            style={{
              position: "fixed",
              top: "70px",
              left: "1rem",
              right: "1rem",
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(25px)",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(102, 126, 234, 0.2)",
              padding: "1.5rem",
              zIndex: 5000,
              border: "1px solid rgba(102, 126, 234, 0.1)"
            }}
          >
            {/* Enhanced Clickable User Profile in Mobile Menu */}
            <div 
              className="profile-hover"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "rgba(102, 126, 234, 0.08)",
                borderRadius: "15px",
                marginBottom: "1rem",
                border: "1px solid rgba(102, 126, 234, 0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative"
              }}
              onClick={handleMobileProfileClick}
            >
              <div style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: "700",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
              }}>
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "#667eea"
                }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div style={{
                  fontSize: "0.8rem",
                  opacity: 0.7,
                  color: "#667eea",
                  fontWeight: "500"
                }}>
                  {user?.role === "ADMIN" ? "Administrator" : "Member"} • Tap to edit
                </div>
              </div>
              <div style={{
                fontSize: "1.2rem",
                color: "#667eea",
                opacity: 0.5,
                transition: "all 0.3s ease"
              }}>
                ⚙️
              </div>
            </div>

            {/* Navigation Items */}
            {navigationItems.map(item => (
              <button
                key={item.id}
                className="nav-text"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  width: "100%",
                  padding: "1rem",
                  background: isActive(item.path)
                    ? "linear-gradient(135deg, #667eea, #764ba2)"
                    : "transparent",
                  color: isActive(item.path) ? "white" : "#667eea",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                  transition: "all 0.3s ease",
                  boxShadow: isActive(item.path)
                    ? "0 6px 20px rgba(102, 126, 234, 0.3)"
                    : "none"
                }}
                onClick={() => {
                  navigate(item.path);
                  setShowMobileMenu(false);
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}

            {/* Logout Button in Mobile Menu */}
            <button
              className="nav-text"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "600",
                marginTop: "0.5rem",
                transition: "all 0.3s ease",
                boxShadow: "0 6px 20px rgba(239, 68, 68, 0.3)"
              }}
              onClick={handleLogout}
            >
              <span style={{ fontSize: "1.3rem" }}>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;