import { Link } from "react-router-dom";
import { Button } from "antd";
import { getCookie } from "../../../helpers/cookie";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () =>
{
   const token = getCookie("token");

   return (
      <>
         <header className="layout-default__header">
            <div className="container">
               <div className="layout-default__wrap">
                  <div className="layout-default__logo">
                     {/* link ve trang chu */}
                     <Link to="/">IT Jobs</Link>
                  </div>
                  <div className="layout-default__account">
                     {token 
                        ? (
                           <>
                              <Link to="/admin">
                                 <Button icon={<UserOutlined />}>
                                    Administration
                                 </Button>
                              </Link>
                              <Link to="/logout" className="ml-10">
                                 <Button icon={<LogoutOutlined />} danger={true} type="primary">
                                    Sign out
                                 </Button>
                              </Link>
                           </>
                        ) 
                        : (
                           <>
                              <Link to="/login">
                                 <Button>
                                    Sign In Your Company
                                 </Button>
                              </Link>
                              <Link to="/register">
                                 <Button type="primary" className="ml-10">
                                    Register
                                 </Button>
                              </Link>
                           </>
                        )
                     }
                  </div>
               </div>
            </div>
         </header>
      </>
   );
}

export default Header;