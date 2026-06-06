// services/api/v1/paymentservice.js
import axios from 'axios';
const BaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
class PaymentService {
  async processCOD(orderData) {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/payments/cod`, orderData, {
        headers: {
          'Content-Type': 'application/json',   
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async verifyPayment(paymentData) {
    try {
      const response = await axios.post(`${BaseUrl}/api/v1/payments/verify`, paymentData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPaymentStatus(orderId) {
    try {
      const response = await axios.get(`${BaseUrl}/api/v1/payments/status/${orderId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new PaymentService();