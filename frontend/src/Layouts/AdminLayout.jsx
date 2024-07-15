import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Admin/Sidebar";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <div className="pt-[68px] flex grow w-full max-w-screen-xl mx-auto max-h-dvh">
        <div className="w-1/5 max-w-80 p-4 md:px-8 md:py-4 shadow-lg shrink-0">
          <Sidebar />
        </div>
        <div className="grow p-4 md:p-8 overflow-y-scroll flex flex-column">
          <Outlet />
        </div>
      </div>
    </>
  );
}
