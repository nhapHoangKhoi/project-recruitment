import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

const JobItem = (props) =>
{
   const { eachJob } = props; // {infoCompany: {…}, name: 'NodeJS Backend Developer (Middle,Senior)', tags: Array(2), salary: '2000', city: Array(2), ...}

   return (
      <>
         <Card
            size="small"
            title={
               <Link to={`/job/${eachJob.id}`}>
                  {eachJob.name}
               </Link>
            }
         >
            <div className="mb-10">
               <span>Programming language: </span>
               {eachJob.tags.map((aProgLanguageString, index) => (
                  <Tag className="mb-5" color="blue" key={index}>
                     {aProgLanguageString}
                  </Tag>
               ))}
            </div>
            <div className="mb-10">
               <span>Location: </span>
               {eachJob.city.map((aCityString, index) => (
                  <Tag className="mb-5" color="orange" key={index}>
                     {aCityString}
                  </Tag>
               ))}
            </div>
            <div className="mb-10">
               Salary: <strong>{eachJob.salary}$</strong>
            </div>
            <div className="mb-10">
               Company: <strong>{eachJob.infoCompany.companyName}</strong>
            </div>
            <div className="mb-10">
               Created date: <strong>{eachJob.createAt}</strong>
            </div>
         </Card>
      </>
   );
}

export default JobItem;