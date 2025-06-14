// Import dependencies
import axiosInstance from './axios-config.js';
import { bbqService } from './services/api.js';
import { calculateDistance, isLoggedIn, showToast } from './utils/helpers.js';
import { showFaultReportModal, showLoginPrompt } from './components/modals.js';

// Global variables
let map;
let userMarker;
let bbqMarkers = [];

// Define initMap function before it's called by the API
window.initMap = function () {
  // Check if map element exists
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error('Map element not found');
    return;
  }

  // Create the map centered on Victoria, Australia
  map = new google.maps.Map(mapElement, {
    center: { lat: -37.8136, lng: 144.9631 }, // Melbourne coordinates
    zoom: 10,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
    ],
  });

  // Get user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Add user marker
        userMarker = new google.maps.Marker({
          position: userLocation,
          map: map,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            scaledSize: new google.maps.Size(32, 32),
          },
          title: 'Your Location',
        });

        // Center map on user's location
        map.setCenter(userLocation);
        map.setZoom(12);

        // Load BBQ locations
        loadBBQLocations(userLocation);
      },
      (error) => {
        console.error('Error getting user location:', error);
        // Load BBQ locations without user location
        loadBBQLocations();
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    // Load BBQ locations without user location
    loadBBQLocations();
  }
};

// Function to load BBQ locations from API
async function loadBBQLocations(userLocation = null) {
  try {
    const response = await bbqService.getAllBBQs();
    const bbqLocations = response.bbqs || [];

    // Clear existing markers
    bbqMarkers.forEach((marker) => marker.setMap(null));
    bbqMarkers = [];

    // Add markers for each BBQ location
    bbqLocations.forEach((bbq) => {
      const marker = createBBQMarker(bbq, userLocation);
      bbqMarkers.push(marker);
    });
  } catch (error) {
    console.error('Error loading BBQ locations:', error);
    showToast(
      error.response?.data?.message || 'Error loading BBQ locations',
      'red'
    );
  }
}

// Function to create a BBQ marker
function createBBQMarker(bbq, userLocation) {
  // Calculate distance if user location is available
  let distance = null;
  let markerColor = 'red-dot.png'; // Default for far away

  if (userLocation) {
    distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      bbq.lat,
      bbq.lng
    );

    // Set marker color based on distance
    if (distance < 1) {
      markerColor = 'green-dot.png'; // Very close
    } else if (distance < 2) {
      markerColor = 'yellow-dot.png'; // Nearby
    }
  }

  // Create marker
  const marker = new google.maps.Marker({
    position: { lat: bbq.lat, lng: bbq.lng },
    map: map,
    icon: {
      url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}`,
      scaledSize: new google.maps.Size(32, 32),
    },
    title: bbq.name,
  });

  // Create info window content
  const content = `
        <div class="info-window" style="padding: 16px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
            <div style="border-bottom: 2px solid #E3F2FD; padding-bottom: 12px; margin-bottom: 12px;">
                <h6 style="margin: 0; color: #1976D2; font-weight: 600; font-size: 1.1rem; letter-spacing: -0.01em;">${
                  bbq.name
                }</h6>
                ${
                  distance
                    ? `
                <div style="background: #E3F2FD; padding: 8px 12px; border-radius: 6px; margin-top: 8px; display: inline-block;">
                    <p style="margin: 0; display: flex; align-items: center; color: #1976D2;">
                        <i class="material-icons tiny" style="margin-right: 4px;">place</i>
                        <span style="font-weight: 600; letter-spacing: -0.01em;">${distance.toFixed(
                          1
                        )} km away</span>
                    </p>
                </div>`
                    : ''
                }
            </div>
            
            <div style="margin-bottom: 16px;">
                <div style="display: flex; align-items: center; margin-bottom: 8px; padding: 8px; background: #F5F5F5; border-radius: 4px;">
                    <i class="material-icons tiny" style="color: #1976D2; margin-right: 8px;">info</i>
                    <div>
                        <span style="color: #666; font-size: 0.85rem; font-weight: 500; letter-spacing: -0.01em;">Status</span><br>
                        <span style="font-weight: 600; color: #333; letter-spacing: -0.01em;">${
                          bbq.status
                        }</span>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; margin-bottom: 8px; padding: 8px; background: #F5F5F5; border-radius: 4px;">
                    <i class="material-icons tiny" style="color: #1976D2; margin-right: 8px;">cleaning_services</i>
                    <div>
                        <span style="color: #666; font-size: 0.85rem; font-weight: 500; letter-spacing: -0.01em;">Cleanliness</span><br>
                        <span style="font-weight: 600; color: #333; letter-spacing: -0.01em;">${
                          bbq.cleanliness
                        }</span>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; padding: 8px; background: #F5F5F5; border-radius: 4px;">
                    <i class="material-icons tiny" style="color: #1976D2; margin-right: 8px;">schedule</i>
                    <div>
                        <span style="color: #666; font-size: 0.85rem; font-weight: 500; letter-spacing: -0.01em;">Last Cleaned</span><br>
                        <span style="font-weight: 600; color: #333; letter-spacing: -0.01em;">${new Date(
                          bbq.lastCleaned
                        ).toLocaleString()}</span>
                    </div>
                </div>
            </div>
            
            <div class="info-window-actions" style="display: flex; gap: 8px;">
                <button onclick="getDirections(${bbq.lat}, ${bbq.lng})" 
                    class="btn-small waves-effect waves-light blue" 
                    style="flex: 1; height: 36px; line-height: 36px; padding: 0 16px; border-radius: 4px; text-transform: none; font-weight: 600; letter-spacing: -0.01em; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                    <i class="material-icons left" style="margin-right: 4px;">directions</i>Get Directions
                </button>
                ${
                  isLoggedIn()
                    ? `<button onclick="showFaultReportModal('${bbq.id}', '${bbq.name}')" 
                        class="btn-small waves-effect waves-light red" 
                        style="flex: 1; height: 36px; line-height: 36px; padding: 0 16px; border-radius: 4px; text-transform: none; font-weight: 600; letter-spacing: -0.01em; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                        <i class="material-icons left" style="margin-right: 4px;">report_problem</i>Report Fault
                    </button>`
                    : `<button onclick="showLoginPrompt()" 
                        class="btn-small waves-effect waves-light grey" 
                        style="flex: 1; height: 36px; line-height: 36px; padding: 0 16px; border-radius: 4px; text-transform: none; font-weight: 600; letter-spacing: -0.01em; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                        <i class="material-icons left" style="margin-right: 4px;">login</i>Report Fault
                    </button>`
                }
            </div>
        </div>
    `;

  // Add click listener to marker
  marker.addListener('click', () => {
    const infoWindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 320,
      pixelOffset: new google.maps.Size(0, -10),
      backgroundColor: '#fff',
      borderRadius: '8px',
    });
    infoWindow.open(map, marker);
  });

  return marker;
}

// Function to get directions
window.getDirections = function (lat, lng) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}&travelmode=driving`;
        window.open(directionsUrl, '_blank');
      },
      () => {
        showToast('Please enable location access to get directions.', 'red');
      }
    );
  } else {
    showToast('Geolocation is not supported by your browser.', 'red');
  }
};
