import { Button, Card, Col, Input, message, Row } from "antd";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import { checkExisted, createCompany } from "../../services/companyService";

const Register = () =>
{
   const navigate = useNavigate();
   const [messageApi, contextHolder] = message.useMessage();

   const handleFinish = async (values) => {
      values.token = generateToken();
      // console.log(values);
      // {companyName: 'chuyenLHP', email: 'clhp@gmail.com', phone: '123', password: 'clhp', token: 'abcdejf'}


      // type "email" vi trong API de la email
      // companies?email=contact@abcd.com
      //
      // noi chung chi la ten de truy van URL vao API cho đúng
      //
      const existedEmail = await checkExisted("email", values.email);
      const existedPhone = await checkExisted("phone",values.phone);

      if(existedEmail.length > 0) {
         messageApi.error("Email đã tồn tại!");
      }
      else if(existedPhone.length > 0) {
         messageApi.error("Số điện thoại đã tồn tại!");
      }
      else {
         const newUser = await createCompany(values);
         // {fullName: 'Nguyen Van F', email: 'nguyenvanf@gmail.com', password: 'nguyenvanf', token: '17dqwWGHQRAHcW6rUVRM', id: 6}
         
         if(newUser) { // neu tao thanh cong
            navigate("/login");
         }
      }
   }

   return (
      <>
         {contextHolder}
         {/* <h1>Trang đăng ký</h1> */}

         <Row justify="center">
            <Col lg={12} md={12} sm={18} xs={18}>
               <Card title="Sign Up">
                  <Form layout="vertical" onFinish={handleFinish}>
                     <Form.Item 
                        label="Company name" 
                        name="companyName"
                        rules={[
                           {
                              required: true,
                              message: "Required!"
                           }
                        ]}
                     >
                        <Input />
                     </Form.Item>
                     <Form.Item 
                        label="Email" 
                        name="email"
                        rules={[
                           {
                              required: true,
                              message: "Required!"
                           }
                        ]}
                     >
                        <Input />
                     </Form.Item>
                     <Form.Item 
                        label="Phone number" 
                        name="phone"
                        rules={[
                           {
                              required: true,
                              message: "Required!"
                           }
                        ]}
                     >
                        <Input />
                     </Form.Item>
                     <Form.Item 
                        label="Password" 
                        name="password"
                        rules={[
                           {
                              required: true,
                              message: "Required!"
                           }
                        ]}
                     >
                        <Input.Password />
                     </Form.Item>
                     <Form.Item>
                        <Button type="primary" htmlType="submit">
                           Register
                        </Button>
                     </Form.Item>
                  </Form>
               </Card>
            </Col>
         </Row>
      </>
   );
}

export default Register;