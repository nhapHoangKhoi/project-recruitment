import { useEffect, useState } from "react";
import { getListAllCompanies } from "../../services/companyService";
import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

const Company = () => 
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
         {/* <h2>Danh sách một số công ty</h2> */}

         <Row gutter={[20, 20]}>
            {listOfCompanies.map((item) => (
               <Col xl={8} lg={8} md={24} sm={24} xs={24} key={item.id}>
                  <Link to={`/company/${item.id}`}>
                     <Card>
                        <div className="line-break mb-10">
                           Company: <strong>{item.companyName}</strong>
                        </div>
                        <div className="line-break mb-10">
                           Employees: <strong>{item.quantityPeople}</strong>
                        </div>
                        <div className="line-break mb-10">
                           Address: <strong>{item.address}</strong>
                        </div>
                     </Card>
                  </Link>
               </Col>
            ))}
         </Row>

         <Link to="/company">
            <Button className="mt-20">
               View more
            </Button>
         </Link>
      </>
   );
}

export default Company;