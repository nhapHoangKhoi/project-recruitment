import { Button } from "antd";
import { Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = (props) =>
{
   const { collapsed, setCollapsed } = props;

   return (
      <>
         <header className="layout-admin__header">
            <div className={ "layout-admin__logo" + (collapsed ? " layout-admin__logo--fold" : "") }>
               <Link to="/admin">
                  {collapsed ? "ITAd" : "ITAdmin"}
               </Link>
            </div>
            <div className="layout-admin__nav">
               <div className="layout-admin__nav-left">
                  <Button onClick={() => setCollapsed(!collapsed)}>
                     {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </Button>
               </div>
               <div className="layout-admin__nav-right">
                  <Link to="/">
                     <Button icon={<HomeOutlined />}>
                        Home page
                     </Button>
                  </Link>
                  <Link to="/logout" className="ml-10">
                     <Button icon={<LogoutOutlined />} type="primary">
                        Sign out
                     </Button>
                  </Link>
               </div>
            </div>
         </header>
      </>
   );
}

export default Header;