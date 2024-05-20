import Cookies from "js-cookie";
import axios from "axios";
import { SkillData } from "./Skills";

export interface ProfileData {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
  };
  profile: {
    uuid: string;
    bio: string;
    birth_date: string;
    skills: string[];
    location: string;
    link_1: string;
    link_2: string;
    link_3: string;
  };
}

export interface UpdateProfileData {
  uuid: string;
  bio: string;
  skills: string[];
  location: string;
  link_1: string;
  link_2: string;
  link_3: string;
}

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
      "x-api-key": import.meta.env.VITE_REACT_API_API_KEY,
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

export async function UpdateProfile(
  profileData: UpdateProfileData,
  uuid: string
) {
  const request = profileData;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("token"),
  };
  try {
    const response = await axios.put(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/profiles/update/" + uuid,
      request,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data);
    }
    throw error;
  }
}
