/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "antd";
import { getCookie } from "../../helpers/cookie";
import { getCVsByCompanyId } from "../../services/cvService";
import { useEffect, useState } from "react";

const CVStatistic = () =>
{
   const theCompanyId = getCookie("id");
   const [cvStatisticData, setCVStatisticData] = useState(); // {totalCVs: 6, statusRead: 5, statusNotRead: 1}

   useEffect(() => {
      const fetchAPI = async () => {
         const listOfCVs = await getCVsByCompanyId(theCompanyId);

         if(listOfCVs)
         {
            let cvStatistic = {
               totalCVs: 0,
               statusRead: 0,
               statusNotRead: 0
            };

            cvStatistic.totalCVs = listOfCVs.length;
            listOfCVs.forEach((eachCV) => {
               if(eachCV.statusRead === true) 
               {
                  ++cvStatistic.statusRead;
               }
               else
               {
                  ++cvStatistic.statusNotRead;
               }
            });

            setCVStatisticData(cvStatistic);
         }
      }

      fetchAPI();
   }, []);

   return (
      <>
         {cvStatisticData && (
            <Card title="CV applications" className="dashboard__item" size="small">
               <div>
                  Total CVs: <strong>{cvStatisticData.totalCVs}</strong>
               </div>
               <div>
                  Read: <strong>{cvStatisticData.statusRead}</strong>
               </div>
               <div>
                  Unread: <strong>{cvStatisticData.statusNotRead}</strong>
               </div>
            </Card>
         )}
      </>
   );
}

export default CVStatistic;