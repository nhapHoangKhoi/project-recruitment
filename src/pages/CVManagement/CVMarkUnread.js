import { FolderOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { editCV, getDetailedCV } from "../../services/cvService";

const CVMarkUnread = (props) =>
{
   const { theRecord, reloadPage } = props;
   const idCV = theRecord.id;

   const handleMarkAsUnread = async () => {
      const responseCV = await getDetailedCV(idCV);
      
      if(responseCV && (responseCV.statusRead === true)) {
         responseCV.statusRead = false;
         const responseUpdated = await editCV(idCV, responseCV);

         if(responseUpdated) {
            reloadPage();
         }
      }
   }

   const handleMarkAsRead = async () => {
      const responseCV = await getDetailedCV(idCV);
      
      if(responseCV && (responseCV.statusRead === false)) {
         responseCV.statusRead = true;
         const responseUpdated = await editCV(idCV, responseCV);

         if(responseUpdated) {
            reloadPage();
         }
      }
   }

   return (
      <>
         {(theRecord.statusRead === true) 
            ? (
               <Tooltip title="Mark as unread">
                  <Button 
                     className="ml-5 mb-5"
                     icon={<FolderOutlined />}
                     type="primary"
                     ghost
                     onClick={handleMarkAsUnread}
                  />
               </Tooltip>
            ) 
            : (
               <>
                  <Tooltip title="Mark as read">
                     <Button 
                        className="ml-5 mb-5"
                        icon={<FolderOpenOutlined />}
                        type="primary"
                        ghost
                        onClick={handleMarkAsRead}
                     />
                  </Tooltip>
               </>
            )
         }
      </>
   );
}

export default CVMarkUnread;