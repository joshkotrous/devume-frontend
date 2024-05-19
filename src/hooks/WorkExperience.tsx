import axios from "axios";

export interface WorkExperienceData {
  company: string;
  description: string;
  end_date: string;
  id: number;
  job_title: string;
  profile: string;
  start_date: string;
}

export async function GetWorkExperience(uuid: string) {
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": import.meta.env.VITE_REACT_API_API_KEY,
  };
  try {
    const response = await axios.get(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/work_experience/" + uuid,
      { headers: headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log("Error data: ", error.response);
    }
    throw error;
  }
}
