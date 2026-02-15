# Migració: Google Maps → Leaflet + OpenStreetMap

Objectiu
- Substituir l'ús de l'API de Google Maps per una solució fotoplana oberta (Leaflet + OpenStreetMap) mantenint el format HTML existent: elements `.sppb-addon-gmap-canvas` amb `data-*` attributes, els controls `#gm-zoom-in` i `#gm-zoom-out`, i el marcador central.

Avantatges
- Sense clau d'API ni límits de facturació de Google (atenció a les polítiques d'OSM i tiles providers).
- Llibertat per utilitzar diversos proveïdors de rajoles i personalitzar fàcilment.
- Codi més lleuger i senzill d'integrar localment.

Resum dels passos
1. Fer backups de `index.html` i `js/gmap.js`. (Ja fets si has seguit el flux anterior.)
2. Eliminar la inclusió de l'script de Google Maps a `index.html`.
3. Afegir les referències a Leaflet (CSS + JS) i un nou script `js/leaflet-map.js` (veure snippet més avall).
4. Copiar i adaptar el snippet `js/leaflet-map.js` que llegeix els `data-*` de cada `.sppb-addon-gmap-canvas`, crea el mapa, el marcador i enganxa els controls de zoom existents.
5. Provar i ajustar zoom/centre, i canviar el tile provider si vols un look diferent.

Reemplaçar a `index.html`
- Elimina o comenta la línia antiga:

```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places" type="text/javascript"></script>
```

- Afegeix aquestes línies (afegir-les a la mateixa ubicació on estaven les altres libs, abans de carregar `js/gmap.js` o el nou `js/leaflet-map.js`):

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha384-QV8m6O4K6RZ0bVf3+ZQq3H3sug0hH3q0E9j5l2u8p3Yq6kG1F2q2bQYfRvGQFQvQ" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha384-..." crossorigin=""></script>
<script src="/js/leaflet-map.js" type="text/javascript"></script>
```

Nota: pots usar la versió CDN que prefereixis; comprova els atributs `integrity` actuals al CDN.

CSS recomanat (afegir a `css/custom.css` o a un fitxer nou)

```css
/* assegura que el canvas tingui alçada visible */
.sppb-addon-gmap-canvas { min-height: 240px; height: 350px; }
/* opcional: fer visibles els controls originals si estaven ocults */
#gm-zoom-in, #gm-zoom-out { cursor: pointer; display: inline-block; }
```

Exemple complet de `js/leaflet-map.js`
- Aquest script llegeix els mateixos `data-*` que usaves amb Google Maps, amb coercions i sanejament, crea un mapa Leaflet, afegeix marcador i enganxa els controls `#gm-zoom-in` i `#gm-zoom-out` clonats (evita moure els nodes originals si tens múltiplesmapes).

```javascript
// js/leaflet-map.js
jQuery(function($){
  $(function(){
    $('.sppb-addon-gmap-canvas').each(function(index){
      var mapId = 'sppb-addon-gmap' + (index + 1);
      var el = this;
      $(el).attr('id', mapId);

      // Coerceix dades
      var rawZoom = $(el).data('mapzoom');
      var zoom = (typeof rawZoom === 'number') ? rawZoom : parseInt(String(rawZoom || '').trim(), 10) || 15;
      var lat = parseFloat(String($(el).data('lat') || '0').trim()) || 0;
      var lng = parseFloat(String($(el).data('lng') || '0').trim()) || 0;
      var scrollwheel = (String($(el).data('mousescroll') || '').toLowerCase() === 'true');

      var center = [lat, lng];

      // Inicia mapa
      var map = L.map(mapId, {
        center: center,
        zoom: zoom,
        scrollWheelZoom: scrollwheel
      });

      // Tile layer - OpenStreetMap (canvia per Stamen/Carto si vols un look diferent)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Marcador - per tenir control sobre icona pots crear un L.icon amb SVG data-uri
      var marker = L.marker(center).addTo(map);

      // Si tens els controls #gm-zoom-in / #gm-zoom-out al DOM, els dupliquem i els enganxem
      function attachZoomControls(map, container){
        var controlUIzoomIn = document.getElementById('gm-zoom-in');
        var controlUIzoomOut = document.getElementById('gm-zoom-out');
        if(!controlUIzoomIn || !controlUIzoomOut) return;
        var inClone = controlUIzoomIn.cloneNode(true);
        var outClone = controlUIzoomOut.cloneNode(true);
        inClone.style.display = 'inline-block';
        outClone.style.display = 'inline-block';
        inClone.addEventListener('click', function(){ map.zoomIn(); });
        outClone.addEventListener('click', function(){ map.zoomOut(); });
        // container is a DOM node; use it as Leaflet control
        var customControl = L.Control.extend({
          options: { position: 'topleft' },
          onAdd: function() {
            var div = L.DomUtil.create('div', 'leaflet-bar');
            div.appendChild(inClone);
            div.appendChild(outClone);
            return div;
          }
        });
        map.addControl(new customControl());
      }

      attachZoomControls(map, el);

    });
  });
});
```

Notes i limitacions
- Estils: Google Maps suporta `styles` personalitzats; OSM en si no — amb Leaflet has d'escollir un tile provider amb l'estètica desitjada (Stamen, Carto, Thunderforest, Mapbox, etc.). Algunes opcions són de pagament o requereixen clau.
- Atribució: és obligat incloure l'atribució d'OSM al teu lloc (Leaflet ho afegeix per defecte si no la treus).
- Marcador personalitzat: si vols la icona vectorial incrustada (igual que el SVG base64 que usaves abans), crea un L.icon amb `iconUrl: 'data:image/svg+xml;base64,...'`.
- Controls: el snippet manté el comportament dels controls `#gm-zoom-in` i `#gm-zoom-out` clonant-los i afegint-los com a control Leaflet.

Prova i desplegament
1. Afegir els scripts i `js/leaflet-map.js` a l'arxiu i obrir la pàgina.
2. Comprovar la consola per errors i ajustar `data-lat`/`data-lng` formats si cal (sense espais superflus és millor).
3. Si vols un estil més pla o en tons grisos, prova Stamen ("toner-lite") o CartoDB basemap; canvia la URL del tileLayer.

Exemple: canviar tile provider

```javascript
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors',
  maxZoom: 20
}).addTo(map);
```

Com revertir
- Torna a re-afegir la línia de Google Maps i restaura `js/gmap.js` des dels backups creats (`index.html.bak`, `js/gmap.js.bak` si el tens).

Vols que implemente directament `js/leaflet-map.js` i que remogui la línia de Google Maps a `index.html` per tu? Si sí, faré un backup i aplicaré els canvis automàticament.
