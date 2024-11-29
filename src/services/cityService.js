/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

export const getListAllCities = async () => {
   const data = await get(`/cities`);
   return data;
}

// export const getAnsweredByUserId = async () => {
//    // nen viet userId o day
//    // de khong so bi F12 sua lai
//    const userId = getCookie("id");
//    const data = await get(`/answers?userId=${userId}`);
//    return data;
// }