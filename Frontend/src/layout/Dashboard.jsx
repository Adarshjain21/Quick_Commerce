import React from "react";
import UserMenu from "../components/UserMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {

  const user = useSelector(state => state.user)
  
  return (
    <section>
      <div className="container mx-auto p-3 bg-white lg:grid grid-cols-[250px,1fr]">
        <div className="py-4 max-h-[calc(100vh-96px)] sticky top-24 overflow-auto hidden lg:block border-r">
          <UserMenu />
        </div>

        <div className="bg-white min-h-[75vh]">
            <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
