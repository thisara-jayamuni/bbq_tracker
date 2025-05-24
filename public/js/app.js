// Load header
fetch('components/header.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('header').innerHTML = data;
    // Initialize sidenav after header is loaded
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
  });

// Load footer
fetch('components/footer.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('footer').innerHTML = data;
  });

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
  console.log('Fault reported for:', locationName);
  console.log('Description:', description);

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
