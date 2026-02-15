# Guía rápida: modificar la animación y los iconos (pie-progress)

Resumen
- Objetivo: cambiar la animación y los iconos del bloque .sppb-addon-pie-progress sin tocar código del core.
- Enfoque recomendado: editar HTML mínimo + añadir overrides en `/css/custom.css`.
- Archivos objetivo en este proyecto: `index.html` (bloque mostrado) y `css/custom.css`.

Precauciones
- Haz una copia de seguridad de los archivos antes de editar (p. ej. `index.html.bak`).
- Evita borrar atributos importantes generados por PageBuilder salvo que controles el resultado.

1) Cambios rápidos en HTML (mínimos y seguros)
- Ajustar duración/retraso:
  - `data-sppb-wow-duration="1200ms"` (duración)
  - `data-sppb-wow-delay="200ms"` (retraso)
  Ejemplo: `<div class="sppb-addon-container sppb-wow fadeInUp" data-sppb-wow-duration="1200ms" data-sppb-wow-delay="200ms">`

- Cambiar icono Font Awesome (rápido):
  - Reemplaza la clase del `<i>`: `fa fa-hand-pointer-o` → `fa fa-truck` u otra.
  - Ejemplo: `<i class="fa fa-truck" aria-hidden="true"></i>`

- Usar SVG en lugar de Font Awesome (mejor control y rendimiento):
  - Reemplazar `<i class="fa ..."></i>` por `<img src="/images/icons/truck.svg" alt="Truck">`.

2) Overrides CSS (poner en `/css/custom.css`)
- Forzar tamaño/color de iconos y tamaño del pie:

```css
/* iconos dentro de los pie-charts */
.sppb-addon .sppb-chart-icon .fa,
.sppb-addon .sppb-chart-icon img {
  font-size: 40px !important;    /* para <i> */
  width: 40px; height: 40px;     /* para <img> */
  color: #2b7a78 !important;
  display: inline-block;
  line-height: 1 !important;
}

/* tamaño del círculo */
.sppb-pie-chart {
  width: 120px !important;
  height: 120px !important;
}

/* ajustar animaciones globales (fallback) */
.sppb-addon-container.sppb-wow {
  animation-duration: 1s !important;
  animation-delay: 0.25s !important;
}
```

3) Reemplazo de la animación por una propia
- Añadir keyframes y clase, luego usar la clase en el HTML:

```css
@keyframes mcl-fadeUp {
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
.mcl-anim { animation: mcl-fadeUp 700ms cubic-bezier(.2,.9,.3,1) both; }
```
- En HTML: `<div class="sppb-addon-container mcl-anim">` (sustituye o añade junto a sppb-wow).

4) Limpiar estilos inline generados por PageBuilder
- PageBuilder puede dejar `style=""` u otros inline. Opciones:
  - Manual: eliminar `style=""` vacíos y controlar con `custom.css`.
  - Automático: aplicar búsqueda/replace en los archivos (hacer backup antes).

5) Probar y ajustar
- Abrir la página en desktop y móvil, comprobar tiempos y tamaños.
- Si el plugin genera canvas/SVG dinámico para el pie, usa las opciones `data-barcolor`/`data-trackcolor` o inspecciona el DOM generado para targetear con CSS.

6) Resumen de pasos prácticos
- Crear backup: `index.html.bak`.
- Cambiar iconos o añadir SVG en `index.html` (pocos cambios).
- Añadir reglas en `/css/custom.css` (tamaño, color, animación).
- Probar y ajustar `data-sppb-wow-duration` / `data-sppb-wow-delay` según ritmo deseado.

¿Quieres que aplique la variante mínima (cambio de duración + override CSS para iconos) ahora y haga backup automático?
