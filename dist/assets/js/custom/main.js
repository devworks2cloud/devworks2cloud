(function () {
    let map;
    let panorama;

    function initMap() {
        const fenway = { lat: 40.729559, lng: -73.990741 };
        // Verificar si existen los divs para mapa y/o panorama
        const mapDiv = document.getElementById("map");
        const panoDiv = document.getElementById("pano");
        const panoDi2 = document.getElementById('street-view')
        const onlymapDiv = document.getElementById('onlymap')
        if (mapDiv && panoDiv) {
            // Inicializar el mapa y panorama lado a lado
            initializeMap(fenway, mapDiv, panoDiv);
        } else {
            console.error("No se encontró el div con id 'map' ni 'pano'");
        }
        if (onlymapDiv) {
            // Solo mapa
            initializeMapOnly(fenway, onlymapDiv);
        } else {
            console.error("No se encontró el div con id 'map' ni 'pano'");
        }
        if (panoDi2) {
            // Solo panorama
            initializePanoramaOnly(fenway, panoDi2);
        } else {
            console.error("No se encontró el div con id 'map' ni 'pano'");
        }
    }



    function initializeMap(fenway, mapDiv, panoDiv) {
        // Crear el mapa

        map = new google.maps.Map(mapDiv, {
            center: fenway,
            zoom: 15,
            //mapId: "DEMO_MAP_ID",
            mapTypeControl: true,
            streetViewControl: true,
        });

        // Icono del marcador rojo (posición actual)
        const svgMarker = {
            path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "blue",
            fillOpacity: 0.7,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            anchor: new google.maps.Point(0, 20),
        };

        // Añadir marcador en la ubicación de 'fenway' (la posición de centro del mapa)
        const centerMarker = new google.maps.Marker({
            position: fenway, // Usamos las coordenadas de fenway
            map,
            title: "Fenway Park",
            icon: svgMarker // Puedes usar svgMarker o cualquier otro ícono que prefieras
        });

        // Crear el Street View panorama
        panorama = new google.maps.StreetViewPanorama(panoDiv, {
            position: fenway,
            pov: { heading: 34, pitch: 10 },
            visible: true,
        });

        map.setStreetView(panorama);
        panorama = map.getStreetView();
        panorama.setPosition(fenway);

        // Agregar estilo y controles
        addStyleSelector(map);
        //addStreetViewToggle();

    }

    function initializeMapOnly(fenway, mapDiv) {
        // Crear solo el mapa
        map = new google.maps.Map(mapDiv, {
            center: fenway, // Usar fenway para centrar el mapa
            zoom: 18,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: 'greedy',
            //mapId: "DEMO_MAP_ID",
        });

        // Iconos personalizados
        const cafeIcon = document.createElement("img");
        cafeIcon.src =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/cafe_icon.svg";

        const dollarIcon = document.createElement("img");
        dollarIcon.src =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/bank_icon.svg";

        const busIcon = document.createElement("img");
        busIcon.src =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/bus_icon.svg";

        // Icono del marcador rojo (posición actual)
        const svgMarker = {
            path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
            fillColor: "red",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 2,
            anchor: new google.maps.Point(0, 20),
        };

        // Set up the markers on the map
        const cafeMarker = new google.maps.Marker({
            position: { lat: 40.730031, lng: -73.991428 },
            map,
            title: "Cafe",
            icon: cafeIcon.src,
        });
        const bankMarker = new google.maps.Marker({
            position: { lat: 40.729681, lng: -73.991138 },
            map,
            title: "Bank",
            icon: dollarIcon.src,
        });
        const busMarker = new google.maps.Marker({
            position: { lat: 40.729650, lng: -73.990759 },
            map,
            title: "Bus Stop",
            icon: busIcon.src,
        });

        const placeMarker = new google.maps.Marker({
            position: { lat: 40.729559, lng: -73.990741 },
            map,
            title: "Place",
            icon: svgMarker,
        });

        // Añadir marcador en la ubicación de 'fenway' (la posición de centro del mapa)
        const centerMarker = new google.maps.Marker({
            position: fenway, // Usamos las coordenadas de fenway
            map,
            title: "Fenway Park",
            icon: svgMarker // Puedes usar svgMarker o cualquier otro ícono que prefieras
        });


        // // Marcador para la posición del usuario
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         const userPos = {
        //             lat: position.coords.latitude,
        //             lng: position.coords.longitude,
        //         };

        //         const userMarker = new google.maps.marker.AdvancedMarkerElement({
        //             position: userPos,
        //             map,
        //             title: "You are here",
        //             icon: userLocationIcon, // Marcador rojo clásico
        //         });

        //         // Opcional: Centrar el mapa en la ubicación del usuario
        //         map.setCenter(userPos);
        //     }, () => {
        //         handleLocationError(true, map.getCenter());
        //     });
        // } else {
        //     // El navegador no soporta la geolocalización
        //     handleLocationError(false, map.getCenter());
        // }


        // Agregar estilo y controles
        addStyleSelector(map);
        //addStreetViewToggle();
    };

    function initializePanoramaOnly(fenway, mapDiv, panoDi2) {
        // Crear solo el Street View panorama
        map = new google.maps.Map(mapDiv, panoDi2, document.getElementById("map"), {
            center: fenway,
            zoom: 0,
            //mapId: "DEMO_MAP_ID",
        });

        panorama = new google.maps.StreetViewPanorama(mapDiv, panoDi2, document.getElementById("street-view"),
            {
                position: fenway,
                pov: { heading: 34, pitch: 10 },
                visible: true,
            }
        );
        map.setStreetView(panorama);
        panorama = map.getStreetView();
        panorama.setPosition(fenway);
        // Agregar estilo y controles
        //addStyleSelector(map);
    }

    function handleLocationError(browserHasGeolocation, pos) {
        const infoWindow = new google.maps.InfoWindow({
            position: pos,
            content: browserHasGeolocation
                ? "Error: Geolocation failed."
                : "Error: Your browser doesn't support geolocation.",
        });
        infoWindow.open(map);
    }

    function addStyleSelector(map) {
        // Crear el contenedor del selector
        const styleSelectorControl = document.createElement("div");
        styleSelectorControl.className = "map-control";
        styleSelectorControl.id = "style-selector-control";

        // Crear el elemento select
        const styleSelector = document.createElement('select');
        styleSelector.id = 'style-selector';
        styleSelector.className = 'selector-control';

        // Crear las opciones y agregarlas al select
        const options = [
            { value: 'default', text: 'Default' },
            { value: 'silver', text: 'Silver' },
            { value: 'night', text: 'Night mode' },
            { value: 'retro', text: 'Retro', selected: true },
            { value: 'hiding', text: 'Hide features' }
        ];

        options.forEach(function (optionData) {
            const option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.text;
            if (optionData.selected) option.selected = true;
            styleSelector.appendChild(option);
        });

        // Agregar el select al contenedor
        styleSelectorControl.appendChild(styleSelector);

        // Agregar el control al mapa en la posición TOP_LEFT
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleSelectorControl);

        // Asignar evento al select una vez que el control ya está en el DOM
        styleSelector.addEventListener("change", () => {
            map.setOptions({ styles: styles[styleSelector.value] });
        });

        // Establecer estilo inicial del mapa basado en el valor seleccionado
        map.setOptions({ styles: styles[styleSelector.value] });
    }

    function addStreetViewToggle() {
        const toggleButton = document.createElement("button");
        toggleButton.id = "toggle";
        toggleButton.innerText = "Toggle Street View";
        toggleButton.addEventListener("click", toggleStreetView);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(toggleButton);
    }

    function toggleStreetView() {
        const toggle = panorama.getVisible();
        panorama.setVisible(!toggle);
    }

    // Estilos de mapa
    const styles = {
        default: [],
        silver: [
            {
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }],
            },
            {
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
            {
                elementType: "labels.text.fill",
                stylers: [{ color: "#616161" }],
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#f5f5f5" }],
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{ color: "#bdbdbd" }],
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }],
            },
            {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#dadada" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#616161" }],
            },
            {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }],
            },
            {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }],
            },
            {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#c9c9c9" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }],
            },
        ],
        night: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
            },
        ],
        retro: [
            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
            {
                featureType: "administrative",
                elementType: "geometry.stroke",
                stylers: [{ color: "#c9b2a6" }],
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "geometry.stroke",
                stylers: [{ color: "#dcd2be" }],
            },
            {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{ color: "#ae9e90" }],
            },
            {
                featureType: "landscape.natural",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#93817c" }],
            },
            {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#a5b076" }],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#447530" }],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#f5f1e6" }],
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{ color: "#fdfcf8" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#f8c967" }],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e9bc62" }],
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry",
                stylers: [{ color: "#e98d58" }],
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry.stroke",
                stylers: [{ color: "#db8555" }],
            },
            {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#806b63" }],
            },
            {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "transit.line",
                elementType: "labels.text.fill",
                stylers: [{ color: "#8f7d77" }],
            },
            {
                featureType: "transit.line",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#ebe3cd" }],
            },
            {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#dfd2ae" }],
            },
            {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#b9d3c2" }],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#92998d" }],
            },
        ],
        hiding: [
            {
                featureType: "poi.business",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "transit",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
        ],

    };
    window.initMap = initMap;
})();