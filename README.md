# 💰 Calculadora de Rendimientos Financieros

¡Bienvenido al proyecto **Calculadora de Rendimientos**! Esta aplicación web te permite simular y comparar los rendimientos de inversiones en diferentes bancos colombianos, ayudándote a tomar decisiones financieras informadas.

![Estado del Proyecto](https://img.shields.io/badge/Estado-En_Desarrollo-yellow)

## 🚀 Descripción del Proyecto

Este proyecto es una herramienta interactiva diseñada para calcular las ganancias potenciales de una inversión a plazo fijo (CDT u otros instrumentos). Los usuarios pueden ingresar el monto a invertir, el plazo en meses y seleccionar una entidad financiera para ver:

- **Tasa Efectiva Anual (E.A.)** ofrecida por el banco.
- **Rendimientos totales** al final del periodo.
- **Ganancia mensual y diaria** estimada.
- **Retención en la Fuente:** Indicador automático de si la inversión está sujeta a impuestos.

## 🛠️ Tecnologías Utilizadas

El proyecto está construido con un stack moderno y eficiente:

- **[Astro](https://astro.build/):** Framework web para contenido rápido y optimizado.
- **[React](https://react.dev/):** Biblioteca para construir interfaces de usuario interactivas (utilizada en los componentes de la calculadora).
- **[Tailwind CSS](https://tailwindcss.com/):** Framework de utilidad para un diseño rápido y responsivo.
- **[Recharts](https://recharts.org/):** Biblioteca de gráficos para visualizar la proyección de crecimiento de la inversión.

## 📂 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # Componentes React (Calculadora, Gráficos, Tablas)
│   ├── layouts/          # Plantillas de diseño Astro
│   ├── pages/            # Rutas y páginas de la aplicación
│   ├── utils/            # Lógica de cálculo y configuraciones
│   └── hooks/            # Hooks personalizados (useCalculatorLogic)
└── package.json
```

## 🧞 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto en tu terminal:

| Comando                   | Acción                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Instala las dependencias del proyecto            |
| `npm run dev`             | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build`           | Construye el sitio para producción en `./dist/`  |
| `npm run preview`         | Previsualiza la versión construida localmente    |

## 👣 Primeros Pasos

1.  **Clona el repositorio** (si aún no lo has hecho).
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
4.  Abre tu navegador en `http://localhost:4321` para ver la aplicación.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la calculadora o añadir más bancos, no dudes en abrir un *issue* o enviar un *pull request*.
