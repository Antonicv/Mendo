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
