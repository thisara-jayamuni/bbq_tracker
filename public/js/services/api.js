// Import axios instance
import axiosInstance from '../axios-config.js';
import { getUserData } from '../utils/helpers.js';

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

  // Get single BBQ by ID
  getBBQById: async (bbqId) => {
    try {
      const response = await axiosInstance.get(`/bbqs/${bbqId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching BBQ location:', error);
      throw error;
    }
  },

  // Create new BBQ location
  createBBQ: async (bbqData) => {
    try {
      const response = await axiosInstance.post('/bbqs', {
        name: bbqData.name,
        latitude: bbqData.latitude,
        longitude: bbqData.longitude,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating BBQ location:', error);
      throw error;
    }
  },

  // Update BBQ location
  updateBBQ: async (bbqId, bbqData) => {
    try {
      const response = await axiosInstance.put(`/bbqs/${bbqId}`, {
        name: bbqData.name,
        latitude: bbqData.latitude,
        longitude: bbqData.longitude,
        status: bbqData.status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating BBQ location:', error);
      throw error;
    }
  },

  // Delete BBQ location
  deleteBBQ: async (bbqId) => {
    try {
      const response = await axiosInstance.delete(`/bbqs/${bbqId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting BBQ location:', error);
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
      const response = await axiosInstance.put('/faults/update', {
        id: faultId,
        status: status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating fault status:', error);
      throw error;
    }
  },

  // Get all supervisors
  getAllSupervisors: async () => {
    try {
      const response = await axiosInstance.get('/users/role/supervisor');
      return response.data;
    } catch (error) {
      console.error('Error fetching supervisors:', error);
      throw error;
    }
  },

  // Create job and assign supervisor
  assignSupervisor: async (faultId, supervisorId, bbqId, issue) => {
    try {
      // Get current user from localStorage
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      if (!userData || !userData.id) {
        throw new Error('No user logged in');
      }

      // Create job
      const jobResponse = await axiosInstance.post('/jobs', {
        bbqId: bbqId,
        raisedBy: userData.id,
        assignedTo: supervisorId,
        type: 'Clean',
        description: issue,
      });

      // Update fault status
      await axiosInstance.put('/faults/update', {
        id: faultId,
        status: 'Resolved',
      });

      return jobResponse.data;
    } catch (error) {
      console.error('Error assigning supervisor:', error);
      throw error;
    }
  },
};

// User service
export const userService = {
  // Get all users
  getAllUsers: async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (userId, userData) => {
    const response = await axiosInstance.put(`/users/id/${userId}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId, status) => {
    const response = await axiosInstance.patch(`/users/id/${userId}`, {
      status,
    });
    return response.data;
  },
};

// Job service
export const jobService = {
  // Get supervisor tasks
  getSupervisorTasks: async (supervisorId) => {
    try {
      const response = await axiosInstance.get(
        `/jobs/supervisorJob/${supervisorId}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching supervisor tasks:', error);
      throw error;
    }
  },

  // Assign cleaner to job
  assignCleaner: async (jobId, cleanerId) => {
    try {
      const response = await axiosInstance.put('/jobs/assign', {
        jobId,
        cleanerId,
      });
      return response.data;
    } catch (error) {
      console.error('Error assigning cleaner:', error);
      throw error;
    }
  },
};
