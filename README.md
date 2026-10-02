# PySpark Playground

Plataforma web interactiva para aprender Apache PySpark de forma práctica. El usuario escribe código PySpark en el navegador y lo ejecuta contra tests automáticos.

**Versión**: 1.0.0 | **Última actualización**: Septiembre 2026

---

## Tecnologías

| Tecnología | Versión | Función |
|------------|---------|---------|
| HTML5 | - | Estructura |
| CSS3 | - | Estilos y responsive |
| JavaScript vanilla | - | Lógica de la aplicación |
| Bootstrap | v5.3.3 | Responsive mobile nav, tabs y layout |
| Pyodide | v0.26.4 | Python en WebAssembly |
| Monaco Editor | v0.45.0 | Editor de código (el mismo de VS Code) |
| Apache PySpark | 3.5.0 | Framework de Big Data (simulado en navegador) |
| Service Worker | - | Caché de archivos estáticos con estrategia network-first |

---

## Estructura del Proyecto

```
Pyspark Playground/
├── index.html                    # Página principal
├── principiante.html             # Grid de lecciones principiante
├── intermedio.html               # Grid de lecciones intermedio
├── avanzado.html                 # Grid de lecciones avanzado
├── desafio.html                  # Desafío final (3 retos)
├── lecciones_principiante.html   # Playground principiante (12 lecciones)
├── lecciones_intermedio.html     # Playground intermedio (10 lecciones)
├── lecciones_avanzado.html       # Playground avanzado (10 lecciones)
├── robots.txt                    # Reglas para motores de búsqueda
├── sitemap.xml                   # Mapa del sitio para indexación
├── sw.js                         # Service Worker (network-first)
├── vercel.json                   # Configuración Vercel (estático)
└── README.md                     # Esta documentación
```

---

## Niveles de Aprendizaje

### Principiante
- **Color**: Verde (#00d4aa)
- **Lecciones**: 12
- **Temas**: SparkSession, DataFrames, show(), select, filter, withColumn, dropna, orderBy, dropDuplicates, tipos de datos, guardado, proyecto final

### Intermedio
- **Color**: Naranja (#ff6b35)
- **Lecciones**: 10
- **Temas**: Limpieza de datos, transformación, groupBy, joins, SQL, CSV/JSON, Parquet, guardado, proyecto final

### Avanzado
- **Color**: Rojo (#e74c3c)
- **Lecciones**: 10
- **Temas**: Python UDFs, UDTFs, Spark UI, monitoreo con top/ps, profiling, stacktraces, logging, IDE debugging, proyecto final

### Desafío
- **Color**: Morado (#667eea → #764ba2)
- **Retos**: 3
- **Retos**: ETL Completo, Análisis de Ventas, Pipeline de Datos

**Total: 32 lecciones + 3 desafíos = 35 ejercicios**

---

## Funcionalidades

### Editor de Código
- Monaco Editor con syntax highlighting para Python
- Números de línea y autocompletado
- Atajos: Ctrl+Enter (ejecutar), Ctrl+S (solución)

### Panel de Salida (Terminal-style)
- Salida formateada estilo PySpark con tablas `+---+`
- Simulación de `.show()`, `.printSchema()`, `.describe()`, `print()`
- Detección automática de `spark.createDataFrame()` y `spark.read.*`
- Resultados pre-calculados para lecciones conceptuales (ej: Spark UI)
- Mensajes de éxito automáticos al pasar todos los tests

### Sistema de Tests
- Validación por string matching en Python (Pyodide)
- **Checklist visual** con tests pasados/fallidos
- Contador de tests pasados
- Mensaje de éxito con `successMessage` cuando todos pasan

### Guía Educativa
- **Modal de guía** con contenido por nivel (principiante, intermedio, avanzado)
- Cada guía cubre las funciones y conceptos del nivel correspondiente
- Acceso desde el botón "📖 Guía Informativa"
- Se cierra con Escape o clic fuera del modal

### Progreso
- Guarda en localStorage
- Indicadores visuales por nivel (barra de progreso + puntos)
- Persiste entre sesiones
- Navegación automática entre niveles al completar el último

### Responsive (Mobile)
- Bootstrap 5.3.3 en todas las páginas de lecciones
- Mobile Nav: 3 tabs (Instrucciones, Editor, Resultado)
- Animación de paneles

---

## Almacenamiento Local

| Clave | Contenido |
|-------|-----------|
| `pysparkCompleted` | Lecciones principiante completadas |
| `pysparkCompletedIntermedio` | Lecciones intermedio completadas |
| `pysparkCompletedAvanzado` | Lecciones avanzado completadas |
| `pysparkDesafioCompleted` | Desafíos completados |

---

## Instalación

Es un proyecto **100% estático**. Para desarrollo local:

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx serve .
```

Luego abre `http://localhost:8000` en tu navegador.

**Importante**: Pyodide y los Service Workers no funcionan con el protocolo `file://`. Siempre usa un servidor local.

**Para producción**: Sube los archivos a Vercel, Netlify, GitHub Pages o cualquier hosting estático.

---

## Cómo Funciona

1. El usuario selecciona un nivel (o el Desafío)
2. Elige una lección del grid
3. Pyodide se carga en background (desde CDN)
4. Escribe código en el editor Monaco
5. Puede consultar la **guía educativa** con "📖 Guía Informativa"
6. El simulador de PySpark genera salida realista (tablas, esquemas, datos)
7. Ejecuta tests con Ctrl+Enter
8. Si hay un error, se muestra el checklist de tests
9. Si pasa, se marca como completada y se muestra mensaje de éxito
10. El progreso se guarda automáticamente en localStorage
11. En visitas posteriores, la caché del Service Worker acelera la carga
12. Los motores de búsqueda indexan el sitio mediante meta tags, Open Graph y sitemap.xml

---

## Simulador de PySpark

PySpark no puede ejecutarse en el navegador (depende de Java/Py4J). El proyecto usa un **simulador en JavaScript** que parsea el código del usuario y genera salida realista:

| Operación | Salida simulada |
|-----------|-----------------|
| `df.show()` | Tabla formateada con bordes `+---+` |
| `df.printSchema()` | Esquema `root` con tipos de datos |
| `df.describe()` | Estadísticas (count, mean, stddev, min, max) |
| `print("texto")` | Texto plano |
| `.select()` | Tabla con columna seleccionada |
| `.filter()` | Tabla filtrada (muestra limitada) |
| `.join()` | Tabla con datos de ejemplo |
| `.groupBy()` | Tabla agrupada con conteo |
| `spark.sql()` | Resultado SQL simulado |
| `spark.read.csv()` | Datos de ejemplo según formato |
| `StructType` | Esquema con tipos reales (StringType→string, etc.) |

### Resultados Pre-calculados
Para lecciones conceptuales (ej: Spark UI), se muestra una salida pre-calculada realista con la propiedad `precalculatedOutput`.

### Mensajes de Éxito
La propiedad `successMessage` muestra un mensaje en el terminal cuando todos los tests pasan:
```
✅ Archivo guardado exitosamente en output/data.csv
```

---

## SEO y Optimización para Motores de Búsqueda

### Meta Tags por Página

| Página | Title | robots |
|--------|-------|--------|
| `index.html` | PySpark Playground - Aprende PySpark Gratis en Linea | `index, follow` |
| `principiante.html` | Lecciones Principiante - PySpark Playground | `index, follow` |
| `intermedio.html` | Lecciones Intermedio - PySpark Playground | `index, follow` |
| `avanzado.html` | Lecciones Avanzado - PySpark Playground | `index, follow` |
| `desafio.html` | Desafíos - PySpark Playground | `index, follow` |
| `lecciones_*.html` | Lecciones [Nivel] - PySpark Playground | `noindex, nofollow` |

### Open Graph (Redes Sociales)

Todas las páginas principales incluyen:
- `og:title` — Título descriptivo
- `og:description` — Descripción concisa
- `og:type` — `website`
- `og:url` — URL canónica
- `og:site_name` — "PySpark Playground"
- `og:locale` — `es_ES`

### Twitter Card

- `twitter:card` — `summary`
- `twitter:title` — Igual a og:title
- `twitter:description` — Igual a og:description

### JSON-LD (Schema.org)

Estructura de datos en `index.html`:
```json
{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PySpark Playground",
    "description": "...",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "inLanguage": "es"
}
```

### Archivos SEO

| Archivo | Propósito |
|---------|-----------|
| `robots.txt` | Permite indexación de grid pages, bloquea `/lecciones_*` |
| `sitemap.xml` | 5 URLs priorizadas con `lastmod` y `changefreq` |

### Jerarquía de Prioridad (sitemap.xml)

```
/ (1.0) > principiante (0.9) ≈ intermedio (0.9) ≈ avanzado (0.9) > desafio (0.8)
```

### Accesibilidad (SEO-friendly)

- `lang="es"` en todas las páginas
- Títulos jerárquicos (`<h1>`, `<h2>`, `<h3>`)
- Responsive design (mobile-first)

---

## Notas Técnicas

### Simulador de PySpark
- PySpark no ejecuta en WASM/WebAssembly (requiere JVM + Py4J)
- El simulador parsea el código con regex y genera salida formateada
- Detecta `spark.createDataFrame`, `spark.read.*`, `.show()`, `.printSchema()`, etc.
- Los tipos se infieren de `StructField` o de los datos (enteros, decimales, texto)

### Pyodide
- Pyodide v0.26.4 se usa solo para validación de tests (string matching)
- No se carga la librería `pyspark` (no disponible en WASM)
- `user_code` se pasa a Python para evaluar expresiones de validación

### Service Worker
- Estrategia **network-first**
- 4 caches: `pyspark-playground-v1`, `pyodide-v0.26.4`, `monaco-v0.45.0`, `python-packages-v1`
- Permite actualizaciones sin limpiar caché manualmente

---

*Versión 1.0.0 - Septiembre 2026*
