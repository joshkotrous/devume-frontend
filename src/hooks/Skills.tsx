import axios from "axios";

export interface SkillData {
  id: number;
  name: string;
}

export async function GetAllSkills() {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": import.meta.env.VITE_REACT_API_API_KEY,
    };

    const response = await axios.get(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/skills",
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}

export async function getSkill(id: number) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": import.meta.env.VITE_REACT_API_API_KEY,
    };

    const response = await axios.get(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/skills/" + id,
      {
        headers: headers,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data:", error.response.data);
    }
    throw error;
  }
}
