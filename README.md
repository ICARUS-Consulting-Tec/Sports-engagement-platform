# Tennessee Titans Sports Engagement Platform

A comprehensive sports engagement platform dedicated to Tennessee Titans fans and American football enthusiasts. Connect with fellow fans, track game statistics, and immerse yourself in the ultimate Titans community experience.

## Overview

The Titans Sports Engagement Platform is designed to bring fans closer to their favorite NFL team through real-time updates, interactive features, and a vibrant community. Whether you're tracking live game stats, analyzing big plays, or connecting with other members of Titan Nation, this platform is your one-stop destination for everything related to the Tennessee Titans.

## Features

### Live Game Experience
- **Real-time community chats** - Follow every touchdown, field goal, and defensive stop as it happens
- **Player draft selection** - Detailed breakdown of every drive and crucial moment
- **Player Statistics** - Track individual and team performance metrics throughout the season
- **Game Highlights** - Watch and share key plays and memorable moments

## Technology Stack

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: SQL
- **Real-time**: WebSockets
- **Authentication**: OAuth 2.0
- **Hosting**: Vercel / AWS

---

**Titan Up!** ⚔️🏈

*Built with 💙 by Titans fans, for Titans fans

## GitHub Pages desde `dev`

Este repositorio quedó preparado para publicar solo el frontend de `apps/web` en GitHub Pages usando la rama `dev` como un entorno tipo staging simulado.

### Qué hace el workflow

- escucha `push` sobre `dev`
- instala dependencias del frontend
- genera el build de Vite con base `/<repo>/`
- publica `apps/web/dist` en GitHub Pages

### Archivo del workflow

- `.github/workflows/deploy-pages-dev.yml`

### Qué debes configurar en GitHub

1. En `Settings -> Pages`, selecciona `Source: GitHub Actions`.
2. Asegúrate de hacer push a la rama `dev`.
3. Si quieres que los servicios remotos funcionen en Pages, define estas variables en el repo:

- `VITE_API_BASE_URL` en `Settings -> Secrets and variables -> Actions -> Variables`
- `VITE_SUPABASE_URL` en `Settings -> Secrets and variables -> Actions -> Variables`
- `VITE_ELEVENLABS_AGENT_ID` en `Settings -> Secrets and variables -> Actions -> Variables`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` en `Settings -> Secrets and variables -> Actions -> Secrets`

Si esas variables no están definidas, el frontend se puede publicar, pero las funciones que dependen de backend, Supabase o ElevenLabs no quedarán operativas en GitHub Pages.
