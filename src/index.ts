import axios from "axios";
import { getAccessToken } from "./utils/utils.ts";

const accessToken = await getAccessToken();

console.log("Access Token:", accessToken);

// const listActivities = async (accessToken: string) => {
//   try {
//     const response = await axios.get(
//       "https://www.strava.com/api/v3/athlete/activities",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },

//         params: {
//           per_page: 10,
//           page: 1,
//         },
//       }
//     );
//     console.log("Activities:", response.data);
//   } catch (error) {
//     console.error("Error fetching activities:", error);
//     throw new Error("Failed to fetch activities");
//   }
// };

// await listActivities(accessToken);
