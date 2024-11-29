import { useEffect, useRef, useState } from "react";
import GoBack from "../../components/GoBack";
import { getCookie } from "../../helpers/cookie";
import { getListAllTags } from "../../services/tagService";
import { getListAllCities } from "../../services/cityService";
import { Button, Col, Form, Input, InputNumber, message, Row, Select, Switch } from "antd";
import { getTimeCurrent } from "../../helpers/getTime";
import { createJobRecruit } from "../../services/jobService";
import { Editor } from '@tinymce/tinymce-react'; // import tinymce
const { TextArea } = Input;

const JobCreate = () =>
{
   const idCompany = getCookie("id");

   const [tagLanguages, setTagLanguages] = useState([]);
   const [citiesList, setCitiesList] = useState([]);
   const [form] = Form.useForm(); // reset form after submitting

   const [messageApi, contextHolder] = message.useMessage();
   const editorDescriptionRef = useRef(); // tinymce for description section

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getListAllTags();

         setTagLanguages(data);
      }

      fetchAPI();
   }, []);

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getListAllCities();

         setCitiesList(data);
      }

      fetchAPI();
   }, []);

   const handleFinish = async (values) => 
   {
      values.idCompany = idCompany;
      values.createAt = getTimeCurrent();
      values.description = editorDescriptionRef.current.getContent();

      const responseSubmittedData = await createJobRecruit(values);

      if(responseSubmittedData) {
         form.resetFields(); // reset form after submitting
         
         messageApi.open({
            type: "success",
            content: "New job created successfully!",
            duration: 3,
         });
      }
      else {
         messageApi.open({
            type: "error",
            content: "New job created unsuccessfully!",
            duration: 3,
         });
      }
   }

   return (
      <>
         {contextHolder}

         <GoBack />

         <h1>Create new job</h1>

         <Form
            layout="vertical"
            onFinish={handleFinish}
            form={form} // reset form after submitting
         >
            <Row gutter={[20, 0]}>
               <Col span={24}>
                  <Form.Item
                     label="Job name"
                     name="name"
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

               <Col span={16}>
                  <Form.Item
                     label="Tags"
                     name="tags"
                     rules={[
                        {
                           message: "Required!",
                           required: true
                        }
                     ]}
                  >
                     <Select 
                        mode="multiple"
                        allowClear // clear all at the same time
                        options={tagLanguages}
                     />
                  </Form.Item>
               </Col>

               <Col span={8}>
                  <Form.Item
                     label="Salary"
                     name="salary"
                     rules={[
                        {
                           message: "Required!",
                           required: true
                        }
                     ]}
                  >
                     <InputNumber addonAfter="$" min={0} />
                  </Form.Item>
               </Col>

               <Col span={24}>
                  <Form.Item
                     label="Location"
                     name="city"
                     rules={[
                        {
                           message: "Required!",
                           required: true
                        }
                     ]}
                  >
                     <Select 
                        mode="multiple"
                        allowClear // clear all at the same time
                        options={citiesList}
                     />
                  </Form.Item>
               </Col>

               <Col span={24} className="mb-20">
                  {/* <Form.Item
                     label="Job description"
                     name="description"
                  >
                     <TextArea rows={16} />
                  </Form.Item> */}
                     <label className="mb-10" style={{display: "inline-block"}}>
                        Job description
                     </label>
                     <Editor 
                        onInit={(_evt, editor) => editorDescriptionRef.current = editor}
                        apiKey={process.env.REACT_APP_MCE_API_KEY}
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

               <Col span={24}>
                  <Form.Item
                     label="Status"
                     name="status"
                  >
                     <Switch
                        defaultChecked={false}
                        checkedChildren="Recruiting"
                        unCheckedChildren="Not yet recruit"
                     />
                  </Form.Item>
               </Col>

               <Col span={24}>
                  <div className="form__submit--position">
                     <Form.Item>
                        <Button type="primary" htmlType="submit">
                           Create new
                        </Button>
                     </Form.Item>                        
                  </div>
               </Col>
            </Row>
         </Form>
      </>
   );
}

export default JobCreate;