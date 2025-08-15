// frontend/src/contexts/ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ThemeContext = createContext();

export const useTheme = () => {
 const context = useContext(ThemeContext);
 if (!context) {
   throw new Error('useTheme must be used within a ThemeProvider');
 }
 return context;
};

export const ThemeProvider = ({ children }) => {
 const { user } = useAuth();
 const [themeSettings, setThemeSettings] = useState({
   theme: 'light',
   colorScheme: 'blue',
   fontSize: 'medium',
   animations: true
 });

 // Load theme settings on mount and user change
 useEffect(() => {
   loadThemeSettings();
 }, [user]);

 // Apply theme changes to document
 useEffect(() => {
   applyThemeToDocument();
 }, [themeSettings]);

 const loadThemeSettings = async () => {
   try {
     // Try to load from localStorage first
     const savedSettings = localStorage.getItem('mindfulTheme');
     if (savedSettings) {
       const parsed = JSON.parse(savedSettings);
       setThemeSettings(parsed);
     }

     // If user is logged in, try to load from API
     if (user) {
       const token = localStorage.getItem('token');
       const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/settings`, {
         headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         }
       });

       if (response.ok) {
         const settings = await response.json();
         const themeData = {
           theme: settings.theme || 'light',
           colorScheme: settings.colorScheme || 'blue', 
           fontSize: settings.fontSize || 'medium',
           animations: settings.animations !== false
         };
         setThemeSettings(themeData);
         localStorage.setItem('mindfulTheme', JSON.stringify(themeData));
       }
     }
   } catch (error) {
     console.error('Error loading theme settings:', error);
   }
 };

 const applyThemeToDocument = () => {
   const { theme, colorScheme, fontSize, animations } = themeSettings;
   
   // Apply theme attributes
   document.documentElement.setAttribute('data-theme', theme);
   document.documentElement.setAttribute('data-color-scheme', colorScheme);
   document.documentElement.setAttribute('data-font-size', fontSize);
   document.documentElement.setAttribute('data-animations', animations.toString());
   
   // Apply body background based on theme
   if (theme === 'dark') {
     document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
   } else {
     document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
   }
   
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
   
   // Save to localStorage immediately
   localStorage.setItem('mindfulTheme', JSON.stringify(updatedSettings));
   
   // Try to save to database if user is logged in
   try {
     if (user) {
       const token = localStorage.getItem('token');
       await fetch(`${process.env.REACT_APP_API_URL || ''}/api/settings`, {
         method: 'PUT',
         headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(updatedSettings)
       });
     }
   } catch (error) {
     console.error('Error saving theme to database:', error);
   }
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
