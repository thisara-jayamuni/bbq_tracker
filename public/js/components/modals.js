import { showToast } from '../utils/helpers.js';
import { bbqService } from '../services/api.js';

// Function to show login prompt
export function showLoginPrompt() {
  const modalContent = `
    <div id="loginPromptModal" class="modal" style="max-width: 400px;">
      <div class="modal-content" style="padding: 24px;">
        <h5 style="color: #1976D2; margin-bottom: 20px;">Login Required</h5>
        <p style="margin-bottom: 20px;">Please login to report faults with BBQ locations.</p>
        <div style="display: flex; gap: 10px;">
          <button onclick="window.location.href='/login.html'" 
            class="btn waves-effect waves-light blue" 
            style="flex: 1; height: 40px; line-height: 40px; padding: 0 16px; border-radius: 4px; text-transform: none; font-weight: 600;">
            <i class="material-icons left">login</i>Login
          </button>
          <button onclick="closeLoginPrompt()" 
            class="btn waves-effect waves-light grey" 
            style="flex: 1; height: 40px; line-height: 40px; padding: 0 16px; border-radius: 4px; text-transform: none; font-weight: 600;">
            <i class="material-icons left">close</i>Cancel
          </button>
        </div>
      </div>
    </div>
  `;

  showModal('loginPromptModal', modalContent);
}

// Function to show fault report modal
export function showFaultReportModal(bbqId, bbqName) {
  const modalContent = `
    <div id="faultModal" class="modal" style="max-width: 500px;">
      <div class="modal-content" style="padding: 24px;">
        <h5 style="color: #1976D2; margin-bottom: 20px;">Report Fault - ${bbqName}</h5>
        <div class="input-field">
          <textarea id="faultDescription" class="materialize-textarea" 
            style="min-height: 100px; border: 1px solid #ddd; padding: 10px; border-radius: 4px; margin-top: 10px;"
            placeholder="Please describe the issue with this BBQ location..."></textarea>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button onclick="submitFault('${bbqId}', '${bbqName}')" 
            class="btn waves-effect waves-light blue" 
            style="flex: 1; height: 40px; line-height: 40px; padding: 0 16px; border-radius: 4px; text-transform: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="material-icons" style="font-size: 18px;">send</i>
            Submit Report
          </button>
          <button onclick="closeFaultModal()" 
            class="btn waves-effect waves-light grey" 
            style="flex: 1; height: 40px; line-height: 40px; padding: 0 16px; border-radius: 4px; text-transform: none; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <i class="material-icons" style="font-size: 18px;">close</i>
            Cancel
          </button>
        </div>
      </div>
    </div>
  `;

  showModal('faultModal', modalContent);
  M.textareaAutoResize(document.getElementById('faultDescription'));
}

// Helper function to show modal
function showModal(id, content) {
  // Remove existing modal if any
  const existingModal = document.getElementById(id);
  if (existingModal) {
    existingModal.remove();
  }

  // Add new modal to body
  document.body.insertAdjacentHTML('beforeend', content);

  // Initialize modal
  const modal = document.getElementById(id);
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
}

// Function to close modal
export function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    const instance = M.Modal.getInstance(modal);
    if (instance) {
      instance.close();
    }
    modal.remove();
  }
}

// Make functions globally available
window.showLoginPrompt = showLoginPrompt;
window.showFaultReportModal = showFaultReportModal;
window.closeLoginPrompt = () => closeModal('loginPromptModal');
window.closeFaultModal = () => closeModal('faultModal');
window.submitFault = async (bbqId, bbqName) => {
  const description = document.getElementById('faultDescription').value;
  if (!description) {
    showToast('Please provide a description', 'red');
    return;
  }

  try {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    await bbqService.reportFault(
      bbqId,
      userData.userName || 'Anonymous',
      description
    );

    showToast('Fault reported successfully', 'green');
    closeModal('faultModal');
  } catch (error) {
    console.error('Error submitting fault:', error);
    showToast(
      error.response?.data?.message || 'Error submitting fault report',
      'red'
    );
  }
};
