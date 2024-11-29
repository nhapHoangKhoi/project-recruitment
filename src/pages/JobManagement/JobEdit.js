import { Button, Modal, Form, Tooltip, Row, Col, Input, Select, InputNumber, Switch, message, Spin} from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { getListAllTags } from "../../services/tagService";
import { getListAllCities } from "../../services/cityService";
import "./JobEdit.scss";
import { getTimeCurrent } from "../../helpers/getTime";
import { editJobRecruit } from "../../services/jobService";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Editor } from '@tinymce/tinymce-react'; // import tinymce
const { TextArea } = Input;


const JobEdit = (props) =>
{
   const { theRecord, reloadPage } = props;
   const jobId = theRecord.id;
   // console.log("theRecord: ", theRecord);
   
   const [isOpenModal, setIsOpenModal] = useState(false);
   const [form] = Form.useForm(); // reset form after submitting
   const [tagLanguages, setTagLanguages] = useState([]);
   const [citiesList, setCitiesList] = useState([]);

   const [messageApi, contextHolder] = message.useMessage();
   const [spinning, setSpinning] = useState(false);
   const editorDescriptionRef = useRef(); // tinymce for description section

   const handleShowModal = () => {
      setIsOpenModal(true);
   }

   const handleCloseModal = () => {
      setIsOpenModal(false);
      editorDescriptionRef.current.resetContent();
      form.resetFields(); // reset form
   }

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
      // sweetalert2
      Swal.fire({
         title: "Keep editing?",
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
            values.updateAt = getTimeCurrent();
            values.description = editorDescriptionRef.current.getContent();

            const responseSubmittedData = await editJobRecruit(jobId, values);

            setSpinning(true);

            // dung de test spinning
            setTimeout(() => 
            {
               if(responseSubmittedData)
               {
                  setIsOpenModal(false);
                  reloadPage();

                  messageApi.open(
                     {
                        type: "success",
                        content: "Update successfully!",
                        duration: 3,
                     }
                  );

                  setSpinning(false);
               }
               else
               {
                  messageApi.open(
                     {
                        type: "error",
                        content: "Oopss, update failed!",
                        duration: 3,
                     }
                  );

                  setSpinning(false);
               }
            }, 3000);
         }
      });
   }

   return (
      <>
         {contextHolder}

         <Tooltip title="Edit">
            <Button 
               icon={<EditOutlined />} 
               className="ml-5 mb-5" 
               type="primary"
               ghost={true}
               onClick={handleShowModal}
            />
         </Tooltip>

         <Modal
            title={"Editing: " + theRecord.name} 
            open={isOpenModal} 
            onCancel={handleCloseModal} 
            // maskClosable={false}
            footer={null}
         >
            Nội dung...
            <Spin
               tip="Updating, please wait 3 seconds..."
               spinning={spinning}
               indicator={<LoadingOutlined />}
            >
               <Form
                  layout="vertical"
                  initialValues={theRecord}
                  onFinish={handleFinish}
                  form={form} // reset lai form sau khi submit 
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

                     <Col span={24}>
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

                     <Col span={16}>
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
                           initialValue={theRecord.description}
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
                              checkedChildren="Recruiting"
                              unCheckedChildren="Stop recruiting"
                           />
                        </Form.Item>
                     </Col>

                     <Col span={24}>
                        <div className="form__submit--position">
                           <Form.Item>
                              <Button type="primary" htmlType="submit">
                                 Update edit
                              </Button>
                           </Form.Item>                        
                        </div>
                     </Col>
                  </Row>
               </Form>
            </Spin>
         </Modal>
      </>
   );
}

export default JobEdit;