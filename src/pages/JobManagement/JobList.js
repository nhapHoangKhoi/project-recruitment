/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getJobsByCompanyId } from "../../services/jobService";
import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import JobEdit from "./JobEdit";
import JobDelete from "./JobDelete";

const JobList = () =>
{
   const idCompany = getCookie("id");
   const [listOfJobsRecruit, setListOfJobsRecruit] = useState([]);
   

   let initialSizeTable = "large";
   
   if(window.innerWidth >= 1350) {
      initialSizeTable = "large";
   }
   else if(window.innerWidth >= 992 && window.innerWidth < 1350) {
      initialSizeTable = "large";
   }
   else if(window.innerWidth >= 768 && window.innerWidth < 992) {
      initialSizeTable = "middle";
   }
   else if(window.innerWidth >= 576 && window.innerWidth < 768) {
      initialSizeTable = "small";
   }
   else if(window.innerWidth < 576) {
      initialSizeTable ="small";
   }

   const [sizeTable, setSizeTable] = useState(initialSizeTable);

   const handleSizeTable = () => 
   {
      if(window.innerWidth >= 1350) {
         setSizeTable("large");
      }
      else if(window.innerWidth >= 992 && window.innerWidth < 1350) {
         setSizeTable("middle");
      }
      else if(window.innerWidth >= 768 && window.innerWidth < 992) {
         setSizeTable("small");
      }
      else if(window.innerWidth >= 576 && window.innerWidth < 768) {
         setSizeTable("small");
      }
      else if(window.innerWidth < 576) {
         setSizeTable("small");
      }
   }

   useEffect(() => {
      window.addEventListener('resize', handleSizeTable); // add event listener

      return () => {
         window.removeEventListener('resize', handleSizeTable); // clean up
      };
   }, []);
   

   // separate this block of code
   // used for: reload page
   const fetchAPI = async () => {
      const data = await getJobsByCompanyId(idCompany);
      setListOfJobsRecruit(data.reverse());
   }

   useEffect(() => {
      fetchAPI();
   }, []);

   const handleReloadPage = () => {
      fetchAPI();
   }


   const [tableParams, setTableParams] = useState(
      {
         pagination: {
            current: 1,
            pageSize: 5
         }
      }
   );
   
   const handleTableChange = (pagination, filters, sorter) => {
      setTableParams(
         {
            pagination,
         }
      );
   }

   const tableColumns = [
      {
         title: "Tên công việc",
         dataIndex: "name", // same name as in API data
                            // if not the same name, need to add "render"
         key: "name" // usually same as dataIndex
      },
      {
         title: "Tags",
         dataIndex: "programmingLanguage", // dat ten ko giong
                                           // phai dung render
                                           // thậm chí ko cần dataIndex luôn nếu đã dùng render (xem ở dưới sẽ hiểu)
         key: "programmingLanguage",
         // if not used (_, record) => {}
         render: (text, record, index) => {
            return (
               <>
                  {(record.tags || []).map((eachTag, index) => (
                     <Tag key={index} className="mb-5" color="blue">
                        {eachTag}
                     </Tag>
                  ))}
               </>
            );
         },
         responsive: ['xl'] // >= 1200 shows
      },
      {
         title: "Salary ($)",
         dataIndex: "salary",
         key: "salary",
         responsive: ['md'] // >= 768 shows
      },
      {
         title: "Timestamps",
         key: "time",
         render: (_, record) => (
            <>
               <small>Created at: {record.createAt}</small>
               <br />
               <small>Updated at: {record.updateAt}</small>
            </>
         ),
         responsive: ['md'] // >= 768 shows
      },
      {
         title: "Status",
         key: "status",
         render: (_, record) => {
            return (
               <>
                  {record.status 
                     ? (
                        <Tag color="green">Recruiting</Tag>
                     ) 
                     : (
                        <Tag color="red">Stop recruiting</Tag>
                     )
                  }
               </>
            );
         }
      },
      {
         title: "Actions",
         key: "actions",
         render: (_, record) => (
            <>
               <Link to={`/job-detail-admin/${record.id}`}>
                  <Tooltip title="Detail">
                     <Button icon={<EyeOutlined />} className="ml-5 mb-5" />
                  </Tooltip>
               </Link>

               <JobEdit theRecord={record} reloadPage={handleReloadPage} />

               <JobDelete theRecord={record} reloadPage={handleReloadPage} />
            </>
         )
      }
   ];

   // console.log("innerWidth: ", window.innerWidth);
   // console.log("sizeTable:", sizeTable);
   // console.log("------------------------");

   return (
      <>
         <div className="dashboard-table mt-20">
               <Table 
                  dataSource={listOfJobsRecruit} 
                  rowKey="id" 
                  columns={tableColumns} 
                  pagination={tableParams.pagination} 
                  onChange={handleTableChange}
                  size={sizeTable}
               />
         </div>
      </>
   );
}

export default JobList;