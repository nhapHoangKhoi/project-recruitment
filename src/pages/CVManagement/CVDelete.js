/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCV } from "../../services/cvService";

const CVDelete = (props) =>
{
   const { theRecord, reloadPage } = props;
   const cvId = theRecord.id;

   const handleDeleteCV = async () => {
      const response = await deleteCV(cvId);
      
      if(response) {
         reloadPage();
      }
   }

   return (
      <>
         <Tooltip title="Delete forever">
            <Popconfirm title="Keep deleting, this action cannot be undone?" onConfirm={handleDeleteCV}>
               <Button 
                  className="ml-5 mb-5"
                  icon={<DeleteOutlined />}
                  danger
                  ghost
               />
            </Popconfirm>
         </Tooltip>
      </>
   );
}

export default CVDelete;