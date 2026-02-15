Plan para actualizar enlaces según la estructura actual

Resumen

Queremos que las páginas enlacen de forma consistente con la estructura que ya hemos creado:
- Raíz con recursos compartidos: `/css`, `/js`, `/images`, `/fonts`.
- Páginas por idioma en carpetas: `/ca/` y `/es/` (cada una contiene su `index.html`; los catálogos pueden ser archivos como `cataleg.html` o `catalogo.html` dentro de esas carpetas, no es obligatorio que sean subcarpetas).

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
   - Comprobar que los enlaces del menú apuntan a `/ca/`, `/ca/cataleg.html`, `/ca/contacte.html`.

2) `index_es.html` / `es/index.html`
   - Si usas `es/index.html`, actualizar su selector de idioma para apuntar a `/ca/` y `/es/`.
   - Asegurar rutas de assets comiencen con `/` (ej. `/css/bootstrap.min.css`).
   - Ajustar cualquier formulario o action que apunte a `/ca/...` para que apunte a `/es/...` cuando corresponda.

3) `ca/index.html` y `ca/cataleg.html`
   - Verificar menús: enlaces a `/ca/`, `/ca/cataleg.html` o `/ca/cataleg` según prefieras la URL canonical.
   - Confirmar assets usan rutas desde la raíz (`/css/...`, `/js/...`).
   - Revisar enlaces a productos y subcategorías y convertirlos a la versión `/ca/...` apuntando al archivo correcto (ej. `/ca/cataleg.html` o `/ca/cataleg/` si se crea carpeta más adelante).

4) `es/index.html` y `es/catalogo.html`
   - Verificar menús: `/es/`, `/es/catalogo.html` (o `/es/catalogo` si el servidor lo mapea).
   - Asegurar que los enlaces de productos usan `/es/catalogo/...` o `/es/catalogo.html` según convenga.
   - Comprobar formularios y acciones que referencien rutas con idioma.

5) `catalogo.html` y `cataleg.html` en raíz (si existen)
   - Observación: actualmente existen tanto copias en la raíz como dentro de `/ca` y `/es`.
   - Recomendación: mantener únicamente las versiones en `/ca/` y `/es/` o bien actualizar todos los enlaces para apuntar a la copia que elijas (por ejemplo `/es/catalogo.html`). Evita tener duplicados que puedan desincronizarse.

Reglas generales a aplicar (operaciones de búsqueda/reemplazo)

- Buscar y reemplazar (solo si estás seguro):
  - `href="file:///C:/Users/Toni/Desktop/Mendo/index_es.html"` -> `href="/es/"`
  - Si mantienes archivos estáticos sin servidor, usa la versión con .html: `href="/es/catalogo.html"` y `href="/ca/cataleg.html"`.
