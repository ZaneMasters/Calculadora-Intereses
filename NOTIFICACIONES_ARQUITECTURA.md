# 🔔 Arquitectura de Notificaciones Push — Calculadora de Rendimientos

Documento técnico que describe las dos opciones para implementar **notificaciones push reales** (que llegan aunque el browser esté cerrado) cuando las tasas de interés cambian en la app.

---

## Contexto del problema

La app es un sitio **completamente estático** (Astro + React). Las tasas están hardcodeadas en `src/utils/bankOptions.json`. Para enviar una notificación a un usuario con el browser cerrado, el protocolo Web Push exige obligatoriamente:

1. Un **servidor** que firme la solicitud con una clave privada (VAPID).
2. Una **base de datos** que almacene los tokens de suscripción de cada usuario.
3. Un **proceso que detecte el cambio** de tasa y dispare el envío.

Sin backend, solo es posible mostrar alertas in-app (cuando el usuario ya tiene la pestaña abierta).

---

## Opción A — Firebase Cloud Messaging (FCM) + Google Cloud Functions

### Costo estimado

| Servicio | Free Tier | Precio si superas el límite |
|---|---|---|
| **FCM (mensajes push)** | **Gratis ilimitado** | $0 siempre |
| **Cloud Firestore** (suscripciones) | 1 GB almacenamiento + 50K lecturas/día | ~$0.06/100K lecturas |
| **Cloud Run Functions** (lógica) | **2 millones de invocaciones/mes** | $0.40/millón adicional |
| **Firebase Hosting** (opcional) | 10 GB/mes | $0.026/GB adicional |
| **Total estimado mes (app pequeña)** | **$0** | Escala solo si creces mucho |

> ⚠️ Para usar Cloud Functions necesitas activar el plan **Blaze (pay-as-you-go)** en Firebase, que requiere ingresar una tarjeta de crédito. El free tier sigue aplicando, pero hay riesgo teórico de cobro si hay un bug o abuso.

---

### Arquitectura detallada

```
┌──────────────────────────────────────────────────────────────────┐
│                        USUARIO (Browser)                         │
│                                                                  │
│  1. Visita la app → se carga el Service Worker                   │
│  2. Acepta recibir notificaciones (prompt nativo del browser)    │
│  3. Browser genera un token FCM único para ese dispositivo       │
│  4. App envía ese token a Cloud Firestore (guardado)             │
└──────────────────────┬───────────────────────────────────────────┘
                       │  Token guardado en DB
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                   CLOUD FIRESTORE (Base de Datos)                │
│                                                                  │
│  Colección: subscriptions                                        │
│  { token: "xxx", fecha: "2026-08-02", activo: true }            │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       │  (Cuando se actualiza bankOptions.json
                       │   y se hace deploy)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│              CLOUD FUNCTION (Node.js) — "detectRateChange"       │
│                                                                  │
│  Trigger: HTTP o Scheduled (ej. cada día a las 8am)             │
│                                                                  │
│  1. Lee tasas actuales (desde un documento en Firestore o       │
│     archivo JSON del deploy)                                     │
│  2. Compara con tasas de la versión anterior (guardadas en DB)  │
│  3. Si hay diferencias → construye mensaje de notificación       │
│  4. Lee todos los tokens activos de Firestore                   │
│  5. Llama a FCM API con el mensaje y los tokens                 │
│  6. Actualiza tasas de referencia en Firestore                  │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       │  POST a FCM API (firmado con VAPID)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│              FIREBASE CLOUD MESSAGING (FCM)                      │
│                                                                  │
│  Recibe la solicitud, verifica la firma, enruta al browser       │
│  push service correspondiente (Chrome → Google Push Service,    │
│  Firefox → Mozilla Push Service, etc.)                          │
└──────────────────────┬───────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                   DISPOSITIVO DEL USUARIO                        │
│                                                                  │
│  Service Worker intercepta el evento `push`                      │
│  Muestra notificación nativa del OS:                            │
│                                                                  │
│  ┌─────────────────────────────────┐                            │
│  │ 📈 Tasas actualizadas           │                            │
│  │ Pibank subió de 11.00% a 11.50% │                            │
│  │ Nu Colombia bajó de 9.30% a 9%  │                            │
│  │ [Ver calculadora]               │                            │
│  └─────────────────────────────────┘                            │
│                                                                  │
│  ✅ Llega aunque el browser esté cerrado                         │
│  ✅ Funciona en Android, Windows, macOS, Linux                   │
│  ❌ NO funciona en iOS Safari (restricciones Apple)             │
└──────────────────────────────────────────────────────────────────┘
```

### Qué hay que construir

| Componente | Dónde | Qué hace |
|---|---|---|
| `firebase-messaging-sw.js` | `/public/` (raíz del sitio) | Service Worker que escucha eventos push |
| `useFirebasePush.js` | `src/hooks/` | Solicita permiso, genera token, lo manda a Firestore |
| `subscriptions` collection | Cloud Firestore | Almacena tokens de dispositivos |
| `rates_reference` doc | Cloud Firestore | Tasas de la última versión conocida |
| `detectRateChange` | Cloud Function (Node.js) | Compara tasas, envía notificaciones FCM |
| Trigger de la función | Cloud Scheduler o deploy hook | Dispara la función automáticamente |

### Flujo de actualización de tasa

```
Developer actualiza bankOptions.json
        │
        ▼
git push → deploy (Netlify/Vercel/Firebase Hosting)
        │
        ▼
Webhook dispara Cloud Function "detectRateChange"
        │
        ▼
Función compara JSON nuevo vs tasas en Firestore
        │
    ¿Hay cambios?
       │        │
      NO        SI
       │         │
    No hace      Manda push a todos los tokens
    nada         en Firestore via FCM
                 │
                 ▼
           Usuario recibe notificación
           (incluso con browser cerrado)
```

---

## Opción B — OneSignal

### Costo estimado

| Plan | Precio | Límite web push |
|---|---|---|
| **Free** | **$0/mes** | ~10,000 suscriptores por envío |
| Growth | desde $19/mes | sin límite MAU |
| Professional | desde $999/mes | funciones enterprise |

> ✅ Para este proyecto, el plan gratuito de OneSignal es suficiente. No requiere tarjeta de crédito para empezar.

---

### Arquitectura detallada

```
┌──────────────────────────────────────────────────────────────────┐
│                        USUARIO (Browser)                         │
│                                                                  │
│  1. Visita la app → se carga OneSignalSDKWorker.js              │
│  2. OneSignal muestra su propio prompt de permiso               │
│  3. Browser asigna un Player ID único al usuario en OneSignal   │
│  4. OneSignal gestiona toda la suscripción internamente         │
│     (no necesitas guardar tokens tú mismo)                      │
└──────────────────────────────────────────────────────────────────┘
                       │  (Todo lo gestiona OneSignal)
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│              ONESIGNAL PLATFORM (SaaS)                           │
│                                                                  │
│  ✅ Almacena todos los tokens de suscripción                     │
│  ✅ Maneja la renovación y limpieza de tokens                    │
│  ✅ Dashboard para ver métricas (suscriptores, aperturas, etc.) │
│  ✅ Segmentación de usuarios                                      │
└──────────────────────────────────────────────────────────────────┘
                       ▲
                       │  POST a REST API de OneSignal
                       │  (con REST API Key — SECRETA)
┌──────────────────────┴───────────────────────────────────────────┐
│         FUNCIÓN SERVERLESS — "notifyRateChange"                  │
│         (Netlify Function / Vercel Function / cualquier)         │
│                                                                  │
│  Trigger: Deploy hook o cron job externo                         │
│                                                                  │
│  1. Lee bankOptions.json del deploy actual                       │
│  2. Compara con tasas guardadas (KV store, archivo, env vars)   │
│  3. Si hay cambios → POST a OneSignal REST API                  │
│     con el mensaje de notificación                               │
│  4. OneSignal distribuye a TODOS los suscriptores               │
└──────────────────────────────────────────────────────────────────┘
                       │
                       │  OneSignal → Browser Push Services
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│                   DISPOSITIVO DEL USUARIO                        │
│                                                                  │
│  Service Worker de OneSignal intercepta el push                  │
│  Muestra notificación nativa del OS:                            │
│                                                                  │
│  ┌─────────────────────────────────┐                            │
│  │ 💰 Tasas actualizadas           │                            │
│  │ Pibank subió de 11.00% a 11.50% │                            │
│  │ [Ver calculadora]               │                            │
│  └─────────────────────────────────┘                            │
│                                                                  │
│  ✅ Llega aunque el browser esté cerrado                         │
│  ✅ Dashboard con métricas de entrega                            │
│  ✅ Más fácil de implementar que FCM                             │
│  ❌ Dependencia de un tercero (OneSignal puede cambiar precios)  │
└──────────────────────────────────────────────────────────────────┘
```

### Qué hay que construir

| Componente | Dónde | Qué hace |
|---|---|---|
| `OneSignalSDKWorker.js` | `/public/` (raíz del sitio) | Service Worker de OneSignal (se descarga de su CDN) |
| Script de init OneSignal | `src/layouts/Layout.astro` | Inicializa el SDK con tu App ID |
| `notifyRateChange` | Netlify Function / Vercel Function | Compara tasas y llama a la REST API de OneSignal |
| Cron job o deploy hook | Netlify/Vercel scheduler | Dispara la función automáticamente |
| `rates_snapshot.json` | Variable de entorno o KV store | Tasas de la última versión para comparar |

### Flujo de actualización de tasa

```
Developer actualiza bankOptions.json
        │
        ▼
git push → Deploy automático (Netlify/Vercel)
        │
        ▼
Deploy hook dispara Netlify/Vercel Function
        │
        ▼
Función compara bankOptions.json nuevo
vs. snapshot guardado en KV/env
        │
    ¿Hay cambios?
       │        │
      NO        SI
       │         │
    No hace      POST a OneSignal REST API:
    nada         { message: "Pibank subió a 11.5%" }
                 │
                 ▼
           OneSignal distribuye a todos los
           suscriptores registrados
                 │
                 ▼
           Usuario recibe notificación
```

---

## Comparación directa

| Criterio | Opción A (FCM) | Opción B (OneSignal) |
|---|---|---|
| **Costo** | $0 (con tarjeta registrada en Firebase) | $0 hasta ~10K suscriptores |
| **Complejidad** | Alta (Firebase SDK + Firestore + Cloud Functions) | Baja (un script + una función serverless) |
| **Control de datos** | Total (tus propios datos en Firestore) | Limitado (datos en servidores de OneSignal) |
| **Dependencia de terceros** | Google (Firebase/GCP) | OneSignal |
| **Tiempo de implementación** | ~2-3 días | ~4-6 horas |
| **Dashboard de métricas** | Firebase Console | OneSignal Dashboard (mejor UX) |
| **iOS Safari** | ❌ No soportado | ❌ No soportado |
| **Riesgo de cambio de precios** | Bajo (Google escala masiva) | Medio (startup, ya subió precios) |
| **Requiere tarjeta de crédito** | Sí (plan Blaze de Firebase) | No (plan free sin tarjeta) |

---

## Alternativa más económica para este caso

Si la app no necesita escalar a miles de usuarios, existe una **opción híbrida O gratuita total**:

### Opción C — In-app solamente (sin backend, $0 siempre)

- Detectar cambios de tasas comparando `bankOptions.json` vs `localStorage` al cargar la app.
- Mostrar banner animado + `Notification` nativa del browser **si la pestaña está abierta**.
- **Limitación**: no llega si el browser está cerrado.
- **Ventaja**: $0, sin dependencias, implementación en horas, 100% estático.

> Esta opción ya fue diseñada en `implementation_plan.md` y es recomendada para la etapa actual del proyecto.

---

*Documento generado el 2026-08-02. Los precios pueden variar; verificar siempre en las páginas oficiales de cada servicio.*
