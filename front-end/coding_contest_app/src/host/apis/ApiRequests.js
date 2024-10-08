import axios from "axios";
import { handleApiResponse, handleNetworkError } from "./Exceptions";

//api to send data to backend
export const sendData = async (url, data = null, headers = {}) => {
  // let response;  // Declare response variable outside the try block
  try {
    const response = await axios.post(url, data, { headers });
    return response;
  } catch (error) {
    if (error.response) {
      handleApiResponse(error.response);
    } else {
      handleNetworkError(error);
    }
  }
};

// api to get data from backend
export const getData = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, headers);
    return response;
  } catch (error) {
    if (error.response) {
      handleApiResponse(error.response);
    } else {
      handleNetworkError(error);
    }
  }
};
