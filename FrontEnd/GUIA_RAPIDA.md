# 🚀 Guía Rápida de Inicio - SITME Metrolínea

## ✅ Verificación de Archivos

Asegúrate de tener estos archivos en tu carpeta:

```
Hack-A-ton/
├── index.html              ← Archivo principal (ABRE ESTE)
├── styles.css              ← Estilos CSS (ya conectado)
├── script.js               ← JavaScript (ya conectado)
├── test-conexion.html      ← Página de prueba
├── README.md               ← Documentación completa
├── NOTAS_TECNICAS.md       ← Documentación técnica
└── GUIA_RAPIDA.md         ← Este archivo
```

---

## 🔗 Estado de las Conexiones

### ✅ CSS Conectado
**Ubicación en index.html (línea 13):**
```html
<link rel="stylesheet" href="styles.css">
```

### ✅ JavaScript Conectado  
**Ubicación en index.html (antes de `</body>`):**
```html
<script src="script.js"></script>
```

### ✅ Google Fonts Conectado
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🎯 Cómo Iniciar la Aplicación

### Opción 1: Abrir Directamente
1. Navega a la carpeta `Hack-A-ton`
2. Haz **doble clic** en `index.html`
3. Se abrirá en tu navegador predeterminado

### Opción 2: Desde el Navegador
1. Abre tu navegador (Chrome, Firefox, Edge, etc.)
2. Presiona `Ctrl + O` (Abrir archivo)
3. Selecciona `index.html`
4. ¡Listo!

### Opción 3: Servidor Local (Opcional)
Si tienes Python instalado:
```bash
# Navega a la carpeta
cd "c:\Users\david\OneDrive\Escritorio\Hack-A-ton"

# Inicia servidor local
python -m http.server 8000

# Abre en navegador: http://localhost:8000
```

---

## 🧪 Verificar que Todo Funciona

### Test Rápido
1. Abre `test-conexion.html` primero
2. Verifica que veas las marcas ✅ verdes
3. Haz clic en los botones de prueba
4. Si todo funciona, abre `index.html`

### Checklist Visual en la App Principal

**Al abrir index.html deberías ver:**

✅ **Header verde lima** con logo de bus 🚌  
✅ **Botón de accesibilidad** flotante (♿) en la esquina superior derecha  
✅ **Marquesina de alertas** amarilla animada  
✅ **Billetera digital** con degradado morado  
✅ **4 botones de transacción** en grid 2x2  
✅ **Botón amarillo circular** grande (Activar QR)  
✅ **Formularios** de planificación de viaje  
✅ **Footer negro** con información del proyecto  

---

## 🎮 Prueba las Funcionalidades

### 1. Panel de Accesibilidad
- Clic en el botón ♿ (esquina superior derecha)
- Prueba los botones A+ / A-
- Activa filtros de contraste
- Marca las casillas de opciones

### 2. Iniciar Sesión
- Clic en "Iniciar sesión" (arriba a la izquierda)
- **Cédula de prueba:** 1098765432
- **Contraseña de prueba:** Metrolinea2026
- Marca "Activar 2FA" si quieres
- Clic en "Ingresar"

### 3. Activar QR de Viaje
- Clic en el botón amarillo grande 🚍
- Observa el QR que aparece
- Mira el contador de 10 segundos

### 4. Recargar Saldo
- Clic en el botón "💳 Recargar"
- Ingresa una cantidad (ej: 10000)
- Observa cómo se actualiza tu saldo

### 5. Planear Viaje
- Selecciona "Origen": Portal Norte
- Selecciona "Destino": Provenza
- Clic en "Buscar Ruta"
- Verás las rutas disponibles

### 6. Cambiar Idioma
- Usa el selector de idioma (arriba a la derecha)
- Cambia entre 🇪🇸 Español y 🇬🇧 English

---

## 🎨 Paleta de Colores (Para Referencia)

```
🟢 Verde Lima:     #76c043 (Color principal Metrolínea)
🟡 Amarillo:       #FFC107 (Botón de acción QR)
🔵 Azul:           #2196f3 (Información)
🟣 Morado:         #667eea (Billetera digital)
🔴 Rojo:           #f44336 (Alertas/Errores)
⚫ Negro:          #1a1a1a (Texto principal)
⚪ Blanco:         #ffffff (Fondos)
```

---

## 🐛 Solución de Problemas

### No se ve el diseño (sin colores/estilos)
**Problema:** CSS no está cargando  
**Solución:**
1. Verifica que `styles.css` esté en la misma carpeta que `index.html`
2. Abre la consola del navegador (F12)
3. Busca errores en la pestaña "Console"
4. Refresca la página (Ctrl + F5)

### Los botones no hacen nada
**Problema:** JavaScript no está cargando  
**Solución:**
1. Verifica que `script.js` esté en la misma carpeta
2. Abre la consola (F12) y busca errores
3. Deberías ver mensajes como "🚌 SITME Metrolínea v1.0.5+17 inicializada"

### La fuente se ve diferente
**Problema:** Google Fonts no cargó  
**Solución:**
1. Verifica tu conexión a Internet
2. La fuente Inter debe descargarse de Google Fonts
3. Si no hay Internet, se usará Arial como respaldo

---

## 📱 Compatibilidad

### ✅ Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+
- ✅ Opera 76+

### ✅ Dispositivos
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Tablet (iPad, Android tablets)
- ✅ Móvil (iPhone, Android)

### ⚠️ No Requerido
- ❌ No necesitas servidor web
- ❌ No necesitas Node.js
- ❌ No necesitas instalar nada
- ❌ No hay dependencias externas

---

## 📞 Recursos Adicionales

### Documentación
- `README.md` - Documentación completa del proyecto
- `NOTAS_TECNICAS.md` - Detalles técnicos para desarrolladores

### Enlaces
- [Metrolínea Oficial](https://www.metrolinea.gov.co)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎉 ¡Listo para Usar!

Tu aplicación SITME Metrolínea está **100% funcional** y lista para explorar.

### Credenciales de Prueba Rápida
```
Usuario: 1098765432
Contraseña: Metrolinea2026
```

### Próximos Pasos
1. ✅ Abre `index.html`
2. ✅ Explora todas las funcionalidades
3. ✅ Prueba el panel de accesibilidad
4. ✅ Activa el QR dinámico
5. ✅ Recarga saldo y revisa el historial

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para ver logs de debugging.

**Made with 💚 for Bucaramanga**
