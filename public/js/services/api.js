// Import axios instance
import axiosInstance from '../axios-config.js';

// BBQ related API calls
export const bbqService = {
  // Get all BBQ locations
  getAllBBQs: async () => {
    try {
      const response = await axiosInstance.get('/bbqs');
      return response.data;
    } catch (error) {
      console.error('Error fetching BBQ locations:', error);
      throw error;
    }
  },

  // Report a fault
  reportFault: async (bbqId, reporterName, issue) => {
    try {
      const response = await axiosInstance.post('/faults', {
        bbqId,
        reporterName,
        issue,
      });
      return response.data;
    } catch (error) {
      console.error('Error reporting fault:', error);
      throw error;
    }
  },
};

// Auth related API calls
export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },
};

// Fault related API calls
export const faultService = {
  // Get all faults
  getAllFaults: async () => {
    try {
      const response = await axiosInstance.get('/faults');
      return response.data;
    } catch (error) {
      console.error('Error fetching faults:', error);
      throw error;
    }
  },

  // Update fault status
  updateFaultStatus: async (faultId, status) => {
    try {
      const response = await axiosInstance.patch(`/faults/${faultId}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating fault status:', error);
      throw error;
    }
  },
};
