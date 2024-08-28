import useDocumentTitle from "dynamic-title-react";
import Banner from "../components/Home/Banner";
import StudySessions from "../components/Home/StudySessions";
import Tutors from "../components/Shared/Tutors";
const Home = () => {
  useDocumentTitle("Teacher Student Centre");
  return (
    <main className="my-4 py-4 space-y-10 text-lg">
      <Banner />
      <StudySessions />
      <Tutors />
    </main>
  );
};

export default Home;
