# 🎵 Spotify Playlist Manager & Discovery Web

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Spotify API](https://img.shields.io/badge/Spotify_API-1DB954?style=for-the-badge&logo=spotify&logoColor=white)](https://developer.spotify.com/documentation/web-api/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

Aplicación web interactiva diseñada para la gestión avanzada de búsquedas en Spotify y la creación personalizada de playlists. El proyecto utiliza un sistema modular de widgets para filtrar pistas musicales según criterios técnicos y artísticos.

---

## ✨ Características Principales

La aplicación se organiza en **Widgets especializados** que permiten un control total sobre la selección musical:

* **🔍 Búsqueda Modular:** Filtrado preciso mediante `ArtistWidget`, `GenreWidget` y `TrackWidget`.
* **⏳ Filtro por Décadas:** El `DecadeWidget` permite explorar música de épocas específicas de forma sencilla.
* **🔊 Preview System:** Previsualización de audio integrada para escuchar fragmentos de las canciones antes de añadirlas.
* **📊 Control de Popularidad:** Ajuste del rango de éxito de las canciones mediante `PopularityWidget`.
* **⚡ Generación Automática:** Creación de playlists directamente en la cuenta del usuario de Spotify.

> **Nota técnica:** Los módulos de `MoodWidget` y algunos aspectos de `PopularityWidget` se encuentran en fase experimental (no implementados totalmente en la lógica de búsqueda actual).

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Next.js](https://nextjs.org/) (React)
* **Estilos:** CSS3 con Tailwind y diseño responsive.
* **Integración:** [Spotify Web API](https://developer.spotify.com/documentation/web-api/) para autenticación y gestión de datos.
* **Calidad de Código:** ESLint para mantener estándares de desarrollo.

---

## 🚀 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Requisitos previos
* Tener instalado **Node.js** (versión 18 o superior).
* Una cuenta de desarrollador en [Spotify Dashboard](https://developer.spotify.com/dashboard/).

### 2. Clonar y configurar

Clonar el repositorio

Entrar en la carpeta

Instalar las dependencias

npm install

### 3. Variables de entorno
Crea un archivo .env.local en la raíz del proyecto y añade tus credenciales:

SPOTIFY_CLIENT_ID=tu_client_id_aqui
SPOTIFY_CLIENT_SECRET=tu_client_secret_aqui
### 4. Lanzar la aplicación

npm run dev

### La aplicación estará disponible en http://localhost:3000.

### 📂 Estructura del Proyecto
/src: Contiene los componentes (Widgets) y la lógica principal de la aplicación.

/public: Recursos estáticos (imágenes, audios de previsualización).

eslint.config.mjs: Configuración de reglas de estilo y errores de código.
