Language folders setup - action log

Fecha: 2026-02-15
Objetivo: Crear estructura de carpetas `/ca/` y `/es/` con copias de las páginas principales y ajustar rutas a assets para URLs limpias.

Pasos realizados:
1. Creé carpetas: `ca/` y `es/` en la raíz del proyecto.
2. Copié versiones principales:
   - `index.html` (català) -> `ca/index.html` (copia de trabajo con rutas a `/css/` etc.)
   - `index_es.html` (castellano) -> `es/index.html` (copia de trabajo con rutas a `/css/` etc.)
3. Copié catálogos:
   - `cataleg.html` -> `ca/cataleg.html` (ajustada)
   - `catalogo.html` -> `es/catalogo.html` (ajustada)
4. Añadí `es/catalogo_shortcuts.md` con accesos rápidos indicados.
5. Notas sobre rutas: en las copias se usan rutas absolutas desde la raíz (`/css/...`, `/js/...`, `/images/...`) para evitar problemas cuando las páginas estén en subcarpetas.

Siguientes pasos recomendados:
- Reemplazar los placeholders `<!-- ...existing content... -->` por las versiones completas si quieres copias exactas (evitar duplicaciones grandes en el repo si prefieres mantener DRY).
- Revisar y actualizar el selector de idioma en `ca/index.html` y `es/index.html` para apuntar a `/es/` y `/ca/` respectivamente.
- Probar abriendo `file:///C:/Users/Toni/Desktop/Mendo/es/index.html` y `file:///C:/Users/Toni/Desktop/Mendo/ca/index.html` en el navegador local o colocar la carpeta en un servidor local para verificar rutas.
- Opcional: configurar redirecciones en servidor para que `/es/` y `/ca/` sirvan las páginas del sistema.

Hecho por: GitHub Copilot
