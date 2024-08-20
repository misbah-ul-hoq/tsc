import useDocumentTitle from "dynamic-title-react";
import Banner from "../components/Home/Banner";
const Home = () => {
  useDocumentTitle("Teacher Student Centre");
  return (
    <main className="my-4 py-4 space-y-7 text-lg">
      <Banner />
    </main>
  );
};

export default Home;
