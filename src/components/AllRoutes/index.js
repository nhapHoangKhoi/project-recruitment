import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

const AllRoutes = () =>
{
   const elements = useRoutes(routes); // <Routes>, <Route>

   return (
      <>
         {elements} 
      </>
   );
}

export default AllRoutes;