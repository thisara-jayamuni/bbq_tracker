let map;

// Sample pins (could be from backend)
const pins = [
  // Melbourne CBD locations
  {
    lat: -37.8136,
    lng: 144.9631,
    label: 'Federation Square BBQ',
    info: {
      cleanliness: 'Excellent',
      facilities: ['Covered Area', 'Tables', 'Water', 'Lighting'],
      lastCleaned: '2024-03-15',
      status: 'Operational',
      rating: 4.5,
      reviews: 28,
    },
  },
  {
    lat: -37.8132,
    lng: 144.9628,
    label: 'Birrarung Marr BBQ',
    info: {
      cleanliness: 'Good',
      facilities: ['Tables', 'Water'],
      lastCleaned: '2024-03-10',
      status: 'Operational',
      rating: 4.2,
      reviews: 15,
    },
  },
  // Glen Waverley area locations
  {
    lat: -37.8789,
    lng: 145.1647,
    label: 'Glen Waverley Central BBQ',
    info: {
      cleanliness: 'Excellent',
      facilities: ['Covered Area', 'Tables', 'Water', 'Lighting', 'Restrooms'],
      lastCleaned: '2024-03-19',
      status: 'Operational',
      rating: 4.6,
      reviews: 35,
    },
  },
  {
    lat: -37.882,
    lng: 145.168,
    label: 'Kingsway BBQ Area',
    info: {
      cleanliness: 'Good',
      facilities: ['Covered Area', 'Tables', 'Water'],
      lastCleaned: '2024-03-14',
      status: 'Operational',
      rating: 4.3,
      reviews: 27,
    },
  },
  {
    lat: -37.875,
    lng: 145.162,
    label: 'Glen Waverley Library BBQ',
    info: {
      cleanliness: 'Excellent',
      facilities: [
        'Covered Area',
        'Tables',
        'Water',
        'Lighting',
        'Restrooms',
        'Playground',
      ],
      lastCleaned: '2024-03-20',
      status: 'Operational',
      rating: 4.7,
      reviews: 42,
    },
  },
  {
    lat: -37.885,
    lng: 145.17,
    label: 'Glen Waverley Sports Ground BBQ',
    info: {
      cleanliness: 'Good',
      facilities: ['Covered Area', 'Tables', 'Water', 'Restrooms'],
      lastCleaned: '2024-03-16',
      status: 'Operational',
      rating: 4.4,
      reviews: 31,
    },
  },
  {
    lat: -37.88,
    lng: 145.166,
    label: 'Glen Waverley Community Centre BBQ',
    info: {
      cleanliness: 'Excellent',
      facilities: ['Covered Area', 'Tables', 'Water', 'Lighting'],
      lastCleaned: '2024-03-18',
      status: 'Operational',
      rating: 4.5,
      reviews: 29,
    },
  },
  {
    lat: -37.877,
    lng: 145.163,
    label: 'Glen Waverley Station BBQ',
    info: {
      cleanliness: 'Fair',
      facilities: ['Tables', 'Water'],
      lastCleaned: '2024-03-12',
      status: 'Operational',
      rating: 3.9,
      reviews: 18,
    },
  },
  {
    lat: -37.883,
    lng: 145.169,
    label: 'Glen Waverley Park BBQ',
    info: {
      cleanliness: 'Good',
      facilities: ['Covered Area', 'Tables', 'Water', 'Playground'],
      lastCleaned: '2024-03-15',
      status: 'Operational',
      rating: 4.2,
      reviews: 24,
    },
  },
  {
    lat: -37.879,
    lng: 145.165,
    label: 'Glen Waverley Shopping Centre BBQ',
    info: {
      cleanliness: 'Excellent',
      facilities: ['Covered Area', 'Tables', 'Water', 'Lighting', 'Restrooms'],
      lastCleaned: '2024-03-17',
      status: 'Operational',
      rating: 4.6,
      reviews: 38,
    },
  },
];

function initMap() {
  console.log('Initializing map...');
  // Default location (Melbourne)
  const defaultLocation = { lat: -37.8136, lng: 144.9631 };

  try {
    const mapElement = document.getElementById('map');
    console.log('Map element:', mapElement);

    if (!mapElement) {
      console.error('Map element not found!');
      return;
    }

    map = new google.maps.Map(mapElement, {
      center: defaultLocation,
      zoom: 14,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#a5d7fd' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#92998d' }],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [{ color: '#e8e8e8' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#ffffff' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#d5f5e3' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }],
        },
      ],
    });

    console.log('Map initialized successfully');

    // Try to get user's location
    if (navigator.geolocation) {
      console.log('Geolocation supported, getting user location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Got user location:', position);
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Show user location
          new google.maps.Marker({
            position: userLocation,
            map,
            label: 'You',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40),
            },
          });

          map.setCenter(userLocation);
          console.log('Showing pins around user location...');
          showPins(userLocation);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Location access denied. Showing default map.');
          showPins(defaultLocation);
        }
      );
    } else {
      console.log('Geolocation not supported, showing default map...');
      alert('Geolocation not supported.');
      showPins(defaultLocation);
    }
  } catch (error) {
    console.error('Error initializing map:', error);
  }
}

// Helper: Haversine formula
function haversineDistance(loc1, loc2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function showPins(center) {
  console.log('Showing pins around center:', center);
  pins.forEach((pin) => {
    try {
      const dist = haversineDistance(center, pin);
      let iconUrl;

      if (dist <= 1) {
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      } else if (dist <= 2) {
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
      } else {
        iconUrl = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
      }

      const marker = new google.maps.Marker({
        position: { lat: pin.lat, lng: pin.lng },
        map,
        label: pin.label,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 32),
        },
      });

      console.log('Added marker for:', pin.label);

      // Create info window for the marker
      const infoWindow = new google.maps.InfoWindow();

      // Add click listener to show distance and BBQ info
      marker.addListener('click', () => {
        const distance = haversineDistance(center, pin);
        const distanceText =
          distance < 1
            ? `${(distance * 1000).toFixed(0)} meters`
            : `${distance.toFixed(1)} km`;

        const content = `
          <div style="padding: 16px; max-width: 320px; font-family: Arial, sans-serif;">
            <h6 style="margin: 0 0 12px 0; color: #1976D2; font-size: 18px; font-weight: 600;">${
              pin.label
            }</h6>
            <p style="margin: 0 0 12px 0; color: #555; font-size: 14px; display: flex; align-items: center; gap: 6px;">
              <i class="material-icons" style="font-size: 16px; color: #1976D2;">place</i>
              <span>${distanceText} away</span>
            </p>
            ${
              pin.info
                ? `
              <div style="border-top: 1px solid #eee; margin: 12px 0; padding-top: 12px;">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                  <i class="material-icons" style="font-size: 16px; color: #1976D2;">cleaning_services</i>
                  <span style="color: #555; font-size: 14px;">Cleanliness: <span style="color: #1976D2; font-weight: 500;">${
                    pin.info.cleanliness
                  }</span></span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                  <i class="material-icons" style="font-size: 16px; color: #1976D2;">star</i>
                  <span style="color: #555; font-size: 14px;">Rating: <span style="color: #1976D2; font-weight: 500;">${
                    pin.info.rating
                  }/5</span> (${pin.info.reviews} reviews)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                  <i class="material-icons" style="font-size: 16px; color: #1976D2;">update</i>
                  <span style="color: #555; font-size: 14px;">Last Cleaned: <span style="color: #1976D2; font-weight: 500;">${
                    pin.info.lastCleaned
                  }</span></span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                  <i class="material-icons" style="font-size: 16px; color: #1976D2;">info</i>
                  <span style="color: #555; font-size: 14px;">Status: <span style="color: #1976D2; font-weight: 500;">${
                    pin.info.status
                  }</span></span>
                </div>
                <div style="margin-top: 12px;">
                  <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                    <i class="material-icons" style="font-size: 16px; color: #1976D2;">local_activity</i>
                    <span style="color: #555; font-size: 14px;">Available Facilities</span>
                  </div>
                  <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                    ${pin.info.facilities
                      .map(
                        (facility) => `
                      <span style="background: #E3F2FD; color: #1976D2; padding: 4px 10px; border-radius: 16px; font-size: 12px; font-weight: 500;">
                        ${facility}
                      </span>
                    `
                      )
                      .join('')}
                  </div>
                </div>
              </div>
            `
                : ''
            }
            <div style="display: flex; gap: 8px; margin-top: 16px;">
              <button onclick="reportFault('${pin.label}')" 
                style="flex: 1; background: #FF5252; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 500; transition: background-color 0.2s;">
                <i class="material-icons" style="font-size: 18px;">report_problem</i>
                Report Fault
              </button>
              <button onclick="getDirections(${pin.lat}, ${pin.lng})" 
                style="flex: 1; background: #1976D2; color: white; border: none; padding: 10px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 500; transition: background-color 0.2s;">
                <i class="material-icons" style="font-size: 18px;">directions</i>
                Direction
              </button>
            </div>
          </div>
        `;

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });
    } catch (error) {
      console.error('Error adding marker for:', pin.label, error);
    }
  });
}
