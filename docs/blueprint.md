# **App Name**: DoubleU Pulse

## Core Features:

- Latest Tracks Player: Stream and play DoubleU's newest releases directly within the application, featuring custom controls (play, pause, seek, volume, next/previous), and Media Session API integration for lock screen controls and metadata display on Android.
- Artist Biography & Discography: Access DoubleU's official biography rendered via Markdown and a complete discography presented in a dynamic grid layout with high-resolution cover art.
- Social Media Links Hub: Centralized access to all of DoubleU's official social media platforms (Spotify, Apple Music, Instagram, Twitter, etc.) via icon links.
- PWA Installability & Offline Support: Enable users to install the application to their home screen with a configured manifest.json for a native-like experience, featuring service workers for caching (stale-while-revalidate for metadata, cache-first for audio) and IndexedDB for offline data storage.
- Track Insight Generator: An AI tool utilizing the Gemini API to generate unique creative interpretations, backstories, or thematic insights for each of DoubleU's selected tracks to deepen fan engagement.
- APK Packaging: Package the PWA as a Trusted Web Activity (TWA) using Bubblewrap CLI, with assetlinks.json verification, to allow distribution as a native Android application (APK) on platforms like the Google Play Store.
- User Authentication & Authorization: Local user authentication (Email/Password) for now, with session management via HttpOnly cookies and Role-Based Access Control (RBAC) for managing fan and admin privileges.
- Admin Content Management Panel: A backend management panel for administrators to manage users, upload/delete audio files and cover art (integrated with cloud storage), edit artist biography, and access analytics for track play counts.

## Style Guidelines:

- Pure Black (#0a0a0a) for the main application theme, providing a stark contrast for neon accents.
- Energetic royal purple (#8019E6) for deep, vibrant interactive elements and key accents against the dark theme.
- Bright neon orange (#FF5F1F) for highlighting critical calls to action, selected track status, and interactive feedback.
- Vivid neon blue (#00F2FE) used for progress indicators, secondary interactive elements, and ambient digital glow effects.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, techy, and bold statement. Body font: 'Inter' (sans-serif) for clear readability of biographies and track descriptions.
- Utilize sleek, minimalist line icons with an optional neon glow effect, matching the energetic and futuristic aesthetic of the application.
- A dark-themed, mobile-first responsive layout emphasizing album art and artist imagery. Content areas should be clean and well-structured, prioritizing ease of navigation and media playback.
- Subtle, smooth animations for transitions, hover effects on interactive elements, and pulsating or glowing indicators to visually reinforce the neon theme and dynamic nature of the music.