// import NavBar from "@/components/NavBar";
import NavBar from "@/components/SelfMade/navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;