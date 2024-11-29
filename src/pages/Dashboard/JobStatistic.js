/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getJobsByCompanyId } from "../../services/jobService";
import { Card } from "antd";

const JobStatistic = (props) =>
{
   const theCompanyId = getCookie("id");
   const [jobStatisticData, setJobStatisticData] = useState(); // {totalJobs: 6, statusTrue: 5, statusFalse: 1}

   useEffect(() => {
      const fetchAPI = async () => {
         const listOfJobs = await getJobsByCompanyId(theCompanyId);

         if(listOfJobs)
         {
            let jobStatistic = {
               totalJobs: 0,
               statusTrue: 0,
               statusFalse: 0
            };

            jobStatistic.totalJobs = listOfJobs.length;
            listOfJobs.forEach((eachJob) => {
               if(eachJob.status === true)
               {
                  ++jobStatistic.statusTrue;
               }
               else
               {
                  ++jobStatistic.statusFalse;
               }
            });

            setJobStatisticData(jobStatistic);
         }
      }

      fetchAPI();
   }, []);

   return (
      <>
         {jobStatisticData && (
            <Card title="Job recruitments" className="dashboard__item" size="small">
               <div>
                  Total available jobs: <strong>{jobStatisticData.totalJobs}</strong>
               </div>
               <div>
                  Recruiting: <strong>{jobStatisticData.statusTrue}</strong>
               </div>
               <div>
                  Stop recruiting: <strong>{jobStatisticData.statusFalse}</strong>
               </div>
            </Card>
         )}
      </>
   );
}

export default JobStatistic;