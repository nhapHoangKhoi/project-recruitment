import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

const PrivateRoutes = () =>
{
   let isLogin = true;
   const token = getCookie("token");

   if(token) {
      isLogin = true;
   }

   return (
      <>
         {isLogin ? <Outlet /> : <Navigate to="/login" />}
      </>
   );
}

export default PrivateRoutes;