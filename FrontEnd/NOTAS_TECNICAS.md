# 📝 Notas Técnicas para Desarrolladores

## 🏛️ Contexto Histórico del Namespace

### El "Lost Media" de app.metrolinea.io

**Cronología del Namespace:**
```
2022: app.metrolinea.io → Aplicación de transporte masivo Metrolínea
2023: Desaparece de Play Store
2024: Mismo namespace usado por ERP empresarial de Neogestión
2026: Sistema SITME (nueva arquitectura ABT)
```

**Implicaciones:**
- Falla de custodia de propiedad intelectual
- Pérdida del "Lost Media" original
- Necesidad de documentar la transición tecnológica

---

## 🔄 Transición Card-Based → Account-Based

### Sistema Anterior (TISA - Card-Based)
```
Usuario → Tarjeta Física → Validador → Descuento en tarjeta
```

**Características:**
- Saldo almacenado en chip de la tarjeta
- Puntos de recarga físicos obligatorios
- No permite transferencias entre usuarios
- Riesgo de pérdida = pérdida de saldo

### Sistema Actual (SITME - Account-Based)
```
Usuario → Smartphone (QR/NFC) → Validador → Descuento en cuenta cloud
```

**Características:**
- Saldo en la nube (servidor)
- Recarga online (Wompi/PSE/Nequi)
- Transferencias P2P entre usuarios
- Pérdida de teléfono ≠ pérdida de saldo

---

## 🔐 Arquitectura de Seguridad

### QR Dinámico

**Especificaciones:**
- Renovación cada 10 segundos
- Token único por transacción
- Bloqueo de capturas de pantalla

**Implementación en Producción:**

```java
// Android - Bloqueo de capturas
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    getWindow().setFlags(
        WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE
    );
}
```

```swift
// iOS - Detección de capturas
NotificationCenter.default.addObserver(
    forName: UIScreen.capturedDidChangeNotification,
    object: nil,
    queue: .main
) { notification in
    if UIScreen.main.isCaptured {
        // Ocultar contenido sensible
    }
}
```

### Validación de Contraseñas

**Requisitos Mínimos:**
```javascript
// Patrón implementado en script.js
- Longitud: >= 8 caracteres
- Mayúsculas: >= 1
- Minúsculas: >= 1
- Números: >= 1
- Recomendado: Caracteres especiales (!@#$%^&*)
```

**Regex de Validación Robusta:**
```javascript
const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
```

---

## 📱 Tecnologías NFC

### Compatibilidad de Dispositivos

**Android:**
- NFC disponible desde Android 4.0+
- Requiere permiso: `<uses-permission android:name="android.permission.NFC" />`
- Chips soportados: ISO/IEC 14443, FeliCa

**iOS:**
- NFC Reader disponible desde iOS 11+
- Core NFC Framework
- **CRÍTICO**: Bug de lectura de tags resuelto en SITME v1.0.5+17

**Implementación de Lectura NFC:**

```javascript
// Web NFC API (Chrome Android)
if ('NDEFReader' in window) {
    const reader = new NDEFReader();
    await reader.scan();
    
    reader.onreading = ({ message, serialNumber }) => {
        console.log(`NFC Tag: ${serialNumber}`);
        // Procesar validación de viaje
    };
}
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores Institucional

```css
/* Primarios */
--verde-metrolinea: #76c043;    /* Buses articulados y padrones */
--amarillo-accion: #FFC107;     /* Botón flotante central */

/* Secundarios */
--azul-sitme: #2196f3;          /* Información */
--morado-billetera: #667eea;    /* Sección ABT */
--rosa-cae: #f093fb;            /* Puntos de recarga */

/* Estados */
--verde-disponible: #4caf50;    /* Bus disponible */
--amarillo-ruta: #ff9800;       /* Bus en ruta */
--rojo-lleno: #f44336;          /* Bus lleno */
```

### Grid System

```css
/* Botones de Transacción: Grid 2x2 Mobile, 4x1 Desktop */
.transaction-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

@media (min-width: 768px) {
    .transaction-buttons {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

---

## ⚡ Optimizaciones de Performance

### Lazy Loading de Imágenes
```html
<img src="placeholder.jpg" data-src="bus-real.jpg" loading="lazy" alt="Bus Metrolínea">
```

### Service Worker para Offline
```javascript
// sw.js - Cachear assets críticos
const CACHE_NAME = 'sitme-v1.0.5';
const urlsToCache = [
    '/',
    '/styles.css',
    '/script.js',
    '/offline.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});
```

### Reducción de Peso de la App

**App Real: 82.5 MB**
- Assets gráficos: ~40 MB (mapas, iconos, ilustraciones)
- Lógica JavaScript: ~5 MB (incluyendo librerías)
- Datos de rutas: ~10 MB (JSON de Moovit)
- Otros: ~27.5 MB (fuentes, recursos)

**Optimizaciones Sugeridas:**
```
✓ WebP en lugar de PNG/JPG (reducción del 30%)
✓ Tree shaking de librerías no usadas
✓ Code splitting por rutas
✓ Compresión Brotli
```

---

## 🌐 Integración con Moovit

### API de Planificación de Rutas

**Endpoint Conceptual:**
```
GET https://api.moovit.com/mapi/v1/routing
?fromLat=7.1193&fromLon=-73.1227
&toLat=7.1297&toLon=-73.1201
&time=now
&lang=es
```

**Respuesta Esperada:**
```json
{
    "routes": [
        {
            "id": "route_p8",
            "name": "P8",
            "type": "padron",
            "duration": 25,
            "transfers": 0,
            "fare": 3000
        }
    ]
}
```

---

## 💳 Pasarelas de Pago

### Wompi Integration

**SDK de Wompi:**
```javascript
const wompi = new Wompi({
    publicKey: 'pub_test_xxxxx',
    currency: 'COP'
});

wompi.checkout({
    amount: 10000, // En centavos
    reference: 'recarga_' + Date.now(),
    redirectUrl: 'https://app.metrolinea.io/success'
});
```

### PSE (Pagos Seguros en Línea)
- Integración directa con bancos colombianos
- Débito inmediato
- Confirmación en 5-10 minutos

### Nequi
- API de transferencias instantáneas
- Push notification para autorización
- Confirmación en tiempo real

---

## 📊 Base de Datos Legada (TISA)

### Problema de Migración

**Estructura Antigua (TISA):**
```sql
CREATE TABLE usuarios_tisa (
    cedula VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100),
    tarjeta_fisica VARCHAR(16),
    saldo_tarjeta DECIMAL(10,2)
);
```

**Estructura Nueva (SITME):**
```sql
CREATE TABLE usuarios_sitme (
    cedula VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    password_hash VARCHAR(255),
    saldo_cloud DECIMAL(10,2),
    perfil ENUM('regular', 'student', 'senior', 'athlete'),
    has_2fa BOOLEAN
);
```

**Conflicto de Migración:**
- Cédulas duplicadas entre sistemas
- Falta de email en registros antiguos
- Imposibilidad de crear cuenta nueva con cédula existente

**Solución Temporal:**
```sql
-- Script de reconciliación
UPDATE usuarios_sitme 
SET migrado_desde_tisa = TRUE 
WHERE cedula IN (SELECT cedula FROM usuarios_tisa);
```

---

## 🔍 Monitoreo y Analytics

### Eventos Críticos a Trackear

```javascript
// Inicialización de analytics
const trackEvent = (category, action, label) => {
    gtag('event', action, {
        'event_category': category,
        'event_label': label
    });
};

// Eventos de negocio
trackEvent('QR', 'activate', 'qr_generated');
trackEvent('Payment', 'recharge', 'wompi_10000');
trackEvent('Route', 'search', 'provenza_to_uis');
trackEvent('PQRSDF', 'submit', 'conductor_complaint');
```

---

## 🚀 Roadmap de Funcionalidades Futuras

### Q3 2026
- [ ] Integración con Apple Pay / Google Pay
- [ ] Modo oscuro (Dark Mode)
- [ ] Notificaciones push de retrasos
- [ ] Chat de soporte en tiempo real

### Q4 2026
- [ ] Realidad Aumentada para navegación en estaciones
- [ ] Sistema de puntos de fidelidad
- [ ] Pases mensuales y corporativos
- [ ] Widget de home screen

---

## 📞 Endpoints de la API (Conceptual)

```
BASE_URL: https://api.sitme.metrolinea.gov.co/v1

Auth:
POST   /auth/login
POST   /auth/register
POST   /auth/2fa/verify
GET    /auth/logout

Wallet:
GET    /wallet/balance
POST   /wallet/recharge
POST   /wallet/transfer
GET    /wallet/history

Trips:
POST   /trips/validate
GET    /trips/routes
GET    /trips/realtime/{route_id}

PQRSDF:
POST   /pqrsdf/submit
GET    /pqrsdf/status/{ticket_id}

CAE:
GET    /cae/locations
GET    /cae/hours/{cae_id}
```

---

## 🛠️ Herramientas de Desarrollo Recomendadas

- **Diseño**: Figma, Adobe XD
- **Testing**: Jest, Cypress
- **Performance**: Lighthouse, WebPageTest
- **Debugging**: Chrome DevTools, React DevTools
- **CI/CD**: GitHub Actions, GitLab CI
- **Monitoring**: Sentry, New Relic

---

**Última actualización:** Junio 19, 2026  
**Versión de notas:** 1.0
