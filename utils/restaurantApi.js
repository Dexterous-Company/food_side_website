// services/restaurantApi.js

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const restaurantApi = {
  // Get restaurant full details with products
  
  getRestaurantFullDetails: async (restaurantId) => {
    try {
        
      const response = await fetch(
        `${API_BASE_URL}/api/v1/delivery/restaurants-with-products/restaturent-id/${restaurantId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching restaurant details:", error);
      throw error;
    }
  },
  
  // Get restaurants by delivery point (if needed)
  
};