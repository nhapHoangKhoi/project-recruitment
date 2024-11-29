/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { checkAuthen } from "../../actions/authen";

const Logout = () =>
{
   const navigate = useNavigate();
   const dispatch = useDispatch();

   deleteAllCookies();

   useEffect(() => {
      dispatch(checkAuthen(false)); // not care about true, false
                                    // only care about changing state
      navigate("/login");
   }, []);

   return (
      <>
         {/* <h1>Trang đăng xuất</h1> */}
      </>
   );
}

export default Logout;