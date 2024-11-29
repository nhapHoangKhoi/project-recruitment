/* eslint-disable no-unused-vars */
import { get, myDelete, patch, post } from "../utils/requests";

export const getListAllCompanies = async () => {
   const data = await get(`/companies`);
   return data;
}

export const getDetailedCompany = async (companyId) => {
   const data = await get(`/companies/${companyId}`);
   return data;
}

export const getTheUser = async (inputEmail, inputPassword) => {
   const data = await get(`/companies?email=${inputEmail}&password=${inputPassword}`);
   return data;
}

export const checkExisted = async (type, inputValue) => {
   const data = await get(`/companies?${type}=${inputValue}`);
   return data;
}

export const createCompany = async (dataSubmit) => {
   const data = await post(`/companies`, dataSubmit);
   return data
}

export const editCompany = async (companyId, dataSubmit) => {
   const data = await patch(`/companies/${companyId}`, dataSubmit);
   return data;
}