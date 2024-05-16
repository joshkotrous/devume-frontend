import Cookies from "js-cookie";
import axios from "axios";

export async function CreateProfile() {
  const request = {};
  try {
    const headers = {
      "Content-Type": "application/json", // Example header
      Authorization: "Bearer " + Cookies.get("token"), // Example header
    };
    const response = await axios.post(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/profiles/create",
      request,
      {
        headers: headers,
        // withCredentials: true // Include cookies in the request
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}

export async function GetProfile(userId: any) {
  try {
    const headers = {
      "Content-Type": "application/json", // Example header
      // Authorization: "Bearer " + Cookies.get("token"), // Example header
      "x-api-key": import.meta.env.VITE_REACT_API_API_KEY,
    };
    const response = await axios.get(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/profiles/" + userId,
      {
        headers: headers,
        // withCredentials: true // Include cookies in the request
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}

export async function GetAllProfiles() {
  try {
    const headers = {
      "Content-Type": "application/json", // Example header
      Authorization: "Bearer " + Cookies.get("token"), // Example header
    };
    const response = await axios.get(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/profiles/",
      {
        headers: headers,
        // withCredentials: true // Include cookies in the request
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}
