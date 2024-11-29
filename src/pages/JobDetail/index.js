/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailedJob } from "../../services/jobService";
import { getDetailedCompany } from "../../services/companyService";
import { Button, Card, Col, Form, Input, notification, Row, Select, Tag } from "antd";
import { getTimeCurrent } from "../../helpers/getTime";
import { createCV } from "../../services/cvService";
import GoBack from "../../components/GoBack";

const { Option } = Select;
const { TextArea } = Input;

const JobDetail = () =>
{
   const params = useParams();
   const idJob = params.idJob;

   const [mergeDetailedJobData, setMergeDetailedJobData] = useState(); // {name: 'NodeJS Backend Developer (Middle,Senior)', tags: Array(2), salary: '2000', city: Array(2), description: 'Top 3 Reasons To Join Us\nMức lương & phúc lợi hấp … giúp nhân viên thực hiện tốt công việc của mình.', ...}

   // ko phai [{}] nen chi duoc khoi tao la useState() rong
   //                          ko duoc dung useState([])

   const [form] = Form.useForm();
   const [noti, contextHolder] = notification.useNotification();


   useEffect(() => {
      const fetchAPI = async () => {
         const detailedJob = await getDetailedJob(idJob);
         const detailedCorrespondCompany = await getDetailedCompany(detailedJob.idCompany);

         const dataFinal = {
            ...detailedJob,
            infoCompany: detailedCorrespondCompany
         };

         setMergeDetailedJobData(dataFinal);
      }

      fetchAPI();
   }, []);

   const handleFinish = async (values) => 
   {
      // console.log(values); 
      // {
      //     inputName: 'Le Hong Phong', 
      //     inputPhone: '0123456789', 
      //     inputEmail: 'lehongphong@gmail.com', 
      //     inputCity: 'Hồ Chí Minh', 
      //     inputIntroduce: 'mô tả...', 
      //     inputLinkProject: 'https://daca.vn/'
      // }

      values.idJob = mergeDetailedJobData.id; // <= add new key
      values.idCompany = mergeDetailedJobData.infoCompany.id; // <= add new key
      values.createAt = getTimeCurrent(); // <= add new key
      values.statusRead = false; // <= add new key

      const newCV = await createCV(values);

      if(newCV)
      {
         form.resetFields();
         noti.success(
            {
               message: "Request sending successfully!",
               description: "The recruiter will contact you as soon as possible"
            }
         );
      }
      else
      {
         noti.error(
            {
               message: "Request sending failed!",
               description: "Some errors occur, please resubmit later."
            }
         );
      }
   }

   // console.log(mergeDetailedJobData);

   useEffect(() => {
      const element = document.querySelector(".job-apply__description");

      if(element) {
         element.innerHTML = mergeDetailedJobData.description; 
      }
   }, [mergeDetailedJobData]);

   useEffect(() => {
      const element = document.querySelector(".job-apply__company");

      if(element) {
         element.innerHTML = mergeDetailedJobData.infoCompany.description; 
      }
   }, [mergeDetailedJobData]);

   return (
      <>
         {contextHolder}

         <GoBack />

         {/* <h1>Trang chi tiết 1 job nào đó</h1> */}

         {mergeDetailedJobData && (
            <>
               <h1>{mergeDetailedJobData.name}</h1>

               <Button
                  href="#formApply"
                  type="primary"
                  size="large"
                  className="mb-20"
               >
                  APPLY NOW
               </Button>

               <div className="mb-20">
                  <span>Tags: </span>
                  {(mergeDetailedJobData.tags || []).map((aProgLanguageString, index) => (
                     <Tag key={index} color="blue">
                        {aProgLanguageString}
                     </Tag>
                  ))}
               </div>

               <div className="mb-20">
                  <span>Location: </span>
                  {(mergeDetailedJobData.city || []).map((aCityString, index) => (
                     <Tag key={index} color="orange">
                        {aCityString}
                     </Tag>
                  ))}
               </div>

               <div className="mb-20">
                  Salary: <strong>{mergeDetailedJobData.salary}$</strong>
               </div>

               <div className="mb-20">
                  Company name: <strong>{mergeDetailedJobData.infoCompany.companyName}</strong>
               </div>

               <div className="mb-20">
                  Address: <strong>{mergeDetailedJobData.infoCompany.address}</strong>
               </div>

               <div className="mb-20">
                  Create at: <strong>{mergeDetailedJobData.createAt}</strong>
               </div>

               <div className="mb-20">
                  <div className="mb-10" style={{color: "red"}}>Job description:</div>
                  {/* <div>
                     {mergeDetailedJobData.description.split('\n').map((line, index) => (
                        <div key={index}>
                           {line}
                        </div>
                     ))}
                  </div> */}
                  <div className="job-apply__description"></div>
               </div>

               <div className="mb-20">
                  <div className="mb-10" style={{color: "red"}}>About company:</div>
                  {/* <div>
                     {mergeDetailedJobData.infoCompany.description.split('\n').map((line, index) => (
                        <div key={index}>
                           {line}
                        </div>
                     ))}
                  </div> */}
                  <div className="job-apply__company"></div>
               </div>

               <Card title="Apply For This Job" id="formApply">
                  <Form
                     layout="vertical"
                     form={form}
                     onFinish={handleFinish}
                  >
                     <Row gutter={[20, 20]}>
                        <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                           <Form.Item 
                              label="Full name" 
                              // name="inputName"
                              name="name" 
                              rules={[
                                 {
                                    required: true,
                                    message: "Required!"
                                 }
                              ]}
                           >
                              <Input placeholder="vd: Nguyễn Hoàng Khôi" />
                           </Form.Item>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={24}>
                           <Form.Item 
                              label="Phone number" 
                              // name="inputPhone" 
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
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={13}>
                           <Form.Item 
                              label="Email" 
                              // name="inputEmail"
                              name="email" 
                              rules={[
                                 {
                                    required: true,
                                    message: "Required!"
                                 }
                              ]}
                           >
                              <Input placeholder="example@gmail.com" />
                           </Form.Item>
                        </Col>
                        <Col xl={12} lg={12} md={12} sm={12} xs={11}>
                           <Form.Item 
                              label="Location to apply" 
                              // name="inputCity"
                              name="city" 
                              rules={[
                                 {
                                    required: true,
                                    message: "Required!"
                                 }
                              ]}
                           >
                              <Select>
                                 {mergeDetailedJobData.city.map((eachCity, index) => (
                                    <Option value={eachCity} label={eachCity} key={index} />
                                 ))}
                              </Select>
                           </Form.Item>
                        </Col>
                        <Col span={24}>
                           <Form.Item 
                              label="About yourself" 
                              // name="inputIntroduce"
                              name="description" 
                              rules={[
                                 {
                                    required: true,
                                    message: "Bắt buộc!"
                                 }
                              ]}
                           >
                              <TextArea rows={6} />
                           </Form.Item>
                        </Col>
                        <Col span={24}>
                           <Form.Item 
                              label="Your project links" 
                              // name="inputLinkProject"
                              name="linkProject" 
                              rules={[
                                 {
                                    required: true,
                                    message: "Bắt buộc!"
                                 }
                              ]}
                           >
                              <TextArea rows={6} />
                           </Form.Item>
                        </Col>
                        <Col span={24}>
                           <Form.Item>
                              <Button type="primary" htmlType="submit">
                                 APPLY
                              </Button>
                           </Form.Item>
                        </Col>
                     </Row>
                  </Form>
               </Card>
            </>
         )}
      </>
   );
}

export default JobDetail;