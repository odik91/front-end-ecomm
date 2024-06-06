import { useState } from "react";
import { OverlayMenuComponent, SidebarComponent, TopbarComponent, FooterComponent, BreadCrumbComponent } from "../components";
import { Outlet } from "react-router-dom";

const MainPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <main>
        <OverlayMenuComponent
          handleSidebarOpen={handleSidebarOpen}
          sidebarOpen={sidebarOpen}
        />

        <SidebarComponent
          sidebarOpen={sidebarOpen}
          handleSidebarOpen={handleSidebarOpen}
        />

        <div className="sm:ml-64">
          <TopbarComponent handleSidebarOpen={handleSidebarOpen} />

          <BreadCrumbComponent />

          <Outlet />

          <FooterComponent />
        </div>
      </main>
    </>
  );
}
export default MainPage