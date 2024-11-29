import { Link, useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { editCV, getDetailedCV } from "../../services/cvService";
import { getDetailedJob } from "../../services/jobService";
import { Card, Tag } from "antd";

const CVDetailAdmin = () =>
{
   const params = useParams();
   const idCV = params.idCV;

   const [theCVData, setTheCVData] = useState(); // {name: 'Le Hong Phong', phone: '0123456789', email: 'lehongphong@gmail.com', city: 'Hồ Chí Minh', description: 'Giới thiệu...', …}
   const [theCorrespondJob, setTheCorrespondJob] = useState(); // {name: 'NodeJS Backend Developer (Middle,Senior)', tags: Array(2), salary: '2000', city: Array(2), description: 'Top 3 Reasons To Join Us...', …}

   useEffect(() => {
      const fetchAPI = async () => {
         const responseCV = await getDetailedCV(idCV);

         if(responseCV) {
            const idJob = responseCV.idJob;
            const responseJob = await getDetailedJob(idJob);

            if(responseJob) {
               setTheCVData(responseCV);
               setTheCorrespondJob(responseJob);

               if(responseCV.statusRead === false) {
                  responseCV.statusRead = true;
                  await editCV(idCV, responseCV);
               }
            }
         }
      }

      fetchAPI();
   }, []);

   // console.log("cv:", theCVData);
   // console.log("job:", theCorrespondJob);

   useEffect(() => {
      const element = document.querySelector(".job-apply__description");

      if(element) {
         element.innerHTML = theCorrespondJob.description; 
      }
   }, [theCorrespondJob]);

   return (
      <>
         <GoBack />

         {theCVData && theCorrespondJob && (
            <>
               <Card title={`Applicant information : ${theCVData.name}`} className="mt-20">
                  <div className="mb-20">
                     Apply date: <strong>{theCVData.createAt}</strong>
                  </div>

                  <div className="mb-20">
                     Phone number: <strong>{theCVData.phone}</strong>
                  </div>

                  <div className="mb-20">
                     Email: <strong>{theCVData.email}</strong>
                  </div>

                  <div className="mb-20">
                     Location applied: <strong>{theCVData.city}</strong>
                  </div>

                  <div className="mb-20">
                     <div className="mb-5">Self description:</div>
                     <div>{theCVData.description}</div>
                  </div>

                  <div className="mb-20">
                     <div className="mb-5">Link project:</div>
               
                     {theCVData.linkProject && (
                        <>
                           <Link to={theCVData.linkProject} target="_blank" rel="noopener noreferrer">
                              {theCVData.linkProject}
                           </Link>
                        </>
                     )}
                  </div>
               </Card>

               <Card 
                  title={`Application for : ${theCorrespondJob.name}`} 
                  className="job-apply mt-20"
               >
                  <div className="mb-20">
                     <span>Tags: </span>
                        {(theCorrespondJob.tags || []).map((eachTag, index) => (
                           <Tag color="blue" key={index}>
                              {eachTag}
                           </Tag>
                        ))}
                  </div>

                  <div className="mb-20">
                     Salary: <strong>{theCorrespondJob.salary}$</strong>
                  </div>

                  <div className="mb-20">
                     <div className="mb-5">Job description:</div>
                     <div className="job-apply__description"></div>
                  </div>
               </Card>
            </>
         )}
      </>
   );
}

export default CVDetailAdmin;