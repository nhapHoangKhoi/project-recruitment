import { useEffect, useState } from "react";
import { getListAllTags } from "../../services/tagService";
import { Link } from "react-router-dom";
import { Tag } from "antd";

const SkillList = () =>
{
   const [listOfTags, setListOfTags] = useState([]);

   useEffect(() => {
      const fetchAPI = async () => {
         const data = await getListAllTags();
         
         if(data) {
            setListOfTags(data);
         }
      }

      fetchAPI();
   }, []);

   return (
      <>
         <div className="mb-20">
            {listOfTags.map((eachTag) => (
               <Link to={`/search?mykeyword=${eachTag.value || ""}`} key={eachTag.key}>
                  <Tag className="mb-5" color="blue">
                     {eachTag.value}
                  </Tag>
               </Link>
            ))}
         </div>
      </>
   );
}

export default SkillList;