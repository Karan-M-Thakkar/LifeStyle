import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="pt-[68px] grow">
        <div className="w-full max-w-screen-xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
