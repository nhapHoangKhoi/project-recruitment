/* eslint-disable no-unused-vars */
import "./LayoutDefault.scss";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useSelector } from "react-redux";

const LayoutDefault = () =>
{
   // need to reload the UI after login successfully
   // use redux
   const authen = useSelector((state) => state.authenReducer);

   return (
      <>
         <div className="layout-default">
            <Header />
            <Main />
            <Footer />
         </div>
      </>
   );
}

export default LayoutDefault;