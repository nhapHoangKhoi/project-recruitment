import { Col, Form, Input, Row, Select, Button } from "antd";
import { useEffect, useState } from "react";
import { getListAllCities } from "../../services/cityService";
import { useNavigate } from "react-router-dom";

const SearchForm = () =>
{
   const [listOfCities, setListOfCities] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getListAllCities();
         
         if(data) 
         {
            const object_ALL = {
               key: 0,
               value: "All"
            };

            const citiesData = [
               object_ALL,
               ...data
            ];
            
            setListOfCities(citiesData);
            // (4) [{…}, {…}, {…}, {…}]
            // 0: {key: 0, value: 'All'}
            // 1: {key: 1, value: 'Hà Nội'}
            // 2: {key: 2, value: 'Hồ Chí Minh'}
            // 3: {key: 3, value: 'Đà Nẵng'}
         }
      }

      fetchAPI();
   }, []);

   const handleFinish = (submitValues) => 
   {
      let theSelectedCity = submitValues.inputCity || "";

      if(submitValues.inputCity === "All") {
         theSelectedCity  = "";
      }

      // autimatically navigate to another page
      navigate(
         `/search?mycity=${theSelectedCity}&mykeyword=${submitValues.inputKeyword || ""}`
      );
   }

   return (
      <>
         <h1>1000+ IT Jobs For Developers</h1>

         {listOfCities && (
            <Form onFinish={handleFinish}>
               <Row gutter={[12, 12]}>
                  <Col xxl={6} xl={6} lg={6} md={6} sm={6} xs={6}>
                     <Form.Item name="inputCity">
                        <Select options={listOfCities} placeholder="Choose location" />
                     </Form.Item>
                  </Col>
                  <Col xxl={15} xl={15} lg={15} md={15} sm={14} xs={12}>
                     <Form.Item name="inputKeyword">
                        <Input placeholder="Looking for..." />
                     </Form.Item>
                  </Col>
                  <Col xxl={3} xl={3} lg={3} md={3} sm={4} xs={6}>
                     <Form.Item>
                        <Button type="primary" htmlType="submit" block={true}>
                           Search
                        </Button>
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         )}
      </>
   );
}

export default SearchForm;