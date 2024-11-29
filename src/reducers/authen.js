import { getCookie } from "../helpers/cookie";

const token = getCookie("token");

let initialState = false;

if(token) { // if(token !== "")
   initialState = true;
}

export const authenReducer = (currentState = initialState, action) => 
{
   // console.log("action", action);

   switch(action.type)
   {
      case "CHECK_AUTHEN":
         return action.status;

      default:
         return currentState;
   }
}