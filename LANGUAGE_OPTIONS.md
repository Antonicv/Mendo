Objetivo

Explorar la manera más simple y segura de mantener dos versiones del sitio: catalán (actual `index.html`) y castellano (`index_es.html`). Mantener recursos compartidos (css, js, images, fonts) centralizados.

Suposiciones

- Estructura actual (recursos compartidos):
  - css/
  - fonts/
  - images/
  - js/
  - index.html (Català)
  - index_es.html (Castellano)
  - cataleg.html / catalogo.html (variantes de catálogo)
- No se dispone de un sistema de build/CI por ahora; cambios se harán en archivos estáticos.
- El generador (Joomla / SPPB) puede volver a escribir contenido, por tanto preferir overrides en `css/custom.css` y backups.

Opciones (rápido resumen, pros/cons)

1) Mantener dos archivos en la raíz (más simple)
   - Qué: conservar `index.html` (català) y `index_es.html` (castellano) en el mismo directorio.
   - Pros: mínima intervención; enlaces directos entre las dos; fácil edición.
   - Contras: URLs no limpias (/index_es.html), posibles confusiones con rutas relativas en subpáginas.
   - Recomendado si quieres rapidez y pocos archivos.

2) Carpetas por idioma (recomendado si quieres URLs limpias)
   - Qué: crear `\ca\index.html` y `\es\index.html` (o `c:\...\ca\index.html`) y colocar las versiones ahí; mantener recursos en la raíz (`css/`, `js/`, `images/`)
   - Pros: URLs limpias (/ca/ y /es/), más escalable para más páginas.
   - Contras: hay que ajustar rutas relativas en las copias (usar rutas absolutas desde la raíz `/css/...` o `../css/...`).
   - Recomendación de implementación: copiar `index.html` a `ca/index.html` (si quieres mantener), copiar `index_es.html` a `es/index.html`, actualizar enlaces del selector de idioma a `/es/` y `/ca/`.

3) Redirecciones / servidor (ideal en producción)
   - Qué: mantener una sola copia fuente y usar reglas del servidor (RewriteRule) o configuración del hosting para mapear `/es/` a `index_es.html`.
   - Pros: URLs limpias sin duplicar archivos visibles; fácil de mantener.
   - Contras: requiere acceso al servidor / .htaccess / configuración del host.

4) Plantilla / build simple (recomendado a medio plazo)
   - Qué: crear plantilla común (header/footer) y generar dos versiones con un pequeño script (Node/Python/PowerShell) que inserte textos traducidos.
   - Pros: DRY (no duplicas cambios de layout), escalable.
   - Contras: requiere escribir el script y cambiar el flujo de trabajo.

Recomendación práctica para tu caso (mínimo esfuerzo, robusto)

- Si quieres rapidez: opción 1 (dos archivos en la raíz). Ya tienes `index.html` y `index_es.html`. Solo asegurarse de:
  1. Actualizar el selector de idioma para enlazar con `index_es.html` (evitar file:/// en producción).
  2. Mantener rutas a recursos como `/css/...` o `css/...` (si mueves a subcarpetas, usar rutas desde la raíz).
  3. Hacer backup antes de grandes cambios.

- Si quieres URLs limpias y mínimas correcciones: opción 2 (carpetas `/ca/` y `/es/`). Pasos:
  1. Crear carpetas `ca` y `es` en la raíz.
  2. Copiar `index.html` -> `ca/index.html` y `index_es.html` -> `es/index.html`.
  3. Copiar `catalogo.html` -> `es/catalogo.html` y `cataleg.html` -> `ca/cataleg.html` (o renombrar según canonical).
  4. En cada copia, ajustar rutas (usar rutas absolutas desde la raíz: `/css/...`, `/js/...`, `/images/...`).
  5. Actualizar el selector de idioma en ambas versiones para apuntar a `/es/` y `/ca/`.
  6. Probar en navegador y móvil.

Pasos mínimos recomendados ahora

1. Decide: "rápido (dos archivos raíz)" o "URLs limpias (carpetas)".
2. Hacer backups: crea zip o copia de `index.html`, `index_es.html`, `catalogo.html`, `cataleg.html`, y `css/template.css`.
3. Si eliges carpetas, puedo crear `ca/` y `es/` y ajustar rutas en las copias.
4. Revisar y limpiar enlaces absolutos file:// que dejamos; usar rutas relativas/desde la raíz.

Notas operativas

- Evita usar enlaces file:/// cuando compartas el sitio en un servidor.
- Mantén los assets compartidos en `css/`, `js/`, `images/` para no duplicar.
- Si SPPB regenera HTML, considera mantener las versiones traducidas fuera del CMS o automatizar la generación.

Si quieres, implemento ahora la opción que prefieras: "rápido" (dejo tal cual y limpio file://) o "carpetas" (creo `ca/` y `es/` y copio/ajusto archivos).
