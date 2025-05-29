// Function to calculate distance between two points in kilometers
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Function to get dashboard URL based on user role
export function getDashboardUrl(role) {
  switch (role.toLowerCase()) {
    case 'admin':
      return '/admin/dashboard.html';
    case 'supervisor':
      return '/supervisor/dashboard.html';
    case 'council':
      return '/council/dashboard.html';
    case 'cleaner':
      return '/cleaner/dashboard.html';
    default:
      return '/';
  }
}

// Function to show toast message
export function showToast(message, type = 'green') {
  M.toast({
    html: message,
    classes: type,
  });
}

// Function to get user data from localStorage
export function getUserData() {
  return JSON.parse(localStorage.getItem('userData') || '{}');
}

// Function to check if user is logged in
export function isLoggedIn() {
  const token = localStorage.getItem('token');
  const userData = getUserData();
  return token && userData;
}
