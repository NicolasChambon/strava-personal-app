// import { getAccessToken } from "./utils/getAccessToken.ts";
// import { getProfileInformation } from "./utils/getProfileInformation.ts";
import { getActivityList } from "./utils/getActivityList.ts";

// const { access_token: accessToken } = await getAccessToken();
// const profileInformation = await getProfileInformation();
const activityList = await getActivityList(
  {
    before: "2025-12-31",
    after: "2025-01-01",
  },
  1,
  3
);

// console.log("accessToken", accessToken);
// console.log("profileInformation", profileInformation);
console.log("activityList", activityList);
