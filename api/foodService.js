
const api_Host = 'https://foodlover-4d8b6-default-rtdb.firebaseio.com';

export default {
  async fetchCookFood() {
    try {
          let response = await fetch(api_Host + '/Food.json');
          let json = await response.json();
          return Object.values(json);
          //  json = Object.values(json);
          //  return json;
     } catch(error) {
          console.error(error);
    }
  },
}