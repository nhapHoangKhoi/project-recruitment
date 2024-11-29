/* eslint-disable no-useless-concat */

// exdays : expired followed by days

export function setCookie(cookieName, cookieValue, exdays) 
{
   var d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

   var expires = "expires=" + d.toUTCString();

   document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

export function getCookie(cookieName) 
{
   var name = cookieName + "=";
   var ca = document.cookie.split(";"); // split into array of ...

   for(let c of ca)
   {
      while(c.charAt(0) === " ") {
         c = c.substring(1);
      }

      if(c.indexOf(name) === 0) {
         return c.substring(name.length, c.length);
      }
   }

   return "";
}

export function changeCookieValue(cookieName, cookieValue) 
{
   document.cookie = `${cookieName}=${cookieValue}`;
}

export function deleteCookie(cookieName) 
{
   var d = new Date();
   d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));

   var expires = "expires=" + d.toUTCString();

   document.cookie = cookieName + "=" + "; " + expires;
}

export function deleteAllCookies()
{
   const cookies = document.cookie.split(";");

   for(let aCookie of cookies)
   {
      const eqPos = aCookie.indexOf("=");
      const name = (eqPos > 1) ? aCookie.substr(0, eqPos) : aCookie;

      var d = new Date();
      d.setTime(d.getTime() - (1 * 24 * 60 * 60 * 1000));

      var expires = "expires=" + d.toUTCString();

      document.cookie = name + "=" + "; " + expires;
   }
}