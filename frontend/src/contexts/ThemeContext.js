// frontend/src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
 const context = useContext(ThemeContext);
 if (!context) {
   throw new Error('useTheme must be used within a ThemeProvider');
 }
 return context;
};

export const ThemeProvider = ({ children }) => {
 const [themeSettings, setThemeSettings] = useState({
   theme: 'light',
   colorScheme: 'purple',
   fontSize: 'medium',
   animations: true,
   themeMode: 'default'
 });

 // Load theme settings on mount
 useEffect(() => {
   loadThemeSettings();
 }, []);

 // Apply theme changes to document
 useEffect(() => {
   applyThemeToDocument();
 }, [themeSettings]);

 const loadThemeSettings = async () => {
   try {
     const savedSettings = localStorage.getItem('mindfulTheme');
     if (savedSettings) {
       const parsed = JSON.parse(savedSettings);
       setThemeSettings(parsed);
     }
   } catch (error) {
     console.error('Error loading theme settings:', error);
   }
 };

 const applyThemeToDocument = () => {
   const { theme, colorScheme, fontSize, animations, themeMode } = themeSettings;

   // Define theme mode backgrounds
   const themeModeBackgrounds = {
     default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
     pastel: 'linear-gradient(135deg, #e8f4f8 0%, #f0f8ff 50%, #f5f0ff 100%)',
     serious: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 50%, #e2e8f0 100%)',
     bold: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%)'
   };

   // Apply background based on theme mode
   const currentMode = themeMode || 'default';
   const background = themeModeBackgrounds[currentMode] || themeModeBackgrounds.default;
   document.body.style.background = background;

   // Apply font size to root
   const fontSizes = {
     small: '14px',
     medium: '16px',
     large: '18px'
   };
   document.documentElement.style.fontSize = fontSizes[fontSize] || '16px';

   // Save to localStorage for persistence
   localStorage.setItem('mindfulTheme', JSON.stringify(themeSettings));
 };

 const updateTheme = async (newSettings) => {
   const updatedSettings = { ...themeSettings, ...newSettings };
   setThemeSettings(updatedSettings);
   localStorage.setItem('mindfulTheme', JSON.stringify(updatedSettings));
 };

 const value = {
   themeSettings,
   updateTheme,
   applyThemeToDocument
 };

 return (
   <ThemeContext.Provider value={value}>
     {children}
   </ThemeContext.Provider>
 );
};
