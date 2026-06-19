# 🚌 SITME Metrolínea - Reconstrucción Frontend

## 📋 Descripción del Proyecto

Este proyecto es una **reconstrucción histórica** de la interfaz de usuario del Sistema Integrado de Transporte Masivo del Área Metropolitana de Bucaramanga (Metrolínea/SITME). Captura la evolución del sistema desde la versión "Lost Media" de 2022 hasta la versión moderna SITME de 2026.

### 🎯 Objetivo

Recuperar la memoria tecnológica de Metrolínea y documentar la transición de un sistema **Card-Based** (tarjetas físicas) a un sistema **Account-Based Ticketing (ABT)** donde el smartphone es la llave de acceso al transporte público.

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **HTML5** - Estructura semántica
- **CSS3** - Diseño modular con Flexbox y Grid
- **JavaScript (Vanilla)** - Lógica de negocio sin frameworks
- **Mobile-First Design** - Optimizado para dispositivos móviles

### Características Clave

#### 🎨 Identidad Visual
- **Color Primario**: Verde Lima (#76c043) - Icónico de los buses de Metrolínea
- **Color Secundario**: Amarillo (#FFC107) - Acciones rápidas y botón central
- **Tipografía**: Inter (sans-serif) - Estilo gubernamental .gov.co
- **Filosofía**: "Cero Papel" y "Ciudad Inteligente"

#### ♿ Accesibilidad (WCAG 2.1 AA)
- Control de escala de texto (A- / A+)
- Filtros de alto contraste
- Escala de grises
- Contraste negativo
- Subrayado de enlaces
- Fuente legible uniforme

#### 🔐 Seguridad
- Validación de contraseñas robustas (8+ caracteres, mayúsculas, minúsculas, números)
- Soporte para autenticación de dos factores (2FA)
- QR dinámico que se regenera cada 10 segundos
- Simulación de bloqueo de capturas de pantalla en la vista del validador

---

## 🚀 Funcionalidades Implementadas

### 1. **Sistema de Autenticación**
- Login/Registro con validación de cédula
- Alerta sobre base de datos legada (TISA → SITME)
- Gestión de perfil de usuario

### 2. **Billetera Digital (ABT)**
- Visualización de saldo en tiempo real
- Gestión de bolsillos digitales
- Historial de transacciones
- Recargas (Wompi/PSE/Nequi)
- Transferencias entre usuarios

### 3. **Validador de Viaje**
- Botón flotante amarillo icónico
- QR dinámico con renovación automática
- Temporizador de seguridad (10 segundos)
- Protección anti-fraude

### 4. **Tarifas Diferenciales**
- Usuario Regular: $3.000 COP
- Estudiante: $1.500 COP (50% subsidio)
- Adulto Mayor: $1.500 COP (50% subsidio)
- Deportista: $1.500 COP (50% subsidio)

### 5. **Planificador de Viajes**
- Integración conceptual con Moovit
- Búsqueda de rutas óptimas
- Sugerencias de rutas (P8, RD15, A1, etc.)
- Seguimiento en tiempo real

### 6. **Sistema PQRSDF**
- Peticiones, Quejas, Reclamos, Sugerencias, Denuncias y Felicitaciones
- Formulario estructurado por tipo de incidencia
- Reportes sobre conductores, frecuencias e infraestructura

### 7. **Localizador de Puntos CAE**
- Mapa de Centros de Atención y Recarga
- Ubicaciones: Provenza, UIS, Portal Norte
- Horarios de atención

### 8. **Multiidioma**
- Español (ES)
- Inglés (EN)

---

## 📱 Estructura de Archivos

```
Hack-A-ton/
├── index.html          # Estructura HTML semántica
├── styles.css          # Estilos modulares con CSS3
├── script.js           # Lógica JavaScript interactiva
└── README.md           # Documentación (este archivo)
```

---

## 🎮 Instrucciones de Uso

### Instalación Local

1. Clona o descarga este repositorio
2. Abre `index.html` en tu navegador preferido
3. No requiere servidor ni dependencias externas

### Navegación

1. **Inicio**: Explora la interfaz como invitado
2. **Login**: Haz clic en "Iniciar sesión" para acceder a funcionalidades completas
   - Cédula: Cualquier número de 7-10 dígitos
   - Contraseña: Mínimo 8 caracteres (debe incluir mayúsculas, minúsculas y números)
3. **Activar QR**: Usa el botón amarillo central para generar tu código de viaje
4. **Recargar**: Simula recargas con la pasarela de pagos
5. **Planear Viaje**: Ingresa origen y destino para buscar rutas

### Funcionalidades de Prueba

```javascript
// Credenciales de prueba
Cédula: 1098765432
Contraseña: Metrolinea2026

// Saldo inicial
$15.000 COP
```

---

## 📚 Contexto Histórico

### El Misterio del "Lost Media"

La aplicación original de Metrolínea (namespace: `app.metrolinea.io`) desapareció de la Play Store en 2022 y fue reemplazada por un software ERP de Neogestión. Este proyecto documenta y reconstruye esa memoria tecnológica.

### Problema de Migración

Muchos usuarios reales de SITME no pueden registrarse porque sus cédulas ya están en la base de datos legada de TISA. Esto se refleja en el disclaimer del modal de registro.

### Línea de Tiempo

- **2022**: Versión "Lost Media" con namespace `app.metrolinea.io`
- **2026**: Versión moderna SITME v1.0.5+17
- **Transición**: Card-Based (tarjetas físicas) → ABT (saldo en la nube)

---

## 🔧 Consideraciones Técnicas

### Peso de la Aplicación Real
La app SITME real pesa aproximadamente **82.5 MB** en dispositivos móviles.

### Compatibilidad NFC
El sistema usa **NFC y QR dinámico**. La lectura de tags NFC en iPhone se arregló en la versión v1.0.5+17.

### Seguridad en Producción
En producción real, se debe implementar:
- Android: `FLAG_SECURE` para bloquear capturas
- iOS: `UIScreen.isCaptured` para detectar grabaciones

---

## 🎯 Uso Educativo

Este proyecto es una **reconstrucción educativa** que sirve para:

1. Estudiar patrones de UX/UI en apps de transporte público
2. Entender la transición de sistemas Card-Based a Account-Based
3. Documentar la historia tecnológica de Metrolínea
4. Aprender sobre diseño accesible (WCAG)
5. Practicar desarrollo frontend Mobile-First

---

## 📞 Contacto e Información

- **Sistema Real**: [metrolinea.gov.co](https://www.metrolinea.gov.co)
- **Versión**: v1.0.5+17 (2026)
- **Namespace Original**: app.metrolinea.io (Lost Media 2022)

---

## 📄 Licencia

Este proyecto es una **reconstrucción educativa sin fines comerciales** para fines de documentación histórica y aprendizaje.

---

## 🙏 Agradecimientos

A todos los usuarios que preservaron la memoria de la aplicación original de Metrolínea y contribuyeron a documentar esta transición tecnológica histórica del transporte masivo en Bucaramanga.

---

**Made with 💚 for the people of Bucaramanga**
