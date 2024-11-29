/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

export const getDetailedCV = async (cvId) => {
   const data = await get(`/cv/${cvId}`);
   return data;
}

export const getCVsByCompanyId = async (companyId) => {
   const data = await get(`/cv?idCompany=${companyId}`);
   return data;
}

export const createCV = async (dataSubmit) => {
   const data = await post("/cv", dataSubmit);
   return data;
}

export const deleteCV = async (itemId) => {
   const data = await myDelete(`/cv/${itemId}`);
   return data;
}

export const editCV = async (itemId, dataSubmit) => {
   const data = await patch(`/cv/${itemId}`, dataSubmit);
   return data;
}