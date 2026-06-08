// services/orderService.js
import axios from 'axios';
// import { API_CONFIG } from '../config/api';

// const BaseUrl = API_CONFIG.BASE_URL;

const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

class OrderService {
  async createOrder(orderData) {
    try {
      
      const response = await axios.post(`${BaseUrl}/api/v1/orders/new`, orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response ,"response");
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOrderById(orderId) {
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/orders/${orderId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserOrders(userId) {
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/orders/user/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async trackOrder(orderId) {
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/orders/${orderId}/track`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(orderId, reason) {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/orders/${orderId}/cancel`, { reason });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService();