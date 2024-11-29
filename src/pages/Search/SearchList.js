/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getListAllCompanies } from "../../services/companyService";
import { Col, Row } from "antd";
import JobItem from "../../components/JobItem";


const SearchList = (props) =>
{
   const { searchedOutputs = [] } = props; // (2) [{…}, {…}]
                                           // only have idCompany
                                           // there is no any date related to that company
   const [mergeData, setMergeData] = useState([]);
   //      newly add
   //          |
   //          V
   // 0 : {infoCompany: {…}, name: 'NodeJS Backend Developer (Middle,Senior)', ...}

   useEffect(() => {
      const fetchAPI = async () => {
         const listOfAllCompanies = await getListAllCompanies();

         const newMergeData = searchedOutputs.map((eachOutput) => {
            const infoCompany = listOfAllCompanies.find(
               (aCompany) => eachOutput.idCompany == aCompany.id // idCompany is string, not number
            );

            const eachNewObject = {
               infoCompany: infoCompany,
               ...eachOutput
            };

            return eachNewObject;
         });

         setMergeData(newMergeData);
      }

      fetchAPI();
   }, []);

   // console.log("mergeData: ", mergeData);

   return (
      <>
         {mergeData.length > 0 && (
            <div className="mt-20">
               <Row gutter={[20, 20]}>
                  {mergeData.map((aJob, indexOutput) => (
                     <Col xl={8} lg={8} md={12} sm={12} xs={24} key={indexOutput} >
                        <JobItem eachJob={aJob} />
                     </Col>
                  ))}
               </Row>
            </div>
         )}
      </>
   );
}

export default SearchList;