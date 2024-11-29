/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedJob } from "../../services/jobService";
import GoBack from "../../components/GoBack";
import { Tag } from "antd";

const JobDetailAdmin = () =>
{
   const params = useParams();
   const idJob = params.idJob;

   const [detailedJob, setDetailedJob] = useState();

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getDetailedJob(idJob);

         if(data) {
            setDetailedJob(data);
         }
      }

      fetchAPI();
   }, []);

   useEffect(() => {
      const element = document.querySelector(".job-detail-admin__description");

      if(element) {
         element.innerHTML = detailedJob.description; 
      }
   }, [detailedJob]);

   return (
      <>
         {/* <h1>Job Detail Admin</h1> */}

         <GoBack />

         {detailedJob && (
            <>
               <h1>
                  Job name: {detailedJob.name}
               </h1>

               <div className="mb-20">
                  <span>Status: </span>
                  {detailedJob.status 
                     ? (
                        <Tag color="green">Recruiting</Tag>
                     ) 
                     : (
                        <Tag color="red">Not recruiting</Tag>
                     )
                  }
               </div>

               <div className="mb-20">
                  <span>Tags: </span>
                  {(detailedJob.tags || []).map((aProgLanguageString, index) => (
                     <Tag key={index} color="blue">
                        {aProgLanguageString}
                     </Tag>
                  ))}
               </div>

               <div className="mb-20">
                  Salary: <strong>{detailedJob.salary}$</strong>
               </div>

               <div className="mb-20">
                  Created at: <strong>{detailedJob.createAt}</strong>
               </div>

               <div className="mb-20">
                  Updated at: <strong>{detailedJob.updateAt}</strong>
               </div>

               <div className="mb-20">
                  <span>Location: </span>
                  {(detailedJob.city || []).map((aCityString, index) => (
                     <Tag key={index} color="orange">
                        {aCityString}
                     </Tag>
                  ))}
               </div>

               <div className="mb-20">
                  <div className="mb-10">Job description:</div>
                  
                  {/* <div>
                     {detailedJob.description.split('\n').map((line, index) => (
                        <div key={index}>
                           {(line === "") ? (<br />) : (line)}
                        </div>
                     ))}
                  </div> */}

                  <div className="job-detail-admin__description"></div>
               </div>
            </>
         )}
      </>
   );
}

export default JobDetailAdmin;