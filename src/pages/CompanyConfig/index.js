/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Spin } from "antd";
import { editCompany, getDetailedCompany } from "../../services/companyService";
import { LoadingOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Editor } from '@tinymce/tinymce-react'; // import tinymce
const { TextArea } = Input;

const CompanyConfig = () =>
{
   const idComapny = getCookie("id");
   const [infoCompany, setInfoCompany] = useState(); // {companyName: 'Công ty ABC', ...}
   const [isEditing, setIsEditing] = useState(false);
   const [form] = Form.useForm();
   const [messageApi, contextHolder] = message.useMessage();
   const [spinning, setSpinning] = useState(false);
   const editorDescriptionRef = useRef(); // tinymce for description section
   const editorDetailRef = useRef(); // tinymce for detail section
   
   // separate this block of code
   // used for: reload page
   const fetchAPI = async () => {
      const data = await getDetailedCompany(idComapny);

      if(idComapny) {
         setInfoCompany(data);
      }
   }

   useEffect(() => {
      fetchAPI();
   }, []);

   const turnEditOff = () => {
      setIsEditing(false);
      
      editorDescriptionRef.current.resetContent();
      editorDetailRef.current.resetContent();
      form.resetFields(); // reset to initial values
   }

   const turnEditOn = () => {
      setIsEditing(true);
   }

   const handleFinishForm = async (values) => 
   {
      // sweetalert2
      Swal.fire({
         title: "Keep updating?",
         text: "This action cannot be undone",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Update!",
         cancelButtonText: "Discard"
      }).then(async (result) => {
         if (result.isConfirmed) 
         {
            values.description = editorDescriptionRef.current.getContent();
            values.detail = editorDetailRef.current.getContent();
            const data = await editCompany(idComapny, values);
            
            setSpinning(true);

            // test spinning
            setTimeout(() => {
               if(data) {
                  messageApi.success("Update successfully!");
                  fetchAPI(); // reload page <=> fetch agin API
                  setIsEditing(false);
      
                  setSpinning(false);
               }
            }, 3000);
         }
      });
   }

   return (
      <>
         {contextHolder}

         {/* <h1>Trang cấu hình thông tin công ty</h1> */}

         {infoCompany && (
            <Card
               title="Company information"
               extra={
                  isEditing
                     ? (
                        <Button onClick={turnEditOff}>
                           Cancel
                        </Button>
                     ) 
                     : (
                        <Button onClick={turnEditOn}>
                           Edit
                        </Button>
                     )
               } // content to render in the top-right corner of the card
            >
               <Spin
                  tip="Updating, please wait for 3 seconds..."
                  spinning={spinning}
                  indicator={<LoadingOutlined />}
               >
                  <Form
                     layout="vertical"
                     initialValues={
                        {
                           companyName: infoCompany.companyName,
                           email: infoCompany.email,
                           phone: infoCompany.phone,
                           address: infoCompany.address,
                           quantityPeople: infoCompany.quantityPeople,
                           workingTime: infoCompany.workingTime,
                           website: infoCompany.website,
                           // description: infoCompany.description,
                           detail: infoCompany.detail
                        }
                     }
                     disabled={!isEditing}
                     form={form}
                     onFinish={handleFinishForm}
                  >
                     <Row gutter={[20, 0]}>
                        <Col lg={24} md={24} sm={24} xs={24}>
                           <Form.Item 
                              label="Company name" 
                              name="companyName" 
                              rules={[
                                 {
                                    message: "Required!",
                                    required: true
                                 }
                              ]}
                           >
                              <Input />
                           </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={24}>
                           <Form.Item 
                              label="Email" 
                              name="email" 
                              rules={[
                                 {
                                    message: "Required!",
                                    required: true
                                 }
                              ]}
                           >
                              <Input />
                           </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={24}>
                           <Form.Item 
                              label="Company phone" 
                              name="phone" 
                           >
                              <Input />
                           </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={24}>
                           <Form.Item 
                              label="Address" 
                              name="address" 
                           >
                              <Input />
                           </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={24}>
                           <Form.Item 
                              label="Employees" 
                              name="quantityPeople" 
                           >
                              <InputNumber className="w-100" min={1} />
                           </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={24}>
                           <Form.Item 
                              label="Working hour" 
                              name="workingTime" 
                           >
                              <Input />
                           </Form.Item>
                        </Col>
                        <Col lg={8} md={8} sm={12} xs={24}>
                           <Form.Item 
                              label="Link website" 
                              name="website" 
                           >
                              <Input />
                           </Form.Item>
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24} className="mb-20">
                           {/* <Form.Item 
                              label="Short description" 
                              name="description" 
                           >
                              <TextArea textarea-mce="" rows={4} />
                           </Form.Item> */}

                           <label className="mb-10" style={{display: "inline-block"}}>
                              Short description
                           </label>
                           <Editor 
                              onInit={(_evt, editor) => editorDescriptionRef.current = editor}
                              apiKey={process.env.REACT_APP_MCE_API_KEY}
                              disabled={isEditing ? false : true}
                              initialValue={infoCompany.description}
                              init={
                                 {
                                    promotion: false,
                                    statusbar: true,
                                    elementpath: false,
                                    branding: false,
                                    resize: true,
                                    plugins: 'lists link table wordcount',
                                 }
                              }
                           />
                        </Col>
                        <Col lg={24} md={24} sm={24} xs={24} className="mb-20">
                           {/* <Form.Item 
                              label="More detail" 
                              name="detail" 
                           >
                              <TextArea rows={16} />
                           </Form.Item> */}

                           <label className="mb-10" style={{display: "inline-block"}}>
                              More detail
                           </label>
                           <Editor 
                              onInit={(_evt, editor) => editorDetailRef.current = editor}
                              apiKey={process.env.REACT_APP_MCE_API_KEY}
                              disabled={isEditing ? false : true}
                              initialValue={infoCompany.detail}
                              init={
                                 {
                                    promotion: false,
                                    statusbar: true,
                                    elementpath: false,
                                    branding: false,
                                    resize: true,
                                    plugins: 'lists link table wordcount',
                                 }
                              }
                           />
                        </Col>

                        {isEditing && (
                           <Col span={24}>
                              <Form.Item>
                                 <Button type="primary" htmlType="submit">
                                    Update
                                 </Button>
                                 <Button className="ml-10" onClick={turnEditOff}>
                                    Cancel
                                 </Button>
                              </Form.Item>
                           </Col>
                        )}
                     </Row>
                  </Form>
               </Spin>
            </Card>
         )}
      </>
   );
}

export default CompanyConfig;