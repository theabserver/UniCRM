import React from "react";
import { Navbar } from "../component/navbar";

const MainLayout = ({ ChildComponent }: { ChildComponent: React.FC }) => {
  return (
    <>
      <Navbar />
      Main Layout
      {ChildComponent}
    </>
  );
};

export default MainLayout;
