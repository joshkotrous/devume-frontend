// import Cookies from "js-cookie";

export async function UserLogin(username, password) {
    const request = {
        username: username,
        password: password,
      };
      try {
        const response = await fetch(
          import.meta.env.VITE_REACT_APP_API_BASE_URL + "/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key": import.meta.env.VITE_REACT_API_API_KEY
            },
            body: JSON.stringify(request),
            cache: "default",
          }
        );
        const data = await response.json();
        
        if (response.status != 200) {
          throw new Error(data.message); 
        }
        console.log(data)
        return {
          error: false,
          message: data.message
        }
      } catch (error) {
        console.log(error.message);
        return {
          error: true,
          message: error.message
        }
      } finally {
        
      }
}