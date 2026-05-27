# 🚀 Guía de Despliegue en Hostinger Node.js

## Requisitos Previos

- Hosting Node.js en Hostinger
- Acceso SSH
- Cuenta de GitHub (opcional, para pull directo)

---

## 📋 Pasos de Instalación

### 1. Clonar el Repositorio

```bash
cd public_html
git clone https://github.com/JeffValdivia/WebSSCC.git
cd WebSSCC
```

O si usas carpeta específica de Node.js:
```bash
git clone https://github.com/JeffValdivia/WebSSCC.git .
```

### 2. Instalar Dependencias

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ../client
npm install
npm run build
```

### 3. Configurar Variables de Entorno

**En `/server/.env`:**
```env
NODE_ENV=production
PORT=3001
API_URL=https://www.copafa.com
```

**En `/client/.env.production`:**
```env
VITE_API_URL=https://www.copafa.com
```

### 4. Compilar Frontend

```bash
cd client
npm run build
```

La salida estará en `client/dist/`

### 5. Servir Archivos Estáticos con Express

El servidor Express debe servir los archivos compilados del frontend.

En `server/index.js`, agrega después de `app.use(cors())`:

```javascript
const path = require('path');
const express = require('express');

// Servir archivos estáticos del frontend compilado
app.use(express.static(path.join(__dirname, '../client/dist')));

// Ruta para SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
```

### 6. Configurar Node.js en Hostinger

**Opción A: Control Panel**
1. Ve a **Hosting → Node.js**
2. Click en **Crear Aplicación Node.js**
3. Selecciona:
   - **Punto de entrada:** `/server/index.js`
   - **Puerto:** `3001` (o el que uses)
   - **Versión de Node:** 16+

**Opción B: SSH**
```bash
# Crear directorio de la app
mkdir -p ~/nojs_app_WebSSCC
cd ~/nojs_app_WebSSCC

# Inicializar app Node.js
npm init -y
```

### 7. Variables de Entorno en Hostinger

En el panel de Hostinger:
1. Ve a **Hosting → Node.js → Tu Aplicación → Environment Variables**
2. Agrega:
   ```
   NODE_ENV=production
   PORT=3001
   API_URL=https://tu-dominio.com
   ```

### 8. Iniciar la Aplicación

```bash
cd /home/usuario/nojs_app_WebSSCC
npm start
```

O mediante PM2 (recomendado):
```bash
npm install -g pm2
pm2 start server/index.js --name "WebSSCC"
pm2 save
pm2 startup
```

---

## 🔧 Estructura Esperada en Hostinger

```
/home/usuario/nojs_app_WebSSCC/
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env
├── client/
│   ├── dist/           (archivos compilados)
│   ├── src/
│   ├── package.json
│   └── .env.production
├── package.json
└── README.md
```

---

## 🌐 Dominio Personalizado

1. En **Hostinger → Dominios**, asigna tu dominio a la aplicación Node.js
2. Actualiza `VITE_API_URL` en `.env.production` con la URL del dominio
3. Recompila el frontend:
   ```bash
   cd client
   npm run build
   ```
4. Reinicia la aplicación Node.js

---

## 📊 Verificación

Accede a:
- **Frontend:** https://tu-dominio.com
- **API de Fixtures:** https://tu-dominio.com/api/fixtures
- **API de Posiciones:** https://tu-dominio.com/api/standings

---

## 🆘 Troubleshooting

### Error: "Cannot find module 'dotenv'"
```bash
cd server
npm install dotenv
```

### Puerto 3001 ya en uso
Cambia el puerto en `.env`:
```env
PORT=3002
```

### Frontend no carga
1. Verifica que `npm run build` se ejecutó
2. Confirma que `client/dist/` existe
3. Reinicia la aplicación

### CORS errors
Actualiza en `server/index.js`:
```javascript
app.use(cors({
  origin: 'https://tu-dominio.com',
  credentials: true
}));
```

---

## 📝 Notas

- El servidor sirve tanto la API como los archivos estáticos del frontend
- La ruta `*` en Express redirecciona al `index.html` para SPA
- Hostinger maneja automáticamente los certificados SSL

