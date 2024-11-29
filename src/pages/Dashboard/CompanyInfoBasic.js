/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getDetailedCompany } from "../../services/companyService";
import { Card } from "antd";

const CompanyInfoBasic = () =>
{
   const idCompany = getCookie("id");
   const [infoCompany, setInfoCompany] = useState();

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getDetailedCompany(idCompany);

         if(data) {
            setInfoCompany(data);
         }
      }

      fetchAPI();
   }, []);

   return (
      <>
         {infoCompany && (
            <Card title="Company information" className="dashboard__item line-break" size="small">
               <div>
                  Company name: <strong>{infoCompany.companyName}</strong>
               </div>
               <div>
                  Email: <strong>{infoCompany.email}</strong>
               </div>
               <div>
                  Phone number: <strong>{infoCompany.phone}</strong>
               </div>
               <div>
                  Employees: <strong>{infoCompany.quantityPeople}</strong>
               </div>
            </Card>
         )}
      </>
   );
}

export default CompanyInfoBasic;