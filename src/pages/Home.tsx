import useDocumentTitle from "dynamic-title-react";
import Banner from "../components/Home/Banner";
import StudySessions from "../components/Home/StudySessions";
import Tutors from "../components/Shared/Tutors";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
const Home = () => {
  useDocumentTitle("Teacher Student Centre");
  return (
    <main className="my-4 py-4 space-y-10 text-lg">
      <Slide>
        <Banner />
      </Slide>

      <Fade fraction={0.25}>
        <StudySessions />
      </Fade>

      <Zoom>
        <Tutors />
      </Zoom>
    </main>
  );
};

export default Home;
