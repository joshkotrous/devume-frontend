import axios from "axios";

export interface EducationData {
  id?: number;
  profile?: string;
  school_name: string;
  start_date: string;
  end_date: string;
  description: string;
  degree: string;
  field_of_study: string;
}

export async function GetEducation(uuid: string) {
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": import.meta.env.VITE_REACT_API_API_KEY,
  };
  try {
    const response = await axios.get(
      import.meta.env.VITE_REACT_APP_API_BASE_URL + "/education/" + uuid,
      { headers: headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error);
    }
    throw error;
  }
}
