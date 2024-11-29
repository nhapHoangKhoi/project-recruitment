import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet } from "react-router-dom";
import MenuSider from "./MenuSider";

const Main = (props) =>
{
   const { collapsed, setCollapsed } = props;

   return (
      <>
         <Layout className="layout-admin__main">
            <Sider
               className="layout-admin__sider"
               theme="light"
               collapsed = {collapsed}
               breakpoint = "lg"
               onBreakpoint = {(event) => setCollapsed(event)}
            >
               <MenuSider />
            </Sider>

            <Content className={ "layout-admin__content" + (collapsed ? " layout-admin__content--full" : "") }>
               <Outlet />
            </Content>
         </Layout>
      </>
   );
}

export default Main;