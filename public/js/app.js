// Import axios instance and services
import axiosInstance from './axios-config.js';
import { authService } from './services/api.js';
import { ROLE_DISPLAY_NAMES } from './utils/constants.js';

// Make handleLogout function globally available
window.handleLogout = function () {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  window.location.href = '/';
};

// Make fault reporting functions globally available
window.reportFault = function (bbqId, bbqName) {
  const modalContent = `
        <div id="faultModal" class="modal" style="max-width: 500px;">
            <div class="modal-content" style="padding: 24px;">
                <h5 style="color: #1976D2; margin-bottom: 20px;">Report Fault - ${bbqName}</h5>
                <div class="input-field">
                    <textarea id="faultDescription" class="materialize-textarea" 
                        style="min-height: 100px; border: 1px solid #ddd; padding: 10px; border-radius: 4px; margin-top: 10px;"
                        placeholder="Please describe the issue with this BBQ..."></textarea>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="submitFault('${bbqId}')" 
                        style="flex: 1; background: #1976D2; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 500;">
                        <i class="material-icons" style="font-size: 18px;">send</i>
                        Submit
                    </button>
                    <button onclick="closeFaultModal()" 
                        style="flex: 1; background: #757575; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 14px; font-weight: 500;">
                        <i class="material-icons" style="font-size: 18px;">close</i>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    `;

  // Remove existing modal if any
  const existingModal = document.getElementById('faultModal');
  if (existingModal) {
    existingModal.remove();
  }

  // Add new modal to body
  document.body.insertAdjacentHTML('beforeend', modalContent);

  // Initialize modal
  const modal = document.getElementById('faultModal');
  const instance = M.Modal.init(modal, {
    dismissible: true,
    opacity: 0.5,
    inDuration: 300,
    outDuration: 200,
    startingTop: '4%',
    endingTop: '10%',
  });

  // Open modal
  instance.open();

  // Initialize textarea
  M.textareaAutoResize(document.getElementById('faultDescription'));
};

window.submitFault = async function (bbqId) {
  const description = document.getElementById('faultDescription').value;
  if (!description.trim()) {
    M.toast({ html: 'Please enter a description', classes: 'red' });
    return;
  }

  try {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const response = await axiosInstance.post('/faults', {
      bbqId: bbqId,
      reporterName: userData.userName || 'Anonymous',
      issue: description,
    });

    M.toast({ html: 'Fault report submitted successfully', classes: 'green' });
    closeFaultModal();
  } catch (error) {
    console.error('Error submitting fault report:', error);
    M.toast({
      html:
        error.response?.data?.message ||
        'Failed to submit fault report. Please try again.',
      classes: 'red',
    });
  }
};

window.closeFaultModal = function () {
  const modal = document.getElementById('faultModal');
  if (modal) {
    const instance = M.Modal.getInstance(modal);
    if (instance) {
      instance.close();
    }
    modal.remove();
  }
};

// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Load header
  fetch('/components/header.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const headerElement =
        document.getElementById('header') ||
        document.getElementById('header-placeholder');
      if (!headerElement) {
        throw new Error('Header element not found in DOM');
      }
      headerElement.innerHTML = data;

      // Initialize sidenav after header is loaded
      setTimeout(() => {
        try {
          const elems = document.querySelectorAll('.sidenav');
          if (elems.length > 0) {
            M.Sidenav.init(elems);
            checkAuth();
          }
        } catch (error) {
          console.error('Error initializing sidenav:', error);
        }
      }, 100);
    })
    .catch((error) => {
      console.error('Error loading header:', error);
    });

  // Load footer
  fetch('/components/footer.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const footerElement =
        document.getElementById('footer') ||
        document.getElementById('footer-placeholder');
      if (!footerElement) {
        throw new Error('Footer element not found in DOM');
      }
      footerElement.innerHTML = data;
    })
    .catch((error) => {
      console.error('Error loading footer:', error);
    });

  // Initialize login form if it exists
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      handleLogin(email, password);
    });
  }
});

// Function to handle login
async function handleLogin(email, password) {
  try {
    const response = await authService.login(email, password);

    // Store token and user data
    localStorage.setItem('token', response.token);
    localStorage.setItem('userData', JSON.stringify(response.userData));

    // Show success message
    M.toast({
      html: 'Login successful!',
      classes: 'green',
    });

    // Redirect based on role
    const role = response.userData.role;
    window.location.href = getDashboardUrl(role);
  } catch (error) {
    console.error('Login error:', error);
    M.toast({
      html: error.response?.data?.message || 'Login failed. Please try again.',
      classes: 'red',
    });
  }
}

// Function to check authentication
export function checkAuth() {
  const token = localStorage.getItem('token');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  // Get header elements
  const userInfoNavItem = document.getElementById('user-info-nav-item');
  const dashboardNavItem = document.getElementById('dashboard-nav-item');
  const logoutNavItem = document.getElementById('logout-nav-item');
  const loginNavItem = document.getElementById('login-nav-item');
  const mobileUserInfo = document.getElementById('mobile-user-info');
  const mobileDashboardItem = document.getElementById('mobile-dashboard-item');
  const mobileLogoutItem = document.getElementById('mobile-logout-item');
  const mobileLoginItem = document.getElementById('mobile-login-item');

  if (token && userData) {
    // Show user info and dashboard button
    if (userInfoNavItem) userInfoNavItem.style.display = 'block';
    if (dashboardNavItem) dashboardNavItem.style.display = 'block';
    if (logoutNavItem) logoutNavItem.style.display = 'block';
    if (loginNavItem) loginNavItem.style.display = 'none';
    if (mobileUserInfo) mobileUserInfo.style.display = 'block';
    if (mobileDashboardItem) mobileDashboardItem.style.display = 'block';
    if (mobileLogoutItem) mobileLogoutItem.style.display = 'block';
    if (mobileLoginItem) mobileLoginItem.style.display = 'none';

    // Set user name and role
    const userName = document.getElementById('user-name');
    const userRole = document.getElementById('user-role');
    const mobileUserName = document.getElementById('mobile-user-name');
    const mobileUserRole = document.getElementById('mobile-user-role');

    if (userName) userName.textContent = userData.userName;
    if (userRole)
      userRole.textContent = ROLE_DISPLAY_NAMES[userData.role] || userData.role;
    if (mobileUserName) mobileUserName.textContent = userData.userName;
    if (mobileUserRole)
      mobileUserRole.textContent =
        ROLE_DISPLAY_NAMES[userData.role] || userData.role;

    // Set dashboard link based on role
    const dashboardLink = document.getElementById('dashboard-link');
    const mobileDashboardLink = document.getElementById(
      'mobile-dashboard-link'
    );
    const dashboardUrl = getDashboardUrl(userData.role);

    if (dashboardLink) dashboardLink.href = dashboardUrl;
    if (mobileDashboardLink) mobileDashboardLink.href = dashboardUrl;

    // Hide dashboard button for regular users
    if (userData.role === 'user') {
      if (dashboardNavItem) dashboardNavItem.style.display = 'none';
      if (mobileDashboardItem) mobileDashboardItem.style.display = 'none';
    }
  } else {
    // Hide user info and dashboard button
    if (userInfoNavItem) userInfoNavItem.style.display = 'none';
    if (dashboardNavItem) dashboardNavItem.style.display = 'none';
    if (logoutNavItem) logoutNavItem.style.display = 'none';
    if (loginNavItem) loginNavItem.style.display = 'block';
    if (mobileUserInfo) mobileUserInfo.style.display = 'none';
    if (mobileDashboardItem) mobileDashboardItem.style.display = 'none';
    if (mobileLogoutItem) mobileLogoutItem.style.display = 'none';
    if (mobileLoginItem) mobileLoginItem.style.display = 'block';
  }
}

// Function to get dashboard URL based on user role
function getDashboardUrl(role) {
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

// Function to get directions
function getDirections(lat, lng) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${lat},${lng}&travelmode=driving`;
        window.open(directionsUrl, '_blank');
      },
      () => {
        alert('Please enable location access to get directions.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}
