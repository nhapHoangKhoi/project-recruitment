import { useEffect, useState } from "react";
import { getListAllCompanies } from "../../services/companyService";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const CompanyList = () =>
{
   const [listOfCompanies, setListOfCompanies] = useState([]);

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getListAllCompanies();
         
         if(data) {
            setListOfCompanies(data);
         }
      }

      fetchAPI();
   }, []);
   
   return (
      <>
         {/* <h1>Trang danh sách công ty</h1> */}

         <Row gutter={[20, 20]}>
            {listOfCompanies.map((item) => (
               <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                  <Link to={`/company/${item.id}`}>
                     <Card>
                        <div className="mb-10">
                           Company: <strong>{item.companyName}</strong>
                        </div>
                        <div className="mb-10">
                           Phone: <strong>{item.phone}</strong>
                        </div>
                        <div className="mb-10">
                           Employees: <strong>{item.quantityPeople}</strong>
                        </div>
                        <div className="mb-10">
                           Website: <strong>{item.website}</strong>
                        </div>
                        <div className="mb-10">
                           Address: <strong>{item.address}</strong>
                        </div>
                     </Card>
                  </Link>
               </Col>
            ))}
         </Row>
      </>
   );
}

export default CompanyList;