import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Journal = ({ isEmbedded = false, onStatsUpdate, onNavigateBack }) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: 3,
    tags: "",
    isPrivate: false
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterMood, setFilterMood] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchEntries();
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/journal`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(data.entries || []);
      } else {
        const localEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
        setEntries(localEntries);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
      const localEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
      setEntries(localEntries);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const entryData = {
        title: newEntry.title || "Untitled Entry",
        content: newEntry.content,
        mood: parseInt(newEntry.mood),
        tags: newEntry.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        isPrivate: newEntry.isPrivate
      };

      const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/journal`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entryData)
      });

      if (response.ok) {
        const data = await response.json();
        setEntries(prev => [data.entry, ...prev]);
      } else {
        const localEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
        const newLocalEntry = {
          id: Date.now().toString(),
          title: newEntry.title || "Untitled Entry",
          content: newEntry.content,
          mood: parseInt(newEntry.mood),
          tags: newEntry.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
          isPrivate: newEntry.isPrivate,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user?.id || "local-user"
        };

        localEntries.unshift(newLocalEntry);
        localStorage.setItem("journalEntries", JSON.stringify(localEntries));
        setEntries(localEntries);
      }

      setNewEntry({ title: "", content: "", mood: 3, tags: "", isPrivate: false });
      setShowNewEntry(false);
      if (onStatsUpdate) onStatsUpdate();
      alert("Journal entry saved successfully! ✨");
    } catch (error) {
      console.error("Error saving entry:", error);
      alert("There was an error saving your entry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (entryId) => {
    setShowDeleteConfirm(null);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/journal/${entryId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
      });

      if (response.ok) {
        setEntries(prev => prev.filter(entry => entry.id !== entryId));
      } else {
        const localEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
        const filteredEntries = localEntries.filter(entry => entry.id !== entryId);
        localStorage.setItem("journalEntries", JSON.stringify(filteredEntries));
        setEntries(filteredEntries);
      }

      if (onStatsUpdate) onStatsUpdate();
      alert("Entry deleted successfully.");
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("There was an error deleting your entry. Please try again.");
    }
  };

  const getMoodEmoji = (mood) => {
    const moods = ["😢", "😟", "😐", "😊", "😄"];
    return moods[mood - 1] || "😐";
  };

  const getMoodColor = (mood) => {
    const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#10b981"];
    return colors[mood - 1] || "#eab308";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      month: "long", day: "numeric",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined
    });
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = (entry.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (Array.isArray(entry.tags) && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesMood = filterMood === "" || entry.mood.toString() === filterMood;
    return matchesSearch && matchesMood;
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    switch (sortBy) {
      case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
      case "mood-high": return b.mood - a.mood;
      case "mood-low": return a.mood - b.mood;
      default: return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (loading) {
    return (
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📝</div>
          <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>Loading your journal...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: isEmbedded ? "transparent" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: isEmbedded ? "auto" : "100vh",
      padding: isEmbedded ? "0" : (isMobile ? "1rem" : "2rem"),
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* Delete Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000,
          background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "white", borderRadius: "20px", padding: "2rem", maxWidth: "400px", width: "90%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)", textAlign: "center"
          }}>
            <div style={{
              fontSize: "3rem", marginBottom: "1rem", background: "linear-gradient(135deg, #ef4444, #dc2626)",
              borderRadius: "50%", width: "80px", height: "80px", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 1rem auto", color: "white"
            }}>🗑️</div>
            <h3 style={{ color: "#1f2937", fontSize: "1.5rem", fontWeight: "700", margin: "0 0 0.5rem 0" }}>
              Delete Entry?
            </h3>
            <p style={{ color: "#6b7280", fontSize: "1rem", margin: "0 0 2rem 0" }}>
              This action cannot be undone. Your journal entry will be permanently deleted.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={() => setShowDeleteConfirm(null)} style={{
                background: "#f3f4f6", border: "none", color: "#6b7280", borderRadius: "10px",
                padding: "0.75rem 1.5rem", cursor: "pointer", fontWeight: "600"
              }}>Cancel</button>
              <button onClick={() => handleDelete(showDeleteConfirm)} style={{
                background: "linear-gradient(135deg, #ef4444, #dc2626)", color: "white", border: "none",
                borderRadius: "10px", padding: "0.75rem 1.5rem", cursor: "pointer", fontWeight: "600"
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          background: "rgba(255, 255, 255, 0.95)", borderRadius: "20px", padding: isMobile ? "2rem" : "2.5rem",
          marginBottom: "2rem", boxShadow: "0 20px 60px rgba(102, 126, 234, 0.15)", backdropFilter: "blur(20px)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: "15px", padding: "1rem",
              boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)"
            }}>
              <span style={{ fontSize: "2rem", color: "white" }}>📝</span>
            </div>
            <div>
              <h1 style={{
                fontSize: isMobile ? "2rem" : "2.5rem", fontWeight: "800", margin: 0,
                background: "linear-gradient(135deg, #667eea, #764ba2)", WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>My Journal</h1>
              <p style={{ color: "#6b7280", fontSize: "1.1rem", margin: 0 }}>
                Reflect, write, and track your mental wellness journey ✨
              </p>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: "1.5rem", marginTop: "2rem"
          }}>
            {[
              { label: "Total Entries", value: entries.length, icon: "📊", color: "#667eea" },
              { 
                label: "Avg Mood", 
                value: entries.length > 0 ? (entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length).toFixed(1) : "0",
                icon: "😊", color: "#22c55e" 
              },
              { 
                label: "Active Days", 
                value: new Set(entries.map(e => new Date(e.createdAt).toDateString())).size,
                icon: "📅", color: "#f59e0b" 
              },
              { 
                label: "Today's Entries", 
                value: entries.filter(e => new Date(e.createdAt).toDateString() === new Date().toDateString()).length,
                icon: "✨", color: "#8b5cf6" 
              }
            ].map((stat, index) => (
              <div key={index} style={{
                background: "rgba(255, 255, 255, 0.8)", borderRadius: "15px", padding: "1.5rem",
                textAlign: "center", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", transition: "transform 0.3s ease",
                cursor: "pointer"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
                <div style={{ fontSize: "2rem", fontWeight: "800", color: stat.color, marginBottom: "0.25rem" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.9rem", color: "#6b7280", fontWeight: "600" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Write Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <button onClick={() => setShowNewEntry(!showNewEntry)} style={{
            background: showNewEntry ? "linear-gradient(135deg, #ef4444, #dc2626)" : "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white", border: "none", borderRadius: "15px", padding: "1rem 2rem", cursor: "pointer",
            fontWeight: "700", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.8rem",
            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)", transition: "transform 0.3s ease"
          }}
          onMouseOver={(e) => e.target.style.transform = "translateY(-3px)"}
          onMouseOut={(e) => e.target.style.transform = "translateY(0)"}>
            <span style={{ fontSize: "1.3rem" }}>{showNewEntry ? "❌" : "✍️"}</span>
            {showNewEntry ? "Cancel" : "Write New Entry"}
          </button>
        </div>

        {/* New Entry Form */}
        {showNewEntry && (
          <div style={{
            background: "rgba(255, 255, 255, 0.95)", borderRadius: "20px", padding: isMobile ? "2rem" : "2.5rem",
            marginBottom: "2rem", boxShadow: "0 20px 60px rgba(102, 126, 234, 0.15)", backdropFilter: "blur(20px)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: "12px", padding: "0.8rem"
              }}>
                <span style={{ fontSize: "1.5rem", color: "white" }}>✍️</span>
              </div>
              <h3 style={{ color: "#1f2937", fontSize: "1.5rem", fontWeight: "700", margin: 0 }}>
                New Journal Entry
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block", fontSize: "1rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem"
                }}>Title (optional)</label>
                <input type="text" value={newEntry.title}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Give your entry a title..."
                  style={{
                    width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "10px",
                    fontSize: "1rem", outline: "none", transition: "border-color 0.3s ease"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              {/* Mood */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block", fontSize: "1rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem"
                }}>How are you feeling? {getMoodEmoji(newEntry.mood)}</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5].map(mood => (
                    <button key={mood} type="button" onClick={() => setNewEntry(prev => ({ ...prev, mood }))}
                      style={{
                        background: newEntry.mood === mood ? getMoodColor(mood) : "#f1f5f9",
                        color: newEntry.mood === mood ? "white" : "#64748b", border: "none", borderRadius: "10px",
                        padding: "0.75rem 1rem", cursor: "pointer", fontWeight: "600", fontSize: "1rem",
                        display: "flex", alignItems: "center", gap: "0.5rem", transition: "all 0.3s ease"
                      }}>
                      <span style={{ fontSize: "1.2rem" }}>{getMoodEmoji(mood)}</span>
                      <span>{mood}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block", fontSize: "1rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem"
                }}>What's on your mind? *</label>
                <textarea value={newEntry.content}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Share your thoughts, feelings, or experiences..."
                  style={{
                    width: "100%", minHeight: "150px", padding: "1rem", border: "2px solid #e5e7eb",
                    borderRadius: "10px", fontSize: "1rem", lineHeight: "1.6", resize: "vertical", outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                  required
                ></textarea>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  display: "block", fontSize: "1rem", fontWeight: "600", color: "#374151", marginBottom: "0.5rem"
                }}>Tags (comma-separated)</label>
                <input type="text" value={newEntry.tags}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="anxiety, work, family, gratitude..."
                  style={{
                    width: "100%", padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "10px",
                    fontSize: "1rem", outline: "none"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#667eea"}
                  onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                />
              </div>

              {/* Privacy */}
              <div style={{ marginBottom: "2rem" }}>
                <label style={{
                  display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "1rem", color: "#374151"
                }}>
                  <input type="checkbox" checked={newEntry.isPrivate}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, isPrivate: e.target.checked }))}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span>🔒 Keep this entry private</span>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" disabled={submitting || !newEntry.content.trim()} style={{
                background: submitting || !newEntry.content.trim() 
                  ? "#9ca3af" : "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white", border: "none", borderRadius: "10px", padding: "1rem 2rem",
                cursor: submitting || !newEntry.content.trim() ? "not-allowed" : "pointer",
                fontWeight: "700", fontSize: "1rem", width: "100%", display: "flex", alignItems: "center",
                justifyContent: "center", gap: "0.5rem"
              }}>
                <span style={{ fontSize: "1.2rem" }}>{submitting ? "⏳" : "💾"}</span>
                {submitting ? "Saving..." : "Save Entry"}
              </button>
            </form>
          </div>
        )}

        {/* Search & Filters */}
        {entries.length > 0 && (
          <div style={{
            background: "rgba(255, 255, 255, 0.95)", borderRadius: "15px", padding: "1.5rem", marginBottom: "2rem",
            boxShadow: "0 10px 30px rgba(102, 126, 234, 0.1)"
          }}>
            <h3 style={{ color: "#1f2937", fontSize: "1.2rem", fontWeight: "700", marginBottom: "1rem" }}>
              🔍 Search & Filter
            </h3>
            <div style={{
              display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1rem"
            }}>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search entries..." style={{
                  padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "0.9rem", outline: "none"
                }}
              />
              <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)} style={{
                padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "0.9rem", outline: "none"
              }}>
                <option value="">All Moods</option>
                <option value="1">😢 Very Sad (1)</option>
                <option value="2">😟 Sad (2)</option>
                <option value="3">😐 Neutral (3)</option>
                <option value="4">😊 Happy (4)</option>
                <option value="5">😄 Very Happy (5)</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{
                padding: "0.75rem", border: "2px solid #e5e7eb", borderRadius: "8px", fontSize: "0.9rem", outline: "none"
              }}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="mood-high">Highest Mood</option>
                <option value="mood-low">Lowest Mood</option>
              </select>
            </div>
          </div>
        )}

        {/* Entries */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {sortedEntries.length > 0 ? (
            sortedEntries.map(entry => (
              <div key={entry.id} onClick={() => setSelectedEntry(selectedEntry === entry.id ? null : entry.id)}
                style={{
                  background: "rgba(255, 255, 255, 0.95)", borderRadius: "15px", padding: isMobile ? "1.5rem" : "2rem",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.1)", borderLeft: `4px solid ${getMoodColor(entry.mood)}`,
                  transition: "transform 0.3s ease", cursor: "pointer"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{
                      background: getMoodColor(entry.mood), borderRadius: "50%", padding: "0.8rem",
                      boxShadow: `0 5px 15px ${getMoodColor(entry.mood)}40`
                    }}>
                      <span style={{ fontSize: "2rem", color: "white" }}>{getMoodEmoji(entry.mood)}</span>
                    </div>
                    <div>
                      {entry.title && (
                        <div style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1f2937", marginBottom: "0.25rem" }}>
                          {entry.title}
                        </div>
                      )}
                      <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "#374151", marginBottom: "0.25rem" }}>
                        {formatDate(entry.createdAt)}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.9rem", color: "#6b7280" }}>
                        <span>Mood: {entry.mood}/5</span>
                        {entry.isPrivate && <span>🔒 Private</span>}
                        <span>{new Date(entry.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setShowDeleteConfirm(entry.id); }}
                    style={{
                      background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", padding: "0.5rem",
                      borderRadius: "8px", transition: "background 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.background = "#fee2e2"}
                    onMouseOut={(e) => e.target.style.background = "none"}
                    title="Delete entry">🗑️</button>
                </div>

                <div style={{
                  color: "#374151", lineHeight: "1.6", fontSize: "1rem", marginBottom: "1rem",
                  maxHeight: selectedEntry === entry.id ? "none" : "100px", overflow: "hidden", position: "relative"
                }}>
                  {entry.content}
                  {selectedEntry !== entry.id && entry.content.length > 150 && (
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: "30px",
                      background: "linear-gradient(transparent, rgba(255,255,255,0.95))", display: "flex",
                      alignItems: "flex-end", justifyContent: "center", fontSize: "0.9rem", color: "#667eea", fontWeight: "600"
                    }}>Click to read more...</div>
                  )}
                </div>

                {Array.isArray(entry.tags) && entry.tags.length > 0 && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                    {entry.tags.map((tag, index) => (
                      <span key={index} style={{
                        background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white",
                        padding: "0.25rem 0.75rem", borderRadius: "15px", fontSize: "0.8rem", fontWeight: "500"
                      }}>#{tag}</span>
                    ))}
                  </div>
                )}

                <div style={{
                  textAlign: "center", marginTop: "1rem", color: "#667eea", fontSize: "0.9rem", fontWeight: "600",
                  padding: "0.8rem", background: "rgba(102, 126, 234, 0.1)", borderRadius: "10px"
                }}>
                  {selectedEntry === entry.id ? "⬆️ Click to collapse" : "⬇️ Click to read more"}
                </div>
              </div>
            ))
          ) : (
            <div style={{
              background: "rgba(255, 255, 255, 0.95)", borderRadius: "20px", padding: isMobile ? "3rem 2rem" : "4rem 3rem",
              textAlign: "center", boxShadow: "0 20px 60px rgba(102, 126, 234, 0.15)"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: "20px", padding: "2rem",
                marginBottom: "2rem", display: "inline-block", boxShadow: "0 15px 40px rgba(102, 126, 234, 0.3)"
              }}>
                <span style={{ fontSize: "4rem", color: "white" }}>📝</span>
              </div>
              <h3 style={{
                color: "#1f2937", fontSize: "2rem", fontWeight: "800", marginBottom: "1rem"
              }}>
                {entries.length === 0 ? "Start Your Journal Journey" : "No entries match your filters"}
              </h3>
              <p style={{
                color: "#6b7280", fontSize: "1.2rem", marginBottom: "2.5rem", lineHeight: "1.7", maxWidth: "500px", margin: "0 auto 2.5rem auto"
              }}>
                {entries.length === 0
                  ? "Your thoughts and feelings matter. Begin documenting your mental health journey by writing your first entry."
                  : "Try adjusting your search terms or filters to find what you're looking for."
                }
              </p>
              {entries.length === 0 && (
                <button onClick={() => setShowNewEntry(true)} style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)", color: "white", border: "none",
                  borderRadius: "15px", padding: "1rem 2rem", cursor: "pointer", fontWeight: "700", fontSize: "1.1rem",
                  display: "flex", alignItems: "center", gap: "0.8rem", margin: "0 auto",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)"
                }}>
                  <span style={{ fontSize: "1.3rem" }}>✍️</span>
                  Write Your First Entry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;

