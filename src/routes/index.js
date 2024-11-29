import { Navigate } from "react-router-dom";
import LayoutDefault from "../components/Layouts/LayoutDefault";
import PrivateRoutes from "../components/PrivateRoutes";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Dashboard from "../pages/Dashboard";
import CompanyConfig from "../pages/CompanyConfig";
import JobManagement from "../pages/JobManagement";
import CVManagement from "../pages/CVManagement";
import Search from "../pages/Search";
import JobDetail from "../pages/JobDetail";
import CompanyList from "../pages/Company/CompanyList";
import CompanyDetail from "../pages/Company/CompanyDetail";
import LayoutAdmin from "../components/Layouts/LayoutAdmin";
import JobDetailAdmin from "../pages/JobManagement/JobDetailAdmin";
import JobCreate from "../pages/JobManagement/JobCreate";
import CVDetailAdmin from "../pages/CVManagement/CVDetailAdmin";


export const routes = [
   // Public
   {
      path: "/",
      element: <LayoutDefault />,
      children: [
         {
            index: true,
            element: <Home />
         },
         {
            path: "login",
            element: <Login />
         },
         {
            path: "register",
            element: <Register />
         },
         {
            path: "logout",
            element: <Logout />
         },
         {
            path: "search",
            element: <Search />
         },
         {
            path: "job/:idJob",
            element: <JobDetail />
         },
         {
            path: "company",
            element: <CompanyList />
         },
         {
            path: "company/:companyId",
            element: <CompanyDetail />
         },
         {
            // page not existed
            // go back to Home page
            path: "*",
            element: <Navigate to="/" />
         }
      ]
   },
   // End public

   // Private
   {
      element: <PrivateRoutes />,
      children: [
         {
            // path: "admin/", => wrong, because
            //                    localhost/admin/companyConfig
            //
            // correct         :  localhost/companyConfig
            path: "/",
            element: <LayoutAdmin />,
            children: [
               {
                  path: "admin",
                  element: <Dashboard />
               },
               {
                  path: "companyConfig",
                  element: <CompanyConfig />
               },
               {
                  path: "jobManage",
                  element: <JobManagement />
               },
               {
                  path: "cvManage",
                  element: <CVManagement />
               },
               {
                  path: "job-detail-admin/:idJob",
                  element: <JobDetailAdmin />
               },
               {
                  path: "create-job",
                  element: <JobCreate />
               },
               {
                  path: "cv-detail-admin/:idCV",
                  element: <CVDetailAdmin />
               },
            ]
         }
      ],
   }
   // End private
];