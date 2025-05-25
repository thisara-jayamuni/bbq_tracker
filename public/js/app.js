// Load header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  // Check localStorage and update navigation
  try {
    const storedUser = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }

  // Load header
  fetch('/components/header.html')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      // Try both standard and placeholder IDs
      const headerElement =
        document.getElementById('header') ||
        document.getElementById('header-placeholder');
      if (!headerElement) {
        throw new Error('Header element not found in DOM');
      }
      headerElement.innerHTML = data;

      // Wait for the DOM to update with the new content
      setTimeout(() => {
        try {
          const elems = document.querySelectorAll('.sidenav');
          if (elems.length > 0) {
            M.Sidenav.init(elems);
            updateNavigation();
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
      // Try both standard and placeholder IDs
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
});

// Function to update navigation visibility
function updateNavigation() {
  const rawIsLoggedIn = localStorage.getItem('isLoggedIn');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const isLoggedIn = rawIsLoggedIn === 'true';

  const userInfoNav = document.getElementById('user-info-nav-item');
  const userName = document.getElementById('user-name');
  const mobileUserInfo = document.getElementById('mobile-user-info');
  const mobileUserName = document.getElementById('mobile-user-name');
  const loginBtn = document.getElementById('login-nav-item');
  const logoutBtn = document.getElementById('logout-nav-item');
  const mobileLoginBtn = document.getElementById('mobile-login-item');
  const mobileLogoutBtn = document.getElementById('mobile-logout-item');

  if (
    userInfoNav &&
    userName &&
    mobileUserInfo &&
    mobileUserName &&
    loginBtn &&
    logoutBtn &&
    mobileLoginBtn &&
    mobileLogoutBtn
  ) {
    if (isLoggedIn && userData) {
      // Update user information
      userName.textContent = userData.name || 'User';
      mobileUserName.textContent = userData.name || 'User';

      // Update role badge
      const roleBadge = userInfoNav.querySelector('.badge');
      const mobileRoleBadge = mobileUserInfo.querySelector('.badge');
      if (roleBadge && mobileRoleBadge) {
        roleBadge.textContent = userData.role || 'User';
        mobileRoleBadge.textContent = userData.role || 'User';
      }

      // Show user info and navigation items
      userInfoNav.style.display = 'block';
      mobileUserInfo.style.display = 'block';
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';
      mobileLoginBtn.style.display = 'none';
      mobileLogoutBtn.style.display = 'block';
    } else {
      // Hide user info and navigation items
      userInfoNav.style.display = 'none';
      mobileUserInfo.style.display = 'none';
      loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
      mobileLoginBtn.style.display = 'block';
      mobileLogoutBtn.style.display = 'none';
    }
  }
}

// Listen for changes in localStorage
window.addEventListener('storage', function (e) {
  if (e.key === 'isLoggedIn') {
    updateNavigation();
  }
});

function handleLogout() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userData');
  updateNavigation();
  window.location.href = '/';
}

// Function to handle fault reporting
function reportFault(locationName) {
  const modalContent = `
        <div id="faultModal" class="modal" style="max-width: 500px;">
            <div class="modal-content" style="padding: 24px;">
                <h5 style="color: #1976D2; margin-bottom: 20px;">Report Fault - ${locationName}</h5>
                <div class="input-field">
                    <textarea id="faultDescription" class="materialize-textarea" 
                        style="min-height: 100px; border: 1px solid #ddd; padding: 10px; border-radius: 4px; margin-top: 10px;"
                        placeholder="Please describe the issue with this BBQ location..."></textarea>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="submitFault('${locationName}')" 
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
}

// Function to submit fault report
function submitFault(locationName) {
  const description = document.getElementById('faultDescription').value;
  if (!description.trim()) {
    M.toast({ html: 'Please enter a description', classes: 'red' });
    return;
  }

  // TODO: Send fault report to backend
  M.toast({ html: 'Fault report submitted successfully', classes: 'green' });
  closeFaultModal();
}

// Function to close fault modal
function closeFaultModal() {
  const modal = document.getElementById('faultModal');
  if (modal) {
    const instance = M.Modal.getInstance(modal);
    if (instance) {
      instance.close();
    }
    modal.remove();
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
