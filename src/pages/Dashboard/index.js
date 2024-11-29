import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CVStatistic from "./CVStatistic";
import CompanyInfoBasic from "./CompanyInfoBasic";
import "./Dashboard.scss";

const Dashboard = () =>
{
   return (
      <>         
         <h1>Dashboard</h1>

         <Row gutter={[20, 20]} className="dashboard__admin">
            <Col lg={8} md={8} sm={24} xs={24}>
               <JobStatistic />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
               <CVStatistic />
            </Col>
            <Col lg={8} md={8} sm={24} xs={24}>
               <CompanyInfoBasic />
            </Col>
         </Row>            
      </>
   );
}

export default Dashboard;