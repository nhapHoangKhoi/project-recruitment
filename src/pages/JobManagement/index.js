import { Link } from "react-router-dom";
import JobList from "./JobList";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const JobManagement = () =>
{
   return (
      <>
         {/* <h1>Trang quản lý các job</h1> */}
         
         <h1>List of Jobs</h1>

         <Link to="/create-job">
            <Button icon={<PlusOutlined />}>
               Create new job
            </Button>
         </Link>

         <JobList />
      </>
   );
}

export default JobManagement;