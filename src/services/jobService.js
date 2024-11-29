/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

export const getListAllJobs = async () => {
   const data = await get(`/jobs`);
   return data;
}

export const getDetailedJob = async (jobId) => {
   const data = await get(`/jobs/${jobId}`);
   return data;
}

export const getJobsByCompanyId = async (companyId) => {
   const data = await get(`/jobs?idCompany=${companyId}`);
   return data;
}

export const editJobRecruit = async (itemId, dataSubmit) => {
   const data = await patch(`/jobs/${itemId}`, dataSubmit);
   return data;
}

export const createJobRecruit = async (dataSubmit) => {
   const data = await post("/jobs", dataSubmit);
   return data;
}

export const deleteJobRecruit = async (itemId) => {
   const data = await myDelete(`/jobs/${itemId}`);
   return data;
}