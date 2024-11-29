import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const GoBack = () =>
{
   const navigate = useNavigate();

   const handleClick = () => 
   {
      navigate(-1); // -1, go back to previous page
   }

   return (
      <>
         <Button onClick={handleClick}>
            Go back
         </Button>
      </>
   );
}

export default GoBack;