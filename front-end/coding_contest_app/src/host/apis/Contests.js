import axios from "axios";

const FetchContestDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8000/host/contests/");
        return response.data;

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

export default FetchContestDetails;
