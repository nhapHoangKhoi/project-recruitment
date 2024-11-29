/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { useEffect, useState } from "react";
import { getDetailedCompany } from "../../services/companyService";
import { getJobsByCompanyId } from "../../services/jobService";
import { Col, Row } from "antd";
import JobItem from "../../components/JobItem";

const CompanyDetail = () =>
{
   const params = useParams();
   const companyId = params.companyId;
   const [theCompanyData, setTheCompanyData] = useState();
   const [correspondJobs, setCorrespondJobs] = useState([]);

   useEffect(() => {
      const fetchAPI = async () => {
         const detailedCompany = await getDetailedCompany(companyId);
         const listOfJobs = await getJobsByCompanyId(companyId);

         if(detailedCompany && listOfJobs)
         { 
            const mergeData = listOfJobs.reverse().map((eachJob) => {
               const newObject = {
                  infoCompany: detailedCompany,
                  ...eachJob
               };

               return newObject;
            });

            setTheCompanyData(detailedCompany);

            setCorrespondJobs(mergeData);
            // props component JobItem
            // need to add more key infoCompany
            //
            // newly add
            //    |
            //    V
            // {infoCompany: {…}, name: 'NodeJS Backend Developer (Middle,Senior)', tags: Array(2), salary: '2000', city: Array(2), ...}
         }
      }

      fetchAPI();
   }, []);

   // console.log("theCompanyData:", theCompanyData);
   // console.log("correspondJobs:", correspondJobs);

   useEffect(() => {
      const element = document.querySelector(".company__description");

      if(element) {
         element.innerHTML = theCompanyData.description; 
      }
   }, [theCompanyData]);

   useEffect(() => {
      const element = document.querySelector(".company__detail");

      if(element) {
         element.innerHTML = theCompanyData.detail; 
      }
   }, [theCompanyData]);

   return (
      <>
         <GoBack />

         {/* <h1>Trang chi tiết 1 công ty</h1> */}

         {theCompanyData && (
            <>
               <h1>{theCompanyData.companyName}</h1>

               <div className="mb-20">
                  Address: <strong>{theCompanyData.address}</strong>
               </div>

               <div className="mb-20">
                  Employees: <strong>{theCompanyData.quantityPeople}</strong>
               </div>

               <div className="mb-20">
                  Working time: <strong>{theCompanyData.workingTime}</strong>
               </div>

               <div className="mb-20">
                  Link website: <strong>{theCompanyData.website}</strong>
               </div>

               <div className="mb-10">About us:</div>
               <div className="company__description mb-20"></div>

               <div className="mb-10">Benefits:</div>
               <div className="company__detail mb-20"></div>

               <div className="mb-10">Available jobs:</div>
               <div className="mb-20">
                  {correspondJobs.length > 0 
                     ? (
                        <Row gutter={[20, 20]}>
                           {correspondJobs.map((aJob) => (
                              (aJob.status === true) && (
                                 <Col xl={8} lg={8} md={12} sm={12} xs={24} key={aJob.id}>
                                    <JobItem eachJob={aJob} />
                                 </Col>
                              )
                           ))}
                        </Row>
                     ) 
                     : (
                        <strong>Currently no jobs available!!!</strong>
                     )
                  }
               </div>
            </>
         )}
      </>
   );
}

export default CompanyDetail;