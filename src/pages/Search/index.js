/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListAllJobs } from "../../services/jobService";
import SearchList from "./SearchList";

const Search = () =>
{
   // const params = useParams(); // {}

   // get from query part in URL
   // example: 
   // http://localhost:3000/search?mycity=HoChiMinh&mykeyword=
   //
   const [searchParams, setSearchParams] = useSearchParams();
   const citySearch = searchParams.get("mycity") || "noCityInput";
   const keywordSearch = searchParams.get("mykeyword") || "noKeywordInput";

   const [searchedOutputList, setSearchedOutputList] = useState([]);

   console.log("citySearch:", citySearch);
   console.log("keywordSearch:", keywordSearch);

   useEffect(() => {
      const fetchAPI = async () => 
      {
         const allJobsData = await getListAllJobs();

         if(allJobsData) 
         {
            if(citySearch === "noCityInput" && keywordSearch === "noKeywordInput")
            {
               // show all
               const newData = allJobsData.filter((item) => {
                  const jobStatus = item.status || false;
                  return jobStatus;
               });

               setSearchedOutputList(newData.reverse());
            }
            else if(citySearch !== "noCityInput" || keywordSearch !== "noKeywordInput")
            {
               // output :
               // (7)[{...},...] ,..., (2) [{…}, {…}] ,..., []
               //
               const newDataMatchSearched = allJobsData.filter((item) => {
                  let checkMatchSearchedCity = false;
               
                  if( (item.city !== undefined) && (item.city.includes(citySearch) === true) )
                  {
                     checkMatchSearchedCity = true;    
                  }


                  let checkMatchSearchedKeyword = false;

                  const tagsString = item.tags.join(",").toLowerCase(); // "reactjs,angular,typescript"

                  if( (item.tags !== undefined) && (tagsString.includes(keywordSearch.toLowerCase()) === true) )
                  {
                     checkMatchSearchedKeyword = true;
                  }


                  const jobStatusAvailable = item.status || false;

                  let checkCombineQuery = false;

                  if(citySearch !== "noCityInput" && keywordSearch !== "noKeywordInput")
                  {
                     checkCombineQuery = (checkMatchSearchedCity && checkMatchSearchedKeyword);
                  }
                  else
                  {
                     checkCombineQuery = (checkMatchSearchedCity || checkMatchSearchedKeyword);
                  }

                  return checkCombineQuery && jobStatusAvailable; // only 1 true or 1 false 
               });

               setSearchedOutputList(newDataMatchSearched.reverse());
            }
         }
      }

      fetchAPI();
   }, []);

   return (
      <>
         {/* <h1>Trang kết quả tìm kiếm</h1> */}

         <div>
            <strong>Results for: </strong>
            {citySearch !== "noCityInput" && (
               <Tag>{citySearch}</Tag>
            )}
            {keywordSearch !== "noKeywordInput" && (
               <Tag>{keywordSearch}</Tag>
            )}
         </div>

         {searchedOutputList.length > 0 
            ? (
               <SearchList searchedOutputs={searchedOutputList} />
            )
            : (
               <div className="mt-20">
                  No matching results were found.
               </div>
            )
         }
      </>
   );
}

export default Search;