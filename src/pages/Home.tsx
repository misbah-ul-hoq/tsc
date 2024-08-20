import useDocumentTitle from "dynamic-title-react";
import Banner from "../components/Home/Banner";
import Study from "../components/Home/Study";
const Home = () => {
  useDocumentTitle("Teacher Student Centre");
  return (
    <main className="my-4 py-4 space-y-10 text-lg">
      <Banner />
      <Study />
    </main>
  );
};

export default Home;
