import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// we assign it to a variable to say run following code first and then export 
const instance = axios.create({
  baseURL: "http://dcbc-2a02-8109-b6bf-58a4-c51a-8d7f-dc50-6e57.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);


export default instance;


// if we have a token, it will be automatically added into our request and we don't have to worry about doing anything else inside of our application to somehow authenticate ourselves.