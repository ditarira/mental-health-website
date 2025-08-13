import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showEmergencyMenu, setShowEmergencyMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
      
      @keyframes emergencyPulse {
        0%, 100% { 
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          transform: scale(1.05);
        }
      }
      
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .brain-animate { 
        animation: brainFloat 3s ease-in-out infinite;
        filter: drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3));
      }
      
      .emergency-pulse {
        animation: emergencyPulse 2s infinite;
      }
      
      .emergency-popup {
        animation: slideDown 0.3s ease-out;
      }
      
      .mindful-logo {
        font-family: 'Poppins', sans-serif;
        font-weight: 800;
        letter-spacing: -1px;
      }
      
      .nav-text {
        font-family: 'Inter', sans-serif;
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

  // Emergency functions
  const handleEmergencyCall = () => {
    window.location.href = "tel:988";
    setShowEmergencyMenu(false);
  };

  const handleEmergencyText = () => {
    window.location.href = "sms:741741";
    setShowEmergencyMenu(false);
  };

  const handleBreathingExercise = () => {
    navigate('/breathing');
    setShowEmergencyMenu(false);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isMobile ? "0.4rem 0.8rem" : "0.8rem 2rem", // Reduced mobile padding
      background: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(25px)",
      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.12)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      minHeight: isMobile ? "50px" : "70px" // Reduced mobile height
    }}>

      {/* Logo - More compact for mobile */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: isMobile ? "0.5rem" : "1rem", // Smaller gap on mobile
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onClick={() => navigate("/dashboard")}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <div style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "35px" : "55px", // Much smaller on mobile
          height: isMobile ? "35px" : "55px",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          borderRadius: isMobile ? "12px" : "18px", // Smaller border radius
          boxShadow: isMobile 
            ? "0 4px 12px rgba(102, 126, 234, 0.3)" 
            : "0 8px 24px rgba(102, 126, 234, 0.4)"
        }}>
          <span className="brain-animate" style={{ 
            fontSize: isMobile ? "1.3rem" : "2.2rem", // Much smaller emoji on mobile
            color: "white"
          }}>
            🧠
          </span>
        </div>
        <span className="mindful-logo" style={{
          fontSize: isMobile ? "1.2rem" : "2rem", // Smaller text on mobile
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 2px 4px rgba(102, 126, 234, 0.1)"
        }}>
          MindfulMe
        </span>
      </div>

      {/* Navigation */}
      {isMobile ? (
        <button
          style={{
            width: "40px", // Smaller mobile menu button
            height: "40px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            border: "none",
            borderRadius: "12px", // Smaller border radius
            cursor: "pointer",
            fontSize: "1.1rem", // Smaller icon
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
            transition: "all 0.3s ease"
          }}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
        >
          ☰
        </button>
      ) : (
        <div style={{ 
          display: "flex", 
          gap: "0.8rem", 
          alignItems: "center",
          background: "rgba(102, 126, 234, 0.05)",
          padding: "0.5rem",
          borderRadius: "25px",
          border: "1px solid rgba(102, 126, 234, 0.1)"
        }}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              className="nav-text"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                padding: "0.9rem 1.6rem",
                background: isActive(item.path)
                  ? "linear-gradient(135deg, #667eea, #764ba2)"
                  : "transparent",
                color: isActive(item.path) ? "white" : "#667eea",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: "600",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive(item.path) 
                  ? "0 8px 25px rgba(102, 126, 234, 0.3)" 
                  : "none",
                transform: isActive(item.path) ? "translateY(-2px)" : "none"
              }}
              onClick={() => navigate(item.path)}
              onMouseOver={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.background = "rgba(102, 126, 234, 0.1)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.2)";
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Right Section - More compact on mobile */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: isMobile ? "0.5rem" : "1rem", // Smaller gap on mobile
        position: "relative" 
      }}>
        {/* Emergency Button - Smaller on mobile */}
        <div style={{ position: "relative" }}>
          <button
            className="emergency-pulse"
            style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: isMobile ? "38px" : "50px", // Smaller on mobile
              height: isMobile ? "38px" : "50px",
              fontSize: isMobile ? "1rem" : "1.3rem", // Smaller emoji on mobile
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: isMobile 
                ? "0 4px 15px rgba(239, 68, 68, 0.4)" 
                : "0 6px 20px rgba(239, 68, 68, 0.4)"
            }}
            title="Emergency Support"
            onClick={() => setShowEmergencyMenu(!showEmergencyMenu)}
          >
            🚨
          </button>

          {/* Emergency Popup - Responsive sizing */}
          {showEmergencyMenu && (
            <div 
              className="emergency-popup"
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                marginTop: "0.8rem",
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                borderRadius: isMobile ? "15px" : "20px",
                boxShadow: "0 20px 60px rgba(239, 68, 68, 0.4)",
                padding: isMobile ? "1rem" : "1.5rem",
                minWidth: isMobile ? "250px" : "280px", // Smaller on mobile
                zIndex: 200,
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}
            >
              {/* Header */}
              <div style={{
                color: "white",
                textAlign: "center",
                marginBottom: isMobile ? "1rem" : "1.5rem"
              }}>
                <div style={{ fontSize: isMobile ? "1.5rem" : "2rem", marginBottom: "0.5rem" }}>🚨</div>
                <div style={{
                  fontSize: isMobile ? "0.95rem" : "1.1rem",
                  fontWeight: "700",
                  fontFamily: "'Inter', sans-serif"
                }}>
                  Emergency Support
                </div>
                <div style={{
                  fontSize: isMobile ? "0.75rem" : "0.85rem",
                  opacity: 0.9,
                  marginTop: "0.3rem"
                }}>
                  Get immediate help
                </div>
              </div>
              
              {/* Emergency Options */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <button
                  style={{
                    width: "100%",
                    padding: isMobile ? "0.8rem 1rem" : "1rem 1.2rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "#ef4444",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    fontWeight: "600",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                  }}
                  onClick={handleEmergencyCall}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}>📞</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: "700" }}>Call Crisis Line</div>
                      <div style={{ fontSize: isMobile ? "0.7rem" : "0.8rem", opacity: 0.7 }}>Dial 988 - Available 24/7</div>
                    </div>
                  </div>
                  <span style={{ fontSize: "1rem", opacity: 0.5 }}>→</span>
                </button>

                <button
                  style={{
                    width: "100%",
                    padding: isMobile ? "0.8rem 1rem" : "1rem 1.2rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "#3b82f6",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    fontWeight: "600",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                  }}
                  onClick={handleEmergencyText}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}>💬</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: "700" }}>Text Crisis Line</div>
                      <div style={{ fontSize: isMobile ? "0.7rem" : "0.8rem", opacity: 0.7 }}>Text 741741 - Anonymous help</div>
                    </div>
                  </div>
                  <span style={{ fontSize: "1rem", opacity: 0.5 }}>→</span>
                </button>

                <button
                  style={{
                    width: "100%",
                    padding: isMobile ? "0.8rem 1rem" : "1rem 1.2rem",
                    background: "rgba(255, 255, 255, 0.95)",
                    color: "#8b5cf6",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: isMobile ? "0.85rem" : "0.95rem",
                    fontWeight: "600",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
                  }}
                  onClick={handleBreathingExercise}
                  onMouseOver={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}>🧘</span>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontWeight: "700" }}>Breathing Exercise</div>
                      <div style={{ fontSize: isMobile ? "0.7rem" : "0.8rem", opacity: 0.7 }}>Calm down with guided breathing</div>
                    </div>
                  </div>
                  <span style={{ fontSize: "1rem", opacity: 0.5 }}>→</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile - More compact on mobile */}
        <div
          className="nav-text"
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.3rem" : "0.6rem",
            padding: isMobile ? "0.4rem 0.6rem" : "0.6rem 1rem",
            background: "rgba(102, 126, 234, 0.08)",
            border: "1px solid rgba(102, 126, 234, 0.2)",
            borderRadius: isMobile ? "15px" : "20px",
            color: "#667eea",
            cursor: "pointer",
            fontSize: "0.85rem",
            maxWidth: isMobile ? "80px" : "auto", // Much more compact on mobile
            minWidth: "fit-content",
            transition: "all 0.3s ease"
          }}
          onClick={() => navigate("/settings")}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(102, 126, 234, 0.12)";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(102, 126, 234, 0.08)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{
            width: isMobile ? "28px" : "32px", // Smaller avatar on mobile
            height: isMobile ? "28px" : "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? "0.65rem" : "0.75rem",
            fontWeight: "700",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
          }}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          {/* Hide text on mobile to save space */}
          {!isMobile && (
            <div style={{ 
              minWidth: 0,
              overflow: "hidden"
            }}>
              <div style={{ 
                fontSize: "0.8rem", 
                fontWeight: "600",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#667eea"
              }}>
                {user?.firstName} {user?.lastName}
              </div>
              <div style={{ 
                fontSize: "0.65rem", 
                opacity: 0.7,
                whiteSpace: "nowrap",
                color: "#667eea",
                fontWeight: "500"
              }}>
                {user?.role === "ADMIN" ? "Administrator" : "Member"}
              </div>
            </div>
          )}
        </div>

        {/* Logout Button - More compact on mobile */}
        <button
          className="nav-text"
          style={{
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "white",
            border: "none",
            borderRadius: isMobile ? "12px" : "15px",
            padding: isMobile ? "0.5rem 0.8rem" : "0.7rem 1.2rem",
            fontSize: isMobile ? "0.75rem" : "0.85rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: isMobile 
              ? "0 3px 12px rgba(239, 68, 68, 0.3)" 
              : "0 4px 15px rgba(239, 68, 68, 0.3)"
          }}
          onClick={() => { logout(); navigate("/login"); }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = isMobile 
              ? "0 6px 20px rgba(239, 68, 68, 0.4)"
              : "0 8px 25px rgba(239, 68, 68, 0.4)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = isMobile 
              ? "0 3px 12px rgba(239, 68, 68, 0.3)"
              : "0 4px 15px rgba(239, 68, 68, 0.3)";
          }}
        >
          {isMobile ? "Exit" : "Logout"}
        </button>
      </div>

      {/* Mobile Menu - Enhanced */}
      {showMobileMenu && isMobile && (
        <div 
          className="emergency-popup"
          style={{
            position: "absolute",
            top: "100%",
            left: "0.8rem",
            right: "0.8rem",
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(25px)",
            borderRadius: "18px",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.2)",
            padding: "1.2rem",
            zIndex: 50,
            border: "1px solid rgba(102, 126, 234, 0.1)"
          }}
        >
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
                marginBottom: "0.6rem",
                transition: "all 0.3s ease",
                boxShadow: isActive(item.path) 
                  ? "0 6px 20px rgba(102, 126, 234, 0.3)" 
                  : "none"
              }}
              onClick={() => {
                navigate(item.path);
                setShowMobileMenu(false);
              }}
              onMouseOver={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.background = "rgba(102, 126, 234, 0.1)";
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.background = "transparent";
                }
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close menus */}
      {(showEmergencyMenu || showMobileMenu) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40
          }}
          onClick={() => {
            setShowEmergencyMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default Navigation;
