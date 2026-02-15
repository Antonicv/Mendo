jQuery(function($){
		
  google.maps.event.addDomListener(window, 'load', function(){

    $('.sppb-addon-gmap-canvas').each(function(index){
      var mapId = 'sppb-addon-gmap' + (index + 1);
      var self = this;

      $(this).attr('id', mapId);

      // Get data
      var zoom = $(self).data('mapzoom');
      var mousescroll = $(self).data('mousescroll');
	  var map_type_control = $(self).data('map_type_control');
	  var street_view_control = $(self).data('street_view_control');


      var latlng = new google.maps.LatLng($(self).data('lat'), $(self).data('lng'));
      var mapOptions = {
        zoom: zoom,
        center: latlng,
        //disableDefaultUI: true,
		panControl: false,
      	zoomControl: false,
		scaleControl: false,
		overviewMapControl: false,
		mapTypeControl: map_type_control,
		streetViewControl: street_view_control,
        scrollwheel: mousescroll
      };
	  
		//google map custom marker icon - .png fallback for IE11
	  var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	  var marker_url = ( is_internetExplorer11 ) ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwZJREFUeNrsWM9rE0EUfkl082vbbppoi5qqVXq24FksehSbQkHw1PwDhf4Fba9ekvbmqblYWigYRXrwYsCDBgUDlYL14KIhUoxJWkJLDQXf1NcQ2qbdmZ1JVsgHj9lkZ2fem/e9eTMPoIMOOviv4ZI10O/JSQObGMooCnu+2/A6g1JBeYGSDs/PVxxjACp+DZtplAmOz1Ios2iI2VYDUPkZUl4UzIiZlhtAdHl+hCaiYPQaE6WVS1D5Nyi3JMZiDmVExAi3wGQJycoDjZdQ7gFc/RhRRxUYldIqPZAAtUgo8wCuPtsmF6z0LWxvw9diEf7s7x/8vhEOw2Bvr9Wp4uiFlAoPjFrptIGKvzVNqOGzpmng8njgQz4PH1FkznOIcxx9Y2d12K3V4PPmJlyNRMDt+udcP4ru88G3UunAEyG/3/Y83B5A+lja73/t7IARDNaVr0+Cvy8ZBvzY2gKZ84luo03hQUV1r/fEd+eRSkGklGxINSCCq38arvT0ONsAL65yfxMj2P/svWxYDWLLKX6guxs8bjcUMR72cBtlSkcCAbis6zx6WZ6PJw+U6ZyvGhXMAyEVFEpDa6DsKDHXIgPmlBiAbs3R2V0lMjSPsl1oVrEB3ONzGYCrk1HohQyNrzwPxBUZIDQutwFUSZBNJeEKhWgmTqKYkpQ3abzWHSXo8i2LSnE7hS7hsxAFXNKm8kmRwLVVVjnhiPFJsEqRQ+WHnXAajfMcvhoOa1IoaNsAypxTnJ9N8WZcpfcBqiJYrSSkeKoOymOAMx6k8F7ZjQwxcko8VOi9VMi647HLbuhJNmtcDATeD/f1PTraYWFt7fH95eUqPmo0754TDOhHuY7Cym7szqi9Ns3KnWj0Z7Srq77a7wqF6YnV1Swpz/qxG9cFYkC1XQbcJMWP0XBxff3L2NCQK+z3394ol5/eW1p61oS+OkmpHUF8ZvJ6NT7+8MHKyksrSa0dBrDVH5BA4+92PGCHQrvEXzaGT+B7VmfMU+uIPHDIZ2hoG1FtaKvQQQfOwF8BBgDxH83QBhaC5gAAAABJRU5ErkJggg==' : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImdtYXBfbWFya2VyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDQ4IDQ4IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCiA8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7b3BhY2l0eTowLjE5O30NCgkuc3Qxe2ZpbGw6I0VENkU2RTt9DQoJLnN0MntmaWxsOiNCNzU1NTU7fQ0KCS5zdDN7ZmlsbDojOTEzRDNEO30NCjwvc3R5bGU+DQo8ZWxsaXBzZSBjbGFzcz0ic3QwIiBjeD0iMjMuNSIgY3k9IjQxLjQiIHJ4PSI5LjMiIHJ5PSIzLjIiLz4NCjxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMy41LDUuMmMtNy42LDAtMTMuNyw2LjEtMTMuNywxMy42czEzLjcsMjIuNiwxMy43LDIyLjZzMTMuNy0xNS4xLDEzLjctMjIuNlMzMS4xLDUuMiwyMy41LDUuMnoiLz4NCjxjaXJjbGUgY2xhc3M9InN0MiIgY3g9IjIzLjUiIGN5PSIxNy4xIiByPSIzLjgiLz4NCjxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yMy41LDE0LjFjMiwwLDMuNSwxLjQsMy44LDMuNGMwLTAuMiwwLjEtMC4zLDAuMS0wLjRjMC0yLjEtMS43LTMuOC0zLjgtMy44cy0zLjgsMS43LTMuOCwzLjgNCgljMCwwLjIsMCwwLjMsMC4xLDAuNEMyMCwxNS42LDIxLjUsMTQuMSwyMy41LDE0LjF6Ii8+DQo8L3N2Zz4=';
	  
      var map = new google.maps.Map(document.getElementById(mapId), mapOptions);
      //var marker = new google.maps.Marker({position: latlng, map: map});
	  
		//add a custom marker to the map				
	  var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		visible: true,
		icon: marker_url,
	  });
		
      map.setMapTypeId(google.maps.MapTypeId[$(self).data('maptype')]);

      //Get colors
      var water_color                   = $(self).data('water_color');
      var highway_stroke_color          = $(self).data('highway_stroke_color');
      var highway_fill_color            = $(self).data('highway_fill_color');
      var local_stroke_color            = $(self).data('local_stroke_color');
      var local_fill_color              = $(self).data('local_fill_color');
      var poi_fill_color                = $(self).data('poi_fill_color');
      var administrative_color          = $(self).data('administrative_color');
      var landscape_color               = $(self).data('landscape_color');
      var road_text_color               = $(self).data('road_text_color');
      var road_arterial_fill_color      = $(self).data('road_arterial_fill_color');
      var road_arterial_stroke_color    = $(self).data('road_arterial_stroke_color');
	
	  
	//add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map 
	  	var controlUIzoomIn= document.getElementById('gm-zoom-in'),
	  		controlUIzoomOut= document.getElementById('gm-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);
	

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);

      var styles = [
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": water_color
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": highway_stroke_color
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": highway_fill_color
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": local_stroke_color
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": local_fill_color
                },
                {
                    "weight": 1.8
                }
            ]
        },
       
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": administrative_color
                }
            ]
        },

        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": landscape_color
                }
            ]
        },
   		{
            "featureType": "road.all",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": road_text_color
                }
            ]
        },
		{
			"featureType": "road.all",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "visibility": "on" },
                { "color": local_stroke_color },	
    			{ "saturation": -25 }, 
				{ "weight": 1.6 }
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.fill",
			"stylers": [
				{ "visibility": "on" },
				{ "color": road_text_color },
				{ "saturation": -50 }
			]
		},
		{
			"featureType": "poi",
			"elementType": "labels.text.stroke",
			"stylers": [
				{ "visibility": "on" },
                { "color": local_stroke_color },	
    			{ "saturation": -25 }, 
				{ "weight": 2.8 }
			]
		},
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },

        {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": poi_fill_color
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": road_arterial_fill_color
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": road_arterial_stroke_color
                }
            ]
        }
    ]; // END gmap styles

    // Set styles to map
    map.setOptions({styles: styles});


    });

  });

});