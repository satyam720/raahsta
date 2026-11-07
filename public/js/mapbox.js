
  export const initMap = (mapContainer) => {
    const mapboxAccessToken = mapContainer.dataset.mapboxToken;
    if (!mapboxAccessToken) {
      throw new Error('MAPBOX_ACCESS_TOKEN is not configured on the server');
    }

    const locations = JSON.parse(mapContainer.dataset.locations);

    const map = new mapboxgl.Map({
      accessToken: mapboxAccessToken,
      container: 'map', // container ID
      // center: [78.327152, 17.472882], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      // zoom: 12, // starting zoom
      style: 'mapbox://styles/shino1960/cmvv0m1ev000l01r1bl6dchu4',
      scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      //add marker
      const el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      new mapboxgl.Popup({ offset: 30 })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: mapContainer.clientWidth < 600 ? 40 : 70,
      maxZoom: 12,
    });
  };


  

