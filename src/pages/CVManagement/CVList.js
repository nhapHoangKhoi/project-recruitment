/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table, Tag, Tooltip } from "antd";
import { getCookie } from "../../helpers/cookie";
import { getCVsByCompanyId } from "../../services/cvService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import CVJobRecruitName from "./CVJobRecruitName";
import CVDelete from "./CVDelete";
import CVMarkUnread from "./CVMarkUnread";

const CVList = () => 
{
   const idCompany = getCookie("id");
   const [listOfCVs, setListOfCVs] = useState([]);

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
         setSizeTable("large");
      }
      else if(window.innerWidth >= 768 && window.innerWidth < 992) {
         setSizeTable("middle");
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
      const data = await getCVsByCompanyId(idCompany);
      
      if(data) {
         setListOfCVs(data.reverse());
      }
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
         title: "Job position",
         dataIndex: "idJob", // same name as in API data
                             // if not the same name, need to add "render"
         key: "idJob", // usually same as dataIndex
         // if not use (_, record) => {}
         render: (text, record, index) => (
            <CVJobRecruitName theRecord={record} />
         ),
      },
      {
         title: "Applicant name",
         dataIndex: "name",
         key: "name"
      },
      {
         title: "Applicant phone number",
         dataIndex: "phone",
         key: "phone",
         responsive: ["sm"] // >= 576 shows
      },
      {
         title: "Email",
         dataIndex: "email",
         key: "email",
         responsive: ["md"] // >= 768 shows
      },
      {
         title: "Apply date",
         key: "time",
         render: (_, record) => (
            <>
               {record.createAt}
            </>
         ),
         responsive: ["md"] // >= 768 shows
      },
      {
         title: "Status",
         key: "statusRead",
         render: (_, record) => (
            <>
               {record.statusRead 
                  ? (
                     <Tag color="green">
                        Read
                     </Tag>
                  ) 
                  : (
                     <Tag color="gray">
                        Unread
                     </Tag>
                  )
               }
            </>
         )
      },
      {
         title: "Actions",
         key: "actions",
         render: (_, record) => (
            <>
               <Link to={`/cv-detail-admin/${record.id}`}>
                  <Tooltip title="Detail">
                     <Button icon={<EyeOutlined />} className="ml-5 mb-5" />
                  </Tooltip>
               </Link>

               <CVMarkUnread theRecord={record} reloadPage={handleReloadPage} />

               <CVDelete theRecord={record} reloadPage={handleReloadPage} />
            </>
         )
      }
   ];

   console.log("innerWidth: ", window.innerWidth);
   console.log("sizeTable:", sizeTable);
   console.log("------------------------");

   return (
      <>
         <div className="mt-20">
            <Table 
               dataSource={listOfCVs} 
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

export default CVList;