import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";

const RootLayout = () => {
  return (
    <section>
      <Navbar />
      <Outlet />
    </section>
  );
};

export default RootLayout;
