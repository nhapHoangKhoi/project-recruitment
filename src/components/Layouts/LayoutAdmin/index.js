import { Layout } from "antd";
import Header from "./Header";
import { useState } from "react";
import "./LayoutAdmin.scss";
import Main from "./Main";

const LayoutAdmin = () =>
{
   const [collapsed, setCollapsed] = useState(false);

   return (
      <>
         {/* <h1>Layout Admin</h1> */}

         <Layout className="layout-admin">
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
            <Main collapsed={collapsed} setCollapsed={setCollapsed} />
         </Layout>
      </>
   );
}

export default LayoutAdmin;