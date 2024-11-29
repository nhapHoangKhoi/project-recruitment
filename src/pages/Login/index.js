import { Card, Col, message, Row } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useState } from "react";
import { getTheUser } from "../../services/companyService";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authen";

const Login = () =>
{
   const [hidePassword, setHidePassword] = useState(true);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [messageApi, contextHolder] = message.useMessage();

   const handleClickPasswordIcon = () => 
   {
      setHidePassword(!hidePassword);
   }

   const handleSubmit = async (event) => 
   {
      event.preventDefault();

      const email = event.target.elements.my_email.value;
      const password = event.target.elements.my_password.value;

      const data = await getTheUser(email, password);

      if(data.length > 0)
      {
         const expiredDays = 1;

         // looking from API : API companies
         setCookie("id", data[0].id, expiredDays);
         setCookie("companyName", data[0].companyName, expiredDays);
         setCookie("email", data[0].email, expiredDays);
         setCookie("token", data[0].token, expiredDays);


         // not care about true, false
         // only cares about changing state
         // because need to change UI of Header
         dispatch(checkAuthen(true));


         // login successfully
         // then navgiate back to Home page
         // this code only navigates
         // this code does not help to reload page or else
         navigate("/");
      }
      else
      {
         messageApi.error("Email or password incorrect!");
      }
   }

   return (
      <>
         {contextHolder}
         
         {/* <h1>Trang đăng nhập</h1> */}

         <Row justify="center">
            <Col lg={12} md={12} sm={18} xs={18}>
               <Card title="Sign In Your Company" className="form">
                  <form className="login__form" onSubmit={handleSubmit}>
                     <div className="login__email">
                        <label htmlFor="emailBox">
                           Email <span className="login__required">*</span>
                        </label>
                        <input 
                           id="emailBox" 
                           className="login__input login__input--email" 
                           type="email" 
                           name="my_email" 
                           required
                           placeholder="Default: contact@abc.com"
                           defaultValue={"contact@abc.com"}
                           />
                     </div>

                     <div className="login__password">
                        <label htmlFor="passwordBox">
                           Password <span className="login__required">*</span>
                        </label>
                        <input 
                           id="passwordBox" 
                           className="login__input login__input--password" 
                           type={hidePassword ? "password" : "text"} 
                           name="my_password"  
                           required 
                           placeholder="Default same password: 123456"
                           defaultValue={"123456"}
                        />
                        <div className="login__password-icon" onClick={handleClickPasswordIcon}>
                           {hidePassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </div>
                     </div>

                     <button className="button button--main">
                        Login
                     </button>
                  </form>
               </Card>
            </Col>
         </Row>
      </>
   );
}

export default Login;