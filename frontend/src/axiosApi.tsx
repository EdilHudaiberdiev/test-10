import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://hw-71-88f7d-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;
