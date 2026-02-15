Plan para actualizar enlaces según la estructura actual

Resumen

Queremos que las páginas enlacen de forma consistente con la estructura que ya hemos creado:
- Raíz con recursos compartidos: `/css`, `/js`, `/images`, `/fonts`.
- Páginas por idioma en carpetas: `/ca/` y `/es/` (cada una contiene su `index.html` y `catalogo/cataleg` correspondiente).

Objetivos

- Eliminar enlaces `file:///` y rutas confusas.
- Hacer que los selectores de idioma apunten a `/es/` y `/ca/` (URLs limpias).
- Asegurar que todas las referencias a assets usan rutas desde la raíz (`/css/...`, `/js/...`, `/images/...`) para que funcionen desde páginas en subcarpetas.
- Actualizar menús, footer y enlaces de catálogo/producto para apuntar a las versiones dentro de `/es/` o `/ca/`.
- Dejar un checklist para verificación manual y pruebas locales.

Acciones por archivo (qué editar y por qué)

1) `index.html` (versión raíz en catalán)
   - Reemplazar enlaces `file:///...index_es.html` por `/es/`.
   - Asegurarse de que el selector de idioma queda: `<a href="/es/">` y `<a href="/ca/">`.
   - Comprobar que los enlaces del menú apuntan a `/ca/`, `/ca/cataleg`, `/ca/contacte`.

2) `index_es.html` / `es/index.html`
   - Si usas `es/index.html`, actualizar su selector de idioma para apuntar a `/ca/` y `/es/`.
   - Asegurar rutas de assets comiencen con `/` (ej. `/css/bootstrap.min.css`).
   - Ajustar cualquier formulario o action que apunte a `/ca/...` para que apunte a `/es/...` cuando corresponda.

3) `ca/index.html` y `ca/cataleg.html`
   - Verificar menús: enlaces a `/ca/`, `/ca/cataleg`, `/ca/contacte`.
   - Confirmar assets usan rutas desde la raíz (`/css/...`, `/js/...`).
   - Revisar enlaces a productos y subcategorías y convertirlos a la versión `/ca/...` (ej. `/ca/cataleg/ciments-morters`).

4) `es/index.html` y `es/catalogo.html`
   - Verificar menús: `/es/`, `/es/catalogo`, `/es/contacto`.
   - Asegurar que los enlaces de productos usan `/es/catalogo/...`.
   - Comprobar formularios y acciones que referencien rutas con idioma.

5) `catalogo.html` y `cataleg.html` en raíz (si existen)
   - Si mantienes copias en la raíz, redirigir o actualizar enlaces internos para no romper navegación (mejor: eliminar duplicados y mantener carpetas `/ca` y `/es`).

Reglas generales a aplicar (operaciones de búsqueda/reemplazo)

- Buscar y reemplazar (solo si estás seguro):
  - `href="file:///C:/Users/Toni/Desktop/Mendo/index_es.html"` -> `href="/es/"`
  - `href="/ca/` or `href="/es/` should be preserved, revisar inconsistencias.
  - Rutas a assets: `css/` -> `/css/`, `js/` -> `/js/`, `images/` -> `/images/` (preferible usar `/` al inicio).
- Evitar `../` si usamos rutas absolutas desde la raíz; facilita mover archivos entre carpetas.

Precauciones y backups

- Antes de ejecutar cambios masivos, hacer copias de seguridad: `index.html`, `index_es.html`, `catalogo.html`, `cataleg.html`, `css/template.css`.
- Realizar cambios en pequeños pasos y validar en el navegador local.
- Si el CMS (SPPageBuilder/Joomla) vuelve a escribir HTML, conviene mantener las versiones fuera del CMS o automatizar la generación.

Checklist de verificación (mínimo)

- [ ] Selector de idioma en `/` enlaza a `/es/` y `/ca/` (no `file:///`).
- [ ] `es/index.html` y `ca/index.html` cargan CSS/JS/imagenes correctamente.
- [ ] Menú y footer en cada versión apuntan a su carpeta de idioma correspondiente.
- [ ] Páginas de catálogo/producto en `/es/` y `/ca/` muestran imágenes y enlaces correctos.
- [ ] Prueba de navegación en modo local (abrir `file:///.../es/index.html` y `file:///.../ca/index.html`) o mejor, servir con un servidor local para probar rutas `/es/` y `/ca/`.

Si quieres, aplico los cambios automáticamente (buscando/reemplazando los enlaces indicados) o hago las ediciones archivo por archivo y te dejo los diffs para revisar. ¿Cómo prefieres: que lo haga yo ahora (ediciones automáticas) o que te muestre los cambios propuestos primero?
