/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

export const getListAllTags = async () => {
   const data = await get(`/tags`);
   return data;
}