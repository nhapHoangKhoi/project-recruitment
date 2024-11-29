import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteJobRecruit } from "../../services/jobService";

const JobDelete = (props) => 
{
   const { theRecord, reloadPage } = props;
   const jobId = theRecord.id;
   // console.log("theRecord: ", theRecord);

   const handleConfirmDelete = async () =>
   {
      const responseDeletedData = await deleteJobRecruit(jobId);

      if(responseDeletedData) {
         reloadPage();
      }
   }

   return (
      <>
         <Tooltip title="Delete forever">
            <Popconfirm title="Keep deleting, this action cannot be undone?" onConfirm={handleConfirmDelete}>
               <Button 
                  icon={<DeleteOutlined />} 
                  className="ml-5 mb-5" 
                  danger 
                  ghost 
               />
            </Popconfirm>
         </Tooltip>
      </>
   );
}

export default JobDelete;