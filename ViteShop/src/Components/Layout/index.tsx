import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";

export default function StandardLayout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
}
