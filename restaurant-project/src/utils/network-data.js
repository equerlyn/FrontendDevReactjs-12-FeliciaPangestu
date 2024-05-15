import axios from 'axios';

async function getAllRestaurants() {
  try {
    const response = await axios.get('http://localhost:3000/api/restaurants');
    return { error: false, data: response.data.results };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true, data: null };
  }
}

async function getRestaurantPhoto(photo_reference) {
  try {
    const response = await axios.get(`http://localhost:3000/api/restaurant/photo?photoreference=${photo_reference}`);
    return { error: false, data: response.data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true, data: null };
  }
}

async function getRestaurantDetail(place_id) {
  try {
    const response = await axios.get(`http://localhost:3000/api/restaurant/${place_id}`);
    return { error: false, data: response.data.result };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: true, data: null };
  }

}

export {
  getAllRestaurants,
  getRestaurantPhoto,
  getRestaurantDetail,
}