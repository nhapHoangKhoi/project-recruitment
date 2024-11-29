import SearchForm from "../../components/SearchForm";
import SkillList from "../../components/SkillList";
import Company from  "../Company";

const Home = () =>
{
   return (
      <>
         <SearchForm />
         <SkillList />
         <Company />
      </>
   );
}

export default Home;