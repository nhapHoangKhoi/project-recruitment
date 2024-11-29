import { DashboardOutlined, UserOutlined, UnorderedListOutlined, FileDoneOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const MenuSider = () => 
{
   const location = useLocation(); // {pathname: '/companyConfig', search: '', hash: '', state: null, key: 'q5zppvro'}

   const listOfItems = [
      {
         key: "/admin", // key is unique id of item
                        // because pathName of location at line 7
                        // so add '/' /admin
         icon: <DashboardOutlined />,
         label: <Link to="/admin">Dashboard</Link>
      },
      {
         key: "/companyConfig", // key is unique id of item
                                // because pathName of location at line 7
                                // so add '/' /companyConfig
         icon: <UserOutlined  />,
         label: <Link to="/companyConfig">About Company</Link>
      },
      {
         key: "/jobManage",
         icon: <UnorderedListOutlined />,
         label: <Link to="/jobManage">Job Management</Link>
      },
      {
         key: "/cvManage",
         icon: <FileDoneOutlined />,
         label: <Link to="/cvManage">CV Management</Link>
      }
   ];

   return (
      <>
         <Menu 
            mode="inline"
            items={listOfItems}
            selectedKeys={[location.pathname]}
         />
      </>
   );
}

export default MenuSider;