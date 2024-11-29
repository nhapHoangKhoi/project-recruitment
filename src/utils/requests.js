const SERVER = "http://localhost:3002";

export const get = async (path) => {
   const response = await fetch(SERVER + path);

   const data = await response.json();
   return data;
}

export const post = async (path, dataSubmit) => {
   const response = await fetch((SERVER + path), {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(dataSubmit)
   });

   const data = await response.json();
   return data;
}

export const myDelete = async (path) => {
   const response = await fetch((SERVER + path), {
      method: "DELETE"
   });

   const data = await response.json();
   return data;
}

export const patch = async (path, dataSubmit) => {
   const response = await fetch((SERVER + path), {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(dataSubmit)
   });

   const data = await response.json();
   return data;
}