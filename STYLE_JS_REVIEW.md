STYLE & JS Audit — Mendo (brief)

Fecha: 2026-02-15

Resumen rápido
- He escaneado la carpeta `css/` y `js/` del proyecto y revisado `index.html`.
- Hallazgos principales: reglas del tema (`css/template.css`) imponen tamaños y comportamiento (sticky, alta densidad) que anulan cambios; hay estilos inline en `index.html` con `!important`; existen muchos archivos de librería (vendor) que no conviene tocar.

Archivos escaneados
- CSS: css/template.css, css/preset1.css, css/vm-ltr-site.css, css/vm-ltr-common.css, css/vm-ltr-reviews.css, css/sppagebuilder.css, css/bootstrap.min.css, css/font-awesome.min.css, css/legacy.css, css/preset1.css, css/chosen.css, css/jquery.fancybox-1.3.4.css, css/animate.min.css
- JS: js/gmap.js, js/main.js, js/vmsite.js, js/vm-cart.js, js/vmprices.js, js/sppagebuilder.js, js/jquery.sticky.js, js/jquery.min.js, js/jquery-migrate.min.js, js/jquery-noconflict.js, js/bootstrap.min.js, js/modernizr.js, js/matchheight.js, js/scrolling-nav.js, js/SmoothScroll.js, js/jquery.fancybox-1.3.4.pack.js, js/jquery.easypiechart.min.js, js/jquery.easing.min.js, js/chosen.jquery.min.js, js/scrolling-nav.js

Hallazgos concretos y ejemplos (prioritarios)
1) Logo: reglas en `css/template.css` reducen el logo en estado sticky y existen media queries de alta densidad que alternan imagenes retina/default. Ejemplo encontrado: selector `.sticky-wrapper.is-sticky #sp-header .sp-column .logo h1 img` que fuerza `max-height` pequeño (≈40px) — esto anulaba los cambios.
2) Estilos inline en `index.html` (atributo `style="max-height:... !important;"` en las etiquetas `<img class="sp-default-logo">` y `<img class="sp-retina-logo">`) mezclan reglas en dos sitios: esto funciona pero vuelve frágil el mantenimiento.
3) Reglas con `!important` añadidas en `index.html` para forzar la paleta y el logo. Funcionan pero son parche.
4) Varias hojas de estilo de terceros y minificadas (bootstrap, font-awesome, jquery plugins) NO deben editarse directamente — riesgos de romper compatibilidad y actualizar difícilmente.
5) Posible código redundante o duplicado: hay muchos plugins y librerías; revisar si algunos archivos se cargan más de una vez o no se usan (p. ej. `scrolling-nav.js` aparece enlazado). Hacer una prueba de eliminación temporal para confirmar no usado.
6) Linter: advertencias de "empty rulesets" visibles después de ediciones. Hay que localizar las reglas vacías y limpiarlas (probablemente en CSS generado por pagebuilder o secciones vacías en `index.html`).

Qué es seguro cambiar (bajo condiciones)
- Seguro y recomendado:
  - Mover estilos personalizados (variables CSS, botones, overrides) a un archivo `css/custom.css` cargado después de `template.css`. Esto centraliza overrides y evita modificar archivos del tema.
  - Ajustar valores no críticos en `css/template.css` (p. ej. el `max-height` del logo en el selector sticky) si se hace con respaldo y pruebas. Hacer commit antes.
  - Limpiar estilos inline en `index.html` y reemplazarlos por clases en `css/custom.css`.
  - Editar `js/main.js` o crear `js/custom.js` para comportamiento específico; incluir `custom.js` después de librerías. Evitar tocar librerías minificadas.

- Cambios que requieren cuidado o evitar:
  - No editar `css/bootstrap.min.css`, `css/font-awesome.min.css`, `css/jquery.fancybox-1.3.4.css`, `js/jquery.min.js`, `js/bootstrap.min.js`, `js/*.min.js` de terceros salvo que sea absolutamente necesario. Mejor sobreescribir desde `custom.css` o `custom.js`.
  - Evitar cambiar `sppagebuilder.js` o `sppagebuilder.css` sin conocer dependencias, pues las páginas creadas por el pagebuilder pueden romperse.
  - Evitar editar directamente `vm-*.css` y `vm-cart.js` sin pruebas; son parte de VirtueMart y pueden afectar la tienda.

Recomendaciones concretas (pasos propuestos)
1) Crear `css/custom.css` y mover allí:
   - Variables `:root` con la paleta
   - Las clases `.btn-primary`, `.btn-secondary`, `.service-card` y los overrides del logo.
   - Cargar `custom.css` después de `template.css` en el `<head>`.
2) En `css/template.css` (opcional y recomendado solo si confirmas): aumentar el `max-height` en el selector sticky a la altura deseada (p. ej. 80px) o eliminar la regla para dejar que `custom.css` controle tamaño.
3) Quitar estilos inline del HTML (`style="max-height:..."`) y dejar solo clases; esto facilita pruebas y mantenimiento.
4) Añadir `js/custom.js` que cargue después de `main.js` para pequeños ajustes JS (p. ej. reajustar logo al cambiar clases, o forzar intercambio retina/default si es necesario).
5) Buscar y eliminar reglas CSS vacías que provocan las advertencias del linter. Hacer search por patrones como `{}\s*` o `^[^\{]*\{\s*\}`.
6) Pruebas: usar control de versiones (commit), limpieza de caché y hard reload (Ctrl+F5) en cada prueba.

Prioridad corta (acciones que puedo hacer ahora si me das OK)
- Crear `css/custom.css` con la paleta y los componentes y añadir su inclusión después de `template.css` en `index.html`.
- Opcional: editar `css/template.css` para ajustar la regla sticky del logo (necesitaré que me confirmes el tamaño deseado para sticky y normal).
- Buscar y listar las reglas CSS vacías que generan las advertencias.

Notas sobre JS
- `js/gmap.js`: es código propio del mapa; seguro de ajustar si necesitas cambiar los controles o estilos del mapa.
- Evitar editar librerías (jquery.*, bootstrap.min.js, chosen.jquery.min.js, fancybox) — si algo está duplicado, es mejor quitar el enlace duplicado en `index.html`.
- Si quieres cambios de comportamiento del sticky header (por ejemplo que no reduzca tanto el header), lo más seguro es añadir un pequeño `js/custom.js` que modifique clases o valores después de que `jquery.sticky.js` haga su trabajo.

Siguiente paso sugerido
- Confirma si quieres que:
  A) Cree `css/custom.css` y mueva los estilos personalizados allí y lo enlace en `index.html` (recomendado).
  B) Editemos `css/template.css` directamente para cambiar la regla sticky del logo (dime valores px deseados).
  C) Busque y liste las reglas CSS vacías y las corrija.

---
Este informe es un resumen operativo. Si confirmas la opción A o B procedo a implementarlo y generaré un commit con los cambios y un breve changelog.
