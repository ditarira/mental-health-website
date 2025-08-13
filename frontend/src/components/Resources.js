import React, { useState } from "react";
const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const resources = [
    {
      id: 1,
      category: "crisis",
      title: "988 Suicide & Crisis Lifeline",
      description: "Free, confidential emotional support 24/7 for people in suicidal crisis or emotional distress. Trained crisis counselors provide immediate help and connect you to local resources.",
      contact: "988",
      website: "https://988lifeline.org",
      urgent: true,
      details: "Available in English and Spanish • Deaf/Hard of Hearing: Use your preferred relay service",
      color: "#dc2626"
    },
    {
      id: 2,
      category: "crisis",
      title: "Crisis Text Line",
      description: "Free, 24/7 crisis support via text message. Text with trained crisis counselors who provide real-time help for depression, anxiety, self-harm, and suicidal thoughts.",
      contact: "Text HOME to 741741",
      website: "https://crisistextline.org",
      urgent: true,
      details: "Text-based support • Response within 5 minutes • Completely confidential",
      color: "#059669"
    },
    {
      id: 3,
      category: "crisis",
      title: "National Domestic Violence Hotline",
      description: "Confidential support for domestic violence survivors and their loved ones. Available 24/7 with trained advocates providing safety planning and resources.",
      contact: "1-800-799-7233",
      website: "https://thehotline.org",
      urgent: true,
      details: "Available in 200+ languages • Text HELP to 233733 • Online chat available",
      color: "#7c2d12"
    },
    {
      id: 4,
      category: "professional",
      title: "Psychology Today Therapist Directory",
      description: "Comprehensive directory to find licensed therapists, psychiatrists, and mental health professionals in your area. Filter by insurance, specialty, and treatment approach.",
      website: "https://psychologytoday.com",
      details: "Filter by insurance coverage • Read therapist profiles • Book appointments online",
      color: "#1d4ed8"
    },
    {
      id: 5,
      category: "professional",
      title: "BetterHelp Online Therapy",
      description: "Professional online counseling with licensed, accredited therapists. Convenient therapy through video, phone, and messaging at affordable rates.",
      website: "https://betterhelp.com",
      cost: "$60-90/week",
      details: "Financial aid available • Match with therapists • Message anytime",
      color: "#059669"
    },
    {
      id: 6,
      category: "professional",
      title: "Open Path Collective",
      description: "Affordable therapy network offering sessions between $30-$60. Non-profit organization connecting people with licensed mental health professionals.",
      website: "https://openpathcollective.org",
      cost: "$30-60/session",
      details: "Sliding scale fees • In-person and online • No insurance needed",
      color: "#0891b2"
    },
    {
      id: 7,
      category: "support",
      title: "National Alliance on Mental Illness (NAMI)",
      description: "Largest grassroots mental health organization providing education, support groups, and advocacy. Free support groups for individuals and families affected by mental illness.",
      contact: "1-800-950-6264",
      website: "https://nami.org",
      details: "Free support groups • Family programs • Educational resources • Advocacy",
      color: "#7c3aed"
    },
    {
      id: 8,
      category: "support",
      title: "Mental Health America",
      description: "Leading community-based nonprofit dedicated to addressing mental health needs. Offers screening tools, resources, and advocacy for mental health awareness.",
      website: "https://mhanational.org",
      details: "Free mental health screenings • Educational materials • Policy advocacy",
      color: "#dc2626"
    },
    {
      id: 9,
      category: "youth",
      title: "National Suicide Prevention Lifeline for Youth",
      description: "Specialized support for young people under 25 experiencing mental health crises. Trained counselors understand unique challenges facing youth today.",
      contact: "988 (Press 1 for Youth)",
      website: "https://988lifeline.org",
      urgent: true,
      details: "Specialized for under 25 • LGBTQ+ affirming • Confidential support",
      color: "#ea580c"
    },
    {
      id: 10,
      category: "youth",
      title: "The Trevor Project",
      description: "Leading national organization providing crisis intervention and suicide prevention services to LGBTQ+ young people under 25.",
      contact: "1-866-488-7386",
      website: "https://thetrevorproject.org",
      urgent: true,
      details: "LGBTQ+ focused • Text START to 678678 • Online chat available",
      color: "#f59e0b"
    },
    {
      id: 11,
      category: "specialized",
      title: "SAMHSA National Helpline",
      description: "Free, confidential treatment referral service for mental health and substance use disorders. Provides information and referrals to local treatment facilities.",
      contact: "1-800-662-4357",
      website: "https://samhsa.gov",
      details: "24/7 treatment referrals • Multiple languages • Insurance guidance",
      color: "#16a34a"
    },
    {
      id: 12,
      category: "specialized",
      title: "National Eating Disorders Association",
      description: "Support and resources for eating disorders including anorexia, bulimia, and binge eating. Offers screening tools, treatment locators, and support groups.",
      contact: "1-800-931-2237",
      website: "https://nationaleatingdisorders.org",
      details: "Specialized eating disorder support • Treatment locator • Family resources",
      color: "#db2777"
    }
  ];

  const categories = [
    { id: "all", name: "All Resources", icon: "💙", color: "#667eea" },
    { id: "crisis", name: "Crisis Support", icon: "🆘", color: "#ef4444" },
    { id: "professional", name: "Professional Help", icon: "👩‍⚕️", color: "#10b981" },
    { id: "support", name: "Support Groups", icon: "🤝", color: "#8b5cf6" },
    { id: "youth", name: "Youth Support", icon: "🌟", color: "#f59e0b" },
    { id: "specialized", name: "Specialized Care", icon: "🎯", color: "#06b6d4" }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCall = (contact) => {
    if (contact.includes("Text")) {
      const parts = contact.split(" to ");
      if (parts.length === 2) {
        window.open(`sms:${parts[1]}?body=${parts[0]}`, "_self");
      }
    } else {
      window.open(`tel:${contact.replace(/\D/g, "")}`, "_self");
    }
  };

  return (
    <>
      
      <div style={{ 
        padding: "2rem", 
        maxWidth: "1200px", 
        margin: "0 auto", 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        
        {/* Cute Header */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "30px",
          padding: "3rem",
          marginBottom: "3rem",
          textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          backdropFilter: "blur(20px)"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💙</div>
          <h1 style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "800"
          }}>
            Mental Health Resources
          </h1>
          <p style={{
            fontSize: "1.3rem",
            color: "#64748b",
            margin: 0,
            lineHeight: "1.6"
          }}>
            🌟 Professional support and caring communities for your mental wellness journey 🌟
          </p>
        </div>

        {/* Cute Search Bar */}
        <div style={{ 
          marginBottom: "3rem", 
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "25px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</div>
          <input
            type="text"
            placeholder="✨ Search for mental health resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "1.2rem 2rem",
              border: "3px solid #667eea",
              borderRadius: "30px",
              fontSize: "1.1rem",
              outline: "none",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.2)",
              transition: "all 0.3s ease"
            }}
          />
        </div>

        {/* Cute Category Buttons */}
        <div style={{ 
          display: "flex", 
          gap: "1rem", 
          marginBottom: "3rem", 
          flexWrap: "wrap", 
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "25px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: "1rem 2rem",
                background: selectedCategory === category.id 
                  ? `linear-gradient(135deg, ${category.color}, ${category.color}dd)` 
                  : "white",
                color: selectedCategory === category.id ? "white" : category.color,
                border: `3px solid ${category.color}`,
                borderRadius: "30px",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxShadow: selectedCategory === category.id 
                  ? `0 8px 25px ${category.color}40` 
                  : "0 4px 15px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
              onMouseOver={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                  e.currentTarget.style.boxShadow = `0 8px 25px ${category.color}30`;
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                }
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Emergency Section */}
        {filteredResources.some(r => r.urgent) && (
          <div style={{ marginBottom: "3rem" }}>
            <div style={{
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              borderRadius: "30px",
              padding: "2.5rem",
              textAlign: "center",
              color: "white",
              boxShadow: "0 15px 40px rgba(239, 68, 68, 0.3)",
              marginBottom: "2rem"
            }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚨</div>
              <h2 style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
                fontWeight: "800"
              }}>
                Emergency Support Available 24/7
              </h2>
              <p style={{
                fontSize: "1.3rem",
                opacity: 0.95,
                margin: 0,
                lineHeight: "1.6"
              }}>
                💝 If you're in crisis, help is available right now. You are not alone. 💝
              </p>
            </div>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
              gap: "2rem" 
            }}>
              {filteredResources.filter(r => r.urgent).map(resource => (
                <div key={resource.id} style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  border: `4px solid ${resource.color}`,
                  borderRadius: "25px",
                  padding: "2.5rem",
                  boxShadow: `0 15px 40px ${resource.color}30`,
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = `0 20px 50px ${resource.color}40`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = `0 15px 40px ${resource.color}30`;
                }}>
                  
                  <div style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: resource.color,
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "700"
                  }}>
                    🚨 24/7 SUPPORT
                  </div>

                  <h3 style={{
                    color: resource.color,
                    marginBottom: "1.5rem",
                    fontSize: "1.6rem",
                    fontWeight: "800",
                    lineHeight: "1.3"
                  }}>
                    {resource.title}
                  </h3>
                  
                  <p style={{
                    marginBottom: "1.5rem",
                    color: "#374151",
                    lineHeight: "1.7",
                    fontSize: "1.1rem"
                  }}>
                    {resource.description}
                  </p>

                  <div style={{
                    background: `${resource.color}15`,
                    padding: "1rem",
                    borderRadius: "15px",
                    marginBottom: "2rem",
                    borderLeft: `4px solid ${resource.color}`
                  }}>
                    <p style={{
                      color: "#64748b",
                      fontSize: "0.95rem",
                      margin: 0,
                      fontWeight: "500"
                    }}>
                      💡 {resource.details}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {resource.contact && (
                      <button
                        onClick={() => handleCall(resource.contact)}
                        style={{
                          background: `linear-gradient(135deg, ${resource.color}, ${resource.color}dd)`,
                          color: "white",
                          border: "none",
                          padding: "1.2rem 2rem",
                          borderRadius: "20px",
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: "1.1rem",
                          flex: 1,
                          minWidth: "200px",
                          transition: "all 0.3s ease",
                          boxShadow: `0 8px 25px ${resource.color}40`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "translateY(-3px)";
                          e.currentTarget.style.boxShadow = `0 12px 35px ${resource.color}50`;
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = `0 8px 25px ${resource.color}40`;
                        }}
                      >
                        {resource.contact.includes("Text") ? "💬" : "📞"} {resource.contact}
                      </button>
                    )}
                    {resource.website && (
                      <button
                        onClick={() => window.open(resource.website, "_blank")}
                        style={{
                          background: "white",
                          color: resource.color,
                          border: `3px solid ${resource.color}`,
                          padding: "1.2rem 2rem",
                          borderRadius: "20px",
                          cursor: "pointer",
                          fontWeight: "700",
                          fontSize: "1.1rem",
                          transition: "all 0.3s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem"
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = resource.color;
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.color = resource.color;
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        🌐 Visit Website
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Resources */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", 
          gap: "2rem" 
        }}>
          {filteredResources.filter(r => !r.urgent).map(resource => (
            <div key={resource.id} style={{
              background: "rgba(255, 255, 255, 0.95)",
              border: `3px solid ${resource.color}`,
              borderRadius: "25px",
              padding: "2.5rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = `0 15px 40px ${resource.color}30`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            }}>
              
              <h3 style={{
                color: resource.color,
                marginBottom: "1.5rem",
                fontSize: "1.5rem",
                fontWeight: "800",
                lineHeight: "1.3"
              }}>
                {resource.title}
              </h3>
              
              <p style={{
                marginBottom: "1.5rem",
                color: "#374151",
                lineHeight: "1.7",
                fontSize: "1.05rem"
              }}>
                {resource.description}
              </p>

              <div style={{
                background: `${resource.color}15`,
                padding: "1rem",
                borderRadius: "15px",
                marginBottom: "1.5rem",
                borderLeft: `4px solid ${resource.color}`
              }}>
                <p style={{
                  color: "#64748b",
                  fontSize: "0.95rem",
                  margin: 0,
                  fontWeight: "500"
                }}>
                  💡 {resource.details}
                </p>
              </div>

              {resource.cost && (
                <div style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "20px",
                  fontSize: "1rem",
                  display: "inline-block",
                  marginBottom: "2rem",
                  fontWeight: "700",
                  boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)"
                }}>
                  💰 {resource.cost}
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {resource.contact && (
                  <button
                    onClick={() => handleCall(resource.contact)}
                    style={{
                      background: `linear-gradient(135deg, ${resource.color}, ${resource.color}dd)`,
                      color: "white",
                      border: "none",
                      padding: "1.2rem 2rem",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "1rem",
                      flex: 1,
                      transition: "all 0.3s ease",
                      boxShadow: `0 6px 20px ${resource.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                  >
                    📞 {resource.contact}
                  </button>
                )}
                {resource.website && (
                  <button
                    onClick={() => window.open(resource.website, "_blank")}
                    style={{
                      background: resource.contact ? "white" : `linear-gradient(135deg, ${resource.color}, ${resource.color}dd)`,
                      color: resource.contact ? resource.color : "white",
                      border: resource.contact ? `3px solid ${resource.color}` : "none",
                      padding: "1.2rem 2rem",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "1rem",
                      flex: resource.contact ? "none" : 1,
                      width: resource.contact ? "auto" : "100%",
                      transition: "all 0.3s ease",
                      boxShadow: `0 6px 20px ${resource.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                  >
                    🌐 Visit Website
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cute No Results */}
        {filteredResources.length === 0 && (
          <div style={{ 
            textAlign: "center", 
            padding: "4rem",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "30px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.1)"
          }}>
            <div style={{ fontSize: "6rem", marginBottom: "2rem" }}>🔍</div>
            <h3 style={{ 
              fontSize: "2.5rem", 
              marginBottom: "1rem", 
              color: "#667eea",
              fontWeight: "800"
            }}>
              No resources found
            </h3>
            <p style={{ 
              fontSize: "1.3rem", 
              color: "#64748b",
              lineHeight: "1.6"
            }}>
              💭 Try adjusting your search or filter criteria to find what you need
            </p>
          </div>
        )}

        {/* Cute Footer */}
        <div style={{
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "25px",
          padding: "2rem",
          marginTop: "3rem",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💙</div>
          <p style={{
            color: "#64748b",
            fontSize: "1.1rem",
            margin: 0,
            lineHeight: "1.6"
          }}>
            🌟 Remember: Seeking help is a sign of strength, not weakness. You deserve support and care. 🌟
          </p>
        </div>
      </div>
    </>
  );
};

export default Resources;

