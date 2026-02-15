Resumen del problema

El repo actual usa URLs con prefijo de idioma, p.e. `/ca/...` y `/es/...`, pero en el árbol local los archivos están en la raíz (p.e. `catalogo.html`). Por eso al navegar a `/ca/catalogo` el servidor devuelve 404.

Opciones para reducir duplicados y mantener multilenguaje (pros / contras)

1) Reescrituras / redirects en el servidor (recomendado para producción)
   - Qué hace: mantiene las URLs amigables (/ca/...) y mapea internamente a los archivos reales sin duplicar.
   - Pros: sin duplicación, limpio para SEO, mínimo mantenimiento en HTML.
   - Contras: requiere acceso a configuración del servidor (Apache/Nginx/IIS).
   - Ejemplo .htaccess (Apache):
     RewriteEngine On
     # Mapear /ca/cataleg/ a /catalogo.html
     RewriteRule ^ca/cataleg/?$ /catalogo.html [L]
     # Mapear cualquier /ca/XYZ a /XYZ
     RewriteRule ^ca/(.*)$ /$1 [L]

   - Ejemplo Nginx:
     location /ca/ {
       try_files $uri $uri/ /$uri;
     }

2) Generación estática por build (recomendado si gestionas el repo)
   - Qué hace: conviertes la fuente única en páginas por idioma en un paso de build (script o SSG).
   - Pros: control total, sin necesidad de servidor especial, fácil desplegar en hosting estático.
   - Contras: añadir paso de build; hay que parametrizar traducciones/URLs.
   - Ejemplo simple (PowerShell) para copiar y ajustar rutas:
     Copy-Item .\catalogo.html .\ca\cataleg\index.html -Force
     # (Luego reemplazar paths si son relativos)

   - Ejemplo con Node (script): leer plantilla, reemplazar texto/URLs y escribir en `ca/` y `es/`.

3) Carpetas + pequeño index que incluya o redirija (solución rápida; ya aplicada)
   - Qué hace: crear `ca/` y `es/` y poner `index.html` o `ca/cataleg/index.html` que redirija o cargue `../catalogo.html` (iframe o include).
   - Pros: rápido, funciona con hosting estático sin configuración de servidor.
   - Contras: duplicación parcial o experiencia de URL diferente (iframe) y puede afectar SEO.
   - Nota: ya se creó `ca/` y `ca/cataleg/index.html` con iframe como solución temporal.

4) Enlaces sin prefijo /ca/ (modificar HTML)
   - Qué hace: cambiar hrefs `/ca/...` a rutas reales (`/catalogo.html` o `./catalogo.html`).
   - Pros: elimina necesidad de carpetas o rewrites.
   - Contras: rompe si el sitio en producción depende de rutas multilenguaje (Joomla routing).

5) Usar enlaces relativos + plantillas (si el proyecto usa CMS o un sistema de plantillas)
   - Qué hace: centralizar cabeceras y pies en un template y mantener sólo contenido traducido.
   - Pros: evita inconsistencias, fácil de mantener para sitios con CMS.
   - Contras: requiere reorganización (o usar el CMS para generar las versiones).

6) Symlinks / junctions para evitar duplicación de contenido
   - Qué hace: crear enlaces de carpeta que apunten a un único conjunto de ficheros.
   - Pros: sin duplicación de contenido, funciona en entorno local.
   - Contras: symlinks no siempre funcionan en todos los servidores/hosts; permisos en Windows pueden requerir privilegios.
   - PowerShell (requiere permisos / developer mode):
     New-Item -ItemType SymbolicLink -Path .\ca\cataleg -Target .\
   - CMD (junction):
     cmd /c mklink /J "ca\\cataleg" "%cd%"

Recomendación práctica

- Entorno de desarrollo / rápido: usa la opción 3 (carpetas + index) o 6 (junction) temporalmente. Ya se aplicó la opción 3 con iframe.
- Producción: configurar reescrituras (opción 1) o implementar un paso de build que genere `ca/` y `es/` (opción 2). Estas son las soluciones más robustas.

Plan elegido (tu propuesta)

- Raíz (`/index.html`) servirá la versión en català.
- Crear una versión en castellano bajo `/es/` que contenga `index.html` y `/es/catalogo/index.html` (copias localizadas de las páginas correspondientes).
- Mantener `/ca/` como ruta válida que redirija al contenido en català (puede ser un redirect a `/` o servir la copia catalana). Las banderas de idioma deberán apuntar a `/es/` y `/ca/` respectivamente.
- Añadir el bloque de contacto (teléfono, horario, email) en les pàgines de catàleg (`catalogo.html` i `ca/cataleg/index.html`) — ya se añadió en `catalogo.html`.

Pros de este enfoque

- Claridad: URLs limpias por idioma (/es/ y /ca/) sin reescrituras complejas.
- Compatibilidad con el routing que espera Joomla/otros CMS cuando en producción se usan prefijos de idioma.
- Fácil de probar en desarrollo: cada idioma tiene su carpeta y puedes editar de forma independiente.
- Control SEO claro: puedes personalizar title/meta por idioma.

Contras

- Duplicación de HTML (si copias archivos completos). Más mantenimiento si haces cambios que afectan a ambas versiones.
- Riesgo de desincronización entre versiones si no se usa un build o sistema de plantillas para propagar cambios.
- Si quieres evitar duplicados, hay que añadir un paso de build, symlinks o reglas de servidor (más trabajo inicial).

Acción recomendada para desarrollo (pasos concretos)

1) Generar las páginas en `/es/` como copias localizadas. Comando PowerShell (ejemplo básico):
   Copy-Item .\index.html .\es\index.html -Force
   Copy-Item .\catalogo.html .\es\catalogo\index.html -Force
   # Reemplazar textos/labels en las copias según traducción

2) Asegurar que los enlaces de selección de idioma apunten a `/es/` y `/ca/` (ya están así en `index.html`)

3) Mantener una plantilla base (cabecera/ pie) o crear un script de build cuando el proyecto crezca para evitar duplicación.

Estado actual (lo que ya hice)

- Creé carpetas `ca/`, `ca/cataleg/` y `es/`.
- Añadí `ca/cataleg/index.html` con un iframe que carga `/catalogo.html` (solución temporal).
- Añadí `ca/index.html` y `es/index.html` como redirecciones/placeholder.
- Añadí el bloque de contacto a `catalogo.html`.

Siguientes pasos que puedo ejecutar ahora (elige uno)

A) Crear copias completas de `catalogo.html` y `index.html` en `/es/` y `/ca/cataleg/` reemplazando contenidos traducidos (si me pasas las traducciones o las apruebas, las aplico).
B) Sustituir el `iframe` en `ca/cataleg/index.html` por una copia completa de `catalogo.html` y ajustar rutas relativas (evita iframe y mejora SEO).
C) Escribir un script de build (PowerShell o Node) que genere automáticamente `/ca/` y `/es/` a partir de plantillas y un fichero de traducción.
D) Crear junctions/symlinks locales para no duplicar el contenido (solo recomendable en entorno local con permisos).

Di la letra (A/B/C/D) y lo implemento. Si eliges A/B necesito confirmar si quieres copiar texto en castellano ya o dejar textos en catalán hasta que facilites traducciones.
