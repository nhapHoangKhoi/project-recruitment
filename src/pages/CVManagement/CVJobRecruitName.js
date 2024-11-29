/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getDetailedJob } from "../../services/jobService";

const CVJobRecruitName = (props) =>
{
   const { theRecord } = props;
   const [theJobData, setTheJobData] = useState();

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getDetailedJob(theRecord.idJob);

         if(data) {
            setTheJobData(data);
         }
      }

      fetchAPI();
   }, []);

   return (
      <>
         {theJobData && (
            <>
               {theJobData.name}
            </>
         )}
      </>
   );
}

export default CVJobRecruitName;